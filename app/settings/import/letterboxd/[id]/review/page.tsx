import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { redirect } from "next/navigation";
import ManualResolver from "@/components/import/ManualResolver";
import BulkResolveButton from "@/components/import/BulkResolveButton";

export default async function ImportReviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const { id } = await params;

    const importRun = await prisma.importRun.findUnique({
        where: { id, userId: session.user.id },
        include: {
            auditRows: {
                where: {
                    status: { in: ["ambiguous", "unmatched"] },
                },
                orderBy: { rowNumber: "asc" },
            },
        },
    });

    if (!importRun) redirect("/settings/import/letterboxd");

    const suggestedRows = importRun.auditRows.filter(r => r.tmdbMovieId !== null);

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <Container>
                <main className="py-20 space-y-12">
                    <header className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Review Matches<span className="text-brand">.</span>
                            </h1>
                            <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand/20">
                                {importRun.auditRows.length} Items
                            </span>
                        </div>
                        <p className="text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.4em] max-w-xl">
                            The following items could not be automatically matched. Please select the correct title from TMDb.
                        </p>
                    </header>

                    <div className="space-y-6">
                        {suggestedRows.length > 0 && (
                            <BulkResolveButton
                                importId={id}
                                suggestedCount={suggestedRows.length}
                                rowIds={suggestedRows.map(r => r.id)}
                            />
                        )}

                        {importRun.auditRows.map((row) => (
                            <ManualResolver key={row.id} row={row} />
                        ))}

                        {importRun.auditRows.length === 0 && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center space-y-4">
                                <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">All Caught Up!</h3>
                                <p className="text-[#99aabb] text-xs">There are no more unmatched titles in this import.</p>
                                <div className="pt-4">
                                    <a href="/profile" className="bg-brand text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                                        Back to Profile
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </Container>

            <Footer />
        </div>
    );
}
