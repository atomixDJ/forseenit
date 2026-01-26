import { prisma } from '../lib/prisma';

async function main() {
    console.log("Checking System Lists...");
    const lists = await prisma.movieList.findMany({
        where: { isSystem: true },
        include: {
            items: {
                include: { movie: true },
                orderBy: { position: 'asc' }
            }
        }
    });

    for (const list of lists) {
        console.log(`\nList: ${list.title} (${list.items.length} items)`);
        for (const item of list.items) {
            console.log(`  - [${item.position}] DB Title: "${item.movie?.title ?? 'N/A'}" (ID: ${item.movie?.tmdbId ?? 'N/A'})`);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
