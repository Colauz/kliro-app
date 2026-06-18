import { Users } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import MobileNav from "@/app/components/MobileNav";
import ClientsTable from "@/app/components/ClientsTable";
import NewClientButton from "@/app/components/NewClientButton";
import EmptyState from "@/app/components/EmptyState";
import type { Client } from "@/app/lib/mock-data";

// Temporaire : tableau vide pour tester l'état vide.
const clientsData: Client[] = [];

export default function ClientsPage() {
  const isEmpty = clientsData.length === 0;

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div>
              <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
                Clients
              </h1>
              <p className="hidden text-sm text-gray-500 sm:block">
                Gérez vos clients et leurs projets.
              </p>
            </div>
          </div>

          <NewClientButton />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {isEmpty ? (
              <EmptyState
                icon={Users}
                title="Aucun client pour le moment"
                description="Commencez par ajouter votre premier client pour centraliser vos projets, factures et documents."
                actionButton={<NewClientButton variant="empty" />}
              />
            ) : (
              <ClientsTable clients={clientsData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
