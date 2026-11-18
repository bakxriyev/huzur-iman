import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.imanakhmedovna.uz";
const PIXEL_ID = "647005224750459";
// Ixtiyoriy tahlil: Vercel'da env qo'yilsa avtomatik ulanadi
const YM_ID = process.env.NEXT_PUBLIC_YM_ID; // Yandex Metrica
const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // Google Analytics (G-XXXX)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Iman Akhmedova — rasmiy sayt",
    template: "%s | Iman Akhmedova",
  },
  description:
    "Iman Akhmedovaning rasmiy sayti: jonli kurslar, vebinarlar va qalb xotirjamligi uchun amaliy dasturlar.",
  applicationName: "Iman Akhmedova",
  authors: [{ name: "@bakxriyevvv" }],
  creator: "@bakxriyevvv",
  publisher: "Iman Akhmedovna",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    siteName: "Iman Akhmedova",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  other: {
    "facebook-domain-verification": "4qcezgp55dwb1i3zcw55gr7nkad43n",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a0220",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {children}

        {/* Website Creator */}
        <footer className="w-full py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Iman Akhmedovna.
          Created by{" "}
          <a
            href="https://t.me/bakxriyevvv/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-black transition-colors"
          >
            @bakxriyevvv
          </a>
        </footer>

        {/* Meta Pixel: sahifa interaktiv bo'lgach yuklanadi (asosiy oqimni bloklamaydi) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>

        {YM_ID && (
          <Script id="yandex-metrica" strategy="lazyOnload">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${Number(YM_ID)},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
          </Script>
        )}

        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
            <Script id="ga" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
