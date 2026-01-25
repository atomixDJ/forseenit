import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_')));

    try {
        const count = await (prisma as any).awardWinner.count();
        console.log('AwardWinner count:', count);
    } catch (e) {
        console.error('Failed to access AwardWinner:', (e as any).message);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
