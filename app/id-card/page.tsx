import AttributeEditor from "@/components/AttributeEditor";

export default function IdCardPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:py-14">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 inline-flex rounded-full bg-[#f9eadc] px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-[#a54a1e]">
            Atribut PKKMB
          </div>

          <h1 className="text-4xl font-black tracking-tight text-[#641b18] sm:text-5xl">
            ID Card
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#786962]">
            Buat ID Card Aksantara Muda dengan mengunggah foto dan memasukkan
            data peserta.
          </p>
        </div>

        <AttributeEditor
          mode="id-card"
          overlay="/assets/id-card-overlay.png"
          width={1803}
          height={1841}
          title="Buat ID Card"
          description="Upload foto, atur posisi, masukkan data, kemudian download ID Card kamu."
        />
      </div>
    </main>
  );
}
