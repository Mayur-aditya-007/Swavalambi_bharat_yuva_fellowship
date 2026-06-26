import { getDailyReports } from "./actions";
import ExportReportsButton from "@/components/ExportReportsButton"; 
import ReportDetailModal from "@/components/ReportDetailModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DailyReportRecord {
  id: string;
  fellow_name?: string;
  district?: string;
  whatsapp?: string;
  report_date?: string;
  reporting_day?: string;
  college_name?: string;
  work_description?: string;
  work_types?: string[] | string;
  entrepreneurs_contacted?: number;
  students_contacted?: number;
  field_visits?: number;
  business_profiles?: number;
}

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
        
        {/* Dynamic New Reports Exporter Component */}
        <ExportReportsButton data={reports} text="Download Reports" />
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
      <Card className="border-t-4 border-t-navy bg-white dark:bg-zinc-900 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy dark:text-blue-400">
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
                  reports.map((report: DailyReportRecord) => (
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
                      <td className="p-4 text-zinc-600 dark:text-zinc-400 max-w-60">
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

                      {/* Clean Isolated Client-Safe Inspector Component */}
                      <td className="p-4 text-center">
                        <ReportDetailModal report={report} />
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