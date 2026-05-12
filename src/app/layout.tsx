import type { Metadata } from "next";
import { Poppins, Mukta } from "next/font/google";
import { Header } from "@/components/header";
import { getDictionary } from "@/lib/i18n/get-dictionary";
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
        {/* Tricolour Top Strip */}
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>
        
        {/* The "Legacy" Header with Language Toggle */}
        <Header dict={dict} lang={lang} />

        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
