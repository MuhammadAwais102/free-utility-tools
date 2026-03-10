export function formatMonthYear(value: string) {
  if (!value) {
    return "";
  }

  const [year, month] = value.split("-");

  if (!year || !month) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, 1));
}

export function buildDateRange(startDate: string, endDate: string, fallbackEndLabel = "Present") {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : fallbackEndLabel;

  if (!start && !endDate) {
    return "";
  }

  if (!start) {
    return end;
  }

  if (!end) {
    return start;
  }

  return `${start} - ${end}`;
}

export function splitLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function joinParts(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(" | ");
}
