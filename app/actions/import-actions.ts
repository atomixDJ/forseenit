"use server";

import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { resolveMovieId, type ResolverCache } from "@/lib/tmdb";
import AdmZip from "adm-zip";
import { parse } from "csv-parse/sync";
import { revalidatePath } from "next/cache";
import { syncMovie } from "./movies";

/**
 * Uploads a Letterboxd ZIP export and creates an ImportRun with audit rows.
 */
export async function uploadLetterboxdZip(formData: FormData) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");
    const userId = authResult.userId;

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");

    // ZIP size limit (10MB)
    if (file.size > 10 * 1024 * 1024) throw new Error("File too large (max 10MB)");

    const buffer = Buffer.from(await file.arrayBuffer());
    let zip: AdmZip;
    try {
        zip = new AdmZip(buffer);
    } catch (e) {
        throw new Error("Invalid ZIP file format");
    }

    const zipEntries = zip.getEntries();

    // 1. Create ImportRun
    const importRun = await prisma.importRun.create({
        data: {
            userId,
            status: "processing",
        },
    });

    try {
        let rowsCount = 0;

        // 2. Parse entries and create AuditRows
        for (const entry of zipEntries) {
            if (entry.isDirectory) continue;

            const fileName = entry.entryName;
            const lowerFileName = fileName.toLowerCase();

            // Supported: direct CSVs and anything in lists subfolder
            const isSupportedCsv = lowerFileName.endsWith('.csv') && (
                lowerFileName.includes('lists/') ||
                ['diary.csv', 'ratings.csv', 'reviews.csv', 'watchlist.csv'].includes(lowerFileName)
            );

            if (isSupportedCsv) {
                const content = entry.getData().toString('utf8');
                const records = parse(content, {
                    columns: true,
                    skip_empty_lines: true,
                    relax_column_count: true,
                    relax_quotes: true
                });

                if (records.length === 0) continue;

                // Create audit rows in chunks
                const chunkSize = 100;
                for (let i = 0; i < records.length; i += chunkSize) {
                    const chunk = records.slice(i, i + chunkSize);
                    await prisma.importAuditRow.createMany({
                        data: chunk.map((row: any, index: number) => ({
                            importId: importRun.id,
                            fileName,
                            rowNumber: i + index + 1,
                            title: row.Name || row.Title || "",
                            year: parseInt(row.Year) || null,
                            letterboxdUrl: row.URL || null,
                            status: "pending",
                            rawJson: JSON.stringify(row),
                        })),
                    });
                    rowsCount += chunk.length;
                }
            }
        }

        if (rowsCount === 0) {
            await prisma.importRun.update({
                where: { id: importRun.id },
                data: { status: "failed" },
            });
            throw new Error("No valid CSV files found in ZIP");
        }

        return { success: true, importId: importRun.id, rowsCount };
    } catch (error: any) {
        console.error("Import error during parsing:", error);
        await prisma.importRun.update({
            where: { id: importRun.id },
            data: { status: "failed" },
        });
        throw new Error(error.message);
    }
}

/**
 * Processes a pending ImportRun: resolves IDs and creates app entities.
 */
export async function processImportRun(importId: string) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");
    const userId = authResult.userId;

    const importRun = await prisma.importRun.findUnique({
        where: { id: importId, userId },
        include: { auditRows: true },
    });

    if (!importRun || importRun.status !== "processing") return;

    const resolverCache: ResolverCache = new Map();

    for (const row of importRun.auditRows) {
        if (row.status !== "pending") continue;

        try {
            const { id: tmdbId, isAmbiguous } = await resolveMovieId(row.title, row.year, resolverCache);

            if (!tmdbId) {
                await prisma.importAuditRow.update({
                    where: { id: row.id },
                    data: { status: "unmatched", message: "TMDb could not find this title." },
                });
                continue;
            }

            if (isAmbiguous) {
                await prisma.importAuditRow.update({
                    where: { id: row.id },
                    data: { tmdbMovieId: tmdbId, status: "ambiguous", message: "Multiple TMDb matches found." },
                });
                continue;
            }

            // Matched! Apply to database
            await applyAuditRowToEntities(userId, importRun.id, row.id, tmdbId, row.fileName, row.rawJson);

            await prisma.importAuditRow.update({
                where: { id: row.id },
                data: { tmdbMovieId: tmdbId, status: "matched" },
            });
        } catch (e: any) {
            await prisma.importAuditRow.update({
                where: { id: row.id },
                data: { status: "error", message: e.message },
            });
        }
    }

    await prisma.importRun.update({
        where: { id: importId },
        data: { status: "completed" },
    });

    revalidatePath("/profile");
}

/**
 * Manually resolve an unmatched/ambiguous row.
 */
export async function resolveAuditRow(auditRowId: string, tmdbId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");
    const userId = authResult.userId;

    const row = await prisma.importAuditRow.findUnique({
        where: { id: auditRowId },
        include: { importRun: true }
    });

    if (!row || row.importRun.userId !== userId) throw new Error("Unauthorized");

    // Apply to entities
    await applyAuditRowToEntities(userId, row.importId, row.id, tmdbId, row.fileName, row.rawJson);

    // Mark as matched
    await prisma.importAuditRow.update({
        where: { id: auditRowId },
        data: { tmdbMovieId: tmdbId, status: "matched", message: "Manually resolved" }
    });

    revalidatePath(`/settings/import/letterboxd/${row.importId}/review`);
}

