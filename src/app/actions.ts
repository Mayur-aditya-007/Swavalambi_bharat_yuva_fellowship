"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setLanguageLocale(lang: "en" | "hi") {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", lang, { path: "/", maxAge: 31536000 });
  revalidatePath("/", "layout");
}
