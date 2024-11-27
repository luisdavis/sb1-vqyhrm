'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Clock, X } from 'lucide-react';
import Image from 'next/image';
import { ConnectBrokerDialog } from '../brokers/connect-broker-dialog';

type MarketType = 'forex' | 'crypto' | 'futures';
type BrokerStatus = 'connected' | 'disconnected' | 'in-progress';

interface BrokerAccount {
  type: 'live' | 'demo';
  id: string;
  status: BrokerStatus;
}

interface Broker {
  name: string;
  logo: string;
  status: 'available' | 'in-works';
  accounts: BrokerAccount[];
}

const BROKERS: Broker[] = [
  {
    name: 'Tradovate',
    logo: '/images/brokers/tradovate.png',
    status: 'available',
    accounts: [
      { type: 'live', id: '3818071', status: 'disconnected' },
      { type: 'demo', id: '3818071', status: 'disconnected' },
    ],
  },
  {
    name: 'dxTrade',
    logo: '/images/brokers/dxtrade.png',
    status: 'available',
    accounts: [
      { type: 'live', id: '3818071', status: 'disconnected' },
      { type: 'demo', id: '3818071', status: 'disconnected' },
    ],
  },
  {
    name: 'TradeLocker',
    logo: '/images/brokers/tradelocker.png',
    status: 'in-works',
    accounts: [],
  },
];

export function ManageBrokersDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeMarket, setActiveMarket] = useState<MarketType>('crypto');
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  const handleConnect = (broker: Broker) => {
    setSelectedBroker(broker);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-none text-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Image
                    src="/images/brokers-icon.png"
                    alt="Brokers"
                    width={24}
                    height={24}
                  />
                </div>
                <DialogTitle className="text-xl font-semibold">Manage Brokers</DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-center gap-6">
              <MarketToggle
                label="Forex"
                type="forex"
                isActive={activeMarket === 'forex'}
                onClick={() => setActiveMarket('forex')}
              />
              <MarketToggle
                label="Crypto"
                type="crypto"
                isActive={activeMarket === 'crypto'}
                onClick={() => setActiveMarket('crypto')}
              />
              <MarketToggle
                label="Futures"
                type="futures"
                isActive={activeMarket === 'futures'}
                onClick={() => setActiveMarket('futures')}
              />
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {BROKERS.map((broker) => (
                  <div
                    key={broker.name}
                    className="bg-zinc-800/50 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={broker.logo}
                          alt={broker.name}
                          width={24}
                          height={24}
                        />
                        <span className="font-medium">{broker.name}</span>
                      </div>
                      {broker.status === 'available' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-500 hover:text-green-400"
                          onClick={() => handleConnect(broker)}
                        >
                          Connect account
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">In the works</span>
                        </div>
                      )}
                    </div>

                    {broker.accounts.map((account) => (
                      <div
                        key={`${account.type}-${account.id}`}
                        className="px-4 py-2 border-t border-zinc-700 flex items-center gap-2"
                      >
                        <ChevronRight className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm">
                          {account.type === 'live' ? 'Live' : 'Demo'} -{' '}
                          {account.status === 'connected' ? 'Connected' : 'Disconnected'}{' '}
                          {account.id}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {selectedBroker && (
        <ConnectBrokerDialog
          isOpen={!!selectedBroker}
          onClose={() => setSelectedBroker(null)}
          broker={selectedBroker}
        />
      )}
    </>
  );
}

function MarketToggle({ 
  label, 
  type, 
  isActive, 
  onClick 
}: { 
  label: string;
  type: MarketType;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2"
    >
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${isActive ? 'bg-blue-500/20' : 'bg-zinc-800'}
        transition-colors
      `}>
        {type === 'forex' && (
          <span className="text-lg font-semibold text-zinc-400">FX</span>
        )}
        {type === 'crypto' && (
          <span className="text-lg font-semibold text-zinc-400">₿</span>
        )}
        {type === 'futures' && (
          <span className="text-lg font-semibold text-zinc-400">F</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-zinc-700'}`} />
        <span className="text-sm text-zinc-400">{label}</span>
      </div>
    </button>
  );
}