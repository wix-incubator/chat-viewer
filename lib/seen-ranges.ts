export type SeenRange = readonly [start: number, end: number];

const normalizeSeenRange = ([start, end]: SeenRange): SeenRange =>
  start <= end ? [start, end] : [end, start];

export function mergeSeenRange(
  ranges: readonly SeenRange[],
  range: SeenRange,
): SeenRange[] {
  const sortedRanges = [...ranges, normalizeSeenRange(range)].sort(
    ([a], [b]) => a - b,
  );
  const mergedRanges: SeenRange[] = [];

  for (const [start, end] of sortedRanges) {
    const previousRange = mergedRanges[mergedRanges.length - 1];
    if (!previousRange || start > previousRange[1] + 1) {
      mergedRanges.push([start, end]);
      continue;
    }
    mergedRanges[mergedRanges.length - 1] = [
      previousRange[0],
      Math.max(previousRange[1], end),
    ];
  }

  return mergedRanges;
}

export function isIndexInSeenRanges(
  ranges: readonly SeenRange[],
  index: number,
) {
  return ranges.some(([start, end]) => index >= start && index <= end);
}

export function isRangeInSeenRanges(
  ranges: readonly SeenRange[],
  range: SeenRange,
) {
  const [rangeStart, rangeEnd] = normalizeSeenRange(range);
  return ranges.some(([start, end]) => rangeStart >= start && rangeEnd <= end);
}

export function getSeenRangeBounds(ranges: readonly SeenRange[]) {
  if (!ranges.length) {
    return undefined;
  }

  return ranges.reduce(
    (bounds, [start, end]) => ({
      oldest: Math.min(bounds.oldest, start),
      newest: Math.max(bounds.newest, end),
    }),
    { oldest: ranges[0][0], newest: ranges[0][1] },
  );
}
