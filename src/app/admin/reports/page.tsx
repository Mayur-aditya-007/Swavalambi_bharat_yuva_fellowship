import { getDailyReports } from "./actions";
import ExportButton from "@/components/ExportButton"; // Adjust path if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminReportDashboard() {
  const reports = await getDailyReports();

  // Aggregate aggregate metrics for quick review cards
  const totalReports = reports?.length ?? 0;
  const totalEntrepreneurs = reports?.reduce((acc, r) => acc + (r.entrepreneurs_contacted || 0), 0) ?? 0;
  const totalStudents = reports?.reduce((acc, r) => acc + (r.students_contacted || 0), 0) ?? 0;
  const totalVisits = reports?.reduce((acc, r) => acc + (r.field_visits || 0), 0) ?? 0;

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Operational Reporting Console
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Monitor daily metrics, field milestones, and real-time impact metrics from active fellows.
          </p>
        </div>
        <ExportButton data={reports} />
      </div>

      {/* Aggregate Metric Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Reports Submitted</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{totalReports}</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Entrepreneurs Contacted</span>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalEntrepreneurs}</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Students Reached</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalStudents}</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Field Visits</span>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{totalVisits}</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-t-4 border-t-[#0B3C5D] bg-white dark:bg-zinc-900 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0B3C5D] dark:text-blue-400">
            Fellow Daily Activity Ledger
          </CardTitle>
          <CardDescription>
            Chronological log of ground tasks, outreach, and proof records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[#FEF5EB]/50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                <tr>
                  <th className="p-4">Fellow Details</th>
                  <th className="p-4">Reporting Timeline</th>
                  <th className="p-4">Work Scope</th>
                  <th className="p-4">Core Output Metrics</th>
                  <th className="p-4 text-center">Detailed Record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {!reports || reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                      No daily reports recorded yet.
                    </td>
                  </tr>
                ) : (
                  reports.map((report: any) => (
                    <tr
                      key={report.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* Fellow Details */}
                      <td className="p-4 font-medium text-zinc-900 dark:text-white">
                        <div>{report.fellow_name}</div>
                        <div className="text-xs text-zinc-400 font-normal mt-0.5">{report.district}</div>
                        <div className="text-xs text-zinc-500 font-mono font-normal">WA: {report.whatsapp}</div>
                      </td>

                      {/* Reporting Timeline */}
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">
                        <div className="font-semibold">{report.report_date}</div>
                        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">
                          {report.reporting_day}
                        </span>
                      </td>

                      {/* Work Scope */}
                      <td className="p-4 text-zinc-600 dark:text-zinc-400 max-w-[240px]">
                        <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate" title={report.college_name}>
                          {report.college_name}
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-1" title={report.work_description}>
                          {report.work_description}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Array.isArray(report.work_types) && report.work_types.map((type: string, idx: number) => (
                            <span key={idx} className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Core Output Metrics Status Grid */}
                      <td className="p-4 text-xs">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-600 dark:text-zinc-400">
                          <div>💼 Entrepreneurs: <span className="font-semibold text-zinc-900 dark:text-white">{report.entrepreneurs_contacted ?? 0}</span></div>
                          <div>🎓 Students: <span className="font-semibold text-zinc-900 dark:text-white">{report.students_contacted ?? 0}</span></div>
                          <div>📍 Field Visits: <span className="font-semibold text-zinc-900 dark:text-white">{report.field_visits ?? 0}</span></div>
                          <div>📊 Profiles: <span className="font-semibold text-zinc-900 dark:text-white">{report.business_profiles ?? 0}</span></div>
                        </div>
                      </td>

                      {/* Detailed Record Pop-Up Modal Component using HTML Summary Details */}
                      <td className="p-4 text-center">
                        <details className="relative inline-block text-left group">
                          <summary className="list-none outline-none cursor-pointer px-3 py-1 text-xs font-semibold rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 select-none">
                            View All Details
                          </summary>
                          <div className="absolute right-0 mt-2 w-[340px] sm:w-[540px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-5 text-left text-zinc-800 dark:text-zinc-200 space-y-4 max-h-[480px] overflow-y-auto">
                            <h4 className="font-bold text-base border-b pb-2 text-[#0B3C5D] dark:text-blue-400 flex justify-between items-center">
                              <span>Metric Inspector Portfolio</span>
                              <span className="text-xs font-mono font-normal text-zinc-400">{report.report_date}</span>
                            </h4>

                            {/* Additional Metric Counter Indicators */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg">
                              <div><span className="block text-zinc-400">Success Stories</span><b>{report.success_stories ?? 0}</b></div>
                              <div><span className="block text-zinc-400">Schemes Studied</span><b>{report.schemes_studied ?? 0}</b></div>
                              <div><span className="block text-zinc-400">Social Posts</span><b>{report.social_posts ?? 0}</b></div>
                              <div><span className="block text-zinc-400">Meetings</span><b>{report.meetings_attended ?? 0}</b></div>
                            </div>

                            {/* Conditional segments based on what field forms were answered */}
                            <div className="space-y-3 text-xs">
                              {/* 1. Business Section */}
                              {report.business_contacted && (
                                <div className="p-2.5 rounded border border-emerald-100 bg-emerald-50/20 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                                  <h5 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">🏢 Business Interactivity Profile</h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                                    <div><b>Name:</b> {report.business_name || "N/A"}</div>
                                    <div><b>Category:</b> {report.business_category || "N/A"}</div>
                                    <div><b>Contact Person:</b> {report.contact_person} ({report.contact_number || "N/A"})</div>
                                    <div className="sm:col-span-2"><b>Observations:</b> {report.business_observation}</div>
                                  </div>
                                </div>
                              )}

                              {/* 2. Government Schemes Section */}
                              {report.government_scheme_work && (
                                <div className="p-2.5 rounded border border-blue-100 bg-blue-50/20 dark:border-blue-900/30 dark:bg-blue-950/10">
                                  <h5 className="font-bold text-blue-800 dark:text-blue-400 mb-1">🏛️ Government Scheme Portfolio</h5>
                                  <div className="text-[11px] space-y-1">
                                    <div><b>Scheme Target:</b> {report.scheme_name} ({report.scheme_category})</div>
                                    <div><b>Actions Taken:</b> {Array.isArray(report.scheme_work_types) ? report.scheme_work_types.join(", ") : String(report.scheme_work_types)}</div>
                                    <div><b>Details:</b> {report.scheme_details}</div>
                                  </div>
                                </div>
                              )}

                              {/* 3. Youth Outreach Section */}
                              {report.youth_outreach && (
                                <div className="p-2.5 rounded border border-amber-100 bg-amber-50/20 dark:border-amber-900/30 dark:bg-amber-950/10">
                                  <h5 className="font-bold text-amber-800 dark:text-amber-400 mb-1">🎓 Academic & Youth Outreach</h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                                    <div className="sm:col-span-2"><b>Institution:</b> {report.institution_name}</div>
                                    <div><b>Students Audited:</b> {report.students_spoken}</div>
                                    <div><b>Interested Targets:</b> {report.interested_students}</div>
                                    {report.startup_idea_found && (
                                      <div className="sm:col-span-2 mt-1 bg-white dark:bg-zinc-900 p-1.5 rounded border">
                                        <b className="text-amber-600 block">💡 Found Startup Concept:</b>
                                        {report.startup_idea_details}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* 4. Social Media Metrics Breakdown */}
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

                            {/* Qualitative Operational Summary Text blocks */}
                            <div className="border-t pt-3 text-xs space-y-2">
                              <div>
                                <b className="text-[#0B3C5D] dark:text-blue-400 block font-semibold">Key Achievement of the Day:</b>
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
                                <b className="text-zinc-500 block font-semibold">Target Action Blueprint for Tomorrow:</b>
                                <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 p-2 rounded italic">
                                  "{report.tomorrow_plan}"
                                </p>
                              </div>

                              {/* Proofs Files Attached URLs */}
                              {report.proof_urls && report.proof_urls.length > 0 && (
                                <div className="pt-1">
                                  <b className="text-zinc-400 block mb-1">Uploaded Operational Evidence ({report.proof_urls.length}):</b>
                                  <div className="flex flex-col gap-1">
                                    {report.proof_urls.map((url: string, index: number) => (
                                      <a
                                        key={index}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 dark:text-blue-400 underline hover:text-blue-800 truncate block"
                                      >
                                        Evidence Document #{index + 1}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
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