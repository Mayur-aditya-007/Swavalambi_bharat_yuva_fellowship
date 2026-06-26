"use client";

import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { createEventAction, updateEventAction, deleteEventAction, EventRecord } from "./actions";
import { ShieldCheck, Plus, Calendar, MapPin, Camera, Trash2, Edit, Save, X, Loader2, UploadCloud, Images, FileImageIcon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminGalleryProps {
  initialEvents: EventRecord[];
}

const MAX_ASSET_SIZE_MB = 20;
const MAX_ASSET_SIZE_BYTES = MAX_ASSET_SIZE_MB * 1024 * 1024;

export default function AdminGalleryDashboard({ initialEvents = [] }: AdminGalleryProps) {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [events, setEvents] = useState<EventRecord[]>(() => initialEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventRecord | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("health");
  const [date, setDate] = useState(""); 
  const [location, setLocation] = useState("");
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);

  // --- NEW: Track if the form contains oversized files ---
  const [isUploadTooLarge, setIsUploadTooLarge] = useState(false);

  const openCreateMode = () => {
    setEditingEvent(null);
    setTitle("");
    setCategory("health");
    setDate("");
    setLocation("");
    setExistingImages([]);
    setSelectedFiles([]);
    setUploadWarning(null);
    setIsUploadTooLarge(false);
    setIsFormOpen(true);
  };

  const openEditMode = (event: EventRecord) => {
    setEditingEvent(event);
    setTitle(event.title);
    setCategory(event.category);
    setDate(event.date);
    setLocation(event.location);
    setExistingImages(event.images || []);
    setSelectedFiles([]);
    setUploadWarning(null);
    setIsUploadTooLarge(false);
    setIsFormOpen(true);
  };

  // --- UPDATED: Modified handler to reject/flag heavy uploads ---
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const incomingFiles = Array.from(e.target.files);
  
  // 1. Calculate the total weight of what is already staged + what is being added
  const currentStagedSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
  const incomingSize = incomingFiles.reduce((acc, file) => acc + file.size, 0);
  const totalCombinedSize = currentStagedSize + incomingSize;

  // 2. Evaluate against the cumulative 20MB constraint
  if (totalCombinedSize > MAX_ASSET_SIZE_BYTES) {
    const formattedTotal = (totalCombinedSize / (1024 * 1024)).toFixed(2);
    
    setUploadWarning(
      `Upload Blocked: Total batch payload size would reach ${formattedTotal} MB, which violates the cumulative limit of ${MAX_ASSET_SIZE_MB} MB.`
    );
    setIsUploadTooLarge(true);
    e.target.value = "";
    return; // Hard stop: Reject the incoming files entirely
  }

  // 3. If within healthy limits, append to the staging queue safely
  setUploadWarning(null);
  setIsUploadTooLarge(false);
  if (incomingFiles.length > 0) {
    setSelectedFiles((prev) => [...prev, ...incomingFiles]);
  }

  e.target.value = "";
};
  const removeExistingImage = (urlToRemove: string) => {
    setExistingImages(prev => prev.filter(url => url !== urlToRemove));
  };

  const removeSelectedFile = (indexToRemove: number) => {
  setSelectedFiles((prev) => {
    const updated = prev.filter((_, idx) => idx !== indexToRemove);
    
    // Recalculate the true cumulative remaining weight
    const totalRemainingSize = updated.reduce((acc, file) => acc + file.size, 0);
    
    if (totalRemainingSize <= MAX_ASSET_SIZE_BYTES) {
      setUploadWarning(null);
      setIsUploadTooLarge(false);
    } else {
      // Update warning showing current remaining size overflow
      const formattedTotal = (totalRemainingSize / (1024 * 1024)).toFixed(2);
      setUploadWarning(
        `Upload Blocked: Total batch payload size is ${formattedTotal} MB, which violates the cumulative limit of ${MAX_ASSET_SIZE_MB} MB.`
      );
    }
    return updated;
  });
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploadTooLarge) return; // Hard guard rails against submissions
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("location", location);
    formData.append("existingImagesJson", JSON.stringify(existingImages));
    
    selectedFiles.forEach((file) => {
      formData.append("imageFiles", file);
    });

    startTransition(async () => {
      if (editingEvent) {
        formData.append("id", editingEvent.id.toString());
        const updated = await updateEventAction(formData);
        setEvents(prev => prev.map(item => item.id === updated.id ? updated : item));
      } else {
        const created = await createEventAction(formData);
        setEvents(prev => [created, ...prev]);
      }
      setIsFormOpen(false);
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to drop this record?")) return;
    const formData = new FormData();
    formData.append("id", id.toString());
    startTransition(async () => {
      await deleteEventAction(formData);
      setEvents(prev => prev.filter(item => item.id !== id));
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-6 bg-slate-50 font-sans min-h-screen">
      
      {/* 1. TOP CONTROL CONSOLE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-slate-200 rounded-none shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#000080] px-3 py-1 text-xs font-black uppercase tracking-widest border border-blue-100">
            <ShieldCheck size={14} /> Systems Panel
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Media Asset Controls</h1>
          <p className="text-xs font-medium text-slate-500">Deploy structural documentation galleries instantly down directly onto active public routing pathways.</p>
        </div>
        {!isFormOpen && (
          <Button onClick={openCreateMode} className="bg-[#138808] hover:bg-green-700 text-white font-black h-12 px-6 rounded-none text-xs uppercase tracking-wider gap-2">
            <Plus size={16} /> Log Entry Record
          </Button>
        )}
      </div>

      {/* 2. ADVANCED TWO-COLUMN FORM DRAWER WITH IMAGE MANAGER */}
      {isFormOpen && (
        <Card className="border-t-4 border-t-[#000080] bg-white rounded-none shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <CardHeader className="flex flex-row justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <CardTitle className="text-base font-black text-slate-900 uppercase tracking-tight">
                {editingEvent ? "Modify Registry Parameters" : "Initialize New Record Dataset"}
              </CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsFormOpen(false)} 
              className="rounded-none text-slate-400 hover:text-slate-900"
            >
              <X size={18} />
            </Button>
          </CardHeader>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* PART 1: CORE OPERATIONAL METADATA */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-[#000080] uppercase tracking-wider">Part 1: Operational Event Parameters</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Deployment Action Title</label>
                <input 
                  type="text" required value={title} onChange={e => setTitle(e.target.value)} 
                  placeholder="e.g., Free Health Checkup Camp" 
                  className="w-full border border-slate-200 px-3.5 py-2 bg-slate-50 font-semibold text-sm rounded-none text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#000080]" 
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operational Sector Focus</label>
                  <select 
                    value={category} onChange={e => setCategory(e.target.value)} 
                    className="w-full border border-slate-200 px-3 py-2 bg-slate-50 font-semibold text-sm rounded-none text-slate-900 h-9.5 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#000080]"
                  >
                    <option value="health">Health Awareness</option>
                    <option value="education">Education Support</option>
                    <option value="skill">Skill Development</option>
                    <option value="women">Women Empowerment</option>
                    <option value="environment">Environment Campaigns</option>
                    <option value="community">Community Outreach</option>
                    <option value="youth">Youth Leadership Programs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Geographic Base District</label>
                  <input 
                    type="text" required value={location} onChange={e => setLocation(e.target.value)} 
                    placeholder="e.g., Raipur, CG" 
                    className="w-full border border-slate-200 px-3.5 py-2 bg-slate-50 font-semibold text-sm rounded-none text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#000080]" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Timeline Schedule</label>
                  <input 
                    type="date" required value={date} onChange={e => setDate(e.target.value)} 
                    className="w-full border border-slate-200 px-3.5 py-2 bg-slate-50 font-semibold text-sm rounded-none text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#000080]" 
                  />
                </div>
              </div>
            </div>

            {/* PART 2: PHOTO INVENTORY MANAGER BLOCK */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-[#000080] uppercase tracking-wider">Part 2: Operational Photo Inventory Manager</h3>
              </div>

              <div className="grid md:grid-cols-12 gap-6 items-start">
                {/* File Upload Zone */}
                <div className="md:col-span-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed p-6 text-center cursor-pointer flex flex-col items-center justify-center space-y-2 transition-all min-h-35 ${
                      isUploadTooLarge 
                        ? "border-red-400 bg-red-50 hover:bg-red-50" 
                        : "border-slate-300 bg-slate-50 hover:bg-slate-100/70 hover:border-[#000080]"
                    }`}
                  >
                    <UploadCloud size={24} className={isUploadTooLarge ? "text-red-500" : "text-slate-400"} />
                    <span className={`text-xs font-black uppercase tracking-wider ${isUploadTooLarge ? "text-red-700" : "text-[#000080]"}`}>
                      {isUploadTooLarge ? "Upload Blocked" : "Queue More Images"}
                    </span>
                    <p className="text-[10px] font-medium text-slate-400">Pipes binary assets directly up onto Supabase Storage</p>
                    <input type="file" ref={fileInputRef} accept="image/*" multiple className="hidden" onChange={handleFileChange} />
                  </div>
                  
                  {/* --- UPDATED: Warning message explains the exact reason --- */}
                  {uploadWarning && (
                    <div className="mt-3 rounded-none border border-red-300 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-800 flex items-start gap-2">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <div>
                        {uploadWarning}
                        <div className="mt-1 font-normal text-slate-600">
                          <strong>Reason:</strong> Cloud infrastructure limitations prevent processing files beyond {MAX_ASSET_SIZE_MB} MB to maintain operational stability and network payload standards. Please compress your imagery before trying again.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Batch Thumbnail Monitor Track */}
                <div className="md:col-span-8 space-y-2">
                  <div className="bg-slate-100 p-2.5 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500 uppercase text-[10px] tracking-wider"><Images size={14} /> Active Staging Queue:</span>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-black text-[11px]">
                      {existingImages.length + selectedFiles.length} Assets Tracked
                    </span>
                  </div>

                  <div className="border border-slate-200 p-3 bg-white min-h-25 max-h-55 overflow-y-auto">
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                      {/* Cloud Repositories */}
                      {existingImages.map((url, idx) => (
                        <div key={`cloud-${idx}`} className="relative aspect-square border border-slate-200 bg-slate-50 group overflow-hidden">
                          <Image src={url} alt="" fill sizes="80px" className="object-cover" />
                          <button 
                            type="button" onClick={() => removeExistingImage(url)} 
                            className="absolute top-1 right-1 bg-red-600 text-white p-0.5 shadow hover:bg-red-700 rounded-none transition-transform"
                          >
                            <X size={10} />
                          </button>
                          <span className="absolute bottom-0 left-0 right-0 bg-[#000080]/90 text-[8px] font-black text-center text-white uppercase py-0.5 tracking-tight">Saved</span>
                        </div>
                      ))}

                      {/* Local Staging Blobs */}
                      {selectedFiles.map((file, idx) => (
                        <div key={`local-${idx}`} className="relative aspect-square border border-dashed border-emerald-300 bg-emerald-50/40 flex flex-col items-center justify-center text-center group overflow-hidden p-1">
                          <FileImageIcon size={14} className="text-emerald-600 shrink-0" />
                          <span className="text-[8px] text-emerald-900 font-bold truncate w-full mt-0.5 px-0.5">{file.name}</span>
                          <button 
                            type="button" onClick={() => removeSelectedFile(idx)} 
                            className="absolute top-1 right-1 bg-red-600 text-white p-0.5 shadow hover:bg-red-700 rounded-none transition-transform"
                          >
                            <X size={10} />
                          </button>
                          <span className="absolute bottom-0 left-0 right-0 bg-emerald-600/90 text-[8px] font-black text-center text-white uppercase py-0.5 tracking-tight">New</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM ACTIONS FOOTER PANEL */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button 
                type="button" variant="outline" onClick={() => setIsFormOpen(false)} 
                className="rounded-none font-bold uppercase text-xs h-11 px-6 border-slate-300 hover:bg-slate-50 text-slate-600"
              >
                Cancel
              </Button>
              
              {/* --- UPDATED: Disabled state dynamically bound to 'isUploadTooLarge' --- */}
              <Button 
                type="submit" 
                disabled={isPending || isUploadTooLarge} 
                className={`text-white font-black rounded-none uppercase text-xs tracking-wider gap-2 h-11 px-8 min-w-40 transition-colors ${
                  isUploadTooLarge 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed hover:bg-slate-300" 
                    : "bg-[#000080] hover:bg-indigo-950"
                }`}
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
                Commit Changes
              </Button>
            </div>

          </form>
        </Card>
      )}

      {/* 3. CORE REPOSITORY DATABASE TABLE */}
      <Card className="border border-slate-200 bg-white rounded-none shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 w-30">Index Asset</th>
                  <th className="p-4">Operational Header Label</th>
                  <th className="p-4">Classification Sector</th>
                  <th className="p-4">Timeline Calendar</th>
                  <th className="p-4 text-center">Calculated Counter</th>
                  <th className="p-4 text-right">System Task Vectors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-700">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 font-bold uppercase tracking-wider text-xs">No entries configured in operational logs.</td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="relative aspect-16/10 w-24 border border-slate-200 bg-slate-50">
                          {event.images && event.images[0] && (
                            <Image src={event.images[0]} alt="" fill sizes="96px" className="object-cover" />
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-black text-slate-900 max-w-60">
                        <div className="line-clamp-2 text-sm tracking-tight">{event.title}</div>
                        <div className="text-[9px] text-slate-400 font-mono mt-0.5 font-medium tracking-tight">UUID: #{event.id}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1">{event.category}</span>
                      </td>
                      <td className="p-4 text-xs font-bold text-slate-800">
                        <div className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-400" /> {event.date}</div>
                        <div className="flex items-center gap-1.5 text-slate-400 font-medium mt-1"><MapPin size={13} className="text-[#138808]" /> {event.location}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-black text-slate-900 bg-slate-50 border border-slate-200 px-2.5 py-1">
                          <Camera size={12} className="text-slate-400" /> {event.photosCount}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          <Button variant="outline" size="sm" onClick={() => openEditMode(event)} className="rounded-none border-slate-200 font-bold text-xs uppercase text-[#000080] h-9"><Edit size={13} /> Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)} className="rounded-none font-bold text-xs uppercase bg-red-600 h-9"><Trash2 size={13} /> Drop</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}