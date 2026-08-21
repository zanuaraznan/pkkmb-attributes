import AttributeEditor from "@/components/AttributeEditor";
import Image from "next/image";

export default function TwibbonPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 inline-flex rounded-full bg-[#f9eadc] px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-[#a54a1e]">
            Atribut PKKMB
          </div>

          <h1 className="text-4xl font-black tracking-tight text-[#641b18] sm:text-5xl">
            Twibbon
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#786962]">
            Pasang foto terbaikmu ke dalam Twibbon Aksantara Muda dan download
            hasilnya.
          </p>
        </div>
        <div className="space-y-2">
          <div className="mb-3 inline-flex rounded-full bg-[#f9eadc] px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-[#a54a1e]">
            Twibbon Video Template
          </div>
          <a
            target="_blank"
            href="https://www.capcut.com/tv2/ZSVP23KYf"
            referrerPolicy="no-referrer"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold p-4 px-6 rounded-full bg-red-900 text-white mb-12 w-fit"
          >
            Edit Lencana Aksantara di Capcut
            <Image src={"/capcut.png"} alt="Capcut" width={24} height={24} />
          </a>
        </div>
        <AttributeEditor
          mode="twibbon"
          overlay="/assets/twibbon-overlay.png"
          width={1080}
          height={1440}
          title="Buat Twibbon"
          description="Upload foto, atur posisi dan zoom foto, kemudian download Twibbon."
        />
      </div>
    </main>
  );
}
