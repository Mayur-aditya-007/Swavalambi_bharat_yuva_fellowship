"use client";

import React from "react";
import * as XLSX from "xlsx";

interface ExportReportsButtonProps {
  data: any[];
  text?: string;
}

export default function ExportReportsButton({ data, text = "Download Reports" }: ExportReportsButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No operational reports available to export!");
      return;
    }

    // Transform reporting data rows into clean, human-readable column sets
    const sanitizedData = data.map((record, index) => ({
      "S.No": index + 1,
      "Fellow Name": record.fellow_name,
      "WhatsApp": record.whatsapp,
      "District": record.district,
      "College/Institution": record.college_name,
      "Report Date": record.report_date,
      "Reporting Day": record.reporting_day,
      "Work Tasks Scope": Array.isArray(record.work_types) ? record.work_types.join(", ") : record.work_types,
      "Work Summary Details": record.work_description,
      
      // Output Metrics Data Stream
      "Entrepreneurs Contacted": record.entrepreneurs_contacted ?? 0,
      "Students Contacted": record.students_contacted ?? 0,
      "Field Visits Logged": record.field_visits ?? 0,
      "Business Profiles Built": record.business_profiles ?? 0,
      "Success Stories Found": record.success_stories ?? 0,
      "Gov Schemes Studied": record.schemes_studied ?? 0,
      "Social Posts Made": record.social_posts ?? 0,
      "Meetings Attended": record.meetings_attended ?? 0,
      "Calls & Follow-ups": record.calls_followups ?? 0,

      // Business Specific Columns
      "Interacted With Business?": record.business_contacted ? "Yes" : "No",
      "Business Name": record.business_name || "N/A",
      "Business Location": record.business_location || "N/A",
      "Business Category": record.business_category || "N/A",
      "Business Contact Person": record.contact_person || "N/A",
      "Business Contact Number": record.contact_number || "N/A",
      "Field Business Observation": record.business_observation || "N/A",

      // Government Schemes Work
      "Studied Gov Schemes?": record.government_scheme_work ? "Yes" : "No",
      "Target Scheme Name": record.scheme_name || "N/A",
      "Scheme Category": record.scheme_category || "N/A",
      "Scheme Work Mode": Array.isArray(record.scheme_work_types) ? record.scheme_work_types.join(", ") : record.scheme_work_types || "N/A",
      "Scheme Core Details": record.scheme_details || "N/A",

      // Academic Youth Outreach
      "Conducted Youth Outreach?": record.youth_outreach ? "Yes" : "No",
      "Outreach Institution Name": record.institution_name || "N/A",
      "Audited Students Count": record.students_spoken ?? 0,
      "Interested Students Count": record.interested_students ?? 0,
      "Startup Idea Identified?": record.startup_idea_found ? "Yes" : "No",
      "Startup Concept Details": record.startup_idea_details || "N/A",

      // Digital Media Assets Summary
      "Executed Social Work?": record.social_media_work ? "Yes" : "No",
      "Feed Post Count": record.post_count ?? 0,
      "Reel Track Count": record.reel_count ?? 0,
      "Story Count": record.story_count ?? 0,
      "Video Elements Produced": record.video_count ?? 0,
      "Poster Designs Built": record.poster_count ?? 0,
      "Content Campaign Topic": record.content_topic || "N/A",
      "Content Asset Live Link": record.content_link || "N/A",

      // Ground Meetings
      "Organized Official Meeting?": record.meeting_done ? "Yes" : "No",
      "Meeting Classification Type": record.meeting_type || "N/A",
      "Minutes of Meeting Details": record.meeting_details || "N/A",

      // Qualitative Meta Summary Blocks
      "Key Milestone Achievement": record.achievement,
      "Identified Bottleneck Challenges": record.challenges || "None",
      "Tomorrow Action Roadmap": record.tomorrow_plan,
      "Verification Evidence Proof URLs": Array.isArray(record.proof_urls) ? record.proof_urls.join(" | ") : record.proof_urls || "None Uploaded",
      "System Submission Timestamp": record.created_at ? new Date(record.created_at).toLocaleString() : "N/A",
    }));

    // Create Sheet and Workbook layout structures
    const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Operations Log");

    // Dynamic clean horizontal auto-sizing column formatting
    const maxProps = Object.keys(sanitizedData[0]);
    worksheet["!cols"] = maxProps.map((key) => {
      // Give descriptions, links, and text maps more space to breath than simple counter columns
      const longTextFields = ["Work Summary Details", "Key Milestone Achievement", "Tomorrow Action Roadmap", "Verification Evidence Proof URLs"];
      return { wch: longTextFields.includes(key) ? 40 : 22 };
    });

    // Execute Native System Download File Generation
    XLSX.writeFile(workbook, `Fellow_Daily_Reports_Ledger_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-colors dark:bg-emerald-700 dark:hover:bg-emerald-800 select-none"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {text}
    </button>
  );
}