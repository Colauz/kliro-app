import { FileText } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import MobileNav from "@/app/components/MobileNav";
import InvoicesTable from "@/app/components/InvoicesTable";
import NewInvoiceButton from "@/app/components/NewInvoiceButton";
import EmptyState from "@/app/components/EmptyState";
import { getAllInvoices, getAllClients } from "@/app/lib/data";

export default function InvoicesPage() {
  const invoices = getAllInvoices();
  const clients = getAllClients();
  const isEmpty = invoices.length === 0;

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div>
              <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
                Factures
              </h1>
              <p className="hidden text-sm text-gray-500 sm:block">
                Suivez vos factures et leur statut de paiement.
              </p>
            </div>
          </div>

          <NewInvoiceButton />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {isEmpty ? (
              <EmptyState
                icon={<FileText className="h-7 w-7 text-gray-400" strokeWidth={1.5} />}
                title="Aucune facture pour le moment"
                description="Créez votre première facture pour suivre vos paiements et informer vos clients."
                actionButton={<NewInvoiceButton variant="empty" />}
              />
            ) : (
              <InvoicesTable invoices={invoices} clients={clients} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
