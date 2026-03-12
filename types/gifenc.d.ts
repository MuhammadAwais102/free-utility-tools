declare module "gifenc" {
  export type RGB = [number, number, number];

  export type GIFEncoderInstance = {
    reset(): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
    writeHeader(): void;
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      opts?: {
        transparent?: boolean;
        transparentIndex?: number;
        delay?: number;
        palette?: RGB[];
        repeat?: number;
        colorDepth?: number;
        dispose?: number;
      },
    ): void;
  };

  export function GIFEncoder(opts?: { initialCapacity?: number; auto?: boolean }): GIFEncoderInstance;
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    opts?: Record<string, unknown>,
  ): RGB[];
  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: RGB[],
    format?: string,
  ): Uint8Array;
}
