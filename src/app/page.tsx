import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Home() {
  const { dict } = await getDictionary();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section: "The Call to Nation" */}
      <section className="w-full bg-[#FEF5EB] dark:bg-[#111827] relative border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-[#E67E22] bg-[#E67E22]/10 ring-1 ring-inset ring-[#E67E22]/20">
                {dict.home.officialTag}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                {dict.home.titlePart1}
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-[#0B3C5D] dark:text-blue-400">{dict.home.titlePart2}</span>
                  {/* Subtle Saffron underline */}
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#E67E22]/80 -skew-x-12 z-0"></span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl font-medium mt-6">
                {dict.home.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button render={<Link href="/register" />} size="lg" className="w-full sm:w-auto font-medium text-lg h-14 px-8 bg-[#E67E22] hover:bg-[#D6741E] text-white shadow-md">
                {dict.home.applyNow}
              </Button>
              <Button render={<Link href="/daily-report" />} variant="outline" size="lg" className="w-full sm:w-auto font-medium text-lg h-14 px-8 border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-[#111827]">
                {dict.home.submitReport}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-zinc-900/10">
            <Image 
              src="/hero-image.png" 
              alt="Indian youth engaged in a community discussion" 
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* The "Impact Grid" */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B3C5D] dark:text-blue-400">{dict.home.pillarsTitle}</h2>
            <div className="w-24 h-1 bg-[#E67E22] mx-auto rounded-full"></div>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {dict.home.pillarsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Saffron Card - Self-Reliance */}
            <Card className="border-0 shadow-sm border-l-4 border-l-[#E67E22] bg-[#FEF5EB]/50 dark:bg-zinc-900 overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-[#E67E22]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#E67E22]" />
                </div>
                <CardTitle className="text-xl">{dict.home.pillar1Title}</CardTitle>
                <CardDescription className="text-base">{dict.home.pillar1Sub}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {dict.home.pillar1Desc}
                </p>
              </CardContent>
            </Card>

            {/* Green Card - Community */}
            <Card className="border-0 shadow-sm border-l-4 border-l-[#27AE60] bg-[#FEF5EB]/50 dark:bg-zinc-900 overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-[#27AE60]/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-[#27AE60]" />
                </div>
                <CardTitle className="text-xl">{dict.home.pillar2Title}</CardTitle>
                <CardDescription className="text-base">{dict.home.pillar2Sub}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {dict.home.pillar2Desc}
                </p>
              </CardContent>
            </Card>

            {/* Navy Card - Entrepreneurship */}
            <Card className="border-0 shadow-sm border-l-4 border-l-[#0B3C5D] bg-[#FEF5EB]/50 dark:bg-zinc-900 overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-[#0B3C5D]/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-[#0B3C5D] dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">{dict.home.pillar3Title}</CardTitle>
                <CardDescription className="text-base">{dict.home.pillar3Sub}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {dict.home.pillar3Desc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-[#0B3C5D] text-white/80 text-center text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-medium text-white mb-2">{dict.home.footerText}</p>
          <p className="text-white/60">{dict.home.footerRights}</p>
        </div>
      </footer>
    </div>
  );
}
