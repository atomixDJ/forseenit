export default function Loading() {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center">
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-[#ff8000] animate-bounce" />
                <div className="w-4 h-4 rounded-full bg-[#00e054] animate-bounce [animation-delay:-0.15s]" />
                <div className="w-4 h-4 rounded-full bg-[#40bcf4] animate-bounce [animation-delay:-0.3s]" />
            </div>
        </div>
    );
}
