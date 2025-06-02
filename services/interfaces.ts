export interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    owner: string;
    description: string;
    logoUrl: string;
}

// export interface MemecoinFormData {
//     name: string;
//     symbol: string;
//     owner: string;
//     description: string;
//     logoUrl: string;
// }

export type Inputs = {
    id:string,
    name: string,
    symbol: string,
    description: string,
    logoUrl:string,
}

export type LoginType = {
    pseudo: string,
    password: string,
}

export type SignupType = {
    email: string,
    pseudo: string,
    password: string,
}
