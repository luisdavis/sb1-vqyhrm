import { BarChart2 } from 'lucide-react';

export function StatisticsHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-blue-500/20 rounded-lg">
        <BarChart2 className="h-5 w-5 text-blue-500" />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-white">Trading Statistics</h1>
        <p className="text-sm text-zinc-400">Analyze your trading performance and patterns</p>
      </div>
    </div>
  );
}