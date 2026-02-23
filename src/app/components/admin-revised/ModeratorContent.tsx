/**
 * Moderator Content Management Component
 * View and moderate all project content
 * FASE 3A: Added content deletion with PIC notification callback
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';
import { showToast } from '@/utils/toast';

interface ModeratorContentProps {
  currentUser: AdminUser;
  onContentRemoved?: (
    contentId: string,
    contentTitle: string,
    projectId: string,
    projectTitle: string,
    picId: string,
    picName: string,
    removalReason: string,
    removedBy: string
  ) => void;
}

interface ContentItem {
  id: string;
  projectId: number;
  projectName: string;
  picId: string;
  picName: string;
  type: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  time: string;
  status: string;
  views: number;
  likes: number;
  image: boolean;
}

export function ModeratorContent({ currentUser, onContentRemoved }: ModeratorContentProps) {
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<ContentItem | null>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [contentToView, setContentToView] = useState<ContentItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const projects = [
    { id: 1, name: 'Qurban untuk Anak Yatim Gaza' },
    { id: 2, name: 'Pendidikan Guru Tahfidz Al Quran' },
    { id: 3, name: 'Bantuan Medis Rumah Sakit Gaza' },
  ];

  const [allContent, setAllContent] = useState<ContentItem[]>([
    {
      id: '1',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      picId: 'pic-1',
      picName: 'Fatimah Azzahra',
      type: 'update',
      title: 'Distribusi Daging Qurban Sudah Dimulai',
      excerpt: 'Alhamdulillah, distribusi daging qurban untuk 500 anak yatim di Gaza telah dimulai. Tim lapangan sedang bekerja keras untuk memastikan...',
      author: 'Fatimah Azzahra',
      authorRole: 'PIC',
      date: '2025-02-10',
      time: '14:30',
      status: 'published',
      views: 234,
      likes: 45,
      image: true,
    },
    {
      id: '2',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      picId: 'pic-2',
      picName: 'Hasan Ibrahim',
      type: 'story',
      title: 'Kisah Inspiratif Guru Muda Tahfidz di Gaza',
      excerpt: 'Ustadz Ahmad, 28 tahun, mengajar Al-Quran kepada anak-anak di tenda pengungsian. Meski kondisi sulit, semangat beliau tidak pernah padam...',
      author: 'Hasan Ibrahim',
      authorRole: 'PIC',
      date: '2025-02-09',
      time: '10:15',
      status: 'published',
      views: 512,
      likes: 89,
      image: true,
    },
    {
      id: '3',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      picId: 'pic-3',
      picName: 'Zahra Amalia',
      type: 'update',
      title: 'Peralatan Medis Baru Telah Tiba',
      excerpt: 'Bantuan berupa 50 unit alat medis portable telah tiba di Rumah Sakit Al-Shifa Gaza. Peralatan ini akan sangat membantu penanganan pasien...',
      author: 'Zahra Amalia',
      authorRole: 'PIC',
      date: '2025-02-08',
      time: '16:45',
      status: 'published',
      views: 387,
      likes: 67,
      image: true,
    },
    {
      id: '4',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      picId: 'pic-1',
      picName: 'Fatimah Azzahra',
      type: 'update',
      title: 'Persiapan Penyembelihan Hewan Qurban',
      excerpt: 'Tim lapangan tengah mempersiapkan lokasi penyembelihan dan distribusi hewan qurban. Semua protokol kesehatan dan keamanan dipastikan...',
      author: 'Fatimah Azzahra',
      authorRole: 'PIC',
      date: '2025-02-07',
      time: '09:00',
      status: 'draft',
      views: 0,
      likes: 0,
      image: false,
    },
    {
      id: '5',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      picId: 'pic-2',
      picName: 'Hasan Ibrahim',
      type: 'update',
      title: 'Workshop Metode Tahfidz Modern',
      excerpt: 'Mengadakan workshop untuk para guru tahfidz dengan metode pembelajaran terkini yang disesuaikan dengan kondisi di Gaza...',
      author: 'Hasan Ibrahim',
      authorRole: 'PIC',
      date: '2025-02-06',
      time: '11:20',
      status: 'published',
      views: 156,
      likes: 28,
      image: true,
    },
    {
      id: '6',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      picId: 'pic-3',
      picName: 'Zahra Amalia',
      type: 'story',
      title: 'Dokter Muda yang Bertahan di Gaza',
      excerpt: 'Dr. Yusuf, dokter muda yang memilih bertahan di Gaza untuk melayani masyarakat. Cerita perjuangannya menginspirasi banyak tenaga medis...',
      author: 'Zahra Amalia',
      authorRole: 'PIC',
      date: '2025-02-05',
      time: '13:30',
      status: 'published',
      views: 678,
      likes: 123,
      image: true,
    },
  ]);

  const filteredContent = allContent.filter(c => {
    if (selectedProject !== 'all' && c.projectId !== selectedProject) return false;
    if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
    return true;
  });

  const stats = {
    totalContent: allContent.length,
    published: allContent.filter(c => c.status === 'published').length,
    draft: allContent.filter(c => c.status === 'draft').length,
    totalViews: allContent.reduce((sum, c) => sum + c.views, 0),
  };

  const handleDeleteClick = (content: ContentItem) => {
    setContentToDelete(content);
    setDeleteReason('');
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!contentToDelete) return;
    if (!deleteReason.trim()) {
      showToast.error('Alasan penghapusan harus diisi untuk transparansi');
      return;
    }

    setIsDeleting(true);
    setTimeout(() => {
      // Remove from list
      setAllContent(prev => prev.filter(c => c.id !== contentToDelete.id));

      // Trigger notification to PIC
      if (onContentRemoved) {
        onContentRemoved(
          contentToDelete.id,
          contentToDelete.title,
          `project-${contentToDelete.projectId}`,
          contentToDelete.projectName,
          contentToDelete.picId,
          contentToDelete.picName,
          deleteReason,
          currentUser.name
        );
      }

      showToast.success(`Konten "${contentToDelete.title}" berhasil dihapus. PIC telah dinotifikasi.`);
      setShowDeleteModal(false);
      setContentToDelete(null);
      setDeleteReason('');
      setIsDeleting(false);
    }, 800);
  };

  const predefinedReasons = [
    'Konten mengandung informasi yang tidak akurat atau menyesatkan',
    'Konten melanggar pedoman komunitas AlMaqdisi Project',
    'Konten mengandung materi yang tidak pantas atau ofensif',
    'Konten mengandung informasi pribadi yang harus dilindungi',
    'Konten duplikat atau spam',
    'Alasan lain (isi manual)',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-600 text-2xl">article</span>
          </div>
          <div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
              Konten Project
            </h2>
            <p className="text-sm text-[#6B7280]">Kelola dan moderasi konten dari semua project</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">article</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Konten</span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33]">{stats.totalContent}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Published</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-600">edit_note</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Draft</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">visibility</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Content Moderation Policy Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-600 flex-shrink-0 mt-0.5">policy</span>
          <div>
            <p className="text-sm font-semibold text-blue-800 mb-1">Kebijakan Moderasi Konten</p>
            <p className="text-sm text-blue-700">
              Setiap penghapusan konten wajib disertai alasan yang jelas. PIC project akan mendapat notifikasi
              otomatis setiap kali konten mereka dihapus. Moderasi yang transparan menjaga kepercayaan semua pihak.
            </p>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-xl border border-[#E5E7EB]">
        {/* Filter Bar */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Filter Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem'
                }}
              >
                <option value="all">Semua Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Status Konten
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem'
                }}
              >
                <option value="all">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="divide-y divide-[#E5E7EB]">
          {filteredContent.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#6B7280] text-3xl">article</span>
              </div>
              <p className="text-[#6B7280]">Tidak ada konten ditemukan</p>
            </div>
          ) : (
            filteredContent.map((content) => (
              <div key={content.id} className="p-6 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex gap-4">
                  {/* Content Image Placeholder */}
                  {content.image && (
                    <div className="w-24 h-20 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-lg flex-shrink-0 flex items-center justify-center hidden sm:flex">
                      <span className="material-symbols-outlined text-white text-2xl">image</span>
                    </div>
                  )}

                  {/* Content Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            content.type === 'update'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-purple-50 text-purple-600'
                          }`}>
                            {content.type === 'update' ? 'Update' : 'Story'}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            content.status === 'published'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-yellow-50 text-yellow-600'
                          }`}>
                            {content.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#0E1B33] mb-1 line-clamp-1">
                          {content.title}
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-2 line-clamp-2">
                          {content.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF] flex-wrap">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">folder</span>
                            {content.projectName}
                          </span>
                          <span>•</span>
                          <span>{content.author} ({content.authorRole})</span>
                          <span>•</span>
                          <span>{content.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5E7EB]">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                          <span>{content.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-lg">favorite</span>
                          <span>{content.likes}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setContentToView(content); setShowDetailModal(true); }}
                          className="px-3 py-1.5 text-sm font-semibold text-[#243D68] hover:bg-[#243D68] hover:text-white border border-[#243D68] rounded-lg transition-colors"
                        >
                          Lihat Detail
                        </button>
                        <button
                          onClick={() => handleDeleteClick(content)}
                          className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white border border-red-300 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && contentToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-red-600">delete_sweep</span>
              </div>
              <div>
                <h3 className="font-['Archivo_Black'] text-lg uppercase text-[#0E1B33]">
                  Konfirmasi Hapus Konten
                </h3>
                <p className="text-xs text-[#6B7280]">Tindakan ini akan dinotifikasikan ke PIC</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Content Preview */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Konten yang akan dihapus:</p>
                <p className="font-semibold text-[#0E1B33]">{contentToDelete.title}</p>
                <p className="text-xs text-[#6B7280] mt-1">
                  {contentToDelete.projectName} • {contentToDelete.author}
                </p>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-lg flex-shrink-0 mt-0.5">warning</span>
                  <p className="text-sm text-amber-700">
                    PIC <strong>{contentToDelete.picName}</strong> akan mendapat notifikasi bahwa kontennya telah dihapus.
                    Pastikan alasan penghapusan jelas dan konstruktif.
                  </p>
                </div>
              </div>

              {/* Predefined Reasons */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Alasan Penghapusan <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 mb-3">
                  {predefinedReasons.slice(0, 5).map((reason, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDeleteReason(reason)}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-lg border transition-colors ${
                        deleteReason === reason
                          ? 'border-[#243D68] bg-blue-50 text-[#243D68] font-semibold'
                          : 'border-[#E5E7EB] hover:border-[#243D68] text-[#6B7280]'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <textarea
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  rows={3}
                  placeholder="Atau ketik alasan spesifik di sini..."
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setContentToDelete(null);
                    setDeleteReason('');
                  }}
                  className="flex-1 py-2.5 border border-[#E5E7EB] text-[#6B7280] font-semibold rounded-lg hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting || !deleteReason.trim()}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">delete</span>
                      Ya, Hapus Konten
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {showDetailModal && contentToView && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="font-semibold text-[#0E1B33]">Detail Konten</h3>
              <button
                onClick={() => { setShowDetailModal(false); setContentToView(null); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {contentToView.image && (
                <div className="w-full h-40 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-5xl">image</span>
                </div>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  contentToView.type === 'update' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {contentToView.type === 'update' ? 'Update' : 'Story'}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  contentToView.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {contentToView.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
              <h3 className="font-bold text-xl text-[#0E1B33]">{contentToView.title}</h3>
              <p className="text-sm text-[#6B7280]">{contentToView.excerpt}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-xs text-[#9CA3AF] mb-1">Project</p>
                  <p className="font-semibold text-[#0E1B33] text-xs">{contentToView.projectName}</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-xs text-[#9CA3AF] mb-1">PIC</p>
                  <p className="font-semibold text-[#0E1B33] text-xs">{contentToView.picName}</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-xs text-[#9CA3AF] mb-1">Tanggal</p>
                  <p className="font-semibold text-[#0E1B33] text-xs">{contentToView.date} {contentToView.time}</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-lg p-3">
                  <p className="text-xs text-[#9CA3AF] mb-1">Engagement</p>
                  <p className="font-semibold text-[#0E1B33] text-xs">{contentToView.views} views • {contentToView.likes} likes</p>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowDetailModal(false); setContentToView(null); }}
                  className="flex-1 py-2.5 border border-[#E5E7EB] text-[#6B7280] font-semibold rounded-lg hover:bg-[#F8F9FA] transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setContentToView(null);
                    handleDeleteClick(contentToView);
                  }}
                  className="px-4 py-2.5 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  Hapus Konten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
