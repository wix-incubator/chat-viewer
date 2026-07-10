import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { VirtualizerHandle } from 'virtua';

import { IDX_NOT_FOUND } from '../const';
import {
  getSeenRangeBounds,
  isRangeInSeenRanges,
  mergeSeenRange,
  type SeenRange,
} from '../seen-ranges';
import type { IdentifiableMessage, MessageId } from '../types';
import {
  getFirstMappedIndexInRange,
  getLastMappedIndexInRange,
  getViewportEndOffset,
} from '../utils';

interface SeenIdsTrackingDependencies<M extends IdentifiableMessage> {
  virtualizerHandle: RefObject<VirtualizerHandle | null>;
  /**
   * @deprecated Use `virtualizerHandle` instead.
   */
  vListHandle?: RefObject<VirtualizerHandle | null>;
  idsToIndexes: Map<MessageId<M>, number>;
  indexesToIds: Map<number, MessageId<M>>;
  seenDelayMs: number;
}

interface ViewportSeenRange<M extends IdentifiableMessage> {
  ids: readonly [MessageId<M>, MessageId<M>];
  indexes: SeenRange;
}

type SeenIdRange<M extends IdentifiableMessage> = readonly [
  MessageId<M>,
  MessageId<M>,
];

const isViewportSeenRangeEqual = <M extends IdentifiableMessage>(
  first: ViewportSeenRange<M>,
  second: ViewportSeenRange<M>,
) =>
  first.ids[0] === second.ids[0] &&
  first.ids[1] === second.ids[1] &&
  first.indexes[0] === second.indexes[0] &&
  first.indexes[1] === second.indexes[1];

const resolveSeenIdRanges = <M extends IdentifiableMessage>(
  ranges: readonly SeenIdRange<M>[],
  idsToIndexes: Map<MessageId<M>, number>,
) =>
  ranges.reduce<SeenRange[]>((seenRanges, [oldestId, newestId]) => {
    const oldestIndex = idsToIndexes.get(oldestId);
    const newestIndex = idsToIndexes.get(newestId);

    if (oldestIndex === undefined || newestIndex === undefined) {
      return seenRanges;
    }

    return mergeSeenRange(seenRanges, [oldestIndex, newestIndex]);
  }, []);

