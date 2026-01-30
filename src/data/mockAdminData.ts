/**
 * Mock Data for Admin Panel Development
 */

import { AdminUser, Alumni, ActivityLog, DashboardStats } from '@/types/admin';

// Mock Admin Users
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
    createdAt: '2024-03-01T08:00:00Z',
    lastLogin: '2025-01-30T10:00:00Z',
    status: 'active',
  },
  {
    id: 'pic-2',
    name: 'Muhammad Ridwan',
    email: 'muhammad.ridwan@almaqdisi.org',
    role: 'pic',
    managedBy: 'moderator-1',
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
    createdAt: '2024-03-10T08:00:00Z',
    lastLogin: '2025-01-29T16:30:00Z',
    status: 'active',
  },
  {
    id: 'pic-4',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@almaqdisi.org',
    role: 'pic',
    managedBy: 'moderator-2',
    createdAt: '2024-03-15T08:00:00Z',
    lastLogin: '2025-01-30T06:00:00Z',
    status: 'active',
  },
];

// Mock Alumni Data
export const mockAlumni: Alumni[] = [
  {
    id: 'alumni-1',
    name: 'Abdullah Rahman',
    email: 'abdullah.rahman@gmail.com',
    phone: '081234567890',
    angkatan: '2015',
    jurusan: 'Teknik Informatika',
    pekerjaan: 'Software Engineer',
    perusahaan: 'Tech Solutions Indonesia',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    notes: 'Aktif dalam kegiatan volunteer Gaza',
    picId: 'pic-1',
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
    status: 'active',
    tags: ['tech', 'volunteer'],
  },
  {
    id: 'alumni-2',
    name: 'Khadijah Mariam',
    email: 'khadijah.mariam@gmail.com',
    phone: '081298765432',
    angkatan: '2016',
    jurusan: 'Manajemen',
    pekerjaan: 'Project Manager',
    perusahaan: 'Digital Startup Co',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    notes: 'Koordinator program pendidikan anak Palestina',
    picId: 'pic-1',
    createdAt: '2024-04-05T10:00:00Z',
    updatedAt: '2025-01-20T09:15:00Z',
    status: 'active',
    tags: ['education', 'coordinator'],
  },
  {
    id: 'alumni-3',
    name: 'Yusuf Ibrahim',
    email: 'yusuf.ibrahim@gmail.com',
    phone: '081311223344',
    angkatan: '2015',
    jurusan: 'Arsitektur',
    pekerjaan: 'Arsitek',
    perusahaan: 'Studio Kreatif',
    kota: 'Yogyakarta',
    provinsi: 'DI Yogyakarta',
    notes: 'Terlibat dalam proyek rekonstruksi sekolah Gaza',
    picId: 'pic-2',
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2025-01-18T11:45:00Z',
    status: 'active',
    tags: ['architecture', 'reconstruction'],
  },
  {
    id: 'alumni-4',
    name: 'Zahra Aisha',
    email: 'zahra.aisha@gmail.com',
    phone: '081455667788',
    angkatan: '2017',
    jurusan: 'Kedokteran',
    pekerjaan: 'Dokter Umum',
    perusahaan: 'RS. Al-Maqdis',
    kota: 'Surabaya',
    provinsi: 'Jawa Timur',
    notes: 'Relawan medis untuk Gaza',
    picId: 'pic-2',
    createdAt: '2024-04-15T10:00:00Z',
    updatedAt: '2025-01-22T16:20:00Z',
    status: 'active',
    tags: ['medical', 'volunteer'],
  },
  {
    id: 'alumni-5',
    name: 'Hassan Malik',
    email: 'hassan.malik@gmail.com',
    phone: '081566778899',
    angkatan: '2016',
    jurusan: 'Komunikasi',
    pekerjaan: 'Content Creator',
    perusahaan: 'Media Palestina ID',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    notes: 'Aktif membuat konten edukasi Palestina',
    picId: 'pic-3',
    createdAt: '2024-04-20T10:00:00Z',
    updatedAt: '2025-01-25T13:10:00Z',
    status: 'active',
    tags: ['media', 'content'],
  },
  {
    id: 'alumni-6',
    name: 'Layla Nur',
    email: 'layla.nur@gmail.com',
    phone: '081677889900',
    angkatan: '2018',
    jurusan: 'Psikologi',
    pekerjaan: 'Psikolog',
    perusahaan: 'Klinik Harapan',
    kota: 'Semarang',
    provinsi: 'Jawa Tengah',
    notes: 'Konselor untuk anak-anak korban konflik',
    picId: 'pic-3',
    createdAt: '2024-04-25T10:00:00Z',
    updatedAt: '2025-01-28T08:30:00Z',
    status: 'active',
    tags: ['psychology', 'counselor'],
  },
  {
    id: 'alumni-7',
    name: 'Ibrahim Faisal',
    email: 'ibrahim.faisal@gmail.com',
    phone: '081788990011',
    angkatan: '2017',
    jurusan: 'Hukum',
    pekerjaan: 'Advokat',
    perusahaan: 'LBH Keadilan',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    notes: 'Advokasi hukum untuk kemanusiaan Palestina',
    picId: 'pic-4',
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2025-01-26T15:45:00Z',
    status: 'active',
    tags: ['law', 'advocacy'],
  },
  {
    id: 'alumni-8',
    name: 'Maryam Sakinah',
    email: 'maryam.sakinah@gmail.com',
    phone: '081899001122',
    angkatan: '2019',
    jurusan: 'Pendidikan Bahasa Arab',
    pekerjaan: 'Guru Bahasa Arab',
    perusahaan: 'Madrasah Al-Aqsa',
    kota: 'Malang',
    provinsi: 'Jawa Timur',
    notes: 'Mengajar bahasa Arab untuk pemahaman budaya Palestina',
    picId: 'pic-4',
    createdAt: '2024-05-05T10:00:00Z',
    updatedAt: '2025-01-27T12:00:00Z',
    status: 'active',
    tags: ['education', 'arabic'],
  },
  {
    id: 'alumni-9',
    name: 'Zainab Husna',
    email: 'zainab.husna@gmail.com',
    phone: '081900112233',
    angkatan: '2018',
    jurusan: 'Desain Grafis',
    pekerjaan: 'Graphic Designer',
    perusahaan: 'Creative Agency',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    notes: 'Desain kampanye awareness Palestina',
    picId: 'pic-1',
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2025-01-29T10:30:00Z',
    status: 'active',
    tags: ['design', 'campaign'],
  },
  {
    id: 'alumni-10',
    name: 'Khalid Umar',
    email: 'khalid.umar@gmail.com',
    phone: '081011223344',
    angkatan: '2019',
    jurusan: 'Ekonomi Syariah',
    pekerjaan: 'Financial Analyst',
    perusahaan: 'Bank Syariah Indonesia',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    notes: 'Pengelola dana donasi untuk Gaza',
    picId: 'pic-2',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2025-01-30T07:20:00Z',
    status: 'active',
    tags: ['finance', 'fundraising'],
  },
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'pic-1',
    userName: 'Fatimah Az-Zahra',
    userRole: 'pic',
    action: 'create',
    targetType: 'alumni',
    targetId: 'alumni-9',
    description: 'Menambahkan data alumni: Zainab Husna',
    timestamp: '2025-01-30T10:15:00Z',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log-2',
    userId: 'pic-2',
    userName: 'Muhammad Ridwan',
    userRole: 'pic',
    action: 'update',
    targetType: 'alumni',
    targetId: 'alumni-10',
    description: 'Memperbarui data kontak alumni: Khalid Umar',
    timestamp: '2025-01-30T09:45:00Z',
    ipAddress: '192.168.1.101',
  },
  {
    id: 'log-3',
    userId: 'moderator-1',
    userName: 'Siti Nurhaliza',
    userRole: 'moderator',
    action: 'view',
    targetType: 'alumni',
    description: 'Melihat laporan data alumni PIC Fatimah Az-Zahra',
    timestamp: '2025-01-30T09:30:00Z',
    ipAddress: '192.168.1.102',
  },
  {
    id: 'log-4',
    userId: 'superadmin-1',
    userName: 'Ahmad Zaki',
    userRole: 'superadmin',
    action: 'create',
    targetType: 'user',
    targetId: 'pic-4',
    description: 'Menambahkan user admin baru: Omar Abdullah (PIC)',
    timestamp: '2025-01-29T16:00:00Z',
    ipAddress: '192.168.1.1',
  },
  {
    id: 'log-5',
    userId: 'pic-3',
    userName: 'Aminah Hasan',
    userRole: 'pic',
    action: 'update',
    targetType: 'alumni',
    targetId: 'alumni-5',
    description: 'Memperbarui catatan alumni: Hassan Malik',
    timestamp: '2025-01-29T14:20:00Z',
    ipAddress: '192.168.1.103',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalAlumni: 10,
  activeAlumni: 10,
  inactiveAlumni: 0,
  totalUsers: 7,
  recentActivities: mockActivityLogs,
  alumniByAngkatan: [
    { angkatan: '2015', count: 2 },
    { angkatan: '2016', count: 2 },
    { angkatan: '2017', count: 2 },
    { angkatan: '2018', count: 2 },
    { angkatan: '2019', count: 2 },
  ],
  alumniByJurusan: [
    { jurusan: 'Teknik Informatika', count: 1 },
    { jurusan: 'Manajemen', count: 1 },
    { jurusan: 'Arsitektur', count: 1 },
    { jurusan: 'Kedokteran', count: 1 },
    { jurusan: 'Komunikasi', count: 1 },
    { jurusan: 'Psikologi', count: 1 },
    { jurusan: 'Hukum', count: 1 },
    { jurusan: 'Pendidikan Bahasa Arab', count: 1 },
    { jurusan: 'Desain Grafis', count: 1 },
    { jurusan: 'Ekonomi Syariah', count: 1 },
  ],
};

/**
 * Get filtered alumni based on user role and permissions
 */
export function getFilteredAlumni(userId: string, userRole: string): Alumni[] {
  if (userRole === 'superadmin') {
    return mockAlumni;
  }
  
  if (userRole === 'moderator') {
    // Get PICs managed by this moderator
    const managedPICIds = mockAdminUsers
      .filter(u => u.role === 'pic' && u.managedBy === userId)
      .map(u => u.id);
    
    // Return alumni from managed PICs
    return mockAlumni.filter(a => managedPICIds.includes(a.picId));
  }
  
  if (userRole === 'pic') {
    // Return only this PIC's alumni
    return mockAlumni.filter(a => a.picId === userId);
  }
  
  return [];
}

/**
 * Get filtered users based on role and permissions
 */
export function getFilteredUsers(userId: string, userRole: string): AdminUser[] {
  if (userRole === 'superadmin') {
    return mockAdminUsers;
  }
  
  if (userRole === 'moderator') {
    // Return PICs managed by this moderator
    return mockAdminUsers.filter(u => 
      u.role === 'pic' && u.managedBy === userId
    );
  }
  
  // PIC cannot view other users
  return [];
}
