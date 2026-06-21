"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

export interface InvoiceActionState {
  error: string | null;
  success: boolean;
}

export async function addInvoice(
  _prevState: InvoiceActionState,
  formData: FormData
): Promise<InvoiceActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Non autorisé.", success: false };

  const { count } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const nextNumber = (count ?? 0) + 1;
  const id = `INV-${String(nextNumber).padStart(3, "0")}`;

  const rawDate = formData.get("date") as string;
  const issuedAt = rawDate
    ? new Date(rawDate + "T00:00:00").toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const clientId = (formData.get("clientId") as string) || null;

  const { error } = await supabase.from("invoices").insert({
    id,
    user_id: user.id,
    client_id: clientId || null,
    amount: parseFloat((formData.get("amount") as string) || "0") || 0,
    status: (formData.get("status") as string) || "pending",
    issued_at: issuedAt,
  });

  if (error) return { error: "Impossible de créer la facture.", success: false };

  revalidatePath("/invoices");
  revalidatePath("/");
  return { error: null, success: true };
}
