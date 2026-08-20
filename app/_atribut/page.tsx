import Link from "next/link";

const attributes = [
  {
    title: "ID Card",
    description: "Buat ID Card PKKMB dengan foto dan data peserta.",
    href: "/id-card",
    icon: "🪪",
  },
  {
    title: "Twibbon",
    description: "Buat Twibbon Aksantara Muda dengan foto kamu.",
    href: "/twibbon",
    icon: "🖼️",
  },
];

export default function AtributPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full bg-[#f9eadc] px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-[#a54a1e]">
            Aksantara Muda
          </div>

          <h1 className="text-4xl font-black text-[#641b18]">Atribut PKKMB</h1>

          <p className="mt-3 max-w-xl text-[#786962]">
            Pilih atribut yang ingin kamu buat.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {attributes.map((attribute) => (
            <Link
              key={attribute.href}
              href={attribute.href}
              className="rounded-[28px] bg-white p-6 shadow-[0_10px_40px_rgba(64,37,28,0.07)] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8e5d3] text-2xl">
                {attribute.icon}
              </div>

              <h2 className="mt-5 text-xl font-black text-[#641b18]">
                {attribute.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#81716b]">
                {attribute.description}
              </p>

              <div className="mt-5 text-sm font-bold text-[#a54a1e]">
                Buat sekarang →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
