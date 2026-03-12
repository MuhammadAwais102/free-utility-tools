import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Download,
  FileImage,
  FileMinus,
  FilePlus2,
  FileSearch,
  Film,
  Grid2x2,
  ImageIcon,
  Maximize2,
  RefreshCw,
  UserRoundPlus,
  Video,
  WandSparkles,
  Wrench,
} from "lucide-react";
import type { ToolCategory, ToolDefinition } from "@/lib/site";
import { getCategoryKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const toolIcons: Record<string, LucideIcon> = {
  "image-resizer": Maximize2,
  "image-compressor": Download,
  "image-converter": RefreshCw,
  "bulk-image-resizer": Grid2x2,
  "gif-resizer": Film,
  "gif-converter": RefreshCw,
  "xml-prettify": WandSparkles,
  "xml-to-json": Code2,
  "json-to-xml": Code2,
  "youtube-thumbnail-downloader": Video,
  "pdf-merge": FilePlus2,
  "pdf-split": FileMinus,
  "jpg-to-pdf": ImageIcon,
  "pdf-to-jpg": FileSearch,
  "cv-maker": UserRoundPlus,
};

const categoryIcons: Record<ToolCategory, LucideIcon> = {
  Image: ImageIcon,
  Animation: Film,
  Data: Code2,
  Video: Video,
  PDF: FileImage,
  Career: UserRoundPlus,
};

export function getCategoryBadgeClass(category: ToolCategory) {
  return `badge-${getCategoryKey(category)}`;
}

export function getCategoryIconClass(category: ToolCategory) {
  return `icon-bg-${getCategoryKey(category)}`;
}

export function ToolIcon({
  tool,
  className,
}: {
  tool: ToolDefinition;
  className?: string;
}) {
  const Icon = toolIcons[tool.slug] ?? categoryIcons[tool.category];
  return <Icon className={className} />;
}

export function CategoryIcon({
  category,
  className,
}: {
  category: ToolCategory;
  className?: string;
}) {
  const Icon = categoryIcons[category];
  return <Icon className={className} />;
}

export function BrandIcon({ className }: { className?: string }) {
  return <Wrench className={className} />;
}

export function CategoryIconFrame({
  category,
  children,
  className,
}: {
  category: ToolCategory;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[52px] w-[52px] items-center justify-center rounded-[14px]",
        getCategoryIconClass(category),
        className,
      )}
    >
      {children}
    </div>
  );
}
