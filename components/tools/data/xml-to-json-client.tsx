"use client";

import { useState } from "react";
import { DataToolClientShell } from "@/components/tools/data/data-tool-client-shell";
import { copyTextToClipboard } from "@/lib/data/clipboard";
import { convertXmlToJson } from "@/lib/data/xml-json";

export function XmlToJsonClient() {
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
      title="XML to JSON Converter"
      description="Convert XML into a consistent JSON structure in the browser while preserving attributes, text nodes, nested elements, and repeated sibling tags."
      inputLabel="XML input"
      outputLabel="JSON output"
      inputValue={input}
      outputValue={output}
      error={error}
      helperText='Structure rules: attributes go under "@attributes", text content goes under "#text", and repeated sibling elements become arrays.'
      actionLabel="Convert to JSON"
      copied={copied}
      onInputChange={(value) => {
        setInput(value);
        setCopied(false);
      }}
      onAction={() => {
        const result = convertXmlToJson(input);
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
