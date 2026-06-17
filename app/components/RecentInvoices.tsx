import { ChevronRight } from "lucide-react";
import { invoices, type InvoiceStatus } from "@/app/lib/mock-data";

const statusStyles: Record<InvoiceStatus, { label: string; className: string }> =
  {
    paid: { label: "Payée", className: "bg-emerald-50 text-emerald-700" },
    pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
    overdue: { label: "En retard", className: "bg-rose-50 text-rose-700" },
  };

const currency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export default function RecentInvoices() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Factures récentes
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-0.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          Voir tout
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs font-medium uppercase tracking-wide text-gray-400">
            <th className="px-5 py-3 font-medium">Facture</th>
            <th className="px-5 py-3 font-medium">Client</th>
            <th className="hidden px-5 py-3 font-medium sm:table-cell">Date</th>
            <th className="px-5 py-3 font-medium">Statut</th>
            <th className="px-5 py-3 text-right font-medium">Montant</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const status = statusStyles[invoice.status];
            return (
              <tr
                key={invoice.id}
                className="border-t border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-5 py-3.5 font-medium text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-5 py-3.5 text-gray-500">{invoice.client}</td>
                <td className="hidden px-5 py-3.5 text-gray-500 sm:table-cell">
                  {invoice.issuedAt}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right font-medium text-gray-900">
                  {currency.format(invoice.amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
