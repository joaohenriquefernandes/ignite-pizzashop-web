import { api } from '@/lib/axios';

interface IGetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'manager' | 'customer';
  createdAt: Date | null;
  updatedAte: Date | null;
}

export async function GetProfile(): Promise<IGetProfileResponse> {
  const response = await api.get('/me');

  return response.data;
}
