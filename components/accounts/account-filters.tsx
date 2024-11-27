import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AccountFiltersProps {
  activeFilters: {
    broker: string;
    status: string;
    type: string;
  };
  onFilterChange: (filters: any) => void;
}

const BROKERS = [
  { value: 'all', label: 'All Brokers' },
  { value: 'tradovate', label: 'Tradovate' },
  { value: 'tradelocker', label: 'TradeLocker' },
  { value: 'dxtrade', label: 'DX Trade' },
];

const STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
];

const TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'live', label: 'Live' },
  { value: 'demo', label: 'Demo' },
];

export function AccountFilters({ activeFilters, onFilterChange }: AccountFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search accounts..."
            className="pl-9 bg-zinc-800 border-none"
          />
        </div>
        <Button
          variant="outline"
          className="bg-zinc-800 border-none text-white hover:bg-zinc-700"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex gap-4">
        <Select
          value={activeFilters.broker}
          onValueChange={(value) => onFilterChange({ ...activeFilters, broker: value })}
        >
          <SelectTrigger className="bg-zinc-800 border-none">
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
          value={activeFilters.status}
          onValueChange={(value) => onFilterChange({ ...activeFilters, status: value })}
        >
          <SelectTrigger className="bg-zinc-800 border-none">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={activeFilters.type}
          onValueChange={(value) => onFilterChange({ ...activeFilters, type: value })}
        >
          <SelectTrigger className="bg-zinc-800 border-none">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}