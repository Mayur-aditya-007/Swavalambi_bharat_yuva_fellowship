import fs from "fs";
import path from "path";

const pagePath = path.resolve("src/app/fellowship/page.tsx");

const newContent = `"use client";

import React from "react";
import { 
  BookOpen, CheckCircle2, Users, MapPin, 
  Lightbulb, Award, Briefcase, BarChart3, 
  ShieldCheck, Microscope, Target, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";

export default function FellowshipPage() {
  const dict = useDictionary();
  return (
    <div className="flex flex-col bg-slate-50 font-sans">
      
      {/* 1. ACADEMIC HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#FF9933]/10 text-[#FF9933] px-4 py-1.5 rounded text-xs font-black uppercase tracking-widest border border-[#FF9933]/20">
              {dict.fellowship.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              {dict.fellowship.titlePart1} <br />
              <span className="text-[#000080]">{dict.fellowship.titlePart2}</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed border-l-4 border-[#138808] pl-6 max-w-3xl">
              {dict.fellowship.desc}
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none grayscale bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Chhattisgarh_district_map.svg')] bg-no-repeat bg-right bg-contain" />
      </section>

      {/* 2. PROGRAM ARCHITECTURE */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              {dict.fellowship.hybridTitle1} <br /> 
              <span className="text-[#FF9933]">{dict.fellowship.hybridTitle2}</span>
            </h2>
            <p className="text-slate-600 font-medium">{dict.fellowship.hybridDesc}</p>
            
            <div className="space-y-4">
              <div className="p-6 bg-[#000080] text-white">
                <h4 className="font-black uppercase text-sm mb-2 text-[#FF9933]">{dict.fellowship.volTitle}</h4>
                <p className="text-xs text-white/70">{dict.fellowship.volDesc}</p>
              </div>
              <div className="p-6 bg-[#138808] text-white">
                <h4 className="font-black uppercase text-sm mb-2 text-white">{dict.fellowship.coreTitle}</h4>
                <p className="text-xs text-white/70">{dict.fellowship.coreDesc}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
            {[
              { t: dict.fellowship.c1T, v: dict.fellowship.c1V, d: dict.fellowship.c1D },
              { t: dict.fellowship.c2T, v: dict.fellowship.c2V, d: dict.fellowship.c2D },
              { t: dict.fellowship.c3T, v: dict.fellowship.c3V, d: dict.fellowship.c3D },
              { t: dict.fellowship.c4T, v: dict.fellowship.c4V, d: dict.fellowship.c4D }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 border border-slate-200 hover:shadow-lg transition-shadow">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{card.t}</p>
                <h4 className="text-2xl font-black text-[#000080] mb-4 tracking-tighter">{card.v}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VERTICALS & RESPONSIBILITIES */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">{dict.fellowship.rolesTitle}</h2>
          <div className="h-1.5 w-24 bg-[#FF9933] mx-auto"></div>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { t: dict.fellowship.role1T, i: MapPin, d: dict.fellowship.role1D },
            { t: dict.fellowship.role2T, i: BookOpen, d: dict.fellowship.role2D },
            { t: dict.fellowship.role3T, i: Microscope, d: dict.fellowship.role3D },
            { t: dict.fellowship.role4T, i: BarChart3, d: dict.fellowship.role4D },
            { t: dict.fellowship.role5T, i: Lightbulb, d: dict.fellowship.role5D },
            { t: dict.fellowship.role6T, i: Users, d: dict.fellowship.role6D }
          ].map((role, i) => (
            <div key={i} className="group p-8 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <role.i className="text-[#FF9933] mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold mb-3">{role.t}</h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">{role.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIX-MONTH EXECUTION ROADMAP */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tighter">{dict.fellowship.roadmapTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12">
            {[
              { m: dict.fellowship.planM1, t: dict.fellowship.planT1, d: dict.fellowship.planD1 },
              { m: dict.fellowship.planM2, t: dict.fellowship.planT2, d: dict.fellowship.planD2 },
              { m: dict.fellowship.planM3, t: dict.fellowship.planT3, d: dict.fellowship.planD3 },
              { m: dict.fellowship.planM4, t: dict.fellowship.planT4, d: dict.fellowship.planD4 },
              { m: dict.fellowship.planM5, t: dict.fellowship.planT5, d: dict.fellowship.planD5 },
              { m: dict.fellowship.planM6, t: dict.fellowship.planT6, d: dict.fellowship.planD6 }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start px-4 group">
                <div className="w-12 h-12 shrink-0 bg-slate-100 flex items-center justify-center font-black text-[#000080] group-hover:bg-[#FF9933] group-hover:text-white transition-all">
                  0{i + 1}
                </div>
                <div>
                  <h5 className="font-black text-[#000080] uppercase tracking-widest text-xs mb-1">{step.m}</h5>
                  <h4 className="text-lg font-bold mb-2 text-slate-900">{step.t}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ELIGIBILITY & CALL TO ACTION */}
      <section className="py-24 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="bg-[#138808] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{dict.fellowship.whoTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  dict.fellowship.e1,
                  dict.fellowship.e2,
                  dict.fellowship.e3,
                  dict.fellowship.e4
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                    <CheckCircle2 size={18} className="text-[#FF9933]" /> {e}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <Button size="lg" className="bg-white text-[#138808] hover:bg-slate-100 font-black h-16 px-12 rounded-none text-xl shadow-2xl transition-transform hover:scale-105 active:scale-95">
                {dict.fellowship.applyBtn} <ArrowRight className="ml-2" />
              </Button>
              <p className="text-[10px] text-center font-bold opacity-60 uppercase tracking-[0.2em]">{dict.fellowship.batchText}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
`;

fs.writeFileSync(pagePath, newContent);
console.log("fellowship/page.tsx updated");
