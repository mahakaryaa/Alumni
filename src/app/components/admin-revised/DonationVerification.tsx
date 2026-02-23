/**
 * Donation Verification Component
 * Untuk approve/reject donasi dan audit trail
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';
import { mockDonations } from '@/data/mockFinancialData';
import { showToast } from '@/utils/toast';
import type { Donation } from '@/types';

interface DonationVerificationProps {
  currentUser: AdminUser;
  // FASE 2: Props untuk global state dengan verification note
  donations?: Donation[];
  onApprove?: (donationId: string, verificationNote: string, verifiedBy: string) => void;
  onReject?: (donationId: string, reason: string, verifiedBy: string) => void;
}

type TabType = 'pending' | 'history';

export function DonationVerification({ 
  currentUser,
  donations = [],
  onApprove,
  onReject
}: DonationVerificationProps) {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [verificationNote, setVerificationNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // FASE 1: Use donations from props if available, otherwise use mock
  const allDonations = donations.length > 0 ? donations : mockDonations;

  // Filter donations
  const pendingDonations = allDonations.filter(d => d.status === 'pending');
  const verifiedDonations = allDonations.filter(d => 
    d.status === 'approved' || d.status === 'rejected'
  );

  const filteredPending = pendingDonations.filter(d => {
    const matchSearch = d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       d.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProject = selectedProject === 'all' || d.projectId === selectedProject;
    return matchSearch && matchProject;
  });

  const filteredHistory = verifiedDonations.filter(d => {
    const matchSearch = d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       d.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProject = selectedProject === 'all' || d.projectId === selectedProject;
    return matchSearch && matchProject;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // FASE 2: Handle approve dengan verification note
  const handleApprove = () => {
    if (!verificationNote.trim()) {
      showToast.error('Catatan verifikasi wajib diisi');
      return;
    }

    // Call parent callback with verification note
    if (onApprove && selectedDonation) {
      onApprove(selectedDonation.id, verificationNote, currentUser.id);
      showToast.success(`Donasi dari ${selectedDonation.donorName} sebesar ${formatCurrency(selectedDonation.amount)} telah disetujui!`);
    } else {
      // Fallback: Simulate approval (legacy)
      showToast.success(`Donasi dari ${selectedDonation.donorName} sebesar ${formatCurrency(selectedDonation.amount)} telah diapprove!`);
    }
    
    setShowApproveModal(false);
    setVerificationNote('');
    setSelectedDonation(null);
  };

  // FASE 2: Handle reject dengan rejection reason
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      showToast.error('Alasan penolakan wajib diisi');
      return;
    }

    // Call parent callback with rejection reason
    if (onReject && selectedDonation) {
      onReject(selectedDonation.id, rejectionReason, currentUser.id);
      showToast.warning(`Donasi dari ${selectedDonation.donorName} telah ditolak`);
    } else {
      // Fallback: Simulate rejection (legacy)
      showToast.error(`Donasi dari ${selectedDonation.donorName} telah ditolak`);
    }
    
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedDonation(null);
  };

  // Get unique projects
  const projects = Array.from(new Set(allDonations.map(d => ({
    id: d.projectId,
    title: d.projectTitle
  })).map(p => JSON.stringify(p)))).map(p => JSON.parse(p));

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-['Archivo_Black'] text-[#0E1B33] uppercase mb-2">
            Verifikasi Donasi
          </h1>
          <p className="text-[#6B7280]">
            Kelola approval dan penolakan donasi masuk
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg px-6 py-3">
            <p className="text-sm text-yellow-700 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-900">{pendingDonations.length}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg px-6 py-3">
            <p className="text-sm text-green-700 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-900">
              {verifiedDonations.filter(d => d.status === 'approved').length}
            </p>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg px-6 py-3">
            <p className="text-sm text-red-700 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-900">
              {verifiedDonations.filter(d => d.status === 'rejected').length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]">
        <div className="flex border-b border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'pending'
                ? 'text-[#243D68] border-b-2 border-[#243D68] bg-blue-50/50'
                : 'text-[#6B7280] hover:text-[#243D68] hover:bg-[#F8F9FA]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">pending_actions</span>
              <span>Pending Payment</span>
              {pendingDonations.length > 0 && (
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {pendingDonations.length}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-4 font-semibold transition-all ${
              activeTab === 'history'
                ? 'text-[#243D68] border-b-2 border-[#243D68] bg-blue-50/50'
                : 'text-[#6B7280] hover:text-[#243D68] hover:bg-[#F8F9FA]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">history</span>
              <span>Riwayat Verifikasi</span>
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 bg-[#F8F9FA] border-b border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Cari donatur atau project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243D68]"
                />
              </div>
            </div>

            {/* Project Filter */}
            <div className="md:w-64">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243D68]"
              >
                <option value="all">Semua Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Pending Payment Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {filteredPending.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[#9CA3AF] text-5xl">
                      check_circle
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0E1B33] mb-2">
                    Tidak Ada Pending Payment
                  </h3>
                  <p className="text-[#6B7280]">
                    Semua donasi telah diverifikasi
                  </p>
                </div>
              ) : (
                filteredPending.map((donation) => (
                  <div
                    key={donation.id}
                    className="bg-white border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-[#0E1B33]">
                            {donation.donorName}
                          </h3>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                            PENDING
                          </span>
                          {donation.isAnonymous && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                              ANONIM
                            </span>
                          )}
                        </div>
                        <p className="text-[#6B7280] mb-1">
                          <span className="font-semibold">Project:</span> {donation.projectTitle}
                        </p>
                        {donation.donorEmail && (
                          <p className="text-[#6B7280] mb-1">
                            <span className="font-semibold">Email:</span> {donation.donorEmail}
                          </p>
                        )}
                        {donation.donorPhone && (
                          <p className="text-[#6B7280] mb-1">
                            <span className="font-semibold">Phone:</span> {donation.donorPhone}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#243D68]">
                          {formatCurrency(donation.amount)}
                        </p>
                        <p className="text-sm text-[#6B7280] mt-1">
                          {formatDate(donation.submittedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-[#F8F9FA] rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#6B7280] mb-1">Metode Pembayaran</p>
                          <p className="font-semibold text-[#0E1B33]">
                            {donation.paymentMethod === 'bank_transfer' && 'Transfer Bank'}
                            {donation.paymentMethod === 'ewallet' && 'E-Wallet'}
                            {donation.paymentMethod === 'credit_card' && 'Kartu Kredit'}
                            {donation.paymentMethod === 'cash' && 'Tunai'}
                          </p>
                        </div>
                        {donation.bankName && (
                          <div>
                            <p className="text-sm text-[#6B7280] mb-1">Bank</p>
                            <p className="font-semibold text-[#0E1B33]">{donation.bankName}</p>
                          </div>
                        )}
                      </div>
                      {donation.message && (
                        <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                          <p className="text-sm text-[#6B7280] mb-1">Pesan Donatur</p>
                          <p className="text-[#0E1B33] italic">"{donation.message}"</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {donation.proofUrl && (
                        <button
                          onClick={() => {
                            setSelectedDonation(donation);
                            setShowProofModal(true);
                          }}
                          className="flex-1 px-6 py-3 bg-white border-2 border-[#243D68] text-[#243D68] rounded-lg hover:bg-[#243D68] hover:text-white transition-all font-semibold flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined">image</span>
                          Lihat Bukti Transfer
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedDonation(donation);
                          setShowApproveModal(true);
                        }}
                        className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">check_circle</span>
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDonation(donation);
                          setShowRejectModal(true);
                        }}
                        className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">cancel</span>
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Riwayat Verifikasi Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {filteredHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[#9CA3AF] text-5xl">
                      history
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0E1B33] mb-2">
                    Belum Ada Riwayat
                  </h3>
                  <p className="text-[#6B7280]">
                    Riwayat verifikasi akan muncul di sini
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Tanggal
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Donatur
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Project
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-[#0E1B33]">
                          Nominal
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-[#0E1B33]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Verifikator
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Catatan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map((donation) => (
                        <tr
                          key={donation.id}
                          className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors"
                        >
                          <td className="px-4 py-4 text-sm text-[#0E1B33]">
                            {new Date(donation.verifiedAt || donation.submittedAt).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                            <br />
                            <span className="text-xs text-[#9CA3AF]">
                              {new Date(donation.verifiedAt || donation.submittedAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-[#0E1B33]">
                              {donation.donorName}
                            </p>
                            <p className="text-xs text-[#6B7280]">
                              {donation.donorType === 'alumni' && 'Alumni'}
                              {donation.donorType === 'non_alumni' && 'Non-Alumni'}
                              {donation.donorType === 'anonymous' && 'Anonim'}
                            </p>
                          </td>
                          <td className="px-4 py-4 text-sm text-[#0E1B33]">
                            {donation.projectTitle}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <p className="font-bold text-[#243D68]">
                              {formatCurrency(donation.amount)}
                            </p>
                          </td>
                          <td className="px-4 py-4 text-center">
                            {donation.status === 'approved' ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                APPROVED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                <span className="material-symbols-outlined text-sm">cancel</span>
                                REJECTED
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-[#0E1B33]">
                            {currentUser.name}
                            <br />
                            <span className="text-xs text-[#9CA3AF]">Superadmin</span>
                          </td>
                          <td className="px-4 py-4 text-sm text-[#6B7280]">
                            {donation.status === 'approved' 
                              ? donation.verificationNote || 'Donasi terverifikasi'
                              : donation.rejectionReason || 'Tidak memenuhi syarat'
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-2xl">
                  check_circle
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0E1B33]">Approve Donasi</h2>
                <p className="text-[#6B7280]">Verifikasi dan approve pembayaran donasi</p>
              </div>
            </div>

            {/* Donation Summary */}
            <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Donatur</p>
                  <p className="font-semibold text-[#0E1B33]">{selectedDonation.donorName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Nominal</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(selectedDonation.amount)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#6B7280] mb-1">Project Tujuan</p>
                  <p className="font-semibold text-[#0E1B33]">{selectedDonation.projectTitle}</p>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Catatan Verifikasi <span className="text-red-600">*</span>
              </label>
              <textarea
                value={verificationNote}
                onChange={(e) => setVerificationNote(e.target.value)}
                placeholder="Contoh: Donasi terverifikasi. Bukti transfer valid. Dana akan masuk ke dompet project."
                rows={4}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-blue-600">info</span>
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-semibold mb-1">
                    Efek Setelah Approve:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Dana akan otomatis masuk ke dompet project</li>
                    <li>• Donatur akan menerima notifikasi email</li>
                    <li>• Transaksi akan tercatat di audit log</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  setVerificationNote('');
                  setSelectedDonation(null);
                }}
                className="flex-1 px-6 py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F8F9FA] transition-all font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">check_circle</span>
                Approve Donasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600 text-2xl">
                  cancel
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0E1B33]">Reject Donasi</h2>
                <p className="text-[#6B7280]">Tolak pembayaran donasi dengan alasan</p>
              </div>
            </div>

            {/* Donation Summary */}
            <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Donatur</p>
                  <p className="font-semibold text-[#0E1B33]">{selectedDonation.donorName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Nominal</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(selectedDonation.amount)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#6B7280] mb-1">Project Tujuan</p>
                  <p className="font-semibold text-[#0E1B33]">{selectedDonation.projectTitle}</p>
                </div>
              </div>
            </div>

            {/* Rejection Reason */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Alasan Penolakan <span className="text-red-600">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Contoh: Bukti transfer tidak jelas / Nominal tidak sesuai / Data donatur tidak valid"
                rows={4}
                className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-[#6B7280] mt-2">
                Alasan ini akan dikirimkan ke donatur melalui email
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-red-600">warning</span>
                <div className="flex-1">
                  <p className="text-sm text-red-900 font-semibold mb-1">
                    Perhatian!
                  </p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Dana tidak akan masuk ke dompet project</li>
                    <li>• Donatur akan menerima email penolakan dengan alasan</li>
                    <li>• Transaksi akan tercatat sebagai rejected di audit log</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedDonation(null);
                }}
                className="flex-1 px-6 py-3 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F8F9FA] transition-all font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">cancel</span>
                Reject Donasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proof Image Modal */}
      {showProofModal && selectedDonation && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                Bukti Transfer - {selectedDonation.donorName}
              </h2>
              <button
                onClick={() => {
                  setShowProofModal(false);
                  setSelectedDonation(null);
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              <img
                src={selectedDonation.proofUrl}
                alt="Bukti Transfer"
                className="w-full h-auto"
              />
            </div>
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-white">
                <div>
                  <p className="text-sm opacity-80 mb-1">Nominal</p>
                  <p className="text-xl font-bold">{formatCurrency(selectedDonation.amount)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">Metode</p>
                  <p className="font-semibold">
                    {selectedDonation.paymentMethod === 'bank_transfer' && 'Transfer Bank'}
                    {selectedDonation.paymentMethod === 'ewallet' && 'E-Wallet'}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">Bank</p>
                  <p className="font-semibold">{selectedDonation.bankName || '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
