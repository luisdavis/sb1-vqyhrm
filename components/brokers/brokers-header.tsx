import { Button } from '@/components/ui/button';
import { Link2, Plus } from 'lucide-react';

interface BrokersHeaderProps {
  onAddAccount: () => void;
}

export function BrokersHeader({ onAddAccount }: BrokersHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Link2 className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Connect Brokers</h1>
          <p className="text-sm text-zinc-400">Manage your trading accounts from multiple brokers</p>
        </div>
      </div>

      <Button
        onClick={onAddAccount}
        className="bg-blue-500 hover:bg-blue-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Account
      </Button>
    </div>
  );
}