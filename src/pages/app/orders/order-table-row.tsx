import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, Search, X } from 'lucide-react';
import { useState } from 'react';

import { CancelOrder } from '@/api/cancel-order';
import { IGetOrdersResponse } from '@/api/get-orders';
import { OrderStatus } from '@/components/order-status';
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

  const { mutateAsync: CancelOrderFn } = useMutation({
    mutationFn: CancelOrder,
    async onSuccess(_, { orderId }) {
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
              return { ...order, status: 'canceled' };
            }

            return item;
          }),
        });
      });
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
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell className="font-medium">
        <Button
          variant="ghost"
          size="xs"
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => CancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
