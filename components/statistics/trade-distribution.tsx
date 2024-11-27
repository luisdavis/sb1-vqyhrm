'use client';

import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TradeDistributionProps {
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
  { hour: '00:00', trades: 5, winRate: 60 },
  { hour: '03:00', trades: 8, winRate: 75 },
  { hour: '06:00', trades: 12, winRate: 66 },
  { hour: '09:00', trades: 20, winRate: 80 },
  { hour: '12:00', trades: 15, winRate: 73 },
  { hour: '15:00', trades: 18, winRate: 77 },
  { hour: '18:00', trades: 10, winRate: 70 },
  { hour: '21:00', trades: 7, winRate: 57 },
];

export function TradeDistribution({ dateRange, filters }: TradeDistributionProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Trade Distribution by Hour</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis 
              dataKey="hour" 
              stroke="#71717a"
              tick={{ fill: '#71717a' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#71717a"
              tick={{ fill: '#71717a' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#71717a"
              tick={{ fill: '#71717a' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="trades" 
              fill="#3b82f6" 
              name="Number of Trades"
            />
            <Bar 
              yAxisId="right"
              dataKey="winRate" 
              fill="#22c55e" 
              name="Win Rate (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}