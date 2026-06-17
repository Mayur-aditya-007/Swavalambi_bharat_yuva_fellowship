"use server";

import { supabase } from "@/lib/supabase/client";

export async function getDailyReports() {
  const { data, error } = await supabase
    .from("daily_reports")
    .select("*")
    .order("report_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin view daily reports:", error);
    throw new Error("Failed to fetch operational reports.");
  }

  return data;
}