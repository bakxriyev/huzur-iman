import Image from "next/image";
import { serif, sans } from "@/lib/fonts";
import { Check, Ornament, SectionTitle, WaveEdge, GOLD, DARK_STYLE, LIGHT_BG } from "@/components/ichki-kuch/ui";
import CTAButton from "@/components/ichki-kuch/CTAButton";
import DiscountTimer from "@/components/ichki-kuch/DiscountTimer";
import ReviewsCarousel from "@/components/ichki-kuch/ReviewsCarousel";
import TariffSection from "@/components/ichki-kuch/TariffSection";

const PERSON_IMG = "/iman.webp"; // public/iman.webp

/** O‘quvchilar natijalari/otzivlari: rasmlarni public/ papkaga qo‘yib, shu yerga yozing.
 *  Masalan: ["/otziv-1.jpg", "/otziv-2.jpg"]. Bo‘sh bo‘lsa, joy ushlagichlar ko‘rinadi. */
const REVIEWS: { src: string; width: number; height: number }[] = [
  { src: "/natijalar/natija-1.webp", width: 700, height: 1176 },
  { src: "/natijalar/natija-2.webp", width: 700, height: 1245 },
  { src: "/natijalar/natija-3.webp", width: 700, height: 525 },
  { src: "/natijalar/natija-4.webp", width: 700, height: 903 },
  { src: "/natijalar/natija-5.webp", width: 700, height: 699 },
  { src: "/natijalar/natija-6.webp", width: 700, height: 853 },
  { src: "/natijalar/natija-7.webp", width: 700, height: 930 },
];

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

