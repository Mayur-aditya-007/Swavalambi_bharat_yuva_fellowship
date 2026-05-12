"use client";

import Link from "next/link";
import { Globe, Menu } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full bg-[#0B3C5D] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E67E22] flex items-center justify-center font-bold text-white shadow-sm">
                S
              </div>
              <span className="font-bold text-lg hidden sm:block tracking-wide">
                {dict.header.title}
              </span>
              <span className="font-bold text-lg sm:hidden tracking-wide">
                {dict.header.titleMobile}
              </span>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <Globe className={`w-4 h-4 text-[#E67E22] ${isPending ? 'animate-spin' : ''}`} />
              <span>{dict.header.toggleLang}</span>
            </button>

            {/* Mobile Menu */}
            <button className="sm:hidden p-2 rounded-md hover:bg-white/10 transition-colors">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
