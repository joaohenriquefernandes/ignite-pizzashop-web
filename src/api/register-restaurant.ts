import { api } from '@/lib/axios';

export interface IRegisterRestaurantBody {
  restaurantName: string;
  managerName: string;
  phone: string;
  email: string;
}

export async function RegisterRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: IRegisterRestaurantBody) {
  await api.post('/restaurant', { email, managerName, phone, restaurantName });
}
