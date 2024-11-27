'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FeatureFlags {
  disabledPages: string[];
  setDisabledPages: (pages: string[]) => void;
  isPageDisabled: (path: string) => boolean;
  togglePageDisabled: (path: string) => void;
}

export const useFeatureFlags = create<FeatureFlags>()(
  persist(
    (set, get) => ({
      disabledPages: ['/statistics'],
      setDisabledPages: (pages) => set({ disabledPages: pages }),
      isPageDisabled: (path) => get().disabledPages.includes(path),
      togglePageDisabled: (path) => {
        const { disabledPages } = get();
        const isCurrentlyDisabled = disabledPages.includes(path);
        
        set({
          disabledPages: isCurrentlyDisabled
            ? disabledPages.filter(p => p !== path)
            : [...disabledPages, path]
        });
      },
    }),
    {
      name: 'feature-flags-storage',
    }
  )
);