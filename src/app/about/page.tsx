"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target, Globe, Zap, Users, MapPin, 
  ShieldCheck, ArrowRight, Handshake, 
  TrendingUp, Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";

export default function AboutPage() {
  const dict = useDictionary();
  const tricolorGradient = "linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)";

  return (
    <div className="flex flex-col bg-[#F8FAFC] font-sans">
      
      {/* 1. VISION HERO */}
      <section className="relative bg-white pt-24 pb-20 overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 20 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-[#000080] px-4 py-2 rounded font-black text-xs uppercase tracking-[0.2em] mb-8"
            >
              <Landmark size={14} /> {dict.about.badge}
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-8">
              {dict.about.titlePart1} <br />
              <span className="text-[#FF9933]">{dict.about.titlePart2}</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl border-l-4 border-[#000080] pl-8">
              {dict.about.desc}
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] grayscale pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Chhattisgarh_district_map.svg')] bg-no-repeat bg-right bg-contain" />
      </section>

      {/* 2. CORE FOCUS AREAS */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {[
            {
              title: dict.about.f1T,
              desc: dict.about.f1D,
              icon: Zap,
              color: "#FF9933"
            },
            {
              title: dict.about.f2T,
              desc: dict.about.f2D,
              icon: Handshake,
              color: "#000080"
            },
            {
              title: dict.about.f3T,
              desc: dict.about.f3D,
              icon: MapPin,
              color: "#138808"
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative group">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform"
                style={{ backgroundColor: item.color }}
              >
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MYSBA DIGITAL ECOSYSTEM */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black leading-tight uppercase tracking-tighter">
                {dict.about.digiTitle1} <br />
                <span className="text-[#FF9933]">{dict.about.digiTitle2}</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                {dict.about.digiDesc}
              </p>
              <div className="space-y-6">
                {[
                  dict.about.p1,
                  dict.about.p2,
                  dict.about.p3
                ].map((point, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white/5 p-4 border border-white/10">
                    <ShieldCheck className="text-[#138808] shrink-0" />
                    <p className="text-sm font-bold text-slate-200">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-12 rounded-none border border-white/10 relative">
              <h3 className="text-2xl font-bold text-[#FF9933] mb-8 uppercase tracking-widest">{dict.about.infraTitle}</h3>
              <div className="grid gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#138808] uppercase tracking-widest">{dict.about.infraPT1}</p>
                  <h4 className="text-xl font-bold italic">{dict.about.infraPT2}</h4>
                  <p className="text-sm text-slate-400">{dict.about.infraPT3}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#138808] uppercase tracking-widest">{dict.about.infraES1}</p>
                  <h4 className="text-xl font-bold italic">{dict.about.infraES2}</h4>
                  <p className="text-sm text-slate-400">{dict.about.infraES3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHHATTISGARH PROVINCE FOCUS */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <img src="/chhattisgarh-focus.png" alt="SBA CG Focus" className="w-full shadow-2xl border-8 border-white" />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-black text-slate-900 underline decoration-[#FF9933] underline-offset-8">
              {dict.about.cgTitle}
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed italic">
              {dict.about.cgDesc}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#fcf8f4] p-6 border border-[#FF9933]/20">
                <h5 className="font-black text-[#FF9933] uppercase text-xs mb-2">{dict.about.pgLabel}</h5>
                <p className="text-sm font-bold text-slate-800 tracking-tight">{dict.about.pgDesc}</p>
              </div>
              <div className="bg-[#eef8f1] p-6 border border-[#138808]/20">
                <h5 className="font-black text-[#138808] uppercase text-xs mb-2">{dict.about.sgLabel}</h5>
                <p className="text-sm font-bold text-slate-800 tracking-tight">{dict.about.sgDesc}</p>
              </div>
            </div>
            <Button size="lg" className="bg-[#000080] hover:bg-blue-900 text-white font-bold px-10 h-16 rounded-none uppercase tracking-widest">
              {dict.about.joinBtn} <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. CONTACT */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 p-12 md:p-16 text-white text-center space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter">{dict.about.contactTitle}</h3>
            <div className="flex flex-col md:flex-row justify-center gap-12 text-lg font-bold">
              <p className="flex items-center gap-3 justify-center"><TrendingUp className="text-[#FF9933]"/> {dict.about.whatsapp}</p>
              <p className="flex items-center gap-3 justify-center"><Globe className="text-[#138808]"/> {dict.about.email}</p>
            </div>
            <div className="h-1 w-full mx-auto max-w-sm" style={{ background: tricolorGradient }} />
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">{dict.about.footer}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
