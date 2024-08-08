import { api } from '@/lib/axios';

interface IDispatchOrderParams {
  orderId: string;
}

export async function DispatchOrder({ orderId }: IDispatchOrderParams) {
  await api.patch(`orders/${orderId}/dispatch`);
}
