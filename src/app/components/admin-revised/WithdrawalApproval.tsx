/**
 * Withdrawal Approval Component
 * Komponen untuk Moderator & Superadmin review withdrawal requests
 */

import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Building2, 
  User, 
  FileText, 
  Calendar,
  AlertTriangle,
  CheckCheck
} from 'lucide-react';
import { showToast } from '@/utils/toast';
import type { Withdrawal } from '@/types';

interface WithdrawalApprovalProps {
  role: 'moderator' | 'superadmin';
  withdrawals: Withdrawal[];
  onApprove?: (withdrawalId: string, note?: string, approvedBy?: string) => void;
  onReject?: (withdrawalId: string, reason: string, rejectedBy?: string) => void;
  currentUserId?: string;
  currentUserName?: string;
}

type TabType = 'pending' | 'approved' | 'rejected';

export function WithdrawalApproval({
  role,
  withdrawals,
  onApprove,
  onReject,
  currentUserId,
  currentUserName
}: WithdrawalApprovalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [approvalNote, setApprovalNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter withdrawals based on role and status
  const getFilteredWithdrawals = () => {
    let filtered = [...withdrawals];

    // Role-based filtering
    if (role === 'moderator') {
      // Moderator sees: pending (new), approved (processed by moderator, waiting superadmin)
      if (activeTab === 'pending') {
        filtered = filtered.filter(w => w.status === 'pending');
      } else if (activeTab === 'approved') {
        filtered = filtered.filter(w => w.status === 'approved' && w.processedBy && w.processedBy.includes('Moderator'));
      } else {
        filtered = filtered.filter(w => w.status === 'rejected');
      }
    } else {
      // Superadmin sees: pending (approved by moderator), approved (final), rejected
      if (activeTab === 'pending') {
        filtered = filtered.filter(w => 
          w.status === 'approved' && w.processedBy && w.processedBy.includes('Moderator')
        );
      } else if (activeTab === 'approved') {
        filtered = filtered.filter(w => 
          w.status === 'approved' && w.processedBy && w.processedBy.includes('Superadmin')
        );
      } else {
        filtered = filtered.filter(w => w.status === 'rejected');
      }
    }

    return filtered.sort((a, b) => 
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );
  };

  const filteredWithdrawals = getFilteredWithdrawals();

  const handleApprove = () => {
    if (!selectedWithdrawal) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (onApprove) {
        const approver = role === 'moderator' ? 'Moderator' : 'Superadmin';
        onApprove(
          selectedWithdrawal.id, 
          approvalNote || undefined,
          `${approver}: ${currentUserName || 'Admin'}`
        );
      }

      showToast.success(
        role === 'moderator' 
          ? 'Permintaan penarikan disetujui dan diteruskan ke Superadmin'
          : 'Permintaan penarikan disetujui! Dana akan segera diproses'
      );

      setIsSubmitting(false);
      setShowApproveModal(false);
      setSelectedWithdrawal(null);
      setApprovalNote('');
    }, 600);
  };

  const handleReject = () => {
    if (!selectedWithdrawal || !rejectionReason.trim()) {
      showToast.error('Alasan penolakan wajib diisi');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (onReject) {
        const rejector = role === 'moderator' ? 'Moderator' : 'Superadmin';
        onReject(
          selectedWithdrawal.id, 
          rejectionReason,
          `${rejector}: ${currentUserName || 'Admin'}`
        );
      }

      showToast.error('Permintaan penarikan ditolak');

      setIsSubmitting(false);
      setShowRejectModal(false);
      setSelectedWithdrawal(null);
      setRejectionReason('');
    }, 600);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (withdrawal: Withdrawal) => {
    if (withdrawal.status === 'approved') {
      if (withdrawal.processedBy?.includes('Superadmin')) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            <CheckCheck className="w-3.5 h-3.5" />
            Disetujui Final
          </span>
        );
      } else if (withdrawal.processedBy?.includes('Moderator')) {
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Menunggu Superadmin
          </span>
        );
      }
    } else if (withdrawal.status === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
          <XCircle className="w-3.5 h-3.5" />
          Ditolak
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
        <Clock className="w-3.5 h-3.5" />
        Menunggu Review
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {role === 'moderator' ? 'Review Penarikan Dana' : 'Approval Penarikan Dana'}
        </h2>
        <p className="text-gray-600 mt-1">
          {role === 'moderator' 
            ? 'Tinjau dan verifikasi permintaan penarikan dari PIC sebelum diteruskan ke Superadmin'
            : 'Berikan approval final untuk permintaan penarikan yang sudah disetujui Moderator'
          }
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-[#243D68] text-[#243D68] font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              Menunggu Review
              {filteredWithdrawals.filter(w => {
                if (role === 'moderator') return w.status === 'pending';
                return w.status === 'approved' && w.processedBy?.includes('Moderator');
              }).length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {filteredWithdrawals.filter(w => {
                    if (role === 'moderator') return w.status === 'pending';
                    return w.status === 'approved' && w.processedBy?.includes('Moderator');
                  }).length}
                </span>
              )}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'approved'
                ? 'border-[#243D68] text-[#243D68] font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Disetujui
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'rejected'
                ? 'border-[#243D68] text-[#243D68] font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ditolak
          </button>
        </div>
      </div>

      {/* Content */}
      {filteredWithdrawals.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Tidak Ada Permintaan
          </h3>
          <p className="text-gray-600">
            {activeTab === 'pending' && 'Belum ada permintaan penarikan yang perlu ditinjau'}
            {activeTab === 'approved' && 'Belum ada permintaan yang disetujui'}
            {activeTab === 'rejected' && 'Belum ada permintaan yang ditolak'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWithdrawals.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {withdrawal.projectTitle}
                    </h3>
                    {getStatusBadge(withdrawal)}
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    PIC: {withdrawal.picName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#243D68]">
                    Rp {withdrawal.amount.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank Tujuan</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {withdrawal.bankName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {withdrawal.bankAccount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama Pemilik</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {withdrawal.accountHolder}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tanggal Permintaan</p>
                  <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(withdrawal.requestedAt)}
                  </p>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Alasan Penarikan</p>
                <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  {withdrawal.reason}
                </p>
              </div>

              {/* Approval/Rejection Info */}
              {withdrawal.processedBy && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                  <p className="text-xs text-gray-500 mb-1">
                    {withdrawal.status === 'rejected' ? 'Ditolak oleh' : 'Disetujui oleh'}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{withdrawal.processedBy}</p>
                  {withdrawal.processedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(withdrawal.processedAt)}
                    </p>
                  )}
                  {withdrawal.approvalNote && (
                    <p className="text-sm text-gray-700 mt-2 italic">
                      "{withdrawal.approvalNote}"
                    </p>
                  )}
                  {withdrawal.rejectionReason && (
                    <p className="text-sm text-red-700 mt-2">
                      <span className="font-semibold">Alasan: </span>
                      {withdrawal.rejectionReason}
                    </p>
                  )}
                </div>
              )}

              {/* Actions - Only for pending */}
              {activeTab === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedWithdrawal(withdrawal);
                      setShowRejectModal(true);
                    }}
                    className="flex-1 px-4 py-2.5 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Tolak
                  </button>
                  <button
                    onClick={() => {
                      setSelectedWithdrawal(withdrawal);
                      setShowApproveModal(true);
                    }}
                    className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Setujui
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Setujui Permintaan?
            </h3>
            <p className="text-gray-600 text-center mb-4">
              {role === 'moderator' 
                ? 'Permintaan akan diteruskan ke Superadmin untuk approval final'
                : 'Dana akan segera diproses dan ditransfer ke rekening tujuan'
              }
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">Jumlah Penarikan</p>
              <p className="text-2xl font-bold text-[#243D68]">
                Rp {selectedWithdrawal.amount.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {selectedWithdrawal.projectTitle}
              </p>
            </div>

            {/* Optional Note */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                placeholder="Tambahkan catatan jika diperlukan..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setSelectedWithdrawal(null);
                  setApprovalNote('');
                }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleApprove}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Memproses...' : 'Ya, Setujui'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Tolak Permintaan?
            </h3>
            <p className="text-gray-600 text-center mb-4">
              PIC akan menerima notifikasi penolakan dengan alasan yang Anda berikan
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">Jumlah Penarikan</p>
              <p className="text-xl font-bold text-gray-900">
                Rp {selectedWithdrawal.amount.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {selectedWithdrawal.projectTitle}
              </p>
            </div>

            {/* Required Reason */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alasan Penolakan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Jelaskan mengapa permintaan ini ditolak..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedWithdrawal(null);
                  setRejectionReason('');
                }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleReject}
                disabled={isSubmitting || !rejectionReason.trim()}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Memproses...' : 'Ya, Tolak'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
