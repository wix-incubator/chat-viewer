import { act, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  type ReactNode,
  VIEWPORT_HEIGHT,
  flushFrames,
  makeMessages,
  renderedMessageIds,
  renderChat,
} from './utils/test-utils';

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
      style: { width: 320, height: 120 },
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
