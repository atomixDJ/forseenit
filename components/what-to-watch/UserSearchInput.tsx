"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Check } from "lucide-react";
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
}

/**
 * Typeahead user search for partner selection.
 */
export default function UserSearchInput({
    value,
    onChange,
    placeholder = "Search for a user...",
    excludeUserId
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

    if (value) {
        return (
            <div className="flex items-center gap-3 p-3 bg-[#1b2228] border border-white/10 rounded-lg">
                {value.image ? (
                    <Image
                        src={value.image}
                        alt={value.name || value.handle}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand text-sm font-bold">
                        {(value.name || value.handle).charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="flex-1">
                    <div className="text-white font-medium text-sm">{value.name || value.handle}</div>
                    <div className="text-[#667788] text-xs">@{value.handle}</div>
                </div>
                <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                    <X className="w-4 h-4 text-[#99aabb]" />
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667788]" />
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
                    className="w-full pl-10 pr-10 py-3 bg-[#1b2228] border border-white/10 rounded-lg 
                               text-white placeholder:text-[#667788] text-sm
                               focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30"
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand animate-spin" />
                )}
            </div>

            {isOpen && results.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-[#1b2228] border border-white/10 rounded-lg 
                              shadow-xl max-h-60 overflow-auto">
                    {results.map((user) => (
                        <li key={user.id}>
                            <button
                                type="button"
                                onClick={() => handleSelect(user)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors text-left"
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
                                    <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand text-sm font-bold">
                                        {(user.name || user.handle).charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <div className="text-white text-sm">{user.name || user.handle}</div>
                                    <div className="text-[#667788] text-xs">@{user.handle}</div>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
