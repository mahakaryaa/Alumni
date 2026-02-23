/**
 * Content Management Component
 * PIC can create and manage project updates/content
 */

import { useState } from 'react';
import { AdminUser, ProgressUpdate, UpdateType } from '@/types/admin-revised';
import { getProjectUpdates } from '@/data/mockAdminDataRevised';
import { showToast } from '@/utils/toast';

interface ContentManagementProps {
  currentUser: AdminUser;
  projectId: string;
  onContentPublished?: (projectId: string, projectTitle: string, updateTitle: string, updateType: string, createdByName: string) => void;
}

export function ContentManagement({ currentUser, projectId, onContentPublished }: ContentManagementProps) {
  const [updates, setUpdates] = useState<ProgressUpdate[]>(getProjectUpdates(projectId));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<ProgressUpdate | null>(null);

  // Form states
  const [updateType, setUpdateType] = useState<UpdateType>('progress');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notifyMembers, setNotifyMembers] = useState(true);

  const handleCreateUpdate = () => {
    if (!title.trim()) {
      showToast.error('Judul harus diisi');
      return;
    }

    if (!content.trim()) {
      showToast.error('Konten harus diisi');
      return;
    }

    const newUpdate: ProgressUpdate = {
      id: `update-${Date.now()}`,
      projectId,
      type: updateType,
      title,
      content,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
      notifyMembers,
      commentsCount: 0,
      likesCount: 0,
    };

    setUpdates([newUpdate, ...updates]);
    showToast.success('Update berhasil dipublish!');

    // FASE 3: Trigger notification jika notifyMembers=true
    if (notifyMembers && onContentPublished) {
      const projectData = projectId === 'project-1' 
        ? 'Rekonstruksi Masjid Al-Aqsa' 
        : projectId === 'project-2'
        ? 'Distribusi Pangan Gaza'
        : 'Project Aktif';
      onContentPublished(projectId, projectData, title, updateType, currentUser.name);
    }

    // Reset form
    setTitle('');
    setContent('');
    setUpdateType('progress');
    setNotifyMembers(true);
    setShowCreateModal(false);
  };

  const handleEditUpdate = (update: ProgressUpdate) => {
    setSelectedUpdate(update);
    setTitle(update.title);
    setContent(update.content);
    setUpdateType(update.type);
    setNotifyMembers(update.notifyMembers);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedUpdate) return;

    if (!title.trim() || !content.trim()) {
      showToast.error('Judul dan konten harus diisi');
      return;
    }

    const updatedList = updates.map((u) =>
      u.id === selectedUpdate.id
        ? { ...u, title, content, type: updateType, notifyMembers }
        : u
    );

    setUpdates(updatedList);
    showToast.success('Update berhasil disimpan!');
    setShowEditModal(false);
    setSelectedUpdate(null);
    resetForm();
  };

  const handleDeleteUpdate = (updateId: string) => {
    if (confirm('Yakin ingin menghapus update ini?')) {
      setUpdates(updates.filter((u) => u.id !== updateId));
      showToast.success('Update berhasil dihapus');
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setUpdateType('progress');
    setNotifyMembers(true);
  };

  const getUpdateTypeLabel = (type: UpdateType) => {
    const labels: Record<UpdateType, string> = {
      progress: 'Progress Update',
      announcement: 'Pengumuman',
      milestone: 'Milestone Achieved',
      meeting_reminder: 'Meeting Reminder',
    };
    return labels[type];
  };

  const getUpdateTypeColor = (type: UpdateType) => {
    const colors: Record<UpdateType, string> = {
      progress: 'bg-blue-100 text-blue-800',
      announcement: 'bg-purple-100 text-purple-800',
      milestone: 'bg-green-100 text-green-800',
      meeting_reminder: 'bg-orange-100 text-orange-800',
    };
    return colors[type];
  };

  const getUpdateTypeIcon = (type: UpdateType) => {
    const icons: Record<UpdateType, string> = {
      progress: 'trending_up',
      announcement: 'campaign',
      milestone: 'emoji_events',
      meeting_reminder: 'event',
    };
    return icons[type];
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
            Konten Project
          </h1>
          <p className="text-[#6B7280]">Kelola update dan konten project untuk member</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Buat Update Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">article</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{updates.length}</p>
              <p className="text-sm text-[#6B7280]">Total Updates</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">comment</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">
                {updates.reduce((sum, u) => sum + u.commentsCount, 0)}
              </p>
              <p className="text-sm text-[#6B7280]">Total Comments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-pink-600">favorite</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">
                {updates.reduce((sum, u) => sum + u.likesCount, 0)}
              </p>
              <p className="text-sm text-[#6B7280]">Total Likes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">emoji_events</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">
                {updates.filter((u) => u.type === 'milestone').length}
              </p>
              <p className="text-sm text-[#6B7280]">Milestones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-[#E5E7EB]">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-[#6B7280]">article</span>
            </div>
            <h3 className="font-semibold text-xl text-[#0E1B33] mb-2">Belum Ada Update</h3>
            <p className="text-[#6B7280] mb-6">Buat update pertama untuk memberitahu member tentang progress project</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
            >
              Buat Update Pertama
            </button>
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden hover:border-[#243D68] transition-colors">
              {/* Update Header */}
              <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getUpdateTypeColor(update.type)}`}>
                    <span className="material-symbols-outlined text-sm">{getUpdateTypeIcon(update.type)}</span>
                    {getUpdateTypeLabel(update.type)}
                  </span>
                  <span className="text-sm text-[#6B7280]">
                    {new Date(update.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditUpdate(update)}
                    className="p-2 text-[#243D68] hover:bg-white rounded-lg transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-xl">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteUpdate(update.id)}
                    className="p-2 text-red-600 hover:bg-white rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>

              {/* Update Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-[#0E1B33] mb-3">{update.title}</h3>
                <p className="text-[#0E1B33] leading-relaxed whitespace-pre-wrap">{update.content}</p>

                {/* Update Media (if any) */}
                {update.mediaUrls && update.mediaUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {update.mediaUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`Media ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Update Stats */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                    <span className="text-sm font-semibold">{update.likesCount} likes</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <span className="material-symbols-outlined text-xl">comment</span>
                    <span className="text-sm font-semibold">{update.commentsCount} comments</span>
                  </div>
                  {update.notifyMembers && (
                    <div className="flex items-center gap-2 text-green-600">
                      <span className="material-symbols-outlined text-xl">notifications_active</span>
                      <span className="text-sm font-semibold">Notifikasi terkirim</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Update Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-[#0E1B33]">Buat Update Baru</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Update Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Tipe Update <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['progress', 'announcement', 'milestone', 'meeting_reminder'] as UpdateType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setUpdateType(type)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        updateType === type
                          ? 'border-[#243D68] bg-blue-50'
                          : 'border-[#E5E7EB] bg-white hover:border-[#243D68]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl mb-2">{getUpdateTypeIcon(type)}</span>
                      <p className="text-sm font-semibold">{getUpdateTypeLabel(type)}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Judul <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Distribusi Bantuan Berhasil Dilakukan!"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-lg font-semibold"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Konten <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis konten update di sini..."
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={8}
                />
                <p className="text-xs text-[#6B7280] mt-1">
                  {content.length} karakter
                </p>
              </div>

              {/* Notify Members */}
              <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyMembers}
                    onChange={(e) => setNotifyMembers(e.target.checked)}
                    className="w-5 h-5 text-[#243D68] rounded"
                  />
                  <div>
                    <p className="font-semibold text-[#0E1B33]">Kirim Notifikasi ke Member</p>
                    <p className="text-sm text-[#6B7280]">
                      Semua member project akan menerima notifikasi tentang update ini
                    </p>
                  </div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreateUpdate}
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  🚀 Publish Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Update Modal */}
      {showEditModal && selectedUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-[#0E1B33]">Edit Update</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUpdate(null);
                  resetForm();
                }}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Update Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Tipe Update</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['progress', 'announcement', 'milestone', 'meeting_reminder'] as UpdateType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setUpdateType(type)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        updateType === type
                          ? 'border-[#243D68] bg-blue-50'
                          : 'border-[#E5E7EB] bg-white hover:border-[#243D68]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl mb-2">{getUpdateTypeIcon(type)}</span>
                      <p className="text-sm font-semibold">{getUpdateTypeLabel(type)}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Judul</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-lg font-semibold"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Konten</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={8}
                />
              </div>

              {/* Notify Members */}
              <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyMembers}
                    onChange={(e) => setNotifyMembers(e.target.checked)}
                    className="w-5 h-5 text-[#243D68] rounded"
                  />
                  <p className="font-semibold text-[#0E1B33]">Kirim Notifikasi ke Member</p>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUpdate(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  💾 Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}