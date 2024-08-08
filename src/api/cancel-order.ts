import { api } from '@/lib/axios';

interface ICancelOrderParams {
  orderId: string;
}

export async function CancelOrder({ orderId }: ICancelOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`);
}
