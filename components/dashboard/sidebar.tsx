"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Link2, 
  BarChart2, 
  Lightbulb, 
  Wallet, 
  Settings, 
  Bell,
  ChevronFirst,
  ChevronLast,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebarStore } from '@/store/use-sidebar-store';
import { useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Connect Brokers', href: '/brokers', icon: Link2 },
  { name: 'Statistics', href: '/statistics', icon: BarChart2 },
  { name: 'Strategies', href: '/strategies', icon: Lightbulb },
  { name: 'Accounts', href: '/accounts', icon: Wallet },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar, setExpanded } = useSidebarStore();

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setExpanded]);

  return (
    <div 
      className={cn(
        "relative flex flex-col bg-zinc-950 border-r border-zinc-800 h-screen transition-all duration-300",
        isExpanded ? "w-64" : "w-[70px]"
      )}
    >
      <div className="p-4">
        <div className={cn(
          "flex items-center gap-2",
          isExpanded ? "justify-start" : "justify-center"
        )}>
          <Image
            src="/images/logo.webp"
            alt="Sigma Algo"
            width={40}
            height={40}
          />
          {isExpanded && (
            <span className="text-xl font-semibold text-white">Sigma Algo</span>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        <TooltipProvider delayDuration={0}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900",
                      !isExpanded && "justify-center"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {isExpanded && item.name}
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      <Button
        onClick={toggleSidebar}
        variant="ghost"
        className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 p-0 hover:bg-zinc-800"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronFirst className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronLast className="h-4 w-4 text-zinc-400" />
        )}
      </Button>
    </div>
  );
}