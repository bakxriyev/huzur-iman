// Meta Pixel / Yandex Metrica hodisalari. Skript hali yuklanmagan bo'lsa jim o'tadi.
type Fbq = (...args: unknown[]) => void;

export function trackEvent(name: string, standard = false) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { fbq?: Fbq; ym?: Fbq };
    w.fbq?.(standard ? "track" : "trackCustom", name);
    const id = Number(process.env.NEXT_PUBLIC_YM_ID);
    if (id) w.ym?.(id, "reachGoal", name);
  } catch {}
}
