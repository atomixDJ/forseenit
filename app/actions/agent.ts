"use server";

import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { searchMovies } from "@/lib/tmdb";

/**
 * Handle a message from the user and return an "Agentic" response.
 * This version uses a simulation but is structured for LLM integration.
 */
export async function chatWithAgent(message: string) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    try {
        // 1. Context Gathering (What does the agent know?)
        const [watchlist, ratings] = await Promise.all([
            prisma.movieInteraction.findMany({
                where: { userId, watchlisted: true },
                take: 5
            }),
            prisma.movieInteraction.findMany({
                where: { userId, ratingHalf: { not: null } },
                orderBy: { updatedAt: 'desc' },
                take: 5
            })
        ]);

        // 2. Intelligence Logic (Simulated for now)
        // In the next iteration, this will call Gemini 1.5 Flash with the context above.

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking

        let response = "";
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("recommend") || lowerMsg.includes("watch")) {
            response = "Based on your recent watchlist activity, I'd recommend exploring some A24 titles or recent festival winners. Would you like me to pull up a curated list for you?";
        } else if (lowerMsg.includes("rating") || lowerMsg.includes("taste")) {
            const avg = ratings.length > 0 ? (ratings.reduce((acc, r) => acc + (r.ratingHalf! / 2), 0) / ratings.length).toFixed(1) : "N/A";
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
