import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { clients } from "@/app/lib/mock-data";

// Avec des données mock, toutes les lignes pointent vers la première fiche.
const CLIENT_DETAIL_HREF = "/clients/c1";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function RecentClients() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">Clients récents</h2>
        <Link
          href="/clients"
          className="inline-flex items-center gap-0.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          Voir tout
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="divide-y divide-gray-100">
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={CLIENT_DETAIL_HREF}
              className="flex cursor-pointer items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-100"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                {initials(client.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {client.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {client.company}
                </p>
              </div>
              <span className="shrink-0 text-xs text-gray-500">
                {client.activeProjects} projet
                {client.activeProjects > 1 ? "s" : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
