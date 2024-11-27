'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { StatisticsHeader } from '@/components/statistics/statistics-header';
import { StatisticsFilters } from '@/components/statistics/statistics-filters';
import { PerformanceMetrics } from '@/components/statistics/performance-metrics';
import { TradingAnalytics } from '@/components/statistics/trading-analytics';
import { InstrumentBreakdown } from '@/components/statistics/instrument-breakdown';
import { TradeDistribution } from '@/components/statistics/trade-distribution';
import { useState } from 'react';

export default function StatisticsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [activeFilters, setActiveFilters] = useState({
    broker: 'all',
    account: 'all',
    instrument: 'all',
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <StatisticsHeader />
        
        <StatisticsFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />

        <PerformanceMetrics
          dateRange={dateRange}
          filters={activeFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TradingAnalytics
            dateRange={dateRange}
            filters={activeFilters}
          />
          <InstrumentBreakdown
            dateRange={dateRange}
            filters={activeFilters}
          />
        </div>

        <TradeDistribution
          dateRange={dateRange}
          filters={activeFilters}
        />
      </div>
    </AppLayout>
  );
}