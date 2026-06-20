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
  return [];
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
