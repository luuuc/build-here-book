# La date du dernier commit de chaque page, pour le <lastmod> du sitemap.
#
# Sans elle, jekyll-sitemap met la date du build partout : chaque page semble
# changer a chaque push, et les moteurs finissent par ignorer la date. Un seul
# `git log` pour tout le depot, pas un par fichier.
#
# Le workflow Pages doit cloner l'historique entier (fetch-depth: 0), sinon
# chaque fichier prend la date du dernier commit. Un fichier jamais commite
# n'a pas de date et garde celle du build.

require "shellwords"
require "time"

Jekyll::Hooks.register :site, :post_read do |site|
  dates = {}
  date = nil
  log = `git -C #{site.source.shellescape} log --format=%cI --name-only 2>/dev/null`
  log.each_line(chomp: true) do |ligne|
    next if ligne.empty?
    if ligne.match?(/\A\d{4}-\d\d-\d\dT/)
      date = Time.parse(ligne)
    else
      dates[ligne] ||= date
    end
  end

  (site.pages + site.documents).each do |page|
    chemin = page.respond_to?(:relative_path) ? page.relative_path : page.path
    page.data["last_modified_at"] ||= dates[chemin] if dates[chemin]
  end
end
