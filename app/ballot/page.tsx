import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BallotUI from "@/components/awards/BallotUI";

export default function BallotPage() {
    const isDev = process.env.NODE_ENV !== "production";

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />
            <BallotUI isDev={isDev} />
            <Footer />
        </div>
    );
}

