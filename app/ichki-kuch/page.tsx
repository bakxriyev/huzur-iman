"use client";

import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import TariffModal, { type Tarif } from "@/components/TariffModal";

const PERSON_IMG = "/iman.png"; // public/iman.png

/** O‘quvchilar natijalari/otzivlari: rasmlarni public/ papkaga qo‘yib, shu yerga yozing.
 *  Masalan: ["/otziv-1.jpg", "/otziv-2.jpg"]. Bo‘sh bo‘lsa, joy ushlagichlar ko‘rinadi. */
const REVIEWS: string[] = [1, 2, 3, 4, 5, 6, 7].map((n) => `/natijalar/natija-${n}.webp`);

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const STATS = [
  { big: "1.5 OY", text: "jonli va amaliy darslar" },
  { big: "12 SOAT+", text: "Shaxsan Iman Akhmedovadan chuqurlashtirilgan bilim va motivatsiya" },
  { big: "122.000+", text: "faol o‘quvchilar" },
  { big: "Imkoniyat", text: "Ichki xotirjamlik, shukronalik va xotirjam o‘sish muhiti" },
];

const TOPICS = [
  "Sababiyat olamiga minnatdorlik",
  "Qarzdorlik va pulsizlik",
  "Yangi hayotga ishonch",
  "Orzularga oson erishish",
  "Sog‘lom o‘zini baholash",
  "Qalbdagi hafalikdan xalos bo‘lish",
  "Hayotimdagi yomon tajribalar",
  "Baraka",
  "Qabul qila olmaslik",
  "Stop: xiyonat va qadrsizlanish",
  "Aybsiz ona — sog‘lom farzand",
  "Xotirjamlik kaliti",
];

const VIP = [
  "Jonli efir va kurator nazorati",
  "12 ta dars",
  "Savol-javob",
  "Kundalik vazifalar",
  "20 ta texnika",
  "30 kunlik «Shukrona» qo‘llanmasi",
  "Moliya kundaligi",
  "«90 kun — Yangi men» ish daftari",
  "Haftalik qo‘llanma",
  "Kino terapiya",
];

const PREMIUM = [
  "12 ta dars yozuvi (zapis)",
  "30 kunlik «Shukrona» qo‘llanmasi",
  "«90 kun — Maqsadlar xaritasi»",
  "Kurs ishtirokchilari uchun yopiq jamiyat",
  "Bonus dars",
];

const FOR_WHO = [
  "O‘tmishdagi hafagarchiliklar, og‘riqlar va ichki ranjishlardan xalos bo‘lishni istasangiz.",
  "O‘zingizni qadrlash, ichki ishonch va xotirjamlikni qayta tiklashni xohlasangiz.",
  "Hayotingizda baraka, yangi boshlanish va orzularingizga ishonch bilan erishishni istasangiz.",
];

const GIFTS = [
  "1 kishiga Umra safari",
  "5 ta konsultatsiya bepul",
  "20 ta Huzur kursining VIP tarifi",
  "30 ta Nikoh madaniyati VIP tarifi",
  "10 ta maxsus box",
  "10 ta planner",
  "21 kunlik qo‘llanma",
];

const LOSSES = [
  { b: "Orzularingizga yaqinlashishda", t: "qo‘rquv va ikkilanishlar o‘rniga ishonch bilan harakat qilishni" },
  { b: "Ichki o‘zgarish imkoniyatidan", t: "45 kun davomida o‘zingizni anglash, fikrlaringizni tartibga solish va hayotingizga yangicha nigoh bilan qarashni" },
  { b: "Iman Akhmedova bilan jonli muloqotdan", t: "shaxsiy rivojlanishingiz uchun muhim bilimlar va amaliy tavsiyalarni olishni yoqotishingiz mumkin" },
];

const GOLD =
  "bg-gradient-to-b from-[#fff6d8] via-[#ecc97f] to-[#b8893a] bg-clip-text text-transparent";
const DARK_BG =
  "radial-gradient(60% 40% at 50% 0%, rgba(214,60,110,.38) 0%, rgba(214,60,110,0) 70%), radial-gradient(50% 35% at 100% 100%, rgba(230,196,124,.14) 0%, rgba(230,196,124,0) 70%), radial-gradient(45% 30% at 0% 60%, rgba(160,20,70,.35) 0%, rgba(160,20,70,0) 70%), linear-gradient(180deg,#6a0628 0%,#4d0220 55%,#3a0118 100%)";
