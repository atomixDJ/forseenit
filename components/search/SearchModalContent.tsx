"use client";

import { Search as SearchIcon, Loader2, Film, Calendar, Star, X as XIcon, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

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

interface Genre {
    id: number;
    name: string;
}

interface UserResult {
    id: string;
    handle: string;
    name: string | null;
    image: string | null;
    followerCount: number;
}

type SearchTab = "movies" | "people";

const DECADES = ["2020s", "2010s", "2000s", "1990s", "1980s", "Classic"];

const RATINGS = ["9+", "8+", "7+", "6+"];

const STORAGE_KEY = 'search-modal-state';

interface SavedSearchState {
    query: string;
    genres: number[];
    decade: string | null;
    rating: string | null;
}

export default function SearchModalContent({ onMovieSelect }: SearchModalContentProps = {}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Load initial state from sessionStorage or URL params
    const getInitialState = (): SavedSearchState => {
        if (typeof window === 'undefined') {
            return { query: searchParams.get("q") || "", genres: [], decade: null, rating: null };
        }
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            // Ignore parse errors
        }
        return { query: searchParams.get("q") || "", genres: [], decade: null, rating: null };
    };

    const initialState = getInitialState();
    const [inputValue, setInputValue] = useState(initialState.query);
    const [results, setResults] = useState<MovieResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(!!initialState.query);

    // Filter states - initialize from saved state
    const [selectedGenres, setSelectedGenres] = useState<number[]>(initialState.genres);
    const [selectedDecade, setSelectedDecade] = useState<string | null>(initialState.decade);
    const [selectedRating, setSelectedRating] = useState<string | null>(initialState.rating);

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

    // Save state to sessionStorage whenever it changes
    useEffect(() => {
        const stateToSave: SavedSearchState = {
            query: inputValue,
            genres: selectedGenres,
            decade: selectedDecade,
            rating: selectedRating,
        };
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            // Ignore storage errors
        }
    }, [inputValue, selectedGenres, selectedDecade, selectedRating]);

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

    const toggleGenre = (genreId: number) => {
        // Single-select: clicking same genre deselects, otherwise selects new one
        setSelectedGenres(prev =>
            prev.includes(genreId) ? [] : [genreId]
        );
    };

    const clearFilters = () => {
        setSelectedGenres([]);
        setSelectedDecade(null);
        setSelectedRating(null);
    };

    const hasActiveFilters = selectedGenres.length > 0 || selectedDecade || selectedRating;

    // Helper to get year range for decade filter
    const getDecadeRange = (decade: string): [number, number] => {
        switch (decade) {
            case "2020s": return [2020, 2029];
            case "2010s": return [2010, 2019];
            case "2000s": return [2000, 2009];
            case "1990s": return [1990, 1999];
            case "1980s": return [1980, 1989];
            case "Classic": return [0, 1979];
            default: return [0, 9999];
        }
    };

    // Helper to get minimum rating
    const getMinRating = (rating: string): number => {
        return parseFloat(rating.replace("+", ""));
    };

    // Filter results based on selected filters
    const filteredResults = results.filter((movie) => {
        // Genre filter - movie matches ANY selected genre (OR logic)
        // Movies with unknown/missing genres pass through
        if (selectedGenres.length > 0 && movie.genre_ids && movie.genre_ids.length > 0) {
            const matchesAny = selectedGenres.some(genreId =>
                movie.genre_ids!.includes(genreId)
            );
            if (!matchesAny) return false;
        }

        // Decade filter
        if (selectedDecade && movie.release_date) {
            const year = parseInt(movie.release_date.slice(0, 4));
            const [minYear, maxYear] = getDecadeRange(selectedDecade);
            if (year < minYear || year > maxYear) return false;
        }

        // Rating filter
        if (selectedRating && movie.vote_average) {
            const minRating = getMinRating(selectedRating);
            if (movie.vote_average < minRating) return false;
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
            {searchTab === "movies" && (
                <div className="mb-6 space-y-4">
                    {/* Genre Filters */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-[#556677] uppercase tracking-wider mr-1">
                            <Film className="w-3 h-3" />
                            <span>Genre</span>
                        </div>
                        {genresLoading ? (
                            <span className="text-[10px] text-[#556677] italic">Loading...</span>
                        ) : (
                            genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    onClick={() => toggleGenre(genre.id)}
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${selectedGenres.includes(genre.id)
                                        ? "bg-[#00e054] text-black"
                                        : "bg-[#1b2228] text-[#778899] hover:bg-[#2a3440] hover:text-white border border-white/5"
                                        }`}
                                >
                                    {genre.name}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Decade Filters */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-[#556677] uppercase tracking-wider mr-1">
                            <Calendar className="w-3 h-3" />
                            <span>Decade</span>
                        </div>
                        {DECADES.map((decade) => (
                            <button
                                key={decade}
                                onClick={() => setSelectedDecade(selectedDecade === decade ? null : decade)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${selectedDecade === decade
                                    ? "bg-[#ff8000] text-black"
                                    : "bg-[#1b2228] text-[#778899] hover:bg-[#2a3440] hover:text-white border border-white/5"
                                    }`}
                            >
                                {decade}
                            </button>
                        ))}
                    </div>

                    {/* Rating Filters */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-[#556677] uppercase tracking-wider mr-1">
                            <Star className="w-3 h-3" />
                            <span>Rating</span>
                        </div>
                        {RATINGS.map((rating) => (
                            <button
                                key={rating}
                                onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${selectedRating === rating
                                    ? "bg-[#40bcf4] text-black"
                                    : "bg-[#1b2228] text-[#778899] hover:bg-[#2a3440] hover:text-white border border-white/5"
                                    }`}
                            >
                                {rating}
                            </button>
                        ))}

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
                                    className="group block cursor-pointer"
                                >
                                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-[#1b2228] relative">
                                        {movie.poster_path ? (
                                            <Image
                                                src={getTmdbImage(movie.poster_path)!}
                                                alt={movie.title}
                                                fill
                                                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-[#556677] text-xs text-center p-2">
                                                {movie.title}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-xs text-white font-medium truncate group-hover:text-[#00e054] transition-colors">
                                            {movie.title}
                                        </p>
                                        {movie.release_date && (
                                            <p className="text-[10px] text-[#556677]">
                                                {movie.release_date.slice(0, 4)}
                                            </p>
                                        )}
                                    </div>
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

