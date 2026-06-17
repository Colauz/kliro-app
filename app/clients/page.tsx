import { Plus } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import ClientsTable from "@/app/components/ClientsTable";
import { clients } from "@/app/lib/mock-data";

export default function ClientsPage() {
  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div>
            <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
              Clients
            </h1>
            <p className="hidden text-sm text-gray-500 sm:block">
              Gérez vos clients et leurs projets.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Nouveau client</span>
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ClientsTable clients={clients} />
          </div>
        </main>
      </div>
    </div>
  );
}