/**
 * Bulk resolve ambiguous or unmatched rows that have a suggesting tmdbMovieId.
 */
export async function bulkResolveAuditRows(importId: string, rowIds: string[]) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");
    const userId = authResult.userId;

    const rows = await prisma.importAuditRow.findMany({
        where: {
            id: { in: rowIds },
            importId,
            status: { in: ['ambiguous', 'unmatched'] },
            tmdbMovieId: { not: null }
        },
        include: { importRun: true }
    });

    for (const row of rows) {
        if (row.importRun.userId !== userId) continue;
        if (!row.tmdbMovieId) continue;

        // Apply to entities
        await applyAuditRowToEntities(userId, row.importId, row.id, row.tmdbMovieId, row.fileName, row.rawJson);

        // Mark as matched
        await prisma.importAuditRow.update({
            where: { id: row.id },
            data: { status: "matched", message: "Bulk resolved" }
        });
    }

    revalidatePath(`/settings/import/letterboxd/${importId}/review`);
    revalidatePath("/profile");
}

/**
 * Core mapping logic from CSV row to App Entities.
 */
async function applyAuditRowToEntities(userId: string, importRunId: string, auditRowId: string, tmdbId: number, fileName: string, rawJson: string | null) {
    if (!rawJson) return;
    await syncMovie(tmdbId);
    const data = JSON.parse(rawJson);
    const lowerFile = fileName.toLowerCase();

    // 1. Interaction State (Upsert)
    // Most imports imply the movie has been "watched" unless it's just a list or watchlist.
    const isWatchlist = lowerFile.includes('watchlist.csv');

    await prisma.movieInteraction.upsert({
        where: { userId_movieId: { userId, movieId: tmdbId } },
        create: {
            userId,
            movieId: tmdbId,
            watched: !isWatchlist,
            watchlisted: isWatchlist,
            watchedAt: !isWatchlist ? new Date() : null
        },
        update: {
            watched: isWatchlist ? undefined : true,
            watchlisted: isWatchlist ? true : undefined
        },
    });

    // 2. Ratings
    if (data.Rating) {
        const ratingHalf = Math.round(parseFloat(data.Rating) * 2);
        await prisma.movieInteraction.update({
            where: { userId_movieId: { userId, movieId: tmdbId } },
            data: {
                ratingHalf,
                ratedAt: new Date(),
                watched: true // Rating implies watched
            },
        });
    }

    // 3. Diary / WatchLog
    if (lowerFile.includes('diary.csv')) {
        const watchedAtStr = data["Watched Date"] || data.Date;
        if (watchedAtStr) {
            const watchedAt = new Date(watchedAtStr);
            await prisma.watchLog.upsert({
                where: {
                    userId_movieId_watchedAt_importId: {
                        userId,
                        movieId: tmdbId,
                        watchedAt,
                        importId: importRunId
                    }
                },
                update: {},
                create: {
                    userId,
                    movieId: tmdbId,
                    watchedAt,
                    rewatch: data.Rewatch === "Yes",
                    tags: data.Tags || undefined,
                    importId: importRunId,
                    importRowId: auditRowId
                }
            });
        }
    }

    // 4. Reviews
    if (lowerFile.includes('reviews.csv')) {
        const existingReview = await prisma.review.findFirst({
            where: { userId, movieId: tmdbId, watchLogId: null }
        });

        if (existingReview) {
            await prisma.review.update({
                where: { id: existingReview.id },
                data: {
                    bodyRaw: data.Review || "",
                    ratingHalf: data.Rating ? Math.round(parseFloat(data.Rating) * 2) : undefined,
                }
            });
        } else {
            await prisma.review.create({
                data: {
                    userId,
                    movieId: tmdbId,
                    bodyRaw: data.Review || "",
                    bodyFormat: "html",
                    ratingHalf: data.Rating ? Math.round(parseFloat(data.Rating) * 2) : undefined,
                }
            });
        }
    }

    // 5. Lists
    if (lowerFile.includes('lists/')) {
        // Extract list title from filename: "lists/My Favorites.csv" -> "My Favorites"
        const listTitle = fileName.replace(/^.*[\\\/]/, '').replace(/\.csv$/i, '') || "Imported List";
        const list = await prisma.movieList.upsert({
            where: { userId_title: { userId, title: listTitle } },
            create: { userId, title: listTitle, isRanked: !!data.Position },
            update: {},
        });

        await prisma.movieListItem.upsert({
            where: { listId_movieId: { listId: list.id, movieId: tmdbId } },
            create: {
                listId: list.id,
                movieId: tmdbId,
                position: data.Position ? parseInt(data.Position) : undefined,
                note: data.Description || undefined
            },
            update: {
                position: data.Position ? parseInt(data.Position) : undefined,
            }
        });
    }
}