const DARK_STYLE = {
  background: "radial-gradient(rgba(230,196,124,.10) 1px, transparent 1.6px) 0 0/26px 26px, " + DARK_BG,
};
const LIGHT_BG =
  "radial-gradient(50% 30% at 100% 0%, rgba(240,170,200,.18) 0%, rgba(240,170,200,0) 70%), radial-gradient(45% 25% at 0% 45%, rgba(230,196,124,.14) 0%, rgba(230,196,124,0) 70%), radial-gradient(50% 30% at 100% 85%, rgba(240,170,200,.16) 0%, rgba(240,170,200,0) 70%), linear-gradient(#f7ecdf,#f7ecdf)";

/* ---------- Kichik komponentlar ---------- */

function Check({ light = false }: { light?: boolean }) {
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

function UpArrow({ delay = "0s", dark = false }: { delay?: string; dark?: boolean }) {
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

function Ornament({ className = "" }: { className?: string }) {
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
function WaveEdge({ flip = false, fill = "#f7ecdf" }: { flip?: boolean; fill?: string }) {
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

function goToTariffs() {
  document.getElementById("tariflar")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CTAButton({ label = "Kursga yozilish", dark = false }: { label?: string; dark?: boolean }) {
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

function SectionTitle({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
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

/* ---------- Sahifa ---------- */

export default function VSLPage() {
  // 24 soatlik taymer: har bir tashrif buyuruvchi uchun brauzerda saqlanadi
  const [left, setLeft] = useState<number | null>(null);
  const [tarif, setTarif] = useState<Tarif | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);

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
    <>
      <style>{`
        .ik-wiggle { animation: ikWig 1.3s ease-in-out infinite; }
        @keyframes ikWig { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
        .ik-shine { animation: ikShine 3.2s ease-in-out infinite; }
        @keyframes ikShine { 0% { left: -40%; } 60%,100% { left: 130%; } }
        .ik-hero { animation: ikHero .8s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes ikHero { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .ik-glow { animation: ikGlow 3.5s ease-in-out infinite; }
        @keyframes ikGlow { 0%,100% { opacity: .5; } 50% { opacity: .9; } }
        .ik-up { animation: ikUp 1.1s ease-in-out infinite; }
        @keyframes ikUp { 0%,100% { transform: translateY(6px); } 50% { transform: translateY(-6px); } }
        .ik-ring { animation: ikRing 2s ease-out infinite; }
        @keyframes ikRing { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.07,1.35); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .ik-wiggle,.ik-shine,.ik-hero,.ik-glow,.ik-up,.ik-ring { animation: none !important; }
        }
      `}</style>

      <main style={{ background: LIGHT_BG }} className={`${sans.className} w-full overflow-x-hidden text-[#3b0a1f] [font-variant-numeric:lining-nums]`}>
        {/* ============ 1. HERO ============ */}
        <section className="relative overflow-hidden px-5 pb-28 pt-10 text-white sm:pb-36 sm:pt-16" style={DARK_STYLE}>
          <WaveEdge flip />
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#ffc2da]/25 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#ffc2da]/15 blur-3xl" />

          <div className="ik-hero relative z-10 mx-auto flex max-w-[820px] flex-col items-center text-center">
            <p className="rounded-full border border-[#e6c47c]/60 bg-[#46021b]/60 px-5 py-2 text-[13px] font-bold tracking-wide text-[#f3d68f] sm:text-[15px]">
              23-noyabr · Ichki uyg‘onish
            </p>

            <h1 className={`${serif.className} ${GOLD} mt-5 text-[clamp(40px,11vw,100px)] font-bold leading-[1.12] tracking-[0.02em]`}>
              ICHKI KUCH
            </h1>

            <p className="mt-4 max-w-[560px] text-[15px] font-bold uppercase leading-snug tracking-wide text-[#fbeccb] sm:text-[20px]">
              45 kun Iman Akhmedova bilan birga jonli dars
            </p>

            <p className={`${serif.className} mt-6 max-w-[620px] text-balance text-[21px] font-semibold leading-[1.3] text-white sm:text-[30px]`}>
              Qanday qilib minnatdorchilik orqali qalb xotirjamligiga erishish mumkin?
            </p>

            <div className="relative mt-8 w-full max-w-[300px] sm:max-w-[360px]">
              <div aria-hidden="true" className="ik-glow absolute left-1/2 top-[10%] h-[75%] w-[85%] -translate-x-1/2 rounded-full bg-[#ff9ccb]/40 blur-3xl" />
              <Image
                src={PERSON_IMG}
                alt="Iman Akhmedova"
                width={1276}
                height={1812}
                priority
                sizes="(max-width: 520px) 300px, 360px"
                className="relative z-10 mx-auto h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,.45)]"
              />
            </div>

            <div className="relative z-20 -mt-6 flex w-full justify-center sm:-mt-10">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* ============ 2. SIZNI NIMALAR KUTYAPTI ============ */}
        <section className="px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-[980px]">
            <SectionTitle dark>Sizni nimalar kutyapti:</SectionTitle>
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS.map((s) => (
                <div key={s.big} className="rounded-[28px] border border-[#e6c47c]/60 bg-[linear-gradient(160deg,#7a0a2e_0%,#5a0322_55%,#3f0119_100%)] p-6 text-center shadow-[0_14px_34px_rgba(74,2,32,.25)] sm:p-8">
                  <div className={`${serif.className} ${GOLD} text-[32px] font-bold leading-[1.15] sm:text-[42px]`}>{s.big}</div>
                  <p className="mx-auto mt-3 max-w-[320px] text-[15px] font-medium leading-relaxed text-[#fbeccb]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7. BONUS VA HADYALAR ============ */}
        <section className="px-5 pb-14 sm:pb-20">
          <div className="mx-auto max-w-[860px]">
            <div className="rounded-[28px] border-2 border-[#e6c47c] bg-[#fbf3e4] p-6 text-center sm:p-9">
              <p className="text-[34px]" aria-hidden="true">🎁</p>
              <h2 className={`${serif.className} text-balance text-[22px] font-bold leading-[1.3] text-[#6b0426] sm:text-[32px]`}>
                «ICHKI KUCH» kursiga yozilsangiz, 3 mln so‘m qiymatga ega 2 ta KURS BONUSGA BEPUL BERILADI
              </h2>
            </div>

            <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] shadow-[0_10px_30px_rgba(74,2,32,.08)] p-6 sm:p-9">
              <h3 className={`${serif.className} text-balance text-center text-[22px] font-bold leading-[1.25] text-[#6b0426] sm:text-[28px]`}>
                Kursni muvaffaqiyatli yakunlasangiz, quyidagi sovg‘alar egasi bo‘lishingiz mumkin
              </h3>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {GIFTS.map((g) => (
                  <li key={g} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-[16px] font-semibold">
                    <span aria-hidden="true">🎁</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex justify-center">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* ============ 3. AFZALLIKLAR ============ */}
        <section className="px-5 pb-10 sm:pb-14">
          <div className="mx-auto max-w-[860px]">
            <SectionTitle dark>Kursning asosiy afzalliklari va tafsilotlari</SectionTitle>
            <div className="mt-9 flex flex-col gap-5">
              <article className="rounded-[28px] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] shadow-[0_10px_30px_rgba(74,2,32,.08)] p-6 sm:p-9">
                <h3 className={`${serif.className} text-[22px] font-bold leading-[1.25] text-[#6b0426] sm:text-[28px]`}>
                  Haftada 2 marta jonli darslar{" "}
                  <span className="whitespace-nowrap">(1 soatdan)</span>
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {[
                    "Shaxsan Iman Akhmedovaning o‘zlari olib boradigan eksklyuziv jonli muloqot va darslar.",
                    "Har bir darsda o‘zgarish sari tashlanadigan aniq va tushunarli qadamlar.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[16px] leading-relaxed sm:text-[17px]">
                      <Check />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[28px] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] shadow-[0_10px_30px_rgba(74,2,32,.08)] p-6 sm:p-9">
                <h3 className={`${serif.className} text-[22px] font-bold leading-[1.25] text-[#6b0426] sm:text-[28px]`}>
                  «O‘zgaraman» mualliflik qo‘llanmasi asosida
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {[
                    "Kichik qadamlar bilan o‘z maqsadingiz sari ishonchli harakat qilish uchun maxsus tuzilgan yo‘riqnoma.",
                    "Hayotni tizimlashtirish, vaqtni boshqarish va ichki intizomni kuchaytirish sirlari.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[16px] leading-relaxed sm:text-[17px]">
                      <Check />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ============ YOZILMASANGIZ NIMALAR YOQOTASIZ ============ */}
        <section className="px-5 pb-12 sm:pb-16">
          <div className="mx-auto max-w-[860px] rounded-[28px] border-2 border-[#e6c47c] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] p-6 shadow-[0_10px_30px_rgba(74,2,32,.08)] sm:p-9">
            <h2 className={`${serif.className} text-balance text-center text-[24px] font-bold leading-[1.25] text-[#6b0426] sm:text-[34px]`}>
              «ICHKI KUCH» kursiga yozilmasangiz, nimalar yoqotasiz?
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {LOSSES.map((l) => (
                <li key={l.b} className="flex items-start gap-3 text-[16px] leading-relaxed sm:text-[17px]">
                  <Check />
                  <span>
                    <b className="text-[#6b0426]">{l.b}</b> — {l.t}
                  </span>
                </li>
              ))}
            </ul>
            <p className={`${serif.className} mt-7 text-balance text-center text-[19px] font-semibold leading-snug text-[#6b0426] sm:text-[24px]`}>
              Eng muhimi, bugun boshlashingiz mumkin bo‘lgan o‘zgarishni yana bir kunga kechiktirasiz, shuning uchun hoziroq kursga yoziling ⤵️
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton dark />
            </div>
          </div>
        </section>

        {/* ============ 4. KURS MAVZULARI ============ */}
        <section className="relative px-5 pb-20 pt-16 text-white sm:pb-28 sm:pt-24" style={DARK_STYLE}>
          <WaveEdge />
          <WaveEdge flip />
          <div className="mx-auto max-w-[980px]">
            <p className="text-center text-[14px] font-semibold tracking-wide text-[#f3d68f]">Ichki uyg‘onish kursi</p>
            <h2 className={`${serif.className} ${GOLD} mt-2 text-center text-[clamp(28px,7.2vw,72px)] font-bold leading-[1.15] tracking-[0.02em]`}>
              KURS MAVZULARI
            </h2>
            <Ornament className="mt-5" />

            <div className="mt-10 flex items-center justify-between px-1 text-[13px] font-semibold text-[#f3d68f]/90">
              <span>{TOPICS.length} ta mavzu</span>
              <span className="flex items-center gap-1">Suring <span className="ik-wiggle">→</span></span>
            </div>
            <ol
              className="-mx-5 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Kurs mavzulari"
            >
              {TOPICS.map((t, i) => (
                <li
                  key={t}
                  className="flex min-h-[210px] w-[78%] max-w-[320px] shrink-0 snap-center flex-col items-center justify-center gap-5 rounded-[28px] border border-[#e6c47c]/60 bg-gradient-to-b from-[#6b0426]/80 to-[#4a0220]/90 p-6 text-center shadow-[0_10px_26px_rgba(0,0,0,.28)] sm:w-[300px]"
                >
                  <span className={`${serif.className} flex h-16 w-16 items-center justify-center rounded-full border border-[#e6c47c]/70 text-[30px] font-bold text-[#f3d68f]`}>
                    {i + 1}
                  </span>
                  <span className={`${serif.className} text-balance text-[21px] font-semibold leading-snug text-[#fbeccb]`}>{t}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex justify-center">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* ============ 5. TARIFLAR ============ */}
        <section id="tariflar" className="scroll-mt-4 px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-[980px]">
            <SectionTitle dark>Kurs tariflari</SectionTitle>
            <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* VIP */}
              <article className="flex flex-col rounded-[28px] border-2 border-[#e6c47c] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] shadow-[0_10px_30px_rgba(74,2,32,.08)] p-6 shadow-[0_16px_40px_rgba(74,2,32,.15)] sm:p-8">
                <span className="w-fit rounded-full bg-[#6b0426] px-4 py-1.5 text-[12px] font-bold tracking-[0.14em] text-white">JONLI FORMAT</span>
                <h3 className={`${serif.className} mt-3 text-[26px] font-bold leading-[1.15] text-[#6b0426] sm:text-[32px]`}>VIP tarifda nimalar bor</h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {VIP.map((t, i) => (
                    <li key={t} className="flex items-start gap-3 text-[16px] leading-snug">
                      <Check />
                      <span className={i === 0 ? "font-bold text-[#6b0426]" : ""}>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <p className="text-center text-[14px] text-[#6b0426]/70">
                    <s>6.990.000 so‘m</s>
                  </p>
                  <p className={`${serif.className} text-center text-[36px] font-bold leading-none text-[#6b0426]`}>
                    699.000 <span className="text-[22px]">so‘m</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setTarif("VIP")}
                    className="mt-5 w-full rounded-full bg-gradient-to-b from-[#7a0a2e] to-[#4a0220] px-6 py-4 text-[16px] font-extrabold uppercase tracking-wide text-[#f3d68f] shadow-[0_5px_0_0_#2a0010] transition-transform active:translate-y-[3px] sm:text-[18px]"
                  >
                    Kursga yozilish
                  </button>
                </div>
              </article>

              {/* PREMIUM */}
              <article className="flex flex-col rounded-[28px] border border-[#6b0426]/20 bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] shadow-[0_10px_30px_rgba(74,2,32,.08)] p-6 sm:p-8">
                <span className="w-fit rounded-full bg-[#6b0426] px-4 py-1.5 text-[12px] font-bold tracking-[0.14em] text-white">YOZIB OLINGAN FORMAT</span>
                <h3 className={`${serif.className} mt-3 text-[26px] font-bold leading-[1.15] text-[#6b0426] sm:text-[32px]`}>Premium tarifda nimalar bor</h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {PREMIUM.map((t, i) => (
                    <li key={t} className="flex items-start gap-3 text-[16px] leading-snug">
                      <Check />
                      <span className={i === 0 ? "font-bold text-[#6b0426]" : ""}>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-2xl bg-[#6b0426] px-4 py-4 text-center text-white">
                  <p className="text-[16px] font-bold sm:text-[18px]">12 ta dars + 30 kunlik qo‘llanma</p>
                  <p className="text-[13px] italic opacity-85">qalb xotirjamligi uchun</p>
                </div>
                <div className="mt-auto pt-7">
                  <p className="text-center text-[14px] text-[#6b0426]/70">
                    <s>3.990.000 so‘m</s>
                  </p>
                  <p className={`${serif.className} text-center text-[36px] font-bold leading-none text-[#6b0426]`}>
                    399.000 <span className="text-[22px]">so‘m</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setTarif("Premium")}
                    className="mt-5 w-full rounded-full bg-gradient-to-b from-[#7a0a2e] to-[#4a0220] px-6 py-4 text-[16px] font-extrabold uppercase tracking-wide text-[#f3d68f] shadow-[0_5px_0_0_#2a0010] transition-transform active:translate-y-[3px] sm:text-[18px]"
                  >
                    Kursga yozilish
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ============ 6. KURS KIMLAR UCHUN ============ */}
        <section className="px-5 pb-14 sm:pb-20">
          <div className="mx-auto max-w-[760px] rounded-[32px] bg-[linear-gradient(160deg,#7a0a2e_0%,#5a0322_55%,#3f0119_100%)] p-6 text-white shadow-[0_20px_50px_rgba(74,2,32,.3)] sm:p-10">
            <h2 className={`${serif.className} ${GOLD} text-center text-[26px] font-bold leading-[1.25] sm:text-[38px]`}>Kurs kimlar uchun?</h2>
            <p className="mt-4 text-center text-[16px] leading-relaxed text-[#fbeccb]">
              «Ichki Uyg‘onish» kursi aynan siz uchun, agar:
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {FOR_WHO.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-2xl border border-[#e6c47c]/30 bg-white/5 p-4 text-[16px] leading-relaxed">
                  <Check light />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 8. NATIJALAR VA OTZIVLAR ============ */}
        <section className="px-5 pb-14 sm:pb-20">
          <div className="mx-auto max-w-[980px]">
            <SectionTitle dark>Natijalar va otzivlar — o‘quvchilarniki</SectionTitle>
            <div className="mt-9 columns-2 gap-3 sm:columns-3 sm:gap-4">
              {REVIEWS.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setZoom(src)}
                  aria-label={`Natija ${i + 1} ni kattalashtirish`}
                  className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-[0_10px_26px_rgba(74,2,32,.18)] sm:mb-4"
                >
                  <Image src={src} alt={`O‘quvchi natijasi ${i + 1}`} width={800} height={1000} sizes="(max-width: 640px) 50vw, 320px" className="h-auto w-full" />
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-[13px] text-[#6b0426]/70">Rasmni bossangiz, to‘liq ko‘rinadi</p>
          </div>
        </section>

        {/* ============ 9. CHEGIRMA + TAYMER ============ */}
        <section className="relative px-5 pb-24 pt-24 text-white sm:pb-32 sm:pt-32" style={DARK_STYLE}>
          <WaveEdge />
          <WaveEdge flip fill="#2f0113" />
          <div className="mx-auto max-w-[760px] text-center">
            <span className="inline-block rounded-full bg-gradient-to-b from-[#f7dd9d] to-[#b78a3d] px-6 py-2 text-[16px] font-extrabold text-[#4a0220] sm:text-[20px]">
              90% CHEGIRMA
            </span>
            <h2 className={`${serif.className} ${GOLD} mt-4 text-[clamp(28px,7vw,64px)] font-bold leading-[1.15] tracking-[0.02em]`}>MAXSUS CHEGIRMA</h2>
            <Ornament className="mt-5" />
            <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-[#fbeccb] sm:text-[17px]">
              Kursga hoziroq yoki 24 soat ichida ro‘yxatdan o‘tib, raqamingizni qoldirsangiz, 90% chegirma amal qiladi.
              Kursning to‘liq narxidan atigi 10% to‘laysiz.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { name: "VIP", old: "6.990.000", now: "699.000" },
                { name: "Premium", old: "3.990.000", now: "399.000" },
              ].map((p) => (
                <div key={p.name} className="rounded-[28px] border border-[#e6c47c]/60 bg-[#fbf3e4] p-6 text-[#4a0220]">
                  <p className={`${serif.className} text-[28px] font-bold leading-none`}>{p.name}</p>
                  <p className="mt-3 text-[15px] opacity-70"><s>{p.old} so‘m</s></p>
                  <p className="mt-2 text-[13px] italic text-[#8a5a3c]">hozir atigi:</p>
                  <p className={`${serif.className} text-[42px] font-bold leading-none text-[#6b0426]`}>{p.now}</p>
                  <p className="text-[16px]">so‘m</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 w-fit rounded-[28px] bg-[#fbf3e4] px-5 py-5 sm:px-8">
              <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-[#6b0426]">Chegirma tugashiga qoldi</p>
              <Timer left={left} />
            </div>

            <div className="mt-8 flex justify-center">
              <CTAButton label="Kursga yozilish" />
            </div>

            <p className={`${serif.className} mt-8 text-balance text-[19px] font-semibold leading-snug text-[#fbeccb] sm:text-[24px]`}>
              Hoziroq imkoniyatdan foydalaning. Siz ham ichki kuchingizni shakllantirib, chiroyli o‘zgarishlarga loyiqsiz ✨
            </p>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="bg-[#2f0113] px-5 py-10 text-[#d9b9c6]">
          <div className="mx-auto flex max-w-[540px] flex-col items-center gap-3 text-center text-[12px] leading-relaxed">
            <p className="font-semibold">“IMAN ACADEMY” MCHJ</p>
            <p>
              This site or product is not part of or endorsed by Facebook, Google, or any social media platform in any way.
              FACEBOOK is a trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
            </p>
            <p>Barcha huquqlar himoyalangan, 2026.</p>
          </div>
        </footer>
      </main>
      {zoom && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-3" onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <button type="button" aria-label="Yopish" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-black">✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="Natija" className="max-h-full max-w-full rounded-xl object-contain" />
        </div>
      )}
      <TariffModal tarif={tarif} onClose={() => setTarif(null)} />
    </>
  );
}