import type { Metadata } from "next";

// Eslatma: bu yerda <html>/<body> bo'lmaydi (ildiz layout'da bor) — takroriy
// Meta Pixel va noto'g'ri ichma-ich HTML'ni oldini olish uchun.
const TITLE = "Ichki uyg‘onish — 45 kunlik jonli kurs";
const DESCRIPTION =
  "Iman Akhmedova bilan 45 kunlik jonli «Ichki uyg‘onish» kursi: minnatdorchilik orqali qalb xotirjamligi, ichki ishonch va baraka. 23-noyabrda boshlanadi. 90% chegirma.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ichki-kuch" },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "/ichki-kuch",
    siteName: "Iman Akhmedova",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-ichki-kuch.jpg", width: 1200, height: 630, alt: "Ichki uyg‘onish — Iman Akhmedova" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-ichki-kuch.jpg"],
  },
};

export default function IchkiKuchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
