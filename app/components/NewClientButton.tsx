"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/app/components/Modal";
import { TextField, SelectField } from "@/app/components/form-fields";

export default function NewClientButton({
  variant = "header",
}: {
  variant?: "header" | "empty";
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "empty"
            ? "inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
            : "inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
        }
      >
        <Plus className="h-4 w-4" strokeWidth={2.2} />
        {variant === "empty" ? (
          "Ajouter votre premier client"
        ) : (
          <span className="hidden sm:inline">Nouveau client</span>
        )}
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nouveau client"
        description="Ajoutez un client à votre portefeuille."
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
            <TextField
              id="name"
              label="Nom complet"
              placeholder="Camille Roy"
              autoComplete="name"
              required
            />
            <TextField
              id="company"
              label="Entreprise"
              placeholder="Client A"
              autoComplete="organization"
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="camille@exemple.com"
              autoComplete="email"
              required
            />
            <TextField
              id="phone"
              label="Téléphone"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
            />
            <div className="sm:col-span-2">
              <SelectField id="status" label="Statut" defaultValue="active">
                <option value="active">Actif</option>
                <option value="pending">En attente</option>
                <option value="archived">Archivé</option>
              </SelectField>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
            >
              Créer le client
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
