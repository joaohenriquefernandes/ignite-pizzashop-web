import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { GetOrders } from '@/api/get-orders';
import { Pagination } from '@/components/pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { OrderTableFilters } from './order-table-filters';
import { OrderTableRow } from './order-table-row';
import { OrderTableSkeleton } from './order-table-skeleton';

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1');

  const { data: response, isLoading } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      GetOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === 'all' ? null : status,
      }),
  });

  // eslint-disable-next-line no-shadow
  function handlePaginate(pageIndex: number) {
    setSearchParams((prevState) => {
      prevState.set('page', (pageIndex + 1).toString());

      return prevState;
    });
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]" />
                  <TableHead className="w-[220px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedidos</TableHead>
                  <TableHead className="w-[164px]" />
                  <TableHead className="w-[132px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading && <OrderTableSkeleton />}
                {response &&
                  response.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </TableBody>
            </Table>
          </div>

          {response && (
            <Pagination
              pageIndex={response.meta.pageIndex}
              perPage={response.meta.perPage}
              totalCount={response.meta.totalCount}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  );
}
