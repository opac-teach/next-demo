export interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    description?: string;
    creatorId: string;
    totalSupply: number;
    reserveZth: number;
    createdAt: Date;
    updatedAt: Date;
}