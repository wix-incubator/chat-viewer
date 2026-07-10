import { createElement, type ReactNode, createRef } from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  ChatViewer,
  type ChatViewerHandle,
  type ChatViewerProps,
} from '../../lib';
import { measureElement } from './dom-utils';
import { MessageView } from './message-view';
import { getResizeObserver } from './resize-observer';

export type TestMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export const VIEWPORT_HEIGHT = 120;

export function makeMessages(count: number, start = 0): TestMessage[] {
  return Array.from({ length: count }, (_, index) => {
    const id = `message-${start + index}`;

    return {
      id,
      role: index % 2 === 0 ? 'user' : 'assistant',
      content: `Message ${start + index}`,
    };
  });
}

export function makeMessage(role: TestMessage['role']): TestMessage {
  return { id: `${role}-message`, role, content: `${role} message` };
}

export async function renderChat(
  props: Partial<ChatViewerProps<TestMessage>> & {
    messages: TestMessage[];
  },
) {
  const ref = createRef<ChatViewerHandle<TestMessage>>();
  const baseProps: ChatViewerProps<TestMessage> = {
    alignment: 'top',
    bufferSize: 0,
    style: { width: 320, height: VIEWPORT_HEIGHT },
    scrollerStyle: { width: 320, height: VIEWPORT_HEIGHT },
    renderMessage: message => createElement(MessageView, { message }),
    ...props,
  };
  const view = render(
    createElement(ChatViewer<TestMessage>, { ref, ...baseProps }),
  );
  resizeObservedElements();

  const rerender = async (nextProps: Partial<ChatViewerProps<TestMessage>>) => {
    Object.assign(baseProps, nextProps);
    view.rerender(
      createElement(ChatViewer<TestMessage>, { ref, ...baseProps }),
    );
    resizeObservedElements();
    await flushFrames();
  };

  await flushFrames();

  return { ref, rerender };
}

export function renderedMessageIds() {
  return screen
    .queryAllByTestId('message')
    .map(element => element.dataset.messageId);
}

export function createChatHandle(
  atBottom: boolean,
): ChatViewerHandle<TestMessage> & {
  scrollToBottom: ReturnType<typeof vi.fn>;
} {
  const handle: Partial<ChatViewerHandle<TestMessage>> = {
    atBottom,
    scrollOffset: atBottom ? 900 : 0,
    scrollSize: 1000,
    viewportSize: 100,
  };

  handle.scrollToBottom = vi.fn(() => {
    handle.scrollOffset = 900;
  });

  return handle as ChatViewerHandle<TestMessage> & {
    scrollToBottom: ReturnType<typeof vi.fn>;
  };
}

async function nextFrame() {
  resizeObservedElements();

  await new Promise<void>(resolve => {
    requestAnimationFrame(() => resolve());
  });

  resizeObservedElements();
}

export async function flushFrames(count = 3) {
  for (let index = 0; index < count; index++) {
    await nextFrame();
  }
}

function resizeObservedElements() {
  const resizeObserver = getResizeObserver();
  const elements = resizeObserver.getObservedElements();

  for (const element of elements) {
    const { width, height } = measureElement(element);

    resizeObserver.mockElementSize(element, {
      contentBoxSize: { inlineSize: width, blockSize: height },
    });
  }

  resizeObserver.resize(elements);
}

export { type ReactNode };
