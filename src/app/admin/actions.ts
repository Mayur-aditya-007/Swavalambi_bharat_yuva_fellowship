"use server";

import { supabase } from "@/lib/supabase/client";

export async function getRegistrations() {
  const { data, error } = await supabase
    .from("fellowship_registrations")
    .select("*")
    .order("created_at", { ascending: false }); // Assumes you have a timestamp column

  if (error) {
    console.error("Error fetching admin view registrations:", error);
    throw new Error("Failed to fetch records.");
  }

  return data;
}