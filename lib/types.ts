import type {
  CSSProperties,
  KeyboardEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  WheelEventHandler,
} from 'react';

import type { ScrollToIndexOpts as VirtuaScrollToIndexOpts, VListHandle, VListProps } from 'virtua';
import type { PREFIX_ID, SUFFIX_ID } from './const';

/**
 * A special PrefixId type that represents the ID for the prefix element in the chat viewer.
 */
export type PrefixId = typeof PREFIX_ID;

/**
 * A special SuffixId type that represents the ID for the suffix element in the chat viewer.
 */
export type SuffixId = typeof SUFFIX_ID;

/**
 * AffixId type that can be either a {@link PrefixId} or {@link SuffixId}.
 * Used to identify special affix elements in the chat viewer.
 */
export type AffixId = PrefixId | SuffixId;

/**
 * ChatAlignment type that can be either 'top' or 'bottom'.
 * Determines whether new messages appear at the top or bottom of the chat viewer.
 */
export type ChatAlignment = 'top' | 'bottom';

/**
 * IdentifiableMessage type that must have an `id` property.
 * This is the base type for messages used in the chat viewer.
 * 
 * This library relies on the `id` property to uniquely identify messages.
 */
export type IdentifiableMessage = { id: string | number };

/**
 * MessageId type that can be either a message ID or an affix ID ({@link AffixId} or {@link SuffixId}).
 */
export type MessageId<M extends IdentifiableMessage = IdentifiableMessage> =
  | M['id']
  | AffixId;

/**
 * General callback that receives a {@link ChatViewerHandle} instance.
 */
export type ChatCallback<M extends IdentifiableMessage = IdentifiableMessage> =
  (handle: ChatViewerHandle<M>) => void;

/**
 * Callback fired when messages updated.
 * This library automatically tracks changes to the `messages` prop, so this callback will receive only new messages.
 * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
 * @param messages - The current messages.
 */
export type OnMessagesCallback<
  M extends IdentifiableMessage = IdentifiableMessage,
> = (handle: ChatViewerHandle<M>, messages: M[]) => void;

/**
 * Callback fired when the {@link ChatViewerProps.prefix} or {@link ChatViewerProps.suffix} node is displayed in the viewport.
 * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
 * @param isDisplayed - Whether the prefix or suffix is displayed.
 */
export type OnAffixCallback<
  M extends IdentifiableMessage = IdentifiableMessage,
> = (handle: ChatViewerHandle<M>, isDisplayed: boolean) => void;

/**
 * @interface
 * 
 * Options for scrolling to a specific index or message in the chat viewer.
 *
 * @property align Alignment of the item. Can be:
 *   - `start`: Align the item to the start of the list.
 *   - `center`: Align the item to the center of the list.
 *   - `end`: Align the item to the end of the list.
 *   - `nearest`: If the item is already completely visible, don't scroll. Otherwise scroll until it becomes visible.
 *   Default: `"start"`.
 *
 * @property offset Additional offset from the scrolled position. Default: `0`.
 *
 * @property smooth If true, scrolling animates smoothly. Use with caution for performance. Default: `false`.
 *
 * @see https://github.com/inokawa/virtua#scrolltoindex
 */
export type ScrollToItemOpts = VirtuaScrollToIndexOpts;

/**
 * Props for the ChatViewer component.
 *
 * @typeParam M - The message type, which must extend {@link IdentifiableMessage}.
 */
export interface ChatViewerProps<
  M extends IdentifiableMessage = IdentifiableMessage,
