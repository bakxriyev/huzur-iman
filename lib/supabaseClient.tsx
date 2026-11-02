import { createClient } from "@supabase/supabase-js";

// NOTE: The anon (public) key is NOT included here for security reasons —
// you must create a `.env.local` file (see `.env.local.example`) and put
// your project's anon key into NEXT_PUBLIC_SUPABASE_ANON_KEY.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://vxpvgeyktgyasegvycfp.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseAnonKey && typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Add it to .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- Leads (registration form) ----------------------------------------
export type LeadPayload = {
  full_name: string;
  phone_number: string;
  source?: string;
};

// URL dan source ni avtomatik aniqlaydi: ?source=... yoki ?utm_source=...
// Hech narsa topilmasa "a" qaytaradi (default qiymat).
export function detectSource(): string {
  if (typeof window === "undefined") return "a";
  try {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("source") || params.get("utm_source");
    return src && src.trim().length > 0 ? src.trim() : "a";
  } catch {
    return "a";
  }
}

export async function submitLead(payload: LeadPayload) {
  const source =
    payload.source && payload.source.trim().length > 0
      ? payload.source.trim()
      : detectSource();

  const { error } = await supabase.from("huzur1").insert([
    {
      full_name: payload.full_name,
      phone_number: payload.phone_number,
      source,
    },
  ]);
  if (error) throw error;
}

// ---- Visit counter -------------------------------------------------------
// Each page visit inserts one row into `counter`. We guard with
// sessionStorage so a single browser session is only counted once.
export async function trackVisit() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem("supermiya_visit_counted") === "y") return;
    const { error } = await supabase.from("counter").insert([{ count: "1" }]);
    if (!error) {
      sessionStorage.setItem("supermiya_visit_counted", "y");
    }
  } catch {
    // silently ignore — visit tracking must never break the page
  }
}