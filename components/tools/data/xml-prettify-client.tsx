"use client";

import { useState } from "react";
import { DataToolClientShell } from "@/components/tools/data/data-tool-client-shell";
import { copyTextToClipboard } from "@/lib/data/clipboard";
import { prettifyXml } from "@/lib/data/xml-json";

export function XmlPrettifyClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!output) {
      return;
    }

    try {
      await copyTextToClipboard(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to copy the output.");
    }
  }

  return (
    <DataToolClientShell
      title="XML Prettify"
      description="Paste XML, validate it in the browser, and format it into readable indented markup without leaving the page."
      inputLabel="XML input"
      outputLabel="Formatted XML"
      inputValue={input}
      outputValue={output}
      error={error}
      helperText="Malformed XML will show a parser error. Valid XML is formatted with a consistent two-space indentation style."
      actionLabel="Prettify XML"
      copied={copied}
      onInputChange={(value) => {
        setInput(value);
        setCopied(false);
      }}
      onAction={() => {
        const result = prettifyXml(input);
        setOutput(result.output);
        setError(result.error);
        setCopied(false);
      }}
      onCopy={handleCopy}
      onClear={() => {
        setInput("");
        setOutput("");
        setError(null);
        setCopied(false);
      }}
    />
  );
}
