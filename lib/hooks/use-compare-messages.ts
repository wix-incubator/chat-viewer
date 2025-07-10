import { useEffect, useRef } from 'react';

import type { IdentifiableMessage } from '../types';

type CompareResult<M = IdentifiableMessage> = {
  prepended: M[];
  appended: M[];
};

/*
  Compare two arrays of messages and return prepended and appended messages.
  The function compares the ids of the messages and returns the prepended and appended messages.

  NOTE: We assume that the messages are either prepended or appended.
  NOTE: It doesn't detect change in the middle of the array.
  NOTE: It doesn't detect change when first or last message's id is changed.
*/
export function useCompareMessages<M extends IdentifiableMessage>(
  messages: M[],
): CompareResult<M> {
  const previousMessages = useRef<M[]>([]);

  const oldIds = previousMessages.current.map((m) => m.id);
  const newIds = messages.map((m) => m.id);

  // Update the previous messages reference
  // After this point we operate with ids of messages
  useEffect(() => {
    previousMessages.current = messages;
  }, [messages]);

  if (oldIds.length === 0) {
    return { prepended: [], appended: messages };
  }

  if (newIds.length === 0) {
    return { prepended: [], appended: [] };
  }

  // Find first common id efficiently
  const oldIdSet = new Set(oldIds);
  let firstCommonIdxNew = -1;
  for (let i = 0; i < newIds.length; i++) {
    if (oldIdSet.has(newIds[i])) {
      firstCommonIdxNew = i;
      break;
    }
  }
  if (firstCommonIdxNew === -1) {
    return { prepended: [], appended: messages };
  }

  // Find last common id efficiently
  let lastCommonIdxNew = -1;
  for (let i = newIds.length - 1; i >= 0; i--) {
    if (oldIdSet.has(newIds[i])) {
      lastCommonIdxNew = i;
      break;
    }
  }
  if (lastCommonIdxNew === -1) {
    return { prepended: messages, appended: [] };
  }

  const prepended = messages.slice(0, firstCommonIdxNew);
  const appended = messages.slice(lastCommonIdxNew + 1);

  return { prepended, appended };
}
