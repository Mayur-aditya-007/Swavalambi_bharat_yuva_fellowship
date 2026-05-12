"use server";

import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const registrationSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  whatsapp: z.string().min(10, "Valid WhatsApp number is required"),
  email: z.string().email("Valid email is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(5, "Address is required"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  qualification: z.string().min(2, "Qualification is required"),
  college_name: z.string().min(2, "College name is required"),
  course_stream: z.string().min(2, "Course stream is required"),
  year_semester: z.string().min(1, "Year/Semester is required"),
  computer_knowledge: z.string().min(1, "Required"),
  social_media_knowledge: z.string().min(1, "Required"),
  work_interests: z.array(z.string()).default([]),
  nss_ncc_connected: z.string().min(1, "Required"),
  organization_details: z.string().optional(),
  available_6_months: z.string().min(1, "Required"),
  weekly_time: z.string().min(1, "Required"),
  available_time: z.array(z.string()).default([]),
  motivation: z.string().min(10, "Motivation is required"),
  district_opportunity: z.string().optional(),
});

export async function submitRegistration(formData: FormData) {
  const data = {
    full_name: formData.get("full_name"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    dob: formData.get("dob"),
    gender: formData.get("gender"),
    address: formData.get("address"),
    district: formData.get("district"),
    state: formData.get("state"),
    qualification: formData.get("qualification"),
    college_name: formData.get("college_name"),
    course_stream: formData.get("course_stream"),
    year_semester: formData.get("year_semester"),
    computer_knowledge: formData.get("computer_knowledge"),
    social_media_knowledge: formData.get("social_media_knowledge"),
    work_interests: formData.getAll("work_interests"),
    nss_ncc_connected: formData.get("nss_ncc_connected"),
    organization_details: formData.get("organization_details"),
    available_6_months: formData.get("available_6_months"),
    weekly_time: formData.get("weekly_time"),
    available_time: formData.getAll("available_time"),
    motivation: formData.get("motivation"),
    district_opportunity: formData.get("district_opportunity"),
  };

  const parsed = registrationSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from("fellowship_registrations")
    .insert(parsed.data);

  if (error) {
    console.error("Supabase insert error:", error);
    return { error: "Failed to submit registration. Please try again." };
  }

  redirect("/success");
}
