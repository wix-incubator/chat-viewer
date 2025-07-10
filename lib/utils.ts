import type { ReactNode } from 'react';

import type { IdentifiableMessage, MessageId } from './types';

export const normalizeNegativeIndex = (index: number, length: number) => {
  return index < 0 ? length + index : index;
};

export const toItem = <M extends IdentifiableMessage>(
  id: MessageId<M>,
  element: ReactNode,
) => ({
  id,
  element,
});

/*
 * We use 1.5 as a zero offset to account for the fact that
 * window.devicePixelRatio can be a decimal value and be greater than 1.
 *
 * Example: on MacBook with Retina display, the device pixel ratio is 2.
 *
 * Docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
 */
const ZERO_OFFSET = 1.5;

export const isAtBottom = (
  offset: number,
  scrollSize: number,
  viewportSize: number,
) => scrollSize - (offset + viewportSize) < ZERO_OFFSET;

export const isAtTop = (offset: number) => offset < ZERO_OFFSET;
