"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { PageHeader } from "@/components/shared/page-header";
import { FileUpload } from "@/components/shared/file-upload";
import { GifConverterControls } from "@/components/tools/animation/gif-converter-controls";
import { GifPreview } from "@/components/tools/animation/gif-preview";
import { GifSummary } from "@/components/tools/animation/gif-summary";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import {
  getGifConverterMode,
  isGifFile,
  isSupportedGifConverterInput,
} from "@/lib/animation/gif-file";
import {
  readGifAnimationSource,
  readStaticAnimationSource,
  releaseAnimationResult,
  releaseAnimationSource,
  transformAnimationToGif,
} from "@/lib/animation/gif-processing";
import type { AnimationResultState, AnimationSource } from "@/types/animation";

export function GifConverterClient() {
  const [source, setSource] = useState<AnimationSource | null>(null);
  const [result, setResult] = useState<AnimationResultState | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [stillFrameDuration, setStillFrameDuration] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      releaseAnimationSource(source);
      releaseAnimationResult(result);
    };
  }, [source, result]);

  async function handleFilesChange(files: File[]) {
    const file = files[0];
    if (!file) {
      return;
    }

    if (!isSupportedGifConverterInput(file)) {
      setError("Please upload a GIF, JPG, PNG, WebP, or SVG image.");
      return;
    }

    try {
      setError(null);
      releaseAnimationSource(source);
      releaseAnimationResult(result);
      setResult(null);

      const nextSource = isGifFile(file)
        ? await readGifAnimationSource(file)
        : await readStaticAnimationSource(file);

      setSource(nextSource);
      setSpeedMultiplier(1);
      setStillFrameDuration(1000);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the file.");
    }
  }

  async function handleProcess() {
    if (!source) {
      setError("Upload a file before converting.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      releaseAnimationResult(result);

      const nextResult = await transformAnimationToGif({
        source: {
          ...source,
          frames: source.frames.map((frame) => ({
            ...frame,
            delay: source.metadata.kind === "image" ? stillFrameDuration : frame.delay,
          })),
        },
        resize: {
          width: source.metadata.width,
          height: source.metadata.height,
        },
        crop: {
          enabled: false,
          x: 0,
          y: 0,
          width: source.metadata.width,
          height: source.metadata.height,
        },
        speed: {
          multiplier: source.metadata.kind === "gif" ? speedMultiplier : 1,
        },
        suffix: "converted",
      });

      setResult(nextResult);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "GIF conversion failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    releaseAnimationSource(source);
    releaseAnimationResult(result);
    setSource(null);
    setResult(null);
    setSpeedMultiplier(1);
    setStillFrameDuration(1000);
    setError(null);
  }

  const helperText = source
    ? source.metadata.kind === "gif"
      ? "This first version supports GIF to GIF rebuilding with honest frame timing changes."
      : "This first version supports static image to single-frame GIF conversion."
    : null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Animation Tool"
        title="GIF Converter"
        description="Convert static images into GIF files or rebuild existing GIFs as new animated GIF output without faking unsupported video workflows."
      />

      <Card className="space-y-6">
        <FileUpload
          accept="image/gif,image/jpeg,image/png,image/webp,image/svg+xml"
          buttonText="Choose file"
          helpText="Supported inputs: GIF, JPG, PNG, WebP, and SVG. Output is GIF only in this first version."
          onFilesChange={handleFilesChange}
        />
        <ErrorMessage message={error} />
        <GifConverterControls
          mode={source ? getGifConverterMode(source.file) : null}
          speedMultiplier={speedMultiplier}
          stillFrameDuration={stillFrameDuration}
          isProcessing={isProcessing}
          hasSource={Boolean(source)}
          hasResult={Boolean(result)}
          helperText={helperText}
          onSpeedMultiplierChange={setSpeedMultiplier}
          onStillFrameDurationChange={setStillFrameDuration}
          onProcess={handleProcess}
          onDownload={() => result && downloadBlob(result.blob, result.filename)}
          onReset={handleReset}
        />
      </Card>

      {source ? (
        <div className="space-y-6">
          <GifSummary original={source.metadata} result={result} />
          <GifPreview source={source} result={result} />
        </div>
      ) : (
        <EmptyState
          title="No file loaded yet"
          description="Upload a GIF to rebuild it as a new GIF, or upload a static image to generate a single-frame GIF file."
        />
      )}
    </div>
  );
}
