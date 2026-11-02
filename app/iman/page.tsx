"use client";

import Image from "next/image";
import { Anton, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";

const BOT_URL = `https://t.me/+O0gStv0XzjkzODli`;

// public/iman.png
const PERSON_IMG = "/iman.png";

const BENEFITS = [
  "Qo‘rquv va dangasalikni yengib, boshlagan ishingizni oxiriga yetkazishni.",
  "O‘z qobiliyatingizni daromad manbaiga aylantirishni.",
  "Ichki bosimlardan chiqib, o‘zingizga ishonch bilan qaror qabul qilishni o‘rganasiz.",
]; 

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* =========================================================
   BUTTON ARROW (SVG, yozuvga qaragan — o‘ngga)
========================================================= */

function ButtonArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hz-wiggle h-7 w-7 shrink-0 sm:h-9 sm:w-9"
    >
      <path d="M3 12h16" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

/* =========================================================
   CTA BUTTON
========================================================= */

function CTAButton({
  label,
  topLabel,
}: {
  label: string;
  topLabel?: string;
}) {
  return (
    <a
      href={BOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        anton.className,
        "hz-cta relative isolate flex min-h-[78px] w-full max-w-[440px] items-center justify-center overflow-hidden px-3 py-3 sm:min-h-[92px]",
        "rounded-[22px] border-[3px] border-white/80 text-white no-underline",
        "bg-gradient-to-b from-[#ff5fa8] via-[#ec2f8a] to-[#c71268]",
        "leading-none tracking-[0.01em]",
        "shadow-[0_7px_0_0_#9b0b4f,0_14px_34px_rgba(236,47,138,.55)]",
        "transition-transform duration-100 hover:translate-y-[2px] active:translate-y-[5px]",
      ].join(" ")}
    >
      <span className="hz-shine absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 blur-md" />

      <span className="relative z-10 flex items-center justify-center gap-3">
        <ButtonArrow />

        <span className="flex flex-col items-center gap-[6px]">
          {topLabel ? (
            <span className="text-[20px] opacity-90">{topLabel}</span>
          ) : null}
          <span className="text-[20px] sm:text-[35px]">{label}</span>
        </span>
      </span>
    </a>
  );
}

/* =========================================================
   ARROW (tugmaga qaragan, tepaga)
========================================================= */

function UpArrow({ delay = "0s" }: { delay?: string }) {
  return (
    <svg
      viewBox="0 0 48 72"
      aria-hidden="true"
      className="hz-up h-12 w-8 shrink-0 text-[#ec2f8a] drop-shadow-[0_4px_8px_rgba(236,47,138,.35)] sm:h-16 sm:w-11"
      style={{ animationDelay: delay }}
      fill="currentColor"
    >
      <path d="M24 2 L46 28 H32 V70 H16 V28 H2 Z" />
    </svg>
  );
}

/* =========================================================
   TIMER
========================================================= */

