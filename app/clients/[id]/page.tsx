import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Plus,
  Pencil,
  Download,
  FileText,
  FolderOpen,
  FolderGit2,
} from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import MobileNav from "@/app/components/MobileNav";
import CopyPortalLink from "@/app/components/CopyPortalLink";
import EmptyState from "@/app/components/EmptyState";
import { currency, initials, documentIcons } from "@/app/lib/format";
import {
  getClientById,
  getProjectsByClient,
  getDocumentsByClient,
  getInvoicesByClient,
  type ClientStatus,
  type ProjectStatus,
  type InvoiceStatus,
} from "@/app/lib/data";

const clientStatusStyles: Record<
  ClientStatus,
  { label: string; className: string }
> = {
  active: { label: "Actif", className: "bg-emerald-50 text-emerald-700" },
  pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
  archived: { label: "Archivé", className: "bg-gray-100 text-gray-500" },
};

const projectStatusStyles: Record<
  ProjectStatus,
  { label: string; badge: string; bar: string }
> = {
  in_progress: {
    label: "En cours",
    badge: "bg-blue-50 text-blue-700",
    bar: "bg-blue-500",
  },
  review: {
    label: "En revue",
    badge: "bg-amber-50 text-amber-700",
    bar: "bg-amber-500",
  },
  completed: {
    label: "Terminé",
    badge: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-500",
  },
  on_hold: {
    label: "En pause",
    badge: "bg-gray-100 text-gray-500",
    bar: "bg-gray-400",
  },
};

const invoiceStatusStyles: Record<
  InvoiceStatus,
  { label: string; className: string }
> = {
  paid: { label: "Payée", className: "bg-emerald-50 text-emerald-700" },
  pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
  overdue: { label: "En retard", className: "bg-rose-50 text-rose-700" },
};

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  const [projects, clientInvoices, clientDocuments] = await Promise.all([
    getProjectsByClient(client.id),
    getInvoicesByClient(client.id),
    getDocumentsByClient(client.id),
  ]);
  const status = clientStatusStyles[client.status];

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center gap-3">
              <MobileNav />
              <Link
                href="/clients"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour aux clients
              </Link>
            </div>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
                    {initials(client.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                        {client.name}
                      </h1>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {client.company}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                      <a
                        href={`mailto:${client.email}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
                      >
                        <Mail className="h-4 w-4 text-gray-400" />
                        {client.email}
                      </a>
                      <a
                        href={`tel:${client.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
                      >
                        <Phone className="h-4 w-4 text-gray-400" />
                        {client.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {client.portalToken && (
                    <CopyPortalLink token={client.portalToken} />
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <Pencil className="h-4 w-4" />
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.2} />
                    Nouvelle facture
                  </button>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Projets actifs
                    </h2>
                    <span className="text-xs text-gray-500">
                      {projects.length} projet{projects.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {projects.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {projects.map((project) => {
                        const ps = projectStatusStyles[project.status];
                        return (
                          <li key={project.id} className="px-5 py-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                  <FolderGit2 className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {project.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Échéance : {project.dueDate}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${ps.badge}`}
                              >
                                {ps.label}
                              </span>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                                <div
                                  className={`h-full rounded-full ${ps.bar}`}
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                              <span className="w-9 shrink-0 text-right text-xs font-medium text-gray-500">
                                {project.progress}%
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <EmptyState
                      variant="card"
                      icon={<FolderGit2 className="h-5 w-5" />}
                      title="Aucun projet actif"
                      description="Ce client n'a pas de projet en cours."
                    />
                  )}
                </section>

                <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Factures récentes
                    </h2>
                    <span className="text-xs text-gray-500">
                      {clientInvoices.length} facture
                      {clientInvoices.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {clientInvoices.length > 0 ? (
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          <th className="px-5 py-3 font-medium">Facture</th>
                          <th className="px-5 py-3 font-medium">Date</th>
                          <th className="px-5 py-3 font-medium">Statut</th>
                          <th className="px-5 py-3 text-right font-medium">
                            Montant
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientInvoices.map((invoice) => {
                          const is = invoiceStatusStyles[invoice.status];
                          return (
                            <tr
                              key={invoice.id}
                              className="border-t border-gray-100 transition-colors hover:bg-gray-50"
                            >
                              <td className="px-5 py-3.5 font-medium text-gray-900">
                                {invoice.id}
                              </td>
                              <td className="px-5 py-3.5 text-gray-500">
                                {invoice.issuedAt}
                              </td>
                              <td className="px-5 py-3.5">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${is.className}`}
                                >
                                  {is.label}
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
                  ) : (
                    <EmptyState
                      variant="card"
                      icon={<FileText className="h-5 w-5" />}
                      title="Aucune facture"
                      description="Aucune facture émise pour ce client."
                    />
                  )}
                </section>
              </div>

              <section className="h-fit rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Documents partagés
                  </h2>
                  <span className="text-xs text-gray-500">
                    {clientDocuments.length}
                  </span>
                </div>

                {clientDocuments.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {clientDocuments.map((document) => {
                      const Icon = documentIcons[document.type];
                      return (
                        <li
                          key={document.id}
                          className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {document.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {document.size} · {document.sharedAt}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                            aria-label={`Télécharger ${document.name}`}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <EmptyState
                    variant="card"
                    icon={<FolderOpen className="h-5 w-5" />}
                    title="Aucun document"
                    description="Aucun fichier partagé avec ce client."
                  />
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
