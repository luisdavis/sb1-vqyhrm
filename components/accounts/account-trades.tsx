'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { TradesTable } from '@/components/dashboard/trades-table';

interface AccountTradesProps {
  accountId: string;
  highlightedTradeId?: string | null;
}

export function AccountTrades({ accountId, highlightedTradeId }: AccountTradesProps) {
  const highlightedRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (highlightedTradeId && highlightedRowRef.current) {
      highlightedRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      highlightedRowRef.current.classList.add('bg-blue-500/20');
      
      const timeout = setTimeout(() => {
        highlightedRowRef.current?.classList.remove('bg-blue-500/20');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [highlightedTradeId]);

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <TradesTable 
        accountId={accountId}
        highlightedTradeId={highlightedTradeId}
        highlightedRowRef={highlightedRowRef}
      />
    </Card>
  );
}