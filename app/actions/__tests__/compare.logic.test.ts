import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { getCompareData } from '../compare';
import { prisma } from '@/lib/prisma';
import { requireAppUserIdAction } from '@/lib/clerk-auth-helpers';

jest.mock('@/lib/prisma', () => ({
    prisma: {
        user: { findUnique: jest.fn() },
        follow: { findUnique: jest.fn() },
        userTopTen: { findMany: jest.fn() },
        movieInteraction: {
            findMany: jest.fn(),
            aggregate: jest.fn()
        },
        movie: { findMany: jest.fn() }
    }
}));

jest.mock('@/lib/clerk-auth-helpers', () => ({
    requireAppUserIdAction: jest.fn()
}));

describe('getCompareData logic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calculates correct overlaps for ratings and top ten', async () => {
        // Mock Auth
        (requireAppUserIdAction as jest.Mock).mockResolvedValue({ ok: true, userId: 'user-1' });

        // Mock Users
        (prisma.user.findUnique as jest.Mock).mockImplementation((args: any) => {
            if (args.where.handle === 'peer') return Promise.resolve({ id: 'peer-1', handle: 'peer', name: 'Peer', image: null });
            if (args.where.id === 'user-1') return Promise.resolve({ id: 'user-1', handle: 'self', name: 'Self', image: null });
            return Promise.resolve(null);
        });

        // Mock Follow
        (prisma.follow.findUnique as jest.Mock).mockResolvedValue({ followerId: 'user-1', followingId: 'peer-1' });

        // Mock Data Fetching (Payloads)
        (prisma.userTopTen.findMany as jest.Mock).mockImplementation((args: any) => {
            if (args.where.userId === 'user-1') return Promise.resolve([{ tmdbId: 1 }, { tmdbId: 2 }, { tmdbId: 3 }]);
            if (args.where.userId === 'peer-1') return Promise.resolve([{ tmdbId: 1 }, { tmdbId: 4 }, { tmdbId: 5 }]);
            return Promise.resolve([]);
        });

        (prisma.movieInteraction.findMany as jest.Mock).mockImplementation((args: any) => {
            // Ratings check
            if (args.where.watched) {
                if (args.where.userId === 'user-1') return Promise.resolve([
                    { movieId: 1, ratingHalf: 8 },
                    { movieId: 4, ratingHalf: 8 },
                    { movieId: 5, ratingHalf: 10 }
                ]);
                if (args.where.userId === 'peer-1') return Promise.resolve([
                    { movieId: 1, ratingHalf: 8 },
                    { movieId: 2, ratingHalf: 8 },
                    { movieId: 5, ratingHalf: 9 }
                ]);
            }
            // Defaults for favorites and recent
            return Promise.resolve([]);
        });

        (prisma.movieInteraction.aggregate as jest.Mock).mockResolvedValue({
            _avg: { ratingHalf: 8 },
            _count: { ratingHalf: 3 }
        });

        (prisma.movie.findMany as jest.Mock).mockResolvedValue([]);

        const result = await getCompareData('peer');

        // Overlaps:
        // Top Ten: [1, 2, 3] vs [1, 4, 5] => [1]
        expect(result.overlaps.topTen).toEqual([1]);

        // Ratings 4.0 (8+): Self [1, 4, 5], Peer [1, 2, 5] => [1, 5]
        expect(result.overlaps.highRatings["4.0"]).toContain(1);
        expect(result.overlaps.highRatings["4.0"]).toContain(5);
        expect(result.overlaps.highRatings["4.0"]).toHaveLength(2);

        // Ratings 4.5 (9+): Self [5], Peer [5] => [5]
        expect(result.overlaps.highRatings["4.5"]).toEqual([5]);
    });
});
