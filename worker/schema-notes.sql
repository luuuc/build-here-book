-- Les notes. Etape 7, a executer sur une base qui a deja schema.sql.
--
--   npx wrangler d1 execute build-here --remote --file=schema-notes.sql
--
-- Le but est l'intelligence editoriale, pas le score. Ce qui vaut n'est pas
-- le compte des « oui », c'est la raison attachee a un « a moitie ».

CREATE TABLE IF NOT EXISTS notes (
  id          TEXT PRIMARY KEY,
  -- L'URL de l'entree, telle que le livre la sert.
  page        TEXT NOT NULL,
  titre       TEXT,
  -- oui, moitie, non
  valeur      TEXT NOT NULL,
  -- La raison structuree, quand ce n'est pas oui.
  raison      TEXT,
  -- Le commentaire libre. Il ne s'affiche jamais nulle part : c'est ce qui
  -- lui evite toute moderation, et ce qui permet d'etre franc dedans.
  commentaire TEXT,
  client      TEXT NOT NULL,
  cree_le     INTEGER NOT NULL,
  maj_le      INTEGER NOT NULL
);

-- Un avis par navigateur et par entree. Revoter remplace, ca ne s'ajoute pas :
-- quelqu'un qui change d'avis ne doit pas compter deux fois.
CREATE UNIQUE INDEX IF NOT EXISTS notes_page_client ON notes (page, client);
CREATE INDEX IF NOT EXISTS notes_page ON notes (page, valeur);
