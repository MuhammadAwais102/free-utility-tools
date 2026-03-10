export function CvPrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        @page {
          size: A4;
          margin: 12mm;
        }

        body {
          background: white !important;
        }

        header,
        footer,
        [data-cv-form],
        [data-cv-screen-only] {
          display: none !important;
        }

        main {
          max-width: none !important;
          padding: 0 !important;
        }

        [data-cv-maker] {
          display: block !important;
        }

        [data-cv-preview-shell] {
          width: 100% !important;
          max-width: none !important;
        }

        [data-cv-preview-root] {
          position: static !important;
          top: auto !important;
          border: none !important;
          border-radius: 0 !important;
          background: white !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        [data-cv-preview-root] * {
          color-adjust: exact;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        [data-cv-preview-root] article,
        [data-cv-preview-root] section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `}</style>
  );
}
