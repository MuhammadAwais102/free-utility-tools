import type { Metadata } from "next";

export type ToolCategory =
  | "Image"
  | "PDF"
  | "Video"
  | "Career"
  | "Animation"
  | "Data";

export type ToolCategoryKey =
  | "all"
  | "image"
  | "pdf"
  | "video"
  | "career"
  | "animation"
  | "data";

export type ToolDefinition = {
  slug: string;
  href: `/tools/${string}`;
  name: string;
  description: string;
  category: ToolCategory;
};

export const siteName = "Free Utility Tools";
export const siteDescription =
  "Free browser-based utility tools for images, animations, data conversion, PDFs, YouTube thumbnails, and quick document building.";

export const siteConfig = {
  name: siteName,
  url: "https://free-utility-tools.vercel.app",
  description: siteDescription,
};

export const navigationLinks = [
  { href: "/#tools", label: "Tools" },
  { href: "/#features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export const toolCategoryOrder: ToolCategory[] = [
  "Image",
  "Animation",
  "Data",
  "Video",
  "PDF",
  "Career",
];

export const toolCategoryLabels: Record<ToolCategoryKey, string> = {
  all: "All",
  image: "Image",
  animation: "Animation",
  data: "Data",
  video: "Video",
  pdf: "PDF",
  career: "Career",
};

export const tools: ToolDefinition[] = [
  {
    slug: "image-resizer",
    href: "/tools/image-resizer",
    name: "Image Resizer",
    description:
      "Resize JPG, PNG, WebP, and SVG images with pixel, percentage, and output format controls.",
    category: "Image",
  },
  {
    slug: "image-compressor",
    href: "/tools/image-compressor",
    name: "Image Compressor",
    description:
      "Compress JPG, PNG, WebP, and SVG images with honest browser-side output handling.",
    category: "Image",
  },
  {
    slug: "image-converter",
    href: "/tools/image-converter",
    name: "Image Converter",
    description:
      "Convert between raster formats and handle SVG safely without sending files away.",
    category: "Image",
  },
  {
    slug: "bulk-image-resizer",
    href: "/tools/bulk-image-resizer",
    name: "Bulk Image Resizer",
    description:
      "Resize multiple images with one shared setting and download each browser-generated result.",
    category: "Image",
  },
  {
    slug: "gif-resizer",
    href: "/tools/gif-resizer",
    name: "GIF Resizer",
    description:
      "Resize animated GIFs frame by frame, optionally crop them, and adjust playback speed honestly.",
    category: "Animation",
  },
  {
    slug: "gif-converter",
    href: "/tools/gif-converter",
    name: "GIF Converter",
    description:
      "Convert static images into GIF files or rebuild existing GIFs as new GIF output.",
    category: "Animation",
  },
  {
    slug: "xml-prettify",
    href: "/tools/xml-prettify",
    name: "XML Prettify",
    description: "Format valid XML with readable indentation directly in your browser.",
    category: "Data",
  },
  {
    slug: "xml-to-json",
    href: "/tools/xml-to-json",
    name: "XML to JSON Converter",
    description:
      "Convert XML into a consistent JSON structure with attributes, text nodes, and arrays preserved.",
    category: "Data",
  },
  {
    slug: "json-to-xml",
    href: "/tools/json-to-xml",
    name: "JSON to XML Converter",
    description:
      "Convert JSON back into XML using the same structure rules for attributes, text nodes, and repeated elements.",
    category: "Data",
  },
  {
    slug: "youtube-thumbnail-downloader",
    href: "/tools/youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    description: "Grab the available YouTube thumbnail sizes from a public video URL.",
    category: "Video",
  },
  {
    slug: "pdf-merge",
    href: "/tools/pdf-merge",
    name: "PDF Merge",
    description: "Combine multiple PDFs into a single document in your browser.",
    category: "PDF",
  },
  {
    slug: "pdf-split",
    href: "/tools/pdf-split",
    name: "PDF Split",
    description: "Split each page of a PDF into separate downloadable files.",
    category: "PDF",
  },
  {
    slug: "jpg-to-pdf",
    href: "/tools/jpg-to-pdf",
    name: "JPG to PDF",
    description: "Turn one or more images into a compact multi-page PDF.",
    category: "PDF",
  },
  {
    slug: "pdf-to-jpg",
    href: "/tools/pdf-to-jpg",
    name: "PDF to JPG",
    description: "Render PDF pages to downloadable JPG images with client-side processing.",
    category: "PDF",
  },
  {
    slug: "cv-maker",
    href: "/tools/cv-maker",
    name: "CV Maker",
    description:
      "Build a clean CV in your browser with live editing for profile, experience, education, skills, and projects.",
    category: "Career",
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolUrl(slug: string) {
  const tool = getToolBySlug(slug);
  return tool ? `${siteConfig.url}${tool.href}` : siteConfig.url;
}

export function getCategoryKey(category: ToolCategory): Exclude<ToolCategoryKey, "all"> {
  return category.toLowerCase() as Exclude<ToolCategoryKey, "all">;
}

export function getCategoryCount(category: ToolCategoryKey) {
  if (category === "all") {
    return tools.length;
  }

  return tools.filter((tool) => getCategoryKey(tool.category) === category).length;
}

export function getToolsByCategory(category: ToolCategoryKey) {
  if (category === "all") {
    return tools;
  }

  return tools.filter((tool) => getCategoryKey(tool.category) === category);
}

export function getRelatedTools(slug: string, limit = 3) {
  const currentTool = getToolBySlug(slug);

  if (!currentTool) {
    return tools.slice(0, limit);
  }

  const sameCategory = tools.filter(
    (tool) => tool.slug !== slug && tool.category === currentTool.category,
  );
  const fallback = tools.filter(
    (tool) => tool.slug !== slug && tool.category !== currentTool.category,
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function createHomeMetadata(): Metadata {
  return {
    title: "Free Online Utility Tools",
    description: siteDescription,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: siteName,
      description: siteDescription,
      url: siteConfig.url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
  };
}

export function createStaticPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function createToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return createHomeMetadata();
  }

  const toolUrl = `${siteConfig.url}${tool.href}`;

  return {
    title: tool.name,
    description: tool.description,
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: toolUrl,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
  };
}
