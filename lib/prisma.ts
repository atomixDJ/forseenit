import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query'],
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Force a fresh client and bypass global caching for this reload
export const prisma = prismaClientSingleton()
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
