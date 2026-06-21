-- Kliro – schéma initial
-- À exécuter dans l'éditeur SQL de votre projet Supabase.
-- Si les tables clients et invoices existent déjà, utilisez les blocs ALTER TABLE
-- commentés en bas pour ajouter uniquement les colonnes manquantes.

-- ─── Tables ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS clients (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name          text        NOT NULL,
  company       text        NOT NULL DEFAULT '',
  email         text        NOT NULL DEFAULT '',
  phone         text        NOT NULL DEFAULT '',
  status        text        NOT NULL DEFAULT 'active'
                            CHECK (status IN ('active', 'pending', 'archived')),
  active_projects integer   NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- id = 'INV-001', généré par l'application
CREATE TABLE IF NOT EXISTS invoices (
  id            text        PRIMARY KEY,
  user_id       uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id     uuid        REFERENCES clients(id) ON DELETE SET NULL,
  amount        numeric(10, 2) NOT NULL DEFAULT 0,
  status        text        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('paid', 'pending', 'overdue')),
  issued_at     text        NOT NULL DEFAULT '',
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id     uuid        REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  name          text        NOT NULL,
  status        text        NOT NULL DEFAULT 'in_progress'
                            CHECK (status IN ('in_progress', 'review', 'completed', 'on_hold')),
  progress      integer     NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  due_date      text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id     uuid        REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  name          text        NOT NULL,
  type          text        NOT NULL
                            CHECK (type IN ('PDF', 'DOCX', 'XLSX', 'PNG', 'ZIP')),
  size          text        NOT NULL DEFAULT '',
  shared_at     text        NOT NULL DEFAULT '',
  storage_path  text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── Row Level Security ─────────────────────────────────────────────────────────

ALTER TABLE clients   ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices  ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_clients"   ON clients   FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_invoices"  ON invoices  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_projects"  ON projects  FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_documents" ON documents FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─── Si vos tables clients / invoices existent déjà ────────────────────────────
-- Ajoutez user_id et activez RLS manuellement :
--
-- ALTER TABLE clients  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
-- ALTER TABLE invoices ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
-- ALTER TABLE clients  ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "users_own_clients"  ON clients  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- CREATE POLICY "users_own_invoices" ON invoices FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
