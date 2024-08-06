import { api } from '@/lib/axios';

export interface IGetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export interface IGetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function GetOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: IGetOrdersQuery): Promise<IGetOrdersResponse> {
  const response = await api.get<IGetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });

  return response.data;
}
