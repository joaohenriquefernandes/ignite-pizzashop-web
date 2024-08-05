import { api } from '@/lib/axios';

export interface IGetManagedRestaurantResponse {
  id: string;
  name: string;
  managerId: string | null;
  description: string | null;
  createdAt: Date | null;
  updatedAte: Date | null;
}

export async function GetManagedRestaurant(): Promise<IGetManagedRestaurantResponse> {
  const response = await api.get('/managed-restaurant');

  return response.data;
}
