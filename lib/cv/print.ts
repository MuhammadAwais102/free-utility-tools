export function printCvDocument() {
  if (typeof window === "undefined") {
    return;
  }

  window.print();
}
