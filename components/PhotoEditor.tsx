"use client";

interface PhotoEditorProps {
  hasPhoto: boolean;
  zoom: number;
  onZoomChange: (value: number) => void;
  onReset: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PhotoEditor({
  hasPhoto,
  zoom,
  onZoomChange,
  onReset,
  onUpload,
}: PhotoEditorProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#3f2925]">
          Foto Profil
        </label>

        <label
          htmlFor="photo-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d8ccc4] bg-[#faf8f6] px-5 py-8 text-center transition hover:border-[#d77b2f] hover:bg-[#fff8f0]"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7e7d3] text-2xl">
            📷
          </div>

          <span className="text-sm font-bold text-[#4d302b]">
            {hasPhoto ? "Ganti Foto" : "Upload Foto"}
          </span>

          <span className="mt-1 text-xs text-[#8b7b74]">
            JPG, JPEG, atau PNG
          </span>

          <input
            id="photo-upload"
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={onUpload}
            className="hidden"
          />
        </label>
      </div>

      {hasPhoto && (
        <div className="rounded-2xl bg-[#faf8f6] p-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-semibold text-[#3f2925]">
              Zoom Foto
            </label>

            <span className="text-xs font-medium text-[#8b7b74]">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0.1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="w-full accent-[#8f241e]"
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
              className="flex-1 rounded-xl border border-[#ded3cc] bg-white py-2 text-sm font-bold text-[#5a4039] transition hover:bg-[#f7f2ee]"
            >
              −
            </button>

            <button
              type="button"
              onClick={onReset}
              className="flex-2 rounded-xl border border-[#ded3cc] bg-white py-2 text-sm font-bold text-[#5a4039] transition hover:bg-[#f7f2ee]"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => onZoomChange(Math.min(3, zoom + 0.1))}
              className="flex-1 rounded-xl border border-[#ded3cc] bg-white py-2 text-sm font-bold text-[#5a4039] transition hover:bg-[#f7f2ee]"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
