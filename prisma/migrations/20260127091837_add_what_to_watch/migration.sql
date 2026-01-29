-- CreateTable
CREATE TABLE "WhatToWatchSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "partnerId" TEXT,
    "mode" TEXT NOT NULL,
    "pace" INTEGER NOT NULL,
    "tone" INTEGER NOT NULL,
    "era" INTEGER NOT NULL,
    "fairness" INTEGER,
    "region" TEXT NOT NULL DEFAULT 'US',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WhatToWatchSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WhatToWatchSession_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WhatToWatchResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "heroMovieId" INTEGER NOT NULL,
    "alt1MovieId" INTEGER NOT NULL,
    "alt2MovieId" INTEGER NOT NULL,
    "alt3MovieId" INTEGER NOT NULL,
    "reasonsJson" TEXT,
    "seed" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatToWatchResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WhatToWatchSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WhatToWatchExposure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "sessionId" TEXT,
    "shownAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatToWatchExposure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "WhatToWatchSession_userId_idx" ON "WhatToWatchSession"("userId");

-- CreateIndex
CREATE INDEX "WhatToWatchResult_sessionId_createdAt_idx" ON "WhatToWatchResult"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "WhatToWatchExposure_userId_movieId_idx" ON "WhatToWatchExposure"("userId", "movieId");

-- CreateIndex
CREATE INDEX "WhatToWatchExposure_userId_shownAt_idx" ON "WhatToWatchExposure"("userId", "shownAt");

-- CreateIndex (Partial Unique: enforce one active session per user)
-- SQLite supports partial indexes via WHERE clause
CREATE UNIQUE INDEX IF NOT EXISTS "what_to_watch_one_active_per_user" 
  ON "WhatToWatchSession"("userId") WHERE "isActive" = 1;
