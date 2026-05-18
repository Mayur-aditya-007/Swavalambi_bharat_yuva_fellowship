import { getRegistrations } from "./actions";
import ExportButton from "@/components/ExportButton"; // Adjust path if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const records = await getRegistrations();

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Administration Console
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Manage system profiles, application vectors, and operational forms.
          </p>
        </div>
        
        {/* Excel Downloader Client Component Injection */}
        <ExportButton data={records} />
      </div>

      <Card className="border-t-4 border-t-[#0B3C5D] bg-white dark:bg-zinc-900 shadow-md">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-[#0B3C5D] dark:text-blue-400">
              Fellowship Registrations Portal
            </CardTitle>
            <CardDescription>
              Total Applications Received:{" "}
              <span className="font-semibold text-zinc-900 dark:text-white">
                {records?.length ?? 0}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[#FEF5EB]/50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                <tr>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Academic Background</th>
                  <th className="p-4">Commitment</th>
                  <th className="p-4 text-center">Extended Fields</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {!records || records.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500">
                      No registrations found yet.
                    </td>
                  </tr>
                ) : (
                  records.map((user: any) => (
                    <tr
                      key={user.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* Name */}
                      <td className="p-4 font-medium text-zinc-900 dark:text-white">
                        <div>{user.full_name}</div>
                        <span className="text-xs text-zinc-400 font-normal">{user.gender} | {user.dob}</span>
                      </td>

                      {/* Contact Info */}
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">
                        <div className="font-mono text-xs">{user.email}</div>
                        <div className="text-xs text-zinc-500">WA: {user.whatsapp}</div>
                      </td>

                      {/* Location */}
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">
                        <div className="font-medium text-zinc-800 dark:text-zinc-200">{user.district}</div>
                        <div className="text-xs text-zinc-400 truncate max-w-[150px]" title={user.address}>{user.state}</div>
                      </td>

                      {/* Education */}
                      <td className="p-4 text-zinc-600 dark:text-zinc-400 max-w-[220px]">
                        <div className="truncate font-medium text-zinc-800 dark:text-zinc-200" title={user.college_name}>
                          {user.college_name}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">
                          {user.qualification} • {user.course_stream} ({user.year_semester})
                        </div>
                      </td>

                      {/* Time Commitment Status Badge */}
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.available_6_months === "Yes"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {user.available_6_months === "Yes"
                            ? `Yes (${user.weekly_time || "Flexible"})`
                            : "No"}
                        </span>
                      </td>

                      {/* Core database field modal pop-up fallback using simple HTML details summary */}
                      <td className="p-4 text-center">
                        <details className="relative inline-block text-left group">
                          <summary className="list-none outline-none cursor-pointer px-3 py-1 text-xs font-semibold rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 select-none">
                            View Form Info
                          </summary>
                          <div className="absolute right-0 mt-2 w-[340px] sm:w-[480px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-5 text-left text-zinc-800 dark:text-zinc-200 space-y-4 max-h-[450px] overflow-y-auto">
                            <h4 className="font-bold text-base border-b pb-2 text-[#0B3C5D] dark:text-blue-400">
                              Detailed Record Inspector
                            </h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div><b className="text-zinc-400 block">Address:</b> {user.address}</div>
                              <div><b className="text-zinc-400 block">Computer Skill Level:</b> {user.computer_knowledge}</div>
                              <div><b className="text-zinc-400 block">Social Media Skill:</b> {user.social_media_knowledge}</div>
                              <div><b className="text-zinc-400 block">NSS/NCC Active:</b> {user.nss_ncc_connected}</div>
                              {user.nss_ncc_connected === "Yes" && (
                                <div className="sm:col-span-2"><b className="text-zinc-400 block">Organization Details:</b> {user.organization_details}</div>
                              )}
                              <div className="sm:col-span-2">
                                <b className="text-zinc-400 block">Identified Work Interests:</b> 
                                <span className="inline-block mt-1 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-[11px] w-full">
                                  {Array.isArray(user.work_interests) ? user.work_interests.join(", ") : String(user.work_interests)}
                                </span>
                              </div>
                              <div className="sm:col-span-2">
                                <b className="text-zinc-400 block">Preferred Slots:</b> 
                                <span className="inline-block mt-1 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded font-mono text-[11px] w-full">
                                  {Array.isArray(user.available_time) ? user.available_time.join(", ") : String(user.available_time || "None Specified")}
                                </span>
                              </div>
                            </div>

                            <div className="border-t pt-3 text-xs space-y-2">
                              <div>
                                <b className="text-[#0B3C5D] dark:text-blue-400 block font-semibold">Statement of Motivation:</b>
                                <p className="mt-1 text-zinc-600 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded border border-dashed">
                                  "{user.motivation}"
                                </p>
                              </div>
                              <div>
                                <b className="text-[#0B3C5D] dark:text-blue-400 block font-semibold">District Development Target Ideas:</b>
                                <p className="mt-1 text-zinc-600 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded border border-dashed">
                                  "{user.district_opportunity}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </details>
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