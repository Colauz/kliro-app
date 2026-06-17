"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/app/components/Modal";
import { TextField, SelectField } from "@/app/components/form-fields";
import { clients } from "@/app/lib/mock-data";

export default function NewInvoiceButton() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Comportement mock : on ferme simplement le panneau pour l'instant.
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
      >
        <Plus className="h-4 w-4" strokeWidth={2.2} />
        <span className="hidden sm:inline">Nouvelle facture</span>
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nouvelle facture"
        description="Créez une facture pour l'un de vos clients."
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <SelectField
                id="client"
                label="Client"
                defaultValue={clients[0]?.company}
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.company}>
                    {client.company} — {client.name}
                  </option>
                ))}
              </SelectField>
            </div>
            <TextField id="date" label="Date d'émission" type="date" />
            <TextField
              id="amount"
              label="Montant (HT)"
              type="number"
              placeholder="1 450"
            />
            <div className="sm:col-span-2">
              <SelectField id="status" label="Statut" defaultValue="pending">
                <option value="pending">En attente</option>
                <option value="paid">Payée</option>
                <option value="overdue">En retard</option>
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
              Créer la facture
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