const FOR_WHO = [
  "O‘tmishdagi hafagarchiliklar, og‘riqlar va ichki ranjishlardan xalos bo‘lishni istasangiz.",
  "O‘zingizni qadrlash, ichki ishonch va xotirjamlikni qayta tiklashni xohlasangiz.",
  "Hayotingizda baraka, yangi boshlanish va orzularingizga ishonch bilan erishishni istasangiz.",
  "Qarzdorlik, kreditlardan xalos bo‘lib, moliyaviy erkinlikka erishishni istasangiz.",
  "Er-xotin munosabatlarini yanada yaxshilash, qadrli va suyukli rafiqa bo‘lishni xohlasangiz. Shuningdek, turmushga tayyorlanish istagidagilar uchun ham mos.",
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

/* ---------- Sahifa (Server Component — faqat kerakli qismlar klient tomonda gidratsiya qilinadi) ---------- */

export default function VSLPage() {
  return (
    <>
      <style>{`
        .ik-wiggle { animation: ikWig 1.3s ease-in-out infinite; }
        @keyframes ikWig { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
        .ik-shine { animation: ikShine 3.2s ease-in-out infinite; }
        @keyframes ikShine { 0% { translate: 0 0; } 60%,100% { translate: 520% 0; } }
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

            {/* Kichik shriftdagi qator */}
            <p className="mt-4 max-w-[480px] text-[12px] font-semibold uppercase leading-snug tracking-wide text-[#fbeccb] sm:text-[14px]">
              45 kun Iman Akhmedova bilan birga jonli dars
            </p>

            {/* Asosiy (glavniy) gap */}
            <h1 className={`${serif.className} ${GOLD} mt-5 text-balance text-[clamp(30px,8.2vw,64px)] font-bold leading-[1.18]`}>
              Qanday qilib minnatdorchilik orqali qalb xotirjamligiga erishish mumkin?
            </h1>

            <div className="relative mt-8 w-full max-w-[300px] sm:max-w-[360px]">
              <div aria-hidden="true" className="ik-glow absolute left-1/2 top-[10%] h-[75%] w-[85%] -translate-x-1/2 rounded-full bg-[#ff9ccb]/40 blur-3xl" />
              <Image
                src={PERSON_IMG}
                alt="Iman Akhmedova"
                width={760}
                height={1079}
                preload
                fetchPriority="high"
                sizes="(max-width: 520px) 300px, 360px"
                className="relative z-10 mx-auto h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,.45)]"
              />
            </div>

            <div className="relative z-20 -mt-6 flex w-full justify-center sm:-mt-10">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* ============ 2. KURS KIMLAR UCHUN (rasmdan keyin) ============ */}
        <section className="px-5 py-14 sm:py-20">
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

        {/* ============ 3. KURSDA SIZNI NIMALAR KUTYAPTI ============ */}
        <section className="px-5 pb-14 sm:pb-20">
          <div className="mx-auto max-w-[980px]">
            <SectionTitle dark>Kursda sizni nimalar kutyapti:</SectionTitle>
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS.map((s) => (
                <div key={s.big} className="rounded-[28px] border border-[#e6c47c]/60 bg-[linear-gradient(160deg,#7a0a2e_0%,#5a0322_55%,#3f0119_100%)] p-6 text-center shadow-[0_14px_34px_rgba(74,2,32,.25)] sm:p-8">
                  <div className={`${serif.className} ${GOLD} text-[32px] font-bold leading-[1.15] sm:text-[42px]`}>{s.big}</div>
                  <p className="mx-auto mt-3 max-w-[320px] text-[15px] font-medium leading-relaxed text-[#fbeccb]">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <CTAButton label="Darsga qo‘shilish" dark />
            </div>
          </div>
        </section>

        {/* ============ 4. BONUS VA HADYALAR ============ */}
        <section className="px-5 pb-14 sm:pb-20">
          <div className="mx-auto max-w-[860px]">
            <div className="rounded-[28px] border-2 border-[#e6c47c] bg-[#fbf3e4] p-6 text-center sm:p-9">
              <p className="text-[34px]" aria-hidden="true">🎁</p>
              <h2 className={`${serif.className} text-balance text-[22px] font-bold leading-[1.3] text-[#6b0426] sm:text-[32px]`}>
                «Ichki uyg‘onish» kursiga yozilib, naqd{" "}
                <span className="whitespace-nowrap rounded-xl bg-[#6b0426] px-3 py-0.5 text-[1.15em] font-extrabold text-[#f3d68f]">3 000 000</span>{" "}
                so‘mlik 2 ta eng kuchli kurslarni <span className="text-[#b8893a]">BEPUL</span> qo‘lga kiriting
              </h2>
            </div>

            <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] p-6 shadow-[0_10px_30px_rgba(74,2,32,.08)] sm:p-9">
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
              <CTAButton dark />
            </div>
          </div>
        </section>

        {/* ============ 5. YOZILMASANGIZ NIMALAR YOQOTASIZ ============ */}
        <section className="px-5 pb-12 sm:pb-16">
          <div className="mx-auto max-w-[860px] rounded-[28px] border-2 border-[#e6c47c] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] p-6 shadow-[0_10px_30px_rgba(74,2,32,.08)] sm:p-9">
            <h2 className={`${serif.className} text-balance text-center text-[24px] font-bold leading-[1.25] text-[#6b0426] sm:text-[34px]`}>
              «Ichki uyg‘onish» kursiga yozilmasangiz, nimalar yoqotasiz?
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

        {/* ============ 6. NATIJALAR VA OTZIVLAR ============ */}
        <section className="px-5 pb-14 sm:pb-20">
          <div className="mx-auto max-w-[980px]">
            <SectionTitle dark>Natijalar va otzivlar — o‘quvchilarniki</SectionTitle>
            <ReviewsCarousel reviews={REVIEWS} />
          </div>
        </section>

        {/* ============ 6. KURS MAVZULARI ============ */}
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

        {/* ============ 7. MAXSUS CHEGIRMA + TAYMER (kurs mavzularidan keyin) ============ */}
        <section className="relative px-5 pb-24 pt-24 text-white sm:pb-32 sm:pt-32" style={DARK_STYLE}>
          <WaveEdge />
          <WaveEdge flip />
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

            <DiscountTimer />

            <div className="mt-8 flex justify-center">
              <CTAButton label="Kursga yozilish" />
            </div>

            <p className={`${serif.className} mt-8 text-balance text-[19px] font-semibold leading-snug text-[#fbeccb] sm:text-[24px]`}>
              Hoziroq imkoniyatdan foydalaning. Siz ham ichki uyg‘onish orqali chiroyli o‘zgarishlarga loyiqsiz ✨
            </p>
          </div>
        </section>

        {/* ============ 8. TARIFLAR ============ */}
        <section id="tariflar" className="scroll-mt-4 px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-[980px]">
            <SectionTitle dark>Kurs tariflari</SectionTitle>
            <TariffSection />
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
    </>
  );
}
