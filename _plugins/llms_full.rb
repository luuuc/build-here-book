# Writes llms-full.txt per language (the whole book as markdown) and an x.md copy next to each card page.
# A generator, not Liquid: at this stage doc.content is still the markdown source.
# Runs only because jekyll.yml builds with bundler; the GitHub Pages gem build skips _plugins.

module BuildHere
  class LlmsFull < Jekyll::Generator
    safe true
    priority :low

    NAME = "llms-full.txt".freeze
    # language code => [collection, output folder]
    LANGUAGES = { "fr" => ["chapters", "livre"], "en" => ["chapters_en", "book"] }.freeze

    def generate(site)
      LANGUAGES.each do |lang, (collection, folder)|
        docs = site.collections[collection]&.docs.to_a.sort_by { |d| d.data["order"].to_i }
        next if docs.empty?

        page = Jekyll::PageWithoutAFile.new(site, site.source, folder, NAME)
        page.data = { "layout" => nil }
        page.content = header(site, docs, lang, folder) + docs.map { |d| card(site, d) }.join("\n")
        site.pages << page

        # Named .txt so kramdown leaves it alone; the permalink serves it as .md.
        docs.each do |doc|
          copied = Jekyll::PageWithoutAFile.new(site, site.source, folder, "#{doc.basename_without_ext}.txt")
          copied.data = { "layout" => nil, "sitemap" => false, "permalink" => markdown_url(doc) }
          copied.content = card(site, doc)
          site.pages << copied
        end
      end
    end

    private

    def header(site, docs, lang, folder)
      cards = docs.count { |d| d.data.dig("metadata", "principle") }
      steps = docs.count { |d| d.data["step_number"] }
      url = site.config["url"]
      title = site.config["title"]
      author = site.config.dig("author", "name")
      language = site.config["languages"].to_a.find { |l| l["code"] == lang } || {}
      description = (language["description"] || site.config["description"]).to_s.strip.gsub(/\s+/, " ")

      text =
        if lang == "fr"
          <<~TXT
            Le texte intégral, #{steps} étapes et #{cards} cartes. L'index avec les descriptions et les liens est sur #{url}/#{folder}/llms.txt

            Chaque carte porte une idée, se lit en moins de deux minutes et se comprend sans avoir lu le reste. Le site reste la destination de lecture, et l'URL de chaque carte est sous son titre.

            Pour recommander une lecture, pars de ce que la personne est en train de vivre plutôt que de l'ordre du livre. Les quatre parcours sont sur #{url}/parcours/.

            Licence CC BY-SA 4.0. Attribution demandée : Extrait de « #{title} » de #{author} (#{url})
          TXT
        else
          <<~TXT
            The full text, #{steps} capabilities and #{cards} cards. The index, with descriptions and links, is at #{url}/#{folder}/llms.txt

            Each card carries one idea, reads in under two minutes, and makes sense without the rest. The site remains the place to read, and each card's URL sits under its title.

            To recommend a reading, start from what the person is living through rather than from the order of the book. The four paths are at #{url}/paths/.

            CC BY-SA 4.0. Attribution asked for: From "#{title}" by #{author} (#{url})
          TXT
        end

      "# #{title}\n\n> #{description}\n\n#{text}\n"
    end

    # /livre/chapitres/x.html -> x.md, /livre/ -> /livre/index.md
    def markdown_url(doc)
      doc.url.end_with?("/") ? "#{doc.url}index.md" : doc.url.sub(/\.html\z/, ".md")
    end

    def card(site, doc)
      meta = [doc.data["part"]]
      meta << doc.data["card_type"] if doc.data["card_type"]
      meta << "#{site.config["url"]}#{doc.url}"

      "# #{doc.data["title"]}\n#{meta.join(" · ")}\n\n#{body(doc)}\n"
    end

    # Strips kramdown inline attributes like {:target="_blank"}.
    def body(doc)
      doc.content.gsub(/\{:[^}]*\}/, "").strip
    end
  end
end
