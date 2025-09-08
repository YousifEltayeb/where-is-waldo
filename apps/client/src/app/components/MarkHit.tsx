import { RefObject } from 'react';

interface MarkHitProps {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  imageRef: RefObject<HTMLImageElement | null> | null;
  originalImageWidth: number;
}

export default function MarkHit({
  xStart,
  xEnd,
  yStart,
  yEnd,
  imageRef,
  originalImageWidth,
}: MarkHitProps) {
  if (!imageRef) return null;
  const imageElement = imageRef.current;
  if (!imageElement) {
    return null;
  }

  const imageRect = imageElement.getBoundingClientRect();
  const { width: renderedWidth } = imageRect;

  if (renderedWidth === 0) {
    return null;
  }

  const scale = renderedWidth / originalImageWidth;

  const markerWidth = (xEnd - xStart) * scale;
  const markerHeight = (yEnd - yStart) * scale;
  const markerLeft = xStart * scale;
  const markerTop = yStart * scale;

  return (
    <div
      className="absolute border-2 border-red-500 pointer-events-none"
      style={{
        left: `${markerLeft}px`,
        top: `${markerTop}px`,
        width: `${markerWidth}px`,
        height: `${markerHeight}px`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-0.5 bg-red-500 rotate-45"></div>
        <div className="absolute w-full h-0.5 bg-red-500 -rotate-45"></div>
      </div>
    </div>
  );
}
