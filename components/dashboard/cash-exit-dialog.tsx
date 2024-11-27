'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const EXIT_THRESHOLD_TYPES = [
  'Percentage',
  'Fixed Cash Amount',
  'Pips',
];

export function CashExitDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedType, setSelectedType] = useState('Percentage');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-none text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-semibold">Cash Exit</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Cash Exit</h3>
              <p className="text-sm text-zinc-400">Enable or disable the cash exit for the group.</p>
            </div>
            <Switch 
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Exit Threshold Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between bg-zinc-800 border-none text-white hover:bg-zinc-700"
                >
                  {selectedType}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] bg-zinc-800 border-zinc-700">
                {EXIT_THRESHOLD_TYPES.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onSelect={() => setSelectedType(type)}
                    className="flex items-center justify-between text-white hover:bg-zinc-700 cursor-pointer"
                  >
                    {type}
                    {selectedType === type && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-sm text-zinc-400">Select the exit threshold type.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Threshold Value</label>
            <Input
              type="number"
              defaultValue="10"
              className="bg-zinc-800 border-none text-white"
            />
            <p className="text-sm text-zinc-400">Set the threshold value for cash exit.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}