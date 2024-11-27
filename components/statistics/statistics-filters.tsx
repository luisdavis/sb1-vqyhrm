'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface StatisticsFiltersProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  activeFilters: {
    broker: string;
    account: string;
    instrument: string;
  };
  onFilterChange: (filters: any) => void;
}

const BROKERS = [
  { value: 'all', label: 'All Brokers' },
  { value: 'tradovate', label: 'Tradovate' },
  { value: 'tradelocker', label: 'TradeLocker' },
  { value: 'dxtrade', label: 'DX Trade' },
];

const ACCOUNTS = [
  { value: 'all', label: 'All Accounts' },
  { value: 'main', label: 'Main Trading' },
  { value: 'demo', label: 'Demo Account' },
];

const INSTRUMENTS = [
  { value: 'all', label: 'All Instruments' },
  { value: 'forex', label: 'Forex' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'futures', label: 'Futures' },
];

export function StatisticsFilters({
  dateRange,
  onDateRangeChange,
  activeFilters,
  onFilterChange,
}: StatisticsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-zinc-800 border-none text-white hover:bg-zinc-700"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range: any) => onDateRangeChange(range)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select
        value={activeFilters.broker}
        onValueChange={(value) => onFilterChange({ ...activeFilters, broker: value })}
      >
        <SelectTrigger className="w-[180px] bg-zinc-800 border-none">
          <SelectValue placeholder="Select broker" />
        </SelectTrigger>
        <SelectContent>
          {BROKERS.map((broker) => (
            <SelectItem key={broker.value} value={broker.value}>
              {broker.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={activeFilters.account}
        onValueChange={(value) => onFilterChange({ ...activeFilters, account: value })}
      >
        <SelectTrigger className="w-[180px] bg-zinc-800 border-none">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          {ACCOUNTS.map((account) => (
            <SelectItem key={account.value} value={account.value}>
              {account.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={activeFilters.instrument}
        onValueChange={(value) => onFilterChange({ ...activeFilters, instrument: value })}
      >
        <SelectTrigger className="w-[180px] bg-zinc-800 border-none">
          <SelectValue placeholder="Select instrument" />
        </SelectTrigger>
        <SelectContent>
          {INSTRUMENTS.map((instrument) => (
            <SelectItem key={instrument.value} value={instrument.value}>
              {instrument.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}