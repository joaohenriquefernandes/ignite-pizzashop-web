import { api } from '@/lib/axios';

interface IGetManagedRestaurant {
  id: string;
  name: string;
  managerId: string | null;
  description: string | null;
  createdAt: Date | null;
  updatedAte: Date | null;
}

export async function GetManagedRestaurant(): Promise<IGetManagedRestaurant> {
  const response = await api.get('/managed-restaurant');

  return response.data;
}
