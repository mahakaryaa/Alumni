/**
 * Mock Admin Data (REVISED VERSION)
 * PIC = Project In Charge
 */

import type {
  AdminUser,
  Project,
  JoinRequest,
  ProjectMember,
  FinanceTransaction,
  ProgressUpdate,
  Poll,
  PICDashboardStats,
} from '@/types/admin-revised';

// ============================================
// DEMO ADMIN USERS
// ============================================

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'superadmin-1',
    name: 'Ahmad Zaki',
    email: 'ahmad.zaki@almaqdisi.org',
    role: 'superadmin',
    createdAt: '2024-01-15T08:00:00Z',
    lastLogin: '2025-01-30T09:30:00Z',
    status: 'active',
  },
  {
    id: 'moderator-1',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@almaqdisi.org',
    role: 'moderator',
    createdAt: '2024-02-01T08:00:00Z',
    lastLogin: '2025-01-29T14:20:00Z',
    status: 'active',
  },
  {
    id: 'moderator-2',
    name: 'Budi Santoso',
    email: 'budi.santoso@almaqdisi.org',
    role: 'moderator',
    createdAt: '2024-02-10T08:00:00Z',
    lastLogin: '2025-01-30T08:15:00Z',
    status: 'active',
  },
  {
    id: 'pic-1',
    name: 'Fatimah Az-Zahra',
    email: 'fatimah.azzahra@almaqdisi.org',
    role: 'pic',
    managedBy: 'moderator-1',
    projectId: 'project-1',
    createdAt: '2024-03-01T08:00:00Z',
    lastLogin: '2025-01-31T10:00:00Z',
    status: 'active',
  },
  {
    id: 'pic-2',
    name: 'Muhammad Ridwan',
    email: 'muhammad.ridwan@almaqdisi.org',
    role: 'pic',
    managedBy: 'moderator-1',
    projectId: 'project-2',
    createdAt: '2024-03-05T08:00:00Z',
    lastLogin: '2025-01-30T07:45:00Z',
    status: 'active',
  },
  {
    id: 'pic-3',
    name: 'Aminah Hasan',
    email: 'aminah.hasan@almaqdisi.org',
    role: 'pic',
    managedBy: 'moderator-2',
    projectId: 'project-3',
    createdAt: '2024-03-10T08:00:00Z',
    lastLogin: '2025-01-29T16:30:00Z',
    status: 'active',
  },
];

