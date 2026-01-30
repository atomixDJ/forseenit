"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Users } from "lucide-react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

interface UserResult {
    id: string;
    handle: string;
    name: string | null;
    image: string | null;
}

interface UserSearchInputProps {
    value: UserResult | null;
    onChange: (user: UserResult | null) => void;
    placeholder?: string;
    excludeUserId?: string; // Exclude current user
    suggestedUsers?: UserResult[]; // Quick-pick suggestions (e.g., users you follow)
}

/**
 * Typeahead user search for partner selection.
 * Features dark orange tint and quick-pick suggestions.
 */
export default function UserSearchInput({
    value,
    onChange,
    placeholder = "Search for a user...",
    excludeUserId,
    suggestedUsers = []
}: UserSearchInputProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UserResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const searchUsers = useDebouncedCallback(async (q: string) => {
        if (q.length < 2) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/user-search?q=${encodeURIComponent(q)}`);
            if (res.ok) {
                const data = await res.json();
                const filtered = excludeUserId
                    ? data.results.filter((u: UserResult) => u.id !== excludeUserId)
                    : data.results;
                setResults(filtered);
            }
        } finally {
            setIsLoading(false);
        }
    }, 300);

    useEffect(() => {
        searchUsers(query);
    }, [query, searchUsers]);

    const handleSelect = (user: UserResult) => {
        onChange(user);
        setQuery("");
        setIsOpen(false);
    };

    const handleClear = () => {
        onChange(null);
        setQuery("");
        inputRef.current?.focus();
    };

    // Filter suggested users to exclude current user
    const filteredSuggestions = suggestedUsers
        .filter(u => u.id !== excludeUserId)
        .slice(0, 3);

    if (value) {
        return (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
                {value.image ? (
                    <Image
                        src={value.image}
                        alt={value.name || value.handle}
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-amber-400/30"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-sm font-bold">
                        {(value.name || value.handle).charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="flex-1">
                    <div className="text-white font-medium text-sm">{value.name || value.handle}</div>
                    <div className="text-amber-300/60 text-xs">@{value.handle}</div>
                </div>
                <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4 text-white/60" />
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search input with dark orange tint */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400/50" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-4 
                               bg-gradient-to-r from-amber-500/10 to-orange-500/10 
                               border border-amber-500/20 rounded-xl 
                               text-white placeholder:text-amber-200/30 text-sm
                               focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20
                               transition-all duration-200"
                />
                {isLoading && (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 animate-spin" />
                )}
            </div>

            {/* Search results dropdown */}
            {isOpen && results.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-[#1a1f25] border border-amber-500/20 rounded-xl 
                              shadow-xl shadow-black/50 max-h-60 overflow-auto">
                    {results.map((user) => (
                        <li key={user.id}>
                            <button
                                type="button"
                                onClick={() => handleSelect(user)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-amber-500/10 transition-colors text-left"
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || user.handle}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-sm font-bold">
                                        {(user.name || user.handle).charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <div className="text-white text-sm">{user.name || user.handle}</div>
                                    <div className="text-amber-300/50 text-xs">@{user.handle}</div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Quick-pick suggestions from following */}
            {filteredSuggestions.length > 0 && !value && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-medium">
                        <Users className="w-3 h-3" />
                        People you follow
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filteredSuggestions.map((user) => (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => handleSelect(user)}
                                className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 
                                           rounded-full hover:bg-amber-500/10 hover:border-amber-500/30 
                                           transition-all duration-200 group"
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || user.handle}
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-[10px] font-bold">
                                        {(user.name || user.handle).charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors">
                                    {user.name || `@${user.handle}`}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
