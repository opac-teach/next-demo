import MemecoinISR from '@/components/memecoins/alternative/ISR/MemecoinISR';



export default function MemecoinISRPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Incremental Static Regeneration</h1>
            <MemecoinISR />
        </div>
    );
}

// Déclare les paramètres dynamiques de génération
export async function generateStaticParams() {
    return [
        { id: 'hsq1tty8fwq' },
        { id: '0g1pjoaedy6' },
        { id: 'ggak4ohs147' },
    ];
}