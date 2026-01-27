#!/bin/bash
# =============================================================
# DB Reset Recovery Script
# Run after: npx prisma migrate reset
# =============================================================

set -e  # Exit on any error

echo "=========================================="
echo "  ForSeenIt - DB Reset Recovery"
echo "=========================================="
echo ""

cd "$(dirname "$0")/.."

echo "[1/5] Generating Prisma client..."
npx prisma generate

echo ""
echo "[2/5] Seeding Awards data..."
npx tsx scripts/seed-awards.ts 2>&1 | grep -v "prisma:query" || true

echo ""
echo "[3/5] Seeding Curated Collections..."
npx tsx scripts/seed-community-lists.ts 2>&1 | grep -v "prisma:query" || true

echo ""
echo "[4/5] Backfilling Genre IDs..."
npx tsx scripts/backfill-genre-ids.ts 2>&1 | grep -v "prisma:query" || true

echo ""
echo "[5/5] Verifying seeds..."
npx tsx scripts/verify-seeds.ts

echo ""
echo "=========================================="
echo "  ✅ DB Reset Recovery Complete!"
echo "=========================================="
