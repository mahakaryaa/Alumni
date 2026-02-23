/**
 * Project Closure Management Component
 * FASE 3B: PIC can request project closure, Superadmin can approve/reject
 * Flow: PIC → Submit Request → Superadmin Review → Approved/Rejected → PIC Notified
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';
import { showToast } from '@/utils/toast';
import type { ProjectClosureRequest } from '@/types';

interface ProjectClosureManagementProps {
  currentUser: AdminUser;
  projectId?: string;
  projectTitle?: string;
  onProjectCloseRequested?: (
    projectId: string,
    projectTitle: string,
    reason: string,
    finalReport: string,
    picName: string
  ) => void;
  onProjectClosureApproved?: (
    projectId: string,
    projectTitle: string,
    approvedBy: string,
    note?: string
  ) => void;
  onProjectClosureRejected?: (
    projectId: string,
    projectTitle: string,
    reason: string,
    rejectedBy: string
  ) => void;
}

// Mock closure requests for Superadmin view
const mockClosureRequests: ProjectClosureRequest[] = [
  {
    id: 'closure-1',
    projectId: 'project-2',
    projectTitle: 'Distribusi Pangan Gaza',
    picId: 'pic-2',
    picName: 'Hasan Ibrahim',
    reason: 'Target distribusi telah tercapai 100%. Sebanyak 2.500 paket sembako telah berhasil didistribusikan kepada keluarga yang membutuhkan di Gaza.',
    finalReport: 'Laporan Akhir: Total donasi yang terkumpul Rp 87.500.000. Dana terpakai Rp 82.300.000 (94%). Sisa dana Rp 5.200.000 akan diteruskan ke project kemanusiaan berikutnya sesuai kesepakatan donatur.',
    status: 'pending',
    requestedAt: '2026-02-15T10:30:00Z',
  },
  {
    id: 'closure-2',
    projectId: 'project-3',
    projectTitle: 'Bantuan Medis Rumah Sakit Gaza',
    picId: 'pic-3',
    picName: 'Zahra Amalia',
    reason: 'Bantuan alat medis telah selesai dikirimkan dan diterima oleh RS Al-Shifa Gaza. Semua misi project telah tercapai.',
    finalReport: 'Laporan Akhir: 50 unit alat medis portable berhasil dikirimkan. Dana yang digunakan Rp 45.000.000 dari total Rp 50.000.000 yang terkumpul. Sisa dana Rp 5.000.000 untuk biaya operasional akhir dan dokumentasi.',
    status: 'approved',
    requestedAt: '2026-02-10T09:00:00Z',
    processedAt: '2026-02-12T14:20:00Z',
    processedBy: 'Dr. Abdullah Rahman (Superadmin)',
    approvalNote: 'Laporan akhir lengkap dan transparan. Project resmi ditutup. Terima kasih atas dedikasi tim!',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ── PIC VIEW ────────────────────────────────────────────────────────────────
function PICClosureView({
  projectId,
  projectTitle,
  picName,
  onProjectCloseRequested,
}: {
  projectId: string;
  projectTitle: string;
  picName: string;
  onProjectCloseRequested?: ProjectClosureManagementProps['onProjectCloseRequested'];
}) {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState('');
  const [finalReport, setFinalReport] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const closureChecklist = [
    { label: 'Semua target project telah tercapai', checked: true },
    { label: 'Dana project telah dipertanggungjawabkan', checked: true },
    { label: 'Laporan akhir telah disiapkan', checked: true },
    { label: 'Semua member telah diinformasikan', checked: false },
    { label: 'Dokumentasi kegiatan telah dilengkapi', checked: false },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!reason.trim() || reason.trim().length < 30) {
      errs.reason = 'Alasan penutupan minimal 30 karakter untuk transparansi';
    }
    if (!finalReport.trim() || finalReport.trim().length < 50) {
      errs.finalReport = 'Laporan akhir minimal 50 karakter';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast.success('Permintaan penutupan project berhasil dikirim ke Superadmin');
      if (onProjectCloseRequested) {
        onProjectCloseRequested(projectId, projectTitle, reason, finalReport, picName);
      }
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        {/* Success State */}
        <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-blue-600 text-4xl">pending_actions</span>
          </div>
          <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33] mb-3">
            Permintaan Terkirim
          </h2>
          <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
            Permintaan penutupan project <span className="font-semibold text-[#0E1B33]">{projectTitle}</span> telah
            dikirim ke Superadmin untuk ditinjau. Anda akan mendapat notifikasi setelah permintaan diproses.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 flex-shrink-0 mt-0.5">info</span>
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">Proses selanjutnya:</p>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Superadmin akan menerima notifikasi permintaan Anda</li>
                  <li>Review laporan akhir project (1-3 hari kerja)</li>
                  <li>Anda mendapat notifikasi hasil keputusan</li>
                  <li>Jika disetujui, project resmi ditutup dan member diinformasikan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600 text-2xl">archive</span>
          </div>
          <div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
              Tutup Project
            </h2>
            <p className="text-sm text-[#6B7280]">
              Request penutupan resmi untuk project: <span className="font-semibold">{projectTitle}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-600 flex-shrink-0 mt-0.5">warning</span>
          <div>
            <p className="font-semibold text-amber-800 mb-1">Perhatian — Tindakan Tidak Dapat Dibatalkan</p>
            <p className="text-sm text-amber-700">
              Penutupan project bersifat permanen. Setelah disetujui Superadmin, project tidak dapat dibuka kembali.
              Pastikan semua aktivitas telah selesai, dana telah dipertanggungjawabkan, dan seluruh member
              sudah diinformasikan sebelum mengajukan permintaan ini.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
        <h3 className="font-semibold text-[#0E1B33] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#243D68]">checklist</span>
          Checklist Penutupan Project
        </h3>
        <div className="space-y-3">
          {closureChecklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.checked ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <span className={`material-symbols-outlined text-base ${
                  item.checked ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {item.checked ? 'check_circle' : 'radio_button_unchecked'}
                </span>
              </div>
              <span className={`text-sm ${item.checked ? 'text-[#0E1B33]' : 'text-[#6B7280]'}`}>
                {item.label}
              </span>
              {!item.checked && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full ml-auto">
                  Belum
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      {!showForm ? (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center">
          <p className="text-[#6B7280] mb-6">
            Pastikan semua checklist di atas telah terpenuhi sebelum mengajukan permintaan penutupan.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">archive</span>
            Ajukan Permintaan Penutupan
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <h3 className="font-semibold text-[#0E1B33] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600">description</span>
            Form Permintaan Penutupan Project
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Reason */}
            <div>
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Alasan Penutupan Project <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => { setReason(e.target.value); setErrors(p => ({ ...p, reason: '' })); }}
                rows={4}
                placeholder="Jelaskan mengapa project ini siap untuk ditutup. Contoh: Semua target distribusi telah tercapai 100%, dana telah dipertanggungjawabkan, dan seluruh kegiatan telah selesai."
                className={`w-full px-4 py-3 border rounded-lg focus:border-[#243D68] focus:outline-none text-sm resize-none ${
                  errors.reason ? 'border-red-300' : 'border-[#E5E7EB]'
                }`}
              />
              {errors.reason && (
                <p className="text-xs text-red-500 mt-1">{errors.reason}</p>
              )}
              <p className="text-xs text-[#9CA3AF] mt-1">{reason.length} karakter (min. 30)</p>
            </div>

            {/* Final Report */}
            <div>
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Laporan Akhir Project <span className="text-red-500">*</span>
              </label>
              <textarea
                value={finalReport}
                onChange={(e) => { setFinalReport(e.target.value); setErrors(p => ({ ...p, finalReport: '' })); }}
                rows={6}
                placeholder="Ringkasan laporan akhir project: total dana terkumpul, dana terpakai, hasil yang dicapai, dan rencana untuk sisa dana (jika ada)."
                className={`w-full px-4 py-3 border rounded-lg focus:border-[#243D68] focus:outline-none text-sm resize-none ${
                  errors.finalReport ? 'border-red-300' : 'border-[#E5E7EB]'
                }`}
              />
              {errors.finalReport && (
                <p className="text-xs text-red-500 mt-1">{errors.finalReport}</p>
              )}
              <p className="text-xs text-[#9CA3AF] mt-1">{finalReport.length} karakter (min. 50)</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 border border-[#E5E7EB] text-[#6B7280] font-semibold rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">send</span>
                    Kirim Permintaan ke Superadmin
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ── SUPERADMIN VIEW ──────────────────────────────────────────────────────────
function SuperadminClosureView({
  onProjectClosureApproved,
  onProjectClosureRejected,
}: {
  onProjectClosureApproved?: ProjectClosureManagementProps['onProjectClosureApproved'];
  onProjectClosureRejected?: ProjectClosureManagementProps['onProjectClosureRejected'];
}) {
  const [closureRequests, setClosureRequests] = useState<ProjectClosureRequest[]>(mockClosureRequests);
  const [selectedRequest, setSelectedRequest] = useState<ProjectClosureRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [approvalNote, setApprovalNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingRequests = closureRequests.filter(r => r.status === 'pending');
  const processedRequests = closureRequests.filter(r => r.status !== 'pending');

  const handleApprove = () => {
    if (!selectedRequest) return;
    setIsProcessing(true);
    setTimeout(() => {
      setClosureRequests(prev =>
        prev.map(r =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: 'approved' as const,
                processedAt: new Date().toISOString(),
                processedBy: 'Superadmin',
                approvalNote,
              }
            : r
        )
      );
      showToast.success(`Project "${selectedRequest.projectTitle}" berhasil ditutup!`);
      if (onProjectClosureApproved) {
        onProjectClosureApproved(
          selectedRequest.projectId,
          selectedRequest.projectTitle,
          'Superadmin',
          approvalNote
        );
      }
      setSelectedRequest(null);
      setActionType(null);
      setApprovalNote('');
      setIsProcessing(false);
    }, 1200);
  };

  const handleReject = () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      showToast.error('Alasan penolakan harus diisi');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setClosureRequests(prev =>
        prev.map(r =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: 'rejected' as const,
                processedAt: new Date().toISOString(),
                processedBy: 'Superadmin',
                rejectionReason,
              }
            : r
        )
      );
      showToast.warning(`Permintaan penutupan "${selectedRequest.projectTitle}" ditolak.`);
      if (onProjectClosureRejected) {
        onProjectClosureRejected(
          selectedRequest.projectId,
          selectedRequest.projectTitle,
          rejectionReason,
          'Superadmin'
        );
      }
      setSelectedRequest(null);
      setActionType(null);
      setRejectionReason('');
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600 text-2xl">archive</span>
          </div>
          <div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
              Manajemen Penutupan Project
            </h2>
            <p className="text-sm text-[#6B7280]">Review dan proses permintaan penutupan project dari PIC</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-600">pending</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{pendingRequests.length}</p>
              <p className="text-xs text-[#6B7280]">Menunggu Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {processedRequests.filter(r => r.status === 'approved').length}
              </p>
              <p className="text-xs text-[#6B7280]">Disetujui</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600">cancel</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {processedRequests.filter(r => r.status === 'rejected').length}
              </p>
              <p className="text-xs text-[#6B7280]">Ditolak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E5E7EB]">
          <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">pending_actions</span>
            <h3 className="font-semibold text-[#0E1B33]">Menunggu Review ({pendingRequests.length})</h3>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-[#0E1B33] text-lg">{req.projectTitle}</h4>
                    <p className="text-sm text-[#6B7280] mt-1">
                      Diajukan oleh <span className="font-medium text-[#243D68]">{req.picName}</span> •{' '}
                      {formatDate(req.requestedAt)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                    Pending Review
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="bg-[#F8F9FA] rounded-lg p-4">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Alasan Penutupan</p>
                    <p className="text-sm text-[#0E1B33]">{req.reason}</p>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-lg p-4">
                    <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Laporan Akhir</p>
                    <p className="text-sm text-[#0E1B33]">{req.finalReport}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setSelectedRequest(req); setActionType('reject'); }}
                    className="px-5 py-2.5 border border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                    Tolak Penutupan
                  </button>
                  <button
                    onClick={() => { setSelectedRequest(req); setActionType('approve'); }}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Setujui & Tutup Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pendingRequests.length === 0 && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
          </div>
          <p className="font-semibold text-[#0E1B33] mb-2">Tidak ada permintaan penutupan</p>
          <p className="text-sm text-[#6B7280]">Semua permintaan penutupan telah diproses</p>
        </div>
      )}

      {/* History */}
      {processedRequests.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E5E7EB]">
          <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6B7280]">history</span>
            <h3 className="font-semibold text-[#0E1B33]">Riwayat ({processedRequests.length})</h3>
          </div>
          <div className="divide-y divide-[#E5E7EB]">
            {processedRequests.map((req) => (
              <div key={req.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-[#0E1B33]">{req.projectTitle}</h4>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {req.picName} • Diproses: {req.processedAt ? formatDate(req.processedAt) : '-'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    req.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {req.status === 'approved' ? '✓ Disetujui' : '✗ Ditolak'}
                  </span>
                </div>
                {(req.approvalNote || req.rejectionReason) && (
                  <p className="text-sm text-[#6B7280] mt-2 bg-[#F8F9FA] rounded-lg px-4 py-2">
                    {req.approvalNote || req.rejectionReason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {selectedRequest && actionType === 'approve' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h3 className="font-['Archivo_Black'] text-lg uppercase text-[#0E1B33]">
                Konfirmasi Penutupan Project
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800">Project yang akan ditutup:</p>
                <p className="text-base font-bold text-green-900 mt-1">{selectedRequest.projectTitle}</p>
                <p className="text-xs text-green-700 mt-1">PIC: {selectedRequest.picName}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Catatan Approval (opsional)
                </label>
                <textarea
                  value={approvalNote}
                  onChange={(e) => setApprovalNote(e.target.value)}
                  rows={3}
                  placeholder="Pesan untuk PIC tentang keputusan penutupan ini..."
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm resize-none"
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-700">
                  ⚠️ Tindakan ini tidak dapat dibatalkan. Project akan resmi ditutup dan semua member akan dinotifikasi.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedRequest(null); setActionType(null); setApprovalNote(''); }}
                  className="flex-1 py-2.5 border border-[#E5E7EB] text-[#6B7280] font-semibold rounded-lg hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                      Tutup Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {selectedRequest && actionType === 'reject' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h3 className="font-['Archivo_Black'] text-lg uppercase text-[#0E1B33]">
                Tolak Permintaan Penutupan
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-800">{selectedRequest.projectTitle}</p>
                <p className="text-xs text-red-700 mt-1">PIC: {selectedRequest.picName}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  placeholder="Jelaskan mengapa permintaan penutupan ini ditolak dan apa yang perlu diperbaiki PIC sebelum mengajukan ulang..."
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedRequest(null); setActionType(null); setRejectionReason(''); }}
                  className="flex-1 py-2.5 border border-[#E5E7EB] text-[#6B7280] font-semibold rounded-lg hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleReject}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">close</span>
                      Tolak Permintaan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function ProjectClosureManagement({
  currentUser,
  projectId,
  projectTitle,
  onProjectCloseRequested,
  onProjectClosureApproved,
  onProjectClosureRejected,
}: ProjectClosureManagementProps) {
  if (currentUser.role === 'pic' && projectId && projectTitle) {
    return (
      <PICClosureView
        projectId={projectId}
        projectTitle={projectTitle}
        picName={currentUser.name}
        onProjectCloseRequested={onProjectCloseRequested}
      />
    );
  }

  if (currentUser.role === 'superadmin') {
    return (
      <SuperadminClosureView
        onProjectClosureApproved={onProjectClosureApproved}
        onProjectClosureRejected={onProjectClosureRejected}
      />
    );
  }

  // Moderator: Read-only view
  return (
    <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-gray-400 text-3xl">lock</span>
      </div>
      <p className="font-semibold text-[#0E1B33] mb-2">Akses Terbatas</p>
      <p className="text-sm text-[#6B7280]">
        Moderator tidak memiliki akses untuk mengelola penutupan project.
      </p>
    </div>
  );
}
