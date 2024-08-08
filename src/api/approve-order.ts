import { api } from '@/lib/axios';

interface IApproveOrderParams {
  orderId: string;
}

export async function ApproveOrder({ orderId }: IApproveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`);
}
