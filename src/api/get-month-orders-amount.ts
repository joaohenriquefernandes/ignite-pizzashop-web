import { api } from '@/lib/axios';

interface IGetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function GetMonthOrdersAmount() {
  const response = await api.get<IGetMonthOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  );

  return response.data;
}
