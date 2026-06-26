import React from "react";
import { viewevent } from "./actions"; // Pulling your database query action
import AdminGalleryDashboard from "./AdminGalleryDashboard";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  // Fetch live operational logs cleanly on the server side
  const databaseEvents = await viewevent();

  return <AdminGalleryDashboard initialEvents={databaseEvents || []} />;
}