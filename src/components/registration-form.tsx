"use client";

import { useState, useTransition } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitRegistration } from "@/app/register/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const formSchema = z.object({
  full_name: z.string().min(2, "Required"),
  whatsapp: z.string().regex(/^[0-9]{10}$/, "Valid 10-digit number required"),
  email: z.string().email("Required"),
  dob: z.string().min(1, "Required"),
  gender: z.enum(["Male", "Female", "Other"], { message: "Required" }),
  address: z.string().min(5, "Required"),
  district: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  qualification: z.string().min(2, "Required"),
  college_name: z.string().min(2, "Required"),
  course_stream: z.string().min(2, "Required"),
  year_semester: z.string().min(1, "Required"),
  computer_knowledge: z.enum(["Beginner", "Intermediate", "Advanced"], { message: "Required" }),
  social_media_knowledge: z.enum(["Beginner", "Intermediate", "Advanced"], { message: "Required" }),
  work_interests: z.array(z.string()).min(1, "Required"),
  nss_ncc_connected: z.enum(["Yes", "No"], { message: "Required" }),
  organization_details: z.string().optional(),
  available_6_months: z.enum(["Yes", "No"], { message: "Required" }),
  weekly_time: z.string().optional(),
  available_time: z.array(z.string()).optional(),
  motivation: z.string().min(10, "Required"),
  district_opportunity: z.string().min(10, "Required"),
}).superRefine((data, ctx) => {
  if (data.nss_ncc_connected === "Yes" && (!data.organization_details || data.organization_details.trim().length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Required",
      path: ["organization_details"],
    });
  }
  if (data.available_6_months === "Yes") {
    if (!data.weekly_time || data.weekly_time.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["weekly_time"],
      });
    }
    if (!data.available_time || data.available_time.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
        path: ["available_time"],
      });
    }
  }
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const WORK_INTERESTS = [
  "Social Media",
  "Research",
  "Field Coordination",
  "Local Mapping",
  "Innovation Outreach",
];

