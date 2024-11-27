'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ComponentFlags {
  disabledComponents: string[];
  setDisabledComponents: (components: string[]) => void;
  isComponentDisabled: (id: string) => boolean;
  toggleComponentDisabled: (id: string) => void;
}

export const useComponentFlags = create<ComponentFlags>()(
  persist(
    (set, get) => ({
      disabledComponents: ['trading-analytics', 'performance-metrics'],
      setDisabledComponents: (components) => set({ disabledComponents: components }),
      isComponentDisabled: (id) => get().disabledComponents.includes(id),
      toggleComponentDisabled: (id) => {
        const { disabledComponents } = get();
        const isCurrentlyDisabled = disabledComponents.includes(id);
        
        set({
          disabledComponents: isCurrentlyDisabled
            ? disabledComponents.filter(c => c !== id)
            : [...disabledComponents, id]
        });
      },
    }),
    {
      name: 'component-flags-storage',
    }
  )
);