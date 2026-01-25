-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MovieInteraction" (
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
    CONSTRAINT "MovieInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WatchLog" (
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
    CONSTRAINT "WatchLog_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ImportRun" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "watchLogId" TEXT,
    "bodyRaw" TEXT NOT NULL,
    "bodyFormat" TEXT NOT NULL DEFAULT 'markdown',
    "ratingHalf" INTEGER,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_watchLogId_fkey" FOREIGN KEY ("watchLogId") REFERENCES "WatchLog" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReviewComment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewFavorite" (
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("reviewId", "userId"),
    CONSTRAINT "ReviewFavorite_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MovieList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "isRanked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MovieList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MovieListItem" (
    "listId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "position" INTEGER,
    "note" TEXT,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("listId", "movieId"),
    CONSTRAINT "MovieListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "MovieList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImportRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'letterboxd',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ImportRun_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImportAuditRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "importId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "letterboxdUrl" TEXT,
    "tmdbMovieId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "message" TEXT,
    CONSTRAINT "ImportAuditRow_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ImportRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ballot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eventYear" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "nomineeId" TEXT NOT NULL,
    "nomineeName" TEXT NOT NULL,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ballot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AwardEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AwardSeason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "season" TEXT NOT NULL DEFAULT '2024_2025',
    "phase" TEXT NOT NULL DEFAULT 'COMING_SOON',
    "date" DATETIME,
    CONSTRAINT "AwardSeason_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "AwardEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movie" (
    "tmdbId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "eligibleDate" DATETIME NOT NULL,
    "eligibilityYear" INTEGER NOT NULL,
    "seasonKey" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AwardWinner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seasonId" TEXT NOT NULL,
    "prizeName" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "movieTitle" TEXT NOT NULL,
    "posterPath" TEXT,
    "personName" TEXT,
    "personPath" TEXT,
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "sourceUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AwardWinner_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "AwardSeason" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AwardWinner_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StreamingSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "providerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logoPath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StreamingSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "MovieInteraction_userId_watched_idx" ON "MovieInteraction"("userId", "watched");

-- CreateIndex
CREATE INDEX "MovieInteraction_userId_favorited_idx" ON "MovieInteraction"("userId", "favorited");

-- CreateIndex
CREATE INDEX "MovieInteraction_userId_watchlisted_idx" ON "MovieInteraction"("userId", "watchlisted");

-- CreateIndex
CREATE INDEX "WatchLog_userId_movieId_watchedAt_idx" ON "WatchLog"("userId", "movieId", "watchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WatchLog_userId_movieId_watchedAt_importId_key" ON "WatchLog"("userId", "movieId", "watchedAt", "importId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_watchLogId_key" ON "Review"("watchLogId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_movieId_watchLogId_key" ON "Review"("userId", "movieId", "watchLogId");

-- CreateIndex
CREATE INDEX "ReviewComment_reviewId_createdAt_idx" ON "ReviewComment"("reviewId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MovieList_userId_title_key" ON "MovieList"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "MovieListItem_listId_position_key" ON "MovieListItem"("listId", "position");

-- CreateIndex
CREATE INDEX "ImportAuditRow_importId_status_idx" ON "ImportAuditRow"("importId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ImportAuditRow_importId_fileName_rowNumber_key" ON "ImportAuditRow"("importId", "fileName", "rowNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Ballot_userId_eventYear_category_key" ON "Ballot"("userId", "eventYear", "category");

-- CreateIndex
CREATE UNIQUE INDEX "AwardEvent_name_key" ON "AwardEvent"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AwardEvent_slug_key" ON "AwardEvent"("slug");

-- CreateIndex
CREATE INDEX "AwardSeason_season_idx" ON "AwardSeason"("season");

-- CreateIndex
CREATE UNIQUE INDEX "AwardSeason_eventId_year_key" ON "AwardSeason"("eventId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "AwardSeason_eventId_season_key" ON "AwardSeason"("eventId", "season");

-- CreateIndex
CREATE INDEX "AwardWinner_movieId_idx" ON "AwardWinner"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "StreamingSubscription_userId_providerId_key" ON "StreamingSubscription"("userId", "providerId");
