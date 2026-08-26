# The Dolpheverse Lore

Source for [dolphegd.github.io](https://dolphegd.github.io/) — a Jekyll site documenting the lore for Dolphe's Geometry Dash level series.

## Structure

The site is a plain Jekyll site (no third-party theme) built from three kinds of content:

- **`index.md`** — the homepage.
- **`classified-files.md`** / **`chronicles.md`** — landing ("hub") pages that list every section in that collection as a card grid.
- **`_classified/*.md`** and **`_chronicles/*.md`** — one file per section (e.g. `_classified/team-cascade.md`, `_chronicles/prologue.md`). Each is a Jekyll [collection](https://jekyllrb.com/docs/collections/) item and becomes its own page at `/classified-files/<slug>/` or `/chronicles/<slug>/`.

Look and feel lives in:

- **`_layouts/`** — `default.html` (base shell), `hub.html` (card-grid landing pages), `entry.html` (individual section pages, with breadcrumb + prev/next).
- **`_includes/`** — shared header/nav and `<head>` markup.
- **`assets/css/style.css`** — all site styling, including dark mode support.

Images live under `assets/<section>/images/` (e.g. `assets/classified-files/images/`, `assets/chronicles/images/`) so that files extracted from different documents never collide by name.

## Adding or updating lore from a Google Doc

1. In Google Docs: **File → Download → Markdown**.
2. Run the cleaning script on the exported file:

   ```
   python clean_google_md.py "My Doc.md" -o "cleaned_My Doc"
   ```

   This extracts every embedded image to `cleaned_My Doc/assets/images/` and rewrites the Markdown to reference them, and also fixes a Google Docs quirk where single-row tables (used as boxes/callouts) don't render in kramdown — see the comments in `clean_google_md.py` for details.
3. Split the cleaned Markdown into per-section files under `_classified/` or `_chronicles/` (one file per top-level `#` heading), each with front matter like:

   ```yaml
   ---
   layout: entry
   title: "Section Title"
   icon: "🔬"
   order: 5
   section: chronicles   # or classified-files
   ---
   ```

   `order` controls where the section sits in that hub's card grid and in the prev/next navigation on entry pages.
4. Move the extracted images into `assets/<section>/images/` and update any `assets/images/...` paths in the Markdown to `/assets/<section>/images/...` (absolute, leading slash).

`clean_google_md.py` is intentionally not part of the published site (it's excluded via `.gitignore`) — it's a local authoring tool, not a page.

## Previewing locally

This repo includes a `Gemfile` pinned to the same gems GitHub Pages uses to build the live site, so a local preview matches production:

```
gem install bundler
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. Jekyll watches the source and rebuilds automatically when you edit a Markdown file (editing `_config.yml` needs a restart).
