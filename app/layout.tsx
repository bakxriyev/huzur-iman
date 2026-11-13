import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iman Akhmedovna",
  description: "Official website of Iman Akhmedovna.",
  authors: [{ name: "@bakxriyevvv" }],
  creator: "@bakxriyevvv",
  publisher: "Iman Akhmedovna",
  other: {
    "facebook-domain-verification": "4qcezgp55dwb1i3zcw55gr7nkad43n",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '647005224750459');
fbq('track', 'PageView');
`,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=647005224750459&ev=PageView&noscript=1"
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
      </body>
    </html>
  );
}
