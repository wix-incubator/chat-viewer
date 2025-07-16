import {
  type Ref,
  type ReactElement,
  type CSSProperties,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { type ScrollToIndexOpts, type VListHandle, VList } from 'virtua';

import { useProps, useCompareMessages, useSeenIdsTracking } from './hooks';
import {
  IDX_NOT_FOUND,
  PREFIX_ID,
  SUFFIX_ID
} from './const';
import type {
  MessageId,
  ChatViewerHandle,
  ChatViewerPropsWithRef,
  ChatViewerProps,
  IdentifiableMessage,
} from './types';
import { isAtBottom, isAtTop, normalizeNegativeIndex, toItem } from './utils';

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
    keepMountedIndexes,
    keepMountedIds,
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
  const vListHandle = useRef<VListHandle>(null);
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
      ...messages.map((message) =>
        toItem<M>(message.id, renderMessage(message)),
      ),
      ...(suffixItem ? [suffixItem] : []),
    ],
    [messages, prefixItem, renderMessage, suffixItem],
  );

  const [idsToIndexes, indexesToIds] = useMemo(
    () => [
      new Map(items.map((item, index) => [item.id, index])),
      new Map(items.map((item, index) => [index, item.id])),
    ],
    [items],
  );

  const keepMounted = useMemo(() => {
    if (keepMountedIndexes) {
      return keepMountedIndexes;
    }
    if (keepMountedIds) {
      return keepMountedIds
        .map((id) => idsToIndexes.get(id))
        .filter((index): index is number => index !== undefined);
    }
    return [];
  }, [keepMountedIndexes, keepMountedIds, idsToIndexes]);

  const {
    newestSeenId,
    newestSeenIndex,
    oldestSeenId,
    oldestSeenIndex,
    trackSeen,
  } = useSeenIdsTracking(
    {
      vListHandle,
      idsToIndexes,
      indexesToIds,
    },
    messages,
  );

  const handlers = useMemo<ChatViewerHandle<M>>(
    () => ({
      vListHandle: vListHandle.current,
      scrollOffset: vListHandle.current?.scrollOffset,
      scrollSize: vListHandle.current?.scrollSize,
      viewportSize: vListHandle.current?.viewportSize,
      atTop,
      atBottom,
      idsToIndexes,
      indexesToIds,
      newestSeenId,
      newestSeenIndex,
      oldestSeenId,
      oldestSeenIndex,
      get oldestIndexInViewport() {
        return vListHandle.current?.findStartIndex() ?? IDX_NOT_FOUND;
      },
      get oldestIdInViewport() {
        return indexesToIds.get(this.oldestIndexInViewport);
      },
      get newestIndexInViewport() {
        return vListHandle.current?.findEndIndex() ?? IDX_NOT_FOUND;
      },
      get newestIdInViewport() {
        return indexesToIds.get(this.newestIndexInViewport);
      },
      isIndexInViewport(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return (
          idx >= this.oldestIndexInViewport && idx <= this.newestIndexInViewport
        );
      },
      isIdInViewport(id: MessageId) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.isIndexInViewport(index);
        }
        return false;
      },
      wasIndexSeen(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        if (
          this.oldestSeenIndex !== undefined &&
          this.newestSeenIndex !== undefined
        ) {
          return idx >= this.oldestSeenIndex && idx <= this.newestSeenIndex;
        }
        return false;
      },
      wasIdSeen(id: MessageId) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.wasIndexSeen(index);
        }
        return false;
      },
      getIndexOffset(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return vListHandle.current?.getItemOffset(idx);
      },
      getIdOffset(id: MessageId) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.getIndexOffset(index);
        }
      },
      getIndexSize(index: number) {
        const idx = normalizeNegativeIndex(index, items.length);
        return vListHandle.current?.getItemSize(idx);
      },
      getIdSize(id: MessageId) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          return this.getIndexSize(index);
        }
      },
      scrollToOffset(offset: number) {
        vListHandle.current?.scrollTo(offset);
      },
      scrollToIndex(index: number, opts: ScrollToIndexOpts) {
        vListHandle.current?.scrollToIndex(
          normalizeNegativeIndex(index, items.length),
          opts,
        );
      },
      scrollToId(id: MessageId, opts: ScrollToIndexOpts) {
        const index = idsToIndexes.get(id);
        if (index !== undefined) {
          this.scrollToIndex(index, opts);
        }
      },
      scrollBy(offset: number) {
        vListHandle.current?.scrollBy(offset);
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
    ],
  );

  useImperativeHandle<ChatViewerHandle<M>, ChatViewerHandle<M>>(
    handle,
    () => handlers,
    [handlers],
  );

  const vListStyle = useMemo<CSSProperties>(
    () => ({
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

      if (vListHandle.current) {
        const { viewportSize, scrollSize } = vListHandle.current;

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
      <VList
        reverse={reverse}
        ref={vListHandle}
        style={vListStyle}
        shift={shift}
        className={scrollerClassName}
        overscan={overscan}
        keepMounted={keepMounted}
        ssrCount={ssrCount}
        onScroll={handleScroll}
        onScrollEnd={onScrollEnd}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      >
        {items.map(({ element }) => element)}
      </VList>
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