export function useSeenIdsTracking<M extends IdentifiableMessage>(
  dependencies: SeenIdsTrackingDependencies<M>,
  messages: M[],
) {
  const { virtualizerHandle, idsToIndexes, indexesToIds, seenDelayMs } =
    dependencies;
  const pendingSeenRangeRef = useRef<ViewportSeenRange<M> | undefined>(
    undefined,
  );
  const pendingSeenTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const getViewportInfo = useCallback(() => {
    const handle = virtualizerHandle.current;
    const oldestIndexInViewport =
      handle?.findItemIndex(handle.scrollOffset) ?? IDX_NOT_FOUND;
    const newestIndexInViewport =
      handle?.findItemIndex(
        getViewportEndOffset(handle.scrollOffset, handle.viewportSize),
      ) ?? IDX_NOT_FOUND;
    const oldestMessageIndexInViewport = getFirstMappedIndexInRange(
      indexesToIds,
      oldestIndexInViewport,
      newestIndexInViewport,
    );
    const newestMessageIndexInViewport = getLastMappedIndexInRange(
      indexesToIds,
      oldestIndexInViewport,
      newestIndexInViewport,
    );
    const oldestIdInViewport =
      oldestMessageIndexInViewport === undefined
        ? undefined
        : indexesToIds.get(oldestMessageIndexInViewport);
    const newestIdInViewport =
      newestMessageIndexInViewport === undefined
        ? undefined
        : indexesToIds.get(newestMessageIndexInViewport);
    return {
      oldestIndexInViewport,
      newestIndexInViewport,
      oldestMessageIndexInViewport,
      newestMessageIndexInViewport,
      oldestIdInViewport,
      newestIdInViewport,
    };
  }, [virtualizerHandle, indexesToIds]);

  const [seenIdRanges, setSeenIdRanges] = useState<SeenIdRange<M>[]>([]);

  const seenRanges = useMemo(
    () => resolveSeenIdRanges(seenIdRanges, idsToIndexes),
    [idsToIndexes, seenIdRanges],
  );
  const seenRangeBounds = useMemo(
    () => getSeenRangeBounds(seenRanges),
    [seenRanges],
  );
  const oldestSeenIndex = seenRangeBounds?.oldest;
  const newestSeenIndex = seenRangeBounds?.newest;
  const oldestSeenId =
    oldestSeenIndex === undefined
      ? undefined
      : indexesToIds.get(oldestSeenIndex);
  const newestSeenId =
    newestSeenIndex === undefined
      ? undefined
      : indexesToIds.get(newestSeenIndex);

  const getViewportSeenRange = useCallback(():
    | ViewportSeenRange<M>
    | undefined => {
    const {
      oldestMessageIndexInViewport,
      newestMessageIndexInViewport,
      oldestIdInViewport,
      newestIdInViewport,
    } = getViewportInfo();

    if (
      oldestMessageIndexInViewport === undefined ||
      newestMessageIndexInViewport === undefined ||
      oldestIdInViewport === undefined ||
      newestIdInViewport === undefined
    ) {
      return undefined;
    }

    return {
      ids: [oldestIdInViewport, newestIdInViewport],
      indexes: [oldestMessageIndexInViewport, newestMessageIndexInViewport],
    };
  }, [getViewportInfo]);

  const clearPendingSeenRange = useCallback(() => {
    if (pendingSeenTimerRef.current) {
      clearTimeout(pendingSeenTimerRef.current);
      pendingSeenTimerRef.current = undefined;
    }
    pendingSeenRangeRef.current = undefined;
  }, []);

  const commitSeenRange = useCallback(
    ({ ids, indexes }: ViewportSeenRange<M>) => {
      setSeenIdRanges(currentSeenIdRanges => {
        const currentSeenRanges = resolveSeenIdRanges(
          currentSeenIdRanges,
          idsToIndexes,
        );
        if (isRangeInSeenRanges(currentSeenRanges, indexes)) {
          return currentSeenIdRanges;
        }

        return [...currentSeenIdRanges, ids];
      });
    },
    [idsToIndexes],
  );

  const trackSeen = useCallback(() => {
    const viewportSeenRange = getViewportSeenRange();
    if (viewportSeenRange === undefined) {
      clearPendingSeenRange();
      return;
    }

    if (seenDelayMs <= 0) {
      clearPendingSeenRange();
      commitSeenRange(viewportSeenRange);
      return;
    }

    if (
      pendingSeenRangeRef.current &&
      isViewportSeenRangeEqual(pendingSeenRangeRef.current, viewportSeenRange)
    ) {
      return;
    }

    clearPendingSeenRange();
    pendingSeenRangeRef.current = viewportSeenRange;
    pendingSeenTimerRef.current = setTimeout(() => {
      const pendingSeenRange = pendingSeenRangeRef.current;
      const currentSeenRange = getViewportSeenRange();
      pendingSeenTimerRef.current = undefined;

      if (currentSeenRange === undefined) {
        pendingSeenRangeRef.current = undefined;
        return;
      }

      if (
        pendingSeenRange &&
        isViewportSeenRangeEqual(pendingSeenRange, currentSeenRange)
      ) {
        pendingSeenRangeRef.current = undefined;
        commitSeenRange(currentSeenRange);
        return;
      }

      pendingSeenRangeRef.current = undefined;
      trackSeen();
    }, seenDelayMs);
  }, [
    clearPendingSeenRange,
    commitSeenRange,
    getViewportSeenRange,
    seenDelayMs,
  ]);

  useEffect(() => trackSeen(), [messages, trackSeen]);

  useEffect(() => clearPendingSeenRange, [clearPendingSeenRange]);

  return {
    newestSeenId,
    oldestSeenId,
    newestSeenIndex,
    oldestSeenIndex,
    seenRanges,
    trackSeen,
  };
}
