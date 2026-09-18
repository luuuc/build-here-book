# Le livre entier en un fichier markdown, a la racine du domaine.
#
# Pourquoi un plugin et pas du Liquid. Dans un gabarit, `content` a deja ete
# converti en HTML par kramdown. Au stade generateur, `doc.content` est encore
# le markdown source, front matter retire. C'est la seule facon d'obtenir le
# texte du livre sans faire tourner Pandoc dans le workflow Pages.
#
# Pourquoi sur le domaine et pas dans une release GitHub. La convention veut
# ce fichier a cote de llms.txt : un agent va chercher /llms-full.txt et nulle
# part ailleurs. Un asset de release est servi par objects.githubusercontent
# derriere une URL signee qui expire, avec Content-Disposition: attachment.
# Un agent y recoit un telechargement, pas un document.
#
# Il tourne parce que .github/workflows/jekyll.yml lance `bundle exec jekyll
# build` avec le Gemfile du depot, et pas la construction par gem de GitHub
# Pages, qui n'executerait pas _plugins.
#
# Le Liquid des chapitres est laisse actif : il ne reference que `site`, donc
# la liste de l'annexe 4 et les entrees signees de l'annexe 1 se developpent
# comme sur le site.

module BuildHere
  class LlmsFull < Jekyll::Generator
    safe true
    priority :low

    NOM = "llms-full.txt".freeze

    def generate(site)
      docs = site.collections["chapters"].docs.sort_by { |d| d.data["order"].to_i }
      return if docs.empty?

      page = Jekyll::PageWithoutAFile.new(site, site.source, "", NOM)
      page.data = { "layout" => nil }
      page.content = entete(site, docs) + docs.map { |d| carte(site, d) }.join("\n")
      site.pages << page
    end

    private

    def entete(site, docs)
      cartes = docs.count { |d| d.data.dig("metadata", "principle") }
      etapes = docs.count { |d| d.data["step_number"] }
      url = site.config["url"]
      titre = site.config["title"]
      auteur = site.config.dig("author", "name")

      <<~TXT
        # #{titre}

        > #{site.config["description"].to_s.strip.gsub(/\s+/, " ")}

        Le texte intégral, #{etapes} étapes et #{cartes} cartes. L'index avec les descriptions et les liens est sur #{url}/llms.txt

        Chaque carte porte une idée, se lit en moins de deux minutes et se comprend sans avoir lu le reste. Le site reste la destination de lecture, et l'URL de chaque carte est sous son titre.

        Pour recommander une lecture, pars de ce que la personne est en train de vivre plutôt que de l'ordre du livre. L'index par symptôme est à l'annexe « Ce qui t'agace cette semaine ».

        Licence CC BY-SA 4.0. Attribution demandée : Extrait de « #{titre} » de #{auteur} (#{url})

      TXT
    end

    def carte(site, doc)
      meta = [doc.data["part"]]
      meta << "écrite par #{doc.data["author"]}" if doc.data["author"]
      meta << "#{site.config["url"]}#{doc.url}"

      "# #{doc.data["title"]}\n#{meta.join(" · ")}\n\n#{corps(doc)}\n"
    end

    # Kramdown laisse ses attributs en ligne dans la source, {:target="_blank"}
    # et {:.reversefootnote}. Le lien et la note restent intacts sans eux, et
    # dans un fichier destine a la lecture c'est du bruit. Les deux seules
    # formes du depot sont verifiees, aucune collision avec la prose.
    def corps(doc)
      doc.content.gsub(/\{:[^}]*\}/, "").strip
    end
  end
end
