import {
  followMessagesAtBottom,
  followSuffixAtBottom,
} from '../follow-strategies';
import type { ChatViewerProps, IdentifiableMessage } from '../types';

// This utility type makes all properties of T required, except for the ones specified in P.
type RequiredExcept<T, P extends keyof Partial<T>> = Omit<Required<T>, P> &
  Pick<T, P>;

type OptionalProps =
  | 'style'
  | 'className'
  | 'scrollerStyle'
  | 'scrollerClassName'
  | 'overscan'
  | 'ssrCount'
  | 'keepMountedIndexes'
  | 'keepMountedIds';

export function useProps<M extends IdentifiableMessage>(
  props: ChatViewerProps<M>,
): RequiredExcept<ChatViewerProps<M>, OptionalProps> {
  return {
    messages: props.messages,
    renderMessage: props.renderMessage,

    prefix: props.prefix ?? null,
    suffix: props.suffix ?? null,

    alignment: props.alignment ?? 'bottom',
    style: props.style,
    className: props.className,
    scrollerStyle: props.scrollerStyle,
    scrollerClassName: props.scrollerClassName,

    overscan: props.overscan,
    ssrCount: props.ssrCount,

    keepMountedIndexes: props.keepMountedIndexes,
    keepMountedIds: props.keepMountedIds,

    historyEndOffset: props.historyEndOffset ?? 10,
    onHistoryEndReached: props.onHistoryEndReached ?? (() => {}),
    onScroll: props.onScroll ?? (() => {}),
    onScrollEnd: props.onScrollEnd ?? (() => {}),
    onWheel: props.onWheel ?? (() => {}),
    onKeyDown: props.onKeyDown ?? (() => {}),
    onOlderMessages: props.onOlderMessages ?? (() => {}),
    onNewerMessages: props.onNewerMessages ?? followMessagesAtBottom<M>(),
    onAtTop: props.onAtTop ?? (() => {}),
    onAtBottom: props.onAtBottom ?? (() => {}),
    onPrefixDisplay: props.onPrefixDisplay ?? (() => {}),
    onSuffixDisplay: props.onSuffixDisplay ?? followSuffixAtBottom<M>(),
  };
}
