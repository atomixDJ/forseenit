import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#14181c] flex items-center justify-center px-4">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-[#1b2228] border border-white/5",
                    }
                }}
            />
        </div>
    );
}
