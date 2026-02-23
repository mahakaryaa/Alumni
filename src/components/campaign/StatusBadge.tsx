import React from 'react';
import { CampaignStatus } from '@/types/campaign';

interface StatusBadgeProps {
  status: CampaignStatus;
}

const statusColors: Record<CampaignStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-800',
  OPEN: 'bg-blue-100 text-blue-800',
  SELECTION: 'bg-yellow-100 text-yellow-800',
  VOTING: 'bg-purple-100 text-purple-800',
  ACTIVE: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-zinc-800 text-white',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${statusColors[status]}`}>
      {status}
    </span>
  );
};
