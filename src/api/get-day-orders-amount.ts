import { api } from '@/lib/axios';

interface IGetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function GetDayOrdersAmount() {
  const response = await api.get<IGetDayOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  );

  return response.data;
}
