export function PnLStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        label="Total PnL"
        value="$2.3K"
        change="+61.5K"
        subtext="TODAY"
        isPositive={true}
      />
      <StatCard
        label="Realized PnL"
        value="$3.9K"
        change="+31.5K"
        subtext="WEEKLY"
        isPositive={true}
      />
      <StatCard
        label="Unrealized PnL"
        value="-$300"
        change="-2042.52"
        subtext="AVG"
        isPositive={false}
      />
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  change, 
  subtext,
  isPositive 
}: { 
  label: string;
  value: string;
  change: string;
  subtext: string;
  isPositive: boolean;
}) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      <p className="text-sm text-zinc-400">{label}</p>
      <div className="mt-1">
        <span className="text-xl font-semibold text-white">{value}</span>
        <div className="flex items-center gap-1 mt-1">
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>
          <span className="text-xs text-zinc-500">
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}