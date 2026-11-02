// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Anton, Montserrat } from "next/font/google";

// RegisterModal foydalanuvchi tugmani bosgandagina kerak bo'ladi.
// Shuning uchun boshlang'ich JS bundle'ga qo'shilmaydi.
const RegisterModal = dynamic(() => import("@/components/RegisterModal"), {
    ssr: false,
});

/* ────────────────────────────────────────────────────────────────
   SHRIFTLAR
──────────────────────────────────────────────────────────────── */

const anton = Anton({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

/* ────────────────────────────────────────────────────────────────
   RASMLAR
──────────────────────────────────────────────────────────────── */

const IMG = {
    heroBg:
        "https://optim.tildacdn.net/tild3333-6431-4730-b338-373639643137/-/resize/400x/-/format/webp/Supermiya_AI_4_1.png.webp",

    heroDecor:
        "https://static.tildacdn.net/tild3066-3838-4333-a439-363239666466/Supermiya_AI_6.png",

    card1: "/h1.png",

    card2: "/h2.png",

    card2Badge: "/h3.png",

    card3: "/h4.png",

    mentor: "/opa.png",

    bonus: "/8ta.jpg",

    bonusImg:
        "https://static.tildacdn.net/tild6436-3137-4230-a465-306163366536/Group_121-min.png",
};

/* ────────────────────────────────────────────────────────────────
   REGISTER
──────────────────────────────────────────────────────────────── */

const REGISTER_LINK = "Kursga chegirmali narxda ro’yhatdan o’ting";

/* ────────────────────────────────────────────────────────────────
   REGISTER BUTTON
──────────────────────────────────────────────────────────────── */

function RegisterButton({ className = "" }: { className?: string }) {
    return (
        <button
            type="button"
            className={[
                "group relative isolate overflow-visible",

                "w-[min(460px,88vw)] h-[102px] sm:h-[116px]",

                "rounded-[23px] sm:rounded-[27px]",

                "bg-[#ffe5bb] text-[#4a250b]",

                "border-[4px] border-[#fff4de]",

                "shadow-[0_0_0_2px_#cfa36d,0_7px_0_0_#9f7546,0_9px_22px_rgba(0,0,0,.35)]",

                "transition-transform active:translate-y-[2px]",

                className,
            ].join(" ")}
        >
            {/* Chap dekorativ chiqish */}
            <span
                aria-hidden="true"
                className="absolute left-[-17px] top-1/2 h-[32px] w-[32px] -translate-y-1/2 rotate-45 rounded-bl-[5px] border-b-[4px] border-l-[4px] border-[#fff4de] bg-[#ffe5bb]"
            />

            {/* O'ng dekorativ chiqish */}
            <span
                aria-hidden="true"
                className="absolute right-[-17px] top-1/2 h-[32px] w-[32px] -translate-y-1/2 -rotate-45 rounded-bl-[5px] border-b-[4px] border-l-[4px] border-[#fff4de] bg-[#ffe5bb]"
            />

            <span
                className={`${anton.className} relative z-10 block text-[31px] leading-none tracking-[-0.02em] sm:text-[38px]`}
            >
                RO’YXATDAN O’TISH
            </span>
        </button>
    );
}

/* ────────────────────────────────────────────────────────────────
   REGISTER LINK
──────────────────────────────────────────────────────────────── */

function RegisterLink() {
    return (
        <p
            className={`${montserrat.className} mt-6 flex items-center justify-center gap-2 text-[14px] font-medium text-white sm:text-[17px]`}
        >
            {REGISTER_LINK}

            <img
    src="https://optim.tildacdn.one/tild6264-6337-4463-b934-656161336537/-/resize/164x/-/format/webp/Arrow_2.png.webp"
    alt="arrow"
    className="w-12 scale-x-[-1] brightness-0 saturate-100 invert-[87%] sepia-[18%] saturate-[600%] hue-rotate-[350deg] brightness-[105%] contrast-[105%] transition-transform duration-300 hover:translate-x-2"
/>
        </p>
    );
}

/* ────────────────────────────────────────────────────────────────
   MENTOR MA'LUMOTLARI
──────────────────────────────────────────────────────────────── */

const MENTOR_BULLETS = [
    "Oilaviy munosabatlar va bolalar psixologi",

    "Prezidentimiz tomonidan taqdirlandan 30 yillik koʻkrak nishoni sohibasi",

    "PHD mustaqil izlanuvchisi",

    "Psixologlar assotsasiyasi a’zosi",

    "4 yil ichida 50,000 tadan ortiq o'quvchilarimga shaxsiy rivojlanishga yordam bergan",
];

/* ────────────────────────────────────────────────────────────────
   ASOSIY SAHIFA
──────────────────────────────────────────────────────────────── */

export default function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);

    /*
      2 daqiqalik timer
      120 sekund = 02:00
    */
    const [timeLeft, setTimeLeft] = useState<number>(20);

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

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const openModal = () => {
        setModalOpen(true);
    };

    return (
        <main className="w-full overflow-x-hidden bg-black">
            {/* ═══════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════ */}

            <section
                className="relative min-h-screen w-full bg-black bg-cover bg-center"
                style={{
                    backgroundImage: `url(${IMG.heroBg})`,
                }}
            >
                {/* Soft glow */}

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-45"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 42%, rgba(76,171,175,.28) 0%, rgba(0,0,0,0) 48%)",
                    }}
                />

                <div className="relative z-10 mx-auto flex w-full max-w-[680px] flex-col items-center px-5 pb-16 pt-[66px] text-center">
                    {/* ─────────────────────────────
                        TITLE
                    ───────────────────────────── */}

                    <h1
                        className={`${montserrat.className} mt-2 text-center text-white`}
                    >
                        <span
                            className={`${anton.className} -mt-12 block text-[64px] leading-[0.9] tracking-[-0.02em] sm:text-[92px]`}
                        >
                            HUZUR
                        </span>

                        <span
                            className="mt-4 block text-[25px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[38px]"
                        >
                            professional psixologik kurs
                        </span>
                    </h1>

                    {/* ─────────────────────────────
                        DESCRIPTION
                    ───────────────────────────── */}

                    <p
                        className={`${montserrat.className} mt-6 max-w-[590px] text-[15px] font-medium leading-[1.55] tracking-[-0.02em] text-white sm:text-[23px]`}
                    >
                        8 xaftada ong osti dasturlari haqida o’rganib,
                        <br />
                        istalgan muammoni ildizini to’g’ri prarobotka qilib
                        <br />
                        huzurda yashaysiz
                    </p>

                    {/* ─────────────────────────────
                        MENTOR IMAGE
                    ───────────────────────────── */}

                    <div className="relative mt-[-2px] flex w-full justify-center">
                        <img
                            src={IMG.mentor}
                            alt="Mentor"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="relative z-10 w-[355px] max-w-[82vw] select-none sm:w-[390px]"
                        />
                    </div>

                    {/* ─────────────────────────────
                        REGISTER + TIMER
                    ───────────────────────────── */}

                    <div
                        onClick={openModal}
                        className="relative z-30 mt-[-50px] flex cursor-pointer flex-col items-center"
                    >
                        <RegisterButton />

                        <RegisterLink />

                        {/* ═══════════════════════════════════════
                            2 DAQIQALIK TIMER
                        ═══════════════════════════════════════ */}

                        <div className="mt-2 flex flex-col items-center">
                            <div
                                className={`${anton.className} rounded-[18px] border-2 border-[#ff7a7a]/50 bg-[#ff7a7a]/10 px-7 py-4 text-[48px] leading-none tracking-[0.08em] text-[#ff7a7a] shadow-[0_0_30px_rgba(255,122,122,.18)] sm:px-9 sm:py-5 sm:text-[64px]`}
                            >
                                {String(minutes).padStart(2, "0")}:
                                {String(seconds).padStart(2, "0")}
                            </div>

                            <p
                                className={`${montserrat.className} mt-3 text-center text-[12px] font-semibold text-white/70 sm:text-[14px]`}
                            >
                                Chegirma tugashiga qolgan vaqt
                            </p>
                        </div>
                    </div>

                    {/* ─────────────────────────────
                        HEADLINE
                    ───────────────────────────── */}

                    <h2
                        className={`${montserrat.className} mt-10 max-w-[620px] text-center text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[42px]`}
                    >
                        Joyingizni band qilib,
                        <br />
                        <span className="font-bold text-[#ffe5bb]">
                            qo‘lga kiritasiz!
                        </span>
                    </h2>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                FEATURE CARDS
            ═══════════════════════════════════════════════════════ */}

            <section className="w-full bg-black pb-4">
                <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-5 pb-6 md:grid-cols-3">
                    {/* CARD 1 */}

                    <div className="flex flex-col items-center rounded-[30px] bg-white p-6 text-center sm:rounded-[40px] sm:p-8">
                        <img
                            src={IMG.card1}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="mb-5 w-full max-w-[245px]"
                        />

                        <p
                            className={`${montserrat.className} text-[15px] font-medium leading-snug text-black sm:text-[18px]`}
                        >
                            <strong>
                                Psihologik professional ilmlarni eng qisqa va
                                eng arzon narhga o’rganish
                            </strong>
                        </p>
                    </div>

                    {/* CARD 2 */}

                    <div className="flex flex-col items-center rounded-[30px] bg-white p-6 text-center sm:rounded-[40px] sm:p-8">
                        <div className="relative mb-5 w-full max-w-[267px]">
                            <img
                                src={IMG.card2}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="w-full"
                            />
                        </div>

                        <p
                            className={`${montserrat.className} text-[15px] font-medium leading-snug text-black sm:text-[18px]`}
                        >
                            <strong>
                                Ong osti blokini to’g’ri prarobotka qilish orqali muammolar yechimini oson, yengil va tez topish sirlari
                            </strong>
                        </p>
                    </div>

                    {/* CARD 3 */}

                    <div className="flex flex-col items-center rounded-[30px] bg-white p-6 text-center sm:rounded-[40px] sm:p-8">
                        <div className="relative mb-5 w-full max-w-[267px]">
                            <img
                                src={IMG.card3}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="w-full"
                            />
                        </div>

                        <p
                            className={`${montserrat.className} text-[15px] font-medium leading-snug text-black sm:text-[18px]`}
                        >
                            Qarz, kreditlardan chiqish, orzu maqsadlarga
                            erishish, ibodatlarda mustahkam bo'lish va duolar
                            ijobati uchun qo'llanma va materiallar
                        </p>
                    </div>

                    {/* CARD 4 */}

                    <div
                        className="flex flex-col items-center rounded-[30px] p-6 text-center sm:rounded-[40px] sm:p-8"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at center, rgba(4,195,218,1) 0%, rgba(17,87,95,1) 100%)",
                        }}
                    >
                        <img
                            src={IMG.card2Badge}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="mb-5 w-full max-w-[278px]"
                        />

                        <p
                            className={`${montserrat.className} text-[15px] font-medium leading-snug text-white sm:text-[18px]`}
                        >
                            Ong osti bloklari va dasturlar haqida o’rganib,
                            istalgan insonni ichki va tashqi muammolarini
                            yechishni eng professional metodikalarini o’rganasiz
                        </p>
                    </div>
                </div>

                {/* ─────────────────────────────
                    BONUS
                ───────────────────────────── */}

                <div className="mx-auto max-w-[1200px] px-5 pb-10">
                    <div className="flex flex-col items-center gap-6 rounded-[30px] border border-[#1c1c1c] bg-[#0b0b0b] p-6 sm:rounded-[40px] sm:p-10 md:flex-row">
                        <img
                            src={IMG.bonus}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full max-w-[460px]"
                        />

                        <p
                            className={`${montserrat.className} text-center text-[16px] font-medium text-white sm:text-[19px] md:text-left`}
                        >
                            HUZUR kursiga yozilsangiz, 8 mln qiymatga ega,
                            4 ta KURS BONUSGA BEPUL BERILADI🎁
                        </p>
                    </div>
                </div>

                {/* ─────────────────────────────
                    SECOND CTA
                ───────────────────────────── */}

                <div
                    onClick={openModal}
                    className="flex cursor-pointer flex-col items-center pb-16"
                >
                    <RegisterButton />

                    <RegisterLink />

                    {/* Ikkinchi CTA ostida ham timer */}

                    <div className="mt-4 flex flex-col items-center">


                        <div
                            className={`${anton.className} rounded-[18px] border-2 border-[#ff7a7a]/50 bg-[#ff7a7a]/10 px-7 py-4 text-[44px] leading-none tracking-[0.08em] text-[#ff7a7a] shadow-[0_0_30px_rgba(255,122,122,.18)] sm:px-9 sm:py-5 sm:text-[58px]`}
                        >
                            {String(minutes).padStart(2, "0")}:
                            {String(seconds).padStart(2, "0")}
                        </div>

                        <p
                            className={`${montserrat.className} mt-3 text-center text-[12px] font-semibold text-white/70 sm:text-[14px]`}
                        >
                            Chegirma tugashiga qolgan vaqt
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                MENTOR
            ═══════════════════════════════════════════════════════ */}

            <section className="w-full bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-[1000px] px-5">
                    <div
                        className="grid grid-cols-1 items-center gap-8 rounded-[30px] p-6 sm:rounded-[50px] sm:p-10 lg:grid-cols-2"
                        style={{
                            backgroundImage:
                                "linear-gradient(0deg, rgba(17,87,95,1) 0%, rgba(0,0,0,1) 100%)",
                        }}
                    >
                        <img
                            src={IMG.mentor}
                            alt="Mentor"
                            loading="lazy"
                            decoding="async"
                            className="mx-auto w-full max-w-[320px] rounded-[30px] border border-white/60 sm:rounded-[40px]"
                        />

                        <div>
                            <h3
                                className={`${montserrat.className} mb-2 text-[26px] font-bold text-white sm:text-[34px]`}
                            >
                                Iman Akhmedovna
                            </h3>

                            <a
                                href="https://t.me/iiman_admin_huzur"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${montserrat.className} mb-6 block text-[20px] font-bold text-white sm:text-[22px]`}
                            >
                                @iiman_admin_huzur
                            </a>

                            <ul className="flex flex-col gap-3">
                                {MENTOR_BULLETS.map((b) => (
                                    <li
                                        key={b}
                                        className={`${montserrat.className} flex items-start gap-3 rounded-[15px] border border-white/30 px-4 py-4 text-[14px] leading-snug text-white sm:text-[16px]`}
                                    >
                                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />

                                        {b}
                                    </li>
                                ))}
                            </ul>

                            <div
                                onClick={openModal}
                                className="mt-8 flex cursor-pointer flex-col items-center"
                            >
                                <RegisterButton />

                                <RegisterLink />

                                <div className="mt-8 flex flex-col items-center">

                                    <div
                                        className={`${anton.className} rounded-[18px] border-2 border-[#ff7a7a]/50 bg-[#ff7a7a]/10 px-7 py-4 text-[44px] leading-none tracking-[0.08em] text-[#ff7a7a] shadow-[0_0_30px_rgba(255,122,122,.18)] sm:px-9 sm:py-5 sm:text-[58px]`}
                                    >
                                        {String(minutes).padStart(2, "0")}:
                                        {String(seconds).padStart(2, "0")}
                                    </div>

                                    <p
                                        className={`${montserrat.className} mt-3 text-center text-[12px] font-semibold text-white/70 sm:text-[14px]`}
                                    >
                                        Chegirma tugashiga qolgan vaqt
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════ */}

            <footer className="w-full bg-black py-10">
                <div className="mx-auto flex max-w-[900px] flex-col items-center gap-3 px-5 text-center">
                    <p
                        className={`${montserrat.className} text-[20px] font-medium text-white sm:text-[22px]`}
                    >
                        Iman Akhmedovna
                    </p>

                    <a
                        href="tel:998781139090"
                        className={`${montserrat.className} text-[20px] font-bold text-white sm:text-[22px]`}
                    >
                        @iiman_admin_huzur
                    </a>

                    <p
                        className={`${montserrat.className} max-w-[540px] text-[12px] leading-relaxed text-[#7d7d7d]`}
                    >
                        "IMAN ACADEMY" MCHJ
                    </p>

                    <p
                        className={`${montserrat.className} max-w-[500px] text-[12px] leading-relaxed text-[#7d7d7d]`}
                    >
                        This site or product is not part of or endorsed by
                        Facebook, Google, or any social media platform in any
                        way. FACEBOOK is a trademark of META PLATFORMS, Inc.
                        YOUTUBE and GOOGLE are trademarks of ALPHABET, Inc.
                    </p>

                    <p
                        className={`${montserrat.className} mt-2 text-[12px] text-[#7d7d7d]`}
                    >
                        Barcha huquqlar himoyalangan, 2026.
                    </p>
                </div>
            </footer>

            {/* ═══════════════════════════════════════════════════════
                REGISTER MODAL
            ═══════════════════════════════════════════════════════ */}

            {modalOpen && (
                <RegisterModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </main>
    );
}
