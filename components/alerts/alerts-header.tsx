import { Bell } from 'lucide-react';

export function AlertsHeader() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Bell className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Trading Alerts</h1>
          <p className="text-sm text-zinc-400">Configure and generate TradingView alerts</p>
        </div>
      </div>
    </div>
  );
}