import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import ImportWizard from "@/components/import/ImportWizard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LetterboxdImportPage() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <Container>
                <main className="py-20 space-y-12 min-h-[70vh]">
                    <header className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Import Wizard<span className="text-brand">.</span>
                            </h1>
                            <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand/20">
                                Letterboxd
                            </span>
                        </div>
                        <p className="text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.4em] max-w-xl">
                            Upload your Letterboxd data export ZIP to populate your ForSeenIt profile.
                        </p>
                    </header>

                    <ImportWizard />
                </main>
            </Container>

            <Footer />
        </div>
    );
}
