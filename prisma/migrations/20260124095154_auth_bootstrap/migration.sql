-- AlterTable
ALTER TABLE "ImportAuditRow" ADD COLUMN "rawJson" TEXT;

-- CreateTable
CREATE TABLE "UserSettings" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "providerMode" TEXT NOT NULL DEFAULT 'ALL',
    "region" TEXT,
    "runtimeMin" INTEGER,
    "runtimeMax" INTEGER,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OnboardingState" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "lastNudgedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OnboardingState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserPreferredGenre" (
    "userId" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "genreId"),
    CONSTRAINT "UserPreferredGenre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "tmdbId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "backdropPath" TEXT,
    "eligibleDate" DATETIME,
    "eligibilityYear" INTEGER,
    "seasonKey" TEXT
);
INSERT INTO "new_Movie" ("eligibilityYear", "eligibleDate", "posterPath", "seasonKey", "title", "tmdbId") SELECT "eligibilityYear", "eligibleDate", "posterPath", "seasonKey", "title", "tmdbId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE TABLE "new_MovieInteraction" (
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "watched" BOOLEAN NOT NULL DEFAULT false,
    "watchlisted" BOOLEAN NOT NULL DEFAULT false,
    "favorited" BOOLEAN NOT NULL DEFAULT false,
    "ratingHalf" INTEGER,
    "ratedAt" DATETIME,
    "favoritedAt" DATETIME,
    "watchedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "movieId"),
    CONSTRAINT "MovieInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MovieInteraction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovieInteraction" ("favorited", "favoritedAt", "movieId", "ratedAt", "ratingHalf", "updatedAt", "userId", "watched", "watchedAt", "watchlisted") SELECT "favorited", "favoritedAt", "movieId", "ratedAt", "ratingHalf", "updatedAt", "userId", "watched", "watchedAt", "watchlisted" FROM "MovieInteraction";
DROP TABLE "MovieInteraction";
ALTER TABLE "new_MovieInteraction" RENAME TO "MovieInteraction";
CREATE INDEX "MovieInteraction_userId_watched_idx" ON "MovieInteraction"("userId", "watched");
CREATE INDEX "MovieInteraction_userId_favorited_idx" ON "MovieInteraction"("userId", "favorited");
CREATE INDEX "MovieInteraction_userId_watchlisted_idx" ON "MovieInteraction"("userId", "watchlisted");
CREATE INDEX "MovieInteraction_userId_updatedAt_idx" ON "MovieInteraction"("userId", "updatedAt");
CREATE INDEX "MovieInteraction_userId_watchedAt_idx" ON "MovieInteraction"("userId", "watchedAt");
CREATE TABLE "new_MovieListItem" (
    "listId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "position" INTEGER,
    "note" TEXT,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("listId", "movieId"),
    CONSTRAINT "MovieListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "MovieList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MovieListItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovieListItem" ("addedAt", "listId", "movieId", "note", "position") SELECT "addedAt", "listId", "movieId", "note", "position" FROM "MovieListItem";
DROP TABLE "MovieListItem";
ALTER TABLE "new_MovieListItem" RENAME TO "MovieListItem";
CREATE UNIQUE INDEX "MovieListItem_listId_position_key" ON "MovieListItem"("listId", "position");
CREATE TABLE "new_WatchLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "watchedAt" DATETIME NOT NULL,
    "rewatch" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,
    "note" TEXT,
    "importId" TEXT,
    "importRowId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WatchLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WatchLog_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ImportRun" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WatchLog_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WatchLog" ("createdAt", "id", "importId", "importRowId", "movieId", "note", "rewatch", "tags", "userId", "watchedAt") SELECT "createdAt", "id", "importId", "importRowId", "movieId", "note", "rewatch", "tags", "userId", "watchedAt" FROM "WatchLog";
DROP TABLE "WatchLog";
ALTER TABLE "new_WatchLog" RENAME TO "WatchLog";
CREATE INDEX "WatchLog_userId_movieId_watchedAt_idx" ON "WatchLog"("userId", "movieId", "watchedAt");
CREATE INDEX "WatchLog_userId_watchedAt_idx" ON "WatchLog"("userId", "watchedAt");
CREATE UNIQUE INDEX "WatchLog_userId_movieId_watchedAt_importId_key" ON "WatchLog"("userId", "movieId", "watchedAt", "importId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "UserPreferredGenre_userId_idx" ON "UserPreferredGenre"("userId");

-- CreateIndex
CREATE INDEX "UserPreferredGenre_genreId_idx" ON "UserPreferredGenre"("genreId");

-- CreateIndex
CREATE INDEX "Review_movieId_idx" ON "Review"("movieId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");
