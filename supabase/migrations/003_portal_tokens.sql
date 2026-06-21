-- Kliro – ajout du token de portail sur les clients
-- À exécuter dans l'éditeur SQL de votre projet Supabase.

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS portal_token uuid DEFAULT gen_random_uuid();

-- Remplir les lignes existantes qui auraient NULL
UPDATE clients SET portal_token = gen_random_uuid() WHERE portal_token IS NULL;

ALTER TABLE clients
  ALTER COLUMN portal_token SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS clients_portal_token_idx ON clients (portal_token);
