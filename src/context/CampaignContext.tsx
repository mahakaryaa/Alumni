import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Campaign, CampaignStatus, CampaignApplication, CampaignVote, Position } from '@/types/campaign';
import { toast } from 'sonner';

interface CampaignContextType {
  campaigns: Campaign[];
  loading: boolean;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'applications' | 'votes'>) => void;
  updateCampaignStatus: (campaignId: string, newStatus: CampaignStatus) => void;
  applyForPosition: (campaignId: string, positionId: string, userId: string, userName: string, motivation: string) => void;
  reviewApplication: (applicationId: string, status: 'APPROVED' | 'REJECTED') => void;
  voteForCandidate: (campaignId: string, candidateId: string, voterId: string) => void;
  getCampaignStats: (campaignId: string) => any;
  hasUserApplied: (campaignId: string, userId: string) => boolean;
  hasUserVoted: (campaignId: string, userId: string) => boolean;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Mock Data
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Gaza Rehabilitation Program 2026',
    description: 'Program rehabilitasi pasca konflik untuk wilayah Gaza Utara. Membutuhkan tim medis dan logistik.',
    shortDescription: 'Program rehabilitasi pasca konflik untuk wilayah Gaza Utara.',
    status: 'OPEN',
    startDate: '2026-03-01',
    endDate: '2026-06-01',
    deadline: '2026-02-28',
    votingEnabled: true,
    positions: [
      { id: 'pos-1', title: 'Medical Lead', quota: 1, filled: 0, applicants: [] },
      { id: 'pos-2', title: 'Logistics Coordinator', quota: 2, filled: 1, applicants: ['user-2'] }
    ],
    applications: [
      { 
        id: 'app-1', 
        campaignId: 'camp-1', 
        positionId: 'pos-2', 
        userId: 'user-2', 
        userName: 'Ahmad Fulan', 
        status: 'APPROVED', 
        appliedAt: '2026-02-15T10:00:00Z',
        motivation: 'Saya berpengalaman di bidang logistik selama 5 tahun.'
      }
    ],
    votes: [],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z'
  }
];

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [loading, setLoading] = useState(false);

  // Persistence (mock)
  useEffect(() => {
    const saved = localStorage.getItem('almaqdisi_campaigns');
    if (saved) {
      try {
        setCampaigns(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse campaigns", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('almaqdisi_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const createCampaign = (data: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt' | 'applications' | 'votes'>) => {
    const newCampaign: Campaign = {
      ...data,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applications: [],
      votes: [],
      status: 'DRAFT' // Always start as Draft
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    toast.success('Campaign created successfully');
  };

  const updateCampaignStatus = (campaignId: string, newStatus: CampaignStatus) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id !== campaignId) return c;

      // Status Transition Logic
      const current = c.status;
      let allowed = false;

      if (current === 'DRAFT' && newStatus === 'OPEN') allowed = true;
      else if (current === 'OPEN' && newStatus === 'SELECTION') allowed = true;
      else if (current === 'SELECTION' && newStatus === 'VOTING') allowed = true;
      else if (current === 'VOTING' && newStatus === 'ACTIVE') allowed = true;
      else if (current === 'ACTIVE' && newStatus === 'COMPLETED') allowed = true;
      
      // Allow moving back to Draft from Open if needed
      if (current === 'OPEN' && newStatus === 'DRAFT') allowed = true;

      if (!allowed) {
        toast.error(`Invalid status transition from ${current} to ${newStatus}`);
        return c;
      }

      toast.success(`Campaign status updated to ${newStatus}`);
      return { ...c, status: newStatus, updatedAt: new Date().toISOString() };
    }));
  };

  const applyForPosition = (campaignId: string, positionId: string, userId: string, userName: string, motivation: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id !== campaignId) return c;

      // Anti-loop: Check if already applied
      if (c.applications.some(a => a.userId === userId)) {
        toast.error("You have already applied to this campaign.");
        return c;
      }

      // Check quota (optimistic check, though redundant if UI disables it)
      const position = c.positions.find(p => p.id === positionId);
      if (!position) return c;
      if (position.filled >= position.quota) {
        toast.error("Position quota is full.");
        return c;
      }

      const newApp: CampaignApplication = {
        id: `app-${Date.now()}`,
        campaignId,
        positionId,
        userId,
        userName,
        status: 'PENDING',
        appliedAt: new Date().toISOString(),
        motivation
      };

      toast.success("Application submitted successfully!");
      return {
        ...c,
        applications: [...c.applications, newApp]
      };
    }));
  };

  const reviewApplication = (applicationId: string, status: 'APPROVED' | 'REJECTED') => {
    setCampaigns(prev => prev.map(c => {
      const appIndex = c.applications.findIndex(a => a.id === applicationId);
      if (appIndex === -1) return c;

      const updatedApps = [...c.applications];
      const app = updatedApps[appIndex];
      
      // If approving, increment filled count for position
      let updatedPositions = c.positions;
      if (status === 'APPROVED' && app.status !== 'APPROVED') {
         updatedPositions = c.positions.map(p => {
           if (p.id === app.positionId) {
             return { ...p, filled: p.filled + 1, applicants: [...p.applicants, app.userId] };
           }
           return p;
         });
      }

      updatedApps[appIndex] = { ...app, status };

      return {
        ...c,
        applications: updatedApps,
        positions: updatedPositions,
        updatedAt: new Date().toISOString()
      };
    }));
    toast.success(`Application ${status.toLowerCase()}`);
  };

  const voteForCandidate = (campaignId: string, candidateId: string, voterId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id !== campaignId) return c;

      if (c.status !== 'VOTING') {
        toast.error("Voting is not active for this campaign.");
        return c;
      }

      if (c.votes.some(v => v.voterId === voterId)) {
        toast.error("You have already voted.");
        return c;
      }

      const newVote: CampaignVote = {
        id: `vote-${Date.now()}`,
        campaignId,
        candidateId,
        voterId,
        timestamp: new Date().toISOString()
      };

      toast.success("Vote recorded!");
      return {
        ...c,
        votes: [...c.votes, newVote]
      };
    }));
  };

  const getCampaignStats = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return null;

    const totalApplicants = campaign.applications.length;
    const totalPositions = campaign.positions.reduce((acc, p) => acc + p.quota, 0);
    const filledPositions = campaign.positions.reduce((acc, p) => acc + p.filled, 0);
    
    return {
      totalApplicants,
      totalPositions,
      filledRate: totalPositions > 0 ? (filledPositions / totalPositions) * 100 : 0,
      daysRemaining: Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    };
  };

  const hasUserApplied = (campaignId: string, userId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign ? campaign.applications.some(a => a.userId === userId) : false;
  };

  const hasUserVoted = (campaignId: string, userId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    return campaign ? campaign.votes.some(v => v.voterId === userId) : false;
  };

  return (
    <CampaignContext.Provider value={{
      campaigns,
      loading,
      createCampaign,
      updateCampaignStatus,
      applyForPosition,
      reviewApplication,
      voteForCandidate,
      getCampaignStats,
      hasUserApplied,
      hasUserVoted
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
