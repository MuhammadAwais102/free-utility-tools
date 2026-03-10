type PageRangeResult =
  | { error: string }
  | { pageNumbers: number[] };

export function parsePageRange(input: string, totalPages: number): PageRangeResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { error: "Enter a page range like 1-3 or 2,4,6." };
  }

  const values = new Set<number>();
  const segments = trimmed.split(",").map((segment) => segment.trim()).filter(Boolean);

  for (const segment of segments) {
    if (segment.includes("-")) {
      const [startRaw, endRaw] = segment.split("-").map((value) => value.trim());
      const start = Number(startRaw);
      const end = Number(endRaw);

      if (!Number.isInteger(start) || !Number.isInteger(end)) {
        return { error: `Invalid range "${segment}".` };
      }

      if (start < 1 || end < 1 || start > totalPages || end > totalPages || start > end) {
        return { error: `Range "${segment}" is outside pages 1-${totalPages}.` };
      }

      for (let page = start; page <= end; page += 1) {
        values.add(page);
      }
    } else {
      const page = Number(segment);

      if (!Number.isInteger(page) || page < 1 || page > totalPages) {
        return { error: `Page "${segment}" is outside pages 1-${totalPages}.` };
      }

      values.add(page);
    }
  }

  const pageNumbers = Array.from(values).sort((first, second) => first - second);

  if (!pageNumbers.length) {
    return { error: "No valid pages were found in the range." };
  }

  return { pageNumbers };
}
