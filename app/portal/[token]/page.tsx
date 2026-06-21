import { notFound } from "next/navigation";
import {
  CircleDot,
  ArrowRight,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { currency, documentIcons } from "@/app/lib/format";
import { getPortalData } from "@/app/lib/portal";

const TAX_RATE = 0.2;

function firstName(name: string) {
  return name.split(" ")[0];
}

export default async function PortalTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const data = await getPortalData(token);

  if (!data) notFound();

  const { client, freelancerName, invoices, documents } = data;
  const unpaidInvoices = invoices.filter((i) => i.status !== "paid");

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <CircleDot className="h-6 w-6 text-gray-900" strokeWidth={2.2} />
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              {freelancerName}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Bon retour, {firstName(client.name)}.
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Voici les derniers éléments partagés par {freelancerName} pour{" "}
            {client.company}.
          </p>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Action requise
            </h2>
          </div>

          {unpaidInvoices.length > 0 ? (
            <div className="space-y-4">
              {unpaidInvoices.map((invoice) => {
                const total = invoice.amount * (1 + TAX_RATE);
                const isOverdue = invoice.status === "overdue";
                return (
                  <div
                    key={invoice.id}
                    className={`rounded-2xl border bg-white p-6 shadow-sm ${
                      isOverdue ? "border-rose-200" : "border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            Facture #{invoice.id}
                          </p>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              isOverdue
                                ? "bg-rose-50 text-rose-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {isOverdue ? "En retard" : "En attente"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Émise le {invoice.issuedAt} · Échéance 30 jours
                        </p>
                        <p className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
                          {currency.format(total)}
                          <span className="ml-1.5 text-sm font-normal text-gray-400">
                            TTC
                          </span>
                        </p>
                      </div>

                      {/* Stripe Checkout ici */}
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 sm:w-auto"
                      >
                        Payer maintenant
                        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                Tout est à jour
              </p>
              <p className="text-sm text-gray-500">
                Vous n&apos;avez aucune facture en attente de paiement.
              </p>
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Documents partagés
            </h2>
          </div>

          {documents.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <ul className="divide-y divide-gray-100">
                {documents.map((doc) => {
                  const Icon = documentIcons[doc.type];
                  return (
                    <li
                      key={doc.id}
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.type} · {doc.size} · partagé le {doc.sharedAt}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Télécharger</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500 shadow-sm">
              Aucun document partagé pour le moment.
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-gray-200 py-6">
        <p className="text-center text-xs text-gray-400">
          Propulsé par Kliro · Espace client sécurisé
        </p>
      </footer>
    </div>
  );
}
