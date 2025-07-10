import { type RefObject, useCallback, useEffect, useState } from 'react';

import type { VListHandle } from 'virtua';

import { IDX_NOT_FOUND } from '../const';
import type { MessageId, IdentifiableMessage } from '../types'; // Update import path to reference types directly

interface SeenIdsTrackingDependencies {
  vListHandle: RefObject<VListHandle | null>;
  idsToIndexes: Map<MessageId, number>;
  indexesToIds: Map<number, MessageId>;
}

export function useSeenIdsTracking<M extends IdentifiableMessage>(
  dependencies: SeenIdsTrackingDependencies,
  messages: M[],
) {
  const { vListHandle, idsToIndexes, indexesToIds } = dependencies;

  const getViewportInfo = useCallback(() => {
    const handle = vListHandle.current;
    const oldestIndexInViewport = handle?.findStartIndex() ?? IDX_NOT_FOUND;
    const newestIndexInViewport = handle?.findEndIndex() ?? IDX_NOT_FOUND;
    const oldestIdInViewport = indexesToIds.get(oldestIndexInViewport);
    const newestIdInViewport = indexesToIds.get(newestIndexInViewport);
    return {
      oldestIndexInViewport,
      newestIndexInViewport,
      oldestIdInViewport,
      newestIdInViewport,
    };
  }, [vListHandle, indexesToIds]);

  const [newestSeenId, setNewestSeenId] = useState<MessageId<M> | undefined>(
    () => getViewportInfo().newestIdInViewport,
  );
  const [oldestSeenId, setOldestSeenId] = useState<MessageId<M> | undefined>(
    () => getViewportInfo().oldestIdInViewport,
  );

  const trackNewestSeen = useCallback(() => {
    const { newestIdInViewport, newestIndexInViewport } = getViewportInfo();
    const currentNewestSeenIndex =
      idsToIndexes.get(newestSeenId ?? -1) ?? IDX_NOT_FOUND;

    const isNewestInViewportValid =
      newestIdInViewport !== undefined &&
      newestIndexInViewport !== IDX_NOT_FOUND;
    const isCurrentNewestSeenIndexInvalid =
      currentNewestSeenIndex === IDX_NOT_FOUND;
    const isNewerThanCurrentSeen =
      currentNewestSeenIndex !== IDX_NOT_FOUND &&
      newestIndexInViewport > currentNewestSeenIndex;

    const shouldUpdateNewestSeen =
      isNewestInViewportValid &&
      (isCurrentNewestSeenIndexInvalid || isNewerThanCurrentSeen);

    if (shouldUpdateNewestSeen) {
      setNewestSeenId(newestIdInViewport);
    }
  }, [getViewportInfo, idsToIndexes, newestSeenId]);

  const trackOldestSeen = useCallback(() => {
    const { oldestIdInViewport, oldestIndexInViewport } = getViewportInfo();
    const currentOldestSeenIndex =
      idsToIndexes.get(oldestSeenId ?? -1) ?? IDX_NOT_FOUND;

    const isOldestInViewportValid =
      oldestIdInViewport !== undefined &&
      oldestIndexInViewport !== IDX_NOT_FOUND;
    const isCurrentOldestSeenIndexInvalid =
      currentOldestSeenIndex === IDX_NOT_FOUND;
    const isOlderThanCurrentSeen =
      currentOldestSeenIndex !== IDX_NOT_FOUND &&
      oldestIndexInViewport < currentOldestSeenIndex;

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
    newestSeenIndex: newestSeenId ? idsToIndexes.get(newestSeenId) : undefined,
    oldestSeenIndex: oldestSeenId ? idsToIndexes.get(oldestSeenId) : undefined,
    trackSeen,
  };
}
