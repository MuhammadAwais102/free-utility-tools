"use client";

import { useId, useRef } from "react";
import { Button } from "@/components/ui/button";

type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  buttonText?: string;
  helpText?: string;
};

export function FileUpload({
  accept,
  multiple = false,
  onFilesChange,
  buttonText = "Choose files",
  helpText,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-[24px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--color-foreground)]">Select files</p>
          {helpText ? (
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{helpText}</p>
          ) : null}
        </div>
        <Button
          aria-controls={inputId}
          className="w-fit"
          onClick={() => inputRef.current?.click()}
        >
          {buttonText}
        </Button>
      </div>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(event) => {
          onFilesChange(Array.from(event.target.files ?? []));
          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
