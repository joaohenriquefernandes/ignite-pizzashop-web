import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, Search, X } from 'lucide-react';
import { useState } from 'react';

import { ApproveOrder } from '@/api/approve-order';
import { CancelOrder } from '@/api/cancel-order';
import { DeliverOrder } from '@/api/deliver-order';
import { DispatchOrder } from '@/api/dispatch-order';
import { IGetOrdersResponse } from '@/api/get-orders';
import { OrderStatus, OrderStatusType } from '@/components/order-status';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

import { OrderDetails } from './order-details';

interface IOrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: IOrderTableRowProps) {
  const [isdetailsOpen, setIsdetailsOpen] = useState(false);

  const queryClient = useQueryClient();

  function UpdateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const oderListCached = queryClient.getQueriesData<IGetOrdersResponse>({
      queryKey: ['orders'],
    });

    oderListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((item) => {
          if (item.orderId === orderId) {
            return { ...order, status };
          }

          return item;
        }),
      });
    });
  }

  const { mutateAsync: CancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: CancelOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, 'canceled');
      },
    });

  const { mutateAsync: ApproveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: ApproveOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, 'processing');
      },
    });

  const { mutateAsync: DispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: DispatchOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, 'delivering');
      },
    });

  const { mutateAsync: DeliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: DeliverOrder,
      async onSuccess(_, { orderId }) {
        UpdateOrderStatusOnCache(orderId, 'delivered');
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isdetailsOpen} onOpenChange={setIsdetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isdetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="font-medium">
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => ApproveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => DispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => DeliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell className="font-medium">
        <Button
          variant="ghost"
          size="xs"
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => CancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
