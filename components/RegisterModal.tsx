"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "./PhoneInput";
import { submitLead } from "@/lib/supabaseClient";

const WEBINAR_API_URL = "https://app.webinar-payment.uz/tilda/add-client";
const WEBINAR_SECRET_KEY = "6iROqbwfsOvcNyu"; // TODO: haqiqiy secret keyni shu yerga qo'ying

async function sendToWebinarApi(name: string, phone: string) {
  const res = await fetch(WEBINAR_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      TARIF: "HUZUR5",
      secret_key: WEBINAR_SECRET_KEY,
    }),
  });

  if (!res.ok) {
    throw new Error(`Webinar API xatosi: ${res.status}`);
  }

  return res.json().catch(() => null);
}

export default function RegisterModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Ismingizni to'liq kiriting");
      return;
    }
    if (phone.replace(/\D/g, "").length < 9) {
      setError("Telefon raqamingizni to'liq kiriting");
      return;
    }

    setLoading(true);
    try {
      const trimmedName = name.trim();

      // Ikkalasini ham parallel yuboramiz.
      // Biri xato bersa ham, foydalanuvchi tajribasi to'xtab qolmasin uchun
      // allSettled ishlatamiz — keyin xatolarni faqat konsolga yozib qo'yamiz.
      const results = await Promise.allSettled([
        submitLead({ full_name: trimmedName, phone_number: phone }),
        sendToWebinarApi(trimmedName, phone),
      ]);

      results.forEach((result, i) => {
        if (result.status === "rejected") {
          const source = i === 0 ? "Supabase" : "Webinar API";
          console.error(`${source} yuborishda xatolik:`, result.reason);
        }
      });

      // Agar ikkalasi ham muvaffaqiyatsiz bo'lsa — foydalanuvchiga xabar beramiz
      const allFailed = results.every((r) => r.status === "rejected");
      if (allFailed) {
        throw new Error("Ikkala manzilga ham yuborib bo'lmadi");
      }

      router.push("https://t.me/iman_ahmedovnaa_bot?start=vsl");
    } catch (err) {
      console.error(err);
      setError("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-[20px] sm:rounded-[30px] bg-white p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white text-lg"
        >
          ✕
        </button>

        <h3 className="text-center text-[22px] sm:text-[26px] font-bold text-black mb-6">
          Davom etish uchun ma&apos;lumotlaringizni kiriting
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[14px] text-black mb-1.5">
              Ismingiz
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-[5px] border border-[#c9c9c9] px-3 py-3 text-[15px] text-black outline-none"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-[14px] text-black mb-1.5">
              Telefon raqamingiz
            </label>
            <PhoneInput value={phone} onChange={setPhone} />
          </div>

          {error && (
            <p className="text-[13px] text-red-600 -mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-[15px] bg-[#fed8a8] py-4 text-center text-[15px] font-bold uppercase tracking-wide text-[#482b02] transition hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Yuborilmoqda..." : "Davom etish"}
          </button>
        </form>
      </div>
    </div>
  );
}