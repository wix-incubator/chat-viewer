const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 40;
const scrollTops = new WeakMap<HTMLElement, number>();
const scrollLefts = new WeakMap<HTMLElement, number>();

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

function parsePixels(value: string): number | undefined {
  if (!value.endsWith('px')) return;

  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function measure(element: Element): { width: number; height: number } {
  if (!(element instanceof HTMLElement)) {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  const child = element.firstElementChild;
  const childSize = child ? measure(child) : undefined;
  const explicitWidth =
    parsePixels(element.style.width) ?? parsePixels(element.style.minWidth);
  const explicitHeight =
    parsePixels(element.style.height) ?? parsePixels(element.style.minHeight);

  return {
    width: explicitWidth ?? childSize?.width ?? DEFAULT_WIDTH,
    height: explicitHeight ?? childSize?.height ?? DEFAULT_HEIGHT,
  };
}

function contentRectFor(element: Element): DOMRectReadOnly {
  const { width, height } = measure(element);

  return {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRectReadOnly;
}

class TestResizeObserver {
  private readonly callback: ResizeObserverCallback;
  private readonly targets = new Set<Element>();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.targets.add(target);
    queueMicrotask(() => this.flush(target));
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }

  private flush(target: Element) {
    if (!this.targets.has(target)) return;

    this.callback(
      [{ target, contentRect: contentRectFor(target) } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    );
  }
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  configurable: true,
  writable: true,
  value: TestResizeObserver,
});

Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  configurable: true,
  get() {
    return this.parentElement ?? document.body;
  },
});

Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
  configurable: true,
  get() {
    return measure(this).height;
  },
});

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  get() {
    return measure(this).width;
  },
});

Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  get() {
    return measure(this).height;
  },
});

Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
  configurable: true,
  get() {
    return measure(this).width;
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
