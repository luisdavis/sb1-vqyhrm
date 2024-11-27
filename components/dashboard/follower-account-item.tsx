'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil } from 'lucide-react';
import { AccountSettingsDialog } from './account-settings-dialog';

interface FollowerAccountItemProps {
  account: string;
  isChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export function FollowerAccountItem({
  account,
  isChecked = false,
  onCheckChange,
}: FollowerAccountItemProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={account} 
            checked={isChecked}
            onCheckedChange={onCheckChange}
          />
          <label htmlFor={account} className="text-sm text-white">
            {account}
          </label>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-white"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      <AccountSettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        accountName={account}
      />
    </>
  );
}