> {
  /**
   * Style for the root element of the chat viewer.
   */
  style?: CSSProperties;
  /**
   * Class name for the root element of the chat viewer.
   */
  className?: string;
  /**
   * Style for the scrollable container.
   */
  scrollerStyle?: CSSProperties;
  /**
   * Class name for the scrollable container.
   */
  scrollerClassName?: string;

  /**
   * Alignment of the chat list. Determines whether new messages appear at the top or bottom.
   *
   * @defaultValue 'bottom'
   */
  alignment?: ChatAlignment;
  /**
   * Number of extra items to render beyond the visible area (for virtualization performance).
   * Passed to Virtua's `overscan` prop.
   * 
   * @see https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#overscan
   */
  overscan?: VListProps['overscan'];
  /**
   * Number of items to render on the server for SSR. Passed to Virtua's `ssrCount` prop.
   * 
   * @see https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#ssrcount
   */
  ssrCount?: VListProps['ssrCount'];

  /**
   * Indexes of messages to keep mounted even when out of view.
   * This allows you to preserve the state of messages that are not currently visible.
   */
  keepMountedIndexes?: number[];
  /**
   * {@link MessageId}s of messages to keep mounted even when out of view.
   */
  keepMountedIds?: MessageId<M>[];

  /**
   * The array of messages to display in the chat viewer.
   */
  messages: M[];
  /**
   * Function to render a message.
   * 
   * @param message - The message to render.
   * @returns A React element or null.
   */
  renderMessage: (message: M) => ReactElement | null;
  /**
   * React node to render before the message list (e.g., a header or history loader).
   * It can be conditionally displayed. When changed, it will trigger a {@link onPrefixDisplay} callback.
   * 
   * @defaultValue null
   */
  prefix?: ReactNode;
  /**
   * React node to render after the message list (e.g., a footer or typing indicator).
   * It can be conditionally displayed. When changed, it will trigger a {@link onSuffixDisplay} callback.
   * 
   * @defaultValue null
   */
  suffix?: ReactNode;

  /**
   * Callback fired when the user scrolls to the end of the history (top or bottom, depending on alignment).
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   */
  onHistoryEndReached?: ChatCallback<M>;
  /**
   * Offset in pixels from the end of the history at which to trigger {@link onHistoryEndReached}.
   * 
   * @defaultValue 10
   */
  historyEndOffset?: number;

  /**
   * Callback fired on scroll with the current scroll offset.
   * 
   * @param offset - The current scroll offset.
   */
  onScroll?: (offset: number) => void;
  /**
   * Callback fired when scrolling ends.
   */
  onScrollEnd?: () => void;
  /**
   * Callback fired on wheel events in the scrollable container.
   */
  onWheel?: WheelEventHandler;
  /**
   * Callback fired on key down events in the scrollable container.
   */
  onKeyDown?: KeyboardEventHandler;
  /**
   * Callback fired when older messages are requested (e.g., user scrolls to the top).
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   * @param messages - The current messages.
   */
  onOlderMessages?: OnMessagesCallback<M>;
  /**
   * Callback fired when newer messages are requested (e.g., user scrolls to the bottom).
   * 
   * @example
   * You might want to use this callback with utility functions like {@link followEveryMessage}, {@link followMessagesAtBottom}, or {@link followMessagesBy} to automatically scroll to automatically follow new messages.
   * 
   * ```tsx
   * <ChatViewer
   *   messages={messages}
   *   renderMessage={renderMessage}
   *   onNewerMessages={followMessagesAtBottom()}
   * />
   * ```
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   * @param messages - The current messages.
   * @defaultValue {@link followMessagesAtBottom} - scrolls to the bottom when viewport is at the bottom of the history.
   */
  onNewerMessages?: OnMessagesCallback<M>;
  /**
   * Callback fired when the viewport reaches the top of the message list.
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   */
  onAtTop?: ChatCallback<M>;
  /**
   * Callback fired when the viewport reaches the bottom of the message list.
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   */
  onAtBottom?: ChatCallback<M>;
  /**
   * Callback fired when the prefix node is displayed in the viewport.
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   * @param isDisplayed - Whether the prefix is displayed.
   */
  onPrefixDisplay?: OnAffixCallback<M>;
  /**
   * Callback fired when the suffix node is displayed in the viewport.
   * 
   * @param handle - {@link ChatViewerHandle} instance. Allows you to control the chat viewer.
   * @param isDisplayed - Whether the suffix is displayed.
   * @defaultValue {@link followSuffixAtBottom} - scrolls to the bottom when viewport when suffix is displayed at the bottom of the history.
   */
  onSuffixDisplay?: OnAffixCallback<M>;
}

/**
 * Props for the ChatViewer component with a forwarded ref.
 * 
 * @internal
 */
export interface ChatViewerPropsWithRef<
  M extends IdentifiableMessage = IdentifiableMessage,
> extends ChatViewerProps<M> {
  /**
   * A React ref created by `useRef` hook. It will expose {@link ChatViewerHandle} instance for imperative control over the chat viewer.
   */
  ref: Ref<ChatViewerHandle<M>>;
}

export interface ChatViewerHandle<
  M extends IdentifiableMessage = IdentifiableMessage,
