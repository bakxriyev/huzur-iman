"use client";

import { useState } from "react";
import PhoneInput from "./PhoneInput";
import { submitIchkiKuchLead, detectSource } from "@/lib/ichkiKuch";

export type Tarif = "VIP" | "Premium";

const ADMINS: Record<Tarif, string> = {
  VIP: "iimaan_admin2",
  Premium: "iimaan_admin3",
};

export default function TariffModal({
  tarif,
  onClose,
}: {
  tarif: Tarif | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!tarif) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tarif) return;
    setError("");

    const fullName = name.trim();
    if (fullName.length < 2) {
      setError("Ism va familiyangizni to‘liq kiriting");
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setError("Telefon raqamingizni to‘liq kiriting");
      return;
    }

    setLoading(true);
    try {
      await submitIchkiKuchLead({
        full_name: fullName,
        phone_number: phone,
        tarif,
        source: detectSource(),
      });
    } catch (err) {
      // Supabase xato bersa ham foydalanuvchini adminga yo‘naltiramiz
      console.error("Supabase yuborishda xatolik:", err);
    }

    const text =
      `Assalomu alaykum! Men ${fullName}. ` +
      `«Ichki kuch» kursiga ${tarif} tarifi bo‘yicha yozilmoqchiman.\n` +
      `Telefon raqamim: ${phone}`;
    const url = `https://t.me/${ADMINS[tarif]}?text=${encodeURIComponent(text)}`;
    window.location.href = url;
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-[460px] rounded-[26px] border-2 border-[#e6c47c] bg-[#fbf3e4] p-6 text-[#3b0a1f] sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#6b0426] text-lg text-white"
        >
          ✕
        </button>

        <span className="rounded-full bg-[#6b0426] px-4 py-1.5 text-[12px] font-bold tracking-[0.14em] text-white">
          {tarif.toUpperCase()} TARIF
        </span>
        <h3 className="mb-6 mt-4 text-[22px] font-bold leading-tight text-[#6b0426] sm:text-[26px]">
          Ma‘lumotlaringizni kiriting
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[14px]">Ism va familiya</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-[8px] border border-[#c9c9c9] bg-white px-3 py-3 text-[15px] text-black outline-none focus:border-[#6b0426]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[14px]">Telefon raqamingiz</label>
            <PhoneInput value={phone} onChange={setPhone} />
          </div>

          {error && <p className="-mt-1 text-[13px] text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-gradient-to-b from-[#fbe6aa] via-[#e2b865] to-[#a97a30] py-4 text-[16px] font-extrabold uppercase tracking-wide text-[#3f0119] shadow-[0_5px_0_0_#6f4d16] transition active:translate-y-[3px] disabled:opacity-60"
          >
            {loading ? "Yuborilmoqda..." : "Menejer bilan bog'lanish"}
          </button>
          <p className="text-center text-[12px] text-[#6b0426]/70">
            Tugmani bosgach, Telegramda admin bilan chat ochiladi
          </p>
        </form>
      </div>
    </div>
  );
}