// ============================================
// DEMO PROJECTS
// ============================================

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Bantuan Pangan Gaza',
    slug: 'bantuan-pangan-gaza',
    category: 'kemanusiaan',
    hashtags: ['#BantuanKemanusiaan', '#Gaza', '#Palestina'],
    shortDescription: 'Mari bantu saudara kita di Gaza dengan menyalurkan paket sembako untuk 1000 keluarga yang membutuhkan!',
    fullDescription: `## Latar Belakang

Konflik di Gaza telah meninggalkan ribuan keluarga tanpa akses makanan yang memadai. Anak-anak, ibu hamil, dan lansia sangat membutuhkan bantuan pangan segera.

## Target Project

- 1000 paket sembako untuk keluarga Gaza
- Setiap paket berisi beras, minyak, gula, tepung, dan kebutuhan pokok
- Distribusi melalui mitra lokal terpercaya di Gaza

## Timeline

- Februari 2025: Pengumpulan dana
- Maret 2025: Pembelian & packaging
- April 2025: Distribusi ke Gaza`,
    bannerImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=600&fit=crop',
    picId: 'pic-1',
    targetMembers: 50,
    currentMembers: 25,
    targetDana: 20000000,
    danaUmum: 12500000,
    danaInternal: 3000000,
    status: 'running',
    startDate: '2025-02-01T00:00:00Z',
    endDate: '2025-04-30T23:59:59Z',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-31T14:30:00Z',
    moderatorId: 'moderator-1',
  },
  {
    id: 'project-2',
    title: 'Sekolah Online Anak Gaza',
    slug: 'sekolah-online-anak-gaza',
    category: 'pendidikan',
    hashtags: ['#PendidikanPalestina', '#GazaChildren', '#OnlineLearning'],
    shortDescription: 'Membantu anak-anak Gaza mendapatkan pendidikan berkualitas melalui platform pembelajaran online.',
    fullDescription: `## Tentang Project

Ribuan anak Gaza kehilangan akses pendidikan karena konflik. Project ini menyediakan platform pembelajaran online gratis dengan kurikulum yang sesuai.

## Target

- 500 anak Gaza mendapat akses pendidikan
- 20 pengajar volunteer
- Platform e-learning dengan materi Bahasa Arab, Matematika, Sains

## Timeline

- Februari-Maret: Rekrutmen pengajar
- April-Juni: Development platform
- Juli: Launch & onboarding`,
    bannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
    picId: 'pic-2',
    targetMembers: 30,
    currentMembers: 18,
    targetDana: 15000000,
    danaUmum: 8200000,
    danaInternal: 2160000,
    status: 'open_volunteer',
    startDate: '2025-02-15T00:00:00Z',
    endDate: '2025-07-31T23:59:59Z',
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-01-30T16:00:00Z',
    moderatorId: 'moderator-1',
  },
  {
    id: 'project-3',
    title: 'Air Bersih untuk Palestina',
    slug: 'air-bersih-palestina',
    category: 'lingkungan',
    hashtags: ['#CleanWater', '#Palestina', '#Humanitarian'],
    shortDescription: 'Menyediakan akses air bersih untuk 300 keluarga di Palestina melalui instalasi sumur dan filter air.',
    fullDescription: `## Masalah

Akses air bersih sangat terbatas di wilayah Palestina. Banyak keluarga harus berjalan jauh untuk mendapatkan air.

## Solusi

- Instalasi 10 sumur bor
- 300 filter air portabel
- Training maintenance untuk masyarakat lokal

## Timeline

- Maret: Survei lokasi
- April-Mei: Instalasi
- Juni: Training & monitoring`,
    bannerImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop',
    picId: 'pic-3',
    targetMembers: 40,
    currentMembers: 30,
    targetDana: 25000000,
    danaUmum: 18000000,
    danaInternal: 3600000,
    status: 'running',
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-06-30T23:59:59Z',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-31T09:00:00Z',
    moderatorId: 'moderator-2',
  },
];

// ============================================
// DEMO JOIN REQUESTS
// ============================================

export const mockJoinRequests: JoinRequest[] = [
  {
    id: 'req-1',
    projectId: 'project-1',
    alumniId: 'alumni-101',
    alumniName: 'Sarah Aminah',
    alumniEmail: 'sarah.aminah@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=1',
    alumniAngkatan: '2018',
    alumniJurusan: 'Teknik Informatika',
    alumniPekerjaan: 'UI/UX Designer',
    alumniPerusahaan: 'Tokopedia',
    alumniKota: 'Jakarta',
    commitment: '3_months',
    interestedPosition: 'Content Creator & Social Media Manager',
    reason: 'Saya ingin berkontribusi di bidang edukasi untuk anak-anak Gaza. Saya punya pengalaman dalam membuat konten edukatif dan siap membantu tim dalam merancang materi pembelajaran yang menarik. Saya berkomitmen penuh selama 3 bulan ke depan.',
    status: 'pending',
    submittedAt: '2025-01-29T14:30:00Z',
    previousProjects: [
      {
        projectName: 'Bantuan Air Bersih Gaza',
        duration: '6 bulan',
        rating: 5.0,
        completedTasks: 25,
      },
    ],
  },
  {
    id: 'req-2',
    projectId: 'project-1',
    alumniId: 'alumni-102',
    alumniName: 'Ahmad Zaki Maulana',
    alumniEmail: 'ahmad.zaki@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=12',
    alumniAngkatan: '2019',
    alumniJurusan: 'Manajemen',
    alumniPekerjaan: 'Marketing Manager',
    alumniPerusahaan: 'Bukalapak',
    alumniKota: 'Bandung',
    commitment: '6_months',
    interestedPosition: 'Fundraising & Campaign Coordinator',
    reason: 'Pengalaman saya di fundraising dan kampanye digital bisa membantu project ini mencapai target dana lebih cepat. Saya siap koordinasi dengan tim dan mitra untuk distribusi yang efektif.',
    status: 'pending',
    submittedAt: '2025-01-30T09:15:00Z',
    previousProjects: [],
  },
  {
    id: 'req-3',
    projectId: 'project-1',
    alumniId: 'alumni-103',
    alumniName: 'Dewi Sartika',
    alumniEmail: 'dewi.sartika@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=5',
    alumniAngkatan: '2017',
    alumniJurusan: 'Akuntansi',
    alumniPekerjaan: 'Financial Analyst',
    alumniPerusahaan: 'Bank Mandiri',
    alumniKota: 'Surabaya',
    commitment: '1_year',
    interestedPosition: 'Finance & Treasurer',
    reason: 'Saya ingin membantu mengelola keuangan project dengan transparan. Pengalaman saya di bidang finance bisa memastikan setiap rupiah donasi digunakan dengan optimal untuk membantu saudara-saudara kita di Gaza.',
    status: 'pending',
    submittedAt: '2025-01-31T08:00:00Z',
    previousProjects: [
      {
        projectName: 'Rehabilitasi Yatim Palestina',
        duration: '1 tahun',
        rating: 4.9,
        completedTasks: 45,
      },
    ],
  },
];

