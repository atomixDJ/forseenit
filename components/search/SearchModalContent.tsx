"use client";

/**
 * Search Modal Content
 * 
 * ISOLATION NOTE: This modal maintains LOCAL filter state only.
 * It is intentionally NOT synced with the /discover page URL params.
 * If future sync is needed, do it via query params—not by threading
 * state across unrelated components.
 */

import { Search as SearchIcon, Loader2, X as XIcon, Users, Film } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import PosterCard from "@/components/movie/PosterCard";
import { GenreFilterRow, DecadeFilterRow, RatingFilterRow } from "@/components/discovery/filters";
import { DECADES, RATINGS, type Genre } from "@/lib/discovery/filters";

interface MovieResult {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];  // TMDB returns this in search results
}

interface SearchResponse {
    results: MovieResult[];
}

interface SearchModalContentProps {
    onMovieSelect?: () => void;  // Callback to close modal
}

// Genre type imported from @/lib/discovery/filters

interface UserResult {
    id: string;
    handle: string;
    name: string | null;
    image: string | null;
    followerCount: number;
}

type SearchTab = "movies" | "people";

// DECADES and RATINGS imported from @/lib/discovery/filters

const STORAGE_KEY = 'search-modal-state';

interface SavedSearchState {
    query: string;
    genreId: number | null;  // Changed to single-select to match shared component
    decadeKey: string | null;
    minRating: number | null;
}

