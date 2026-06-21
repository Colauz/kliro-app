import { FolderOpen, Download, Upload } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import MobileNav from "@/app/components/MobileNav";
import EmptyState from "@/app/components/EmptyState";
import { documentIcons } from "@/app/lib/format";
import { getAllDocuments } from "@/app/lib/data";

export default async function DocumentsPage() {
  const documents = await getAllDocuments();
  const isEmpty = documents.length === 0;

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div>
              <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
                Documents
              </h1>
              <p className="hidden text-sm text-gray-500 sm:block">
                Tous les fichiers partagés avec vos clients.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
          >
            <Upload className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Envoyer un fichier</span>
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {isEmpty ? (
              <EmptyState
                icon={
                  <FolderOpen
                    className="h-7 w-7 text-gray-400"
                    strokeWidth={1.5}
                  />
                }
                title="Aucun document pour le moment"
                description="Partagez des fichiers avec vos clients depuis leur fiche ou depuis cette page."
              />
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      <th className="px-5 py-3 font-medium">Fichier</th>
                      <th className="hidden px-5 py-3 font-medium sm:table-cell">
                        Client
                      </th>
                      <th className="hidden px-5 py-3 font-medium md:table-cell">
                        Type
                      </th>
                      <th className="hidden px-5 py-3 font-medium md:table-cell">
                        Taille
                      </th>
                      <th className="hidden px-5 py-3 font-medium lg:table-cell">
                        Date
                      </th>
                      <th className="px-5 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => {
                      const Icon = documentIcons[doc.type];
                      return (
                        <tr
                          key={doc.id}
                          className="border-t border-gray-100 transition-colors hover:bg-gray-50"
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="max-w-[180px] truncate font-medium text-gray-900 sm:max-w-xs">
                                {doc.name}
                              </span>
                            </div>
                          </td>
                          <td className="hidden px-5 py-3.5 text-gray-500 sm:table-cell">
                            {doc.clientCompany || doc.clientName || "—"}
                          </td>
                          <td className="hidden px-5 py-3.5 md:table-cell">
                            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                              {doc.type}
                            </span>
                          </td>
                          <td className="hidden px-5 py-3.5 text-gray-500 md:table-cell">
                            {doc.size}
                          </td>
                          <td className="hidden px-5 py-3.5 text-gray-500 lg:table-cell">
                            {doc.sharedAt}
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">
                                Télécharger
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
