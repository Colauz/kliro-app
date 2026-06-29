-- Kliro – ajoute les colonnes manquantes à la table `clients`
-- À exécuter dans l'éditeur SQL de votre projet Supabase.
--
-- Contexte : la table `clients` existait déjà avant l'exécution de
-- 001_initial_schema.sql. Comme ce script utilise CREATE TABLE IF NOT EXISTS,
-- la table n'a pas été recréée et certaines colonnes (status, active_projects…)
-- n'ont jamais été ajoutées. D'où l'erreur PGRST204 « Could not find the
-- 'status' column of 'clients' in the schema cache ».

ALTER TABLE clients ADD COLUMN IF NOT EXISTS company         text        NOT NULL DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email           text        NOT NULL DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS phone           text        NOT NULL DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status          text        NOT NULL DEFAULT 'active';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS active_projects integer     NOT NULL DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS created_at      timestamptz NOT NULL DEFAULT now();

-- Contrainte CHECK sur status (ajoutée seulement si absente).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'clients_status_check'
  ) THEN
    ALTER TABLE clients
      ADD CONSTRAINT clients_status_check
      CHECK (status IN ('active', 'pending', 'archived'));
  END IF;
END $$;

-- Force PostgREST à recharger son cache de schéma immédiatement.
NOTIFY pgrst, 'reload schema';
