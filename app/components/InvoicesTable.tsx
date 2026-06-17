"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Download, MoreHorizontal, FileText } from "lucide-react";
import type { Invoice, InvoiceStatus } from "@/app/lib/mock-data";

const statusStyles: Record<InvoiceStatus, { label: string; className: string }> =
  {
    paid: { label: "Payée", className: "bg-emerald-50 text-emerald-700" },
    pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
    overdue: { label: "En retard", className: "bg-rose-50 text-rose-700" },
  };

const filters: { value: InvoiceStatus | "all"; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "paid", label: "Payées" },
  { value: "pending", label: "En attente" },
  { value: "overdue", label: "En retard" },
];

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<InvoiceStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const matchesStatus = status === "all" || invoice.status === status;
      const matchesQuery =
        q === "" ||
        invoice.id.toLowerCase().includes(q) ||
        invoice.client.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [invoices, query, status]);

  const total = useMemo(
    () => filtered.reduce((sum, invoice) => sum + invoice.amount, 0),
    [filtered],
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une facture…"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatus(filter.value)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                status === filter.value
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs font-medium uppercase tracking-wide text-gray-400">
              <th className="px-5 py-3 font-medium">Facture</th>
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="hidden px-5 py-3 font-medium sm:table-cell">Date</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 text-right font-medium">Montant</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((invoice) => {
              const badge = statusStyles[invoice.status];
              return (
                <tr
                  key={invoice.id}
                  className="border-t border-gray-100 transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="font-medium text-gray-900 hover:underline"
                    >
                      {invoice.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{invoice.client}</td>
                  <td className="hidden px-5 py-3.5 text-gray-500 sm:table-cell">
                    {invoice.issuedAt}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-gray-900">
                    {currency.format(invoice.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label={`Télécharger ${invoice.id}`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label={`Plus d'options pour ${invoice.id}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 px-5 py-16 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <FileText className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              Aucune facture trouvée
            </p>
            <p className="text-sm text-gray-500">
              Essayez un autre terme de recherche ou un autre filtre.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-xs text-gray-500">
        <span>
          {filtered.length} facture{filtered.length > 1 ? "s" : ""} sur{" "}
          {invoices.length}
        </span>
        <span className="font-medium text-gray-900">
          Total : {currency.format(total)}
        </span>
      </div>
    </section>
  );
}
