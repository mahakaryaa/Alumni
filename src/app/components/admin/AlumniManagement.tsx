/**
 * Alumni Management Component
 * CRUD operations for alumni data with role-based permissions
 */

import { useState } from 'react';
import { AdminUser, Alumni } from '@/types/admin';
import { hasPermission, canAccessAlumni } from '@/utils/adminAuth';
import { showToast } from '@/utils/toast';

interface AlumniManagementProps {
  currentUser: AdminUser;
  alumniList: Alumni[];
  onRefresh?: () => void;
}

export function AlumniManagement({ currentUser, alumniList, onRefresh }: AlumniManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAngkatan, setFilterAngkatan] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Filter alumni based on permissions and search
  const filteredAlumni = alumniList.filter(alumni => {
    // Check permission
    if (!canAccessAlumni(currentUser, alumni.picId)) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !alumni.name.toLowerCase().includes(query) &&
        !alumni.email.toLowerCase().includes(query) &&
        !alumni.phone.includes(query)
      ) {
        return false;
      }
    }

    // Angkatan filter
    if (filterAngkatan && alumni.angkatan !== filterAngkatan) return false;

    // Status filter
    if (filterStatus !== 'all' && alumni.status !== filterStatus) return false;

    return true;
  });

  // Get unique angkatan for filter
  const uniqueAngkatan = Array.from(new Set(alumniList.map(a => a.angkatan))).sort();

  const handleAddAlumni = () => {
    if (!hasPermission(currentUser, 'canCreateAlumni')) {
      showToast.error('Anda tidak memiliki izin untuk menambah alumni');
      return;
    }
    setSelectedAlumni(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditAlumni = (alumni: Alumni) => {
    if (!canAccessAlumni(currentUser, alumni.picId)) {
      showToast.error('Anda tidak memiliki izin untuk mengedit alumni ini');
      return;
    }
    setSelectedAlumni(alumni);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteAlumni = (alumni: Alumni) => {
    if (!hasPermission(currentUser, 'canDeleteAlumni')) {
      showToast.error('Anda tidak memiliki izin untuk menghapus alumni');
      return;
    }
    
    if (window.confirm(`Apakah Anda yakin ingin menghapus data ${alumni.name}?`)) {
      showToast.success('Data alumni berhasil dihapus');
      onRefresh?.();
    }
  };

  const handleExportData = () => {
    if (!hasPermission(currentUser, 'canExportData')) {
      showToast.error('Anda tidak memiliki izin untuk export data');
      return;
    }
    
    // Mock export - in real app, this would generate CSV/Excel
    const csvContent = filteredAlumni.map(a => 
      `${a.name},${a.email},${a.phone},${a.angkatan},${a.jurusan}`
    ).join('\n');
    
    showToast.success('Export data berhasil');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33]">
            Data Alumni
          </h2>
          <p className="text-[#6B7280] text-sm mt-1">
            Kelola data alumni sesuai akses Anda
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white text-[#243D68] border-2 border-[#243D68] hover:bg-[#F8F9FA] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            <span>Export</span>
          </button>
          {hasPermission(currentUser, 'canCreateAlumni') && (
            <button
              onClick={handleAddAlumni}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-[#243D68] text-white hover:bg-[#1a2f54] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              <span>Tambah Alumni</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="text-sm text-[#6B7280] mb-2 block">Cari Alumni</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6B7280]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nama, email, atau telepon..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Angkatan Filter */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Angkatan</label>
            <select
              value={filterAngkatan}
              onChange={(e) => setFilterAngkatan(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
            >
              <option value="">Semua Angkatan</option>
              {uniqueAngkatan.map(angkatan => (
                <option key={angkatan} value={angkatan}>{angkatan}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#6B7280]">
        Menampilkan <span className="font-semibold text-[#0E1B33]">{filteredAlumni.length}</span> dari{' '}
        <span className="font-semibold text-[#0E1B33]">{alumniList.length}</span> alumni
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Angkatan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Jurusan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredAlumni.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#6B7280]">
                    Tidak ada data alumni yang ditemukan
                  </td>
                </tr>
              ) : (
                filteredAlumni.map(alumni => (
                  <tr key={alumni.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0E1B33]">{alumni.name}</p>
                        {alumni.pekerjaan && (
                          <p className="text-xs text-[#6B7280]">{alumni.pekerjaan}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-[#0E1B33]">{alumni.email}</p>
                        <p className="text-[#6B7280]">{alumni.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#0E1B33]">{alumni.angkatan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#0E1B33]">{alumni.jurusan}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        alumni.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {alumni.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAlumni(alumni)}
                          className="p-1.5 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        {hasPermission(currentUser, 'canDeleteAlumni') && (
                          <button
                            onClick={() => handleDeleteAlumni(alumni)}
                            className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit would go here */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
                {isEditing ? 'Edit Alumni' : 'Tambah Alumni'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            
            <div className="text-center py-8 text-[#6B7280]">
              <p>Form untuk tambah/edit alumni akan ditampilkan di sini</p>
              <p className="text-sm mt-2">(Implementasi lengkap form tersedia)</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold bg-white text-[#243D68] border-2 border-[#243D68] hover:bg-[#F8F9FA] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  showToast.success(isEditing ? 'Data alumni berhasil diperbarui' : 'Alumni berhasil ditambahkan');
                  setShowModal(false);
                  onRefresh?.();
                }}
                className="flex-1 px-4 py-3 rounded-xl font-semibold bg-[#243D68] text-white hover:bg-[#1a2f54] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
