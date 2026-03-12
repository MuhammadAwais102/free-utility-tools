import type { Metadata } from "next";

export type ToolDefinition = {
  slug: string;
  name: string;
  description: string;
  category: "Image" | "PDF" | "Video" | "Career" | "Animation" | "Data";
};

export const siteName = "Free Utility Tools";
export const siteDescription =
  "Free browser-based utility tools for images, animations, data conversion, PDFs, YouTube thumbnails, and quick document building.";

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/#tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export const tools: ToolDefinition[] = [
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize JPG, PNG, WebP, and SVG images with pixel, percentage, and output format controls.",
    category: "Image",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress JPG, PNG, WebP, and SVG images with honest browser-side output handling.",
    category: "Image",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    description: "Convert between raster formats and handle SVG safely without sending files away.",
    category: "Image",
  },
  {
    slug: "bulk-image-resizer",
    name: "Bulk Image Resizer",
    description: "Resize multiple images with one shared setting and download each browser-generated result.",
    category: "Image",
  },
  {
    slug: "gif-resizer",
    name: "GIF Resizer",
    description: "Resize animated GIFs frame by frame, optionally crop them, and adjust playback speed honestly.",
    category: "Animation",
  },
  {
    slug: "gif-converter",
    name: "GIF Converter",
    description: "Convert static images into GIF files or rebuild existing GIFs as new GIF output.",
    category: "Animation",
  },
  {
    slug: "xml-prettify",
    name: "XML Prettify",
    description: "Format valid XML with readable indentation directly in your browser.",
    category: "Data",
  },
  {
    slug: "xml-to-json",
    name: "XML to JSON Converter",
    description: "Convert XML into a consistent JSON structure with attributes, text nodes, and arrays preserved.",
    category: "Data",
  },
  {
    slug: "json-to-xml",
    name: "JSON to XML Converter",
    description: "Convert JSON back into XML using the same structure rules for attributes, text nodes, and repeated elements.",
    category: "Data",
  },
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    description: "Grab the available YouTube thumbnail sizes from a public video URL.",
    category: "Video",
  },
  {
    slug: "pdf-merge",
    name: "PDF Merge",
    description: "Combine multiple PDFs into a single document in your browser.",
    category: "PDF",
  },
  {
    slug: "pdf-split",
    name: "PDF Split",
    description: "Split each page of a PDF into separate downloadable files.",
    category: "PDF",
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Turn one or more images into a compact multi-page PDF.",
    category: "PDF",
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Render PDF pages to downloadable JPG images with client-side processing.",
    category: "PDF",
  },
  {
    slug: "cv-maker",
    name: "CV Maker",
    description: "Build a clean CV in your browser with live editing for profile, experience, education, skills, and projects.",
    category: "Career",
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function createToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: siteName,
      description: siteDescription,
    };
  }

  return {
    title: tool.name,
    description: tool.description,
  };
}
