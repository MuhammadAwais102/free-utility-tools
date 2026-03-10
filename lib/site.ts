import type { Metadata } from "next";

export type ToolDefinition = {
  slug: string;
  name: string;
  description: string;
  category: "Image" | "PDF" | "Video";
};

export const siteName = "Free Utility Tools";
export const siteDescription =
  "Free browser-based utility tools for images, PDFs, and YouTube thumbnails.";

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
    description: "Resize JPG, PNG, and WebP images directly in your browser.",
    category: "Image",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Reduce image file size with adjustable quality controls.",
    category: "Image",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    description: "Convert between JPG, PNG, and WebP without sending files away.",
    category: "Image",
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
