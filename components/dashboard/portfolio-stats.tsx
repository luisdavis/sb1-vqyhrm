import { Users, LineChart, Wallet } from 'lucide-react';

export function PortfolioStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        icon={Wallet}
        label="Portfolio Value"
        value="$46.3K"
        change="+2.5%"
        isPositive={true}
      />
      <StatCard
        icon={LineChart}
        label="Trades"
        value="60"
        subtext="TODAY"
      />
      <StatCard
        icon={Users}
        label="Accounts"
        value="6"
        subtext="3 Live | 3 Demo"
      />
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  change, 
  subtext,
  isPositive 
}: { 
  icon: any;
  label: string;
  value: string;
  change?: string;
  subtext?: string;
  isPositive?: boolean;
}) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-zinc-800 rounded-lg">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-white">{value}</p>
            {change && (
              <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
            )}
            {subtext && (
              <span className="text-sm text-zinc-500">
                {subtext}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}