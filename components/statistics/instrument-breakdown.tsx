'use client';

import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface InstrumentBreakdownProps {
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
  { name: 'EURUSD', value: 35, color: '#3b82f6' },
  { name: 'BTCUSD', value: 25, color: '#22c55e' },
  { name: 'GBPUSD', value: 20, color: '#eab308' },
  { name: 'USDJPY', value: 15, color: '#ef4444' },
  { name: 'Others', value: 5, color: '#8b5cf6' },
];

export function InstrumentBreakdown({ dateRange, filters }: InstrumentBreakdownProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Instrument Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={MOCK_DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {MOCK_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value: string) => (
                <span className="text-zinc-400">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}