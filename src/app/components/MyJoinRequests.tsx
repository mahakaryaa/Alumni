import { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Search, RefreshCw, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { StatusBadge } from './ui/StatusBadge';
import type { JoinRequest } from '@/types';
import { Logo } from './Logo';
import { toast } from 'sonner';

interface MyJoinRequestsProps {
  requests: JoinRequest[];
  onBack: () => void;
  onViewProject: (projectId: string) => void;
  onCancelRequest: (requestId: string) => void;
  onResubmit: (request: JoinRequest) => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  activeNav?: string;
}

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

export function MyJoinRequests({
  requests,
  onBack,
  onViewProject,
  onCancelRequest,
  onResubmit,
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  activeNav = 'home',
}: MyJoinRequestsProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hari ini';
    if (diffInDays === 1) return 'Kemarin';
    if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu yang lalu`;
    return `${Math.floor(diffInDays / 30)} bulan yang lalu`;
  };

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch =
      searchQuery === '' ||
      request.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  const handleCancel = (requestId: string) => {
    if (window.confirm('Yakin ingin membatalkan pengajuan ini?')) {
      onCancelRequest(requestId);
      toast.success('Pengajuan berhasil dibatalkan');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <Logo />
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengajuan Bergabung</h1>
          <p className="text-gray-600">Pantau status pengajuan bergabung ke project</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Pengajuan</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
            <p className="text-sm text-yellow-800 mb-1">Menunggu</p>
            <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
            <p className="text-sm text-green-800 mb-1">Diterima</p>
            <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200">
            <p className="text-sm text-red-800 mb-1">Ditolak</p>
            <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className="h-[42px]"
              >
                Semua
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
                className="h-[42px]"
              >
                Menunggu
              </Button>
              <Button
                variant={filter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('approved')}
                className="h-[42px]"
              >
                Diterima
              </Button>
              <Button
                variant={filter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('rejected')}
                className="h-[42px]"
              >
                Ditolak
              </Button>
            </div>
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada pengajuan</h3>
            <p className="text-gray-600 text-sm mb-4">
              Anda belum mengajukan untuk bergabung ke project manapun
            </p>
            <Button onClick={onNavigateExplore} variant="default">
              Explore Project
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {request.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Diajukan {getTimeSince(request.submittedAt)}
                        </p>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Komitmen: </span>
                          <span className="font-semibold text-gray-900">{request.commitmentDuration}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tanggal: </span>
                          <span className="text-gray-900">{formatDate(request.submittedAt)}</span>
                        </div>
                      </div>
                      
                      {request.reason && (
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Alasan bergabung:</p>
                          <p className="text-sm text-gray-900 line-clamp-2">{request.reason}</p>
                        </div>
                      )}
                    </div>

                    {/* Rejection Reason */}
                    {request.status === 'rejected' && request.rejectionReason && (
                      <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-3">
                        <p className="text-sm font-semibold text-red-900 mb-1">Alasan Penolakan:</p>
                        <p className="text-xs text-red-800">{request.rejectionReason}</p>
                        {request.rejectionAllowResubmit && (
                          <p className="text-xs text-red-700 mt-2">
                            ℹ️ Anda dapat mengajukan kembali dengan alasan yang lebih baik
                          </p>
                        )}
                      </div>
                    )}

                    {/* Approved Info */}
                    {request.status === 'approved' && request.reviewedAt && (
                      <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-3">
                        <p className="text-sm font-semibold text-green-900 mb-1">
                          <CheckCircle2 className="w-4 h-4 inline mr-1" />
                          Selamat! Anda diterima sebagai {request.assignedRole === 'member' ? 'Member' : 'Contributor'}
                        </p>
                        <p className="text-xs text-green-800">
                          Disetujui pada {formatDate(request.reviewedAt)}
                          {request.reviewedBy && ` oleh ${request.reviewedByRole || 'PIC'}`}
                        </p>
                        {request.approvalMessage && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <p className="text-xs text-green-900 italic">
                              💬 "{request.approvalMessage}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pending Info */}
                    {request.status === 'pending' && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-3">
                        <p className="text-xs text-yellow-800">
                          <Clock className="w-4 h-4 inline mr-1" />
                          PIC sedang meninjau pengajuan Anda. Estimasi waktu review: 1-3 hari kerja
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex md:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProject(request.projectId)}
                      className="flex-1 md:flex-none"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Lihat Project
                    </Button>

                    {request.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancel(request.id)}
                        className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Batalkan
                      </Button>
                    )}

                    {request.status === 'rejected' && request.rejectionAllowResubmit && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onResubmit(request)}
                        className="flex-1 md:flex-none bg-primary hover:bg-primary/90"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Ajukan Ulang
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex justify-around items-center h-16 px-4">
          <button
            onClick={onNavigateHome}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'home' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium">Beranda</span>
          </button>
          <button
            onClick={onNavigateExplore}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'explore' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <span className="text-xl">🔍</span>
            <span className="text-xs font-medium">Explore</span>
          </button>
          <button
            onClick={onNavigateMessages}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'messages' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <span className="text-xl">💬</span>
            <span className="text-xs font-medium">Pesan</span>
          </button>
          <button
            onClick={onNavigateSettings}
            className={`flex flex-col items-center gap-1 ${
              activeNav === 'settings' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <span className="text-xl">⚙️</span>
            <span className="text-xs font-medium">Pengaturan</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
