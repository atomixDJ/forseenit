import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { getNowPlaying, getTrendingMovies } from "@/lib/tmdb";
import { getUserSeenMovieIds, getUserWatchlistIds } from "@/app/actions/interactions";
import { currentUser } from "@clerk/nextjs/server";
import Feed from "@/components/movie/Feed";
import TonightRail from "@/components/home/TonightRail";
import WatchlistRail from "@/components/home/WatchlistRail";
import WhatToWatchButton from "@/components/what-to-watch/WhatToWatchButton";
import WhatToWatchRail from "@/components/what-to-watch/WhatToWatchRail";
import { getActiveSessionWithLatestResult } from "@/app/actions/what-to-watch";
import { getAppUserId } from "@/lib/clerk-auth-helpers";
import { getWatchlistRailItems } from "@/app/actions/watchlist-rail";

// Dynamic time-based subtitle
function getTimeBasedGreeting(): { greeting: string; context: string } {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { greeting: "This Morning", context: "This Morning" };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: "This Afternoon", context: "This Afternoon" };
  } else if (hour >= 17 && hour < 21) {
    return { greeting: "Tonight", context: "Tonight" };
  } else {
    return { greeting: "Tonight", context: "Tonight" };
  }
}

export default async function Home() {
  const [trending, nowPlaying, user, seenIds, watchlistIds, subscriptions, whatToWatchSession, appUserId, watchlistRailData] = await Promise.all([
    getTrendingMovies(),
    getNowPlaying(),
    currentUser(),
    getUserSeenMovieIds(),
    getUserWatchlistIds(),
    import("@/app/actions/subscriptions").then(m => m.getUserSubscriptions()),
    getActiveSessionWithLatestResult(),
    getAppUserId(),
    getWatchlistRailItems(),
  ]);

  const seenSet = new Set(seenIds);
  const watchlistSet = new Set(watchlistIds);

  // Filter movies that have NOT been seen
  const filteredTrending = trending.results.filter((m: any) => !seenSet.has(m.id));
  const filteredPopular = nowPlaying.results.filter((m: any) => !seenSet.has(m.id));

  // Personalized Tonight recommendations (only if no active What to Watch session)
  const tonight = whatToWatchSession
    ? null
    : await import("@/app/actions/recommendations").then(m => m.getTonightRecommendations());

  const { greeting, context } = getTimeBasedGreeting();
  const firstName = user?.firstName || user?.username || null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <main className="py-12 space-y-8">
          {/* Hero Section - Two Column Layout */}
          <section className="mb-16 pt-6 flex items-end justify-between gap-8">
            {/* Left: Title */}
            <div>
              <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <span>🎬</span>
                <span>Curated For You</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.85]">
                <span className="text-white">WATCH</span><br />
                <span className="text-[#334455]">{context.toUpperCase()}</span>
              </h1>
            </div>

            {/* Right: What to Watch Button (only if no active session) */}
            {appUserId && !whatToWatchSession && (
              <WhatToWatchButton currentUserId={appUserId} />
            )}
          </section>

          {/* What to Watch Rail (only if active session) */}
          {appUserId && whatToWatchSession && (
            <WhatToWatchRail session={whatToWatchSession} />
          )}

          {/* Tonight Rail (show only if no active What to Watch session) */}
          {tonight && <TonightRail result={tonight} watchlistIds={watchlistSet} />}

          {/* Rails */}
          <Feed id="trending" title="Trending This Week" movies={filteredTrending} watchlistIds={watchlistSet} />

          {/* 3rd slot: Watchlist for logged-in users, Popular for logged-out */}
          {appUserId ? (
            <WatchlistRail movies={watchlistRailData.movies} userRatings={watchlistRailData.userRatings} />
          ) : (
            <Feed id="popular" title="Popular This Week" movies={filteredPopular} watchlistIds={watchlistSet} />
          )}
        </main>
      </Container>
      <Footer />
    </div>
  );
}
