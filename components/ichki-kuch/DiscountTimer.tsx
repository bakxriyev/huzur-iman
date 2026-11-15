"use client";

import { useEffect, useState } from "react";
import { sans } from "@/lib/fonts";

function Timer({ left }: { left: number | null }) {
  const v = left ?? 0;
  const parts = [Math.floor(v / 3600), Math.floor((v % 3600) / 60), v % 60];
  const labels = ["soat", "daqiqa", "soniya"];
  return (
    <div className="flex items-start justify-center gap-2 sm:gap-3" aria-live="off">
      {parts.map((p, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className={`${sans.className} tabular-nums min-w-[64px] rounded-2xl border border-[#e6c47c]/50 bg-[#46021b] px-3 py-2 text-center text-[32px] font-extrabold leading-none text-[#f3d68f] sm:min-w-[84px] sm:py-3 sm:text-[44px]`}>
            {left === null ? "--" : String(p).padStart(2, "0")}
          </div>
          <span className="mt-1 text-[11px] font-semibold text-[#6b0426]/80 sm:text-[12px]">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** 24 soatlik taymer: har bir tashrif buyuruvchi uchun brauzerda saqlanadi */
export default function DiscountTimer() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const KEY = "ik_deadline_v1";
    const DAY = 24 * 60 * 60 * 1000;
    let deadline = 0;
    try {
      deadline = Number(localStorage.getItem(KEY));
    } catch {}
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + DAY;
      try {
        localStorage.setItem(KEY, String(deadline));
      } catch {}
    }
    const tick = () => setLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto mt-8 w-fit rounded-[28px] bg-[#fbf3e4] px-5 py-5 sm:px-8">
      <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[#6b0426]">Chegirma tugashiga qoldi</p>
      <Timer left={left} />
    </div>
  );
}
