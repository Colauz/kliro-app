export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
}

export type ClientStatus = "active" | "pending" | "archived";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  activeProjects: number;
}

export interface ActivityItem {
  id: string;
  type: "invoice_paid" | "invoice_sent" | "client_added" | "document_shared";
  label: string;
  detail: string;
  time: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export const stats: Stat[] = [
  { id: "revenue", label: "Revenus ce mois", value: "8 240 €", change: "+12,5 %", trend: "up" },
  { id: "pending", label: "Factures en attente", value: "3 120 €", change: "-4,2 %", trend: "down" },
  { id: "clients", label: "Clients actifs", value: "12", change: "+2", trend: "up" },
  { id: "documents", label: "Documents partagés", value: "47", change: "+8", trend: "up" },
];

export const invoices: Invoice[] = [
  { id: "INV-128", client: "Client A", amount: 1450, status: "paid", issuedAt: "12 juin 2026" },
  { id: "INV-127", client: "Studio Lumen", amount: 980, status: "pending", issuedAt: "9 juin 2026" },
  { id: "INV-126", client: "Atelier Nord", amount: 2300, status: "paid", issuedAt: "5 juin 2026" },
  { id: "INV-125", client: "Client B", amount: 690, status: "overdue", issuedAt: "28 mai 2026" },
  { id: "INV-124", client: "Maison Vert", amount: 1150, status: "pending", issuedAt: "24 mai 2026" },
  { id: "INV-123", client: "Pixel & Co", amount: 3200, status: "paid", issuedAt: "18 mai 2026" },
  { id: "INV-122", client: "Horizon Studio", amount: 540, status: "paid", issuedAt: "11 mai 2026" },
  { id: "INV-121", client: "Client A", amount: 1450, status: "overdue", issuedAt: "2 mai 2026" },
  { id: "INV-120", client: "Forme & Sens", amount: 820, status: "paid", issuedAt: "26 avr. 2026" },
  { id: "INV-119", client: "Studio Lumen", amount: 1760, status: "pending", issuedAt: "19 avr. 2026" },
];

export const clients: Client[] = [
  { id: "c1", name: "Camille Roy", company: "Client A", email: "camille@clienta.fr", phone: "+33 6 12 34 56 78", status: "active", activeProjects: 2 },
  { id: "c2", name: "Léo Marchand", company: "Studio Lumen", email: "leo@studiolumen.com", phone: "+33 6 23 45 67 89", status: "active", activeProjects: 1 },
  { id: "c3", name: "Inès Fabre", company: "Atelier Nord", email: "ines@ateliernord.fr", phone: "+33 6 34 56 78 90", status: "active", activeProjects: 3 },
  { id: "c4", name: "Hugo Berger", company: "Maison Vert", email: "hugo@maisonvert.co", phone: "+33 6 45 67 89 01", status: "pending", activeProjects: 1 },
  { id: "c5", name: "Sofia Lambert", company: "Client B", email: "sofia@clientb.fr", phone: "+33 6 56 78 90 12", status: "pending", activeProjects: 0 },
  { id: "c6", name: "Nathan Petit", company: "Pixel & Co", email: "nathan@pixelco.io", phone: "+33 6 67 89 01 23", status: "active", activeProjects: 2 },
  { id: "c7", name: "Awa Diallo", company: "Horizon Studio", email: "awa@horizon.studio", phone: "+33 6 78 90 12 34", status: "archived", activeProjects: 0 },
  { id: "c8", name: "Théo Garnier", company: "Forme & Sens", email: "theo@formeetsens.fr", phone: "+33 6 89 01 23 45", status: "archived", activeProjects: 0 },
];

export const activity: ActivityItem[] = [
  { id: "a1", type: "invoice_paid", label: "Facture #INV-128 payée", detail: "Client A · 1 450 €", time: "il y a 2 h" },
  { id: "a2", type: "document_shared", label: "Document partagé", detail: "Contrat — Studio Lumen", time: "il y a 5 h" },
  { id: "a3", type: "client_added", label: "Nouveau client ajouté", detail: "Maison Vert", time: "hier" },
  { id: "a4", type: "invoice_sent", label: "Facture #INV-127 envoyée", detail: "Studio Lumen · 980 €", time: "il y a 2 j" },
];
