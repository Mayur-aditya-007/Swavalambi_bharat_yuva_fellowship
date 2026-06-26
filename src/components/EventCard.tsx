"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Camera, ArrowRight, Globe, LucideIcon } from "lucide-react";

interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  photosCount: number;
  image: string;
  images?: string[]; // Adding full array access support
}

// Update this type declaration block inside src/components/EventCard.tsx
interface DictionaryLike {
  [key: string]: any; // Allows passing the global dictionary configuration gracefully
}

interface EventCardProps {
  event: EventData;
  categoryIcon?: LucideIcon;
  categoryLabel?: string;
  dict?: DictionaryLike;
  onViewDetails?: (event: EventData) => void; // Lifting state click trigger upwards
}

export function EventCard({ event, categoryIcon: IconComponent = Globe, categoryLabel, dict, onViewDetails }: EventCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "linear" }}
      className="bg-white rounded-none border border-slate-200 hover:border-[#138808] transition-all group flex flex-col justify-between relative shadow-sm"
    >
      {/* Structural Data Badge Tag */}
      {categoryLabel && (
        <div className="absolute top-0 right-0 z-20 bg-slate-100 border-b border-l border-slate-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
          {categoryLabel}
        </div>
      )}

      <div>
        {/* Media Block Layout */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
          <Image
            src={event.image}
            alt={event.title}
            fill
            
            priority
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-102 filter contrast-[1.02]"
          />
          
          {/* Institutional Floating Indicator Icon */}
          <div className="absolute bottom-3 left-3 w-8 h-8 bg-[#000080] text-white flex items-center justify-center border border-white/20 shadow-lg">
            <IconComponent size={16} />
          </div>
        </div>

        {/* Content & Metadata */}
        <div className="p-6 space-y-4">
          <h4 className="text-lg font-black text-slate-900 leading-tight tracking-tight line-clamp-2 group-hover:text-[#000080] transition-colors">
            {event.title}
          </h4>
          
          <div className="bg-slate-50 p-3 border border-slate-200 space-y-1.5 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 border-t border-slate-200/60 pt-1.5 mt-1.5">
              <MapPin size={14} className="text-[#138808] shrink-0" />
              <span className="text-slate-900">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer Segment */}
      <div className="mx-6 pb-6 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
        <span className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Camera size={14} className="text-slate-400" />
          <span>{event.photosCount} {dict?.gallery?.photosText || "Photos"}</span>
        </span>
        
        {/* Trigger lookup click payload pass */}
        <button 
          type="button"
          onClick={() => onViewDetails?.(event)}
          className="inline-flex items-center gap-1 text-[#138808] font-black group-hover:text-emerald-700 uppercase tracking-wider text-[11px] group-hover:underline focus:outline-none"
        >
          <span>View Record</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}