# Sets last_modified_at from each page's last commit, for the sitemap <lastmod>.
# Needs full git history (fetch-depth: 0 in jekyll.yml), otherwise every page gets the latest commit date.

require "shellwords"
require "time"

Jekyll::Hooks.register :site, :post_read do |site|
  dates = {}
  date = nil
  log = `git -C #{site.source.shellescape} log --format=%cI --name-only 2>/dev/null`
  log.each_line(chomp: true) do |line|
    next if line.empty?
    if line.match?(/\A\d{4}-\d\d-\d\dT/)
      date = Time.parse(line)
    else
      dates[line] ||= date
    end
  end

  (site.pages + site.documents).each do |page|
    path = page.respond_to?(:relative_path) ? page.relative_path : page.path
    page.data["last_modified_at"] ||= dates[path] if dates[path]
  end
end
