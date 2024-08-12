import { api } from '@/lib/axios';

interface IGetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function GetMonthRevenue() {
  const response = await api.get<IGetMonthRevenueResponse>(
    '/metrics/month-receipt',
  );

  return response.data;
}
