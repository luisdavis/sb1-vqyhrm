'use client';

import { useComponentFlags } from '@/store/use-component-flags';
import { Construction } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DevelopmentWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function DevelopmentWrapper({
  id,
  children,
  className
}: DevelopmentWrapperProps) {
  const isDisabled = useComponentFlags((state) => state.isComponentDisabled(id));

  if (!isDisabled) return <>{children}</>;

  return (
    <div className={cn("relative group", className)}>
      {children}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 p-4 text-center">
          <div className="p-3 bg-blue-500/20 rounded-full">
            <Construction className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-lg font-medium text-white">In Development</p>
          <p className="text-sm text-zinc-300">This feature is coming soon</p>
        </div>
      </div>
    </div>
  );
}