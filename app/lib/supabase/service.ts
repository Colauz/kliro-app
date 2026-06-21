import { createClient } from "@supabase/supabase-js";

// Utilisé uniquement côté serveur (portail public, routes API).
// Ne jamais importer ce fichier dans un composant client.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquant. Ajoutez-le dans .env.local " +
        "(Supabase Dashboard → Settings → API → service_role)."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
