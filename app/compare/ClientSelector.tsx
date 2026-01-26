"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ChevronDown } from "lucide-react";

interface FollowingUser {
    handle: string;
    name: string | null;
    image: string | null;
}

export function ClientSelector({ following }: { following: FollowingUser[] }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const filtered = following.filter(u => {
        const q = search.toLowerCase();
        return (u.name?.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
    });

    const handleSelect = useCallback((handle: string) => {
        router.push(`/compare?them=${handle}`);
        setIsOpen(false);
        setSearch("");
    }, [router]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault();
                setIsOpen(true);
                setFocusedIndex(0);
            }
            return;
        }

        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOpen(false);
                setFocusedIndex(-1);
                break;
            case "ArrowDown":
                e.preventDefault();
                setFocusedIndex(prev => Math.min(prev + 1, filtered.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setFocusedIndex(prev => Math.max(prev - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < filtered.length) {
                    handleSelect(filtered[focusedIndex].handle);
                }
                break;
        }
    };

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll('[role="option"]');
            items[focusedIndex]?.scrollIntoView({ block: "nearest" });
        }
    }, [focusedIndex, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 bg-white/5 border border-white/10 hover:border-white/20 text-white text-[11px] font-black uppercase tracking-widest px-4 py-4 rounded-xl cursor-pointer focus:outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20 transition-all shadow-xl"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <Search className="w-3.5 h-3.5 text-brand/40" />
                <span className="flex-1 text-left">Choose Connection...</span>
                <ChevronDown className={`w-4 h-4 opacity-40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-[#1b2228] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="p-3 border-b border-white/5">
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setFocusedIndex(0);
                            }}
                            placeholder="Type to search..."
                            className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-brand/40 placeholder:text-white/30"
                        />
                    </div>

                    {/* Options List */}
                    <div ref={listRef} role="listbox" className="max-h-64 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <div className="px-4 py-6 text-center text-[#556677] text-sm">No matches found</div>
                        ) : (
                            filtered.map((user, index) => (
                                <button
                                    key={user.handle}
                                    type="button"
                                    role="option"
                                    aria-selected={focusedIndex === index}
                                    onClick={() => handleSelect(user.handle)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors focus:outline-none ${focusedIndex === index
                                            ? 'bg-brand/10'
                                            : 'hover:bg-white/5'
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-brand/10 border border-white/10 flex-shrink-0">
                                        {user.image ? (
                                            <img src={user.image} alt={user.handle} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-brand font-black text-sm">
                                                {user.handle[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    {/* Name & Handle */}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white text-sm font-bold truncate">
                                            {user.name || user.handle}
                                        </div>
                                        <div className="text-[#556677] text-[10px] font-medium uppercase tracking-widest">
                                            @{user.handle}
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
