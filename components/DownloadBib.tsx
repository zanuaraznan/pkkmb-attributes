"use client";

import { useState } from "react";

export default function NumberBibDownloader() {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleDownload = () => {
    setIsDownloading(true);

    const fileName = `No Dada - ${selectedNumber}.png`;
    const fileUrl = `/assets/no-dada/${fileName}`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      setIsDownloading(false);
    }, 500);
  };

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(64,37,28,0.08)]">
      <div className="mb-5">
        <div className="mb-2 inline-flex rounded-full bg-[#f9eadc] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a54a1e]">
          Atribut Peserta
        </div>
        <h3 className="text-xl font-black text-[#5f211d]">
          Download Nomor Dada
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#84746e]">
          Pilih nomor dada kamu (1–12) lalu tekan tombol download.
        </p>
      </div>

      <div className="space-y-4">
        {/* Dropdown Selection */}
        <div>
          <label
            htmlFor="bib-number-select"
            className="mb-1.5 block text-xs font-bold text-[#624942]"
          >
            Pilih Nomor Dada
          </label>
          <div className="relative">
            <select
              id="bib-number-select"
              value={selectedNumber.toString()}
              onChange={(e) => setSelectedNumber(parseInt(e.target.value, 10))}
              className="w-full appearance-none rounded-xl border border-[#ddd1ca] bg-white px-4 py-3 pr-10 text-sm font-semibold text-[#3f2925] outline-none transition focus:border-[#a83b22] focus:ring-4 focus:ring-[#a83b22]/10"
            >
              {numbers.map((num) => (
                <option key={num} value={num.toString()}>
                  Nomor Dada {num < 10 ? `0${num}` : num}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8b7b74]">
              ▼
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full cursor-pointer rounded-xl bg-[#8f241e] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_20px_rgba(143,36,30,0.2)] transition hover:bg-[#731c17] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#c8bbb5] disabled:shadow-none"
        >
          {isDownloading
            ? "Mendownload..."
            : `Download Nomor Dada ${selectedNumber}`}
        </button>
      </div>
    </div>
  );
}
