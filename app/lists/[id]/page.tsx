import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getListDetails } from "@/app/actions/lists";
import { notFound } from "next/navigation";
import { requireAppUserIdPage } from "@/lib/clerk-auth-helpers";
import ListEditor from "@/components/lists/ListEditor";

interface ListDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ListDetailPage({ params }: ListDetailPageProps) {
    const { id } = await params;
    await requireAppUserIdPage();

    const list = await getListDetails(id);
    if (!list) notFound();

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <Container>
                    <ListEditor initialList={list as any} />
                </Container>
            </main>

            <Footer />
        </div>
    );
}
