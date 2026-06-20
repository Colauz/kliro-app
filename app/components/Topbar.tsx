import { Search, Bell } from "lucide-react";
import MobileNav from "@/app/components/MobileNav";
import NewInvoiceButton from "@/app/components/NewInvoiceButton";
import type { Client } from "@/app/lib/data";

export default function Topbar({ clients = [] }: { clients?: Client[] }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <MobileNav />
        <div>
          <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
            Tableau de bord
          </h1>
          <p className="hidden text-sm text-gray-500 sm:block">
            Bon retour, Julie. Voici un aperçu de votre activité.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher…"
            className="w-56 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
          />
        </div>

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:text-gray-900"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gray-900" />
        </button>

        <NewInvoiceButton clients={clients} />
      </div>
    </header>
  );
}
