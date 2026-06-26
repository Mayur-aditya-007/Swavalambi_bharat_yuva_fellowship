import { NextResponse } from "next/server";
import { viewevent } from "@/app/gallery/actions";

export async function GET() {
  try {
    const events = await viewevent();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events for gallery API:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
