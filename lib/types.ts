import type {
  CSSProperties,
  KeyboardEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  WheelEventHandler,
} from 'react';

import type { ScrollToIndexOpts, VListHandle, VListProps } from 'virtua';
import type { PREFIX_ID, SUFFIX_ID } from './const';


export type PrefixId = typeof PREFIX_ID;
export type SuffixId = typeof SUFFIX_ID;
export type AffixId = PrefixId | SuffixId;

export type ChatAlignment = 'top' | 'bottom';

export type IdentifiableMessage = { id: string | number };
export type MessageId<M extends IdentifiableMessage = IdentifiableMessage> =
  | M['id']
  | AffixId;

export type ChatCallback<M extends IdentifiableMessage = IdentifiableMessage> =
  (handle: ChatViewerHandle<M>) => void;

export type OnMessagesCallback<
  M extends IdentifiableMessage = IdentifiableMessage,
> = (handle: ChatViewerHandle<M>, messages: M[]) => void;

export type OnAffixCallback<
  M extends IdentifiableMessage = IdentifiableMessage,
> = (handle: ChatViewerHandle<M>, isDisplayed: boolean) => void;

export interface ChatViewerProps<
  M extends IdentifiableMessage = IdentifiableMessage,
> {
  // Options for rendering
  style?: CSSProperties;
  className?: string;
  scrollerStyle?: CSSProperties;
  scrollerClassName?: string;

  // Virtua options
  alignment?: ChatAlignment;
  overscan?: VListProps['overscan'];
  ssrCount?: VListProps['ssrCount'];

  // Keep mounted
  keepMountedIndexes?: number[];
  keepMountedIds?: MessageId<M>[];

  // Messages rendering
  messages: M[];
  renderMessage: (message: M) => ReactElement | null;
  prefix?: ReactNode;
  suffix?: ReactNode;

  // History manipulations
  onHistoryEndReached?: ChatCallback<M>;
  historyEndOffset?: number;

  // Listeners for events
  onScroll?: (offset: number) => void;
  onScrollEnd?: () => void;
  onWheel?: WheelEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onOlderMessages?: OnMessagesCallback<M>;
  onNewerMessages?: OnMessagesCallback<M>;
  onAtTop?: ChatCallback<M>;
  onAtBottom?: ChatCallback<M>;
  onPrefixDisplay?: OnAffixCallback<M>;
  onSuffixDisplay?: OnAffixCallback<M>;
}

export interface ChatViewerPropsWithRef<
  M extends IdentifiableMessage = IdentifiableMessage,
> extends ChatViewerProps<M> {
  ref: Ref<ChatViewerHandle<M>>;
}

export interface ChatViewerHandle<
  M extends IdentifiableMessage = IdentifiableMessage,
> {
  vListHandle: VListHandle | null;
  atTop: boolean;
  atBottom: boolean;
  idsToIndexes: Map<MessageId<M>, number>;
  indexesToIds: Map<number, MessageId<M>>;
  scrollOffset: number | undefined;
  scrollSize: number | undefined;
  viewportSize: number | undefined;
  newestSeenId: MessageId<M> | undefined;
  newestSeenIndex: number | undefined;
  oldestSeenId: MessageId<M> | undefined;
  oldestSeenIndex: number | undefined;
  oldestIndexInViewport: number;
  oldestIdInViewport: MessageId<M> | undefined;
  newestIndexInViewport: number;
  newestIdInViewport: MessageId<M> | undefined;
  isIndexInViewport(index: number): boolean;
  isIdInViewport(id: MessageId<M>): boolean;
  wasIndexSeen: (index: number) => boolean;
  wasIdSeen: (id: MessageId<M>) => boolean;
  getIndexOffset(index: number): number | undefined;
  getIdOffset(id: MessageId<M>): number | undefined;
  getIndexSize(index: number): number | undefined;
  getIdSize(id: MessageId<M>): number | undefined;
  scrollToOffset(offset: number): void;
  scrollToIndex(index: number, opts?: ScrollToIndexOpts): void;
  scrollToId(id: MessageId<M>, opts?: ScrollToIndexOpts): void;
  scrollBy(offset: number): void;
  scrollToTop(opts?: ScrollToIndexOpts): void;
  scrollToBottom(opts?: ScrollToIndexOpts): void;
}
