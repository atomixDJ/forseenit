import { createClient } from "@/lib/supabase/server";

export default async function SuggestedPage() {
    const supabase = await createClient();

    // Fetch collections of type 'suggested' with their movies
    const { data: collections, error } = await supabase
        .from("collections")
        .select(`
      id,
      title,
      description,
      slug,
      collection_items (
        rank,
        movies (
            id,
            title,
            poster_path,
            release_year
        )
      )
    `)
        .eq("type", "suggested")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase error:", error);
        return <div>Error loading suggestions</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Suggested Collections</h1>

            {collections?.length === 0 ? (
                <p>No suggested collections found.</p>
            ) : (
                <div className="space-y-12">
                    {collections?.map((collection) => (
                        <div key={collection.id}>
                            <h2 className="text-2xl font-semibold mb-2">{collection.title}</h2>
                            {collection.description && (
                                <p className="text-gray-400 mb-4">{collection.description}</p>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {collection.collection_items
                                    ?.sort((a: any, b: any) => a.rank - b.rank)
                                    .map((item: any) => {
                                        const movie = item.movies;
                                        if (!movie) return null;

                                        return (
                                            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
                                                <div className="aspect-[2/3] bg-gray-700 mb-2 relative overflow-hidden rounded">
                                                    {movie.poster_path ? (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                            alt={movie.title}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-gray-500">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="font-medium truncate">{movie.title}</h3>
                                                <p className="text-sm text-gray-400">{movie.release_year}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
