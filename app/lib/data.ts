import { createClient } from "./supabase/server";

export type InvoiceStatus = "paid" | "pending" | "overdue";
export type ClientStatus = "active" | "pending" | "archived";
export type ProjectStatus = "in_progress" | "review" | "completed" | "on_hold";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  activeProjects: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
}

export interface Document {
  id: string;
  clientId: string;
  name: string;
  type: "PDF" | "DOCX" | "XLSX" | "PNG" | "ZIP";
  size: string;
  sharedAt: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface ActivityItem {
  id: string;
  type: "invoice_paid" | "invoice_sent" | "client_added" | "document_shared";
  label: string;
  detail: string;
  time: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export const TAX_RATE = 0.2;

export const freelancer = {
  name: "Julie Moreau",
  activity: "Freelance · Design & Branding",
  email: "julie@kliro.studio",
  phone: "+33 6 00 11 22 33",
  address: "12 rue des Lilas, 75011 Paris, France",
  siret: "SIRET 902 345 678 00014",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToClient(row: any): Client {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    status: row.status as ClientStatus,
    activeProjects: row.active_projects ?? row.activeProjects ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToInvoice(row: any): Invoice {
  return {
    id: row.id,
    clientId: row.client_id ?? row.clientId ?? "",
    amount: row.amount,
    status: row.status as InvoiceStatus,
    issuedAt: row.issued_at ?? row.issuedAt ?? "",
  };
}

export async function getAllClients(): Promise<Client[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clients").select("*");
  if (error || !data) return [];
  return data.map(rowToClient);
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("invoices").select("*");
  if (error || !data) return [];
  return data.map(rowToInvoice);
}

export async function getAllStats(): Promise<Stat[]> {
  const supabase = await createClient();

  const EUR = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const [
    { data: invoicesData },
    { count: activeClients },
  ] = await Promise.all([
    supabase.from("invoices").select("amount, status"),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  const invoices = invoicesData ?? [];
  const revenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const pending = invoices
    .filter((i) => i.status === "pending" || i.status === "overdue")
    .reduce((sum, i) => sum + Number(i.amount), 0);
  const overdueCount = invoices.filter((i) => i.status === "overdue").length;

  return [
    {
      id: "revenue",
      label: "Revenus encaissés",
      value: EUR.format(revenue),
      change: "",
      trend: "up",
    },
    {
      id: "pending",
      label: "En attente de paiement",
      value: EUR.format(pending),
      change: "",
      trend: pending > 0 ? "down" : "up",
    },
    {
      id: "clients",
      label: "Clients actifs",
      value: String(activeClients ?? 0),
      change: "",
      trend: "up",
    },
    {
      id: "overdue",
      label: "Factures en retard",
      value: String(overdueCount),
      change: "",
      trend: overdueCount > 0 ? "down" : "up",
    },
  ];
}

export async function getAllActivity(): Promise<ActivityItem[]> {
  return [];
}

export async function getClientById(id: string): Promise<Client | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return undefined;
  return rowToClient(data);
}

export async function getInvoiceById(id: string): Promise<Invoice | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return undefined;
  return rowToInvoice(data);
}

export async function getInvoicesByClient(clientId: string): Promise<Invoice[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", clientId);
  if (error || !data) return [];
  return data.map(rowToInvoice);
}

export async function getProjectsByClient(_clientId: string): Promise<Project[]> {
  return [];
}

export async function getDocumentsByClient(_clientId: string): Promise<Document[]> {
  return [];
}

export async function getInvoiceLineItems(invoice: Invoice): Promise<InvoiceLineItem[]> {
  return [
    {
      id: "l1",
      description: "Prestation de services",
      quantity: 1,
      rate: invoice.amount,
    },
  ];
}
