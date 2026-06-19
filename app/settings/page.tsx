import { User, Building2, Landmark, Save } from "lucide-react";
import Sidebar from "@/app/components/Sidebar";
import MobileNav from "@/app/components/MobileNav";
import { TextField } from "@/app/components/form-fields";
import { initials } from "@/app/lib/format";
import { freelancer } from "@/app/lib/data";

function SettingsCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-gray-200 px-6 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div>
              <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
                Paramètres
              </h1>
              <p className="hidden text-sm text-gray-500 sm:block">
                Gérez votre profil, votre entreprise et vos coordonnées
                bancaires.
              </p>
            </div>
          </div>

          <button
            type="submit"
            form="settings-form"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Enregistrer</span>
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <form id="settings-form" className="mx-auto max-w-3xl space-y-6">
            <SettingsCard
              icon={<User className="h-4 w-4" />}
              title="Profil personnel"
              description="Vos informations personnelles et votre photo."
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xl font-semibold text-white">
                  {initials(freelancer.name)}
                </div>
                <div>
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Changer la photo
                  </button>
                  <p className="mt-1.5 text-xs text-gray-500">
                    JPG ou PNG, 2 Mo maximum.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  id="fullName"
                  label="Nom complet"
                  defaultValue={freelancer.name}
                  autoComplete="name"
                />
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  defaultValue={freelancer.email}
                  autoComplete="email"
                />
                <TextField
                  id="phone"
                  label="Téléphone"
                  type="tel"
                  defaultValue={freelancer.phone}
                  autoComplete="tel"
                />
                <TextField
                  id="activity"
                  label="Activité"
                  defaultValue="Design & Branding"
                />
              </div>
            </SettingsCard>

            <SettingsCard
              icon={<Building2 className="h-4 w-4" />}
              title="Détails de l'entreprise"
              description="Informations légales affichées sur vos factures."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  id="companyName"
                  label="Nom de l'entreprise"
                  defaultValue="Studio Moreau"
                  autoComplete="organization"
                />
                <TextField
                  id="siret"
                  label="SIRET"
                  defaultValue="902 345 678 00014"
                />
                <div className="sm:col-span-2">
                  <TextField
                    id="address"
                    label="Adresse complète"
                    defaultValue={freelancer.address}
                    autoComplete="street-address"
                  />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard
              icon={<Landmark className="h-4 w-4" />}
              title="Facturation & coordonnées bancaires"
              description="Utilisées pour recevoir les paiements de vos clients."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <TextField
                    id="iban"
                    label="IBAN"
                    defaultValue="FR76 3000 4000 0512 3456 7890 143"
                  />
                </div>
                <TextField
                  id="bic"
                  label="BIC / SWIFT"
                  defaultValue="BNPAFRPPXXX"
                />
                <div>
                  <label
                    htmlFor="currency"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Devise par défaut
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    defaultValue="EUR"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="EUR">EUR — Euro (€)</option>
                    <option value="USD">USD — Dollar US ($)</option>
                    <option value="GBP">GBP — Livre sterling (£)</option>
                    <option value="CHF">CHF — Franc suisse</option>
                  </select>
                </div>
              </div>
            </SettingsCard>

            <div className="flex justify-end gap-2 pb-2">
              <button
                type="reset"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
              >
                <Save className="h-4 w-4" />
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
