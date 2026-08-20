"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PhotoEditor from "./PhotoEditor";
import EditorPreview from "./EditorPreview";

export type EditorMode = "id-card" | "twibbon";

interface AttributeEditorProps {
  mode: EditorMode;
  overlay: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

interface Point {
  x: number;
  y: number;
}

export default function AttributeEditor({
  mode,
  overlay,
  width,
  height,
  title,
  description,
}: AttributeEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const overlayRef = useRef<HTMLImageElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const [zoom, setZoom] = useState(1);

  const [position, setPosition] = useState<Point>({
    x: 0,
    y: 0,
  });

  const [dragging, setDragging] = useState(false);

  const dragOffsetRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [group, setGroup] = useState("");

  const [overlayLoaded, setOverlayLoaded] = useState(false);

  /*
   * ==============================
   * LOAD OVERLAY
   * ==============================
   */

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      overlayRef.current = image;
      setOverlayLoaded(true);
    };

    image.onerror = () => {
      console.error(`Gagal memuat overlay: ${overlay}`);

      setOverlayLoaded(false);
    };

    image.src = overlay;
  }, [overlay]);

  /*
   * ==============================
   * CLEAN PHOTO URL
   * ==============================
   */

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  /*
   * ==============================
   * DRAW PHOTO
   * ==============================
   */

  const drawPhoto = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const image = photoRef.current;

      if (!image) {
        return;
      }

      const imageRatio = image.width / image.height;

      const canvasRatio = width / height;

      let drawWidth: number;
      let drawHeight: number;

      /*
       * Cover:
       * Foto selalu memenuhi canvas.
       */

      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
      }

      drawWidth *= zoom;
      drawHeight *= zoom;

      const x = (width - drawWidth) / 2 + position.x;

      const y = (height - drawHeight) / 2 + position.y;

      ctx.drawImage(image, x, y, drawWidth, drawHeight);
    },
    [width, height, zoom, position],
  );

  /*
   * ==============================
   * DRAW TEXT
   * ==============================
   */

  const drawText = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      fontSize: number,
    ) => {
      if (!text.trim()) {
        return;
      }

      let currentSize = fontSize;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      while (currentSize > 18) {
        ctx.font = `600 ${currentSize}px Arial`;

        const measured = ctx.measureText(text).width;

        if (measured <= maxWidth) {
          break;
        }

        currentSize -= 2;
      }

      ctx.font = `600 ${currentSize}px Arial`;

      ctx.fillStyle = "#6B1B18";

      ctx.fillText(text, x, y);
    },
    [],
  );

  /*
   * ==============================
   * DRAW ID CARD DATA
   * ==============================
   *
   * Posisi ini mengikuti template
   * 1803 x 1825 yang kamu upload.
   *
   * Kalau posisi text perlu digeser,
   * cukup ubah angka di sini.
   */

  const drawIdCardText = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      drawText(ctx, name, 900, 930, 950, 58);

      drawText(ctx, faculty, 795, 1145, 500, 48);

      drawText(ctx, group, 1200, 1145, 150, 48);
    },
    [name, faculty, group, drawText],
  );

  /*
   * ==============================
   * RENDER CANVAS
   * ==============================
   */

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    /*
     * LAYER 1
     * ==========================
     * FOTO PESERTA
     */

    drawPhoto(ctx);

    /*
     * LAYER 2
     * ==========================
     * OVERLAY
     */

    const overlayImage = overlayRef.current;

    if (overlayImage && overlayLoaded) {
      ctx.drawImage(overlayImage, 0, 0, width, height);
    }

    /*
     * LAYER 3
     * ==========================
     * TEXT ID CARD
     */

    if (mode === "id-card") {
      drawIdCardText(ctx);
    }
  }, [width, height, drawPhoto, overlayLoaded, mode, drawIdCardText]);

  /*
   * RENDER SETIAP ADA PERUBAHAN
   */

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas, name, faculty, group]);

  /*
   * ==============================
   * UPLOAD PHOTO
   * ==============================
   */

  function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("File yang dipilih harus berupa gambar.");

      return;
    }

    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
    }

    const url = URL.createObjectURL(file);

    setPhotoUrl(url);

    const image = new Image();

    image.onload = () => {
      photoRef.current = image;

      /*
       * Reset posisi ketika
       * upload foto baru.
       */

      setZoom(1);

      setPosition({
        x: 0,
        y: 0,
      });

      /*
       * Paksa render.
       */

      requestAnimationFrame(renderCanvas);
    };

    image.onerror = () => {
      alert("Foto tidak dapat dibaca.");

      URL.revokeObjectURL(url);
      setPhotoUrl(null);
      photoRef.current = null;
    };

    image.src = url;

    /*
     * Supaya bisa memilih file
     * yang sama lagi.
     */

    event.target.value = "";
  }

  /*
   * ==============================
   * CANVAS → COORDINATE
   * ==============================
   */

  function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    const scaleX = width / rect.width;

    const scaleY = height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,

      y: (event.clientY - rect.top) * scaleY,
    };
  }

  /*
   * ==============================
   * START DRAG
   * ==============================
   */

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!photoRef.current) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    const point = getCanvasPoint(event);

    dragOffsetRef.current = {
      x: point.x - position.x,
      y: point.y - position.y,
    };

    setDragging(true);
  }

  /*
   * ==============================
   * DRAG
   * ==============================
   */

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragging) {
      return;
    }

    const point = getCanvasPoint(event);

    setPosition({
      x: point.x - dragOffsetRef.current.x,

      y: point.y - dragOffsetRef.current.y,
    });
  }

  /*
   * ==============================
   * STOP DRAG
   * ==============================
   */

  function handlePointerUp() {
    setDragging(false);
  }

  /*
   * ==============================
   * RESET PHOTO
   * ==============================
   */

  function resetPhoto() {
    setZoom(1);

    setPosition({
      x: 0,
      y: 0,
    });
  }

  /*
   * ==============================
   * DOWNLOAD
   * ==============================
   */

  function downloadImage() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    /*
     * Pastikan render terakhir
     * sudah masuk canvas.
     */

    renderCanvas();

    canvas.toBlob((blob) => {
      if (!blob) {
        alert("Gagal membuat gambar.");

        return;
      }

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      const safeName = name
        .trim()
        .replace(/[^a-zA-Z0-9-_ ]/g, "")
        .replace(/\s+/g, "-");

      if (mode === "id-card") {
        link.download = `ID-Card-${safeName || "Aksantara-Muda"}.png`;
      } else {
        link.download = "Twibbon-Aksantara-Muda.png";
      }

      link.href = url;

      document.body.appendChild(link);

      link.click();

      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    }, "image/png");
  }

  const hasPhoto = Boolean(photoRef.current);

  /*
   * ==============================
   * UI
   * ==============================
   */

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
      {/* ==========================
          PANEL KIRI
      =========================== */}

      <aside className="h-fit rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(64,37,28,0.08)]">
        <div className="mb-7">
          <div className="mb-2 inline-flex rounded-full bg-[#f9eadc] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a54a1e]">
            Editor
          </div>

          <h2 className="text-2xl font-black text-[#5f211d]">{title}</h2>

          <p className="mt-2 text-sm leading-relaxed text-[#84746e]">
            {description}
          </p>
        </div>

        <PhotoEditor
          hasPhoto={hasPhoto}
          zoom={zoom}
          onZoomChange={setZoom}
          onReset={resetPhoto}
          onUpload={handlePhotoUpload}
        />

        {/* ======================
            ID CARD FORM
        ======================= */}

        {mode === "id-card" && (
          <div className="mt-7 border-t border-[#eee5df] pt-7">
            <h3 className="mb-4 text-sm font-bold text-[#49342f]">
              Data Peserta
            </h3>

            <div className="space-y-4">
              {/* Nama */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-bold text-[#624942]"
                >
                  Nama Lengkap
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  maxLength={50}
                  className="w-full rounded-xl border border-[#ddd1ca] bg-white px-4 py-3 text-sm text-[#3f2925] outline-none transition placeholder:text-[#b3a49d] focus:border-[#a83b22] focus:ring-4 focus:ring-[#a83b22]/10"
                />
              </div>

              {/* Fakultas */}

              <div>
                <label
                  htmlFor="faculty"
                  className="mb-1.5 block text-xs font-bold text-[#624942]"
                >
                  Fakultas
                </label>

                <input
                  id="faculty"
                  type="text"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="Contoh: Fakultas Teknik"
                  maxLength={35}
                  className="w-full rounded-xl border border-[#ddd1ca] bg-white px-4 py-3 text-sm text-[#3f2925] outline-none transition placeholder:text-[#b3a49d] focus:border-[#a83b22] focus:ring-4 focus:ring-[#a83b22]/10"
                />
              </div>

              {/* Kelompok */}

              <div>
                <label
                  htmlFor="group"
                  className="mb-1.5 block text-xs font-bold text-[#624942]"
                >
                  Nomor Kelompok
                </label>

                <input
                  id="group"
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  placeholder="Contoh: 07"
                  maxLength={5}
                  className="w-full rounded-xl border border-[#ddd1ca] bg-white px-4 py-3 text-sm text-[#3f2925] outline-none transition placeholder:text-[#b3a49d] focus:border-[#a83b22] focus:ring-4 focus:ring-[#a83b22]/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* ======================
            DOWNLOAD
        ======================= */}

        <button
          type="button"
          onClick={downloadImage}
          disabled={!hasPhoto}
          className="mt-7 w-full rounded-xl bg-[#8f241e] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(143,36,30,0.2)] transition hover:bg-[#731c17] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#c8bbb5] disabled:shadow-none"
        >
          {hasPhoto ? "Download PNG" : "Upload Foto Terlebih Dahulu"}
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-[#968680]">
          Foto diproses langsung di perangkatmu. Tidak perlu mengunggah foto ke
          server.
        </p>
      </aside>

      {/* ==========================
          PREVIEW KANAN
      =========================== */}

      <EditorPreview
        canvasRef={canvasRef}
        width={width}
        height={height}
        hasPhoto={hasPhoto}
        isDragging={dragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
}
