"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, ArrowRight, FileText, Users, 
  TrendingUp, MapPin, Award, Lightbulb, 
  Target, GraduationCap, Briefcase, BarChart3,
  Search, ShieldCheck, Microscope, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/components/dictionary-provider";
import Link from "next/link";

export default function HomeBody() {
  const dict = useDictionary();
  return (
    <main className="flex flex-col bg-slate-50 font-sans">
      
      {/* SECTION 1: THE STRATEGIC OVERVIEW (Data-Heavy Hero) */}
      <section className="relative bg-white pt-20 pb-16 border-b border-slate-200 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none grayscale bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Chhattisgarh_district_map.svg')] bg-no-repeat bg-right bg-contain" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#000080] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                <ShieldCheck size={14} /> {dict.homeNew.badge}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05]">
               <span className="text-[#FF9933]"> {dict.homeNew.titlePart1}</span> <br /><span>{dict.homeNew.titlePart3}<br /></span>
                <span className="text-green-600">{dict.homeNew.titlePart2}</span>
              </h1>
              <p className="text-xl text-slate-700 font-semibold leading-relaxed border-l-4 border-[#138808] pl-6">
                {dict.homeNew.subtitle}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
                <div className="bg-slate-50 p-4 border border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-500">{dict.homeNew.durationLabel}</p>
                  <p className="text-lg font-black text-slate-800">{dict.homeNew.durationVal}</p>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-500">{dict.homeNew.natureLabel}</p>
                  <p className="text-lg font-black text-slate-800">{dict.homeNew.natureVal}</p>
                </div>
              
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button  className="bg-[#138808] hover:bg-green-800 text-white font-black h-14 px-10 rounded-none text-lg">
                  <Link href="/register">{dict.homeNew.registerBtn}</Link>
                </Button>
                <Button  variant="outline" className="border-2 border-[#000080] text-[#000080] font-black h-14 px-10 rounded-none text-lg">
                  <a href="/Swavalambi_Bharat_Yuva_Fellowship_Proposal (4).pdf" download>
                    {dict.homeNew.downloadBtn}
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-[#000080] p-8 text-white rounded-none shadow-2xl relative">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={80} /></div>
                <h3 className="text-2xl font-black mb-6 border-b border-white/20 pb-4">{dict.homeNew.visionTitle}</h3>
                <ul className="space-y-4">
                  {[
                    dict.homeNew.vision1,
                    dict.homeNew.vision2,
                    dict.homeNew.vision3,
                    dict.homeNew.vision4
                  ].map((v, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed">
                      <CheckCircle2 size={18} className="text-[#FF9933] shrink-0" /> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* SECTION 2: ROLES & RESPONSIBILITIES */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{dict.homeNew.rolesTitle}</h2>
            <p className="text-slate-600 font-medium">{dict.homeNew.rolesSubtitle}</p>
          </div>
          <div className="bg-white px-6 py-3 border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {dict.homeNew.rolesAnalysis}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: dict.homeNew.role1T, icon: MapPin, cite: "94", d: dict.homeNew.role1D },
            { t: dict.homeNew.role2T, icon: FileText, cite: "56", d: dict.homeNew.role2D },
            { t: dict.homeNew.role3T, icon: Microscope, cite: "90", d: dict.homeNew.role3D },
            { t: dict.homeNew.role4T, icon: Share2, cite: "82", d: dict.homeNew.role4D },
            { t: dict.homeNew.role5T, icon: Lightbulb, cite: "86", d: dict.homeNew.role5D },
            { t: dict.homeNew.role6T, icon: Users, cite: "92", d: dict.homeNew.role6D }
          ].map((role, i) => (
            <div key={i} className="bg-white p-8 border border-slate-200 hover:border-[#138808] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400">Vertical {role.cite}</div>
              <role.icon size={36} className="text-[#000080] mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-black mb-3 text-slate-900">{role.t}</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{role.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE HYBRID FELLOWSHIP MODEL */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl font-black leading-tight">{dict.homeNew.hybridTitlePart1} <br /> <span className="text-[#FF9933]">{dict.homeNew.hybridTitlePart2}</span></h2>
              <p className="text-slate-400 text-lg">{dict.homeNew.hybridDesc}</p>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 border-l-4 border-[#FF9933]">
                  <h4 className="text-xl font-bold mb-2">{dict.homeNew.volFellows}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{dict.homeNew.volDesc}</p>
                </div>
                <div className="p-6 bg-white/5 border-l-4 border-[#138808]">
                  <h4 className="text-xl font-bold mb-2">{dict.homeNew.coreFellows}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{dict.homeNew.coreDesc}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-white/5 p-1 rounded-none border border-white/10">
              <div className="bg-slate-800 p-8">
                <h4 className="text-lg font-bold mb-8 text-[#FF9933]">{dict.homeNew.coreCriteria}</h4>
                <div className="grid gap-4">
                  {[
                    dict.homeNew.coreC1,
                    dict.homeNew.coreC2,
                    dict.homeNew.coreC3,
                    dict.homeNew.coreC4
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-medium border-b border-white/5 pb-4 last:border-none">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{i+1}</div>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 6-MONTH EXECUTION ROADMAP */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{dict.homeNew.planTitle}</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{dict.homeNew.planSubtitle}</p>
          </div>
          <div className="relative overflow-x-auto pb-8">
            <div className="flex min-w-[1000px] gap-4">
              {[
                { m: dict.homeNew.planM1, t: dict.homeNew.planT1, d: dict.homeNew.planD1 },
                { m: dict.homeNew.planM2, t: dict.homeNew.planT2, d: dict.homeNew.planD2 },
                { m: dict.homeNew.planM3, t: dict.homeNew.planT3, d: dict.homeNew.planD3 },
                { m: dict.homeNew.planM4, t: dict.homeNew.planT4, d: dict.homeNew.planD4 },
                { m: dict.homeNew.planM5, t: dict.homeNew.planT5, d: dict.homeNew.planD5 },
                { m: dict.homeNew.planM6, t: dict.homeNew.planT6, d: dict.homeNew.planD6 }
              ].map((step, i) => (
                <div key={i} className="flex-1 bg-slate-50 p-6 border-t-4 border-[#000080] group hover:bg-[#000080] hover:text-white transition-all">
                  <p className="text-xs font-black text-[#FF9933] mb-4 uppercase">{step.m}</p>
                  <h5 className="font-bold text-lg mb-3 leading-tight">{step.t}</h5>
                  <p className="text-xs opacity-70 leading-relaxed font-medium">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ELIGIBILITY & RECOGNITION */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-[#000080]">{dict.homeNew.eligibilityTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                dict.homeNew.e1,
                dict.homeNew.e2,
                dict.homeNew.e3,
                dict.homeNew.e4,
                dict.homeNew.e5,
                dict.homeNew.e6
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 border border-slate-200 text-sm font-bold shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#138808]" /> {e}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-[#138808]">{dict.homeNew.rewardsTitle}</h3>
            <div className="grid gap-4">
              {[
                { l: dict.homeNew.r1L, d: dict.homeNew.r1D },
                { l: dict.homeNew.r2L, d: dict.homeNew.r2D },
                { l: dict.homeNew.r3L, d: dict.homeNew.r3D }
              ].map((r, i) => (
                <div key={i} className="flex gap-6 items-start bg-[#fcf8f4] p-6 border border-[#FF9933]/20">
                  <Award size={32} className="text-[#FF9933] shrink-0" />
                  <div>
                    <h5 className="font-black text-slate-800 uppercase tracking-tight text-sm mb-1">{r.l}</h5>
                    <p className="text-xs text-slate-500 font-medium">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-slate-900 rounded-none p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 via-transparent to-[#138808]/10 pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                {dict.homeNew.ctaTitle1} <br />
                <span className="text-[#FF9933]">{dict.homeNew.ctaTitle2}</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium">{dict.homeNew.ctaSubtitle}</p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left pt-8">
                <div className="bg-white/5 p-8 border border-white/10">
                  <p className="text-xs font-black text-[#FF9933] uppercase mb-4 tracking-widest">{dict.homeNew.connectUs}</p>
                  <p className="text-2xl font-black text-white mb-2 tracking-tight">WhatsApp: 9685322910</p>
                  <p className="text-lg font-bold text-white/60">sbachhattisgarh@gmail.com</p>
                </div>
                <div className="flex flex-col gap-4">
                  <a href="/register">
                  <Button className="w-full h-16 bg-[#138808] hover:bg-green-700 text-white font-black text-xl rounded-none transition-transform hover:scale-105 shadow-2xl">
                    {dict.homeNew.applyBtn}
                  </Button></a>
                  <div className="flex gap-4">
                   <a href="/daily-report" className="w-1/2" > <Button variant="outline" className="flex-1  w-full h-12 border-white/20 text-black font-bold hover:bg-white/10 rounded-none">{dict.homeNew.reportBtn}</Button></a>
                   <Button variant="outline" className="flex-1 w-1/2 h-12 border-white/20 text-black font-bold hover:bg-white/10 rounded-none">{dict.homeNew.jskBtn}</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
