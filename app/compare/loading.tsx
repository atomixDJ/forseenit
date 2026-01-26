import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

export default function CompareLoading() {
    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            {/* Scan Line Overlay - Pure CSS Animation from globals.css */}
            <div className="scanline-container">
                <div className="scanline" />
            </div>

            <main className="flex-grow pt-32 pb-24 relative z-0">
                <Container>
                    <div className="mb-12 text-center">
                        <div className="h-2 w-32 bg-white/5 shimmer mx-auto rounded-full mb-4" />
                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div className="w-16 h-16 rounded-full bg-white/5 shimmer" />
                            <div className="w-8 h-px bg-white/10" />
                            <div className="w-16 h-16 rounded-full bg-white/5 shimmer" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                        {/* Vertical Divider Skeleton */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

                        {/* Self Column Skeleton */}
                        <div className="space-y-16">
                            <SkeletonPanel title="Top Ten" items={3} />
                            <SkeletonPanel title="High Ratings" items={2} height="h-32" />
                            <SkeletonPanel title="Recent" items={4} height="h-40" />
                        </div>

                        {/* Peer Column Skeleton */}
                        <div className="space-y-16">
                            <SkeletonPanel title="Top Ten" items={3} />
                            <SkeletonPanel title="High Ratings" items={2} height="h-32" />
                            <SkeletonPanel title="Recent" items={4} height="h-40" />
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}

function SkeletonPanel({ title, items, height = "h-48" }: { title: string, items: number, height?: string }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="h-3 w-24 bg-white/5 shimmer rounded" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: items }).map((_, i) => (
                    <div key={i} className={`${height} w-full bg-white/5 shimmer rounded-lg`} />
                ))}
            </div>
        </div>
    );
}
