import { cookies } from "next/headers";
import { en, hi, Dictionary } from "./dictionaries";

export async function getDictionary(): Promise<{ dict: Dictionary; lang: "en" | "hi" }> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  
  if (locale === "hi") {
    return { dict: hi, lang: "hi" };
  }
  
  return { dict: en, lang: "en" };
}
