"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { searchMovies } from "@/lib/tmdb";

/**
 * Handle a message from the user and return an "Agentic" response.
 * This version uses a simulation but is structured for LLM integration.
 */
export async function chatWithAgent(message: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        // 1. Context Gathering (What does the agent know?)
        const [watchlist, ratings] = await Promise.all([
            prisma.watchlistMovie.findMany({ where: { userId: session.user.id }, take: 5 }),
            prisma.rating.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' }, take: 5 })
        ]);

        // 2. Intelligence Logic (Simulated for now)
        // In the next iteration, this will call Gemini 1.5 Flash with the context above.

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking

        let response = "";
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("recommend") || lowerMsg.includes("watch")) {
            response = "Based on your interest in " + (watchlist[0]?.title || "cinematic gems") + ", I'd recommend exploring some A24 titles or recent festival winners. Would you like me to pull up a curated list for you?";
        } else if (lowerMsg.includes("rating") || lowerMsg.includes("taste")) {
            const avg = ratings.length > 0 ? (ratings.reduce((acc, r) => acc + r.value, 0) / ratings.length).toFixed(1) : "N/A";
            response = `Your average rating is ${avg} stars. You seem to favor high-concept storytelling. Should we find something new that fits that profile?`;
        } else {
            response = "I'm analyzing your film history to provide the best possible recommendations. ForSeenIt is all about that cinematic intuition!";
        }

        return { success: true, content: response };
    } catch (error) {
        console.error("Agent chat failed:", error);
        return { error: "Agent is offline for maintenance." };
    }
}
