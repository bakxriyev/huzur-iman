import { serif } from "@/lib/fonts";

export const GOLD =
  "bg-gradient-to-b from-[#fff6d8] via-[#ecc97f] to-[#b8893a] bg-clip-text text-transparent";
export const DARK_BG =
  "radial-gradient(60% 40% at 50% 0%, rgba(214,60,110,.38) 0%, rgba(214,60,110,0) 70%), radial-gradient(50% 35% at 100% 100%, rgba(230,196,124,.14) 0%, rgba(230,196,124,0) 70%), radial-gradient(45% 30% at 0% 60%, rgba(160,20,70,.35) 0%, rgba(160,20,70,0) 70%), linear-gradient(180deg,#6a0628 0%,#4d0220 55%,#3a0118 100%)";
export const DARK_STYLE = {
  background: "radial-gradient(rgba(230,196,124,.10) 1px, transparent 1.6px) 0 0/26px 26px, " + DARK_BG,
};
export const LIGHT_BG =
  "radial-gradient(50% 30% at 100% 0%, rgba(240,170,200,.18) 0%, rgba(240,170,200,0) 70%), radial-gradient(45% 25% at 0% 45%, rgba(230,196,124,.14) 0%, rgba(230,196,124,0) 70%), radial-gradient(50% 30% at 100% 85%, rgba(240,170,200,.16) 0%, rgba(240,170,200,0) 70%), linear-gradient(#f7ecdf,#f7ecdf)";

export function Check({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
        light ? "bg-[#e6c47c] text-[#5c0424]" : "bg-[#6b0426] text-white"
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function UpArrow({ delay = "0s", dark = false }: { delay?: string; dark?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 72"
      aria-hidden="true"
      className={`ik-up h-12 w-8 shrink-0 ${dark ? "text-[#b8893a]" : "text-[#f3d68f]"} drop-shadow-[0_4px_10px_rgba(230,196,124,.5)] sm:h-16 sm:w-11`}
      style={{ animationDelay: delay }}
      fill="currentColor"
    >
      <path d="M24 2 L46 28 H32 V70 H16 V28 H2 Z" />
    </svg>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`mx-auto flex w-full max-w-[320px] items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c99b4a]" />
      <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#c99b4a]" fill="currentColor">
        <path d="M10 0l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c99b4a]" />
    </div>
  );
}

/** To‘lqinsimon o‘tish: bo‘limlarni tilla chiziq bilan silliq ulaydi */
export function WaveEdge({ flip = false, fill = "#f7ecdf" }: { flip?: boolean; fill?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 z-10 h-[40px] w-full sm:h-[70px] ${flip ? "bottom-0 rotate-180" : "top-0"}`}
    >
      <path d="M0 0H1440V28C1220 78 980 78 720 40S240 4 0 44Z" fill={fill} />
      <path d="M1440 28C1220 78 980 78 720 40S240 4 0 44" fill="none" stroke="#d9b25f" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function SectionTitle({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div>
      <h2
        className={`${serif.className} text-balance text-center text-[26px] font-bold leading-[1.2] sm:text-[40px] ${
          dark ? "text-[#5c0424]" : GOLD
        }`}
      >
        {children}
      </h2>
      <Ornament className="mt-5" />
    </div>
  );
}
