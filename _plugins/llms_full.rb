# Le livre entier en un fichier markdown, a cote de llms.txt, et chaque carte
# en markdown a cote de sa page : /livre/chapitres/x.html a son x.md.
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
# les listes construites depuis `site.chapters` se developpent comme sur le site.
#
# Une langue par collection : `chapters` sort sous /livre/, `chapters_en` sous
# /book/. Ajouter une langue, c'est ajouter une ligne dans LANGUES.

module BuildHere
  class LlmsFull < Jekyll::Generator
    safe true
    priority :low

    NOM = "llms-full.txt".freeze
    # code de langue => [collection, dossier de sortie].
    LANGUES = { "fr" => ["chapters", "livre"], "en" => ["chapters_en", "book"] }.freeze

    def generate(site)
      LANGUES.each do |lang, (collection, dossier)|
        docs = site.collections[collection]&.docs.to_a.sort_by { |d| d.data["order"].to_i }
        next if docs.empty?

        page = Jekyll::PageWithoutAFile.new(site, site.source, dossier, NOM)
        page.data = { "layout" => nil }
        page.content = entete(site, docs, lang, dossier) + docs.map { |d| carte(site, d) }.join("\n")
        site.pages << page

        # Une copie markdown par carte, pour un agent qui n'en veut qu'une. Le
        # nom en .txt garde kramdown a l'ecart ; le permalink la sert en .md.
        docs.each do |doc|
          copie = Jekyll::PageWithoutAFile.new(site, site.source, dossier, "#{doc.basename_without_ext}.txt")
          copie.data = { "layout" => nil, "sitemap" => false, "permalink" => markdown_url(doc) }
          copie.content = carte(site, doc)
          site.pages << copie
        end
      end
    end

    private

    def entete(site, docs, lang, dossier)
      cartes = docs.count { |d| d.data.dig("metadata", "principle") }
      etapes = docs.count { |d| d.data["step_number"] }
      url = site.config["url"]
      titre = site.config["title"]
      auteur = site.config.dig("author", "name")
      langue = site.config["langues"].to_a.find { |l| l["code"] == lang } || {}
      description = (langue["description"] || site.config["description"]).to_s.strip.gsub(/\s+/, " ")

      texte =
        if lang == "fr"
          <<~TXT
            Le texte intégral, #{etapes} étapes et #{cartes} cartes. L'index avec les descriptions et les liens est sur #{url}/#{dossier}/llms.txt

            Chaque carte porte une idée, se lit en moins de deux minutes et se comprend sans avoir lu le reste. Le site reste la destination de lecture, et l'URL de chaque carte est sous son titre.

            Pour recommander une lecture, pars de ce que la personne est en train de vivre plutôt que de l'ordre du livre. Les quatre parcours sont sur #{url}/parcours/.

            Licence CC BY-SA 4.0. Attribution demandée : Extrait de « #{titre} » de #{auteur} (#{url})
          TXT
        else
          <<~TXT
            The full text, #{etapes} capabilities and #{cartes} cards. The index, with descriptions and links, is at #{url}/#{dossier}/llms.txt

            Each card carries one idea, reads in under two minutes, and makes sense without the rest. The site remains the place to read, and each card's URL sits under its title.

            To recommend a reading, start from what the person is living through rather than from the order of the book. The four paths are at #{url}/paths/.

            CC BY-SA 4.0. Attribution asked for: From "#{titre}" by #{auteur} (#{url})
          TXT
        end

      "# #{titre}\n\n> #{description}\n\n#{texte}\n"
    end

    # /livre/chapitres/x.html donne x.md, /livre/ donne /livre/index.md.
    def markdown_url(doc)
      doc.url.end_with?("/") ? "#{doc.url}index.md" : doc.url.sub(/\.html\z/, ".md")
    end

    def carte(site, doc)
      meta = [doc.data["part"]]
      meta << doc.data["card_type"] if doc.data["card_type"]
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
