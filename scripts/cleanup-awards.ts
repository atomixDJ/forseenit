import { PrismaClient } from '../lib/generated/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting invariant cleanup...');

    const winners = await prisma.awardWinner.findMany({
        include: {
            movie: true,
            seasonRel: {
                include: {
                    event: true
                }
            }
        }
    });

    let fixedCount = 0;

    for (const winner of winners) {
        const movieSeasonKey = winner.movie.seasonKey;
        const currentSeasonKey = winner.seasonRel.season;

        if (movieSeasonKey !== currentSeasonKey) {
            console.log(`Mismatch detected for ${winner.movieTitle}: ${currentSeasonKey} -> ${movieSeasonKey}`);

            // Find or create target season
            let targetSeason = await prisma.awardSeason.findFirst({
                where: {
                    eventId: winner.seasonRel.eventId,
                    season: movieSeasonKey
                }
            });

            if (!targetSeason) {
                targetSeason = await prisma.awardSeason.create({
                    data: {
                        eventId: winner.seasonRel.eventId,
                        year: parseInt(movieSeasonKey.split('_')[1]),
                        season: movieSeasonKey,
                        phase: winner.seasonRel.phase,
                        date: winner.seasonRel.date
                    }
                });
            }

            // Move the winner
            await prisma.awardWinner.update({
                where: { id: winner.id },
                data: { seasonId: targetSeason.id }
            });

            fixedCount++;
        }
    }

    console.log(`Cleanup complete. Fixed ${fixedCount} rows.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
