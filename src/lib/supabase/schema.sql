-- Supabase Schema for Swavalambi Bharat Yuva Fellowship

-- 1. Create the fellowship_registrations table
CREATE TABLE IF NOT EXISTS public.fellowship_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    dob DATE NOT NULL,
    gender TEXT NOT NULL,
    address TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    qualification TEXT NOT NULL,
    college_name TEXT NOT NULL,
    course_stream TEXT NOT NULL,
    year_semester TEXT NOT NULL,
    computer_knowledge TEXT NOT NULL,
    social_media_knowledge TEXT NOT NULL,
    work_interests TEXT[] DEFAULT '{}',
    nss_ncc_connected TEXT NOT NULL,
    organization_details TEXT,
    available_6_months TEXT NOT NULL,
    weekly_time TEXT NOT NULL,
    available_time TEXT[] DEFAULT '{}',
    motivation TEXT NOT NULL,
    district_opportunity TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the daily_reports table
CREATE TABLE IF NOT EXISTS public.daily_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fellow_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    district TEXT NOT NULL,
    college_name TEXT NOT NULL,
    report_date DATE NOT NULL,
    reporting_day TEXT NOT NULL,
    work_types TEXT[] DEFAULT '{}',
    work_description TEXT NOT NULL,

    -- Output Metrics
    entrepreneurs_contacted INTEGER DEFAULT 0,
    students_contacted INTEGER DEFAULT 0,
    field_visits INTEGER DEFAULT 0,
    business_profiles INTEGER DEFAULT 0,
    success_stories INTEGER DEFAULT 0,
    schemes_studied INTEGER DEFAULT 0,
    social_posts INTEGER DEFAULT 0,
    meetings_attended INTEGER DEFAULT 0,
    calls_followups INTEGER DEFAULT 0,

    -- Business Details
    business_contacted BOOLEAN DEFAULT false,
    business_name TEXT,
    business_location TEXT,
    business_category TEXT,
    contact_person TEXT,
    contact_number TEXT,
    business_observation TEXT,

    -- Government Scheme Work
    government_scheme_work BOOLEAN DEFAULT false,
    scheme_name TEXT,
    scheme_category TEXT,
    scheme_work_types TEXT[] DEFAULT '{}',
    scheme_details TEXT,

    -- Youth Outreach
    youth_outreach BOOLEAN DEFAULT false,
    institution_name TEXT,
    students_spoken INTEGER DEFAULT 0,
    interested_students INTEGER DEFAULT 0,
    startup_idea_found BOOLEAN DEFAULT false,
    startup_idea_details TEXT,

    -- Social Media Work
    social_media_work BOOLEAN DEFAULT false,
    post_count INTEGER DEFAULT 0,
    reel_count INTEGER DEFAULT 0,
    story_count INTEGER DEFAULT 0,
    video_count INTEGER DEFAULT 0,
    poster_count INTEGER DEFAULT 0,
    content_topic TEXT,
    content_link TEXT,

    -- Meetings
    meeting_done BOOLEAN DEFAULT false,
    meeting_type TEXT,
    meeting_details TEXT,

    -- Summary
    achievement TEXT,
    challenges TEXT,
    tomorrow_plan TEXT,
    proof_urls TEXT[] DEFAULT '{}',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS)
-- For this MVP, we will allow anonymous inserts, but restrict reads to authenticated users.
-- WARNING: In a production app, you should restrict who can insert or use more secure methods.
ALTER TABLE public.fellowship_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for the forms
CREATE POLICY "Allow anonymous inserts to fellowship_registrations" ON public.fellowship_registrations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts to daily_reports" ON public.daily_reports FOR INSERT TO anon WITH CHECK (true);

-- 4. Storage setup
-- Create a bucket for daily report proofs
-- Note: This might need to be run via the Supabase Dashboard if the role doesn't have privileges.
INSERT INTO storage.buckets (id, name, public) VALUES ('daily-report-proofs', 'daily-report-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous uploads to the storage bucket
CREATE POLICY "Allow anonymous uploads" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'daily-report-proofs');
