"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export async function saveProfile(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      name: (formData.get("fullName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
      activity: (formData.get("activity") as string) || "",
      company_name: (formData.get("companyName") as string) || "",
      siret: (formData.get("siret") as string) || "",
      address: (formData.get("address") as string) || "",
      iban: (formData.get("iban") as string) || "",
      bic: (formData.get("bic") as string) || "",
      currency: (formData.get("currency") as string) || "EUR",
    },
    { onConflict: "user_id" }
  );

  redirect("/settings?saved=1");
}
