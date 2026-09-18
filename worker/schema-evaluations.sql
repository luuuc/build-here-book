-- Les resultats anonymes de l'Ultimate Builder Test.
--
--   npx wrangler d1 execute build-here --remote --file=schema-evaluations.sql
--
-- Pas de reponses individuelles, de contact, de client stable ni d'adresse IP.

CREATE TABLE IF NOT EXISTS evaluations (
  id        TEXT PRIMARY KEY,
  version   INTEGER NOT NULL,
  scores    TEXT NOT NULL,
  niveau    INTEGER NOT NULL,
  prochain  INTEGER NOT NULL,
  cree_le   INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS evaluations_niveau ON evaluations (version, niveau, prochain);
CREATE INDEX IF NOT EXISTS evaluations_date ON evaluations (cree_le);
