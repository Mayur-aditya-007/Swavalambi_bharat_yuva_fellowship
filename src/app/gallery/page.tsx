import React from "react";
import GalleryPageClient from "./GalleryPageClient";
import { viewevent } from "./actions";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const initialEvents = await viewevent();

  return <GalleryPageClient initialEvents={initialEvents} />;
}