// ============================================
// DEMO PROJECT MEMBERS
// ============================================

export const mockProjectMembers: ProjectMember[] = [
  {
    id: 'member-1',
    projectId: 'project-1',
    alumniId: 'alumni-1',
    alumniName: 'Khadijah Mariam',
    alumniEmail: 'khadijah.mariam@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=10',
    alumniAngkatan: '2017',
    alumniJurusan: 'Komunikasi',
    alumniPekerjaan: 'Content Creator',
    commitment: '1_year',
    commitmentStartDate: '2024-12-10T00:00:00Z',
    commitmentEndDate: '2025-12-10T23:59:59Z',
    joinedAt: '2024-12-10T10:00:00Z',
    status: 'active',
    tasksCompleted: 30,
    discussionParticipation: 85,
    pollsVoted: 12,
    rating: 5.0,
    tags: ['content', 'social-media', 'active'],
  },
  {
    id: 'member-2',
    projectId: 'project-1',
    alumniId: 'alumni-2',
    alumniName: 'Abdullah Rahman',
    alumniEmail: 'abdullah.rahman@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=13',
    alumniAngkatan: '2016',
    alumniJurusan: 'Teknik Sipil',
    alumniPekerjaan: 'Project Manager',
    commitment: '6_months',
    commitmentStartDate: '2025-01-01T00:00:00Z',
    commitmentEndDate: '2025-07-01T23:59:59Z',
    joinedAt: '2025-01-01T10:00:00Z',
    status: 'active',
    tasksCompleted: 18,
    discussionParticipation: 62,
    pollsVoted: 9,
    rating: 4.7,
    tags: ['logistics', 'planning'],
  },
  {
    id: 'member-3',
    projectId: 'project-1',
    alumniId: 'alumni-3',
    alumniName: 'Siti Rahmawati',
    alumniEmail: 'siti.rahmawati@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=9',
    alumniAngkatan: '2019',
    alumniJurusan: 'Desain Komunikasi Visual',
    alumniPekerjaan: 'Graphic Designer',
    commitment: '3_months',
    commitmentStartDate: '2025-01-15T00:00:00Z',
    commitmentEndDate: '2025-04-15T23:59:59Z',
    joinedAt: '2025-01-15T10:00:00Z',
    status: 'active',
    tasksCompleted: 12,
    discussionParticipation: 45,
    pollsVoted: 6,
    rating: 4.8,
    tags: ['design', 'creative'],
  },
  {
    id: 'member-4',
    projectId: 'project-1',
    alumniId: 'alumni-4',
    alumniName: 'Rizky Firmansyah',
    alumniEmail: 'rizky.firmansyah@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=15',
    alumniAngkatan: '2018',
    alumniJurusan: 'Akuntansi',
    alumniPekerjaan: 'Finance Manager',
    commitment: '1_year',
    commitmentStartDate: '2024-11-01T00:00:00Z',
    commitmentEndDate: '2025-11-01T23:59:59Z',
    joinedAt: '2024-11-01T10:00:00Z',
    status: 'active',
    tasksCompleted: 42,
    discussionParticipation: 95,
    pollsVoted: 14,
    rating: 5.0,
    tags: ['finance', 'treasurer', 'active'],
  },
  {
    id: 'member-5',
    projectId: 'project-1',
    alumniId: 'alumni-5',
    alumniName: 'Nurul Hidayah',
    alumniEmail: 'nurul.hidayah@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=25',
    alumniAngkatan: '2017',
    alumniJurusan: 'Sastra Arab',
    alumniPekerjaan: 'Translator',
    commitment: '6_months',
    commitmentStartDate: '2024-12-01T00:00:00Z',
    commitmentEndDate: '2025-06-01T23:59:59Z',
    joinedAt: '2024-12-01T10:00:00Z',
    status: 'inactive',
    tasksCompleted: 8,
    discussionParticipation: 12,
    pollsVoted: 2,
    rating: 3.5,
    tags: ['translation', 'inactive'],
  },
  {
    id: 'member-6',
    projectId: 'project-1',
    alumniId: 'alumni-6',
    alumniName: 'Budi Hartono',
    alumniEmail: 'budi.hartono@gmail.com',
    alumniPhoto: 'https://i.pravatar.cc/150?img=11',
    alumniAngkatan: '2015',
    alumniJurusan: 'Ilmu Komunikasi',
    alumniPekerjaan: 'PR Specialist',
    commitment: '3_months',
    commitmentStartDate: '2024-10-01T00:00:00Z',
    commitmentEndDate: '2025-01-01T23:59:59Z',
    joinedAt: '2024-10-01T10:00:00Z',
    status: 'suspended',
    tasksCompleted: 3,
    discussionParticipation: 5,
    pollsVoted: 1,
    rating: 2.5,
    tags: ['suspended'],
    kickReason: 'Tidak aktif berkontribusi dan tidak responsif setelah beberapa kali reminder',
    kickedAt: '2024-12-15T10:00:00Z',
  },
];

