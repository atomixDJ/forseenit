import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BallotUI from "@/components/awards/BallotUI";

export default function BallotPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />
            <BallotUI />
            <Footer />
        </div>
    );
}
