import MemecoinRSC from '@/components/memecoins/alternative/RSC/MemecoinRSC';


export default function MemecoinRSCPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">React Server Components</h1>
            {/* Gère le RSC */}
            <MemecoinRSC/>
        </div>
    );
}