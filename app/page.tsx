import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { getNowPlaying, getTrendingMovies } from "@/lib/tmdb";
import Feed from "@/components/movie/Feed";

export default async function Home() {
  const [trending, nowPlaying] = await Promise.all([
    getTrendingMovies(),
    getNowPlaying(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <main className="py-12 space-y-8">
          <section className="mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-[#99aabb] leading-snug">
              Welcome back, <span className="text-white font-bold">atomix</span>. Here&apos;s what to watch...
            </h1>
          </section>

          <Feed id="trending" title="Trending This Week" movies={trending.results} />
          <Feed id="popular" title="Popular This Week" movies={nowPlaying.results} />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
