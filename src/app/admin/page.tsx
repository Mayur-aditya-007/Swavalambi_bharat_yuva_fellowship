import { getRegistrations } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic"; // Ensures your data updates on every page refresh

export default async function AdminDashboard() {
  const records = await getRegistrations();

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <Card className="border-t-4 border-t-[#0B3C5D] bg-white dark:bg-zinc-900 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0B3C5D] dark:text-blue-400">
            Fellowship Registrations Portal
          </CardTitle>
          <CardDescription>
            Total Applications Received: <span className="font-semibold text-zinc-900 dark:text-white">{records.length}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[#FEF5EB]/50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                <tr>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">WhatsApp</th>
                  <th className="p-4">State & District</th>
                  <th className="p-4">College</th>
                  <th className="p-4">Commitment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-500">
                      No registrations found yet.
                    </td>
                  </tr>
                ) : (
                  records.map((user: any) => (
                    <tr key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="p-4 font-medium text-zinc-900 dark:text-white">{user.full_name}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{user.email}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">{user.whatsapp}</td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">
                        {user.district}, {user.state}
                      </td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400 max-w-[200px] truncate" title={user.college_name}>
                        {user.college_name}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.available_6_months === "Yes" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                          {user.available_6_months === "Yes" ? `Yes (${user.weekly_time})` : "No"}
                        </span>
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