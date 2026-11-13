import { supabase } from "@/lib/supabase";

export type IchkiKuchLead = {
  full_name: string;
  phone_number: string;
  tarif: "VIP" | "Premium";
  source?: string;
};

// URL dan ?source=... yoki ?utm_source=... ni aniqlaydi (default: "a")
export function detectSource(): string {
  if (typeof window === "undefined") return "a";
  try {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("source") || params.get("utm_source");
    return src && src.trim() ? src.trim() : "a";
  } catch {
    return "a";
  }
}

export async function submitIchkiKuchLead(payload: IchkiKuchLead) {
  const { error } = await supabase.from("ichki_kuch_leads").insert([payload]);
  if (error) throw error;
}
