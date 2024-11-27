'use client';

import { TopBar } from './top-bar';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useSidebarStore } from '@/store/use-sidebar-store';
import { ComingSoonOverlay } from '@/components/shared/coming-soon-overlay';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isExpanded } = useSidebarStore();

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <main className={cn(
        "flex-1 overflow-auto relative transition-all duration-300",
        isExpanded ? "lg:ml-64" : "lg:ml-[70px]"
      )}>
        <TopBar />
        <div className="p-6 mt-12 relative">
          {children}
          <ComingSoonOverlay />
        </div>
      </main>
    </div>
  );
}