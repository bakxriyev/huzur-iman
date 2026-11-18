"use client";

import { UpArrow } from "./ui";
import { trackEvent } from "@/lib/track";

function goToTariffs() {
  trackEvent("CTAClick");
  document.getElementById("tariflar")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CTAButton({ label = "Kursga yozilish", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[540px]">
        <span aria-hidden="true" className="ik-ring pointer-events-none absolute inset-0 rounded-full border-2 border-[#f3d68f]" />
        <button
          type="button"
          onClick={goToTariffs}
          className="ik-cta relative isolate flex min-h-[78px] w-full items-center justify-center gap-3 overflow-hidden rounded-full border-[3px] border-[#fff3d1]/80 bg-gradient-to-b from-[#fbe6aa] via-[#e2b865] to-[#a97a30] px-6 py-5 text-[20px] font-extrabold uppercase tracking-wide text-[#3f0119] shadow-[0_7px_0_0_#6f4d16,0_18px_38px_rgba(0,0,0,.4)] transition-transform duration-100 hover:translate-y-[2px] active:translate-y-[5px] sm:min-h-[96px] sm:text-[28px]"
        >
          <span className="ik-shine absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/50 blur-md" />
          <span className="relative z-10">{label}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ik-wiggle relative z-10 h-7 w-7 shrink-0 sm:h-9 sm:w-9">
            <path d="M3 12h16" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 sm:gap-7">
        <UpArrow dark={dark} />
        <span className={`text-center text-[13px] font-bold uppercase tracking-wide sm:text-[16px] ${dark ? "text-[#6b0426]" : "text-[#fbeccb]"}`}>
          Joylar soni cheklangan
        </span>
        <UpArrow dark={dark} delay=".25s" />
      </div>
    </div>
  );
}
