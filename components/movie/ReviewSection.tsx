import { getMovieReviews } from "@/app/actions/reviews";
import { Star, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";
import ReviewLikeButton from "./ReviewLikeButton";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeParse from 'rehype-parse';

async function renderContent(content: string, format: string) {
    if (!content) return "";

    let processor = unified();

    if (format === 'markdown') {
        // @ts-ignore
        processor = processor.use(remarkParse).use(remarkRehype);
    } else {
        // @ts-ignore
        processor = processor.use(rehypeParse, { fragment: true });
    }

    const result = await processor
        .use(rehypeSanitize)
        .use(rehypeStringify)
        // @ts-ignore
        .process(content);

    return String(result);
}

export default async function ReviewSection({ movieId }: { movieId: number }) {
    const reviews = await getMovieReviews(movieId);

    if (reviews.length === 0) return null;

    return (
        <section className="space-y-12">
            <div className="section-header flex items-center justify-between">
                <span>REVIEWS</span>
                <span className="text-[#556677] text-[10px] font-bold tracking-[0.2em]">
                    {reviews.length} LOGS
                </span>
            </div>

            <div className="space-y-12">
                {reviews.map(async (review) => {
                    const html = await renderContent(review.bodyRaw, review.bodyFormat);

                    return (
                        <div key={review.id} className="grid grid-cols-1 md:grid-cols-[48px_1fr] gap-x-8 gap-y-4 group">
                            <div className="hidden md:block">
                                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-white/10 bg-white/5 shadow-xl">
                                    {review.user.image ? (
                                        <Image src={review.user.image} alt={review.user.name || "User"} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#556677] font-black text-xs">
                                            {review.user.name?.[0] || "?"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <span className="text-white font-black text-[11px] uppercase tracking-widest">{review.user.name}</span>
                                    {review.ratingHalf && (
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => {
                                                const val = i + 1;
                                                const rating = review.ratingHalf! / 2;
                                                if (rating >= val) return <Star key={i} className="w-3 h-3 fill-[#ff8000] text-[#ff8000]" />;
                                                if (rating >= val - 0.5) return (
                                                    <div key={i} className="relative">
                                                        <Star className="w-3 h-3 text-[#334455]" />
                                                        <div className="absolute inset-0 overflow-hidden w-1/2">
                                                            <Star className="w-3 h-3 fill-[#ff8000] text-[#ff8000]" />
                                                        </div>
                                                    </div>
                                                );
                                                return <Star key={i} className="w-3 h-3 text-[#334455]" />;
                                            })}
                                        </div>
                                    )}
                                    {review.watchLog?.rewatch && (
                                        <span className="text-brand text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-brand/10 rounded-full border border-brand/20">
                                            Rewatch
                                        </span>
                                    )}
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#334455] ml-auto md:ml-0">
                                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>

                                <div
                                    className="rich-text text-[15px] text-[#99aabb] leading-relaxed font-medium max-w-2xl selection:bg-brand/30"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />

                                <div className="flex items-center gap-6 pt-2">
                                    <ReviewLikeButton
                                        reviewId={review.id}
                                        initialLikeCount={review._count.favorites}
                                        initialIsLiked={(review as any).isLikedByUser}
                                    />
                                    <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#556677] hover:text-white transition-colors">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>{(review as any)._count.comments || 0} Comments</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
