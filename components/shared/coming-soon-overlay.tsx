'use client';

import { usePathname } from 'next/navigation';
import { useFeatureFlags } from '@/store/use-feature-flags';
import { Construction } from 'lucide-react';
import { useSidebarStore } from '@/store/use-sidebar-store';
import { cn } from '@/lib/utils';

export function ComingSoonOverlay() {
  const pathname = usePathname();
  const isPageDisabled = useFeatureFlags((state) => state.isPageDisabled(pathname));
  const { isExpanded } = useSidebarStore();

  if (!isPageDisabled) return null;

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 z-40 flex items-center justify-center transition-all duration-300",
      isExpanded ? "lg:left-64" : "lg:left-[70px]",
      "left-0 top-[65px]" // Account for top bar height
    )}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative flex flex-col items-center gap-4 text-center p-8">
        <div className="p-4 bg-blue-500/20 rounded-full">
          <Construction className="h-8 w-8 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
        <p className="text-lg text-zinc-300 max-w-md">
          We're working hard to bring you this feature. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}