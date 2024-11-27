'use client';

import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, CreditCard, LogOut, Moon, Sun, Palette } from 'lucide-react';
import Link from 'next/link';
import { themes } from '@/styles/themes';

export function UserNav() {
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();
  const email = session?.user?.email || '';
  const initials = email.substring(0, 2).toUpperCase();

  // Get additional themes (excluding light and dark)
  const additionalThemes = Object.entries(themes).filter(
    ([key]) => !['light', 'dark'].includes(key)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-800">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">{session?.user?.name}</p>
            <p className="text-xs leading-none text-zinc-400">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/settings?tab=subscription">
          <DropdownMenuItem className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Subscription</span>
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator className="bg-zinc-800" />

        {/* Theme Options */}
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => setTheme('light')}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && (
            <span className="ml-auto text-xs text-blue-500">Active</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => setTheme('dark')}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && (
            <span className="ml-auto text-xs text-blue-500">Active</span>
          )}
        </DropdownMenuItem>

        {additionalThemes.length > 0 && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <Palette className="mr-2 h-4 w-4" />
              <span>More Themes</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="bg-zinc-900 border-zinc-800">
              {additionalThemes.map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  className="cursor-pointer"
                  onClick={() => setTheme(key)}
                >
                  <span>{value.name}</span>
                  {theme === key && (
                    <span className="ml-auto text-xs text-blue-500">Active</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        
        <DropdownMenuSeparator className="bg-zinc-800" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-500 focus:text-red-500"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}