export interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  price?: number;
  description?: string;
  logoUrl?: string;
  createdAt?: string;
}

export interface CreateMemecoinPayload {
  name: string;
  symbol: string;
  description?: string;
  logoUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
