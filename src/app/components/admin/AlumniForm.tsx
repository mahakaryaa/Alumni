/**
 * Alumni Form Component
 * Form untuk tambah/edit data alumni
 */

import { useState, useEffect } from 'react';
import { Alumni } from '@/types/admin';

interface AlumniFormProps {
  alumni?: Alumni | null;
  isEditing: boolean;
  currentUserPicId: string;
  onClose: () => void;
  onSave: (alumniData: Partial<Alumni>) => void;
}

export function AlumniForm({ alumni, isEditing, currentUserPicId, onClose, onSave }: AlumniFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    angkatan: '',
    jurusan: '',
    pekerjaan: '',
    perusahaan: '',
    kota: '',
    provinsi: '',
    notes: '',
    status: 'active' as 'active' | 'inactive',
    tags: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  // Load alumni data if editing
  useEffect(() => {
    if (isEditing && alumni) {
      setFormData({
        name: alumni.name,
        email: alumni.email,
        phone: alumni.phone,
        angkatan: alumni.angkatan,
        jurusan: alumni.jurusan,
        pekerjaan: alumni.pekerjaan || '',
        perusahaan: alumni.perusahaan || '',
        kota: alumni.kota || '',
        provinsi: alumni.provinsi || '',
        notes: alumni.notes || '',
        status: alumni.status,
        tags: alumni.tags || [],
      });
    }
  }, [isEditing, alumni]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]{10,13}$/.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon harus 10-13 digit';
    }

    if (!formData.angkatan.trim()) {
      newErrors.angkatan = 'Angkatan wajib diisi';
    }

    if (!formData.jurusan.trim()) {
      newErrors.jurusan = 'Jurusan wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const alumniData: Partial<Alumni> = {
      ...formData,
      picId: currentUserPicId,
      updatedAt: new Date().toISOString(),
    };

    if (!isEditing) {
      alumniData.id = `alumni-${Date.now()}`;
      alumniData.createdAt = new Date().toISOString();
    }

    onSave(alumniData);
  };

  const jurusanOptions = [
    'Teknik Informatika',
    'Manajemen',
    'Arsitektur',
    'Kedokteran',
    'Komunikasi',
    'Psikologi',
    'Hukum',
    'Pendidikan Bahasa Arab',
    'Desain Grafis',
    'Ekonomi Syariah',
    'Teknik Sipil',
    'Akuntansi',
    'Farmasi',
    'Sastra Inggris',
    'Ilmu Politik',
  ];

  const angkatanOptions = Array.from({ length: 20 }, (_, i) => (2025 - i).toString());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
            {isEditing ? 'Edit Alumni' : 'Tambah Alumni'}
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
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
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

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.email ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="081234567890"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.phone ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Angkatan & Jurusan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Angkatan <span className="text-red-500">*</span>
                </label>
                <select
                  name="angkatan"
                  value={formData.angkatan}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.angkatan ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                  }`}
                >
                  <option value="">Pilih Angkatan</option>
                  {angkatanOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.angkatan && <p className="text-red-500 text-xs mt-1">{errors.angkatan}</p>}
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Jurusan <span className="text-red-500">*</span>
                </label>
                <select
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-sm ${
                    errors.jurusan ? 'border-red-500' : 'border-[#E5E7EB] focus:border-[#243D68]'
                  }`}
                >
                  <option value="">Pilih Jurusan</option>
                  {jurusanOptions.map(jurusan => (
                    <option key={jurusan} value={jurusan}>{jurusan}</option>
                  ))}
                </select>
                {errors.jurusan && <p className="text-red-500 text-xs mt-1">{errors.jurusan}</p>}
              </div>
            </div>

            {/* Pekerjaan & Perusahaan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Pekerjaan
                </label>
                <input
                  type="text"
                  name="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={handleInputChange}
                  placeholder="Contoh: Software Engineer"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Perusahaan
                </label>
                <input
                  type="text"
                  name="perusahaan"
                  value={formData.perusahaan}
                  onChange={handleInputChange}
                  placeholder="Nama perusahaan"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Kota & Provinsi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Kota
                </label>
                <input
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleInputChange}
                  placeholder="Nama kota"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                  Provinsi
                </label>
                <input
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleInputChange}
                  placeholder="Nama provinsi"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                />
              </div>
            </div>

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

            {/* Tags */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Tambah tag (tekan Enter)"
                  className="flex-1 px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-[#243D68] text-white rounded-lg hover:bg-[#1a2f54] transition-colors text-sm font-semibold"
                >
                  Tambah
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#243D68] text-white rounded-full text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Catatan
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Catatan tambahan tentang alumni..."
                rows={4}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm resize-none"
              />
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
