"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Sparkles } from "lucide-react";

const DISMISS_KEY = "icr-sale-popup-dismissed";

export default function FestiveSalePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Closing still works if browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) !== "1") {
        const timer = window.setTimeout(() => setIsOpen(true), 900);
        return () => window.clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, closePopup]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="icr-sale-title"
        aria-describedby="icr-sale-description"
        className="relative my-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-[#d7c3a3] bg-[#fbf5eb] shadow-2xl md:min-h-[560px] md:grid-cols-[1.05fr_0.95fr]"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closePopup}
          aria-label="Close sale popup"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#251c17] shadow-md transition hover:rotate-90 hover:bg-[#8e2018] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#a87935]"
        >
          <X size={22} />
        </button>

        <div className="relative min-h-[230px] overflow-hidden sm:min-h-[300px] md:min-h-full">
          <Image
            src="/images/collections/hero.jpg"
            alt="Handcrafted rug styled in an elegant living room"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
          <div className="absolute bottom-5 left-5 rounded-full border border-white/60 bg-black/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Made by hand. Made to last.
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center px-6 py-9 text-center sm:px-10 sm:py-12 md:px-12">
          <div className="pointer-events-none absolute inset-3 rounded-xl border border-[#e9dcc8]" />
          <div className="relative z-10 flex max-w-md flex-col items-center">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#5b4634] sm:text-xs">
              Indian Creative Rugs
            </div>
            <div className="mb-5 flex items-center gap-2 text-[#a87935]">
              <span className="h-px w-8 bg-current" />
              <Sparkles size={15} aria-hidden="true" />
              <span className="h-px w-8 bg-current" />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8e2018] sm:text-sm">
              Black Friday &amp; Festive Sale
            </p>
            <h2
              id="icr-sale-title"
              className="font-serif text-5xl leading-none tracking-tight text-[#2b211a] sm:text-6xl lg:text-7xl"
            >
              25% <span className="text-[#a87935]">OFF</span>
            </h2>
            <div className="my-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.28em] text-[#2b211a]">
              <span className="h-px w-7 bg-[#a87935]" />
              All Rugs
              <span className="h-px w-7 bg-[#a87935]" />
            </div>
            <p
              id="icr-sale-description"
              className="mb-6 max-w-sm text-sm leading-6 text-[#6a5747] sm:text-base"
            >
              Bring home something extraordinary. Discover handcrafted rugs
              made to make your space feel beautifully yours.
            </p>

            <div className="mb-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#6a5747] sm:text-[11px]">
              <span>Handcrafted quality</span>
              <span aria-hidden="true" className="text-[#a87935]">✦</span>
              <span>Timeless designs</span>
              <span aria-hidden="true" className="text-[#a87935]">✦</span>
              <span>Worldwide delivery</span>
            </div>

            <Link
              href="/rugs"
              onClick={closePopup}
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#8e2018] px-7 py-4 text-sm font-semibold uppercase tracking-[0.13em] text-white shadow-lg transition hover:bg-[#681710] focus:outline-none focus:ring-2 focus:ring-[#a87935] focus:ring-offset-2 sm:text-base"
            >
              Shop All Rugs
              <ArrowRight size={19} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-[10px] tracking-wide text-[#8a7767]">
              A little luxury for every room.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