const AVAILABLE_TIMES = [
  "Morning (8 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 8 PM)",
  "Weekends Only",
];

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export function RegistrationForm({ dict }: { dict: Dictionary }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      work_interests: [],
      available_time: [],
    },
  });

  const formValues = useWatch({ control });

  const onSubmit = (data: RegistrationFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else if (value !== undefined) {
          formData.append(key, value as string);
        }
      });

      const result = await submitRegistration(formData);
      if (result?.error) {
        setServerError(typeof result.error === "string" ? result.error : dict.register.validationError);
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

      {/* 1. Personal Details */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.register.section1Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
          <CardDescription>{dict.register.section1Desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-zinc-800 dark:text-zinc-200">{dict.register.fullName}</Label>
              <Input id="full_name" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("full_name")} />
              {errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-zinc-800 dark:text-zinc-200">{dict.register.whatsapp}</Label>
              <Input id="whatsapp" type="tel" maxLength={10} className="bg-[#FEF5EB]/30 h-12 text-base" {...register("whatsapp")} />
              {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-800 dark:text-zinc-200">{dict.register.email}</Label>
              <Input id="email" type="email" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-zinc-800 dark:text-zinc-200">{dict.register.dob}</Label>
              <Input id="dob" type="date" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("dob")} />
              {errors.dob && <p className="text-sm text-destructive">{errors.dob.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.register.gender}</Label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? null}>
                    <SelectTrigger className="bg-[#FEF5EB]/30 w-full h-12 text-base">
                      <SelectValue placeholder={dict.register.selectGender} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">{dict.register.genderMale}</SelectItem>
                      <SelectItem value="Female">{dict.register.genderFemale}</SelectItem>
                      <SelectItem value="Other">{dict.register.genderOther}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              
              
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-zinc-800 dark:text-zinc-200">{dict.register.address}</Label>
            <Textarea id="address" className="bg-[#FEF5EB]/30 text-base resize-none min-h-[80px]" {...register("address")} />
            {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="district" className="text-zinc-800 dark:text-zinc-200">{dict.register.district}</Label>
              <Input id="district" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("district")} />
              {errors.district && <p className="text-sm text-destructive">{errors.district.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-zinc-800 dark:text-zinc-200">{dict.register.state}</Label>
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? null}>
                    <SelectTrigger className="bg-[#FEF5EB]/30 w-full h-12 text-base">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((stateName) => (
                        <SelectItem key={stateName} value={stateName}>{stateName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Education Details */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.register.section2Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
          <CardDescription>{dict.register.section2Desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="qualification" className="text-zinc-800 dark:text-zinc-200">{dict.register.qualification}</Label>
              <Input id="qualification" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("qualification")} />
              {errors.qualification && <p className="text-sm text-destructive">{errors.qualification.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="college_name" className="text-zinc-800 dark:text-zinc-200">{dict.register.collegeName}</Label>
              <Input id="college_name" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("college_name")} />
              {errors.college_name && <p className="text-sm text-destructive">{errors.college_name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="course_stream" className="text-zinc-800 dark:text-zinc-200">{dict.register.courseStream}</Label>
              <Input id="course_stream" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("course_stream")} />
              {errors.course_stream && <p className="text-sm text-destructive">{errors.course_stream.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year_semester" className="text-zinc-800 dark:text-zinc-200">{dict.register.yearSemester}</Label>
              <Input id="year_semester" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("year_semester")} />
              {errors.year_semester && <p className="text-sm text-destructive">{errors.year_semester.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.register.computerKnowledge}</Label>
              <Controller
                control={control}
                name="computer_knowledge"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? null}>
                    <SelectTrigger className="bg-[#FEF5EB]/30 w-full h-12 text-base">
                      <SelectValue placeholder={dict.register.selectLevel} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">{dict.register.levelBeginner}</SelectItem>
                      <SelectItem value="Intermediate">{dict.register.levelIntermediate}</SelectItem>
                      <SelectItem value="Advanced">{dict.register.levelAdvanced}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-800 dark:text-zinc-200">{dict.register.socialMediaKnowledge}</Label>
              <Controller
                control={control}
                name="social_media_knowledge"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? null}>
                    <SelectTrigger className="bg-[#FEF5EB]/30 w-full h-12 text-base">
                      <SelectValue placeholder={dict.register.selectLevel} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">{dict.register.levelBeginner}</SelectItem>
                      <SelectItem value="Intermediate">{dict.register.levelIntermediate}</SelectItem>
                      <SelectItem value="Advanced">{dict.register.levelAdvanced}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Skills & Interests */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.register.section3Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
          <CardDescription>{dict.register.section3Desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <Label className="text-zinc-800 dark:text-zinc-200">{dict.register.areasOfInterest}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#FEF5EB]/30 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {WORK_INTERESTS.map((interest) => (
                <div key={interest} className="flex items-center space-x-3">
                  <Controller
                    control={control}
                    name="work_interests"
                    render={({ field }) => (
                      <Checkbox
                        id={`interest-${interest}`}
                        className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]"
                        checked={field.value?.includes(interest)}
                        onCheckedChange={(checked) => {
                          const current = field.value || [];
                          const updated = checked
                            ? [...current, interest]
                            : current.filter((v) => v !== interest);
                          field.onChange(updated);
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={`interest-${interest}`} className="font-medium cursor-pointer text-base">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="block text-zinc-800 dark:text-zinc-200">{dict.register.nssConnected}</Label>
            <Controller
              control={control}
              name="nss_ncc_connected"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? null}
                  className="flex gap-8"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Yes" id="nss-yes" className="w-5 h-5 text-[#0B3C5D]" />
                    <Label htmlFor="nss-yes" className="font-medium cursor-pointer text-base">{dict.register.yes}</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="No" id="nss-no" className="w-5 h-5 text-[#0B3C5D]" />
                    <Label htmlFor="nss-no" className="font-medium cursor-pointer text-base">{dict.register.no}</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {formValues.nss_ncc_connected === "Yes" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label htmlFor="organization_details" className="text-zinc-800 dark:text-zinc-200">{dict.register.orgDetails}</Label>
              <Input id="organization_details" className="bg-[#FEF5EB]/30 h-12 text-base" {...register("organization_details")} />
              {errors.organization_details && <p className="text-sm text-destructive">{errors.organization_details.message}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 4. Availability */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.register.section4Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
          <CardDescription>{dict.register.section4Desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="block text-zinc-800 dark:text-zinc-200">{dict.register.commit6Months}</Label>
              <Controller
                control={control}
                name="available_6_months"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value ?? null}
                    className="flex gap-8"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="Yes" id="commit-yes" className="w-5 h-5 text-[#0B3C5D]" />
                      <Label htmlFor="commit-yes" className="font-medium cursor-pointer text-base">{dict.register.yes}</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="No" id="commit-no" className="w-5 h-5 text-[#0B3C5D]" />
                      <Label htmlFor="commit-no" className="font-medium cursor-pointer text-base">{dict.register.no}</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          {formValues.available_6_months === "Yes" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="weekly_time" className="text-zinc-800 dark:text-zinc-200">{dict.register.weeklyTime}</Label>
                  <Controller
                    control={control}
                    name="weekly_time"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value ?? null}>
                        <SelectTrigger className="bg-[#FEF5EB]/30 w-full h-12 text-base">
                          <SelectValue placeholder={dict.register.selectTime} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-4 hours">2-4 hours</SelectItem>
                          <SelectItem value="5-8 hours">5-8 hours</SelectItem>
                          <SelectItem value="8-12 hours">8-12 hours</SelectItem>
                          <SelectItem value="More than 12 hours">More than 12 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.weekly_time && <p className="text-sm text-destructive">{errors.weekly_time.message}</p>}
                </div>
              </div>

              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 mt-6">
                <Label className="text-zinc-800 dark:text-zinc-200">{dict.register.preferredTimes}</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#FEF5EB]/30 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  {AVAILABLE_TIMES.map((time) => (
                    <div key={time} className="flex items-center space-x-3">
                      <Controller
                        control={control}
                        name="available_time"
                        render={({ field }) => (
                          <Checkbox
                            id={`time-${time}`}
                            className="w-5 h-5 data-[state=checked]:bg-[#0B3C5D] data-[state=checked]:border-[#0B3C5D]"
                            checked={field.value?.includes(time)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              const updated = checked
                                ? [...current, time]
                                : current.filter((v) => v !== time);
                              field.onChange(updated);
                            }}
                          />
                        )}
                      />
                      <Label htmlFor={`time-${time}`} className="font-medium cursor-pointer text-base">
                        {time}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.available_time && <p className="text-sm text-destructive">{errors.available_time.message}</p>}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 5. Motivation & Declaration */}
      <Card className="border-t-4 border-t-[#0B3C5D] shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-xl text-[#0B3C5D] dark:text-blue-400">{dict.register.section5Title}</CardTitle>
          <div className="w-12 h-0.5 bg-[#E67E22] mt-2 mb-1"></div>
          <CardDescription>{dict.register.section5Desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-zinc-800 dark:text-zinc-200">{dict.register.motivation}</Label>
            <Textarea 
              id="motivation" 
              className="min-h-[120px] bg-[#FEF5EB]/30 text-base resize-none"
              {...register("motivation")} 
            />
            {errors.motivation && <p className="text-sm text-destructive">{errors.motivation.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="district_opportunity" className="text-zinc-800 dark:text-zinc-200">{dict.register.districtOpportunity}</Label>
            <Textarea 
              id="district_opportunity" 
              className="bg-[#FEF5EB]/30 text-base resize-none min-h-[80px]"
              {...register("district_opportunity")} 
            />
            {errors.district_opportunity && <p className="text-sm text-destructive">{errors.district_opportunity.message}</p>}
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
            {dict.register.submitting}
          </>
        ) : (
          dict.register.submitBtn
        )}
      </Button>
    </form>
  );
}
