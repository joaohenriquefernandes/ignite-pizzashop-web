import { api } from '@/lib/axios';

interface IGetDailyRevenueInPeriodParams {
  from?: Date;
  to?: Date;
}

type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function GetDailyRevenueInPeriod({
  from,
  to,
}: IGetDailyRevenueInPeriodParams) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
}
