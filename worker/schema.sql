-- L'etat de la communaute. Le contenu publie reste dans Git.
--
--   npx wrangler d1 create build-here
--   npx wrangler d1 execute build-here --remote --file=schema.sql
--
-- Deux tables et pas une, et c'est le point de securite du plan. Les
-- coordonnees d'un contributeur nomme, attachees a un texte public, sont la
-- donnee la plus sensible du systeme. Elles vivent a part pour qu'aucune
-- lecture publique ne puisse les atteindre, meme par erreur de requete.

CREATE TABLE IF NOT EXISTS contributions (
  id            TEXT PRIMARY KEY,
  -- Pas de colonne `type`. Le perimetre est « les entrees seulement », decide
  -- avant d'ecrire une ligne. Une colonne qu'aucun code ne lit fait croire au
  -- suivant que le systeme gere plusieurs types. La ligne d'annexe 4 arrivera
  -- avec sa migration, qui est un ALTER TABLE avec un defaut.
  titre         TEXT,
  markdown      TEXT NOT NULL,
  auteur        TEXT NOT NULL,
  auteur_lien   TEXT,
  -- Le rapport du linter au moment de l'envoi, en JSON. Garde tel quel :
  -- les regles peuvent changer, et on veut savoir ce que le contributeur a
  -- vu, pas ce que le linter dirait aujourd'hui.
  rapport       TEXT,
  -- recue, en_relecture, a_corriger, pr_ouverte, refusee. Cinq, et le code
  -- ecrit les cinq.
  etat          TEXT NOT NULL DEFAULT 'recue',
  note          TEXT,
  pr_url        TEXT,
  -- Le rang de la file. Plus haut, plus douteux : liens en nombre, longueur
  -- aberrante, jeton de formulaire absent. Jamais un refus, un ordre de tri.
  rang          INTEGER NOT NULL DEFAULT 0,
  client        TEXT,
  cree_le       INTEGER NOT NULL,
  maj_le        INTEGER NOT NULL
);

-- La file se lit par rang puis par arrivee, c'est l'ordre de l'interface.
CREATE INDEX IF NOT EXISTS contributions_file ON contributions (etat, rang, cree_le);
CREATE INDEX IF NOT EXISTS contributions_client ON contributions (client, cree_le);

CREATE TABLE IF NOT EXISTS contacts (
  contribution_id TEXT PRIMARY KEY REFERENCES contributions (id) ON DELETE CASCADE,
  -- mail ou whatsapp, au choix du contributeur
  canal           TEXT NOT NULL,
  valeur          TEXT NOT NULL,
  cree_le         INTEGER NOT NULL
);

-- Le garde-fou anti-flood. Une cle est un condensat de l'adresse IP avec un
-- sel qui tourne chaque jour : non reversible, et non correlable d'un jour a
-- l'autre. Les lignes expirees sont supprimees a la volee, donc la table ne
-- garde jamais plus d'une fenetre d'activite.
CREATE TABLE IF NOT EXISTS garde (
  cle     TEXT PRIMARY KEY,
  compte  INTEGER NOT NULL,
  fenetre INTEGER NOT NULL
);