// ============================================
// DEMO FINANCE TRANSACTIONS
// ============================================

export const mockFinanceTransactions: FinanceTransaction[] = [
  {
    id: 'tx-1',
    projectId: 'project-1',
    type: 'donation',
    amount: 500000,
    source: 'transfer_bank',
    donorName: 'Hamba Allah',
    description: 'Donasi untuk pembelian sembako batch 5',
    date: '2025-01-31T10:30:00Z',
    proofUrl: '/uploads/proof-tx-1.jpg',
    notes: 'Transfer via BCA',
    createdBy: 'pic-1',
    createdAt: '2025-01-31T10:35:00Z',
  },
  {
    id: 'tx-2',
    projectId: 'project-1',
    type: 'donation',
    amount: 3000000,
    source: 'member_payment',
    memberName: 'Batch 1 - 25 members',
    description: 'Iuran member batch pertama @ Rp 120,000',
    date: '2025-02-02T00:00:00Z',
    createdBy: 'pic-1',
    createdAt: '2025-02-02T09:00:00Z',
  },
  {
    id: 'tx-3',
    projectId: 'project-1',
    type: 'expense',
    amount: 5000000,
    category: 'distribution',
    description: 'Pembelian sembako 100 paket (beras, minyak, gula, tepung)',
    date: '2025-02-04T00:00:00Z',
    proofUrl: '/uploads/nota-sembako.jpg',
    notes: 'Dibeli dari Toko Sembako Al-Hidayah',
    createdBy: 'pic-1',
    createdAt: '2025-02-04T15:00:00Z',
  },
  {
    id: 'tx-4',
    projectId: 'project-1',
    type: 'expense',
    amount: 1500000,
    category: 'operational',
    description: 'Biaya logistik pengiriman ke warehouse Gaza',
    date: '2025-02-01T00:00:00Z',
    proofUrl: '/uploads/invoice-logistik.pdf',
    createdBy: 'pic-1',
    createdAt: '2025-02-01T11:00:00Z',
  },
  {
    id: 'tx-5',
    projectId: 'project-1',
    type: 'donation',
    amount: 1500000,
    source: 'donasi_online',
    donorName: 'Anonim',
    description: 'Donasi melalui website',
    date: '2025-01-28T15:00:00Z',
    createdBy: 'pic-1',
    createdAt: '2025-01-28T15:10:00Z',
  },
  {
    id: 'tx-6',
    projectId: 'project-1',
    type: 'expense',
    amount: 750000,
    category: 'marketing',
    description: 'Biaya promosi social media ads',
    date: '2025-01-25T00:00:00Z',
    createdBy: 'pic-1',
    createdAt: '2025-01-25T14:00:00Z',
  },
];

