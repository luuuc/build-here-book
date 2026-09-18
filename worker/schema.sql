-- Les compteurs temporaires partages par les interactions publiques.
--
--   npx wrangler d1 create build-here
--   npx wrangler d1 execute build-here --remote --file=schema.sql
--
-- Le garde-fou anti-flood. Une cle est un condensat de l'adresse IP avec un
-- sel qui tourne chaque jour : non reversible, et non correlable d'un jour a
-- l'autre. Les lignes expirees sont supprimees a la volee, donc la table ne
-- garde jamais plus d'une fenetre d'activite.
CREATE TABLE IF NOT EXISTS garde (
  cle     TEXT PRIMARY KEY,
  compte  INTEGER NOT NULL,
  fenetre INTEGER NOT NULL
);
