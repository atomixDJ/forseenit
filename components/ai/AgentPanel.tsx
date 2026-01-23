'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Bot, User, Film, Loader2 } from 'lucide-react';
import { useClickAway } from 'react-use';
import { chatWithAgent } from '@/app/actions/agent';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface AgentPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AgentPanel({ isOpen, onClose }: AgentPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: "Hello! I'm your ForSeenIt Agent. I can help you find your next favorite film, analyze your taste, or discuss the upcoming awards season. What's on your mind?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useClickAway(panelRef, () => {
        if (isOpen) onClose();
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const res = await chatWithAgent(input); // Corrected to pass 'input'
        if (res.success && res.content) {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: res.content
            };
            setMessages(prev => [...prev, botMsg]);
        } else {
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: res.error || "I'm having trouble connecting to the cinema database right now. Please try again later."
            };
            setMessages(prev => [...prev, errorMsg]);
        }
        setIsTyping(false);
    };

    return (
        <div className={`fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-none ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div
                ref={panelRef}
                className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#1b2228]/80 backdrop-blur-3xl border-l border-white/5 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <header className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand">
                        <Sparkles className="w-5 h-5 fill-brand" />
                        <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">ForSeen Agent</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/5 text-[#556677] hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                {/* Chat Contents */}
                <div
                    ref={scrollRef}
                    className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide"
                >
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.role === 'assistant' ? 'bg-brand/10 border-brand/20 text-brand' : 'bg-white/5 border-white/10 text-[#99aabb]'}`}>
                                {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-[4px] text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-white/5 text-[#99aabb]' : 'bg-brand/10 text-white'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border bg-brand/10 border-brand/20 text-brand">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                            <div className="bg-white/5 text-[#556677] p-4 rounded-[4px] text-xs font-bold uppercase tracking-widest italic animate-pulse">
                                Analyzing cinema...
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Input */}
                <footer className="p-6 border-t border-white/5">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about film..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pr-14 text-sm text-white placeholder-[#334455] focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className={`absolute right-2 top-1.5 p-2 rounded-full transition-all ${input.trim() ? 'bg-brand text-black hover:scale-105' : 'text-[#334455]'}`}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] font-bold text-[#334455] uppercase tracking-widest">
                        Powered by <span className="text-brand opacity-60">Gemini 1.5 Flash</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
