import { mockResizeObserver } from 'jsdom-testing-mocks';

type ResizeObserverMock = ReturnType<typeof mockResizeObserver>;

let resizeObserverMock: ResizeObserverMock | undefined;

export function installResizeObserverMock() {
  resizeObserverMock = mockResizeObserver();
}

export function getResizeObserverMock() {
  if (!resizeObserverMock) {
    throw new Error('ResizeObserver mock has not been installed.');
  }

  return resizeObserverMock;
}
