import NumberBibDownloader from "@/components/DownloadBib";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-[#e9c9a9] bg-[#fff4e8] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#a54a1e]">
              PKKMB Universitas Kadiri 2026
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-[#641b18] sm:text-7xl lg:text-8xl">
              Aksantara
              <br />
              <span className="text-[#b85b25]">Muda</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#786962] sm:text-lg">
              Lengkapi kebutuhan atribut PKKMB kamu dengan mudah. Buat ID Card,
              Twibbon, dan berbagai atribut lainnya langsung dari browser.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b85b25]">
            Pilih Atribut
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#641b18]">
            Buat atributmu
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* ID CARD */}

          <Link
            href="/id-card"
            className="group relative overflow-hidden rounded-[28px] bg-white p-7 shadow-[0_10px_40px_rgba(64,37,28,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(64,37,28,0.12)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8e5d3] text-2xl">
              🪪
            </div>

            <h3 className="mt-6 text-2xl font-black text-[#641b18]">ID Card</h3>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#81716b]">
              Buat ID Card PKKMB dengan foto, nama, fakultas, dan nomor
              kelompok.
            </p>

            <div className="mt-7 font-bold text-[#a54a1e]">
              Buat sekarang
              <span className="ml-2 transition group-hover:ml-3">→</span>
            </div>
          </Link>

          {/* TWIBBON */}

          <Link
            href="/twibbon"
            className="group relative overflow-hidden rounded-[28px] bg-[#641b18] p-7 shadow-[0_10px_40px_rgba(64,37,28,0.12)] transition duration-300 hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🖼️
            </div>

            <h3 className="mt-6 text-2xl font-black text-white">Twibbon</h3>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
              Pasang foto kamu ke dalam frame Twibbon Aksantara Muda.
            </p>

            <div className="mt-7 font-bold text-[#f4bd82]">
              Buat sekarang
              <span className="ml-2 transition group-hover:ml-3">→</span>
            </div>
          </Link>

          {/* No Dada */}
          <NumberBibDownloader />

          {/* UDENG */}
          <div className="flex flex-col gap-4 *:w-full">
            <a
              href="/assets/Udeng.pdf"
              download="Mahkota Aksantara - A4 Full.pdf"
              className="inline-flex items-center justify-center rounded-xl bg-[#8f241e] px-5 py-5 text-sm font-medium text-white transition hover:bg-[#731c17] active:scale-95"
            >
              Download Udeng/Mahkota Aksantara [PDF]
            </a>
            <a
              href="/assets/frame-aksantara.png"
              download="Frame Aksantara - 1080x1920.png"
              className="inline-flex items-center justify-center rounded-xl text-[#8f241e] px-5 py-5 text-sm font-medium bg-red-100 transition hover:bg-red-50 active:scale-95"
            >
              Download Frame Aksantara
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
