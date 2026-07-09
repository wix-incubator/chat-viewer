import { describe, expect, it } from 'vitest';

import {
  followEveryMessage,
  followMessagesAtBottom,
  followMessagesBy,
} from '../lib';
import {
  type TestMessage,
  createChatHandle,
  flushFrames,
  makeMessage,
} from './utils/test-utils';

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
