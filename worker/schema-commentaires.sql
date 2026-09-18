-- Les commentaires. Etape 6, a executer sur une base qui a deja schema.sql.
--
--   npx wrangler d1 execute build-here --remote --file=schema-commentaires.sql
--
-- Ce sont des discussions publiques autour des idees, pas de la relecture
-- editoriale. Un desaccord, un contexte de plus, une experience depuis un
-- autre marche, une question, un contre-exemple.
--
-- Rien ne s'affiche avant approbation. La moderation est le vrai filtre du
-- systeme, et tout le reste ne protege que l'attention de l'auteur.

CREATE TABLE IF NOT EXISTS commentaires (
  id        TEXT PRIMARY KEY,
  page      TEXT NOT NULL,
  titre     TEXT,
  -- Une reponse pointe le commentaire auquel elle repond. Pas de seconde
  -- table : une reponse est un commentaire, avec un parent.
  parent_id TEXT REFERENCES commentaires (id) ON DELETE CASCADE,
  auteur    TEXT NOT NULL,
  -- La ville ne s'affiche pas par defaut. Celui qui veut dire d'ou il ecrit
  -- l'ecrit dans sa phrase, ou c'est un argument, au lieu d'une etiquette ou
  -- c'est un decor.
  ville     TEXT,
  lien      TEXT,
  texte     TEXT NOT NULL,
  -- Le passage selectionne, quand le commentaire porte sur une phrase precise
  -- plutot que sur l'entree entiere.
  passage   TEXT,
  -- en_attente, publie, refuse
  etat      TEXT NOT NULL DEFAULT 'en_attente',
  -- Le rang trie la file, il ne refuse jamais.
  rang      INTEGER NOT NULL DEFAULT 0,
  -- Une reponse de l'auteur, ecrite depuis la file, parait sans attendre.
  auteur_du_livre INTEGER NOT NULL DEFAULT 0,
  client    TEXT,
  cree_le   INTEGER NOT NULL,
  maj_le    INTEGER NOT NULL
);

-- La lecture publique d'une page, dans l'ordre d'arrivee.
CREATE INDEX IF NOT EXISTS commentaires_page ON commentaires (page, etat, cree_le);
-- La file, ce qui attend d'abord.
CREATE INDEX IF NOT EXISTS commentaires_file ON commentaires (etat, rang, cree_le);
CREATE INDEX IF NOT EXISTS commentaires_parent ON commentaires (parent_id);

-- Les coordonnees vivent a part. Des coordonnees de
-- gens nommes attachees a un texte public sont la donnee la plus sensible du
-- systeme, et aucune lecture publique ne doit pouvoir les atteindre.
--
-- Une table distincte plutot qu'une table polymorphe a deux colonnes de plus :
-- deux objets, deux tables, et personne n'a a deviner ce qu'un `objet_type`
-- recouvre.
CREATE TABLE IF NOT EXISTS contacts_commentaires (
  commentaire_id TEXT PRIMARY KEY REFERENCES commentaires (id) ON DELETE CASCADE,
  canal          TEXT NOT NULL,
  valeur         TEXT NOT NULL,
  cree_le        INTEGER NOT NULL
);