function DiscountTimer({ timeLeft }: { timeLeft: number }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <UpArrow />

        <div
          className={`${anton.className} hz-timer rounded-[18px] border-2 border-[#ec2f8a]/30 bg-white/70 px-7 py-3 text-[40px] leading-none tracking-[0.08em] text-[#d6196f] shadow-[0_8px_28px_rgba(236,47,138,.18)] backdrop-blur sm:px-9 sm:py-4 sm:text-[56px]`}
        >
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <UpArrow delay=".25s" />
      </div>

      <p className="mt-3 text-center text-[13px] font-bold uppercase text-[#7a1b4d] sm:text-[15px]">
        <span className="text-[#d6196f]">BIRINCHI QADAMNI QO‘YISH</span>
      </p>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function VSLPage() {
  const [timeLeft, setTimeLeft] = useState<number>(15);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        .hz-wiggle { animation: hzWig 1.3s ease-in-out infinite; }
        @keyframes hzWig {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }

        .hz-up { animation: hzUp 1.1s ease-in-out infinite; }
        @keyframes hzUp {
          0%, 100% { transform: translateY(6px); }
          50% { transform: translateY(-6px); }
        }

        .hz-shine { animation: hzShine 3s ease-in-out infinite; }
        @keyframes hzShine {
          0% { left: -40%; }
          60%, 100% { left: 130%; }
        }

        .hz-hero { animation: hzHero .7s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes hzHero {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hz-glow { animation: hzGlow 3.2s ease-in-out infinite; }
        @keyframes hzGlow {
          0%, 100% { opacity: .55; }
          50% { opacity: .95; }
        }

        .hz-timer { animation: hzTimer 1s ease-in-out infinite; }
        @keyframes hzTimer {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hz-wiggle, .hz-shine, .hz-glow, .hz-hero, .hz-timer, .hz-up {
            animation: none !important;
          }
        }
      `}</style>

      <main
        className={`${montserrat.className} relative min-h-screen w-full overflow-x-hidden text-[#4a0f2e]`}
        style={{
          background:
            "linear-gradient(180deg, #fffafd 0%, #ffeef6 35%, #ffe0ee 70%, #ffd3e7 100%)",
        }}
      >
        {/* BACKGROUND GLOWS */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1100px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,150,200,.22) 0%, rgba(255,190,220,.12) 45%, rgba(255,255,255,0) 75%), radial-gradient(circle at 10% 8%, rgba(255,255,255,.9) 0%, rgba(255,255,255,0) 30%), radial-gradient(circle at 92% 20%, rgba(255,120,180,.12) 0%, rgba(255,120,180,0) 35%)",
          }}
        />

        {/* HERO */}
        <section className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center px-5 pb-10 pt-10 text-center sm:pt-14">
          <div className="hz-hero flex flex-col items-center">
            <p className="inline-flex max-w-[640px] items-center gap-2 rounded-full border border-[#ec2f8a]/30 bg-white/70 px-4 py-2 text-[16px] font-bold leading-snug text-[#b3105f] shadow-[0_6px_20px_rgba(236,47,138,.15)] backdrop-blur sm:text-[12px]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ec2f8a]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ec2f8a]" />
              </span>
              6-7-8 noyabr | soat 20:00 da
            </p>

            <p className="mt-2 text-[13px] font-bold text-[#4a0f2e]">
              Iman Akhmedovadan 3 kunlik BEPUL JONLI DARS
            </p>

            {/* SARLAVHA: o‘qishga oson shrift (Montserrat ExtraBold) */}
            <h1 className="mt-6 max-w-[560px] text-[20px] font-bold leading-[1.22] tracking-[-0.01em] text-[#4a0f2e] [text-wrap:balance] sm:text-[46px] sm:leading-[1.18]">
              Qanday qilib{" "}
              <span className="box-decoration-clone bg-gradient-to-r from-[#ff4f9e] to-[#c71268] bg-clip-text text-[1.12em] text-transparent">
                3 kunda
              </span>{" "}
              qo‘rquv va dangasalikni yengib,{" "}
              <span className="box-decoration-clone bg-gradient-to-r from-[#ff4f9e] to-[#c71268] bg-clip-text text-transparent">
                o‘zingiz istagan hayot sari
              </span>{" "}
              qadam tashlash mumkin?
            </h1>
          </div>

          {/* PHOTO (ramkasiz, kichikroq) */}
          <div className="relative mt-4 w-full max-w-[300px] sm:max-w-[360px]">
            <div
              aria-hidden="true"
              className="hz-glow absolute left-1/2 top-[10%] h-[75%] w-[85%] -translate-x-1/2 rounded-full bg-[#ff9ccb]/40 blur-3xl"
            />

            <Image
              src={PERSON_IMG}
              alt="Iman Akhmedovna"
              width={1276}
              height={1812}
              priority
              sizes="(max-width: 520px) 300px, 360px"
              className="relative z-10 mx-auto h-auto w-full drop-shadow-[0_16px_28px_rgba(180,40,110,.22)]"
            />
          </div>

          {/* CTA 1 */}
          <div className="relative z-20 -mt-10 flex w-full flex-col items-center uppercase sm:-mt-14">
            <CTAButton label="Jonli darsga qo‘shilish" />
            <DiscountTimer timeLeft={timeLeft} />
          </div>
        </section>

        {/* BENEFITS */}
        <section className="relative z-10 mx-auto w-full max-w-[680px] px-5 pb-16">
          <div className="rounded-[32px] border-2 border-white/80 bg-gradient-to-b from-white/90 to-[#fff0f7]/95 p-6 shadow-[0_20px_50px_rgba(236,47,138,.14)] backdrop-blur sm:rounded-[40px] sm:p-9">
            <h3
              className={`${anton.className} text-center text-[26px] uppercase leading-[1.15] text-[#4a0f2e] sm:text-[34px]`}
            >
              ✨ 3 kunlik jonli darslarda siz:
            </h3>

            <ul className="mt-7 flex flex-col gap-3">
              {BENEFITS.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-[20px] border border-[#ec2f8a]/15 bg-white/80 px-4 py-4 shadow-[0_6px_18px_rgba(236,47,138,.08)]"
                >
                  <span className="mt-0.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#ff5fa8] to-[#c71268] text-white shadow-[0_4px_14px_rgba(236,47,138,.45)]">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10.5l4 4 8-9"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <p className="m-0 text-[15px] font-semibold leading-[1.55] text-[#4a0f2e] sm:text-[16px]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            {/* CTA 2 */}
            <div className="mt-6 flex w-full flex-col items-center uppercase">
              <CTAButton label="Jonli darsga qo‘shilish" />
              <DiscountTimer timeLeft={timeLeft} />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 w-full px-5 pb-10 pt-2">
          <div className="mx-auto flex max-w-[540px] flex-col items-center gap-3 text-center text-[12px] leading-relaxed text-[#8a4a6c]">
            <p>“IMAN ACADEMY” MCHJ</p>

            <p>
              This site or product is not part of or endorsed by Facebook,
              Google, or any social media platform in any way. FACEBOOK is a
              trademark of META PLATFORMS, Inc. YOUTUBE and GOOGLE are
              trademarks of ALPHABET, Inc.
            </p>

            <p>Barcha huquqlar himoyalangan, 2026.</p>
          </div>
        </footer>
      </main>
    </>
  );
}