"use client";

import { RefObject } from "react";

interface EditorPreviewProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
  hasPhoto: boolean;
  isDragging: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}

export default function EditorPreview({
  canvasRef,
  width,
  height,
  hasPhoto,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
}: EditorPreviewProps) {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-[28px] bg-[#e8e1db] p-4 sm:p-8">
      <div className="w-full max-w-[680px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#49342f]">Preview</h3>

            {hasPhoto && (
              <p className="mt-0.5 text-xs text-[#887872]">
                Drag foto untuk mengatur posisi
              </p>
            )}
          </div>

          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#887872] shadow-sm">
            {width} × {height}px
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(64,37,28,0.18)]">
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerLeave}
            className={`block h-auto w-full touch-none ${
              hasPhoto
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-default"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
