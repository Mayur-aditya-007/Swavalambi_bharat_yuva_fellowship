"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Calendar, MapPin, Camera, ShieldCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventDetailModalEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  images?: string[];
}

interface EventDetailModalProps {
  event: EventDetailModalEvent;
  categoryLabel?: string;
  onClose: () => void;
}

export function EventDetailModal({ event, categoryLabel, onClose }: EventDetailModalProps) {
  const allImages = event.images && event.images.length > 0 ? event.images : [event.image];
  const [activePreviewUrl, setActivePreviewUrl] = useState(allImages[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-none w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col relative max-h-[90vh]">
        
        {/* Institutional Tri-Color Flag Ribbon Line Accent */}
        <div className="h-1 w-full grid grid-cols-3 absolute top-0 left-0 right-0 z-30">
          <div className="bg-[#FF9933]" />
          <div className="bg-white" />
          <div className="bg-[#138808]" />
        </div>

        {/* Modal Top Action Header Row */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between mt-1">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-wider">
            <ShieldCheck size={14} className="text-[#000080]" />
            <span>Document ID: #{event.id}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-none h-8 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50">
            <X size={18} /> Close Panel
          </Button>
        </div>

        {/* Modal Primary Form Data View Grid Split */}
        <div className="grid md:grid-cols-12 overflow-y-auto">
          
          {/* Left Split: High Yield Media Render Viewport */}
          <div className="md:col-span-7 bg-slate-950 p-4 flex flex-col justify-between space-y-4 border-b md:border-b-0 md:border-r border-slate-200 min-h-75">
            <div className="relative aspect-16/10 w-full bg-slate-900 border border-white/5 shadow-inner">
              <Image 
                src={activePreviewUrl} 
                alt="" 
                fill 
                unoptimized
                className="object-contain"
              />
            </div>
            
            {/* Horizontal Array Sub-Thumbnails Loop Tray */}
            {allImages.length > 1 && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Layers size={10}/> Deployment Asset Array ({allImages.length}):</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {allImages.map((imgUrl: string, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePreviewUrl(imgUrl)}
                      className={`relative w-16 h-12 border shrink-0 transition-all ${
                        activePreviewUrl === imgUrl ? "border-[#FF9933] ring-1 ring-[#FF9933]" : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={imgUrl} alt="" fill unoptimized className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Split: Context Metadata Audit Parameters */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              {categoryLabel && (
                <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1">
                  {categoryLabel}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {event.title}
              </h2>

              {/* Flat parameter boxes tracking core system themes */}
              <div className="bg-slate-50 p-4 border border-slate-200 space-y-2.5 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Calendar size={14} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Timeline Schedule</p>
                    <p className="text-sm font-black text-slate-800 mt-0.5">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5 border-t border-slate-200 pt-2.5">
                  <MapPin size={14} className="text-[#138808] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Geographic Region</p>
                    <p className="text-sm font-black text-slate-800 mt-0.5">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-200 pt-2.5">
                  <Camera size={14} className="text-[#000080] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Asset Registry Payload</p>
                    <p className="text-sm font-black text-slate-800 mt-0.5">{allImages.length} Verified Media Files</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 border border-blue-100 text-[11px] font-medium leading-relaxed text-slate-600">
              This deployment log represents verified field activity executed under the structural framework guidelines of Swabalambi Bharat Abhiyan.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}