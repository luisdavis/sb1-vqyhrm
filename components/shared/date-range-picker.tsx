'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  value: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const hasDateRange = value.from && value.to;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={hasDateRange ? 'default' : 'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !hasDateRange && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {hasDateRange ? (
            <span>
              {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
            </span>
          ) : (
            <span>Pick a date range</span>
          )}
          {hasDateRange && (
            <X 
              className="ml-2 h-4 w-4 hover:text-red-500" 
              onClick={(e) => {
                e.stopPropagation();
                onChange({ from: undefined, to: undefined });
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value.from}
          selected={{ from: value.from, to: value.to }}
          onSelect={(range: any) => onChange(range)}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}