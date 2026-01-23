export const SEASON_ANCHOR_MONTH = 2; // March (0-indexed)
export const SEASON_ANCHOR_DAY = 15; // Mid-March

export function getCurrentSeason() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    // If we are before the Oscars (March 15th), we are in the previous cycle
    // e.g. Jan 2026 is still the 2025_2026 season
    // If we are after March 15th, we are in the new cycle
    // e.g. April 2025 is already the 2025_2026 season

    if (month < SEASON_ANCHOR_MONTH || (month === SEASON_ANCHOR_MONTH && day < SEASON_ANCHOR_DAY)) {
        return `${year - 1}_${year}`;
    } else {
        return `${year}_${year + 1}`;
    }
}

export const CURRENT_SEASON = getCurrentSeason();
