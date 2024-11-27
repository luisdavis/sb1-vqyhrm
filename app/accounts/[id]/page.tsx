'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { AccountDetails } from '@/components/accounts/account-details';
import { AccountStats } from '@/components/accounts/account-stats';
import { AccountHistory } from '@/components/accounts/account-history';
import { AccountSettings } from '@/components/accounts/account-settings';
import { AccountTrades } from '@/components/accounts/account-trades';
import { AccountOrders } from '@/components/accounts/account-orders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BarChart2, Clock, Settings, LineChart, ListOrdered } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AccountDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'statistics');

  // Get filter parameters
  const tradeId = searchParams.get('tradeId');
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/accounts"
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-zinc-400" />
          </Link>
          <h1 className="text-2xl font-semibold text-white">Account Details</h1>
        </div>

        <AccountDetails accountId={id as string} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-zinc-900 border-b border-zinc-800">
            <TabsTrigger value="statistics" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="trades" className="gap-2">
              <LineChart className="h-4 w-4" />
              Trades
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ListOrdered className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className="mt-6">
            <AccountStats accountId={id as string} />
          </TabsContent>

          <TabsContent value="trades" className="mt-6">
            <AccountTrades 
              accountId={id as string} 
              highlightedTradeId={tradeId}
            />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <AccountOrders 
              accountId={id as string} 
              highlightedOrderId={orderId}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <AccountHistory accountId={id as string} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <AccountSettings accountId={id as string} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}