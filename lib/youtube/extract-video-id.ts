const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function normalizeYoutubeUrl(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    return null;
  }

  if (VIDEO_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  try {
    return new URL(trimmed);
  } catch {
    try {
      return new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }
}

function extractFromUrl(url: URL) {
  const hostname = url.hostname.replace(/^www\./, "").replace(/^m\./, "");

  if (hostname === "youtu.be") {
    const candidate = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return VIDEO_ID_PATTERN.test(candidate) ? candidate : null;
  }

  if (hostname !== "youtube.com") {
    return null;
  }

  const searchVideoId = url.searchParams.get("v");
  if (searchVideoId && VIDEO_ID_PATTERN.test(searchVideoId)) {
    return searchVideoId;
  }

  const segments = url.pathname.split("/").filter(Boolean);
  const pathVideoId =
    segments[0] === "shorts" || segments[0] === "embed" ? segments[1] : null;

  return pathVideoId && VIDEO_ID_PATTERN.test(pathVideoId) ? pathVideoId : null;
}

export function extractVideoId(input: string) {
  const normalized = normalizeYoutubeUrl(input);

  if (!normalized) {
    return null;
  }

  if (typeof normalized === "string") {
    return normalized;
  }

  return extractFromUrl(normalized);
}
