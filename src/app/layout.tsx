import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StudyStateProvider } from "@/hooks/useStudyState";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://time-is-money.example.com";
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "タイムイズマネー | 勉強時間が見える化される学習タイマー",
    template: "%s | タイムイズマネー",
  },
  description:
    "勉強時間を計測すると「真実の口」からコインが落ち、将来の年収アップ額として可視化される無料の学習タイマー。ストップウォッチ・カウントダウン・ポモドーロに対応。",
  keywords: [
    "勉強タイマー",
    "学習タイマー",
    "ポモドーロタイマー",
    "ストップウォッチ",
    "自己投資",
    "タイムイズマネー",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "タイムイズマネー",
    title: "タイムイズマネー | 勉強時間が見える化される学習タイマー",
    description:
      "勉強するほどコインが貯まり、将来の年収アップ額として可視化される学習タイマー。",
  },
  twitter: {
    card: "summary",
    title: "タイムイズマネー | 勉強時間が見える化される学習タイマー",
    description:
      "勉強するほどコインが貯まり、将来の年収アップ額として可視化される学習タイマー。",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "タイムイズマネー",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  url: SITE_URL,
  description:
    "勉強時間を計測すると「真実の口」からコインが落ち、将来の年収アップ額として可視化される無料の学習タイマー。",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <StudyStateProvider>
          <Header />
          {children}
          <Footer />
        </StudyStateProvider>
      </body>
    </html>
  );
}
