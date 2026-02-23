import React, { useState } from 'react';
import { Campaign, Position, CampaignStatus } from '@/types/campaign';
import { useCampaign } from '@/context/CampaignContext';
import { StatusBadge } from './StatusBadge';
import { User, CheckCircle, XCircle, Clock, Calendar, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface CampaignDetailProps {
  campaignId: string;
  userRole: 'admin' | 'alumni' | 'pic' | null; // Adapting to app roles
  currentUserId: string; // From App
  onBack: () => void;
}

export const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaignId, userRole, currentUserId, onBack }) => {
  const { campaigns, updateCampaignStatus, applyForPosition, reviewApplication, voteForCandidate, hasUserApplied } = useCampaign();
  const campaign = campaigns.find(c => c.id === campaignId);

  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [motivation, setMotivation] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  if (!campaign) return <div>Campaign not found</div>;

  const isAdmin = userRole === 'admin' || userRole === 'pic'; // Assuming PIC has admin rights for their campaign or generic admin
  const isAlumni = userRole === 'alumni';

  const handleStatusChange = (newStatus: CampaignStatus) => {
    if (confirm(`Are you sure you want to change status to ${newStatus}?`)) {
      updateCampaignStatus(campaignId, newStatus);
    }
  };

  const handleApply = () => {
    if (!selectedPosition) return;
    applyForPosition(campaignId, selectedPosition.id, currentUserId, 'Current User', motivation); // Mock user name
    setIsApplyModalOpen(false);
    setMotivation('');
    setSelectedPosition(null);
  };

  const hasApplied = hasUserApplied(campaignId, currentUserId);

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30 px-4 py-4 md:px-8 shadow-sm flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-[#61728F] hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#0E1B33] truncate">Detail Campaign</h1>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
        {/* Campaign Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
                <StatusBadge status={campaign.status} />
              </div>
              <p className="text-gray-500">{campaign.shortDescription}</p>
            </div>
            
            {isAdmin && (
              <div className="flex gap-2">
                {campaign.status === 'DRAFT' && (
                  <button 
                    onClick={() => handleStatusChange('OPEN')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Publish Campaign
                  </button>
                )}
                {campaign.status === 'OPEN' && (
                  <button 
                    onClick={() => handleStatusChange('SELECTION')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600"
                  >
                    Start Selection
                  </button>
                )}
                {campaign.status === 'SELECTION' && campaign.votingEnabled && (
                  <button 
                    onClick={() => handleStatusChange('VOTING')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
                  >
                    Start Voting
                  </button>
                )}
                {campaign.status === 'VOTING' && (
                  <button 
                    onClick={() => handleStatusChange('ACTIVE')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                  >
                    Activate Team
                  </button>
                )}
                {campaign.status === 'ACTIVE' && (
                  <button 
                    onClick={() => handleStatusChange('COMPLETED')}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
                  >
                    Close Project
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 mt-6 border-t pt-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-emerald-500" />
              <span>Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-red-500" />
              <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              <span>{campaign.positions.reduce((acc, p) => acc + p.quota, 0)} Total Positions</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold mb-4">Description</h3>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {campaign.description}
              </div>
            </div>

            {/* Positions & Applicants */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold mb-4">Open Positions</h3>
              <div className="space-y-4">
                {campaign.positions.map((pos) => {
                  const isFull = pos.filled >= pos.quota;
                  const canApply = campaign.status === 'OPEN' && !hasApplied && !isFull && isAlumni;
                  
                  return (
                    <div key={pos.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900">{pos.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {pos.filled} / {pos.quota} Filled
                        </span>
                      </div>
                      
                      {canApply && (
                        <button 
                          onClick={() => { setSelectedPosition(pos); setIsApplyModalOpen(true); }}
                          className="mt-2 text-sm bg-emerald-600 text-white px-3 py-1.5 rounded hover:bg-emerald-700"
                        >
                          Apply for Position
                        </button>
                      )}

                      {/* Admin View: Applicants for this position */}
                      {isAdmin && (
                        <div className="mt-4 border-t pt-2">
                          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Applicants</h5>
                          <div className="space-y-2">
                            {campaign.applications.filter(app => app.positionId === pos.id).length === 0 ? (
                              <p className="text-sm text-gray-400 italic">No applicants yet.</p>
                            ) : (
                              campaign.applications.filter(app => app.positionId === pos.id).map(app => (
                                <div key={app.id} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                                  <div>
                                    <span className="font-medium">{app.userName}</span>
                                    <div className="text-xs text-gray-500">{app.motivation}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {app.status === 'PENDING' && (
                                      <>
                                        <button 
                                          onClick={() => reviewApplication(app.id, 'APPROVED')}
                                          className="text-green-600 hover:bg-green-100 p-1 rounded"
                                          title="Approve"
                                        >
                                          <CheckCircle size={16} />
                                        </button>
                                        <button 
                                          onClick={() => reviewApplication(app.id, 'REJECTED')}
                                          className="text-red-600 hover:bg-red-100 p-1 rounded"
                                          title="Reject"
                                        >
                                          <XCircle size={16} />
                                        </button>
                                      </>
                                    )}
                                    {app.status === 'APPROVED' && <span className="text-green-600 text-xs font-bold">Approved</span>}
                                    {app.status === 'REJECTED' && <span className="text-red-600 text-xs font-bold">Rejected</span>}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Timeline</h3>
               <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {['DRAFT', 'OPEN', 'SELECTION', 'VOTING', 'ACTIVE', 'COMPLETED'].map((step, index) => {
                    const isActive = campaign.status === step;
                    const isPast = ['DRAFT', 'OPEN', 'SELECTION', 'VOTING', 'ACTIVE', 'COMPLETED'].indexOf(campaign.status) > index;
                    
                    return (
                      <div key={step} className="relative pl-8 flex items-center">
                        <div className={`absolute left-0 w-4 h-4 rounded-full border-2 ${isActive || isPast ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}></div>
                        <span className={`text-sm ${isActive ? 'font-bold text-emerald-600' : 'text-gray-500'}`}>{step}</span>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Voting Widget (Only visible in VOTING state) */}
            {campaign.status === 'VOTING' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold mb-4">Vote for PIC</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select the team leader from the approved candidates.
                </p>
                
                <div className="space-y-3">
                  {/* Find approved candidates who applied for a leadership role? Or simplify to all approved? 
                      Simplifying to: Approved applicants are candidates. */}
                  {campaign.applications.filter(a => a.status === 'APPROVED').map(candidate => {
                     const votes = campaign.votes.filter(v => v.candidateId === candidate.userId).length;
                     // Assuming currentUserId hasn't voted
                     const canVote = !campaign.votes.some(v => v.voterId === currentUserId) && isAlumni;

                     return (
                       <div key={candidate.userId} className="border rounded p-3">
                         <div className="flex justify-between mb-1">
                           <span className="font-medium">{candidate.userName}</span>
                           <span className="text-sm font-bold">{votes} Votes</span>
                         </div>
                         {canVote && (
                           <button 
                             onClick={() => voteForCandidate(campaignId, candidate.userId, currentUserId)}
                             className="w-full mt-2 bg-purple-600 text-white text-xs py-1.5 rounded hover:bg-purple-700"
                           >
                             Vote
                           </button>
                         )}
                       </div>
                     );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && selectedPosition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-2">Apply for {selectedPosition.title}</h3>
            <p className="text-gray-600 text-sm mb-4">Why are you a good fit for this role?</p>
            
            <textarea 
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="w-full border rounded-md p-3 mb-4 h-32 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Tell us about your experience..."
            />
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                disabled={!motivation.trim()}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};