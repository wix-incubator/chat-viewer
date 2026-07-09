import { type ReactNode, createRef } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  ChatViewer,
  type ChatViewerHandle,
  type ChatViewerProps,
} from '../lib';

type TestMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const VIEWPORT_HEIGHT = 120;
const MESSAGE_HEIGHT = 32;

function makeMessages(count: number, start = 0): TestMessage[] {
  return Array.from({ length: count }, (_, index) => {
    const id = `message-${start + index}`;

    return {
      id,
      role: index % 2 === 0 ? 'user' : 'assistant',
      content: `Message ${start + index}`,
    };
  });
}

function MessageView({ message }: { message: TestMessage }) {
  return (
    <div
      data-testid="message"
      data-message-id={message.id}
      style={{ height: MESSAGE_HEIGHT }}
    >
      {message.content}
    </div>
  );
}

function renderChat(
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
    renderMessage: message => <MessageView message={message} />,
    ...props,
  };
  const view = render(<ChatViewer<TestMessage> ref={ref} {...baseProps} />);

  const rerender = (nextProps: Partial<ChatViewerProps<TestMessage>>) => {
    Object.assign(baseProps, nextProps);
    view.rerender(<ChatViewer<TestMessage> ref={ref} {...baseProps} />);
  };

  return { host: view.container, ref, rerender };
}

function renderedMessageIds(host: HTMLElement) {
  return Array.from(
    host.querySelectorAll<HTMLElement>('[data-message-id]'),
  ).map(element => element.dataset.messageId);
}

async function nextFrame() {
  await act(async () => {
    await new Promise(resolve => requestAnimationFrame(resolve));
  });
}

async function flushFrames(count = 3) {
  for (let index = 0; index < count; index++) {
    await nextFrame();
  }
}

describe('ChatViewer', () => {
  it('renders chat messages and affixes', async () => {
    const onPrefixDisplay = vi.fn();
    const onSuffixDisplay = vi.fn();
    const prefix: ReactNode = <div data-testid="prefix">Loading history</div>;
    const suffix: ReactNode = <div data-testid="suffix">Assistant typing</div>;
    renderChat({
      bufferSize: VIEWPORT_HEIGHT,
      messages: makeMessages(3),
      onPrefixDisplay,
      onSuffixDisplay,
      prefix,
      suffix,
    });

    await flushFrames();

    expect(screen.getByText('Message 0')).not.toBeNull();
    expect(screen.getByText('Message 1')).not.toBeNull();
    expect(screen.getByText('Message 2')).not.toBeNull();
    expect(screen.getByText('Loading history')).not.toBeNull();
    expect(screen.getByText('Assistant typing')).not.toBeNull();
    expect(onPrefixDisplay).toHaveBeenLastCalledWith(expect.anything(), true);
    expect(onSuffixDisplay).toHaveBeenLastCalledWith(expect.anything(), true);
  });

  it('virtualizes large message lists', async () => {
    const messages = makeMessages(100);
    const { host } = renderChat({ messages });

    await flushFrames();

    const renderedIds = renderedMessageIds(host);

    expect(renderedIds.length).toBeGreaterThan(0);
    expect(renderedIds.length).toBeLessThan(messages.length);
  });

  it('scrolls to messages by id', async () => {
    const { host, ref } = renderChat({ messages: makeMessages(100) });

    await flushFrames();

    act(() => {
      ref.current?.scrollToId('message-80', { align: 'start' });
    });

    await waitFor(() => {
      expect(renderedMessageIds(host)).toContain('message-80');
    });
  });

  it('reports prepended and appended message batches', async () => {
    const initialMessages = makeMessages(3, 10);
    const onOlderMessages = vi.fn();
    const onNewerMessages = vi.fn();
    const { rerender } = renderChat({
      messages: initialMessages,
      onOlderMessages,
      onNewerMessages,
    });

    await flushFrames();
    onOlderMessages.mockClear();
    onNewerMessages.mockClear();

    const olderMessages = makeMessages(2);
    const withHistory = [...olderMessages, ...initialMessages];
    rerender({ messages: withHistory });
    await flushFrames();

    expect(onOlderMessages).toHaveBeenLastCalledWith(
      expect.anything(),
      olderMessages,
    );
    expect(onNewerMessages).not.toHaveBeenCalled();

    const newerMessages = makeMessages(2, 20);
    rerender({ messages: [...withHistory, ...newerMessages] });
    await flushFrames();

    expect(onNewerMessages).toHaveBeenLastCalledWith(
      expect.anything(),
      newerMessages,
    );
  });
});
