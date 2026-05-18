"use client";

import React from "react";
import * as XLSX from "xlsx";

interface ExportButtonProps {
  data: any[];
}

export default function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No records available to export!");
      return;
    }

    // Transform data maps to create cleaner columns headers in Excel
    const sanitizedData = data.map((record, index) => ({
      "S.No": index + 1,
      "Full Name": record.full_name,
      "WhatsApp Number": record.whatsapp,
      "Email Address": record.email,
      "Date of Birth": record.dob,
      "Gender": record.gender,
      "Full Address": record.address,
      "District": record.district,
      "State": record.state,
      "Qualification": record.qualification,
      "College Name": record.college_name,
      "Course/Stream": record.course_stream,
      "Year/Semester": record.year_semester,
      "Computer Knowledge": record.computer_knowledge,
      "Social Media Knowledge": record.social_media_knowledge,
      "Work Interests": Array.isArray(record.work_interests) ? record.work_interests.join(", ") : record.work_interests,
      "NSS/NCC Connected": record.nss_ncc_connected,
      "Organization Details": record.organization_details || "N/A",
      "Available 6 Months": record.available_6_months,
      "Weekly Time Commitment": record.weekly_time || "N/A",
      "Available Slots": Array.isArray(record.available_time) ? record.available_time.join(", ") : record.available_time,
      "Motivation Statement": record.motivation,
      "District Opportunity Ideas": record.district_opportunity,
      "Submission Date": record.created_at ? new Date(record.created_at).toLocaleDateString() : "N/A",
    }));

    // Generate worksheet and workbook structures
    const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Auto-adjust column widths so data is easily readable in Excel
    const maxProps = Object.keys(sanitizedData[0]);
    worksheet["!cols"] = maxProps.map(() => ({ wch: 22 }));

    // Execute Download
    XLSX.writeFile(workbook, `Fellowship_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition-colors dark:bg-emerald-700 dark:hover:bg-emerald-800"
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
      Download Excel Database
    </button>
  );
}