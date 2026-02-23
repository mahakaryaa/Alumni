import { useState } from 'react';
import { toast } from 'sonner';
import type { EventRegistration } from '@/types';

interface EventRegistrationApprovalProps {
  registrations: EventRegistration[];
  onApprove: (registrationId: string, message: string, reviewedBy: string, reviewedByRole: 'PIC' | 'Moderator') => void;
  onReject: (registrationId: string, reason: string, reviewedBy: string, reviewedByRole: 'PIC' | 'Moderator') => void;
  currentAdminName: string;
  currentAdminRole: 'pic' | 'moderator' | 'superadmin';
}

export function EventRegistrationApproval({
  registrations,
  onApprove,
  onReject,
  currentAdminName,
  currentAdminRole
}: EventRegistrationApprovalProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<EventRegistration | null>(null);
  const [approvalMessage, setApprovalMessage] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filter registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesStatus = reg.status === activeTab;
    const matchesSearch = 
      reg.alumniName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.alumniEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.eventTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = selectedEvent === 'all' || reg.eventId === selectedEvent;
    
    return matchesStatus && matchesSearch && matchesEvent;
  });

  // Get unique events for filter
  const uniqueEvents = Array.from(new Set(registrations.map(r => r.eventTitle)));

  const handleApprove = () => {
    if (!selectedRegistration) return;
    if (!approvalMessage.trim()) {
      toast.error('Pesan persetujuan wajib diisi');
      return;
    }

    const role = currentAdminRole === 'pic' ? 'PIC' : 'Moderator';
    onApprove(selectedRegistration.id, approvalMessage, currentAdminName, role);
    
    setShowApproveModal(false);
    setApprovalMessage('');
    setSelectedRegistration(null);
    toast.success('Pendaftaran event berhasil disetujui!');
  };

  const handleReject = () => {
    if (!selectedRegistration) return;
    if (!rejectionReason.trim()) {
      toast.error('Alasan penolakan wajib diisi');
      return;
    }

    const role = currentAdminRole === 'pic' ? 'PIC' : 'Moderator';
    onReject(selectedRegistration.id, rejectionReason, currentAdminName, role);
    
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedRegistration(null);
    toast.success('Pendaftaran event ditolak');
  };

  const StatusBadge = ({ status }: { status: EventRegistration['status'] }) => {
    const styles = {
      pending: 'bg-[#FFF9E6] text-[#F59E0B] border-[#FAC06E]',
      approved: 'bg-[#ECFDF5] text-[#059669] border-[#86EFAC]',
      rejected: 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]',
      attended: 'bg-[#E0E7FF] text-[#4F46E5] border-[#A5B4FC]',
      cancelled: 'bg-[#F3F4F6] text-[#6B7280] border-[#D1D5DB]'
    };

    const labels = {
      pending: 'Menunggu',
      approved: 'Disetujui',
      rejected: 'Ditolak',
      attended: 'Hadir',
      cancelled: 'Dibatalkan'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-['Archivo_Black'] text-[#243D68] mb-2 uppercase">
          Event Registration Approval
        </h2>
        <p className="text-[#6B7280]">
          Kelola dan tinjau pendaftaran event dari alumni
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border-2 border-[#FFF9E6] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#F59E0B] text-2xl">pending</span>
            <span className="text-xs font-semibold text-[#F59E0B] bg-[#FFF9E6] px-2 py-1 rounded-full">
              Pending
            </span>
          </div>
          <p className="text-3xl font-['Archivo_Black'] text-[#243D68]">
            {registrations.filter(r => r.status === 'pending').length}
          </p>
          <p className="text-xs text-[#6B7280] mt-1">Menunggu Review</p>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#ECFDF5] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#059669] text-2xl">check_circle</span>
            <span className="text-xs font-semibold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded-full">
              Approved
            </span>
          </div>
          <p className="text-3xl font-['Archivo_Black'] text-[#243D68]">
            {registrations.filter(r => r.status === 'approved').length}
          </p>
          <p className="text-xs text-[#6B7280] mt-1">Telah Disetujui</p>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#FEE2E2] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#DC2626] text-2xl">cancel</span>
            <span className="text-xs font-semibold text-[#DC2626] bg-[#FEE2E2] px-2 py-1 rounded-full">
              Rejected
            </span>
          </div>
          <p className="text-3xl font-['Archivo_Black'] text-[#243D68]">
            {registrations.filter(r => r.status === 'rejected').length}
          </p>
          <p className="text-xs text-[#6B7280] mt-1">Ditolak</p>
        </div>

        <div className="bg-white rounded-xl border-2 border-[#E0E7FF] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-[#4F46E5] text-2xl">event_available</span>
            <span className="text-xs font-semibold text-[#4F46E5] bg-[#E0E7FF] px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-3xl font-['Archivo_Black'] text-[#243D68]">
            {registrations.length}
          </p>
          <p className="text-xs text-[#6B7280] mt-1">Total Pendaftaran</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border-2 border-[#E5E7EB] p-5">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari nama alumni, email, atau event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#D6DCE8] rounded-lg focus:border-[#243D68] focus:ring-2 focus:ring-[#243D68]/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Event Filter */}
          <div className="w-full md:w-64">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-2 border border-[#D6DCE8] rounded-lg focus:border-[#243D68] focus:ring-2 focus:ring-[#243D68]/20 outline-none transition-all"
            >
              <option value="all">Semua Event</option>
              {uniqueEvents.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden">
        <div className="flex border-b border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-3 font-semibold transition-all ${
              activeTab === 'pending'
                ? 'bg-[#243D68] text-white'
                : 'bg-white text-[#6B7280] hover:bg-[#F8F9FA]'
            }`}
          >
            Pending ({registrations.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 px-6 py-3 font-semibold transition-all ${
              activeTab === 'approved'
                ? 'bg-[#243D68] text-white'
                : 'bg-white text-[#6B7280] hover:bg-[#F8F9FA]'
            }`}
          >
            Approved ({registrations.filter(r => r.status === 'approved').length})
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex-1 px-6 py-3 font-semibold transition-all ${
              activeTab === 'rejected'
                ? 'bg-[#243D68] text-white'
                : 'bg-white text-[#6B7280] hover:bg-[#F8F9FA]'
            }`}
          >
            Rejected ({registrations.filter(r => r.status === 'rejected').length})
          </button>
        </div>

        {/* Registration List */}
        <div className="p-5">
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-[#D6DCE8] text-6xl mb-3 block">
                event_busy
              </span>
              <p className="text-[#6B7280] font-medium">Tidak ada pendaftaran {activeTab}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRegistrations.map(registration => (
                <div
                  key={registration.id}
                  className="border-2 border-[#E5E7EB] rounded-xl p-5 hover:border-[#243D68] transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Alumni Info */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-full flex items-center justify-center text-white font-bold">
                          {registration.alumniName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#243D68] text-lg">
                            {registration.alumniName}
                          </h3>
                          <p className="text-sm text-[#6B7280]">{registration.alumniEmail}</p>
                          <div className="flex items-center gap-3 mt-1">
                            {registration.alumniAngkatan && (
                              <span className="text-xs text-[#6B7280]">
                                Angkatan {registration.alumniAngkatan}
                              </span>
                            )}
                            {registration.alumniKota && (
                              <span className="text-xs text-[#6B7280]">• {registration.alumniKota}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Event Info */}
                      <div className="bg-[#F8F9FA] rounded-lg p-3 mb-3">
                        <p className="text-xs text-[#6B7280] mb-1">Event:</p>
                        <p className="font-bold text-[#243D68]">{registration.eventTitle}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#6B7280]">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">calendar_today</span>
                            {registration.eventDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            {registration.eventTime}
                          </span>
                        </div>
                      </div>

                      {/* Motivation Preview */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-[#333333] mb-1">Motivasi:</p>
                        <p className="text-sm text-[#6B7280] line-clamp-2">
                          {registration.motivation}
                        </p>
                      </div>

                      {/* Additional Info */}
                      <div className="flex flex-wrap gap-2">
                        {registration.hasAttendedBefore && (
                          <span className="px-2 py-1 bg-[#E0E7FF] text-[#4F46E5] text-xs rounded-full font-medium">
                            Pernah Hadir Sebelumnya
                          </span>
                        )}
                        {registration.dietaryRestrictions && (
                          <span className="px-2 py-1 bg-[#FEF3C7] text-[#D97706] text-xs rounded-full font-medium">
                            Ada Pantangan Makanan
                          </span>
                        )}
                        {registration.emergencyContact && (
                          <span className="px-2 py-1 bg-[#DBEAFE] text-[#1E40AF] text-xs rounded-full font-medium">
                            Kontak Darurat Tersedia
                          </span>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          Daftar: {new Date(registration.submittedAt).toLocaleDateString('id-ID')}
                        </span>
                        {registration.reviewedAt && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            Review: {new Date(registration.reviewedAt).toLocaleDateString('id-ID')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={registration.status} />
                      
                      {registration.status === 'pending' && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setShowDetailModal(true);
                            }}
                            className="px-3 py-1.5 border border-[#D6DCE8] rounded-lg text-xs font-semibold text-[#6B7280] hover:bg-[#F8F9FA] transition-colors"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1.5 bg-[#FEE2E2] text-[#DC2626] rounded-lg text-xs font-semibold hover:bg-[#FCA5A5] transition-colors"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRegistration(registration);
                              setApprovalMessage('Selamat! Pendaftaran Anda telah disetujui. Kami tunggu kehadiran Anda di event.');
                              setShowApproveModal(true);
                            }}
                            className="px-3 py-1.5 bg-[#243D68] text-white rounded-lg text-xs font-semibold hover:bg-[#1A2F51] transition-colors"
                          >
                            Setujui
                          </button>
                        </div>
                      )}

                      {registration.status === 'approved' && registration.reviewedBy && (
                        <p className="text-xs text-[#6B7280] mt-2">
                          oleh: {registration.reviewedBy}
                        </p>
                      )}

                      {registration.status === 'rejected' && registration.rejectionReason && (
                        <div className="mt-2 max-w-xs">
                          <p className="text-xs font-semibold text-[#DC2626] mb-1">Alasan:</p>
                          <p className="text-xs text-[#6B7280]">{registration.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-['Archivo_Black'] text-[#243D68] uppercase">
                Detail Pendaftaran
              </h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedRegistration(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Alumni Info */}
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-2">Data Alumni</h4>
                <div className="bg-[#F8F9FA] rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-[#6B7280]">Nama Lengkap</p>
                      <p className="text-sm font-semibold text-[#243D68]">{selectedRegistration.alumniName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Email</p>
                      <p className="text-sm font-semibold text-[#243D68]">{selectedRegistration.alumniEmail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">No. Telepon</p>
                      <p className="text-sm font-semibold text-[#243D68]">{selectedRegistration.alumniPhone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Angkatan</p>
                      <p className="text-sm font-semibold text-[#243D68]">{selectedRegistration.alumniAngkatan || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">Kota Domisili</p>
                      <p className="text-sm font-semibold text-[#243D68]">{selectedRegistration.alumniKota || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Info */}
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-2">Info Event</h4>
                <div className="bg-[#F0F4F8] rounded-lg p-4">
                  <p className="font-bold text-[#243D68] mb-2">{selectedRegistration.eventTitle}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {selectedRegistration.eventDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {selectedRegistration.eventTime}
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {selectedRegistration.eventLocation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h4 className="text-sm font-semibold text-[#333333] mb-2">Motivasi</h4>
                <div className="bg-[#F8F9FA] rounded-lg p-4">
                  <p className="text-sm text-[#333333] leading-relaxed">{selectedRegistration.motivation}</p>
                </div>
              </div>

              {/* Additional Info */}
              {(selectedRegistration.dietaryRestrictions || selectedRegistration.emergencyContact) && (
                <div>
                  <h4 className="text-sm font-semibold text-[#333333] mb-2">Informasi Tambahan</h4>
                  <div className="bg-[#F8F9FA] rounded-lg p-4 space-y-2">
                    {selectedRegistration.dietaryRestrictions && (
                      <div>
                        <p className="text-xs text-[#6B7280]">Pantangan Makanan</p>
                        <p className="text-sm text-[#333333]">{selectedRegistration.dietaryRestrictions}</p>
                      </div>
                    )}
                    {selectedRegistration.emergencyContact && (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-[#6B7280]">Kontak Darurat</p>
                          <p className="text-sm text-[#333333]">{selectedRegistration.emergencyContact}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280]">No. Telepon Darurat</p>
                          <p className="text-sm text-[#333333]">{selectedRegistration.emergencyContactPhone || '-'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedRegistration.hasAttendedBefore && (
                  <span className="px-3 py-1.5 bg-[#E0E7FF] text-[#4F46E5] text-xs rounded-full font-medium">
                    ✓ Pernah Hadir Sebelumnya
                  </span>
                )}
              </div>
            </div>

            {/* Modal Footer - Actions */}
            {selectedRegistration.status === 'pending' && (
              <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setShowRejectModal(true);
                  }}
                  className="flex-1 px-6 py-3 bg-[#FEE2E2] text-[#DC2626] rounded-xl font-bold hover:bg-[#FCA5A5] transition-colors"
                >
                  Tolak Pendaftaran
                </button>
                <button
                  onClick={() => {
                    setApprovalMessage('Selamat! Pendaftaran Anda telah disetujui. Kami tunggu kehadiran Anda di event.');
                    setShowDetailModal(false);
                    setShowApproveModal(true);
                  }}
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-xl font-bold hover:bg-[#1A2F51] transition-colors"
                >
                  Setujui Pendaftaran
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#ECFDF5] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#059669] text-2xl">check_circle</span>
                </div>
                <div>
                  <h3 className="text-lg font-['Archivo_Black'] text-[#243D68]">
                    Setujui Pendaftaran
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {selectedRegistration.alumniName}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Pesan Persetujuan *
                </label>
                <textarea
                  value={approvalMessage}
                  onChange={(e) => setApprovalMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#D6DCE8] rounded-lg focus:border-[#243D68] focus:ring-2 focus:ring-[#243D68]/20 outline-none transition-all resize-none"
                  placeholder="Tulis pesan sambutan untuk peserta yang diterima..."
                />
                <p className="text-xs text-[#6B7280] mt-1">
                  Pesan ini akan dikirim ke alumni via notifikasi
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowApproveModal(false);
                    setApprovalMessage('');
                    setSelectedRegistration(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-[#D6DCE8] rounded-xl font-bold text-[#6B7280] hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-6 py-3 bg-[#059669] text-white rounded-xl font-bold hover:bg-[#047857] transition-colors"
                >
                  Setujui
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#DC2626] text-2xl">cancel</span>
                </div>
                <div>
                  <h3 className="text-lg font-['Archivo_Black'] text-[#243D68]">
                    Tolak Pendaftaran
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {selectedRegistration.alumniName}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Alasan Penolakan *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#D6DCE8] rounded-lg focus:border-[#243D68] focus:ring-2 focus:ring-[#243D68]/20 outline-none transition-all resize-none"
                  placeholder="Berikan alasan penolakan yang jelas dan konstruktif..."
                />
                <p className="text-xs text-[#6B7280] mt-1">
                  Alasan ini akan dikirim ke alumni via notifikasi
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setSelectedRegistration(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-[#D6DCE8] rounded-xl font-bold text-[#6B7280] hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 px-6 py-3 bg-[#DC2626] text-white rounded-xl font-bold hover:bg-[#B91C1C] transition-colors"
                >
                  Tolak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
