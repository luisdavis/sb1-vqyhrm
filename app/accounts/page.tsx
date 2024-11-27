'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { AccountsHeader } from '@/components/accounts/accounts-header';
import { AccountsList } from '@/components/accounts/accounts-list';
import { AccountFilters } from '@/components/accounts/account-filters';

export default function AccountsPage() {
  const [activeFilters, setActiveFilters] = useState({
    broker: 'all',
    status: 'all',
    type: 'all',
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <AccountsHeader />
        <AccountFilters 
          activeFilters={activeFilters} 
          onFilterChange={setActiveFilters} 
        />
        <AccountsList filters={activeFilters} />
      </div>
    </AppLayout>
  );
}