"use client";

import Link from "next/link";
import { Globe, Menu, Phone, Mail, Award, Landmark } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useTransition } from "react";
import { setLanguageLocale } from "@/app/actions";

export function Header({ dict, lang }: { dict: Dictionary; lang: "en" | "hi" }) {
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    startTransition(async () => {
      const newLang = lang === "en" ? "hi" : "en";
      await setLanguageLocale(newLang);
    });
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 shadow-lg">
      {/* 1. TOP UTILITY BAR (Govt Standard) */}
 
      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="w-full bg-white border-b-4 border-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo & Bilingual Title */}
            <div className="flex-shrink-0 flex items-center gap-4">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 border-2 border-[#000080] flex items-center justify-center p-1 overflow-hidden shadow-md">
                    <img src="/sba-logo.png" alt="SBA Logo" className="object-contain" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#138808] w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex flex-col border-l-2 border-slate-200 pl-4">
                  <h1 className="text-[#000080] font-black text-lg md:text-2xl leading-none uppercase tracking-tighter">
                    {dict.header.title}
                  </h1>
                  <span className="text-[#138808] font-bold text-[10px] md:text-sm uppercase tracking-widest mt-1">
                    {dict.header.province}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation & Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                {[
                  { name: dict.nav?.about || "About Us", href: "/about" },
                  { name: dict.nav?.fellowship || "The Fellowship", href: "/fellowship" },
                  { name: dict.nav?.report || "Daily Report", href: "/daily-report" }
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="text-slate-700 font-bold text-sm hover:text-[#000080] transition-colors uppercase tracking-tight"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                {/* Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  disabled={isPending}
                  className="flex items-center gap-2 px-4 py-2 rounded border-2 border-slate-100 hover:border-[#000080] hover:bg-slate-50 transition-all text-xs font-black text-slate-700 uppercase"
                >
                  <Globe className={`w-4 h-4 text-[#FF9933] ${isPending ? 'animate-spin' : ''}`} />
                  {dict.header.toggleLang}
                </button>

                {/* Main Action Button */}
                <Link href="/register">
                  <button className="bg-[#138808] hover:bg-green-800 text-white px-6 py-2.5 rounded font-black text-xs uppercase tracking-widest shadow-md transition-transform active:scale-95">
                    {dict.header.registerBtn}
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
               <button 
                onClick={toggleLanguage}
                className="p-2 text-slate-600 border border-slate-200 rounded"
              >
                <span className="font-bold text-xs uppercase">{dict.header.toggleLang}</span>
              </button>
              <button className="p-2 rounded-md bg-slate-100 text-[#000080] transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 3. SUB-STRIP: MARQUEE / CALL TO ACTION */}
      <div className="bg-[#f4f7fe] py-2 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <div className="flex items-center gap-4">
            <span className="bg-[#FF9933] text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase shrink-0">{dict.header.updates}</span>
            <p className="text-slate-600 text-[11px] md:text-xs font-bold animate-pulse">
              {dict.header.marquee}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}