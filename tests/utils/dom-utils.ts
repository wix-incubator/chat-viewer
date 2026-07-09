const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 40;
const scrollTops = new WeakMap<HTMLElement, number>();
const scrollLefts = new WeakMap<HTMLElement, number>();

// jsdom-testing-mocks covers ResizeObserver; these shims provide the layout
// and scroll properties that jsdom does not calculate and virtua reads.
function parsePixels(value: string): number | undefined {
  if (!value.endsWith('px')) return;

  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function measureElement(element: Element): {
  width: number;
  height: number;
} {
  if (!(element instanceof HTMLElement)) {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  const child = element.firstElementChild;
  const childSize = child ? measureElement(child) : undefined;
  const explicitWidth =
    parsePixels(element.style.width) ?? parsePixels(element.style.minWidth);
  const explicitHeight =
    parsePixels(element.style.height) ?? parsePixels(element.style.minHeight);

  return {
    width: explicitWidth ?? childSize?.width ?? DEFAULT_WIDTH,
    height: explicitHeight ?? childSize?.height ?? DEFAULT_HEIGHT,
  };
}

export function installDomMeasurementMocks() {
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    configurable: true,
    get() {
      return this.parentElement ?? document.body;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return measureElement(this).height;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return measureElement(this).width;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    get() {
      return measureElement(this).height;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
      return measureElement(this).width;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
    configurable: true,
    get() {
      return parsePixels(this.style.top) ?? 0;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
    configurable: true,
    get() {
      return scrollTops.get(this) ?? 0;
    },
    set(value: number) {
      scrollTops.set(this, value);
      queueMicrotask(() => this.dispatchEvent(new Event('scroll')));
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'scrollLeft', {
    configurable: true,
    get() {
      return scrollLefts.get(this) ?? 0;
    },
    set(value: number) {
      scrollLefts.set(this, value);
      queueMicrotask(() => this.dispatchEvent(new Event('scroll')));
    },
  });

  HTMLElement.prototype.scrollTo = function scrollTo(
    optionsOrX?: ScrollToOptions | number,
    y?: number,
  ) {
    const top =
      typeof optionsOrX === 'object'
        ? optionsOrX.top
        : y !== undefined
          ? y
          : optionsOrX;

    if (typeof top === 'number') {
      this.scrollTop = top;
    }

    this.dispatchEvent(new Event('scroll'));
  };

  HTMLElement.prototype.scrollBy = function scrollBy(
    optionsOrX?: ScrollToOptions | number,
    y?: number,
  ) {
    const top =
      typeof optionsOrX === 'object'
        ? optionsOrX.top
        : y !== undefined
          ? y
          : optionsOrX;

    if (typeof top === 'number') {
      this.scrollTop += top;
    }

    this.dispatchEvent(new Event('scroll'));
  };
}
