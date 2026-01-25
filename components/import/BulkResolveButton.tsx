"use client";

import { useState } from "react";
import { bulkResolveAuditRows } from "@/app/actions/import-actions";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface BulkResolveButtonProps {
    importId: string;
    suggestedCount: number;
    rowIds: string[];
}

export default function BulkResolveButton({ importId, suggestedCount, rowIds }: BulkResolveButtonProps) {
    const [isResolving, setIsResolving] = useState(false);

    if (suggestedCount === 0) return null;

    const handleBulkResolve = async () => {
        setIsResolving(true);
        try {
            await bulkResolveAuditRows(importId, rowIds);
        } catch (e) {
            console.error(e);
        } finally {
            setIsResolving(false);
        }
    };

    return (
        <div className="bg-brand/10 border border-brand/20 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-brand" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-white italic uppercase tracking-tight">Smart Resolver</h3>
                    <p className="text-[#99aabb] text-[10px] font-bold uppercase tracking-widest">
                        We found high-confidence matches for {suggestedCount} of your ambiguous items.
                    </p>
                </div>
            </div>
            <button
                onClick={handleBulkResolve}
                disabled={isResolving}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-brand text-black text-[10px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all disabled:opacity-50 whitespace-nowrap"
            >
                {isResolving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                Confirm all {suggestedCount} Suggestions
            </button>
        </div>
    );
}
