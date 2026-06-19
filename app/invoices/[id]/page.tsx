import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Send, Building2, User } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import MobileNav from "@/app/components/MobileNav";
import { currency } from "@/app/lib/format";
import {
  freelancer,
  TAX_RATE,
  getInvoiceById,
  getInvoiceLineItems,
  getClientById,
  type InvoiceStatus,
} from "@/app/lib/data";

const statusStyles: Record<InvoiceStatus, { label: string; className: string }> =
  {
    paid: { label: "Payée", className: "bg-emerald-50 text-emerald-700" },
    pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
    overdue: { label: "En retard", className: "bg-rose-50 text-rose-700" },
  };

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const lineItems = getInvoiceLineItems(invoice);
  const client = getClientById(invoice.clientId);
  const status = statusStyles[invoice.status];

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <MobileNav />
              <Link
                href="/invoices"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour aux factures
              </Link>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                  #{invoice.id}
                </h1>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Send className="h-4 w-4" />
                  Envoyer un rappel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                >
                  <Download className="h-4 w-4" />
                  Télécharger le PDF
                </button>
              </div>
            </div>

            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2">
                <div className="bg-white p-6">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    <Building2 className="h-3.5 w-3.5" />
                    Facturé à
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {client?.name ?? invoice.clientId}
                  </p>
                  <p className="text-sm text-gray-500">{client?.company}</p>
                  {client && (
                    <div className="mt-2 space-y-0.5 text-sm text-gray-500">
                      <p>{client.email}</p>
                      <p>{client.phone}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white p-6">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    <User className="h-3.5 w-3.5" />
                    Émetteur
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {freelancer.name}
                  </p>
                  <p className="text-sm text-gray-500">{freelancer.activity}</p>
                  <div className="mt-2 space-y-0.5 text-sm text-gray-500">
                    <p>{freelancer.email}</p>
                    <p>{freelancer.address}</p>
                    <p>{freelancer.siret}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 px-6 py-4 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Date d&apos;émission
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {invoice.issuedAt}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Échéance
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    30 jours net
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Référence
                  </p>
                  <p className="mt-1 font-medium text-gray-900">{invoice.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Montant TTC
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {currency.format(total)}
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      <th className="px-6 py-3 font-medium">Description</th>
                      <th className="px-6 py-3 text-right font-medium">
                        Quantité
                      </th>
                      <th className="px-6 py-3 text-right font-medium">
                        Tarif unitaire
                      </th>
                      <th className="px-6 py-3 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-500">
                          {currency.format(item.rate)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          {currency.format(item.quantity * item.rate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end border-t border-gray-200 p-6">
                <dl className="w-full max-w-xs space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Sous-total</dt>
                    <dd className="font-medium text-gray-900">
                      {currency.format(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">
                      TVA ({Math.round(TAX_RATE * 100)} %)
                    </dt>
                    <dd className="font-medium text-gray-900">
                      {currency.format(tax)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <dt className="text-base font-semibold text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {currency.format(total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <p className="text-center text-xs text-gray-400">
              Merci pour votre confiance. Paiement par virement sous 30 jours.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
