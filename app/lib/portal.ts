import { createServiceClient } from "./supabase/service";

export type InvoiceStatus = "paid" | "pending" | "overdue";
export type DocumentType = "PDF" | "DOCX" | "XLSX" | "PNG" | "ZIP";

export interface PortalInvoice {
  id: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
}

export interface PortalDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  sharedAt: string;
}

export interface PortalData {
  client: {
    id: string;
    name: string;
    company: string;
  };
  freelancerName: string;
  invoices: PortalInvoice[];
  documents: PortalDocument[];
}

export async function getPortalData(token: string): Promise<PortalData | null> {
  const supabase = createServiceClient();

  const { data: client, error } = await supabase
    .from("clients")
    .select("id, name, company, user_id")
    .eq("portal_token", token)
    .single();

  if (error || !client) return null;

  const [{ data: invoices }, { data: documents }, { data: profile }] =
    await Promise.all([
      supabase
        .from("invoices")
        .select("id, amount, status, issued_at")
        .eq("client_id", client.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("documents")
        .select("id, name, type, size, shared_at")
        .eq("client_id", client.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("profiles")
        .select("name, company_name")
        .eq("user_id", client.user_id)
        .single(),
    ]);

  const freelancerName =
    profile?.name || profile?.company_name || "Votre prestataire";

  return {
    client: {
      id: client.id,
      name: client.name,
      company: client.company,
    },
    freelancerName,
    invoices: (invoices ?? []).map((i) => ({
      id: i.id,
      amount: Number(i.amount),
      status: i.status as InvoiceStatus,
      issuedAt: i.issued_at ?? "",
    })),
    documents: (documents ?? []).map((d) => ({
      id: d.id,
      name: d.name,
      type: d.type as DocumentType,
      size: d.size ?? "",
      sharedAt: d.shared_at ?? "",
    })),
  };
}
