'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DevelopmentWrapper } from '@/components/shared/development-wrapper';

interface TradingAnalyticsProps {
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

const MOCK_DATA = [
  { date: '2024-01', equity: 10000, drawdown: 0 },
  { date: '2024-02', equity: 12000, drawdown: -500 },
  { date: '2024-03', equity: 11500, drawdown: -1000 },
  { date: '2024-04', equity: 13500, drawdown: -200 },
  { date: '2024-05', equity: 15000, drawdown: -800 },
  { date: '2024-06', equity: 14200, drawdown: -1500 },
];

export function TradingAnalytics({ dateRange, filters }: TradingAnalyticsProps) {
  return (
    <DevelopmentWrapper id="trading-analytics">
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Equity Curve & Drawdown</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                tick={{ fill: '#71717a' }}
              />
              <YAxis 
                stroke="#71717a"
                tick={{ fill: '#71717a' }}
                yAxisId="left"
              />
              <YAxis 
                stroke="#71717a"
                tick={{ fill: '#71717a' }}
                yAxisId="right"
                orientation="right"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="equity"
                stroke="#3b82f6"
                yAxisId="left"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="drawdown"
                stroke="#ef4444"
                yAxisId="right"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DevelopmentWrapper>
  );
}