import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { getTonightRecommendations } from '@/app/actions/recommendations';
import { discoverMovies } from '@/lib/tmdb';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/tmdb', () => ({
    __esModule: true,
    discoverMovies: jest.fn(),
}));

jest.mock('@/lib/clerk-auth-helpers', () => ({
    __esModule: true,
    getAppUserId: jest.fn(() => null),
}));

jest.mock('@/lib/prisma', () => ({
    __esModule: true,
    prisma: {
        userSettings: { findUnique: jest.fn() },
        streamingSubscription: { findMany: jest.fn() },
        userPreferredGenre: { findMany: jest.fn() },
    },
}));

describe('getTonightRecommendations', () => {
    const mockDiscover = discoverMovies as jest.MockedFunction<typeof discoverMovies>;
    const mockUserSettings = prisma.userSettings.findUnique as jest.MockedFunction<any>;
    const mockSubs = prisma.streamingSubscription.findMany as jest.MockedFunction<any>;
    const mockGenres = prisma.userPreferredGenre.findMany as jest.MockedFunction<any>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns ALL mode when no user is logged in', async () => {
        mockDiscover.mockResolvedValue({ results: [{ id: 1, title: 'Movie A' }] } as any);
        const result = await getTonightRecommendations(undefined as any);
        expect(result.meta.providerMode).toBe('ALL');
        expect(result.movies).toHaveLength(1);
        expect(mockDiscover).toHaveBeenCalled();
    });

    it('applies fallback when results are insufficient', async () => {
        mockUserSettings.mockResolvedValue({ runtimeMin: 80, runtimeMax: 120 });
        mockSubs.mockResolvedValue([{ providerId: 8 }]);
        mockGenres.mockResolvedValue([
            { genreId: 35 },
            { genreId: 18 },
            { genreId: 28 },
        ]);
        mockDiscover
            .mockResolvedValueOnce({ results: [] } as any)
            .mockResolvedValueOnce({ results: [{ id: 2, title: 'Movie B' }] } as any)
            .mockResolvedValueOnce({ results: [{ id: 3, title: 'Movie C' }] } as any)
            .mockResolvedValueOnce({ results: [{ id: 4, title: 'Movie D' }] } as any)
            .mockResolvedValueOnce({ results: [{ id: 5, title: 'Movie E' }] } as any);
        const result = await getTonightRecommendations('user123');
        expect(result.meta.fellBack).toBe(true);
        expect(result.meta.fellBackFrom).toContain('runtime');
        // Note: 'genres' is removed in step 3 of fallback ladder when genres are dropped entirely
        expect(result.meta.fellBackFrom).toContain('MY_SERVICES');
        expect(result.movies).toHaveLength(1);
        expect(result.movies[0].id).toBe(5);
    });
});
