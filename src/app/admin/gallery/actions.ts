"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export interface EventRecord {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  photosCount: number;
  images: string[];
}

type EventRow = {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  photos_count?: number;
  images?: string[] | string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_ASSET_SIZE_BYTES = 20 * 1024 * 1024;

async function uploadMultipleToStorage(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    if (file.size > MAX_ASSET_SIZE_BYTES) {
      throw new Error(`${file.name} exceeds the 20 MB limit.`);
    }

    const fileBuffer = await file.arrayBuffer();
    const fileExt = file.name.split(".").pop();
    const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const bucketPath = `events/${uniqueFilename}`;

    const { error } = await supabase.storage
      .from("gallery-images")
      .upload(bucketPath, fileBuffer, {
        contentType: file.type,
        duplex: "half",
      });

    if (error) throw new Error(`Storage upload crash: ${error.message}`);

    const { data: publicUrlData } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(bucketPath);

    return publicUrlData.publicUrl;
  });

  return Promise.all(uploadPromises);
}

export async function createEventAction(formData: FormData): Promise<EventRecord> {
  const title = formData.get("title")?.toString() || "";
  const category = formData.get("category")?.toString() || "health";
  const date = formData.get("date")?.toString() || "";
  const location = formData.get("location")?.toString() || "";
  
  const files = formData.getAll("imageFiles") as File[];
  const validFiles = files.filter(f => f.size > 0);
  
  let uploadedUrls: string[] = [];
  if (validFiles.length > 0) {
    uploadedUrls = await uploadMultipleToStorage(validFiles);
  }

  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        title,
        category,
        date,
        location,
        photos_count: uploadedUrls.length,
        images: uploadedUrls,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(`Database Error: ${error.message}`);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    date: data.date,
    location: data.location,
    photosCount: data.photos_count,
    images: data.images,
  };
}
export async function viewevent(): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false }); // Newest events show up at the top

  if (error) {
    throw new Error(`Database Fetch Error: ${error.message}`);
  }

  const rows = (data || []) as EventRow[];

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    date: row.date,
    location: row.location,
    photosCount: row.photos_count || 0,
    images: Array.isArray(row.images) ? row.images : [],
  }));
}
export async function updateEventAction(formData: FormData): Promise<EventRecord> {
  const id = parseInt(formData.get("id")?.toString() || "0", 10);
  const title = formData.get("title")?.toString() || "";
  const category = formData.get("category")?.toString() || "health";
  const date = formData.get("date")?.toString() || "";
  const location = formData.get("location")?.toString() || "";
  
  const files = formData.getAll("imageFiles") as File[];
  const validFiles = files.filter(f => f.size > 0);
  
  // Receive the remaining un-deleted historic URLs from the dashboard component
  const remainingImagesJson = formData.get("existingImagesJson")?.toString() || "[]";
  let activeUrls: string[] = JSON.parse(remainingImagesJson);

  // If new additional imagery files exist, append their keys to the tracking row
  if (validFiles.length > 0) {
    const newUrls = await uploadMultipleToStorage(validFiles);
    activeUrls = [...activeUrls, ...newUrls];
  }

  const { data, error } = await supabase
    .from("events")
    .update({
      title,
      category,
      date,
      location,
      photos_count: activeUrls.length,
      images: activeUrls,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Database Error: ${error.message}`);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");

  return {
    id: data.id,
    title: data.title,
    category: data.category,
    date: data.date,
    location: data.location,
    photosCount: data.photos_count,
    images: data.images,
  };
}

export async function deleteEventAction(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id")?.toString() || "0", 10);
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(`Database Error: ${error.message}`);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}