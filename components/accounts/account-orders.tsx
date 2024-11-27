'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { OrdersTable } from '@/components/dashboard/orders-table';

interface AccountOrdersProps {
  accountId: string;
  highlightedOrderId?: string | null;
}

export function AccountOrders({ accountId, highlightedOrderId }: AccountOrdersProps) {
  const highlightedRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (highlightedOrderId && highlightedRowRef.current) {
      highlightedRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightedRowRef.current.classList.add('bg-blue-500/20');
      
      const timeout = setTimeout(() => {
        highlightedRowRef.current?.classList.remove('bg-blue-500/20');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [highlightedOrderId]);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <OrdersTable 
        accountId={accountId}
        highlightedOrderId={highlightedOrderId}
        highlightedRowRef={highlightedRowRef}
      />
    </Card>
  );
}