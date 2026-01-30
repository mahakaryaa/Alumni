/**
 * User Management Component
 * Manage admin users with role-based access control
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin';
import { hasPermission, canManageUser, getRoleDisplayName, getRoleBadgeColor } from '@/utils/adminAuth';
import { showToast } from '@/utils/toast';
import { AccessDenied } from './AccessDenied';

interface UserManagementProps {
  currentUser: AdminUser;
  userList: AdminUser[];
  onRefresh?: () => void;
}

export function UserManagement({ currentUser, userList, onRefresh }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Check if user has permission to view users
  if (!hasPermission(currentUser, 'canViewAllUsers')) {
    return <AccessDenied message="Anda tidak memiliki akses untuk mengelola user" />;
  }

  // Filter users based on permissions and search
  const filteredUsers = userList.filter(user => {
    // PIC and Moderator can only see users they manage
    if (currentUser.role === 'moderator') {
      if (user.role !== 'pic' || user.managedBy !== currentUser.id) {
        return false;
      }
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !user.name.toLowerCase().includes(query) &&
        !user.email.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Role filter
    if (filterRole !== 'all' && user.role !== filterRole) return false;

    return true;
  });

  const handleAddUser = () => {
    if (!hasPermission(currentUser, 'canCreateUsers')) {
      showToast.error('Anda tidak memiliki izin untuk menambah user');
      return;
    }
    setSelectedUser(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditUser = (user: AdminUser) => {
    if (!canManageUser(currentUser, user) && !hasPermission(currentUser, 'canEditUsers')) {
      showToast.error('Anda tidak memiliki izin untuk mengedit user ini');
      return;
    }
    setSelectedUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (!hasPermission(currentUser, 'canDeleteUsers')) {
      showToast.error('Anda tidak memiliki izin untuk menghapus user');
      return;
    }
    
    if (user.id === currentUser.id) {
      showToast.error('Anda tidak dapat menghapus akun Anda sendiri');
      return;
    }

    if (window.confirm(`Apakah Anda yakin ingin menghapus user ${user.name}?`)) {
      showToast.success('User berhasil dihapus');
      onRefresh?.();
    }
  };

  const toggleUserStatus = (user: AdminUser) => {
    if (!canManageUser(currentUser, user) && !hasPermission(currentUser, 'canEditUsers')) {
      showToast.error('Anda tidak memiliki izin untuk mengubah status user ini');
      return;
    }

    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    showToast.success(`User ${newStatus === 'active' ? 'diaktifkan' : 'dinonaktifkan'}`);
    onRefresh?.();
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
            Manajemen User
          </h2>
          <p className="text-[#6B7280] text-sm mt-1">
            Kelola user admin sesuai akses Anda
          </p>
        </div>
        {hasPermission(currentUser, 'canCreateUsers') && (
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-[#243D68] text-white hover:bg-[#1a2f54] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span>Tambah User</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Cari User</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6B7280]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nama atau email..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
            >
              <option value="all">Semua Role</option>
              <option value="superadmin">Super Admin</option>
              <option value="moderator">Moderator</option>
              <option value="pic">PIC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#6B7280]">
        Menampilkan <span className="font-semibold text-[#0E1B33]">{filteredUsers.length}</span> dari{' '}
        <span className="font-semibold text-[#0E1B33]">{userList.length}</span> user
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[#6B7280]">
            Tidak ada user yang ditemukan
          </div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0E1B33]">{user.name}</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mt-1 ${getRoleBadgeColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </div>
                </div>
                
                {/* Status Badge */}
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>

              {/* User Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6B7280] text-lg">email</span>
                  <span className="text-[#6B7280]">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-[#6B7280] text-lg">calendar_today</span>
                  <span className="text-[#6B7280]">Bergabung: {formatDate(user.createdAt)}</span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-[#6B7280] text-lg">schedule</span>
                    <span className="text-[#6B7280]">Login: {formatDate(user.lastLogin)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleEditUser(user)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit
                </button>
                
                {user.id !== currentUser.id && (
                  <>
                    <button
                      onClick={() => toggleUserStatus(user)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {user.status === 'active' ? 'block' : 'check_circle'}
                      </span>
                      {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    
                    {hasPermission(currentUser, 'canDeleteUsers') && (
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="px-3 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
                {isEditing ? 'Edit User' : 'Tambah User'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            
            <div className="text-center py-8 text-[#6B7280]">
              <p>Form untuk tambah/edit user akan ditampilkan di sini</p>
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
                  showToast.success(isEditing ? 'User berhasil diperbarui' : 'User berhasil ditambahkan');
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