// ============================================
// DEMO POLLS
// ============================================

export const mockPolls: Poll[] = [
  {
    id: 'poll-1',
    projectId: 'project-1',
    title: 'Waktu terbaik untuk meeting rutin?',
    description: 'Kita mau atur jadwal meeting rutin tim. Pilih waktu yang paling cocok untuk kalian semua ya!',
    type: 'single_choice',
    options: [
      { id: 'opt-1', text: 'Sabtu pagi (08.00-10.00)', votes: 10, voters: [] },
      { id: 'opt-2', text: 'Sabtu sore (14.00-16.00)', votes: 12, voters: [] },
      { id: 'opt-3', text: 'Minggu pagi (08.00-10.00)', votes: 2, voters: [] },
    ],
    deadline: '2025-02-10T23:59:59Z',
    status: 'active',
    isAnonymous: true,
    showRealtimeResults: true,
    isRequired: false,
    createdBy: 'pic-1',
    createdAt: '2025-02-05T10:00:00Z',
    totalVotes: 24,
    participationRate: 80, // 20/25 members
  },
  {
    id: 'poll-2',
    projectId: 'project-1',
    title: 'Apakah setuju dengan sistem shift packaging?',
    type: 'single_choice',
    options: [
      { id: 'opt-4', text: 'Sangat Setuju', votes: 15, voters: [] },
      { id: 'opt-5', text: 'Setuju', votes: 8, voters: [] },
      { id: 'opt-6', text: 'Kurang Setuju', votes: 2, voters: [] },
      { id: 'opt-7', text: 'Tidak Setuju', votes: 0, voters: [] },
    ],
    deadline: '2025-02-01T23:59:59Z',
    status: 'closed',
    isAnonymous: false,
    showRealtimeResults: true,
    isRequired: false,
    createdBy: 'pic-1',
    createdAt: '2025-01-28T10:00:00Z',
    closedAt: '2025-02-01T23:59:59Z',
    totalVotes: 25,
    participationRate: 100,
  },
];

// ============================================
// DEMO PROGRESS UPDATES
// ============================================

export const mockProgressUpdates: ProgressUpdate[] = [
  {
    id: 'update-1',
    projectId: 'project-1',
    type: 'milestone',
    title: '🎉 Milestone Tercapai: 75% Progress!',
    content: `Alhamdulillah tim, kita sudah berhasil mengumpulkan 750 paket sembako dari target 1000 paket. Terima kasih atas dedikasi seluruh member dan donatur yang sudah berkontribusi!

**Update selanjutnya:**
- Minggu ini: packaging 250 paket lagi
- Minggu depan: koordinasi distribusi dengan mitra lokal

Jazakumullah khairan!`,
    mediaUrls: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800'],
    createdBy: 'pic-1',
    createdAt: '2025-02-05T14:00:00Z',
    notifyMembers: true,
    commentsCount: 12,
    likesCount: 45,
  },
  {
    id: 'update-2',
    projectId: 'project-1',
    type: 'meeting_reminder',
    title: '📢 Meeting Rutin Tim - Sabtu, 3 Feb 2025',
    content: `Assalamu'alaikum Tim!

Reminder untuk meeting rutin kita:
📅 **Sabtu, 3 Februari 2025**
🕐 **14.00 - 16.00 WIB**
📍 **Zoom Meeting** (link di grup WA)

**Agenda:**
1. Review progress bulan Januari
2. Planning distribusi Maret
3. Koordinasi dengan mitra Gaza

Mohon hadir ya! Jazakumullah khairan.

- PIC Fatimah`,
    createdBy: 'pic-1',
    createdAt: '2025-02-01T10:00:00Z',
    notifyMembers: true,
    commentsCount: 8,
    likesCount: 30,
  },
];

