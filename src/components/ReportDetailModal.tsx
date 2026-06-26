"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface ReportDetailModalProps {
  report: Record<string, unknown> & {
    fellow_name?: string;
    proof_urls?: string[];
    business_contacted?: boolean;
    government_scheme_work?: boolean;
    youth_outreach?: boolean;
    social_media_work?: boolean;
    business_name?: string;
    business_category?: string;
    contact_person?: string;
    contact_number?: string;
    business_observation?: string;
    scheme_name?: string;
    scheme_category?: string;
    scheme_work_types?: string[] | string;
    scheme_details?: string;
    institution_name?: string;
    students_spoken?: number;
    interested_students?: number;
    startup_idea_found?: boolean;
    startup_idea_details?: string;
    post_count?: number;
    reel_count?: number;
    story_count?: number;
    video_count?: number;
    poster_count?: number;
    content_topic?: string;
    content_link?: string;
    achievement?: string;
    challenges?: string;
    tomorrow_plan?: string;
    success_stories?: number;
    schemes_studied?: number;
    social_posts?: number;
    meetings_attended?: number;
  };
}

export default function ReportDetailModal({ report }: ReportDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="outline-none cursor-pointer px-3 py-1 text-xs font-semibold rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 select-none"
      >
        View All Details
      </button>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/50 p-0 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 w-[92vw] max-w-140 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.target === dialogRef.current && closeModal()}
      >
        <div className="p-5 space-y-4 max-h-[85vh] overflow-y-auto text-left">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-bold text-base text-navy dark:text-blue-400 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span>Metric Inspector Portfolio</span>
              <span className="text-xs font-mono font-normal text-zinc-400">({report.fellow_name})</span>
            </h4>
            <button
              type="button"
              onClick={closeModal}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-lg font-bold px-2"
            >
              ✕
            </button>
          </div>

          {/* Metric Counts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg">
            <div><span className="block text-zinc-400">Success Stories</span><b>{report.success_stories ?? 0}</b></div>
            <div><span className="block text-zinc-400">Schemes Studied</span><b>{report.schemes_studied ?? 0}</b></div>
            <div><span className="block text-zinc-400">Social Posts</span><b>{report.social_posts ?? 0}</b></div>
            <div><span className="block text-zinc-400">Meetings</span><b>{report.meetings_attended ?? 0}</b></div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Business Profiles */}
            {report.business_contacted && (
              <div className="p-2.5 rounded border border-emerald-100 bg-emerald-50/20 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                <h5 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">🏢 Business Profile</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                  <div><b>Name:</b> {report.business_name || "N/A"}</div>
                  <div><b>Category:</b> {report.business_category || "N/A"}</div>
                  <div><b>Contact:</b> {report.contact_person} ({report.contact_number || "N/A"})</div>
                  <div className="sm:col-span-2"><b>Observations:</b> {report.business_observation}</div>
                </div>
              </div>
            )}

            {/* Gov Schemes */}
            {report.government_scheme_work && (
              <div className="p-2.5 rounded border border-blue-100 bg-blue-50/20 dark:border-blue-900/30 dark:bg-blue-950/10">
                <h5 className="font-bold text-blue-800 dark:text-blue-400 mb-1">🏛️ Gov Scheme Portfolio</h5>
                <div className="text-[11px] space-y-1">
                  <div><b>Scheme Target:</b> {report.scheme_name} ({report.scheme_category})</div>
                  <div><b>Actions:</b> {Array.isArray(report.scheme_work_types) ? report.scheme_work_types.join(", ") : String(report.scheme_work_types)}</div>
                  <div><b>Details:</b> {report.scheme_details}</div>
                </div>
              </div>
            )}

            {/* Youth Outreach */}
            {report.youth_outreach && (
              <div className="p-2.5 rounded border border-amber-100 bg-amber-50/20 dark:border-amber-900/30 dark:bg-amber-950/10">
                <h5 className="font-bold text-amber-800 dark:text-amber-400 mb-1">🎓 Academic Outreach</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                  <div className="sm:col-span-2"><b>Institution:</b> {report.institution_name}</div>
                  <div><b>Students Audited:</b> {report.students_spoken}</div>
                  <div><b>Interested:</b> {report.interested_students}</div>
                  {report.startup_idea_found && (
                    <div className="sm:col-span-2 mt-1 bg-white dark:bg-zinc-900 p-1.5 rounded border">
                      <b className="text-amber-600 block">💡 Startup Concept:</b>
                      {report.startup_idea_details}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Social Media Activity */}
            {report.social_media_work && (
              <div className="p-2.5 rounded border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 text-[11px]">
                <h5 className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">📱 Digital Engine Footprint</h5>
                <div className="flex gap-3 flex-wrap font-mono text-zinc-500">
                  <span>Posts: <b>{report.post_count}</b></span>
                  <span>Reels: <b>{report.reel_count}</b></span>
                  <span>Stories: <b>{report.story_count}</b></span>
                  <span>Videos: <b>{report.video_count}</b></span>
                  <span>Posters: <b>{report.poster_count}</b></span>
                </div>
                {report.content_topic && <div className="mt-1"><b>Topic:</b> {report.content_topic}</div>}
                {report.content_link && (
                  <a href={report.content_link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline block mt-1 truncate">
                    🔗 Link: {report.content_link}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Summaries & Proof Section */}
          <div className="border-t pt-3 text-xs space-y-2">
            <div>
              <b className="text-navy dark:text-blue-400 block font-semibold">Key Achievement:</b>
              <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-2 rounded">
                {report.achievement}
              </p>
            </div>
            {report.challenges && (
              <div>
                <b className="text-rose-600 dark:text-rose-400 block font-semibold">Obstacles / Challenges:</b>
                <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-2 rounded">
                  {report.challenges}
                </p>
              </div>
            )}
            <div>
              <b className="text-zinc-500 block font-semibold">Tomorrow Plan:</b>
              <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-2 rounded italic">
                “{report.tomorrow_plan}”
              </p>
            </div>

            {/* Proofs Inline Gallery Previews */}
            {report.proof_urls && report.proof_urls.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <b className="text-zinc-500 dark:text-zinc-400 block text-xs font-semibold mb-2">
                  Uploaded Evidence ({report.proof_urls.length}):
                </b>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {report.proof_urls.map((url: string, index: number) => {
                    const lowerUrl = url.toLowerCase();
                    const isImage = lowerUrl.includes(".jpg") || 
                                    lowerUrl.includes(".jpeg") || 
                                    lowerUrl.includes(".png") || 
                                    lowerUrl.includes(".webp") ||
                                    lowerUrl.includes("gif");

                    return (
                      <div 
                        key={index} 
                        className="group relative border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900 flex flex-col justify-between shadow-sm"
                      >
                        {isImage ? (
                          <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                            <Image
                              src={url}
                              alt="Operational Proof"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="p-3 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 min-h-15">
                            <span className="text-xl">📄</span>
                            <div className="overflow-hidden">
                              <div className="font-medium text-[11px] truncate">Document Attachment</div>
                            </div>
                          </div>
                        )}
                        <div className="bg-zinc-100/80 dark:bg-zinc-800/80 p-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[11px]">
                          <span className="font-medium text-zinc-500">Evidence #{index + 1}</span>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            Open Original ↗
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold rounded-md text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Close View
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}