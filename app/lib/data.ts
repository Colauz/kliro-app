// Query layer — replace each function body with an async Supabase call when ready.

import {
  clients,
  invoices,
  stats,
  activity,
  getClientById as _getClientById,
  getInvoiceById as _getInvoiceById,
  getInvoicesByClient as _getInvoicesByClient,
  getProjectsByClient as _getProjectsByClient,
  getDocumentsByClient as _getDocumentsByClient,
  getInvoiceLineItems as _getInvoiceLineItems,
  type Client,
  type Invoice,
  type Project,
  type Document,
  type Stat,
  type ActivityItem,
  type InvoiceLineItem,
  type InvoiceStatus,
  type ClientStatus,
  type ProjectStatus,
} from "./mock-data";

export type {
  Client,
  Invoice,
  Project,
  Document,
  Stat,
  ActivityItem,
  InvoiceLineItem,
  InvoiceStatus,
  ClientStatus,
  ProjectStatus,
};

export { freelancer, TAX_RATE } from "./mock-data";

export function getAllClients(): Client[] {
  return clients;
}

export function getAllInvoices(): Invoice[] {
  return invoices;
}

export function getAllStats(): Stat[] {
  return stats;
}

export function getAllActivity(): ActivityItem[] {
  return activity;
}

export function getClientById(id: string): Client | undefined {
  return _getClientById(id);
}

export function getInvoiceById(id: string): Invoice | undefined {
  return _getInvoiceById(id);
}

export function getInvoicesByClient(clientId: string): Invoice[] {
  return _getInvoicesByClient(clientId);
}

export function getProjectsByClient(clientId: string): Project[] {
  return _getProjectsByClient(clientId);
}

export function getDocumentsByClient(clientId: string): Document[] {
  return _getDocumentsByClient(clientId);
}

export function getInvoiceLineItems(invoice: Invoice): InvoiceLineItem[] {
  return _getInvoiceLineItems(invoice);
}
