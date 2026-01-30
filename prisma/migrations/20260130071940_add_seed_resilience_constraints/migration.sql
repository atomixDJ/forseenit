/*
  Warnings:

  - You are about to alter the column `seed` on the `WhatToWatchResult` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - A unique constraint covering the columns `[seasonId,prizeName,movieId,personName]` on the table `AwardWinner` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WhatToWatchResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "heroMovieId" INTEGER NOT NULL,
    "alt1MovieId" INTEGER NOT NULL,
    "alt2MovieId" INTEGER NOT NULL,
    "alt3MovieId" INTEGER NOT NULL,
    "reasonsJson" TEXT,
    "seed" BIGINT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatToWatchResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WhatToWatchSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WhatToWatchResult" ("alt1MovieId", "alt2MovieId", "alt3MovieId", "createdAt", "heroMovieId", "id", "reasonsJson", "seed", "sessionId") SELECT "alt1MovieId", "alt2MovieId", "alt3MovieId", "createdAt", "heroMovieId", "id", "reasonsJson", "seed", "sessionId" FROM "WhatToWatchResult";
DROP TABLE "WhatToWatchResult";
ALTER TABLE "new_WhatToWatchResult" RENAME TO "WhatToWatchResult";
CREATE INDEX "WhatToWatchResult_sessionId_createdAt_idx" ON "WhatToWatchResult"("sessionId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AwardWinner_seasonId_prizeName_movieId_personName_key" ON "AwardWinner"("seasonId", "prizeName", "movieId", "personName");
