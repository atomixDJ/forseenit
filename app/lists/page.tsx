import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getUserLists, getCollectionLists } from "@/app/actions/lists";
import Link from "next/link";
import { requireAppUserIdPage } from "@/lib/clerk-auth-helpers";
import ListsClient from "@/components/lists/ListsClient";

export default async function ListsPage() {
    await requireAppUserIdPage();

    const [userLists, collectionLists] = await Promise.all([
        getUserLists(),
        getCollectionLists()
    ]);

    const isDev = process.env.NODE_ENV !== "production";

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <Container>
                    <ListsClient
                        userLists={userLists as any}
                        collectionLists={collectionLists as any}
                        isDev={isDev}
                    />
                </Container>
            </main>

            <Footer />
        </div>
    );
}

