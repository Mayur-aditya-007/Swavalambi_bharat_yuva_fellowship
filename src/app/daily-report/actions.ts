"use server";

import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const dailyReportSchema = z.object({
  fellow_name: z.string().min(2, "Name is required"),
  whatsapp: z.string().min(10, "WhatsApp is required"),
  district: z.string().min(2, "District is required"),
  college_name: z.string().min(2, "College name is required"),
  report_date: z.string().min(1, "Date is required"),
  reporting_day: z.string().min(1, "Day is required"),
  work_types: z.array(z.string()).default([]),
  work_description: z.string().min(10, "Work description must be at least 10 characters"),

  entrepreneurs_contacted: z.coerce.number().default(0),
  students_contacted: z.coerce.number().default(0),
  field_visits: z.coerce.number().default(0),
  business_profiles: z.coerce.number().default(0),
  success_stories: z.coerce.number().default(0),
  schemes_studied: z.coerce.number().default(0),
  social_posts: z.coerce.number().default(0),
  meetings_attended: z.coerce.number().default(0),
  calls_followups: z.coerce.number().default(0),

  business_contacted: z.boolean().default(false),
  business_name: z.string().optional(),
  business_location: z.string().optional(),
  business_category: z.string().optional(),
  contact_person: z.string().optional(),
  contact_number: z.string().optional(),
  business_observation: z.string().optional(),

  government_scheme_work: z.boolean().default(false),
  scheme_name: z.string().optional(),
  scheme_category: z.string().optional(),
  scheme_work_types: z.array(z.string()).default([]),
  scheme_details: z.string().optional(),

  youth_outreach: z.boolean().default(false),
  institution_name: z.string().optional(),
  students_spoken: z.coerce.number().default(0),
  interested_students: z.coerce.number().default(0),
  startup_idea_found: z.boolean().default(false),
  startup_idea_details: z.string().optional(),

  social_media_work: z.boolean().default(false),
  post_count: z.coerce.number().default(0),
  reel_count: z.coerce.number().default(0),
  story_count: z.coerce.number().default(0),
  video_count: z.coerce.number().default(0),
  poster_count: z.coerce.number().default(0),
  content_topic: z.string().optional(),
  content_link: z.string().optional(),

  meeting_done: z.boolean().default(false),
  meeting_type: z.string().optional(),
  meeting_details: z.string().optional(),

  achievement: z.string().optional(),
  challenges: z.string().optional(),
  tomorrow_plan: z.string().min(5, "Tomorrow plan is required"),
});

export async function submitDailyReport(formData: FormData) {
  const data: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (key === "proof_files") return; // we handle files separately
    if (key.endsWith("[]")) {
      const realKey = key.replace("[]", "");
      if (!data[realKey]) data[realKey] = [];
      data[realKey].push(value);
    } else if (
      [
        "business_contacted",
        "government_scheme_work",
        "youth_outreach",
        "startup_idea_found",
        "social_media_work",
        "meeting_done"
      ].includes(key)
    ) {
      data[key] = value === "true" || value === "on";
    } else {
      data[key] = value;
    }
  });

  const parsed = dailyReportSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  // Handle file uploads
  const files = formData.getAll("proof_files") as File[];
  const proof_urls: string[] = [];

  for (const file of files) {
    if (file.size === 0) continue;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `proofs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('daily-report-proofs')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Supabase storage error:", uploadError);
      return { error: "Failed to upload file(s)." };
    }

    const { data: urlData } = supabase.storage
      .from('daily-report-proofs')
      .getPublicUrl(filePath);

    proof_urls.push(urlData.publicUrl);
  }

  const finalData = {
    ...parsed.data,
    proof_urls,
  };

  const { error } = await supabase.from("daily_reports").insert(finalData);

  if (error) {
    console.error("Supabase insert error:", error);
    return { error: "Failed to submit daily report. Please try again." };
  }

  redirect("/success");
}
