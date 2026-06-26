"use server";

import { createClient } from "@supabase/supabase-js";

export interface EventRecord {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  photosCount: number;
  image?: string;
  images: string[];
}

type GalleryRow = {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  photos_count?: number;
  images?: string[] | string | null;
  image?: string | null;
  image_url?: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

function normalizeImages(row: GalleryRow): string[] {
  const rawImages = row?.images;
  const fallbackImage = row?.image || row?.image_url;

  if (Array.isArray(rawImages)) {
    return rawImages.filter((value: unknown): value is string => typeof value === "string" && value.trim().length > 0);
  }

  if (typeof rawImages === "string") {
    const trimmed = rawImages.trim();
    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((value: unknown): value is string => typeof value === "string" && value.trim().length > 0);
      }
    } catch {
      // fall through to treat the string as a single URL if it is not JSON
    }

    return trimmed.includes(",") ? trimmed.split(",").map((value) => value.trim()).filter(Boolean) : [trimmed];
  }

  if (typeof fallbackImage === "string" && fallbackImage.trim().length > 0) {
    return [fallbackImage.trim()];
  }

  return [];
}

export async function viewevent(): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(`Database Fetch Error: ${error.message}`);
  }

  const rows = (data || []) as GalleryRow[];

  return rows.map((row) => {
    const images = normalizeImages(row);
    return {
      id: row.id,
      title: row.title,
      category: row.category,
      date: row.date,
      location: row.location,
      photosCount: row.photos_count ?? images.length ?? 0,
      image: images[0],
      images,
    };
  });
}

export default viewevent;