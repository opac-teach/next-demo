
export interface Memecoin {
    id: string;
    name: string;
    symbol: string;
    owner: string;
    description: string;
    logoUrl: string;
}

export type Inputs = {
    id:number,
    name: string,
    symbol: string,
    description: string,
    logoUrl:string,
}


export type InputsLogin = {
    pseudo : string,
    password : string
}