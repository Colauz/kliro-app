"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Mail, Eye, MoreHorizontal, Users } from "lucide-react";
import type { Client, ClientStatus } from "@/app/lib/mock-data";

// Avec des données mock, toutes les lignes pointent vers la première fiche.
const CLIENT_DETAIL_HREF = "/clients/c1";

const statusStyles: Record<ClientStatus, { label: string; className: string }> =
  {
    active: { label: "Actif", className: "bg-emerald-50 text-emerald-700" },
    pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
    archived: { label: "Archivé", className: "bg-gray-100 text-gray-500" },
  };

const filters: { value: ClientStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "active", label: "Actifs" },
  { value: "pending", label: "En attente" },
  { value: "archived", label: "Archivés" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ClientsTable({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ClientStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((client) => {
      const matchesStatus = status === "all" || client.status === status;
      const matchesQuery =
        q === "" ||
        client.name.toLowerCase().includes(q) ||
        client.company.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [clients, query, status]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un client…"
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
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Entreprise</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">
                Contact
              </th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => {
              const badge = statusStyles[client.status];
              return (
                <tr
                  key={client.id}
                  onClick={() => router.push(CLIENT_DETAIL_HREF)}
                  className="cursor-pointer border-t border-gray-100 transition-colors hover:bg-gray-100"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                        {initials(client.name)}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={CLIENT_DETAIL_HREF}
                          onClick={(e) => e.stopPropagation()}
                          className="block truncate font-medium text-gray-900 hover:underline"
                        >
                          {client.name}
                        </Link>
                        <p className="truncate text-xs text-gray-500">
                          {client.activeProjects} projet
                          {client.activeProjects > 1 ? "s" : ""} actif
                          {client.activeProjects > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{client.company}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 md:table-cell">
                    <p className="text-gray-900">{client.email}</p>
                    <p className="text-xs text-gray-500">{client.phone}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={CLIENT_DETAIL_HREF}
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label={`Voir ${client.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label={`Contacter ${client.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        aria-label={`Plus d'options pour ${client.name}`}
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
              <Users className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              Aucun client trouvé
            </p>
            <p className="text-sm text-gray-500">
              Essayez un autre terme de recherche ou un autre filtre.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 px-5 py-3 text-xs text-gray-500">
        {filtered.length} client{filtered.length > 1 ? "s" : ""} affiché
        {filtered.length > 1 ? "s" : ""} sur {clients.length}
      </div>
    </section>
  );
}
