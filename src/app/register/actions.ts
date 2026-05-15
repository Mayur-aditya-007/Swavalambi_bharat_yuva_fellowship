"use server";

import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { z } from "zod";

// Server-side validation schema matching your frontend rules
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
  organization_details: z.string().optional().or(z.literal("")),
  available_6_months: z.string().min(1, "Required"),
  weekly_time: z.string().optional().or(z.literal("")),
  available_time: z.array(z.string()).default([]),
  motivation: z.string().min(10, "Motivation is required"),
  district_opportunity: z.string().min(10, "Required"),
}).superRefine((data, ctx) => {
  // If user selected "Yes" to NSS/NCC connection, validation details are required
  if (data.nss_ncc_connected === "Yes" && (!data.organization_details || data.organization_details.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: ["organization_details"],
    });
  }

  // If user selected "Yes" to 6 months availability, time commitments are required
  if (data.available_6_months === "Yes") {
    if (!data.weekly_time || data.weekly_time.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["weekly_time"],
      });
    }
    if (!data.available_time || data.available_time.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["available_time"],
      });
    }
  }
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export async function submitRegistration(formData: FormData) {
  // Use ?? "" to catch missing or unrendered HTML form keys as clean strings
  const data = {
    full_name: formData.get("full_name") ?? "",
    whatsapp: formData.get("whatsapp") ?? "",
    email: formData.get("email") ?? "",
    dob: formData.get("dob") ?? "",
    gender: formData.get("gender") ?? "",
    address: formData.get("address") ?? "",
    district: formData.get("district") ?? "",
    state: formData.get("state") ?? "",
    qualification: formData.get("qualification") ?? "",
    college_name: formData.get("college_name") ?? "",
    course_stream: formData.get("course_stream") ?? "",
    year_semester: formData.get("year_semester") ?? "",
    computer_knowledge: formData.get("computer_knowledge") ?? "",
    social_media_knowledge: formData.get("social_media_knowledge") ?? "",
    work_interests: formData.getAll("work_interests"),
    nss_ncc_connected: formData.get("nss_ncc_connected") ?? "",
    organization_details: formData.get("organization_details") ?? "",
    available_6_months: formData.get("available_6_months") ?? "",
    weekly_time: formData.get("weekly_time") ?? "",
    available_time: formData.getAll("available_time"),
    motivation: formData.get("motivation") ?? "",
    district_opportunity: formData.get("district_opportunity") ?? "",
  };

  const parsed = registrationSchema.safeParse(data);

  if (!parsed.success) {
    console.error("Server Validation Failed:", parsed.error.flatten().fieldErrors);
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    const targetEmail = parsed.data.email.trim().toLowerCase();
    console.log(`Checking safely for duplicates: [${targetEmail}]`);

    // Fetch array data directly to safely bypass RLS or object cardinality checks
    const { data: existingRecords, error: fetchError } = await supabase
      .from("fellowship_registrations")
      .select("email")
      .eq("email", targetEmail);

    if (fetchError) {
      console.error("Supabase verification query failed:", fetchError);
      return { error: "Database verification failed. Please try again." };
    }

    // Check array volume. If records exist, trigger custom frontend modal handler
    if (existingRecords && existingRecords.length > 0) {
      console.log(`Duplicate found (${existingRecords.length} entries). Aborting insertion execution.`);
      return { error: "ALREADY_EXISTS" };
    }

    console.log("Email verification clear. Commencing data insertion...");
    
    const { error: insertError } = await supabase
      .from("fellowship_registrations")
      .insert([
        {
          ...parsed.data,
          email: targetEmail // Store the sanitized lowercase string
        }
      ]);

    if (insertError) {
      console.error("Supabase insertion target transaction failed:", insertError);
      return { error: "Failed to submit registration. Please try again." };
    }

  } catch (err) {
    console.error("Unexpected critical fallback error captured:", err);
    return { error: "An unexpected error occurred." };
  }

  redirect("/success");
}