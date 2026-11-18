import { Playfair_Display, Montserrat } from "next/font/google";

// Variable shriftlar: weight berilmasa bitta fayl yuklanadi (avval 6 ta edi).
// Faqat "latin" kerak: matndagi ‘ belgisi (U+2018) latin to'plamida bor.
export const serif = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const sans = Montserrat({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});
