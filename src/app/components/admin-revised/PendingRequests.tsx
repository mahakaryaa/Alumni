/**
 * Pending Requests Component
 * PIC can approve/reject join requests
 */

import { useState } from 'react';
import { AdminUser, JoinRequest } from '@/types/admin-revised';
import { getJoinRequestsByProject, mockJoinRequests } from '@/data/mockAdminDataRevised';
import { 
  formatRelativeTime, 
  getCommitmentDisplay,
  getRatingStars,
} from '@/utils/adminPermissions';
import { showToast } from '@/utils/toast';

interface PendingRequestsProps {
  currentUser: AdminUser;
  projectId: string;
  onNavigate: (page: string) => void;
}

export function PendingRequests({ currentUser, projectId, onNavigate }: PendingRequestsProps) {
  const [requests, setRequests] = useState<JoinRequest[]>(
    getJoinRequestsByProject(projectId, 'pending')
  );
  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [approveMessage, setApproveMessage] = useState('');
  const [rejectReason, setRejectReason] = useState('commitment_too_short');
  const [rejectMessage, setRejectMessage] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [allowResubmit, setAllowResubmit] = useState(true);

  const handleApprove = (request: JoinRequest) => {
    setSelectedRequest(request);
    setApproveMessage(`Selamat datang ${request.alumniName}! Kami sangat senang Anda bergabung dengan project ini.`);
    setShowApproveModal(true);
  };

  const handleReject = (request: JoinRequest) => {
    setSelectedRequest(request);
    setRejectMessage('');
    setRejectReason('commitment_too_short');
    setShowRejectModal(true);
  };

  const confirmApprove = () => {
    if (!selectedRequest) return;

    // Mock: Update request status
    const updatedRequests = requests.filter(r => r.id !== selectedRequest.id);
    setRequests(updatedRequests);

    showToast.success(`${selectedRequest.alumniName} berhasil disetujui sebagai member!`);
    setShowApproveModal(false);
    setSelectedRequest(null);
    setApproveMessage('');
  };

  const confirmReject = () => {
    if (!selectedRequest) return;

    // Mock: Update request status
    const updatedRequests = requests.filter(r => r.id !== selectedRequest.id);
    setRequests(updatedRequests);

    showToast.success(`Pengajuan ${selectedRequest.alumniName} ditolak`);
    setShowRejectModal(false);
    setSelectedRequest(null);
    setRejectMessage('');
  };

  if (requests.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-6">
          Pengajuan Join Project
        </h1>
        
        <div className="bg-white rounded-xl p-12 text-center border border-[#E5E7EB]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
          </div>
          <h2 className="font-semibold text-xl text-[#0E1B33] mb-2">
            Tidak Ada Pengajuan Baru
          </h2>
          <p className="text-[#6B7280] mb-6">
            Semua pengajuan sudah di-review. Anda akan menerima notifikasi ketika ada alumni baru yang mengajukan join.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2 bg-[#243D68] text-white rounded-lg hover:bg-[#1a2d4d] transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
          Pengajuan Join Project
        </h1>
        <p className="text-[#6B7280]">
          {requests.length} pengajuan menunggu persetujuan Anda
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden hover:border-[#243D68] transition-colors">
            {/* Request Header */}
            <div className="bg-[#F8F9FA] px-6 py-4 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#243D68]">description</span>
                  <span className="font-semibold text-[#0E1B33]">
                    PENGAJUAN #{request.id.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-[#6B7280]">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">schedule</span>
                  {formatRelativeTime(request.submittedAt)}
                </span>
              </div>
            </div>

            {/* Request Content */}
            <div className="p-6 space-y-4">
              {/* Alumni Info */}
              <div>
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                  Informasi Alumni
                </h3>
                <div className="flex items-start gap-4">
                  {request.alumniPhoto ? (
                    <img
                      src={request.alumniPhoto}
                      alt={request.alumniName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-[#243D68] rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {request.alumniName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-2">
                    <div>
                      <p className="text-xs text-[#6B7280]">Nama</p>
                      <p className="font-semibold text-[#0E1B33]">{request.alumniName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Email</p>
                      <p className="text-sm text-[#0E1B33]">{request.alumniEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Angkatan</p>
                      <p className="text-sm text-[#0E1B33]">{request.alumniAngkatan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Jurusan</p>
                      <p className="text-sm text-[#0E1B33]">{request.alumniJurusan}</p>
                    </div>
                    {request.alumniPekerjaan && (
                      <>
                        <div>
                          <p className="text-xs text-[#6B7280]">Pekerjaan</p>
                          <p className="text-sm text-[#0E1B33]">{request.alumniPekerjaan}</p>
                        </div>
                        {request.alumniPerusahaan && (
                          <div>
                            <p className="text-xs text-[#6B7280]">Perusahaan</p>
                            <p className="text-sm text-[#0E1B33]">{request.alumniPerusahaan}</p>
                          </div>
                        )}
                      </>
                    )}
                    {request.alumniKota && (
                      <div>
                        <p className="text-xs text-[#6B7280]">Kota</p>
                        <p className="text-sm text-[#0E1B33]">{request.alumniKota}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Commitment */}
              <div>
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                  Komitmen
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="material-symbols-outlined text-blue-600">timer</span>
                  <span className="font-semibold text-blue-900">
                    {getCommitmentDisplay(request.commitment)}
                  </span>
                </div>
              </div>

              {/* Interested Position */}
              {request.interestedPosition && (
                <div>
                  <h3 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                    Posisi Tersedia yang Diminati
                  </h3>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-white">work</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-purple-900 text-base">{request.interestedPosition}</p>
                        <p className="text-xs text-purple-700 mt-1">
                          Alumni ini tertarik berkontribusi pada posisi di atas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reason */}
              <div>
                <h3 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                  Alasan Bergabung
                </h3>
                <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
                  <p className="text-sm text-[#0E1B33] leading-relaxed">{request.reason}</p>
                </div>
              </div>

              {/* Previous Projects (if any) */}
              {request.previousProjects && request.previousProjects.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-[#6B7280] uppercase mb-2">
                    Riwayat Project
                  </h3>
                  <div className="space-y-2">
                    {request.previousProjects.map((proj, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-green-900 text-sm">{proj.projectName}</p>
                          <p className="text-xs text-green-700">
                            Durasi: {proj.duration} • {proj.completedTasks} tasks completed
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{getRatingStars(proj.rating)}</p>
                          <p className="text-xs text-green-700">{proj.rating.toFixed(1)}/5.0</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleApprove(request)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(request)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <span className="material-symbols-outlined">cancel</span>
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
              </div>
              <h2 className="font-semibold text-xl text-[#0E1B33]">Approve Pengajuan</h2>
            </div>

            <div className="space-y-4">
              <p className="text-[#6B7280]">
                Anda akan menerima <strong>{selectedRequest.alumniName}</strong> sebagai member project.
              </p>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Komitmen:</strong> {getCommitmentDisplay(selectedRequest.commitment)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Pesan Selamat Datang (Optional)
                </label>
                <textarea
                  value={approveMessage}
                  onChange={(e) => setApproveMessage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={4}
                  placeholder="Tulis pesan selamat datang..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="w-4 h-4 text-[#243D68] rounded"
                  />
                  <span className="text-sm text-[#0E1B33]">Kirim email notifikasi ke alumni</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-6 py-2 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmApprove}
                  className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  ✅ Confirm Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600 text-2xl">cancel</span>
              </div>
              <h2 className="font-semibold text-xl text-[#0E1B33]">Reject Pengajuan</h2>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-900">
                  Anda akan menolak pengajuan <strong>{selectedRequest.alumniName}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Alasan Penolakan <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'quota_full', label: 'Kuota member sudah penuh' },
                    { value: 'skill_mismatch', label: 'Kompetensi tidak sesuai kebutuhan project' },
                    { value: 'commitment_too_short', label: 'Komitmen waktu terlalu singkat' },
                    { value: 'other', label: 'Lainnya (tulis di bawah)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rejectReason"
                        value={option.value}
                        checked={rejectReason === option.value}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="w-4 h-4 text-[#243D68]"
                      />
                      <span className="text-sm text-[#0E1B33]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Pesan untuk Alumni (Optional)
                </label>
                <textarea
                  value={rejectMessage}
                  onChange={(e) => setRejectMessage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={4}
                  placeholder="Tulis pesan untuk alumni..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="w-4 h-4 text-[#243D68] rounded"
                  />
                  <span className="text-sm text-[#0E1B33]">Kirim email notifikasi</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allowResubmit}
                    onChange={(e) => setAllowResubmit(e.target.checked)}
                    className="w-4 h-4 text-[#243D68] rounded"
                  />
                  <span className="text-sm text-[#0E1B33]">Izinkan alumni submit ulang setelah 30 hari</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-6 py-2 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  ❌ Confirm Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}