'use client';

import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Percent, DollarSign, BarChart2, Timer } from 'lucide-react';
import { DevelopmentWrapper } from '@/components/shared/development-wrapper';

interface PerformanceMetricsProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  filters: {
    broker: string;
    account: string;
    instrument: string;
  };
}

const MOCK_METRICS = {
  totalPnL: 12500,
  pnlChange: 15.3,
  winRate: 68.5,
  winRateChange: 2.3,
  avgTradeTime: '45m',
  avgTradeTimeChange: -5.2,
  profitFactor: 2.1,
  profitFactorChange: 0.3,
};

export function PerformanceMetrics({ dateRange, filters }: PerformanceMetricsProps) {
  return (
    <DevelopmentWrapper id="performance-metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total P&L</p>
              <p className="text-xl font-semibold text-white mt-1">
                ${MOCK_METRICS.totalPnL.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-green-500 text-sm">
                  +{MOCK_METRICS.pnlChange}%
                </span>
                <span className="text-xs text-zinc-500">
                  vs. prev. period
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Win Rate</p>
              <p className="text-xl font-semibold text-white mt-1">
                {MOCK_METRICS.winRate}%
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-green-500 text-sm">
                  +{MOCK_METRICS.winRateChange}%
                </span>
                <span className="text-xs text-zinc-500">
                  vs. prev. period
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Percent className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Avg Trade Time</p>
              <p className="text-xl font-semibold text-white mt-1">
                {MOCK_METRICS.avgTradeTime}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-red-500 text-sm">
                  {MOCK_METRICS.avgTradeTimeChange}%
                </span>
                <span className="text-xs text-zinc-500">
                  vs. prev. period
                </span>
              </div>
            </div>
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Timer className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Profit Factor</p>
              <p className="text-xl font-semibold text-white mt-1">
                {MOCK_METRICS.profitFactor}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-green-500 text-sm">
                  +{MOCK_METRICS.profitFactorChange}
                </span>
                <span className="text-xs text-zinc-500">
                  vs. prev. period
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart2 className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>
    </DevelopmentWrapper>
  );
}