'use client';

import { Card } from '@/components/ui/card';
import { LineChart, BarChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AccountStatsProps {
  accountId: string;
}

const MOCK_DATA = [
  { date: '2024-01', pnl: 1200, trades: 15 },
  { date: '2024-02', pnl: -800, trades: 12 },
  { date: '2024-03', pnl: 2500, trades: 20 },
  { date: '2024-04', pnl: 1800, trades: 18 },
  { date: '2024-05', pnl: -1200, trades: 14 },
  { date: '2024-06', pnl: 3000, trades: 25 },
];

export function AccountStats({ accountId }: AccountStatsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profit/Loss History</h3>
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Area
                type="monotone"
                dataKey="pnl"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Trading Activity</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis 
                dataKey="date" 
                stroke="#71717a"
                tick={{ fill: '#71717a' }}
              />
              <YAxis 
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
              <BarChart dataKey="trades" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}