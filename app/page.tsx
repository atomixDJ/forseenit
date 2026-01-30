import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { getNowPlaying, getTrendingMovies } from "@/lib/tmdb";
import { getUserSeenMovieIds, getUserWatchlistIds } from "@/app/actions/interactions";
import { currentUser } from "@clerk/nextjs/server";
import Feed from "@/components/movie/Feed";
import TonightRail from "@/components/home/TonightRail";
import WhatToWatchButton from "@/components/what-to-watch/WhatToWatchButton";
import WhatToWatchRail from "@/components/what-to-watch/WhatToWatchRail";
import { getActiveSessionWithLatestResult } from "@/app/actions/what-to-watch";
import { getAppUserId } from "@/lib/clerk-auth-helpers";

// Dynamic greetings based on time of day
function getTimeBasedGreeting(): { greeting: string; context: string } {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { greeting: "Good morning", context: "Start your day with something great" };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: "Good afternoon", context: "Here are some picks for later" };
  } else if (hour >= 17 && hour < 21) {
    return { greeting: "What to watch tonight", context: "Here are some great options" };
  } else {
    return { greeting: "Late night cinema", context: "Perfect for a midnight screening" };
  }
}

export default async function Home() {
  const [trending, nowPlaying, user, seenIds, watchlistIds, subscriptions, whatToWatchSession, appUserId] = await Promise.all([
    getTrendingMovies(),
    getNowPlaying(),
    currentUser(),
    getUserSeenMovieIds(),
    getUserWatchlistIds(),
    import("@/app/actions/subscriptions").then(m => m.getUserSubscriptions()),
    getActiveSessionWithLatestResult(),
    getAppUserId(),
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
          <section className="mb-16 pt-24">
            <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <span>🎬</span>
              <span>Tonight&apos;s Picks</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.85]">
              {firstName ? (
                <>
                  {greeting.toUpperCase()}<br />
                  <span className="text-[#334455]">{firstName.toUpperCase()}</span>
                </>
              ) : (
                <>
                  WHAT TO<br />
                  <span className="text-[#334455]">WATCH</span>
                </>
              )}
            </h1>
            <p className="text-[#667788] text-sm mt-6 max-w-md font-medium">
              {context}
            </p>
          </section>

          {/* What to Watch Tonight - Button or Rail */}
          {appUserId && (
            whatToWatchSession ? (
              <WhatToWatchRail session={whatToWatchSession} />
            ) : (
              <WhatToWatchButton currentUserId={appUserId} />
            )
          )}

          {/* Tonight Rail (show only if no active What to Watch session) */}
          {tonight && <TonightRail result={tonight} watchlistIds={watchlistSet} />}

          {/* Existing feeds */}
          <Feed id="trending" title="Trending This Week" movies={filteredTrending} watchlistIds={watchlistSet} />
          <Feed id="popular" title="Popular This Week" movies={filteredPopular} watchlistIds={watchlistSet} />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
