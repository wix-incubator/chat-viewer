import { mockResizeObserver } from 'jsdom-testing-mocks';

let resizeObserver: ReturnType<typeof mockResizeObserver> | undefined;

export function getResizeObserver() {
  resizeObserver ??= mockResizeObserver();
  return resizeObserver;
}
