import type { ScrollToIndexOpts as ScrollOpts } from 'virtua';

import type {
  ChatCallback,
  IdentifiableMessage,
  OnAffixCallback,
  OnMessagesCallback,
} from './types';

const DEFAULT_SCROLL_OPTS: ScrollOpts = { align: 'end' };

export function followAtBottom<M extends IdentifiableMessage>(
  opts: ScrollOpts = DEFAULT_SCROLL_OPTS,
): ChatCallback<M> {
  return (chat) => {
    if (chat.atBottom) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
  };
}

export function followAlways<M extends IdentifiableMessage>(
  opts: ScrollOpts = DEFAULT_SCROLL_OPTS,
): ChatCallback<M> {
  return (chat) => requestAnimationFrame(() => chat.scrollToBottom(opts));
}

export function followEveryMessage<M extends IdentifiableMessage>(
  opts: ScrollOpts = DEFAULT_SCROLL_OPTS,
): OnMessagesCallback<M> {
  return (chat) => {
    return requestAnimationFrame(() => chat.scrollToBottom(opts));
  };
}

export function followMessagesAtBottom<M extends IdentifiableMessage>(
  opts: ScrollOpts = DEFAULT_SCROLL_OPTS,
): OnMessagesCallback<M> {
  return (chat) => {
    if (chat.atBottom) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
  };
}

export function followMessagesBy<M extends IdentifiableMessage>(
  shouldFollow: (message: M) => boolean,
  opts: ScrollOpts = DEFAULT_SCROLL_OPTS,
): OnMessagesCallback<M> {
  return (chat, newMessages) => {
    if (newMessages.some(shouldFollow)) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
    return followMessagesAtBottom<M>(opts)(chat, newMessages);
  };
}

export function followSuffixAtBottom<M extends IdentifiableMessage>(
  opts: ScrollOpts = DEFAULT_SCROLL_OPTS,
): OnAffixCallback<M> {
  return (chat, suffixVisible) => {
    if (suffixVisible && chat.atBottom) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
  };
}
