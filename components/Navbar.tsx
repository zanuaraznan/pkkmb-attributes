"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd8]/80 bg-[#f8f4f0]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <Image
            src="/assets/aksantara.png"
            alt="Aksantara Muda 2026"
            width={100}
            height={100}
            className="h-13 w-13 object-contain"
            priority
          />

          <div>
            <div className="text-sm font-black leading-none text-red-900">
              AKSANTARA MUDA
            </div>

            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-red-300">
              PKKMB Universitas Kadiri
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6c554d] transition hover:bg-white hover:text-[#8f241e]"
          >
            Beranda
          </Link>

          <Link
            href="/id-card"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6c554d] transition hover:bg-white hover:text-[#8f241e]"
          >
            ID Card
          </Link>

          <Link
            href="/twibbon"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6c554d] transition hover:bg-white hover:text-[#8f241e]"
          >
            Twibbon
          </Link>

          {/* <Link
            href="/atribut"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6c554d] transition hover:bg-white hover:text-[#8f241e]"
          >
            Atribut
          </Link> */}
        </nav>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="relative z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white text-[#641b18] shadow-sm active:scale-95 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Tutup Menu" : "Buka Menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="border-t border-[#eadfd8] bg-[#f8f4f0] px-5 pb-5 md:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[#6c554d] transition hover:bg-white"
            >
              Beranda
            </Link>

            <Link
              href="/id-card"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[#6c554d] transition hover:bg-white"
            >
              ID Card
            </Link>

            <Link
              href="/twibbon"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[#6c554d] transition hover:bg-white"
            >
              Twibbon
            </Link>

            {/* <Link
              href="/atribut"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-[#6c554d] transition hover:bg-white"
            >
              Atribut
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  );
}
