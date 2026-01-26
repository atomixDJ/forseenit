---
description: How to reset and fully seed the database after a migrate reset
---

# DB Reset Recovery

After running `npx prisma migrate reset` or starting from a fresh database, run these scripts in order:

## 1. Generate Prisma Client
```bash
npx prisma generate
```

## 2. Seed Awards Data
```bash
npx tsx scripts/seed-awards.ts
```

## 3. Seed Community Lists
```bash
npx tsx scripts/seed-community-lists.ts
```

## 4. Backfill Genre IDs (Required for Genre Affinity)
```bash
npx tsx scripts/backfill-genre-ids.ts
```

> **Important:** Without this step, Genre Affinity will show "—" on Profile and Compare pages because `Movie.genreIds` will be null.

## Verification

After all scripts complete:
- Profile page should show actual genre names (Drama, Comedy, etc.) not "—"
- Compare page should show each user's dominant genre

## Data Format Notes

| Field | Format | Example |
|-------|--------|---------|
| `Movie.genreIds` | Comma-separated string of TMDb genre IDs | `"18,80"` (Drama, Crime) |
| `getTopGenre()` | Expects comma-separated string, parses to numbers | Input: `"18,80"` → Output: `"Drama"` |
