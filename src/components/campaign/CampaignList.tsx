import React, { useState } from 'react';
import { useCampaign } from '@/context/CampaignContext';
import { CampaignCard } from './CampaignCard';
import { CampaignDetail } from './CampaignDetail';
import { Search, MapPin, Calendar, LayoutGrid, ArrowLeft } from 'lucide-react';
import { CampaignStatus } from '@/types/campaign';

interface CampaignListProps {
  currentUserId: string;
  onBack?: () => void;
  onCampaignClick?: (id: string) => void;
  embedded?: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({ currentUserId, onBack, onCampaignClick, embedded = false }) => {
  const { campaigns } = useCampaign();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'VOTING' | 'ACTIVE' | 'COMPLETED'>('ALL'); // Fixed type definition

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Only show "public" status for alumni if no specific filter
    // Or if filter is set, obey filter. But Alumni shouldn't see DRAFT.
    if (c.status === 'DRAFT') return false;

    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && c.status === statusFilter;
  });

  return (
    <div className={`bg-[#F8F9FA] pb-24 md:pb-10 ${embedded ? 'min-h-[500px]' : ''}`}>
      {/* Header - Only show if not embedded */}
      {!embedded && (
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30 px-4 py-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             {onBack && (
              <button 
                onClick={onBack} 
                className="p-2 -ml-2 text-[#61728F] hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#0E1B33]">Campaigns</h1>
              <p className="text-sm text-[#61728F] hidden md:block">Temukan dan dukung kampanye kebaikan</p>
            </div>
          </div>
        </div>
      </header>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E5E7EB] flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919EB2]" size={20} />
            <input 
              type="text" 
              placeholder="Cari campaign..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-[#D6DCE8] rounded-xl focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] outline-none text-[#0E1B33] placeholder-[#919EB2] transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
             {(['ALL', 'OPEN', 'VOTING', 'ACTIVE', 'COMPLETED'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                    statusFilter === status 
                      ? 'bg-[#243D68] text-white border-[#243D68] shadow-md' 
                      : 'bg-white text-[#61728F] border-[#D6DCE8] hover:bg-[#F8F9FA] hover:text-[#243D68]'
                  }`}
                >
                  {status === 'ALL' ? 'Semua' : status === 'OPEN' ? 'Open' : status === 'VOTING' ? 'Voting' : status === 'ACTIVE' ? 'Aktif' : 'Selesai'}
                </button>
             ))}
          </div>
        </div>

        {/* Grid */}
        {filteredCampaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-[#D6DCE8]">
            <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
              <LayoutGrid className="text-[#919EB2] w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0E1B33]">Belum ada campaign</h3>
            <p className="text-[#61728F]">Coba ubah kata kunci pencarian atau filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onClick={() => onCampaignClick ? onCampaignClick(campaign.id) : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
