"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitDailyReport } from "@/app/daily-report/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const dailyReportSchema = z.object({
  fellow_name: z.string().min(2, "Required"),
  whatsapp: z.string().min(10, "Required"),
  district: z.string().min(2, "Required"),
  college_name: z.string().min(2, "Required"),
  report_date: z.string().min(1, "Required"),
  reporting_day: z.string().min(1, "Required"),
  work_types: z.array(z.string()).min(1, "Required"),
  work_description: z.string().min(10, "Required"),

  entrepreneurs_contacted: z.coerce.number().default(0),
  students_contacted: z.coerce.number().default(0),
  field_visits: z.coerce.number().default(0),
  business_profiles: z.coerce.number().default(0),
  success_stories: z.coerce.number().default(0),
  schemes_studied: z.coerce.number().default(0),
  social_posts: z.coerce.number().default(0),
  meetings_attended: z.coerce.number().default(0),
  calls_followups: z.coerce.number().default(0),

  business_contacted: z.boolean().default(false),
  business_name: z.string().optional(),
  business_location: z.string().optional(),
  business_category: z.string().optional(),
  contact_person: z.string().optional(),
  contact_number: z.string().optional(),
  business_observation: z.string().optional(),

  government_scheme_work: z.boolean().default(false),
  scheme_name: z.string().optional(),
  scheme_category: z.string().optional(),
  scheme_work_types: z.array(z.string()).default([]),
  scheme_details: z.string().optional(),

  youth_outreach: z.boolean().default(false),
  institution_name: z.string().optional(),
  students_spoken: z.coerce.number().default(0),
  interested_students: z.coerce.number().default(0),
  startup_idea_found: z.boolean().default(false),
  startup_idea_details: z.string().optional(),

  social_media_work: z.boolean().default(false),
  post_count: z.coerce.number().default(0),
  reel_count: z.coerce.number().default(0),
  story_count: z.coerce.number().default(0),
  video_count: z.coerce.number().default(0),
  poster_count: z.coerce.number().default(0),
  content_topic: z.string().optional(),
  content_link: z.string().optional(),

  meeting_done: z.boolean().default(false),
  meeting_type: z.string().optional(),
  meeting_details: z.string().optional(),

  achievement: z.string().optional(),
  challenges: z.string().optional(),
  tomorrow_plan: z.string().min(5, "Required"),
});

type FormData = z.infer<typeof dailyReportSchema>;

const WORK_TYPES = [
  "Local Business Mapping",
  "Success Story Documentation",
  "Government Scheme Research",
  "College & Youth Outreach",
  "Social Media Promotion",
  "Networking/Meeting",
];

