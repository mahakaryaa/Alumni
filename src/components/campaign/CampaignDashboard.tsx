import React, { useState } from 'react';
import { useCampaign } from '@/context/CampaignContext';
import { CampaignCard } from './CampaignCard';
import { CreateCampaignForm } from './CreateCampaignForm';
import { CampaignDetail } from './CampaignDetail';
import { Plus, LayoutGrid, ListFilter } from 'lucide-react';
import { CampaignStatus } from '@/types/campaign';

interface CampaignDashboardProps {
  currentUserId: string;
}

export const CampaignDashboard: React.FC<CampaignDashboardProps> = ({ currentUserId }) => {
  const { campaigns } = useCampaign();
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'ALL'>('ALL');

  const filteredCampaigns = campaigns.filter(c => 
    statusFilter === 'ALL' ? true : c.status === statusFilter
  );

  const handleCreateSuccess = () => {
    setView('list');
  };

  const handleCampaignClick = (id: string) => {
    setSelectedCampaignId(id);
    setView('detail');
  };

  if (view === 'create') {
    return <CreateCampaignForm onSuccess={handleCreateSuccess} onCancel={() => setView('list')} />;
  }

  if (view === 'detail' && selectedCampaignId) {
    return (
      <CampaignDetail 
        campaignId={selectedCampaignId} 
        userRole="admin" 
        currentUserId={currentUserId}
        onBack={() => { setSelectedCampaignId(null); setView('list'); }}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-500 text-sm">Manage volunteer projects and selection process.</p>
        </div>
        <button 
          onClick={() => setView('create')}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Stats Summary Widget */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">Total Campaigns</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{campaigns.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">Active</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">{campaigns.filter(c => c.status === 'ACTIVE').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">Pending Review</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {campaigns.reduce((acc, c) => acc + c.applications.filter(a => a.status === 'PENDING').length, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">Total Applicants</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {campaigns.reduce((acc, c) => acc + c.applications.length, 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ListFilter size={16} />
          <span>Filter Status:</span>
        </div>
        {(['ALL', 'DRAFT', 'OPEN', 'SELECTION', 'VOTING', 'ACTIVE', 'COMPLETED'] as const).map(status => (
           <button
             key={status}
             onClick={() => setStatusFilter(status)}
             className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
               statusFilter === status 
                 ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-500' 
                 : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
             }`}
           >
             {status}
           </button>
        ))}
      </div>

      {/* List */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <LayoutGrid className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or create a new campaign.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign} 
              onClick={() => handleCampaignClick(campaign.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
