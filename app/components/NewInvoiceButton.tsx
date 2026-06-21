"use client";

import { useState, useEffect, useActionState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/app/components/Modal";
import { TextField, SelectField } from "@/app/components/form-fields";
import { addInvoice } from "@/app/lib/actions/invoices";
import { type Client } from "@/app/lib/data";

export default function NewInvoiceButton({
  variant = "header",
  clients = [],
}: {
  variant?: "header" | "empty";
  clients?: Client[];
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(addInvoice, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state]);

  const today = new Date().toISOString().split("T")[0];

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
          "Créer votre première facture"
        ) : (
          <span className="hidden sm:inline">Nouvelle facture</span>
        )}
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nouvelle facture"
        description="Créez une facture pour l'un de vos clients."
      >
        <form action={formAction}>
          <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
            {state.error && (
              <p className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {state.error}
              </p>
            )}
            <div className="sm:col-span-2">
              <SelectField
                id="clientId"
                label="Client"
                defaultValue={clients[0]?.id}
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.company} — {client.name}
                  </option>
                ))}
              </SelectField>
            </div>
            <TextField
              id="date"
              label="Date d'émission"
              type="date"
              defaultValue={today}
            />
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
              disabled={pending}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 disabled:opacity-60"
            >
              {pending ? "Création..." : "Créer la facture"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