export function DailyReportForm({ dict }: { dict: Dictionary }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dailyReportSchema),
    defaultValues: {
      work_types: [],
      scheme_work_types: [],
      business_contacted: false,
      government_scheme_work: false,
      youth_outreach: false,
      social_media_work: false,
      meeting_done: false,
    },
  });

  const watchBusinessContacted = watch("business_contacted");
  const watchGovernmentScheme = watch("government_scheme_work");
  const watchYouthOutreach = watch("youth_outreach");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormData) => {
    setServerError(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      files.forEach((file) => {
        formData.append("proof_files", file);
      });

      const result = await submitDailyReport(formData);
      if (result?.error) {
        setServerError(typeof result.error === "string" ? result.error : "Validation failed.");
      }
    });
  };

  const onError = (errors: any) => {
    const errorFields = Object.keys(errors).map(field => field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    setServerError(`Please fix the errors in the following fields: ${errorFields.join(", ")}`);
    
    const firstError = document.querySelector('.text-destructive');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
      {serverError && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm font-medium">
          {serverError}
        </div>
      )}

      {/* 1. Basic Details */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.dailyReport.section1Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fellow_name" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.fellowName}</Label>
              <Input id="fellow_name" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("fellow_name")} />
              {errors.fellow_name && <p className="text-sm text-destructive">{errors.fellow_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.whatsapp}</Label>
              <Input id="whatsapp" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("whatsapp")} />
              {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.district}</Label>
              <Input id="district" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("district")} />
              {errors.district && <p className="text-sm text-destructive">{errors.district.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="college_name" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.collegeName}</Label>
              <Input id="college_name" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("college_name")} />
              {errors.college_name && <p className="text-sm text-destructive">{errors.college_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="report_date" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.reportDate}</Label>
              <Input id="report_date" type="date" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("report_date")} />
              {errors.report_date && <p className="text-sm text-destructive">{errors.report_date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.reportingDay}</Label>
              <Controller
                control={control}
                name="reporting_day"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? null}>
                    <SelectTrigger className="bg-[#FEF5EB]/30 w-full h-12 text-base">
                      <SelectValue placeholder={dict.dailyReport.selectDay} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday / सोमवार</SelectItem>
                      <SelectItem value="Tuesday">Tuesday / मंगलवार</SelectItem>
                      <SelectItem value="Wednesday">Wednesday / बुधवार</SelectItem>
                      <SelectItem value="Thursday">Thursday / गुरुवार</SelectItem>
                      <SelectItem value="Friday">Friday / शुक्रवार</SelectItem>
                      <SelectItem value="Saturday">Saturday / शनिवार</SelectItem>
                      <SelectItem value="Sunday">Sunday / रविवार</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Work Type */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.dailyReport.section2Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.workType}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#FEF5EB]/30 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {WORK_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-3">
                  <Controller
                    control={control}
                    name="work_types"
                    render={({ field }) => (
                      <Checkbox
                        id={`type-${type}`}
                        className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]"
                        checked={field.value?.includes(type)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          const updated = checked
                            ? [...current, type]
                            : current.filter((v) => v !== type);
                          field.onChange(updated);
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={`type-${type}`} className="font-medium cursor-pointer text-base">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="work_description" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.workDesc}</Label>
            <Textarea 
              id="work_description" 
              className="bg-[#FEF5EB]/30 text-base resize-none min-h-[100px]"
              {...register("work_description")} 
            />
            {errors.work_description && <p className="text-sm text-destructive">{errors.work_description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* 3. Output Metrics */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.dailyReport.section3Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.entrepreneursContacted}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("entrepreneurs_contacted")} />
              {errors.entrepreneurs_contacted && <p className="text-sm text-destructive">{errors.entrepreneurs_contacted.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.studentsContacted}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("students_contacted")} />
              {errors.students_contacted && <p className="text-sm text-destructive">{errors.students_contacted.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.fieldVisits}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("field_visits")} />
              {errors.field_visits && <p className="text-sm text-destructive">{errors.field_visits.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.businessProfiles}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("business_profiles")} />
              {errors.business_profiles && <p className="text-sm text-destructive">{errors.business_profiles.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.successStories}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("success_stories")} />
              {errors.success_stories && <p className="text-sm text-destructive">{errors.success_stories.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.schemesStudied}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("schemes_studied")} />
              {errors.schemes_studied && <p className="text-sm text-destructive">{errors.schemes_studied.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.socialPosts}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("social_posts")} />
              {errors.social_posts && <p className="text-sm text-destructive">{errors.social_posts.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.meetingsAttended}</Label>
              <Input type="number" min="0" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("meetings_attended")} />
              {errors.meetings_attended && <p className="text-sm text-destructive">{errors.meetings_attended.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Conditional Sections */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.dailyReport.section4Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-6 bg-[#FEF5EB]/20 dark:bg-zinc-900/50 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <Controller
                control={control}
                name="business_contacted"
                render={({ field }) => (
                  <Checkbox id="business_contacted" checked={field.value} onCheckedChange={field.onChange} className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]" />
                )}
              />
              <Label htmlFor="business_contacted" className="font-semibold text-base">{dict.dailyReport.didBusinessContact}</Label>
            </div>
            {watchBusinessContacted && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 border-l-2 border-[#E67E22]/30">
                <Input placeholder={dict.dailyReport.businessName} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("business_name")} />
              {errors.business_name && <p className="text-sm text-destructive">{errors.business_name.message}</p>}
                <Input placeholder={dict.dailyReport.location} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("business_location")} />
              {errors.business_location && <p className="text-sm text-destructive">{errors.business_location.message}</p>}
                <Input placeholder={dict.dailyReport.category} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("business_category")} />
              {errors.business_category && <p className="text-sm text-destructive">{errors.business_category.message}</p>}
                <Input placeholder={dict.dailyReport.contactPerson} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("contact_person")} />
              {errors.contact_person && <p className="text-sm text-destructive">{errors.contact_person.message}</p>}
                <Input placeholder={dict.dailyReport.contactNumber} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("contact_number")} />
              {errors.contact_number && <p className="text-sm text-destructive">{errors.contact_number.message}</p>}
                <Textarea placeholder={dict.dailyReport.observation} className="md:col-span-2 bg-[#FEF5EB]/50 text-base" {...register("business_observation")} />
              {errors.business_observation && <p className="text-sm text-destructive">{errors.business_observation.message}</p>}
              </div>
            )}
          </div>

          <div className="space-y-6 bg-[#FEF5EB]/20 dark:bg-zinc-900/50 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <Controller
                control={control}
                name="government_scheme_work"
                render={({ field }) => (
                  <Checkbox id="government_scheme_work" checked={field.value} onCheckedChange={field.onChange} className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]" />
                )}
              />
              <Label htmlFor="government_scheme_work" className="font-semibold text-base">{dict.dailyReport.didSchemeWork}</Label>
            </div>
            {watchGovernmentScheme && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 border-l-2 border-[#E67E22]/30">
                <Input placeholder={dict.dailyReport.schemeName} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("scheme_name")} />
              {errors.scheme_name && <p className="text-sm text-destructive">{errors.scheme_name.message}</p>}
                <Textarea placeholder={dict.dailyReport.schemeDetails} className="md:col-span-2 bg-[#FEF5EB]/50 text-base" {...register("scheme_details")} />
              {errors.scheme_details && <p className="text-sm text-destructive">{errors.scheme_details.message}</p>}
              </div>
            )}
          </div>

          <div className="space-y-6 bg-[#FEF5EB]/20 dark:bg-zinc-900/50 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center space-x-3">
              <Controller
                control={control}
                name="youth_outreach"
                render={({ field }) => (
                  <Checkbox id="youth_outreach" checked={field.value} onCheckedChange={field.onChange} className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]" />
                )}
              />
              <Label htmlFor="youth_outreach" className="font-semibold text-base">{dict.dailyReport.didYouthOutreach}</Label>
            </div>
            {watchYouthOutreach && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 border-l-2 border-[#E67E22]/30">
                <Input placeholder={dict.dailyReport.institutionName} className="bg-[#FEF5EB]/50 h-12 text-base" {...register("institution_name")} />
              {errors.institution_name && <p className="text-sm text-destructive">{errors.institution_name.message}</p>}
                <div className="space-y-2">
                  <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.studentsSpoken}</Label>
                  <Input type="number" min="0" className="bg-[#FEF5EB]/50 h-12 text-base" {...register("students_spoken")} />
              {errors.students_spoken && <p className="text-sm text-destructive">{errors.students_spoken.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.interestedStudents}</Label>
                  <Input type="number" min="0" className="bg-[#FEF5EB]/50 h-12 text-base" {...register("interested_students")} />
              {errors.interested_students && <p className="text-sm text-destructive">{errors.interested_students.message}</p>}
                </div>
                <div className="md:col-span-2 flex items-center space-x-3 mt-4">
                  <Controller
                    control={control}
                    name="startup_idea_found"
                    render={({ field }) => (
                      <Checkbox id="startup_idea_found" checked={field.value} onCheckedChange={field.onChange} className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]" />
                    )}
                  />
                  <Label htmlFor="startup_idea_found" className="text-base">{dict.dailyReport.didStartupIdea}</Label>
                </div>
                {watch("startup_idea_found") && (
                  <>
                    <Textarea placeholder={dict.dailyReport.startupDetails} className="md:col-span-2 bg-[#FEF5EB]/50 text-base" {...register("startup_idea_details")} />
                    {errors.startup_idea_details && <p className="text-sm text-destructive">{errors.startup_idea_details.message}</p>}
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 5. Highlights */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.dailyReport.section5Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="achievement" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.keyAchievement}</Label>
            <Input id="achievement" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("achievement")} />
              {errors.achievement && <p className="text-sm text-destructive">{errors.achievement.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenges" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.challenges}</Label>
            <Textarea id="challenges" className="bg-[#FEF5EB]/30 text-base min-h-[80px]" {...register("challenges")} />
              {errors.challenges && <p className="text-sm text-destructive">{errors.challenges.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tomorrow_plan" className="text-zinc-800 dark:text-zinc-200">{dict.dailyReport.tomorrowPlan}</Label>
            <Textarea id="tomorrow_plan" className="bg-[#FEF5EB]/30 text-base min-h-[80px]" {...register("tomorrow_plan")} />
              {errors.tomorrow_plan && <p className="text-sm text-destructive">{errors.tomorrow_plan.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* 6. Proof Uploads */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.dailyReport.section6Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <Label className="text-zinc-800 dark:text-zinc-200 text-base">{dict.dailyReport.uploadLabel}</Label>
            <Input 
              type="file" 
              multiple 
              accept="image/*,video/*,application/pdf" 
              onChange={handleFileChange}
              className="cursor-pointer bg-[#FEF5EB]/30 h-12 file:bg-[#0B3C5D] file:text-white file:border-0 file:rounded-md file:px-4 file:mr-4 file:h-full file:cursor-pointer"
            />
            {files.length > 0 && (
              <ul className="space-y-2 text-sm text-zinc-600 mt-4">
                {files.map((file, i) => (
                  <li key={i} className="flex justify-between items-center bg-[#FEF5EB]/50 dark:bg-zinc-800 p-3 rounded-lg border border-zinc-200">
                    <span className="truncate max-w-[200px] sm:max-w-[300px] font-medium">{file.name}</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-destructive font-medium px-2 py-1 rounded hover:bg-destructive/10">
                      {dict.dailyReport.remove}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full text-lg h-14 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white shadow-md transition-all rounded-md font-medium" 
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {dict.dailyReport.submitting}
          </>
        ) : (
          dict.dailyReport.submitBtn
        )}
      </Button>
    </form>
  );
}
