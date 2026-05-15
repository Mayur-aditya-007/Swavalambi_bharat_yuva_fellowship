"use client";

import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,      // Replacement for social icons
  Share2,     // Replacement for social icons
  ExternalLink,
  ChevronRight,
  Landmark
} from "lucide-react";
import { useDictionary } from "@/components/dictionary-provider";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const dict = useDictionary();

  return (
    <footer className="bg-[#1A202C] text-white border-t-8 border-[#138808]">
      <div className="h-2 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-1">
                <img src="/sba-logo.jpeg" alt="SBA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-black text-lg leading-tight uppercase tracking-tighter">
                  {dict.footer.title}
                </h3>
                <p className="text-[#138808] font-bold text-xs uppercase tracking-widest">
                  {dict.footer.province}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {dict.footer.desc}
            </p>
            {/* SOCIAL ICONS REPLACED WITH SHARE/GLOBE */}
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/5 hover:bg-[#FF9933] transition-all rounded" aria-label="Website"><Globe size={18} /></Link>
              <Link href="#" className="p-2 bg-white/5 hover:bg-[#FF9933] transition-all rounded" aria-label="Social Media"><Share2 size={18} /></Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#FF9933] font-black uppercase text-sm tracking-[0.2em] border-b border-white/10 pb-2">
              {dict.footer.linksTitle}
            </h4>
            <ul className="space-y-3">
              {[
                { name: dict.footer.aboutMySba, href: "/about" },
                { name: dict.footer.fellowshipDetails, href: "/fellowship" },
                { name: dict.footer.successStories, href: "#" },
                { name: dict.footer.resourceMapping, href: "#" },
                { name: dict.footer.jskCenters, href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-2 group">
                    <ChevronRight size={14} className="text-[#138808] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#FF9933] font-black uppercase text-sm tracking-[0.2em] border-b border-white/10 pb-2">
              {dict.footer.resourcesTitle}
            </h4>
            <ul className="space-y-3">
              {[
                { name: dict.footer.msmeSchemes, href: "#" },
                { name: dict.footer.startupIndia, href: "#" },
                { name: dict.footer.skillIndia, href: "#" },
                { name: dict.footer.mudraLoan, href: "#" },
                { name: dict.footer.regGuide, href: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-2 group">
                    <ExternalLink size={14} className="text-slate-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[#FF9933] font-black uppercase text-sm tracking-[0.2em] border-b border-white/10 pb-2">
              {dict.footer.contactTitle}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#138808] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{dict.footer.callWhatsapp}</p>
                  <p className="text-sm font-black tracking-tight">9685322910</p> 
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#138808] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{dict.footer.emailAddr}</p>
                  <p className="text-sm font-black tracking-tight underline">sbachhattisgarh@gmail.com</p> 
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#138808] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{dict.footer.location}</p>
                  <p className="text-sm font-black tracking-tight uppercase">{dict.footer.province}</p> 
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
            © {currentYear} {dict.footer.rights}
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] sm:text-xs font-black uppercase text-slate-400">
            <Link href="#" className="hover:text-[#FF9933]">{dict.footer.privacy}</Link>
            <Link href="#" className="hover:text-[#FF9933]">{dict.footer.terms}</Link>
            <Link href="#" className="hover:text-[#FF9933]">{dict.footer.sitemap}</Link>
          </div>
        </div>

        <div className="mt-12 flex justify-center opacity-30">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-500">
             <Landmark size={24} />
             <span className="text-[10px] font-black tracking-[0.3em] uppercase">{dict.footer.atmanirbhar}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}