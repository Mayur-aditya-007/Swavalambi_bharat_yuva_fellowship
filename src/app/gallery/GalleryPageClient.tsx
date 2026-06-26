"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDictionary } from "@/components/dictionary-provider";
import { motion, AnimatePresence } from "framer-motion";
import { EventCard } from "@/components/EventCard";
import Image from "next/image";

import {
  Search, SlidersHorizontal, Calendar, MapPin, Camera,
  Heart, BookOpen, Award, Users, Leaf, HeartHandshake,
  UserCheck, Globe, ShieldCheck,
} from "lucide-react";

interface EventRecord {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  photosCount: number;
  image?: string;
  images?: string[];
}

interface GalleryPageClientProps {
  initialEvents?: EventRecord[];
}

function normalizeImageList(images?: string[] | string | null, fallback?: string): string[] {
  if (Array.isArray(images)) {
    return images.filter((value): value is string => typeof value === "string" && value.trim().length > 0);
  }

  if (typeof images === "string") {
    const trimmed = images.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((value): value is string => typeof value === "string" && value.trim().length > 0);
      }
    } catch {
      // fall through to treat the raw string as a single URL
    }

    return trimmed.includes(",") ? trimmed.split(",").map((value) => value.trim()).filter(Boolean) : [trimmed];
  }

  if (typeof fallback === "string" && fallback.trim().length > 0) {
    return [fallback.trim()];
  }

  return [];
}

const categories = [
  { id: "all", label: "All Categories", icon: Globe },
  { id: "health", label: "Health Awareness", icon: Heart },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "skill", label: "Skill Development", icon: Award },
  { id: "women", label: "Women Empowerment", icon: Users },
  { id: "environment", label: "Environment", icon: Leaf },
  { id: "community", label: "Community Outreach", icon: HeartHandshake },
  { id: "youth", label: "Youth Programs", icon: UserCheck },
];

