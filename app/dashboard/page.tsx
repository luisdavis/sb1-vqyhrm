'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { PortfolioStats } from '@/components/dashboard/portfolio-stats';
import { TradesTable } from '@/components/dashboard/trades-table';
import { OrdersTable } from '@/components/dashboard/orders-table';
import { PnLStats } from '@/components/dashboard/pnl-stats';
import { GroupsPanel } from '@/components/dashboard/groups-panel';
import { AppLayout } from '@/components/layout/app-layout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <PortfolioStats />
            <TradesTable />
            <OrdersTable />
            <PnLStats />
          </div>
          
          <div className="lg:col-span-1">
            <GroupsPanel />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}