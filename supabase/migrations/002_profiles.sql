-- Kliro – table profiles (une ligne par utilisateur)
-- À exécuter dans l'éditeur SQL de votre projet Supabase.

CREATE TABLE IF NOT EXISTS profiles (
  user_id      uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name         text NOT NULL DEFAULT '',
  email        text NOT NULL DEFAULT '',
  phone        text NOT NULL DEFAULT '',
  activity     text NOT NULL DEFAULT '',
  company_name text NOT NULL DEFAULT '',
  address      text NOT NULL DEFAULT '',
  siret        text NOT NULL DEFAULT '',
  iban         text NOT NULL DEFAULT '',
  bic          text NOT NULL DEFAULT '',
  currency     text NOT NULL DEFAULT 'EUR',
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_profile" ON profiles FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
