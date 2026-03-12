"use client";

import { useState } from "react";
import { DataToolClientShell } from "@/components/tools/data/data-tool-client-shell";
import { copyTextToClipboard } from "@/lib/data/clipboard";
import { convertJsonToXml } from "@/lib/data/xml-json";

export function JsonToXmlClient() {
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
      title="JSON to XML Converter"
      description="Convert JSON back into XML using the same structure rules as the XML-to-JSON tool so attributes, text nodes, and repeated elements stay consistent."
      inputLabel="JSON input"
      outputLabel="XML output"
      inputValue={input}
      outputValue={output}
      error={error}
      helperText='Required structure: the top-level JSON must be an object with exactly one root key. Use "@attributes" for attributes and "#text" for text content.'
      actionLabel="Convert to XML"
      copied={copied}
      onInputChange={(value) => {
        setInput(value);
        setCopied(false);
      }}
      onAction={() => {
        const result = convertJsonToXml(input);
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
