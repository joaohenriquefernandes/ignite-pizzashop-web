export type OrderStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered';

interface IOrderStatusProps {
  status: OrderStatusType;
}

const orderStatusMap: Record<OrderStatusType, string> = {
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  pending: 'Pendente',
  processing: 'Em preparo',
};

export function OrderStatus({ status }: IOrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'canceled' && (
        <span
          data-testid="badge"
          className="h-3 w-3 rounded-full bg-rose-500"
        />
      )}

      {status === 'pending' && (
        <span
          data-testid="badge"
          className="h-3 w-3 rounded-full bg-slate-400"
        />
      )}

      {status === 'delivered' && (
        <span
          data-testid="badge"
          className="h-3 w-3 rounded-full bg-emerald-500"
        />
      )}

      {['processing', 'delivering'].includes(status) && (
        <span
          data-testid="badge"
          className="h-3 w-3 rounded-full bg-amber-500"
        />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
