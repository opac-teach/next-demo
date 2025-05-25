import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export const metadata = {
    title: 'Leaderboard | Memecoins',
    description: 'Classement des meilleurs utilisateurs basés sur leur solde ZTH.',
};

// Composant principal pour afficher le leaderboard
export default async function LeaderboardPage() {
    // Récupération des utilisateurs triés par leur solde ZTH
    const leaderboard = await prisma.user.findMany({
        orderBy: { zthBalance: 'desc' },
        take: 10, // Limiter au top 10
        select: {
            id: true,
            email: true,
            zthBalance: true,
            createdAt: true,
        },
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">🏆 Classement des Utilisateurs 🏆</h1>

            {/* Table contenant les informations des utilisateurs */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Position</th>
                    <th className="border border-gray-300 p-2 text-left">Email</th>
                    <th className="border border-gray-300 p-2 text-left">Solde (ZTH)</th>
                    <th className="border border-gray-300 p-2 text-left">Date Inscription</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{user.email}</td>
                        <td className="border border-gray-300 p-2">{user.zthBalance.toFixed(2)} ZTH</td>
                        <td className="border border-gray-300 p-2">
                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}