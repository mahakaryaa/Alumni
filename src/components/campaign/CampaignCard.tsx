import React from 'react';
import { Campaign } from '@/types/campaign';
import { StatusBadge } from './StatusBadge';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  const totalPositions = campaign.positions.reduce((acc, p) => acc + p.quota, 0);
  const filledPositions = campaign.positions.reduce((acc, p) => acc + p.filled, 0);
  const progress = totalPositions > 0 ? (filledPositions / totalPositions) * 100 : 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <StatusBadge status={campaign.status} />
          <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
            Due {format(new Date(campaign.deadline), 'MMM d, yyyy')}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {campaign.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {campaign.shortDescription}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{filledPositions}/{totalPositions} Filled</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{format(new Date(campaign.startDate), 'MMM d')} - {format(new Date(campaign.endDate), 'MMM d, yyyy')}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
          <div 
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 py-2 rounded-lg group-hover:bg-emerald-100 transition-colors">
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