export default function GalleryPageClient({ initialEvents = [] }: GalleryPageClientProps) {
  const dict = useDictionary();
  const [events, setEvents] = useState<EventRecord[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(initialEvents.length === 0);
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (initialEvents.length > 0) {
      return;
    }

    let isMounted = true;

    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        if (isMounted) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to load gallery events:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, [initialEvents]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return events.filter((event) => {
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, searchQuery, selectedCategory]);

  const latestFeaturedEvent = events[0] || null;
  const totalPhotos = events.reduce((acc, curr) => acc + (curr.photosCount || 0), 0);

  const handleViewDetails = (event: EventRecord) => {
    setSelectedEvent({
      ...event,
      images: normalizeImageList(event.images, event.image),
      image: normalizeImageList(event.images, event.image)[0],
    });
    setActiveImage(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#FF9933] selection:text-white">
      <section className="relative bg-slate-950 pt-24 pb-28 border-b border-slate-800 overflow-hidden min-h-137.5 flex items-center group">
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <Image
            src="/hero.png"
            alt="Operational Overview"
            fill
            sizes="100vw"
            className="object-cover object-center filter contrast-[1.05] brightness-[0.35] transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0" />
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] grayscale bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/Chhattisgarh_district_map.svg')] bg-no-repeat bg-right bg-contain" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-4 py-1.5 rounded-none text-xs font-black uppercase tracking-widest border border-blue-500/20 backdrop-blur-md">
              <ShieldCheck size={14} className="text-[#FF9933]" /> {dict?.homeNew?.badge || "Official Repository"}
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
              <span className="text-[#FF9933]">{"Our Journey of Service &"}</span> <br />
              <span className="text-white">{"Nation Building"}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl border-l-4 border-[#138808] pl-6 drop-shadow">
              {"Explore our events, awareness drives, social initiatives, health camps, environmental campaigns, youth empowerment activities and community outreach programs."}
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <div className="bg-slate-900/80 backdrop-blur-md p-4 border border-slate-800 rounded-none flex items-center gap-4 min-w-[200px] flex-1 sm:flex-initial shadow-2xl">
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-[#FF9933] rounded-none"><Calendar className="w-5 h-5" /></div>
                <div>
                  <div className="text-xl font-black text-white leading-none">{isLoading ? "—" : events.length}</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1">Events Logged</div>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md p-4 border border-slate-800 rounded-none flex items-center gap-4 min-w-50 flex-1 sm:flex-initial shadow-2xl">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-[#138808] rounded-none"><Camera className="w-5 h-5" /></div>
                <div>
                  <div className="text-xl font-black text-white leading-none">
                    {isLoading ? "—" : totalPhotos}
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1">Photos Captured</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-1.5 w-full grid grid-cols-3 absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-[#FF9933]" />
          <div className="bg-white" />
          <div className="bg-[#138808]" />
        </div>
      </section>

      {latestFeaturedEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-16">
          <motion.div
            className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden grid lg:grid-cols-12 gap-0 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-1 w-full grid grid-cols-3 absolute top-0 left-0 right-0 z-20">
              <div className="bg-[#FF9933]" /> <div className="bg-white" /> <div className="bg-[#138808]" />
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto min-h-90 border-b lg:border-b-0 lg:border-r border-slate-200 pt-1">
              {latestFeaturedEvent.images?.[0] && (
          <div className="relative w-full h-80 sm:h-100 lg:h-full min-h-90">
  <Image
    src={latestFeaturedEvent.images[0]}
    alt={latestFeaturedEvent.title || "Latest Event"}
    fill
    priority
    sizes="(max-w-1024px) 100vw, 40vw"
    className="object-cover object-center filter contrast-[1.02]"
  />
</div>
              )}
              <div className="absolute top-4 left-4 bg-[#000080] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-none border border-white/20 shadow-md">
                Latest Deployment
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-white border-b lg:border-b-0 lg:border-r border-slate-200 pt-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight transition-colors">
                  {latestFeaturedEvent.title}
                </h2>

                <div className="bg-slate-50 p-3 border border-slate-200 space-y-1.5 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-500">Timeline:</span>
                    <span className="text-slate-900">{latestFeaturedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 border-t border-slate-200/60 pt-1.5 mt-1.5">
                    <MapPin className="w-4 h-4 text-[#138808] shrink-0" />
                    <span className="text-slate-500">Location:</span>
                    <span className="text-slate-900">{latestFeaturedEvent.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 bg-[#FF9933] shrink-0" />
                  <div>
                    <div className="text-sm font-black text-slate-900 leading-none">{latestFeaturedEvent.photosCount}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Photos Loaded</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 bg-[#000080] shrink-0" />
                  <div>
                    <div className="text-xs font-black text-slate-900 leading-none uppercase">{latestFeaturedEvent.category}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Classification</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-[#fcf8f4] border-t lg:border-t-0 border-slate-200 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-60 pt-10">
              <span className="text-7xl text-orange-200/40 font-serif absolute top-4 left-6 select-none pointer-events-none">“</span>
              <blockquote className="text-base font-black text-slate-800 relative z-10 max-w-55 leading-snug uppercase tracking-tight">
                Every event is a step towards a stronger, self-reliant India.
              </blockquote>
              <div className="w-12 h-0.5 bg-[#FF9933] my-4 z-10" />
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#000080] uppercase tracking-widest bg-white border border-slate-200 px-2.5 py-1">
                SBA Core Motto
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <section className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm py-4 mt-12">
        <div className="container mx-auto px-4 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Query database by district or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-none bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#000080] text-sm font-medium tracking-tight"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <div className="bg-white px-4 py-2 border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={14} /> Catalog Database
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-wider rounded-none transition-all ${
                    isActive
                      ? "bg-[#000080] text-white border-[#000080]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <IconComponent size={14} className={isActive ? "text-[#FF9933]" : "text-slate-400"} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verified Operational Registries</h3>
            <p className="text-xs font-semibold text-slate-500 uppercase mt-1 tracking-wider">
              Displaying {filteredEvents.length} filtered entries for internal review
            </p>
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => {
              const matchedCat = categories.find((c) => c.id === event.category);

              const formattedEventForCard = {
                id: event.id,
                title: event.title,
                category: event.category,
                date: event.date,
                location: event.location,
                photosCount: event.photosCount,
                image: event.images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e",
                images: normalizeImageList(event.images, event.image),
              };

              return (
                <EventCard
                  key={event.id}
                  event={formattedEventForCard}
                  categoryIcon={matchedCat?.icon}
                  categoryLabel={matchedCat?.label}
                  dict={dict}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-24 bg-white border border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-sm">
            No record datasets match your parameter constraints.
          </div>
        )}
      </section>

      {selectedEvent && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 px-4 py-6">
          <div className="w-full max-w-2xl rounded-none border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#000080]">Event Details</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">{selectedEvent.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-none border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6">
              {selectedEvent.images && selectedEvent.images.length > 0 ? (
                <>
                  <div className="relative mb-4 aspect-16/10 w-full overflow-hidden rounded-none border border-slate-200 bg-slate-100">
                    <Image
                      src={selectedEvent.images[activeImage] || selectedEvent.images[0]}
                      alt={selectedEvent.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>

                  {selectedEvent.images.length > 1 && (
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {selectedEvent.images.map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          className={`relative aspect-4/3 overflow-hidden rounded-none border transition ${
                            activeImage === index ? "border-[#138808] ring-2 ring-[#138808]/20" : "border-slate-200"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedEvent.title} ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 33vw, 12vw"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="mb-6 flex aspect-16/10 items-center justify-center rounded-none border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-500">
                  No images available for this event.
                </div>
              )}

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="font-semibold text-slate-900">Date:</span>
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#138808]" />
                  <span className="font-semibold text-slate-900">Location:</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera size={16} className="text-[#FF9933]" />
                  <span className="font-semibold text-slate-900">Photos:</span>
                  <span>{selectedEvent.photosCount}</span>
                </div>
                <div className="rounded-none border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Category</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedEvent.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
