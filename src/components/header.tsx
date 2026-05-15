"use client";

import Link from "next/link";
import { Globe, Menu, X, Phone, Mail, Award, Landmark } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useTransition, useState } from "react";
import { setLanguageLocale } from "@/app/actions";

export function Header({ dict, lang }: { dict: Dictionary; lang: "en" | "hi" }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    startTransition(async () => {
      const newLang = lang === "en" ? "hi" : "en";
      await setLanguageLocale(newLang);
    });
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 shadow-lg">

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="w-full bg-white border-b-4 border-[#FF9933]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Using a grid configuration on mobile prevents dynamic title lengths from layout-shifting the action buttons */}
          <div className="grid grid-cols-12 items-center h-20 md:h-24">
            
            {/* Logo & Bilingual Title - Fixed wide column spacing */}
            <div className="col-span-8 lg:col-span-5 flex items-center gap-2 sm:gap-4 pr-2">
              <Link href="/" className="flex items-center gap-2 sm:gap-4 group min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-slate-50 border-2 border-[#000080] flex items-center justify-center p-1 overflow-hidden shadow-md">
                    <img src="/sba-logo.jpeg" alt="SBA Logo" className="object-contain" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-[#138808] w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex flex-col border-l-2 border-slate-200 pl-2 sm:pl-4 min-w-0">
                  <h1 className="text-[#000080] font-black text-sm sm:text-base md:text-2xl leading-none uppercase tracking-tighter truncate">
                    {dict.header.title}
                  </h1>
                  <span className="text-[#138808] font-bold text-[9px] sm:text-[10px] md:text-sm uppercase tracking-widest mt-1 truncate">
                    {dict.header.province}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation & Actions (Hidden on Mobile) */}
            <div className="hidden lg:flex col-span-7 items-center justify-end gap-8">
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

            {/* Mobile Actions Container - Fixed 4-column space prevents movement during language updates */}
            <div className="lg:hidden col-span-4 flex items-center justify-end gap-1.5 sm:gap-3">
              <button 
                onClick={toggleLanguage}
                disabled={isPending}
                className="flex items-center justify-center p-2 text-slate-600 border border-slate-200 rounded min-w-[40px] h-10 disabled:opacity-50"
              >
                <span className="font-bold text-xs uppercase tracking-tighter">
                  {isPending ? "..." : lang === "en" ? "HI" : "EN"}
                </span>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md bg-slate-100 text-[#000080] h-10 w-10 flex items-center justify-center transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* FULL MOBILE EXPANDED NAVIGATION DRAWER */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="px-4 pt-4 pb-6 space-y-3 shadow-inner">
              {[
                { name: dict.nav?.about || "About Us", href: "/about" },
                { name: dict.nav?.fellowship || "The Fellowship", href: "/fellowship" },
                { name: dict.nav?.report || "Daily Report", href: "/daily-report" }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 text-slate-800 font-bold text-sm uppercase tracking-wider rounded-md hover:bg-slate-50 transition-colors border-l-4 border-transparent hover:border-[#000080]"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#138808] hover:bg-green-800 text-white py-3.5 rounded font-black text-xs uppercase tracking-widest shadow-md transition-all">
                    {dict.header.registerBtn}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
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