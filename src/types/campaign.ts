export type CampaignStatus = 'DRAFT' | 'OPEN' | 'SELECTION' | 'VOTING' | 'ACTIVE' | 'COMPLETED';

export interface Position {
  id: string;
  title: string;
  quota: number;
  filled: number;
  applicants: string[]; // User IDs
}

export interface CampaignApplication {
  id: string;
  campaignId: string;
  positionId: string;
  userId: string;
  userName: string; // Denormalized for display
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedAt: string;
  motivation?: string;
}

export interface CampaignVote {
  id: string;
  campaignId: string;
  voterId: string;
  candidateId: string; // The applicant ID being voted for
  timestamp: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  deadline: string;
  positions: Position[];
  votingEnabled: boolean;
  applications: CampaignApplication[];
  votes: CampaignVote[];
  createdAt: string;
  updatedAt: string;
}

export interface CampaignStats {
  totalApplicants: number;
  totalPositions: number;
  filledRate: number; // percentage
  daysRemaining: number;
}
