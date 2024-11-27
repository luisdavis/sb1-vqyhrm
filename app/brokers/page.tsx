'use client';

import { useState } from 'react';
import { BrokersHeader } from '@/components/brokers/brokers-header';
import { BrokerAccountsTable } from '@/components/brokers/broker-accounts-table';
import { AddAccountDialog } from '@/components/brokers/add-account-dialog';
import { AppLayout } from '@/components/layout/app-layout';

const MOCK_ACCOUNTS = {
  tradovate: [
    { id: 'TV001', name: 'Main Trading Account', status: 'active' },
    { id: 'TV002', name: 'Demo Account', status: 'active' },
    { id: 'TV003', name: 'Test Account', status: 'disconnected' },
  ],
  tradelocker: [
    { id: 'TL001', name: 'Primary Account', status: 'active' },
    { id: 'TL002', name: 'Secondary Account', status: 'disconnected' },
  ],
  dxtrade: [
    { id: 'DX001', name: 'Live Trading', status: 'active' },
    { id: 'DX002', name: 'Paper Trading', status: 'active' },
  ],
};

export default function BrokersPage() {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <BrokersHeader onAddAccount={() => setIsAddAccountOpen(true)} />
        
        <div className="space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <img
                  src="/images/brokers/tradovate.png"
                  alt="Tradovate"
                  className="h-5 w-5"
                />
              </div>
              <h2 className="text-lg font-semibold text-white">Tradovate Accounts</h2>
            </div>
            <BrokerAccountsTable accounts={MOCK_ACCOUNTS.tradovate} broker="tradovate" />
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <img
                  src="/images/brokers/tradelocker.png"
                  alt="TradeLocker"
                  className="h-5 w-5"
                />
              </div>
              <h2 className="text-lg font-semibold text-white">TradeLocker Accounts</h2>
            </div>
            <BrokerAccountsTable accounts={MOCK_ACCOUNTS.tradelocker} broker="tradelocker" />
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <img
                  src="/images/brokers/dxtrade.png"
                  alt="DX Trade"
                  className="h-5 w-5"
                />
              </div>
              <h2 className="text-lg font-semibold text-white">DX Trade Accounts</h2>
            </div>
            <BrokerAccountsTable accounts={MOCK_ACCOUNTS.dxtrade} broker="dxtrade" />
          </section>
        </div>

        <AddAccountDialog 
          isOpen={isAddAccountOpen}
          onClose={() => setIsAddAccountOpen(false)}
        />
      </div>
    </AppLayout>
  );
}