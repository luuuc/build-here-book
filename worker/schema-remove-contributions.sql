-- Retire le formulaire de cartes et ses coordonnees de la base existante.
-- A executer apres le deploiement du Worker sans /contribution.
--
--   npx wrangler d1 execute build-here --remote --file=schema-remove-contributions.sql

DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS contributions;
