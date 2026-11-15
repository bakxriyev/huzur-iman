"use client";

import { useState } from "react";
import TariffModal, { type Tarif } from "@/components/TariffModal";
import { serif } from "@/lib/fonts";
import { Check } from "./ui";

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

export default function TariffSection() {
  const [tarif, setTarif] = useState<Tarif | null>(null);

  return (
    <>
      <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* VIP */}
        <article className="flex flex-col rounded-[28px] border-2 border-[#e6c47c] bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] p-6 shadow-[0_16px_40px_rgba(74,2,32,.15)] sm:p-8">
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
        <article className="flex flex-col rounded-[28px] border border-[#6b0426]/20 bg-[linear-gradient(180deg,#f9efe3_0%,#efdfcd_100%)] p-6 shadow-[0_10px_30px_rgba(74,2,32,.08)] sm:p-8">
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

      <TariffModal tarif={tarif} onClose={() => setTarif(null)} />
    </>
  );
}
