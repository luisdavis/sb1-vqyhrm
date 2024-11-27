import { Button } from '@/components/ui/button';
import { Wallet, Plus } from 'lucide-react';
import { RenameAccountDialog } from './rename-account-dialog';
import { useState } from 'react';

export function AccountsHeader() {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Wallet className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Trading Accounts</h1>
          <p className="text-sm text-zinc-400">Manage your trading accounts across different brokers</p>
        </div>
      </div>

      <Button
        onClick={() => setIsRenameDialogOpen(true)}
        className="bg-blue-500 hover:bg-blue-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Account
      </Button>

      <RenameAccountDialog
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
      />
    </div>
  );
}