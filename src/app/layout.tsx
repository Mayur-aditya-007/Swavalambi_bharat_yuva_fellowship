import type { Metadata } from "next";
import { Poppins, Mukta } from "next/font/google";
import { Header } from "@/components/header";
import { DictionaryProvider } from "@/components/dictionary-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "./globals.css";
import { Footer } from "@/components/footer";

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
  description: "A volunteer fellowship focused on local youth empowerment, entrepreneurship, and nation-building.",
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
      <body className="min-h-full flex flex-col font-sans">
        <DictionaryProvider dictionary={dict}>
          {/* Tricolour Top Strip */}
         
          {/* The "Legacy" Header with Language Toggle */}
          <Header dict={dict} lang={lang} />

          <main className="flex-1 flex flex-col">{children}</main>
          <WhatsAppButton />
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}
