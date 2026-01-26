import React from "react";
import { TonightResult } from "@/app/actions/recommendations";
import Feed from "@/components/movie/Feed";

/**
 * Get time-based title for the recommendation rail.
 */
function getTimeBasedTitle(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Stream These This Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Stream These Today";
    } else if (hour >= 17 && hour < 21) {
        return "Stream These Tonight";
    } else {
        return "Stream These Tonight"; // Late night still feels like "tonight"
    }
}

/**
 * TonightRail component renders personalized recommendations with dynamic label and optional "Filters relaxed" pill.
 */
export default function TonightRail({ result }: { result: TonightResult }) {
    const { movies, meta } = result;
    const title = getTimeBasedTitle();

    // Determine subtitle based on provider mode and filters
    let subtitle = "";
    if (meta.providerMode === "MY_SERVICES" && meta.hasGenres) {
        subtitle = "On your services · Based on your taste";
    } else if (meta.providerMode === "MY_SERVICES") {
        subtitle = "On your services";
    } else if (meta.providerMode === "ALL" && meta.hasGenres) {
        subtitle = "All services · Based on your taste";
    } else if (meta.providerMode === "ALL") {
        subtitle = "All services";
    }

    return (
        <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-white mb-1">
                {title}
                {meta.fellBack && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-800 text-gray-300 text-sm rounded-full">
                        Filters relaxed
                    </span>
                )}
            </h2>
            {subtitle && (
                <p className="text-sm text-[#667788] mb-4">{subtitle}</p>
            )}
            <Feed id="stream-these" title={title} movies={movies} />
        </section>
    );
}
