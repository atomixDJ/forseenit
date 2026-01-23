import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { getNowPlaying, getTrendingMovies } from "@/lib/tmdb";
import { getUserSeenMovieIds } from "@/app/actions/interactions";
import { auth } from "@/auth";
import Feed from "@/components/movie/Feed";

export default async function Home() {
  const [trending, nowPlaying, session, seenIds] = await Promise.all([
    getTrendingMovies(),
    getNowPlaying(),
    auth(),
    getUserSeenMovieIds(),
  ]);

  const seenSet = new Set(seenIds);

  // Filter movies that have NOT been seen
  const filteredTrending = trending.results.filter(
    (m: any) => !seenSet.has(m.id)
  );
  const filteredPopular = nowPlaying.results.filter(
    (m: any) => !seenSet.has(m.id)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <main className="py-12 space-y-8">
          <section className="mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-[#99aabb] leading-snug">
              Welcome back, <span className="text-white font-bold">{session?.user?.name || "Friend"}</span>. Here&apos;s what to watch...
            </h1>
          </section>

          <Feed id="trending" title="Trending This Week" movies={filteredTrending} />
          <Feed id="popular" title="Popular This Week" movies={filteredPopular} />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
