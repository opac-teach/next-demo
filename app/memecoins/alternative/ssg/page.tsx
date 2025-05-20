import MemecoinSSG from '@/components/memecoins/alternative/SSG/MemecoinSSG';



export default function MemecoinSSGPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Static Site Generation</h1>
            <MemecoinSSG />
        </div>
    );
}

export async function generateStaticParams() {
    return [
        { id: 'hsq1tty8fwq' },
        { id: '0g1pjoaedy6' },
        { id: 'ggak4ohs147' },
    ];
}