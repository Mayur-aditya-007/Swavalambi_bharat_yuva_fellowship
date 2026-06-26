"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Helper check to determine matching tab states
  const isRegistrationsActive = pathname === "/admin";
  const isReportsActive = pathname.startsWith("/admin/report");
  const isGalleryActive = pathname.startsWith("/admin/gallery");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Universal Sticky Top Admin Dashboard Switcher Panel */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        {/* UPDATED: flex-col on mobile for clean stacking, flex-row on sm and up */}
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:h-16 items-center justify-between py-3 sm:py-0 gap-3 sm:gap-4">
          
          {/* Logo Title Brand Box */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xl">🇮🇳</span>
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#0B3C5D] dark:text-blue-400 font-mono">
              SBA-YOUTHFELLOWSHIP
            </span>
          </div>

          {/* Interactive Navigation Control Segment Switcher */}
          {/* UPDATED: Added w-full sm:w-auto to scale cleanly on compact displays */}
          <nav className="flex items-center w-full sm:w-auto justify-between sm:justify-start p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-inner overflow-x-auto scrollbar-none">
            <Link
              href="/admin"
              className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 select-none whitespace-nowrap ${
                isRegistrationsActive
                  ? "bg-white dark:bg-zinc-950 text-[#0B3C5D] dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Registrations
            </Link>
            
            <Link
              href="/admin/reports"
              className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 select-none whitespace-nowrap ${
                isReportsActive
                  ? "bg-white dark:bg-zinc-950 text-[#0B3C5D] dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Reports
            </Link>
            
            <Link
              href="/admin/gallery"
              className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-150 select-none whitespace-nowrap ${
                isGalleryActive
                  ? "bg-white dark:bg-zinc-950 text-[#0B3C5D] dark:text-blue-400 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Gallery
            </Link>
          </nav>

        </div>
      </header>

      {/* Primary Workspace View Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}