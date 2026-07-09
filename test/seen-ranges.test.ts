import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getSeenRangeBounds,
  isIndexInSeenRanges,
  isRangeInSeenRanges,
  mergeSeenRange,
} from '../lib/seen-ranges.ts';

test('keeps skipped middle messages unseen', () => {
  const ranges = mergeSeenRange(mergeSeenRange([], [0, 5]), [95, 99]);

  assert.equal(isIndexInSeenRanges(ranges, 5), true);
  assert.equal(isIndexInSeenRanges(ranges, 50), false);
  assert.equal(isIndexInSeenRanges(ranges, 95), true);
  assert.deepEqual(getSeenRangeBounds(ranges), { oldest: 0, newest: 99 });
});

test('merges overlapping and adjacent seen ranges', () => {
  const ranges = [
    [10, 12],
    [20, 22],
    [30, 35],
  ] as const;

  assert.deepEqual(mergeSeenRange(ranges, [13, 20]), [
    [10, 22],
    [30, 35],
  ]);
});

test('detects covered seen ranges', () => {
  assert.equal(isRangeInSeenRanges([[10, 22]], [13, 20]), true);
  assert.equal(isRangeInSeenRanges([[10, 22]], [20, 25]), false);
});
