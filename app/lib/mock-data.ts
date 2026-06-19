export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  id: string;
  clientId: string;
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
  { id: "INV-128", clientId: "c1", amount: 1450, status: "paid", issuedAt: "12 juin 2026" },
  { id: "INV-127", clientId: "c2", amount: 980, status: "pending", issuedAt: "9 juin 2026" },
  { id: "INV-126", clientId: "c3", amount: 2300, status: "paid", issuedAt: "5 juin 2026" },
  { id: "INV-125", clientId: "c5", amount: 690, status: "overdue", issuedAt: "28 mai 2026" },
  { id: "INV-124", clientId: "c4", amount: 1150, status: "pending", issuedAt: "24 mai 2026" },
  { id: "INV-123", clientId: "c6", amount: 3200, status: "paid", issuedAt: "18 mai 2026" },
  { id: "INV-122", clientId: "c7", amount: 540, status: "paid", issuedAt: "11 mai 2026" },
  { id: "INV-121", clientId: "c1", amount: 1450, status: "overdue", issuedAt: "2 mai 2026" },
  { id: "INV-120", clientId: "c8", amount: 820, status: "paid", issuedAt: "26 avr. 2026" },
  { id: "INV-119", clientId: "c2", amount: 1760, status: "pending", issuedAt: "19 avr. 2026" },
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

export type ProjectStatus = "in_progress" | "review" | "completed" | "on_hold";

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

export const projects: Project[] = [
  { id: "p1", clientId: "c1", name: "Refonte site vitrine", status: "in_progress", progress: 65, dueDate: "30 juin 2026" },
  { id: "p2", clientId: "c1", name: "Charte graphique", status: "review", progress: 90, dueDate: "20 juin 2026" },
  { id: "p3", clientId: "c2", name: "Application mobile", status: "in_progress", progress: 40, dueDate: "15 juil. 2026" },
  { id: "p4", clientId: "c3", name: "Branding complet", status: "completed", progress: 100, dueDate: "2 juin 2026" },
  { id: "p5", clientId: "c3", name: "Packaging produit", status: "in_progress", progress: 55, dueDate: "10 juil. 2026" },
  { id: "p6", clientId: "c3", name: "Site e-commerce", status: "on_hold", progress: 25, dueDate: "À définir" },
  { id: "p7", clientId: "c4", name: "Identité visuelle", status: "in_progress", progress: 30, dueDate: "5 juil. 2026" },
  { id: "p8", clientId: "c6", name: "Design system", status: "in_progress", progress: 70, dueDate: "28 juin 2026" },
  { id: "p9", clientId: "c6", name: "Landing page", status: "review", progress: 85, dueDate: "22 juin 2026" },
];

export const documents: Document[] = [
  { id: "d1", clientId: "c1", name: "Contrat de prestation.pdf", type: "PDF", size: "240 Ko", sharedAt: "12 juin 2026" },
  { id: "d2", clientId: "c1", name: "Maquettes v2.png", type: "PNG", size: "1,8 Mo", sharedAt: "8 juin 2026" },
  { id: "d3", clientId: "c1", name: "Devis initial.pdf", type: "PDF", size: "180 Ko", sharedAt: "1 juin 2026" },
  { id: "d4", clientId: "c2", name: "Cahier des charges.docx", type: "DOCX", size: "320 Ko", sharedAt: "9 juin 2026" },
  { id: "d5", clientId: "c2", name: "Wireframes.zip", type: "ZIP", size: "4,2 Mo", sharedAt: "4 juin 2026" },
  { id: "d6", clientId: "c3", name: "Logo final.zip", type: "ZIP", size: "6,1 Mo", sharedAt: "2 juin 2026" },
  { id: "d7", clientId: "c3", name: "Budget détaillé.xlsx", type: "XLSX", size: "96 Ko", sharedAt: "28 mai 2026" },
  { id: "d8", clientId: "c4", name: "Brief créatif.pdf", type: "PDF", size: "210 Ko", sharedAt: "24 mai 2026" },
  { id: "d9", clientId: "c6", name: "Specs design system.pdf", type: "PDF", size: "510 Ko", sharedAt: "18 mai 2026" },
];

export function getClientById(id: string): Client | undefined {
  return clients.find((client) => client.id === id);
}

export function getProjectsByClient(clientId: string): Project[] {
  return projects.filter((project) => project.clientId === clientId);
}

export function getDocumentsByClient(clientId: string): Document[] {
  return documents.filter((document) => document.clientId === clientId);
}

export function getInvoicesByClient(clientId: string): Invoice[] {
  return invoices.filter((invoice) => invoice.clientId === clientId);
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

const invoiceLineItems: Record<string, InvoiceLineItem[]> = {
  "INV-128": [
    { id: "l1", description: "Refonte de la page d'accueil", quantity: 1, rate: 850 },
    { id: "l2", description: "Intégration responsive", quantity: 4, rate: 150 },
  ],
  "INV-127": [
    { id: "l1", description: "Maquettes UI (5 écrans)", quantity: 1, rate: 680 },
    { id: "l2", description: "Itérations de design", quantity: 2, rate: 150 },
  ],
  "INV-126": [
    { id: "l1", description: "Identité visuelle complète", quantity: 1, rate: 1500 },
    { id: "l2", description: "Déclinaisons supports", quantity: 5, rate: 160 },
  ],
};

export function getInvoiceById(id: string): Invoice | undefined {
  return invoices.find((invoice) => invoice.id === id);
}

export function getInvoiceLineItems(invoice: Invoice): InvoiceLineItem[] {
  return (
    invoiceLineItems[invoice.id] ?? [
      {
        id: "l1",
        description: "Prestation de services",
        quantity: 1,
        rate: invoice.amount,
      },
    ]
  );
}

