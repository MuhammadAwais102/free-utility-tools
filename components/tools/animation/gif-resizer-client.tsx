"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorMessage } from "@/components/shared/error-message";
import { PageHeader } from "@/components/shared/page-header";
import { FileUpload } from "@/components/shared/file-upload";
import { GifPreview } from "@/components/tools/animation/gif-preview";
import { GifResizerControls } from "@/components/tools/animation/gif-resizer-controls";
import { GifSummary } from "@/components/tools/animation/gif-summary";
import { Card } from "@/components/ui/card";
import { downloadBlob } from "@/lib/file";
import { validateGifInputFile } from "@/lib/animation/gif-file";
import {
  readGifAnimationSource,
  releaseAnimationResult,
  releaseAnimationSource,
  transformAnimationToGif,
} from "@/lib/animation/gif-processing";
import type { AnimationResultState, AnimationSource, GifCropOptions } from "@/types/animation";

const defaultCrop: GifCropOptions = {
  enabled: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export function GifResizerClient() {
  const [source, setSource] = useState<AnimationSource | null>(null);
  const [result, setResult] = useState<AnimationResultState | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [crop, setCrop] = useState<GifCropOptions>(defaultCrop);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
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

    const validationError = validateGifInputFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      releaseAnimationSource(source);
      releaseAnimationResult(result);
      setResult(null);

      const nextSource = await readGifAnimationSource(file);
      setSource(nextSource);
      setWidth(nextSource.metadata.width);
      setHeight(nextSource.metadata.height);
      setCrop({
        ...defaultCrop,
        width: nextSource.metadata.width,
        height: nextSource.metadata.height,
      });
      setSpeedMultiplier(1);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Unable to read the GIF.");
    }
  }

  async function handleProcess() {
    if (!source) {
      setError("Upload a GIF before resizing.");
      return;
    }

    if (!width || !height || width < 1 || height < 1) {
      setError("Width and height must both be greater than 0.");
      return;
    }

    if (speedMultiplier < 0.25 || speedMultiplier > 4) {
      setError("Speed multiplier must stay between 0.25x and 4x.");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      releaseAnimationResult(result);

      const nextResult = await transformAnimationToGif({
        source,
        resize: { width, height },
        crop,
        speed: { multiplier: speedMultiplier },
        suffix: `${width}x${height}`,
      });
      setResult(nextResult);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "GIF resize failed.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    releaseAnimationSource(source);
    releaseAnimationResult(result);
    setSource(null);
    setResult(null);
    setWidth(0);
    setHeight(0);
    setCrop(defaultCrop);
    setSpeedMultiplier(1);
    setError(null);
  }

  const helperText = source
    ? `All ${source.metadata.frameCount} frames will be processed. Speed is applied by updating real frame delays, not by editing only the first frame.`
    : null;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Animation Tool"
        title="GIF Resizer"
        description="Resize animated GIFs frame by frame, optionally crop them, adjust playback speed, and export a real animated GIF directly in your browser."
      />

      <Card className="space-y-6">
        <FileUpload
          accept="image/gif"
          buttonText="Choose GIF"
          helpText="Upload an animated GIF. Large files and very high frame counts are limited for browser safety."
          onFilesChange={handleFilesChange}
        />
        <ErrorMessage message={error} />
        <GifResizerControls
          width={width}
          height={height}
          crop={crop}
          speedMultiplier={speedMultiplier}
          isProcessing={isProcessing}
          hasSource={Boolean(source)}
          hasResult={Boolean(result)}
          helperText={helperText}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          onCropChange={setCrop}
          onSpeedMultiplierChange={setSpeedMultiplier}
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
          title="No GIF loaded yet"
          description="Upload an animated GIF to inspect its frame data, resize all frames honestly, and export a working animated result."
        />
      )}
    </div>
  );
}
