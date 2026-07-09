import { describe, expect, it, vi } from 'vitest';

import {
  type ChatViewerHandle,
  followEveryMessage,
  followMessagesAtBottom,
  followMessagesBy,
} from '../lib';

type TestMessage = {
  id: string;
  role: 'user' | 'assistant';
};

function makeMessage(role: TestMessage['role']): TestMessage {
  return { id: `${role}-message`, role };
}

function createChatHandle(atBottom: boolean): ChatViewerHandle<TestMessage> & {
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
  await new Promise(resolve => requestAnimationFrame(resolve));
}

async function flushFrames(count = 2) {
  for (let index = 0; index < count; index++) {
    await nextFrame();
  }
}

describe('follow strategies', () => {
  it('follows every appended message', async () => {
    const chat = createChatHandle(false);

    followEveryMessage<TestMessage>()(chat, [makeMessage('user')]);
    await flushFrames();

    expect(chat.scrollToBottom).toHaveBeenCalledWith({ align: 'end' });
  });

  it('follows appended messages only when already at bottom', async () => {
    const chatAwayFromBottom = createChatHandle(false);
    const chatAtBottom = createChatHandle(true);

    followMessagesAtBottom<TestMessage>()(chatAwayFromBottom, [
      makeMessage('assistant'),
    ]);
    followMessagesAtBottom<TestMessage>()(chatAtBottom, [
      makeMessage('assistant'),
    ]);
    await flushFrames();

    expect(chatAwayFromBottom.scrollToBottom).not.toHaveBeenCalled();
    expect(chatAtBottom.scrollToBottom).toHaveBeenCalledWith({ align: 'end' });
  });

  it('follows matching messages even when not already at bottom', async () => {
    const chat = createChatHandle(false);
    const followAssistantMessages = followMessagesBy<TestMessage>(
      message => message.role === 'assistant',
    );

    followAssistantMessages(chat, [makeMessage('user')]);
    await flushFrames();

    expect(chat.scrollToBottom).not.toHaveBeenCalled();

    followAssistantMessages(chat, [makeMessage('assistant')]);
    await flushFrames();

    expect(chat.scrollToBottom).toHaveBeenCalledWith({ align: 'end' });
  });
});
