const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 40;

let scrollTops = new WeakMap<HTMLElement, number>();
let scrollLefts = new WeakMap<HTMLElement, number>();
let installed = false;

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

export function resetDomScrollState() {
  scrollTops = new WeakMap<HTMLElement, number>();
  scrollLefts = new WeakMap<HTMLElement, number>();
}

export function installDomMeasurementMocks() {
  if (installed) return;
  installed = true;

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

  HTMLElement.prototype.getBoundingClientRect =
    function getBoundingClientRect() {
      const { width, height } = measureElement(this);
      const top = parsePixels(this.style.top) ?? 0;

      return {
        x: 0,
        y: top,
        width,
        height,
        top,
        right: width,
        bottom: top + height,
        left: 0,
        toJSON() {
          return this;
        },
      };
    };

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
