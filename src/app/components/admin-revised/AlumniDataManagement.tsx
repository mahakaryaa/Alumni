/**
 * Alumni Data Management Component
 * For Moderator to manage all alumni data
 * FASE 3C: Added onAlumniAdded callback for alumni verification notification
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';
import { showToast } from '@/utils/toast';

interface AlumniDataManagementProps {
  currentUser: AdminUser;
  onAlumniAdded?: (
    alumniId: string,
    alumniName: string,
    alumniEmail: string,
    addedBy: string
  ) => void;
}

interface Alumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  major: string;
  graduationYear: number;
  currentJob?: string;
  company?: string;
  city: string;
  status: 'active' | 'inactive';
  joinedProjects: number;
  totalDonations: number;
  createdAt: string;
  saladinCampHistory?: SaladinCampParticipation[];
}

interface SaladinCampParticipation {
  batch: string;
  level: string;
}

export function AlumniDataManagement({ currentUser, onAlumniAdded }: AlumniDataManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBatch, setFilterBatch] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock alumni data
  const [alumniList, setAlumniList] = useState<Alumni[]>([
    {
      id: 'alm-1',
      name: 'Ahmad Fadillah',
      email: 'ahmad.fadillah@email.com',
      phone: '+62812-3456-7890',
      batch: 'Angkatan 15',
      major: 'Teknik Informatika',
      graduationYear: 2020,
      currentJob: 'Software Engineer',
      company: 'PT Tech Indonesia',
      city: 'Jakarta',
      status: 'active',
      joinedProjects: 2,
      totalDonations: 5000000,
      createdAt: '2024-01-15T08:00:00Z',
      saladinCampHistory: [
        { batch: 'Batch 1 — 30 April – 4 Mei 2024', level: 'Beginner' },
        { batch: 'Batch 2 — 23 – 29 September 2024', level: 'Intermediate 1' },
      ],
    },
    {
      id: 'alm-2',
      name: 'Siti Aminah',
      email: 'siti.aminah@email.com',
      phone: '+62813-4567-8901',
      batch: 'Angkatan 16',
      major: 'Ekonomi Syariah',
      graduationYear: 2021,
      currentJob: 'Islamic Banking Officer',
      company: 'Bank Syariah Mandiri',
      city: 'Bandung',
      status: 'active',
      joinedProjects: 1,
      totalDonations: 3000000,
      createdAt: '2024-02-20T10:30:00Z',
      saladinCampHistory: [
        { batch: 'Batch 3 — Lampung AWG', level: 'Intermediate 2' },
      ],
    },
    {
      id: 'alm-3',
      name: 'Muhammad Rizki',
      email: 'muhammad.rizki@email.com',
      phone: '+62814-5678-9012',
      batch: 'Angkatan 14',
      major: 'Ilmu Komunikasi',
      graduationYear: 2019,
      currentJob: 'Content Creator',
      company: 'Freelance',
      city: 'Yogyakarta',
      status: 'active',
      joinedProjects: 3,
      totalDonations: 8000000,
      createdAt: '2023-12-10T14:20:00Z',
      saladinCampHistory: [
        { batch: 'Batch 1 — 30 April – 4 Mei 2024', level: 'Advance' },
        { batch: 'Batch 4 — UMJ & Bogor — Mei 2025', level: 'Advance' },
      ],
    },
    {
      id: 'alm-4',
      name: 'Fatimah Zahra',
      email: 'fatimah.zahra@email.com',
      phone: '+62815-6789-0123',
      batch: 'Angkatan 17',
      major: 'Pendidikan Agama Islam',
      graduationYear: 2022,
      currentJob: 'Guru',
      company: 'SMA Al-Azhar',
      city: 'Surabaya',
      status: 'active',
      joinedProjects: 1,
      totalDonations: 2000000,
      createdAt: '2024-03-05T09:15:00Z',
      saladinCampHistory: [
        { batch: 'Batch 5 — Bogor — 5–19 Oktober 2025', level: 'Beginner' },
      ],
    },
    {
      id: 'alm-5',
      name: 'Abdullah Rahman',
      email: 'abdullah.rahman@email.com',
      phone: '+62816-7890-1234',
      batch: 'Angkatan 13',
      major: 'Teknik Sipil',
      graduationYear: 2018,
      city: 'Semarang',
      status: 'inactive',
      joinedProjects: 0,
      totalDonations: 0,
      createdAt: '2023-11-20T11:45:00Z',
      saladinCampHistory: [
        { batch: 'Batch 2 — 23 – 29 September 2024', level: 'Beginner' },
      ],
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    major: '',
    graduationYear: new Date().getFullYear(),
    currentJob: '',
    company: '',
    city: '',
  });

  // Saladin Camp form state
  const [saladinCampParticipations, setSaladinCampParticipations] = useState<SaladinCampParticipation[]>([
    { batch: '', level: '' }
  ]);

  const batches = ['Angkatan 13', 'Angkatan 14', 'Angkatan 15', 'Angkatan 16', 'Angkatan 17', 'Angkatan 18'];

  const saladinCampBatches = [
    'Batch 1 — 30 April – 4 Mei 2024',
    'Batch 2 — 23 – 29 September 2024',
    'Batch 3 — Lampung AWG',
    'Batch 4 — UMJ & Bogor — Mei 2025',
    'Batch 5 — Bogor — 5–19 Oktober 2025',
    'Batch 6 — Semarang — November 2025',
  ];

  const saladinCampLevels = [
    'Beginner',
    'Intermediate 1',
    'Intermediate 2',
    'Advance',
  ];

  // Handle Saladin Camp participation changes
  const handleAddParticipation = () => {
    setSaladinCampParticipations([...saladinCampParticipations, { batch: '', level: '' }]);
  };

  const handleRemoveParticipation = (index: number) => {
    if (saladinCampParticipations.length > 1) {
      setSaladinCampParticipations(saladinCampParticipations.filter((_, i) => i !== index));
    }
  };

  const handleParticipationChange = (index: number, field: 'batch' | 'level', value: string) => {
    const updated = [...saladinCampParticipations];
    updated[index][field] = value;
    setSaladinCampParticipations(updated);
  };

  const filteredAlumni = alumniList.filter((alumni) => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.phone.includes(searchQuery);
    
    // Filter by Saladin Camp batch
    const matchesBatch = filterBatch === 'all' || 
      alumni.saladinCampHistory?.some(camp => camp.batch === filterBatch);
    
    const matchesStatus = filterStatus === 'all' || alumni.status === filterStatus;

    return matchesSearch && matchesBatch && matchesStatus;
  });

  const stats = {
    total: alumniList.length,
    active: alumniList.filter(a => a.status === 'active').length,
    inactive: alumniList.filter(a => a.status === 'inactive').length,
    totalDonations: alumniList.reduce((sum, a) => sum + a.totalDonations, 0),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation - Personal Info (Required)
    if (!formData.name || !formData.email || !formData.phone || !formData.city) {
      showToast.error('Mohon lengkapi semua field informasi pribadi yang wajib diisi');
      return;
    }

    // Validation - Saladin Camp Participation (Required)
    const validParticipations = saladinCampParticipations.filter(
      participation => participation.batch && participation.level
    );
    
    if (validParticipations.length === 0) {
      showToast.error('Mohon lengkapi minimal 1 partisipasi Saladin Camp (Batch dan Level)');
      return;
    }

    // Auto-generate batch from graduation year (last 2 digits)
    const batch = `Angkatan ${formData.graduationYear.toString().slice(-2)}`;

    // Create new alumni
    const newAlumni: Alumni = {
      id: `alm-${Date.now()}`,
      ...formData,
      batch,
      status: 'active',
      joinedProjects: 0,
      totalDonations: 0,
      createdAt: new Date().toISOString(),
      saladinCampHistory: validParticipations,
    };

    setAlumniList([newAlumni, ...alumniList]);
    showToast.success('Data alumni berhasil ditambahkan');
    setShowAddModal(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      major: '',
      graduationYear: new Date().getFullYear(),
      currentJob: '',
      company: '',
      city: '',
    });
    setSaladinCampParticipations([{ batch: '', level: '' }]);
    
    // Notify alumni added
    if (onAlumniAdded) {
      onAlumniAdded(newAlumni.id, newAlumni.name, newAlumni.email, currentUser.name);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data alumni ini?')) {
      setAlumniList(alumniList.filter(a => a.id !== id));
      showToast.success('Data alumni berhasil dihapus');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-2xl">school</span>
            </div>
            <div>
              <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
                Data Alumni
              </h2>
              <p className="text-sm text-[#6B7280]">Kelola database alumni AlMaqdisi</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#243D68] text-white rounded-lg hover:bg-[#1a2d4d] transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="font-semibold">Tambah Alumni</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">school</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Alumni</span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33]">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Alumni Aktif</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-600">cancel</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Alumni Inactive</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">volunteer_activism</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Donasi</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            Rp {(stats.totalDonations / 1000000).toFixed(0)}jt
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
              Cari Alumni
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nama, email, atau telepon..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
              Filter Batch Saladin Camp
            </label>
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5rem'
              }}
            >
              <option value="all">Semua Batch</option>
              {saladinCampBatches.map((batch) => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
              Filter Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5rem'
              }}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alumni Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Alumni
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Angkatan/Jurusan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Pekerjaan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Aktivitas
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredAlumni.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-[#6B7280] text-3xl">
                          search_off
                        </span>
                      </div>
                      <p className="text-[#6B7280]">Tidak ada data alumni ditemukan</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAlumni.map((alumni) => (
                  <tr key={alumni.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center text-white font-semibold">
                          {alumni.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0E1B33]">{alumni.name}</p>
                          <p className="text-xs text-[#6B7280]">{alumni.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#0E1B33]">{alumni.email}</p>
                      <p className="text-xs text-[#6B7280]">{alumni.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-[#0E1B33]">{alumni.batch}</p>
                      <p className="text-xs text-[#6B7280]">{alumni.major}</p>
                      <p className="text-xs text-[#9CA3AF]">Lulus {alumni.graduationYear}</p>
                    </td>
                    <td className="px-6 py-4">
                      {alumni.currentJob ? (
                        <>
                          <p className="text-sm font-semibold text-[#0E1B33]">{alumni.currentJob}</p>
                          {alumni.company && (
                            <p className="text-xs text-[#6B7280]">{alumni.company}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-[#9CA3AF]">-</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        alumni.status === 'active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {alumni.status === 'active' ? 'Aktif' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-[#0E1B33] font-semibold">
                          {alumni.joinedProjects} Project
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          Donasi: Rp {(alumni.totalDonations / 1000000).toFixed(1)}jt
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-[#243D68] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(alumni.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Alumni Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-[#0E1B33]">Tambah Data Alumni</h3>
                <p className="text-sm text-[#6B7280]">Isi form di bawah untuk menambah alumni baru</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Personal Info */}
              <div>
                <h4 className="font-semibold text-[#0E1B33] mb-3">Informasi Pribadi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="Contoh: Ahmad Fadillah"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="alumni@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="+62812-xxxx-xxxx"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Kota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="Jakarta"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h4 className="font-semibold text-[#0E1B33] mb-3">Informasi Akademik (Opsional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Jurusan
                    </label>
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="Teknik Informatika"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Tahun Lulus
                    </label>
                    <input
                      type="number"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      min="2000"
                      max={new Date().getFullYear() + 5}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div>
                <h4 className="font-semibold text-[#0E1B33] mb-3">Informasi Pekerjaan (Opsional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Pekerjaan Saat Ini
                    </label>
                    <input
                      type="text"
                      value={formData.currentJob}
                      onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      placeholder="PT Tech Indonesia"
                    />
                  </div>
                </div>
              </div>

              {/* Saladin Camp Participation */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#0E1B33]">
                      Partisipasi Saladin Camp <span className="text-red-500">*</span>
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Minimal 1 partisipasi harus diisi (Batch dan Level)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddParticipation}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#243D68] text-white text-sm rounded-lg hover:bg-[#1a2d4d] transition-colors font-semibold"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    Tambah
                  </button>
                </div>
                
                <div className="space-y-4">
                  {saladinCampParticipations.map((participation, index) => (
                    <div key={index} className="border border-[#E5E7EB] rounded-lg p-4 bg-[#F8F9FA]">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-semibold text-[#6B7280]">
                          Partisipasi #{index + 1}
                        </span>
                        {saladinCampParticipations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveParticipation(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Hapus"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                            Batch
                          </label>
                          <select
                            value={participation.batch}
                            onChange={(e) => handleParticipationChange(index, 'batch', e.target.value)}
                            className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none bg-white appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 1rem center',
                              backgroundSize: '1.5rem'
                            }}
                          >
                            <option value="">Pilih Batch</option>
                            {saladinCampBatches.map((batch) => (
                              <option key={batch} value={batch}>{batch}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                            Level
                          </label>
                          <select
                            value={participation.level}
                            onChange={(e) => handleParticipationChange(index, 'level', e.target.value)}
                            className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none bg-white appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 1rem center',
                              backgroundSize: '1.5rem'
                            }}
                          >
                            <option value="">Pilih Level</option>
                            {saladinCampLevels.map((level) => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F8F9FA] transition-colors font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-lg hover:bg-[#1a2d4d] transition-colors font-semibold"
                >
                  Simpan Data Alumni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}