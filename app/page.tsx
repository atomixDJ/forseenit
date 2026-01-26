import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { getNowPlaying, getTrendingMovies } from "@/lib/tmdb";
import { getUserSeenMovieIds } from "@/app/actions/interactions";
import { currentUser } from "@clerk/nextjs/server";
import Feed from "@/components/movie/Feed";
import TonightRail from "@/components/home/TonightRail";

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
  const [trending, nowPlaying, user, seenIds, subscriptions] = await Promise.all([
    getTrendingMovies(),
    getNowPlaying(),
    currentUser(),
    getUserSeenMovieIds(),
    import("@/app/actions/subscriptions").then(m => m.getUserSubscriptions()),
  ]);

  const seenSet = new Set(seenIds);

  // Filter movies that have NOT been seen
  const filteredTrending = trending.results.filter((m: any) => !seenSet.has(m.id));
  const filteredPopular = nowPlaying.results.filter((m: any) => !seenSet.has(m.id));

  // Personalized Tonight recommendations
  const tonight = await import("@/app/actions/recommendations").then(m => m.getTonightRecommendations());

  const { greeting, context } = getTimeBasedGreeting();
  const firstName = user?.firstName || user?.username || null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <main className="py-12 space-y-8">
          <section className="mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-[#99aabb] leading-snug">
              {firstName ? (
                <>
                  {greeting}, <span className="text-white font-bold">{firstName}</span>?
                </>
              ) : (
                <>{greeting}</>
              )}
              <span className="block text-lg md:text-xl text-[#667788] mt-1">
                {context}
              </span>
            </h1>
          </section>

          {/* Tonight Rail */}
          <TonightRail result={tonight} />

          {/* Existing feeds */}
          <Feed id="trending" title="Trending This Week" movies={filteredTrending} />
          <Feed id="popular" title="Popular This Week" movies={filteredPopular} />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
