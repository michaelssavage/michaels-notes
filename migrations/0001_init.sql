CREATE TABLE movies (
  id        INTEGER PRIMARY KEY,
  title     TEXT    NOT NULL,
  year      TEXT    NOT NULL,
  status    TEXT    NOT NULL,
  image_url TEXT    NOT NULL,
  link_url  TEXT    NOT NULL
);

-- One table per guide collection. Add more as needed.
CREATE TABLE "barcelona-guide" (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  location    TEXT NOT NULL DEFAULT '',
  link        TEXT NOT NULL DEFAULT '',
  price       TEXT NOT NULL DEFAULT '',
  image       TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  tags        TEXT NOT NULL DEFAULT '[]', -- JSON array of GuideTag
  type        TEXT NOT NULL,
  coord_lat   REAL,
  coord_lng   REAL
);

CREATE TABLE feedback (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  text       TEXT    NOT NULL,
  ip         TEXT    NOT NULL,
  created_at TEXT    NOT NULL  -- ISO 8601
);

CREATE TABLE feedback_tracking (
  key        TEXT PRIMARY KEY,  -- "{ip}:{hour}"
  count      INTEGER NOT NULL DEFAULT 0,
  created_at TEXT    NOT NULL
);