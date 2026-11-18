"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Review = { src: string; width: number; height: number };

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [zoom, setZoom] = useState<string | null>(null);
  const revRef = useRef<HTMLOListElement>(null);
  const slideReviews = (dir: 1 | -1) => {
    const el = revRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <>
      <div className="mt-9 flex items-center justify-between px-1 text-[13px] font-semibold text-[#6b0426]/80">
        <span>{reviews.length} ta natija</span>
        <span className="flex items-center gap-1">Suring <span className="ik-wiggle">→</span></span>
      </div>
      <div className="relative mt-3">
        <ol
          ref={revRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Natijalar va otzivlar"
        >
          {reviews.map((r, i) => (
            <li key={r.src} className="w-[72%] max-w-[300px] shrink-0 snap-center sm:w-[280px]">
              <button
                type="button"
                onClick={() => setZoom(r.src)}
                aria-label={`Natija ${i + 1} ni kattalashtirish`}
                className="block w-full overflow-hidden rounded-2xl bg-white shadow-[0_10px_26px_rgba(74,2,32,.18)]"
              >
                <Image src={r.src} alt={`O‘quvchi natijasi ${i + 1}`} width={r.width} height={r.height} sizes="(max-width: 640px) 72vw, 300px" loading="lazy" className="h-auto w-full" />
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => slideReviews(-1)} aria-label="Oldingi" className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#6b0426] text-xl text-[#f3d68f] shadow-lg sm:flex">←</button>
        <button type="button" onClick={() => slideReviews(1)} aria-label="Keyingi" className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#6b0426] text-xl text-[#f3d68f] shadow-lg sm:flex">→</button>
      </div>
      <p className="mt-3 text-center text-[13px] text-[#6b0426]/70">Rasmni bossangiz, to‘liq ko‘rinadi</p>

      {zoom && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-3" onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <button type="button" aria-label="Yopish" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-black">✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="Natija" className="max-h-full max-w-full rounded-xl object-contain" />
        </div>
      )}
    </>
  );
}
