import type {
  ScrollToItemOpts,
  ChatCallback,
  IdentifiableMessage,
  OnAffixCallback,
  OnMessagesCallback,
} from './types';

/**
 * Options for scrolling to a specific index or message in the chat viewer.
 */
const DEFAULT_SCROLL_OPTS: ScrollToItemOpts = { align: 'end' };

/**
 * A helper function that creates a callback to scroll to the bottom of the chat viewer when the chat is at the bottom.
 * It can be used to scroll to the new messages or to the suffix when it is visible.
 * It returns a generic {@link ChatCallback} that can be used with the chat viewer.
 * 
 * @param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
 * @returns {ChatCallback<M>} A callback that performs the scroll action.
 */
export function followAtBottom<M extends IdentifiableMessage>(
  opts: ScrollToItemOpts = DEFAULT_SCROLL_OPTS,
): ChatCallback<M> {
  return (chat) => {
    if (chat.atBottom) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
  };
}

/**
 * A helper function that creates a callback to scroll to the bottom of the chat viewer.
 * It returns a generic {@link ChatCallback} that can be used with the chat viewer.
 *
 * @param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
 * @returns {ChatCallback<M>} A callback that performs the scroll action.
 */
export function followAlways<M extends IdentifiableMessage>(
  opts: ScrollToItemOpts = DEFAULT_SCROLL_OPTS,
): ChatCallback<M> {
  return (chat) => requestAnimationFrame(() => chat.scrollToBottom(opts));
}

/**
 * Performs a scroll to the bottom of the chat viewer when a new message is added.
 * It returns a generic {@link OnMessagesCallback} that can be used with the chat viewer.
 * 
 * @example
 * ```tsx
 * <ChatViewer
 *   messages={messages}
 *   renderMessage={renderMessage}
 *   onNewerMessages={followEveryMessage({ smooth: true })}
 * />
 * ```
 *
 * @param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
 * @returns {OnMessagesCallback<M>} A callback that performs the scroll action.
 */
export function followEveryMessage<M extends IdentifiableMessage>(
  opts: ScrollToItemOpts = DEFAULT_SCROLL_OPTS,
): OnMessagesCallback<M> {
  return (chat) => {
    return requestAnimationFrame(() => chat.scrollToBottom(opts));
  };
}

/**
 * Performs a scroll to the bottom of the chat viewer when the chat is at the bottom.
 * It returns a generic {@link OnMessagesCallback} that can be used with the chat viewer.
 * Typical behavior of the chat apps is to scroll to the bottom when a new message arrives, but only if the user is already at the bottom of the chat.
 * It will not scroll if the user has scrolled up to view older messages.
 * 
 * @example
 * ```tsx
 * <ChatViewer
 *   messages={messages}
 *   renderMessage={renderMessage}
 *   onNewerMessages={followMessagesAtBottom()}
 * />
 * ```
 *
 * @param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
 * @returns {OnMessagesCallback<M>} A callback that performs the scroll action.
 */
export function followMessagesAtBottom<M extends IdentifiableMessage>(
  opts: ScrollToItemOpts = DEFAULT_SCROLL_OPTS,
): OnMessagesCallback<M> {
  return (chat) => {
    if (chat.atBottom) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
  };
}

/**
 * Performs a scroll to the bottom of the chat when a message matches the provided condition.
 * This is useful for following specific messages that meet a certain criteria, such as mentions or keywords.
 * Typical behavior of the chat apps is to scroll to the bottom when a new message arrives, but only if the user is already at the bottom of the chat.
 * When user scrolls up to view older messages, it will not scroll automatically.
 * When browsing messages history chat apps usually scroll to the bottom only when user sends a new message.
 * 
 * @example
 * ```tsx
 * <ChatViewer
 *   messages={messages}
 *   renderMessage={renderMessage}
 *   onNewerMessages={followMessagesBy(
 *     (message => message.type === 'mention'
 *   )}
 * />
 *
 * @param shouldFollow - A function that determines if any of the received messages should trigger a scroll action.
 * @param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
 * @returns {OnMessagesCallback<M>} A callback that performs the scroll action.
 */
export function followMessagesBy<M extends IdentifiableMessage>(
  shouldFollow: (message: M) => boolean,
  opts: ScrollToItemOpts = DEFAULT_SCROLL_OPTS,
): OnMessagesCallback<M> {
  return (chat, newMessages) => {
    if (newMessages.some(shouldFollow)) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
    return followMessagesAtBottom<M>(opts)(chat, newMessages);
  };
}

/**
 * This is typically used to scroll to the bottom of the chat when the suffix is visible.
 * For example, when suffix is a typing indicator and it appears when someone is typing a message.
 * 
 * @param opts - {@link ScrollToItemOpts} options for controlling the scroll behavior
 * @returns {OnAffixCallback<M>} A callback that performs the scroll action when the suffix is visible.
 * 
 * 
 */
export function followSuffixAtBottom<M extends IdentifiableMessage>(
  opts: ScrollToItemOpts = DEFAULT_SCROLL_OPTS,
): OnAffixCallback<M> {
  return (chat, suffixVisible) => {
    if (suffixVisible && chat.atBottom) {
      return requestAnimationFrame(() => chat.scrollToBottom(opts));
    }
  };
}