export default function SearchModalContent({ onMovieSelect }: SearchModalContentProps = {}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Watchlist IDs for badge display
    const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());

    // Load initial state from sessionStorage or URL params
    const getInitialState = (): SavedSearchState => {
        if (typeof window === 'undefined') {
            return { query: searchParams.get("q") || "", genreId: null, decadeKey: null, minRating: null };
        }
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Handle legacy format migration
                return {
                    query: parsed.query || "",
                    genreId: parsed.genreId ?? (parsed.genres?.[0] ?? null),
                    decadeKey: parsed.decadeKey ?? parsed.decade ?? null,
                    minRating: parsed.minRating ?? (parsed.rating ? parseInt(parsed.rating) : null),
                };
            }
        } catch (e) {
            // Ignore parse errors
        }
        return { query: searchParams.get("q") || "", genreId: null, decadeKey: null, minRating: null };
    };

    const initialState = getInitialState();
    const [inputValue, setInputValue] = useState(initialState.query);
    const [results, setResults] = useState<MovieResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(!!initialState.query);

    // Filter states - local only, NOT synced with /discover URL
    // Uses single-select to match shared filter component behavior
    const [selectedGenreId, setSelectedGenreId] = useState<number | null>(initialState.genreId);
    const [selectedDecadeKey, setSelectedDecadeKey] = useState<string | null>(initialState.decadeKey);
    const [selectedMinRating, setSelectedMinRating] = useState<number | null>(initialState.minRating);

    // Dynamic genres from TMDB
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genresLoading, setGenresLoading] = useState(true);

    // Tab state for Movies/People toggle
    const [searchTab, setSearchTab] = useState<SearchTab>("movies");
    const [userResults, setUserResults] = useState<UserResult[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    // Ref to track latest request to ignore stale responses
    const latestRequestRef = useRef<number>(0);

    // Fetch genres from API on mount
    useEffect(() => {
        async function fetchGenres() {
            try {
                const res = await fetch('/api/genres');
                if (res.ok) {
                    const data = await res.json();
                    setGenres(data.genres || []);
                }
            } catch (e) {
                console.error('Failed to fetch genres:', e);
            } finally {
                setGenresLoading(false);
            }
        }
        fetchGenres();
    }, []);

    // Fetch watchlist IDs for badge display
    useEffect(() => {
        async function fetchWatchlistIds() {
            try {
                const res = await fetch('/api/watchlist-ids');
                if (res.ok) {
                    const data = await res.json();
                    setWatchlistIds(new Set(data.ids || []));
                }
            } catch (e) {
                // Silently fail - badges just won't show
            }
        }
        fetchWatchlistIds();
    }, []);

    // Save state to sessionStorage whenever it changes
    useEffect(() => {
        const stateToSave: SavedSearchState = {
            query: inputValue,
            genreId: selectedGenreId,
            decadeKey: selectedDecadeKey,
            minRating: selectedMinRating,
        };
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            // Ignore storage errors
        }
    }, [inputValue, selectedGenreId, selectedDecadeKey, selectedMinRating]);

    // Auto-focus input on mount and fetch initial results if query exists
    useEffect(() => {
        inputRef.current?.focus();
        if (initialState.query) {
            fetchMovies(initialState.query);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch movies function
    const fetchMovies = useCallback(async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        const requestId = Date.now();
        latestRequestRef.current = requestId;

        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const res = await fetch(`/api/movie-search?q=${encodeURIComponent(query)}`);

            // Ignore stale responses
            if (latestRequestRef.current !== requestId) return;

            if (!res.ok) {
                throw new Error("Search failed");
            }

            const data: SearchResponse = await res.json();
            setResults(data.results || []);
        } catch (err) {
            // Ignore stale errors
            if (latestRequestRef.current !== requestId) return;
            setError("Failed to search. Please try again.");
            setResults([]);
        } finally {
            // Only update loading if this is still the latest request
            if (latestRequestRef.current === requestId) {
                setIsLoading(false);
            }
        }
    }, []);

    // Fetch users function for people search
    const fetchUsers = useCallback(async (query: string) => {
        if (!query.trim()) {
            setUserResults([]);
            return;
        }

        setIsLoadingUsers(true);

        try {
            const res = await fetch(`/api/user-search?q=${encodeURIComponent(query)}`);
            if (res.ok) {
                const data = await res.json();
                setUserResults(data.results || []);
            }
        } catch (err) {
            console.error("User search failed:", err);
            setUserResults([]);
        } finally {
            setIsLoadingUsers(false);
        }
    }, []);

    // Debounced URL update + fetch (handles both tabs)
    const debouncedSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term.trim()) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        router.replace(`/search?${params.toString()}`);

        // Fetch based on current tab
        if (searchTab === "movies") {
            fetchMovies(term);
        } else {
            fetchUsers(term);
        }
    }, 250);

    // Re-fetch when tab changes with existing query
    useEffect(() => {
        if (inputValue.trim()) {
            if (searchTab === "movies") {
                fetchMovies(inputValue);
            } else {
                fetchUsers(inputValue);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTab]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedSearch(value);
    };

    const getTmdbImage = (path: string | null) => {
        if (!path) return null;
        return `https://image.tmdb.org/t/p/w185${path}`;
    };

    const clearFilters = () => {
        setSelectedGenreId(null);
        setSelectedDecadeKey(null);
        setSelectedMinRating(null);
    };

    const hasActiveFilters = selectedGenreId !== null || selectedDecadeKey !== null || selectedMinRating !== null;

    // Helper to get year range for decade filter using shared DECADES constant
    const getDecadeRange = (key: string): [number, number] => {
        const decade = DECADES.find(d => d.key === key);
        if (!decade) return [0, 9999];
        return [decade.minYear ?? 0, decade.maxYear];
    };

    // Filter results based on selected filters
    const filteredResults = results.filter((movie) => {
        // Genre filter - movie matches selected genre
        if (selectedGenreId !== null && movie.genre_ids && movie.genre_ids.length > 0) {
            if (!movie.genre_ids.includes(selectedGenreId)) return false;
        }

        // Decade filter
        if (selectedDecadeKey && movie.release_date) {
            const year = parseInt(movie.release_date.slice(0, 4));
            const [minYear, maxYear] = getDecadeRange(selectedDecadeKey);
            if (year < minYear || year > maxYear) return false;
        }

        // Rating filter
        if (selectedMinRating !== null && movie.vote_average) {
            if (movie.vote_average < selectedMinRating) return false;
        }

        return true;
    });

    // Handle movie click - context-aware navigation
    const handleMovieClick = (movieId: number) => {
        if (onMovieSelect) {
            // Modal context: close modal first, then navigate
            onMovieSelect();
            setTimeout(() => router.push(`/movie/${movieId}`), 10);
        } else {
            // Full-page context: just navigate directly
            router.push(`/movie/${movieId}`);
        }
    };

    // Handle user click - navigate to public profile by handle
    const handleUserClick = (handle: string) => {
        if (onMovieSelect) {
            onMovieSelect();
            setTimeout(() => router.push(`/u/${handle}`), 10);
        } else {
            router.push(`/u/${handle}`);
        }
    };

    return (
        <div className="p-6">
            {/* Search Input */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-[#99aabb]" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={searchTab === "movies" ? "Search movies..." : "Search people..."}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full bg-[#1b2228] border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-[#556677] focus:ring-2 focus:ring-[#00e054]/30 focus:border-[#00e054]/50 transition-all"
                />
            </div>

            {/* Movies / People Toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setSearchTab("movies")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${searchTab === "movies"
                        ? "bg-brand text-black"
                        : "bg-[#1b2228] text-[#778899] hover:bg-[#2a3440] hover:text-white border border-white/5"
                        }`}
                >
                    <Film className="w-3.5 h-3.5" />
                    Movies
                </button>
                <button
                    onClick={() => setSearchTab("people")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${searchTab === "people"
                        ? "bg-brand text-black"
                        : "bg-[#1b2228] text-[#778899] hover:bg-[#2a3440] hover:text-white border border-white/5"
                        }`}
                >
                    <Users className="w-3.5 h-3.5" />
                    People
                </button>
            </div>

            {/* Filters Section - Only for Movies */}
            {/* Uses shared filter components with size="compact" for modal styling */}
            {searchTab === "movies" && (
                <div className="mb-6 space-y-3">
                    <GenreFilterRow
                        genres={genres}
                        value={selectedGenreId}
                        onChange={setSelectedGenreId}
                        size="compact"
                        isLoading={genresLoading}
                    />
                    <DecadeFilterRow
                        value={selectedDecadeKey}
                        onChange={setSelectedDecadeKey}
                        size="compact"
                    />
                    <div className="flex items-center gap-2">
                        <RatingFilterRow
                            value={selectedMinRating}
                            onChange={setSelectedMinRating}
                            size="compact"
                        />
                        {/* Clear Filters Button */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                            >
                                <XIcon className="w-3 h-3" />
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* MOVIES TAB CONTENT */}
            {searchTab === "movies" && (
                <>
                    {/* States */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-[#00e054] animate-spin" />
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12 text-red-400">
                            {error}
                        </div>
                    )}

                    {!isLoading && !error && !hasSearched && (
                        <div className="text-center py-8 text-[#556677] italic">
                            Start typing to search movies...
                        </div>
                    )}

                    {!isLoading && !error && hasSearched && results.length === 0 && (
                        <div className="text-center py-12 text-[#99aabb]">
                            No movies found. Try a different search term.
                        </div>
                    )}

                    {!isLoading && !error && hasSearched && results.length > 0 && filteredResults.length === 0 && (
                        <div className="text-center py-12 text-[#99aabb]">
                            No movies match your filters. Try adjusting your filter criteria.
                        </div>
                    )}

                    {/* Results Grid */}
                    {!isLoading && !error && filteredResults.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {filteredResults.slice(0, 15).map((movie) => (
                                <div
                                    key={movie.id}
                                    onClick={() => handleMovieClick(movie.id)}
                                    className="cursor-pointer"
                                >
                                    <PosterCard
                                        movie={{
                                            id: movie.id,
                                            title: movie.title,
                                            poster_path: movie.poster_path,
                                            release_date: movie.release_date,
                                            vote_average: movie.vote_average,
                                            // Required fields with defaults
                                            overview: "",
                                            backdrop_path: null,
                                            genre_ids: movie.genre_ids || [],
                                            runtime: 0,
                                            release_dates: { results: [] },
                                        }}
                                        isWatchlist={watchlistIds.has(movie.id)}
                                        noLink={true}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* PEOPLE TAB CONTENT */}
            {searchTab === "people" && (
                <>
                    {/* Loading */}
                    {isLoadingUsers && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-[#00e054] animate-spin" />
                        </div>
                    )}

                    {/* Empty state */}
                    {!isLoadingUsers && !inputValue.trim() && (
                        <div className="text-center py-8 text-[#556677] italic">
                            Start typing to find people...
                        </div>
                    )}

                    {/* No results */}
                    {!isLoadingUsers && inputValue.trim() && userResults.length === 0 && (
                        <div className="text-center py-12 text-[#99aabb]">
                            No people found. Try a different search term.
                        </div>
                    )}

                    {/* People Results Grid */}
                    {!isLoadingUsers && userResults.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {userResults.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserClick(user.handle)}
                                    className="group block cursor-pointer"
                                >
                                    <div className="flex flex-col items-center p-4 rounded-lg bg-[#1b2228] hover:bg-[#2a3440] transition-colors border border-white/5">
                                        {/* Avatar */}
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#2a3440] mb-3">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={`@${user.handle}`}
                                                    width={64}
                                                    height={64}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xl font-black text-[#556677]">
                                                    {user.handle.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        {/* Handle */}
                                        <p className="text-sm text-white font-medium truncate w-full text-center group-hover:text-brand transition-colors">
                                            @{user.handle}
                                        </p>
                                        {/* Follower count */}
                                        <p className="text-[10px] text-[#556677] mt-1">
                                            {user.followerCount} followers
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

