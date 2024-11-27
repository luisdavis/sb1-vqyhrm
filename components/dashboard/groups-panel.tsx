'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { CreateGroupDialog } from './create-group-dialog';
import { EditGroupDialog } from './edit-group-dialog';
import { ManageBrokersDialog } from './manage-brokers-dialog';
import { CloseTradesDialog } from './close-trades-dialog';

type MarketType = 'forex' | 'crypto' | 'futures';

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

function GroupCard({
  name,
  description,
  type,
  onClick,
}: {
  name: string;
  description: string;
  type: MarketType;
  onClick: () => void;
}) {
  const getBorderColor = () => {
    switch (type) {
      case 'forex':
        return 'border-green-500/20';
      case 'crypto':
        return 'border-blue-500/20';
      case 'futures':
        return 'border-orange-500/20';
      default:
        return 'border-zinc-800';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-zinc-800/50 border ${getBorderColor()} rounded-lg p-4 hover:bg-zinc-800/70 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">{name}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
        <div className="p-2 bg-zinc-800 rounded-lg">
          <Users className="h-5 w-5 text-zinc-400" />
        </div>
      </div>
    </button>
  );
}

export function GroupsPanel() {
  const [activeMarket, setActiveMarket] = useState<MarketType>('crypto');
  const [isManageBrokersOpen, setIsManageBrokersOpen] = useState(false);
  const [isCloseTradesOpen, setIsCloseTradesOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <div className="bg-zinc-900 rounded-xl p-4 relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Groups</h2>
            <p className="text-sm text-zinc-400">List of created copy trading groups</p>
          </div>
        </div>
        <span className="text-sm text-zinc-400">0 active</span>
      </div>

      <CreateGroupDialog />

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

        <div className="space-y-3">
          <GroupCard
            name="Group name"
            description="Leader | Account | Name"
            type={activeMarket}
            onClick={() => setSelectedGroup('group1')}
          />
          <GroupCard
            name="Group name"
            description="Leader | Account | Name"
            type={activeMarket}
            onClick={() => setSelectedGroup('group2')}
          />
          <GroupCard
            name="Group name"
            description="Leader | Account | Name"
            type={activeMarket}
            onClick={() => setSelectedGroup('group3')}
          />
        </div>

        <div className="flex gap-2">
          <button 
            className="flex-1 bg-blue-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
            onClick={() => setIsManageBrokersOpen(true)}
          >
            Manage Brokers
          </button>
          <button 
            className="flex-1 bg-zinc-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
            onClick={() => setIsCloseTradesOpen(true)}
          >
            Close All Trades
          </button>
        </div>
      </div>

      <EditGroupDialog 
        isOpen={selectedGroup !== null}
        onClose={() => setSelectedGroup(null)}
        groupId={selectedGroup}
      />

      <ManageBrokersDialog 
        isOpen={isManageBrokersOpen}
        onClose={() => setIsManageBrokersOpen(false)}
      />

      <CloseTradesDialog
        isOpen={isCloseTradesOpen}
        onClose={() => setIsCloseTradesOpen(false)}
      />
    </div>
  );
}