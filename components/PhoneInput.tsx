"use client";

import { useState, useRef, useEffect } from "react";

export type Country = {
  iso: string;
  name: string;
  dialCode: string;
  flag: string; // emoji flag
  placeholder: string;
};

// 15 countries — Uzbekistan default, plus the most common neighbouring /
// international codes so users abroad can register too.
export const COUNTRIES: Country[] = [
  { iso: "uz", name: "O'zbekiston", dialCode: "+998", flag: "🇺🇿", placeholder: "90 123 45 67" },
  { iso: "ru", name: "Rossiya", dialCode: "+7", flag: "🇷🇺", placeholder: "912 345 67 89" },
  { iso: "kz", name: "Qozog'iston", dialCode: "+7", flag: "🇰🇿", placeholder: "701 234 56 78" },
  { iso: "kg", name: "Qirg'iziston", dialCode: "+996", flag: "🇰🇬", placeholder: "700 123 456" },
  { iso: "tj", name: "Tojikiston", dialCode: "+992", flag: "🇹🇯", placeholder: "900 123 456" },
  { iso: "tm", name: "Turkmaniston", dialCode: "+993", flag: "🇹🇲", placeholder: "65 123456" },
  { iso: "az", name: "Ozarbayjon", dialCode: "+994", flag: "🇦🇿", placeholder: "50 123 45 67" },
  { iso: "tr", name: "Turkiya", dialCode: "+90", flag: "🇹🇷", placeholder: "501 234 56 78" },
  { iso: "ae", name: "BAA", dialCode: "+971", flag: "🇦🇪", placeholder: "50 123 4567" },
  { iso: "sa", name: "Saudiya Arabistoni", dialCode: "+966", flag: "🇸🇦", placeholder: "50 123 4567" },
  { iso: "ua", name: "Ukraina", dialCode: "+380", flag: "🇺🇦", placeholder: "50 123 4567" },
  { iso: "us", name: "AQSH", dialCode: "+1", flag: "🇺🇸", placeholder: "201 555 0123" },
  { iso: "gb", name: "Buyuk Britaniya", dialCode: "+44", flag: "🇬🇧", placeholder: "7400 123456" },
  { iso: "de", name: "Germaniya", dialCode: "+49", flag: "🇩🇪", placeholder: "151 23456789" },
  { iso: "in", name: "Hindiston", dialCode: "+91", flag: "🇮🇳", placeholder: "98765 43210" },
];

export default function PhoneInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (fullPhone: string) => void;
}) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [localNumber, setLocalNumber] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(`${country.dialCode}${localNumber}`.replace(/\s+/g, ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, localNumber]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative flex items-stretch rounded-[5px] border border-[#c9c9c9] bg-white overflow-visible"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-3 text-[15px] text-black shrink-0 border-r border-[#e5e5e5]"
      >
        <span>{country.flag}</span>
        <span className="text-[13px] text-[#555]">{country.dialCode}</span>
        <span className="text-[9px] text-[#999] mt-0.5">▾</span>
      </button>
      <input
        type="tel"
        inputMode="numeric"
        value={localNumber}
        onChange={(e) => setLocalNumber(e.target.value.replace(/[^\d\s]/g, ""))}
        placeholder={country.placeholder}
        className="flex-1 min-w-0 px-3 py-3 text-[15px] text-black outline-none rounded-r-[5px]"
        required
      />

      {open && (
        <div className="absolute z-50 top-[calc(100%+6px)] left-0 w-[280px] max-h-[240px] overflow-y-auto bg-white border border-[#eee] rounded-[10px] shadow-lg py-1">
          {COUNTRIES.map((c) => (
            <button
              type="button"
              key={c.iso}
              onClick={() => {
                setCountry(c);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-[14px] text-black hover:bg-[#f2f2f2]"
            >
              <span className="flex items-center gap-2">
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </span>
              <span className="text-[#777]">{c.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}