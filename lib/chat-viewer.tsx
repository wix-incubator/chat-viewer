import {
  type Ref,
  type ReactElement,
  type CSSProperties,
  Fragment,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  type ScrollToIndexOpts,
  type VirtualizerHandle,
  Virtualizer,
} from 'virtua';

import { useProps, useCompareMessages, useSeenIdsTracking } from './hooks';
import { IDX_NOT_FOUND, PREFIX_ID, SUFFIX_ID } from './const';
import { isIndexInSeenRanges } from './seen-ranges';
import type {
  MessageId,
  ChatViewerHandle,
  ChatViewerPropsWithRef,
  ChatViewerProps,
  IdentifiableMessage,
} from './types';
import {
  getFirstMappedIndexInRange,
  getLastMappedIndexInRange,
  getViewportEndOffset,
  isAtBottom,
  isAtTop,
  normalizeNegativeIndex,
  toItem,
} from './utils';

/**
 * ChatViewer component with forwarded ref.
 * @internal
 */
function ChatViewerWithRef<M extends IdentifiableMessage>(
  props: ChatViewerProps<M>,
  ref: Ref<ChatViewerHandle<M>>,
) {
  const {
    style,
    className,
    scrollerStyle,
    scrollerClassName,
    alignment,
    overscan,
    bufferSize,
    keepMountedIndexes,
    keepMountedIds,
    seenDelayMs,
    ssrCount,
    messages,
    renderMessage,
    prefix,
    suffix,
    historyEndOffset,
    onHistoryEndReached,
    onScroll,
    onScrollEnd,
    onWheel,
    onKeyDown,
    onOlderMessages,
    onNewerMessages,
    onAtTop,
    onAtBottom,
    onPrefixDisplay,
    onSuffixDisplay,
  } = useProps<M>(props);
  const handle = ref as Ref<ChatViewerHandle<M>>;
  const virtualizerHandle = useRef<VirtualizerHandle>(null);
  const [atTop, setAtTop] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const { prepended: older, appended: newer } = useCompareMessages(messages);
  const reverse = alignment === 'bottom';

  /*
    *shift* means *layout shift*.
    This property indicates whether viewport content is shifted or not.
    It allows us to lock scroll ignoring position of the elements in the parent.
    For chat viewer it happens only when older messages are prepended.
    Issue: https://github.com/inokawa/virtua/issues/284#issuecomment-2269920855
  */
  const shift = Boolean(older.length);

  const prefixItem = useMemo(
    () => (prefix ? toItem(PREFIX_ID, prefix) : null),
    [prefix],
  );
  const prefixDisplayed = Boolean(prefixItem);

  const suffixItem = useMemo(
    () => (suffix ? toItem(SUFFIX_ID, suffix) : null),
    [suffix],
  );
  const suffixDisplayed = Boolean(suffixItem);

  const items = useMemo(
    () => [
      ...(prefixItem ? [prefixItem] : []),
      ...messages.map((message, index, messages) =>
        toItem<M>(message.id, renderMessage(message, index, messages)),
      ),
      ...(suffixItem ? [suffixItem] : []),
    ],
    [messages, prefixItem, renderMessage, suffixItem],
  );

  const [idsToIndexes, indexesToIds] = useMemo<
    [Map<MessageId<M>, number>, Map<number, MessageId<M>>]
  >(() => {
    const prefixOffset = prefixItem ? 1 : 0;
    return [
      new Map<MessageId<M>, number>(
        messages.map((message, index) => [message.id, index + prefixOffset]),
      ),
      new Map<number, MessageId<M>>(
        messages.map((message, index) => [index + prefixOffset, message.id]),
      ),
    ];
  }, [messages, prefixItem]);

  const keepMounted = useMemo(() => {
    if (keepMountedIndexes) {
      return keepMountedIndexes;
    }
    if (keepMountedIds) {
      return keepMountedIds
        .map(id => idsToIndexes.get(id))
        .filter((index): index is number => index !== undefined);
    }
    return [];
  }, [keepMountedIndexes, keepMountedIds, idsToIndexes]);

  const {
    newestSeenId,
    newestSeenIndex,
    oldestSeenId,
    oldestSeenIndex,
    seenRanges,
    trackSeen,
  } = useSeenIdsTracking(
    {
      virtualizerHandle,
      vListHandle: virtualizerHandle,
      idsToIndexes,
      indexesToIds,
      seenDelayMs,
    },
    messages,
  );

  const handlers = useMemo<ChatViewerHandle<M>>(
    () => ({
      virtualizerHandle: virtualizerHandle.current,
      vListHandle: virtualizerHandle.current,
      scrollOffset: virtualizerHandle.current?.scrollOffset,
      scrollSize: virtualizerHandle.current?.scrollSize,
      viewportSize: virtualizerHandle.current?.viewportSize,
      atTop,
      atBottom,
      idsToIndexes,
      indexesToIds,
      newestSeenId,
      newestSeenIndex,
      oldestSeenId,
      oldestSeenIndex,
      get oldestIndexInViewport() {
        const virtualizer = virtualizerHandle.current;
        return (
          virtualizer?.findItemIndex(virtualizer.scrollOffset) ?? IDX_NOT_FOUND
        );
      },
      get oldestIdInViewport() {
        const index = getFirstMappedIndexInRange(
          indexesToIds,
          this.oldestIndexInViewport,
          this.newestIndexInViewport,
        );
        return index === undefined ? undefined : indexesToIds.get(index);
      },
      get newestIndexInViewport() {
        const virtualizer = virtualizerHandle.current;
        return virtualizer
          ? virtualizer.findItemIndex(
              getViewportEndOffset(
                virtualizer.scrollOffset,
                virtualizer.viewportSize,
              ),
            )
          : IDX_NOT_FOUND;
      },
      get newestIdInViewport() {
        const index = getLastMappedIndexInRange(
          indexesToIds,
          this.oldestIndexInViewport,
          this.newestIndexInViewport,
        );
        return index === undefined ? undefined : indexesToIds.get(index);
      },
      isIndexInViewport(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return (
          idx >= this.oldestIndexInViewport && idx <= this.newestIndexInViewport
        );
      },
      isIdInViewport(id: MessageId<M>) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.isIndexInViewport(index);
        }
        return false;
      },
      wasIndexSeen(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return isIndexInSeenRanges(seenRanges, idx);
      },
      wasIdSeen(id: MessageId<M>) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.wasIndexSeen(index);
        }
        return false;
      },
      getIndexOffset(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return virtualizerHandle.current?.getItemOffset(idx);
      },
      getIdOffset(id: MessageId<M>) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.getIndexOffset(index);
        }
      },
      getIndexSize(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return virtualizerHandle.current?.getItemSize(idx);
      },
      getIdSize(id: MessageId<M>) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.getIndexSize(index);
        }
      },
      scrollToOffset(offset: number) {
        virtualizerHandle.current?.scrollTo(offset);
      },
      scrollToIndex(index: number, opts: ScrollToIndexOpts) {
        virtualizerHandle.current?.scrollToIndex(
          normalizeNegativeIndex(index, items.length),
          opts,
        );
      },
      scrollToId(id: MessageId<M>, opts: ScrollToIndexOpts) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          this.scrollToIndex(index, opts);
        }
      },
      scrollBy(offset: number) {
        virtualizerHandle.current?.scrollBy(offset);
      },
      scrollToTop(opts?: ScrollToIndexOpts) {
        this.scrollToIndex(0, opts);
      },
      scrollToBottom(opts?: ScrollToIndexOpts) {
        this.scrollToIndex(-1, opts);
      },
    }),
    [
      atTop,
      atBottom,
      idsToIndexes,
      indexesToIds,
      items.length,
      newestSeenId,
      newestSeenIndex,
      oldestSeenId,
      oldestSeenIndex,
      seenRanges,
    ],
  );

  useImperativeHandle<ChatViewerHandle<M>, ChatViewerHandle<M>>(
    handle,
    () => handlers,
    [handlers],
  );

  const vListStyle = useMemo<CSSProperties>(
    () => ({
      overflowY: 'auto',
      contain: 'strict',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      /*
      overscroll-behavior: contain is needed here to prevent scrolling
      the whole page when the user scrolls to the top or bottom of the chat.
      MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
     */
      overscrollBehavior: 'contain',
      /*
      overflow-x: hidden is required here, to prevent scroll wobbling with animated messages.
      Issue: https://github.com/inokawa/virtua/pull/485
     */
      overflowX: 'hidden',
      ...scrollerStyle,
    }),
    [scrollerStyle],
  );

  useEffect(() => {
    if (atTop) {
      onAtTop?.(handlers);
    }
  }, [handlers, atTop, onAtTop]);

  useEffect(() => {
    if (atBottom) {
      onAtBottom?.(handlers);
    }
  }, [handlers, atBottom, onAtBottom]);

  useEffect(
    () => void onPrefixDisplay?.(handlers, prefixDisplayed),
    [handlers, onPrefixDisplay, prefixDisplayed],
  );

  useEffect(
    () => void onSuffixDisplay(handlers, suffixDisplayed),
    [handlers, onSuffixDisplay, suffixDisplayed],
  );

  useEffect(() => {
    if (older.length) {
      onOlderMessages?.(handlers, older);
    }
  }, [handlers, older, onOlderMessages]);

  useEffect(() => {
    if (newer.length) {
      onNewerMessages?.(handlers, newer);
    }
  }, [handlers, newer, onNewerMessages]);

  const handleScroll = useCallback(
    (offset: number) => {
      void onScroll?.(offset);

      if (virtualizerHandle.current) {
        const { viewportSize, scrollSize } = virtualizerHandle.current;

        setAtTop(isAtTop(offset));
        setAtBottom(isAtBottom(offset, scrollSize, viewportSize));

        const historyEndReached = offset < historyEndOffset;
        const viewportHasSize = viewportSize > 0;
        const historyIsScrollable =
          viewportHasSize && viewportSize < scrollSize;

        if (!atBottom && historyIsScrollable && historyEndReached) {
          void onHistoryEndReached?.(handlers);
        }
      }

      void trackSeen();
    },
    [
      onScroll,
      trackSeen,
      atBottom,
      historyEndOffset,
      onHistoryEndReached,
      handlers,
    ],
  );

  return (
    <div style={style} className={className}>
      <div
        className={scrollerClassName}
        style={vListStyle}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      >
        {reverse ? <div style={{ flexGrow: 1 }} /> : null}
        <Virtualizer
          ref={virtualizerHandle}
          shift={shift}
          bufferSize={bufferSize ?? overscan}
          keepMounted={keepMounted}
          ssrCount={ssrCount}
          onScroll={handleScroll}
          onScrollEnd={onScrollEnd}
        >
          {items.map(({ id, element }) => (
            <Fragment key={id}>{element}</Fragment>
          ))}
        </Virtualizer>
      </div>
    </div>
  );
}

/**
 * ChatViewer component that implements a virtualized chat viewer.
 * It supports features like prefix and suffix rendering,
 * scrolling to specific messages, and tracking seen messages.
 *
 * @typeParam M - Type of messages, which must extend {@link IdentifiableMessage}. It can be any type that has an `id` property for unique identifying messages.
 * @param {object} props - {@link ChatViewerProps} properties for the component and `ref` that will expose {@link ChatViewerHandle}'s methods.
 *
 * @inlineType ChatViewerPropsWithRef
 */
export const ChatViewer = memo(forwardRef(ChatViewerWithRef)) as <
  M extends IdentifiableMessage,
>(
  props: ChatViewerPropsWithRef<M>,
) => ReactElement;