// ============================================
// DEMO DASHBOARD STATS
// ============================================

export const mockPICDashboardStats: PICDashboardStats = {
  projectId: 'project-1',
  projectTitle: 'Bantuan Pangan Gaza',
  projectStatus: 'running',
  // Members
  currentMembers: 25,
  targetMembers: 50,
  memberPercentage: 50,
  pendingRequests: 3,
  // Finance
  danaUmum: 12500000,
  danaInternal: 3000000,
  totalDana: 15500000,
  targetDana: 20000000,
  danaPercentage: 78,
  danaUsed: 8200000,
  danaRemaining: 7300000,
  // Engagement
  discussionMessages: 47,
  activePolls: 1,
  pollParticipation: 80,
  // Progress
  progressPercentage: 75,
  milestonesCompleted: 3,
  totalMilestones: 4,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProjectByPIC(picId: string): Project | undefined {
  return mockProjects.find(p => p.picId === picId);
}

export function getJoinRequestsByProject(projectId: string, status?: 'pending' | 'approved' | 'rejected') {
  let requests = mockJoinRequests.filter(r => r.projectId === projectId);
  if (status) {
    requests = requests.filter(r => r.status === status);
  }
  return requests;
}

export function getMembersByProject(projectId: string) {
  return mockProjectMembers.filter(m => m.projectId === projectId && m.status === 'active');
}

export function getTransactionsByProject(projectId: string) {
  return mockFinanceTransactions.filter(t => t.projectId === projectId);
}

export function getPollsByProject(projectId: string, status?: 'draft' | 'active' | 'closed') {
  let polls = mockPolls.filter(p => p.projectId === projectId);
  if (status) {
    polls = polls.filter(p => p.status === status);
  }
  return polls;
}

export function getUpdatesByProject(projectId: string) {
  return mockProgressUpdates.filter(u => u.projectId === projectId);
}

export function getProjectMembers(projectId: string): ProjectMember[] {
  return mockProjectMembers.filter(m => m.projectId === projectId);
}

export function getProjectFinanceTransactions(projectId: string): FinanceTransaction[] {
  // Sort by date descending
  return mockFinanceTransactions
    .filter(t => t.projectId === projectId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectUpdates(projectId: string): ProgressUpdate[] {
  // Sort by created date descending
  return mockProgressUpdates
    .filter(u => u.projectId === projectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Calculate dynamic stats
export function calculateDashboardStats(projectId: string): PICDashboardStats {
  const project = mockProjects.find(p => p.id === projectId);
  if (!project) throw new Error('Project not found');

  const members = getMembersByProject(projectId);
  const requests = getJoinRequestsByProject(projectId, 'pending');
  const transactions = getTransactionsByProject(projectId);
  const polls = getPollsByProject(projectId, 'active');

  const totalDana = project.danaUmum + project.danaInternal;
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    projectId: project.id,
    projectTitle: project.title,
    projectStatus: project.status,
    currentMembers: members.length,
    targetMembers: project.targetMembers,
    memberPercentage: Math.round((members.length / project.targetMembers) * 100),
    pendingRequests: requests.length,
    danaUmum: project.danaUmum,
    danaInternal: project.danaInternal,
    totalDana: totalDana,
    targetDana: project.targetDana,
    danaPercentage: Math.round((totalDana / project.targetDana) * 100),
    danaUsed: expenses,
    danaRemaining: totalDana - expenses,
    discussionMessages: 47, // Mock
    activePolls: polls.length,
    pollParticipation: polls[0]?.participationRate || 0,
    progressPercentage: 75, // Mock - should calculate from milestones
    milestonesCompleted: 3,
    totalMilestones: 4,
  };
}