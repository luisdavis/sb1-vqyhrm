'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const PROTECTION_PERIODS = [
  { id: 'off', label: 'Off' },
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
];

const THRESHOLD_TYPES = [
  { id: 'percentage', label: 'Percentage' },
  { id: 'fixed', label: 'Fixed Amount' },
];

export function ProfitProtectionDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('off');
  const [selectedType, setSelectedType] = useState('percentage');
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

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
            <DialogTitle className="text-xl font-semibold">Profit Protection</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Profit Protection Period</label>
            <Collapsible
              open={isPeriodOpen}
              onOpenChange={setIsPeriodOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-zinc-800 border-none text-white hover:bg-zinc-700"
                >
                  {PROTECTION_PERIODS.find(p => p.id === selectedPeriod)?.label}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <RadioGroup
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                  className="bg-zinc-800 rounded-lg p-2 space-y-2"
                >
                  {PROTECTION_PERIODS.map((period) => (
                    <div key={period.id} className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-md">
                      <RadioGroupItem
                        value={period.id}
                        id={`period-${period.id}`}
                        className="text-blue-500"
                      />
                      <Label
                        htmlFor={`period-${period.id}`}
                        className="text-white cursor-pointer w-full"
                      >
                        {period.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Threshold Type</label>
            <Collapsible
              open={isTypeOpen}
              onOpenChange={setIsTypeOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-zinc-800 border-none text-white hover:bg-zinc-700"
                >
                  {THRESHOLD_TYPES.find(t => t.id === selectedType)?.label}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <RadioGroup
                  value={selectedType}
                  onValueChange={setSelectedType}
                  className="bg-zinc-800 rounded-lg p-2 space-y-2"
                >
                  {THRESHOLD_TYPES.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-md">
                      <RadioGroupItem
                        value={type.id}
                        id={`type-${type.id}`}
                        className="text-blue-500"
                      />
                      <Label
                        htmlFor={`type-${type.id}`}
                        className="text-white cursor-pointer w-full"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Lockout Threshold</label>
            <Input
              type="number"
              defaultValue="10"
              className="bg-zinc-800 border-none text-white"
            />
            <p className="text-sm text-zinc-400">Set the lockout threshold for profit protection.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}