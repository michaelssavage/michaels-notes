CREATE TABLE IF NOT EXISTS page_views (
  slug     TEXT NOT NULL,
  category TEXT NOT NULL,
  count    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, category)
);

CREATE TABLE IF NOT EXISTS page_view_ips (
  slug     TEXT NOT NULL,
  category TEXT NOT NULL,
  ip       TEXT NOT NULL,
  date     TEXT NOT NULL,
  PRIMARY KEY (slug, category, ip, date)
);
