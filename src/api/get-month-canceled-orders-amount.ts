import { api } from '@/lib/axios';

interface IGetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function GetMonthCanceledOrdersAmount() {
  const response = await api.get<IGetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  );

  return response.data;
}
