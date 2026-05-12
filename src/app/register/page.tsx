import { RegistrationForm } from "@/components/registration-form";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const metadata = {
  title: "Register - Swavalambi Bharat Yuva Fellowship",
  description: "Apply for the Swavalambi Bharat Yuva Fellowship",
};

export default async function RegisterPage() {
  const { dict } = await getDictionary();

  return (
    <div className="min-h-screen bg-[#FEF5EB] dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B3C5D] dark:text-blue-400">
            {dict.register.pageTitle}
          </h1>
          <div className="w-16 h-1 bg-[#E67E22] mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto text-lg text-zinc-700 dark:text-zinc-300">
            {dict.register.pageSubtitle}
          </p>
        </div>
        
        <div className="bg-transparent">
          <RegistrationForm dict={dict} />
        </div>
      </div>
    </div>
  );
}