> {
  /**
   * Reference to the underlying Virtua's `VListHandle`, or null if not available.
   *
   * @see https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListHandle.md
   */
  vListHandle: VListHandle | null;
  /**
   * Whether the viewport is currently at the top of the message list.
   * Use {@link ChatViewerProps#onAtTop} to be notified when the viewport reaches the top.
   */
  atTop: boolean;
  /**
   * Whether the viewport is currently at the bottom of the message list.
   * Use {@link ChatViewerProps#onAtBottom} to be notified when the viewport reaches the bottom.
   */
  atBottom: boolean;
  /**
   * Map of message IDs to their corresponding indexes in the list.
   */
  idsToIndexes: Map<MessageId<M>, number>;
  /**
   * Map of indexes to their corresponding {@link MessageId} in the list.
   */
  indexesToIds: Map<number, MessageId<M>>;
  /**
   * Current scroll offset, or undefined if not available.
   */
  scrollOffset: number | undefined;
  /**
   * Total scrollable size, or undefined if not available.
   */
  scrollSize: number | undefined;
  /**
   * Size of the viewport, or undefined if not available.
   */
  viewportSize: number | undefined;
  /**
   * The {@link MessageId} of the newest message that is present in the viewport, or undefined if not available.
   */
  newestSeenId: MessageId<M> | undefined;
  /**
   * The index of the newest message that is present in the viewport, or undefined if not available.
   */
  newestSeenIndex: number | undefined;
  /**
   * The {@link MessageId} of the oldest message that has been seen (was at least once within the viewport), or undefined if not available.
   */
  oldestSeenId: MessageId<M> | undefined;
  /**
   * The index of the oldest message that has been seen (was at least once within the viewport), or undefined if not available.
   */
  oldestSeenIndex: number | undefined;
  /**
   * The index of the oldest message currently visible in the viewport.
   */
  oldestIndexInViewport: number;
  /**
   * The {@link MessageId} of the oldest message currently visible in the viewport, or undefined if not available.
   */
  oldestIdInViewport: MessageId<M> | undefined;
  /**
   * The index of the newest message currently visible in the viewport.
   */
  newestIndexInViewport: number;
  /**
   * The {@link MessageId} of the newest message currently visible in the viewport, or undefined if not available.
   */
  newestIdInViewport: MessageId<M> | undefined;

  /**
   * Returns true if the given index is currently visible in the viewport.
   * @param index - The index to check.
   */
  isIndexInViewport(index: number): boolean;
  /**
   * Returns true if the given message ID is currently visible in the viewport.
   * @param id - The {@link MessageId} to check.
   */
  isIdInViewport(id: MessageId<M>): boolean;
  /**
   * Returns true if the given index has ever been seen in the viewport.
   * @param index - The index to check.
   */
  wasIndexSeen: (index: number) => boolean;
  /**
   * Returns true if the given message ID has ever been seen in the viewport.
   * @param id - The {@link MessageId} to check.
   */
  wasIdSeen: (id: MessageId<M>) => boolean;
  /**
   * Returns the scroll offset for the given index, or undefined if not available.
   * @param index - The index to get the offset for.
   */
  getIndexOffset(index: number): number | undefined;
  /**
   * Returns the scroll offset for the given message ID, or undefined if not available.
   * @param id - The {@link MessageId} to get the offset for.
   */
  getIdOffset(id: MessageId<M>): number | undefined;
  /**
   * Returns the size of the item at the given index, or undefined if not available.
   * @param index - The index to get the size for.
   */
  getIndexSize(index: number): number | undefined;
  /**
   * Returns the size of the item with the given message ID, or undefined if not available.
   * @param id - The {@link MessageId} to get the size for.
   */
  getIdSize(id: MessageId<M>): number | undefined;
  /**
   * Scrolls to the specified offset.
   * @param offset - The scroll offset to scroll to.
   */
  scrollToOffset(offset: number): void;
  /**
   * Scrolls to the specified index.
   * @param index - The index to scroll to.
   * @param opts - Optional scroll options.
   */
  scrollToIndex(index: number, opts?: ScrollToItemOpts): void;
  /**
   * Scrolls to the item with the specified message ID.
   * @param id - The message ID to scroll to.
   * @param opts - Optional scroll options.
   */
  scrollToId(id: MessageId<M>, opts?: ScrollToItemOpts): void;
  /**
   * Scrolls by the specified offset.
   * @param offset - The amount to scroll by.
   */
  scrollBy(offset: number): void;
  /**
   * Scrolls to the top of the messages list.
   * @param opts - Optional scroll options.
   */
  scrollToTop(opts?: ScrollToItemOpts): void;
  /**
   * Scrolls to the bottom of the messages list.
   * @param opts - Optional scroll options.
   */
  scrollToBottom(opts?: ScrollToItemOpts): void;
}
