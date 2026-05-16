import type { Metadata } from "next";
import { Poppins, Mukta } from "next/font/google";
import Script from "next/script";

import { Header } from "@/components/header";
import { DictionaryProvider } from "@/components/dictionary-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Footer } from "@/components/footer";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const mukta = Mukta({
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
});

export const metadata: Metadata = {
  title: "Swavalambi Bharat Yuva Fellowship",
  description:
    "A volunteer fellowship focused on local youth empowerment, entrepreneurship, and nation-building.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { dict, lang } = await getDictionary();

  return (
    <html
      lang={lang}
      className={`${poppins.variable} ${mukta.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4B0G64WXTM"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4B0G64WXTM');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col font-sans">
        <DictionaryProvider dictionary={dict}>
          {/* Tricolour Top Strip */}

          {/* The "Legacy" Header with Language Toggle */}
          <Header dict={dict} lang={lang} />

          <main className="flex-1 flex flex-col">
            {children}
          </main>

          <WhatsAppButton />
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}