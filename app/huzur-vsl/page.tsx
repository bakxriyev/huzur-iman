"use client";

import Image from "next/image";
import { Anton, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";

const BOT_USERNAME = "iman_ahmedovnaa_bot";
const START_PARAM = "instagram";
const BOT_URL = `https://t.me/${BOT_USERNAME}?start=${START_PARAM}`;

const VIDEO_THUMB = "/vsl_new.png";

const BENEFITS = [
  "Kambag’allikka sabab ichki dunyomi yoki tashqi sabablarmi? Ong ostidagi 3 ta blokni to’g’ri prarobotka qilib boy bo’lish",
  "Qayta - qayta qarzdorlik va kreditdan chiqish uchun eng oson 3 ta yo’lni bilib olish",
  "Moliyaviy erkin, o’ziga ishongan va jamiyatda rivojlangan ayol bo’lishga halaqit berayotgan energiyasizlikdan butkul qutilish sirlari",
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
   PLAY BUTTON
========================================================= */

function PlayButton() {
  return (
    <span className="relative flex h-[84px] w-[84px] items-center justify-center sm:h-[112px] sm:w-[112px]">
      <span className="hz-ring absolute inset-0 rounded-full bg-[#04c3da]/50" />

      <span className="hz-ring hz-ring-2 absolute inset-0 rounded-full bg-[#04c3da]/40" />

      <span className="relative flex h-full w-full items-center justify-center rounded-full border-[3px] border-white/80 bg-gradient-to-b from-[#20dcf0] to-[#0a8a99] shadow-[0_10px_40px_rgba(4,195,218,.55),inset_0_2px_0_rgba(255,255,255,.4)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        <svg
          viewBox="0 0 24 24"
          className="ml-1 h-9 w-9 text-white drop-shadow sm:h-12 sm:w-12"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.9-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" />
        </svg>
      </span>
    </span>
  );
}

/* =========================================================
   CTA BUTTON
========================================================= */

function CTAButton({ label }: { label: string }) {
  return (
    <a
      href={BOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        anton.className,
        "hz-cta relative isolate flex h-[72px] w-full max-w-[420px] items-center justify-center sm:h-[84px]",
        "rounded-[22px] border-[4px] border-[#fff4de] bg-[#ffe5bb] text-[#4a250b] no-underline",
        "text-[26px] leading-none tracking-[-0.01em] sm:text-[32px]",
        "shadow-[0_0_0_2px_#cfa36d,0_7px_0_0_#9f7546,0_10px_26px_rgba(0,0,0,.45)]",
        "transition-transform duration-100 hover:translate-y-[2px] active:translate-y-[5px]",
      ].join(" ")}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {label}

        <span className="hz-wiggle inline-block text-[28px] sm:text-[34px]">
          →
        </span>
      </span>
    </a>
  );
}

/* =========================================================
   TIMER + TIMER YONIDAGI STRELKA
========================================================= */

function DiscountTimer({
  timeLeft,
}: {
  timeLeft: number;
}) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="mt-5 flex w-full flex-col items-center">
      {/* TIMER + STRELKA */}

      <div className="flex items-center justify-center gap-3">
        <div
          className={`${anton.className} hz-timer rounded-[18px] border-2 border-[#ff7a7a]/40 bg-[#ff7a7a]/10 px-7 py-4 text-[42px] leading-none tracking-[0.08em] text-[#ff7a7a] shadow-[0_0_30px_rgba(255,122,122,.15)] sm:px-9 sm:py-5 sm:text-[64px]`}
        >
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>

        {/* TILDA ARROW - O'NGGA QARAGAN */}

        <Image
          src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
          alt="arrow"
          width={82}
          height={82}
          unoptimized
          className="hz-arrow scale-x-[-1] h-auto w-12 shrink-0 brightness-0 saturate-100 invert-[84%] sepia-[18%] saturate-[600%] hue-rotate-[350deg] brightness-[105%] contrast-[103%] sm:w-16"
        />
      </div>

      {/* CHEGIRMA MATNI */}

      <p className="mt-4 text-center text-[14px] font-bold text-white sm:text-[16px]">
        Kursga{" "}
        <span className="text-[#ffe5bb]">
          chegirmali narxda
        </span>{" "}
        ro’yxatdan o’ting
      </p>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function VSLPage() {
  // 15 sekundlik timer
  // Ikkala timer bitta state'dan foydalanadi.

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

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      <style>{`
        /* =====================================================
           PLAY BUTTON RINGS
        ===================================================== */

        .hz-ring {
          animation: hzRing 2.2s ease-out infinite;
        }

        .hz-ring-2 {
          animation-delay: 1.1s;
        }

        @keyframes hzRing {
          0% {
            transform: scale(1);
            opacity: .7;
          }

          100% {
            transform: scale(1.9);
            opacity: 0;
          }
        }

        /* =====================================================
           CTA ICHIDAGI ARROW
        ===================================================== */

        .hz-wiggle {
          animation: hzWig 1.3s ease-in-out infinite;
        }

        @keyframes hzWig {
          0%,
          100% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(6px);
          }
        }

        /* =====================================================
           TIMER YONIDAGI STRELKA
           O'NG TOMONGA HARAKAT
        ===================================================== */

        .hz-arrow {
          animation: hzArrow 1.4s ease-in-out infinite;
        }

        @keyframes hzArrow {
          0%,
          100% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(8px);
          }
        }

        /* =====================================================
           HERO
        ===================================================== */

        .hz-hero {
          animation: hzHero .7s cubic-bezier(.2,.8,.2,1) both;
        }

        @keyframes hzHero {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================================================
           GLOW
        ===================================================== */

        .hz-glow {
          animation: hzGlow 3.2s ease-in-out infinite;
        }

        @keyframes hzGlow {
          0%,
          100% {
            opacity: .55;
          }

          50% {
            opacity: .95;
          }
        }

        /* =====================================================
           TIMER PULSE
        ===================================================== */

        .hz-timer {
          animation: hzTimer 1s ease-in-out infinite;
        }

        @keyframes hzTimer {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.025);
          }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .hz-ring,
          .hz-wiggle,
          .hz-arrow,
          .hz-glow,
          .hz-hero,
          .hz-timer {
            animation: none !important;
          }
        }
      `}</style>

      <main
        className={`${montserrat.className} relative min-h-screen w-full overflow-x-hidden bg-black text-white`}
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[900px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 32%, rgba(4,195,218,.22) 0%, rgba(17,87,95,.10) 45%, rgba(0,0,0,0) 75%)",
          }}
        />

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center px-5 pb-10 pt-12 text-center sm:pt-16">
          <div className="hz-hero flex flex-col items-center">
            <h1
              className={`${anton.className} text-[34px] leading-[.92] tracking-[-0.02em] text-white sm:text-[92px]`}
            >
              BEPUL VIDEO DARSLIK
            </h1>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#04c3da]/40 bg-[#04c3da]/10 px-4 py-2 text-[13px] font-semibold text-[#7eeaf6] sm:text-[14px]">
              <span className="relative flex h-2 w-2">
                <span className="hz-ring absolute inline-flex h-full w-full rounded-full bg-[#20dcf0]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#20dcf0]" />
              </span>

              Iman Akhmedovnadan bepul video darslik
            </p>

            <h2 className="mt-5 max-w-[680px] text-[22px] font-extrabold leading-[1.3] tracking-[-0.01em] text-white sm:text-[32px]">
              Qanday qilib ichki kuchni pul, boylik va sevgiga aylantirish mumkin?
            </h2>
          </div>

          {/* =====================================================
              VIDEO
          ===================================================== */}

          <div className="relative mt-9 w-full">
            <div
              aria-hidden="true"
              className="hz-glow absolute -inset-4 rounded-[44px] bg-[#04c3da]/30 blur-3xl"
            />

            <a
              href={BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Videoni ko‘rish"
              className="group relative block aspect-video w-full overflow-hidden rounded-[24px] border-[3px] border-[#04c3da]/70 bg-[#0a1f22] shadow-[0_20px_70px_rgba(0,0,0,.65)] sm:rounded-[34px]"
            >
              <Image
                src={VIDEO_THUMB}
                alt="Bepul videodars"
                fill
                priority
                sizes="(max-width: 860px) 100vw, 860px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30"
              />

              <span className="absolute inset-0 flex items-center justify-center">
                <PlayButton />
              </span>

              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-left sm:bottom-5 sm:left-6 sm:right-6">
                <span className="rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-bold backdrop-blur sm:text-[13px]">
                  Bepul videodars
                </span>

                <span className="rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-bold backdrop-blur sm:text-[13px]">
                  3 ta texnika
                </span>
              </span>
            </a>
          </div>

          {/* =====================================================
              1-TUGMA + 1-TIMER
          ===================================================== */}

          <div className="mt-8 flex w-full flex-col items-center">
            <CTAButton label="VIDEONI XOZIROQ KO'RISH" />

            <DiscountTimer timeLeft={timeLeft} />
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ===================================================== */}

        <section className="relative z-10 mx-auto w-full max-w-[680px] px-5 pb-16">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-[#0d2a2e] to-[#060d0e] p-6 shadow-[0_20px_60px_rgba(0,0,0,.5)] sm:rounded-[40px] sm:p-9">
            <h3
              className={`${anton.className} text-center text-[30px] leading-[1.05] text-white sm:text-[38px]`}
            >
              Bepul video darsda siz:
            </h3>

            <ul className="mt-7 flex flex-col gap-3">
              {BENEFITS.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-4"
                >
                  <span className="mt-0.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#04c3da] text-[#04252a] shadow-[0_4px_14px_rgba(4,195,218,.4)]">
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

                  <p className="m-0 text-[15px] font-semibold leading-[1.55] text-white/90 sm:text-[16px]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            {/* =================================================
                2-TUGMA + 2-TIMER
            ================================================= */}

            <div className="mt-8 flex w-full flex-col items-center">
              <CTAButton label="VIDEONI KO‘RISH" />

              <DiscountTimer timeLeft={timeLeft} />
            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="relative z-10 w-full px-5 pb-10 pt-2">
          <div className="mx-auto flex max-w-[540px] flex-col items-center gap-3 text-center text-[12px] leading-relaxed text-[#7d7d7d]">
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