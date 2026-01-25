import { PrismaClient } from '../lib/generated/client';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
console.log(`Debug DB URL: file:${dbPath}`);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`
        }
    }
});

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
            console.log(`  - [${item.position}] DB Title: "${item.movie.title}" (ID: ${item.movie.tmdbId})`);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
