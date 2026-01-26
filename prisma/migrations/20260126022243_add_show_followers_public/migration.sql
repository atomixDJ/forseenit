-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSettings" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "providerMode" TEXT NOT NULL DEFAULT 'ALL',
    "region" TEXT,
    "runtimeMin" INTEGER,
    "runtimeMax" INTEGER,
    "showFollowersPublic" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserSettings" ("providerMode", "region", "runtimeMax", "runtimeMin", "updatedAt", "userId") SELECT "providerMode", "region", "runtimeMax", "runtimeMin", "updatedAt", "userId" FROM "UserSettings";
DROP TABLE "UserSettings";
ALTER TABLE "new_UserSettings" RENAME TO "UserSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
