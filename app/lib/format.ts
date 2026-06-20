import {
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  type LucideIcon,
} from "lucide-react";
import type { Document } from "./data";

export const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const documentIcons: Record<Document["type"], LucideIcon> = {
  PDF: FileText,
  DOCX: FileText,
  XLSX: FileSpreadsheet,
  PNG: FileImage,
  ZIP: FileArchive,
};
