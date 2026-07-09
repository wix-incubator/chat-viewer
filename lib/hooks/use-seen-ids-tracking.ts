import { type RefObject, useCallback, useEffect, useState } from 'react';

import type { VirtualizerHandle } from 'virtua';

import { IDX_NOT_FOUND } from '../const';
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
}

export function useSeenIdsTracking<M extends IdentifiableMessage>(
  dependencies: SeenIdsTrackingDependencies<M>,
  messages: M[],
) {
  const { virtualizerHandle, idsToIndexes, indexesToIds } = dependencies;

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

  const [newestSeenId, setNewestSeenId] = useState<MessageId<M> | undefined>(
    () => getViewportInfo().newestIdInViewport,
  );
  const [oldestSeenId, setOldestSeenId] = useState<MessageId<M> | undefined>(
    () => getViewportInfo().oldestIdInViewport,
  );

  const trackNewestSeen = useCallback(() => {
    const { newestIdInViewport, newestMessageIndexInViewport } =
      getViewportInfo();
    const currentNewestSeenIndex =
      newestSeenId === undefined
        ? IDX_NOT_FOUND
        : (idsToIndexes.get(newestSeenId) ?? IDX_NOT_FOUND);

    const isNewestInViewportValid =
      newestIdInViewport !== undefined &&
      newestMessageIndexInViewport !== undefined;
    const isCurrentNewestSeenIndexInvalid =
      currentNewestSeenIndex === IDX_NOT_FOUND;
    const isNewerThanCurrentSeen =
      currentNewestSeenIndex !== IDX_NOT_FOUND &&
      newestMessageIndexInViewport !== undefined &&
      newestMessageIndexInViewport > currentNewestSeenIndex;

    const shouldUpdateNewestSeen =
      isNewestInViewportValid &&
      (isCurrentNewestSeenIndexInvalid || isNewerThanCurrentSeen);

    if (shouldUpdateNewestSeen) {
      setNewestSeenId(newestIdInViewport);
    }
  }, [getViewportInfo, idsToIndexes, newestSeenId]);

  const trackOldestSeen = useCallback(() => {
    const { oldestIdInViewport, oldestMessageIndexInViewport } =
      getViewportInfo();
    const currentOldestSeenIndex =
      oldestSeenId === undefined
        ? IDX_NOT_FOUND
        : (idsToIndexes.get(oldestSeenId) ?? IDX_NOT_FOUND);

    const isOldestInViewportValid =
      oldestIdInViewport !== undefined &&
      oldestMessageIndexInViewport !== undefined;
    const isCurrentOldestSeenIndexInvalid =
      currentOldestSeenIndex === IDX_NOT_FOUND;
    const isOlderThanCurrentSeen =
      currentOldestSeenIndex !== IDX_NOT_FOUND &&
      oldestMessageIndexInViewport !== undefined &&
      oldestMessageIndexInViewport < currentOldestSeenIndex;

    const shouldUpdateOldestSeen =
      isOldestInViewportValid &&
      (isCurrentOldestSeenIndexInvalid || isOlderThanCurrentSeen);

    if (shouldUpdateOldestSeen) {
      setOldestSeenId(oldestIdInViewport);
    }
  }, [getViewportInfo, idsToIndexes, oldestSeenId]);

  const trackSeen = useCallback(() => {
    trackNewestSeen();
    trackOldestSeen();
  }, [trackNewestSeen, trackOldestSeen]);

  useEffect(() => {
    const { newestIdInViewport, oldestIdInViewport } = getViewportInfo();
    if (newestSeenId === undefined && newestIdInViewport !== undefined) {
      setNewestSeenId(newestIdInViewport);
    }
    if (oldestSeenId === undefined && oldestIdInViewport !== undefined) {
      setOldestSeenId(oldestIdInViewport);
    }
    trackSeen();
  }, [getViewportInfo, newestSeenId, oldestSeenId, trackSeen]);

  useEffect(() => trackSeen(), [messages, trackSeen]);

  return {
    newestSeenId,
    oldestSeenId,
    newestSeenIndex:
      newestSeenId === undefined ? undefined : idsToIndexes.get(newestSeenId),
    oldestSeenIndex:
      oldestSeenId === undefined ? undefined : idsToIndexes.get(oldestSeenId),
    trackSeen,
  };
}
