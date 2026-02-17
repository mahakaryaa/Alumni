/**
 * Moderator Content Management Component
 * View and moderate all project content
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';

interface ModeratorContentProps {
  currentUser: AdminUser;
}

export function ModeratorContent({ currentUser }: ModeratorContentProps) {
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const projects = [
    { id: 1, name: 'Qurban untuk Anak Yatim Gaza' },
    { id: 2, name: 'Pendidikan Guru Tahfidz Al Quran' },
    { id: 3, name: 'Bantuan Medis Rumah Sakit Gaza' },
  ];

  const allContent = [
    {
      id: '1',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
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
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
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
                    <div className="w-32 h-24 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-lg flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-3xl">image</span>
                    </div>
                  )}

                  {/* Content Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
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
                        <h3 className="font-bold text-lg text-[#0E1B33] mb-2 line-clamp-1">
                          {content.title}
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">
                          {content.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                          <span>{content.projectName}</span>
                          <span>•</span>
                          <span>{content.author} ({content.authorRole})</span>
                          <span>•</span>
                          <span>{content.date} {content.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E7EB]">
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
                        <button className="px-4 py-2 text-sm font-semibold text-[#243D68] hover:bg-[#243D68] hover:text-white border border-[#243D68] rounded-lg transition-colors">
                          Lihat Detail
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
    </div>
  );
}