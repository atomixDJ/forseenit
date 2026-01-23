'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AgentPanel from './AgentPanel';

export default function AgentToggle() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#99aabb] hover:text-[#00e054] hover:bg-[#00e054]/10 hover:border-[#00e054]/50 transition-all group relative"
                title="AI Film Agent"
            >
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />

                {/* Notification Badge (Optional) */}
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#00e054] rounded-full border border-[#14181c]" />
            </button>

            <AgentPanel
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
