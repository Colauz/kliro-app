"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

export interface ClientActionState {
  error: string | null;
  success: boolean;
}

export async function addClient(
  _prevState: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Non autorisé.", success: false };

  const { error } = await supabase.from("clients").insert({
    name: formData.get("name") as string,
    company: (formData.get("company") as string) || "",
    email: (formData.get("email") as string) || "",
    phone: (formData.get("phone") as string) || "",
    status: (formData.get("status") as string) || "active",
    user_id: user.id,
  });

  if (error) {
    console.error("SUPABASE INSERT ERROR:", error);
    return { error: "Impossible de créer le client.", success: false };
  }

  revalidatePath("/clients");
  revalidatePath("/");
  return { error: null, success: true };
}
