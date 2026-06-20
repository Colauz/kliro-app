import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { initials } from "@/app/lib/format";
import { getAllClients } from "@/app/lib/data";

export default async function RecentClients() {
  const clients = await getAllClients();

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

      {clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 px-5 py-10 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-gray-900">Aucun client</p>
          <p className="text-sm text-gray-500">
            Vos clients récents apparaîtront ici.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {clients.map((client) => (
            <li key={client.id}>
              <Link
                href={`/clients/${client.id}`}
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
      )}
    </section>
  );
}
