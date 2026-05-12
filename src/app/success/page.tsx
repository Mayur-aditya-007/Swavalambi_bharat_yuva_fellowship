import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";

export const metadata = {
  title: "Success - Swavalambi Bharat Yuva Fellowship",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-center">
          <CheckCircle2Icon className="h-20 w-20 text-green-500" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Submitted Successfully
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Thank you for your submission. Your details have been recorded successfully.
          </p>
        </div>

        <div className="pt-6">
          <Button render={<Link href="/" />} nativeButton={false} size="lg" className="w-full">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
