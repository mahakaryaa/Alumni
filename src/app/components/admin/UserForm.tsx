/**
 * User Form Component
 * Form untuk tambah/edit admin user
 */

import { useState, useEffect } from 'react';
import { AdminUser, AdminRole } from '@/types/admin';
import { getRoleDisplayName } from '@/utils/adminAuth';

interface UserFormProps {
  user?: AdminUser | null;
  isEditing: boolean;
  currentUserRole: AdminRole;
  moderators: AdminUser[];
  onClose: () => void;
  onSave: (userData: Partial<AdminUser>) => void;
}

export function UserForm({ user, isEditing, currentUserRole, moderators, onClose, onSave }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'pic' as AdminRole,
    managedBy: '',
    status: 'active' as 'active' | 'inactive',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load user data if editing
  useEffect(() => {
    if (isEditing && user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        managedBy: user.managedBy || '',
        status: user.status,
      });
    }
  }, [isEditing, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (formData.role === 'pic' && !formData.managedBy) {
      newErrors.managedBy = 'PIC harus memiliki Moderator yang mengelola';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const userData: Partial<AdminUser> = {
      ...formData,
      managedBy: formData.role === 'pic' ? formData.managedBy : undefined,
    };

    if (!isEditing) {
      userData.id = `${formData.role}-${Date.now()}`;
      userData.createdAt = new Date().toISOString();
    }

    onSave(userData);
  };

  // Available roles based on current user
  const availableRoles: AdminRole[] = currentUserRole === 'superadmin' 
    ? ['superadmin', 'moderator', 'pic'] 
    : ['pic'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
            {isEditing ? 'Edit User' : 'Tambah User'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[#6B7280]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Nama */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                  errors.name ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@almaqdisi.org"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                  errors.email ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                }`}
                disabled={isEditing}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              {isEditing && (
                <p className="text-xs text-[#6B7280] mt-1">Email tidak dapat diubah</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
              >
                {availableRoles.map(role => (
                  <option key={role} value={role}>
                    {getRoleDisplayName(role)}
                  </option>
                ))}
              </select>
            </div>

            {/* Managed By (untuk PIC) */}
            {formData.role === 'pic' && (
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Dikelola oleh Moderator <span className="text-red-500">*</span>
                </label>
                <select
                  name="managedBy"
                  value={formData.managedBy}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.managedBy ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                  }`}
                >
                  <option value="">Pilih Moderator</option>
                  {moderators.map(mod => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name}
                    </option>
                  ))}
                </select>
                {errors.managedBy && <p className="text-red-500 text-xs mt-1">{errors.managedBy}</p>}
              </div>
            )}

            {/* Status */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Password default akan dikirim ke email user setelah akun dibuat.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-semibold bg-white text-[#243D68] border-2 border-[#243D68] hover:bg-[#F8F9FA] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl font-semibold bg-[#243D68] text-white hover:bg-[#1a2f54] transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
