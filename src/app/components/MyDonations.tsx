/**
 * MyDonations.tsx
 * Halaman riwayat donasi untuk user (Donatur/Alumni)
 * FASE 3D: Implementasi Resubmit Flow untuk donasi yang ditolak
 */

import { useState } from 'react';
import { ArrowLeft, Eye, Upload, Search, Filter, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { StatusBadge } from './ui/StatusBadge';
import type { Donation } from '@/types';
import { Logo } from './Logo';
import { showToast } from '@/utils/toast';
import { useTranslation } from '@/hooks/useTranslation';

interface MyDonationsProps {
  donations: Donation[];
  onBack: () => void;
  onViewDetail: (donation: Donation) => void;
  onResubmit: (donation: Donation) => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  activeNav?: string;
}

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

export function MyDonations({
  donations,
  onBack,
  onViewDetail,
  onResubmit,
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  activeNav = 'home',
}: MyDonationsProps) {
  const { t, language } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResubmitModal, setShowResubmitModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resubmitSuccess, setResubmitSuccess] = useState(false);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const filteredDonations = donations.filter((donation) => {
    const matchesFilter = filter === 'all' || donation.status === filter;
    const matchesSearch =
      searchQuery === '' ||
      donation.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: donations.length,
    pending: donations.filter((d) => d.status === 'pending').length,
    approved: donations.filter((d) => d.status === 'approved').length,
    rejected: donations.filter((d) => d.status === 'rejected').length,
    totalAmount: donations
      .filter((d) => d.status === 'approved')
      .reduce((sum, d) => sum + d.amount, 0),
  };

  // ── Resubmit Handlers ──────────────────────────────────────────────────────

  const handleResubmitClick = (donation: Donation) => {
    setSelectedDonation(donation);
    setUploadedFile(null);
    setUploadPreview(null);
    setResubmitSuccess(false);
    setShowResubmitModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast.error(t.toast.fileTooLarge);
      return;
    }
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast.error(language === 'id' ? 'Format file harus JPG, PNG, atau WEBP' : 'File format must be JPG, PNG, or WEBP');
      return;
    }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => setUploadPreview(evt.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleResubmitSubmit = () => {
    if (!uploadedFile) {
      showToast.error(language === 'id' ? 'Mohon upload bukti transfer baru' : 'Please upload new transfer proof');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setResubmitSuccess(true);
      if (selectedDonation) {
        onResubmit(selectedDonation);
      }
      showToast.success(language === 'id' ? 'Bukti transfer berhasil dikirim ulang! Menunggu verifikasi admin.' : 'Transfer proof resubmitted! Waiting for admin verification.');
    }, 1500);
  };

  const handleCloseResubmit = () => {
    setShowResubmitModal(false);
    setSelectedDonation(null);
    setUploadedFile(null);
    setUploadPreview(null);
    setResubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.common.back}
            </Button>
            <Logo />
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl pb-24 md:pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">{t.myDonationsPage.myDonations}</h1>
          <p className="text-[#6B7280]">{t.myDonationsPage.trackStatus}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-1">{t.myDonationsPage.totalDonations}</p>
            <p className="text-2xl font-bold text-[#0E1B33]">{stats.total}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm text-amber-800 mb-1">{t.myDonationsPage.waiting}</p>
            <p className="text-2xl font-bold text-amber-900">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-sm text-green-800 mb-1">{t.myDonationsPage.approved}</p>
            <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
          </div>
          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
            <p className="text-sm text-[#6B7280] mb-1">{t.myDonationsPage.totalDistributed}</p>
            <p className="text-sm font-bold text-[#243D68] truncate">{formatRupiah(stats.totalAmount)}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder={t.myDonationsPage.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#243D68] text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'pending', 'approved', 'rejected'] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filter === f
                      ? 'bg-[#243D68] text-white'
                      : 'bg-[#F8F9FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {f === 'all' ? t.myDonationsPage.all : f === 'pending' ? t.myDonationsPage.pending : f === 'approved' ? t.myDonationsPage.approvedFilter : t.myDonationsPage.rejectedFilter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Donations List */}
        {filteredDonations.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-10 h-10 text-[#9CA3AF]" />
            </div>
            <h3 className="font-semibold text-[#0E1B33] mb-2">{t.myDonationsPage.noDonationsFound}</h3>
            <p className="text-[#6B7280] text-sm">
              {searchQuery ? t.myDonationsPage.tryDifferentSearch : t.myDonationsPage.noDonationsYet}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDonations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-xl border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-[#0E1B33] mb-1">{donation.projectTitle}</h3>
                        <p className="text-xs text-[#9CA3AF] font-mono">Ref: {donation.referenceNumber}</p>
                      </div>
                      <StatusBadge status={donation.status} />
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div>
                        <span className="text-[#6B7280]">{t.myDonationsPage.nominal}: </span>
                        <span className="font-bold text-[#243D68]">{formatRupiah(donation.amount)}</span>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">{t.myDonationsPage.date}: </span>
                        <span className="text-[#0E1B33]">{formatDate(donation.submittedAt)}</span>
                      </div>
                      <div>
                        <span className="text-[#6B7280]">{t.myDonationsPage.method}: </span>
                        <span className="text-[#0E1B33]">{donation.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Rejection Banner */}
                    {donation.status === 'rejected' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-red-900 mb-0.5">{t.myDonationsPage.donationRejected}</p>
                            {donation.rejectionReason && (
                              <p className="text-xs text-red-700">{donation.rejectionReason}</p>
                            )}
                            <p className="text-xs text-red-600 mt-1">
                              {t.myDonationsPage.clickReupload}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Approval Banner */}
                    {donation.status === 'approved' && donation.verifiedAt && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <p className="text-xs text-green-700">
                          {t.myDonationsPage.verifiedOn} {formatDate(donation.verifiedAt)}
                          {donation.verifiedBy && ` ${t.myDonationsPage.by} ${donation.verifiedBy}`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => onViewDetail(donation)}
                      className="flex items-center gap-1.5 px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:border-[#243D68] hover:text-[#243D68] transition-colors text-sm font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      {t.myDonationsPage.detail}
                    </button>
                    {donation.status === 'rejected' && (
                      <button
                        onClick={() => handleResubmitClick(donation)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#243D68] text-white rounded-lg hover:bg-[#183A74] transition-colors text-sm font-semibold"
                      >
                        <Upload className="w-4 h-4" />
                        {t.myDonationsPage.reupload}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Resubmit Modal ── */}
      {showResubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <h3 className="font-['Archivo_Black'] text-lg uppercase text-[#0E1B33]">
                  {t.myDonationsPage.reuploadTitle}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1">{selectedDonation?.projectTitle}</p>
              </div>
              <button
                onClick={handleCloseResubmit}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Rejection Info */}
              {selectedDonation?.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">{t.myDonationsPage.previousRejectionReason}:</p>
                  <p className="text-sm text-red-800">{selectedDonation.rejectionReason}</p>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">{t.myDonationsPage.reuploadGuide}:</p>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>{t.myDonationsPage.guideItem1}</li>
                  <li>{t.myDonationsPage.guideItem2}</li>
                  <li>{t.myDonationsPage.guideItem3}</li>
                  <li>{t.myDonationsPage.guideItem4}</li>
                </ul>
              </div>

              {/* File Upload Area */}
              {!resubmitSuccess && (
                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                    {t.myDonationsPage.newProofTransfer} <span className="text-red-500">*</span>
                  </label>
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                    {uploadPreview ? (
                      <div className="relative w-full rounded-xl overflow-hidden border-2 border-[#243D68]">
                        <img
                          src={uploadPreview}
                          alt="Preview bukti transfer"
                          className="w-full object-contain max-h-52"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-semibold">{t.myDonationsPage.clickToChange}</p>
                        </div>
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {t.myDonationsPage.fileSelected}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-40 border-2 border-dashed border-[#D6DCE8] rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#243D68] hover:bg-blue-50 transition-colors">
                        <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-[#6B7280]" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-[#0E1B33]">{t.myDonationsPage.clickToUpload}</p>
                          <p className="text-xs text-[#9CA3AF]">JPG, PNG, WEBP • Maks 5MB</p>
                        </div>
                      </div>
                    )}
                  </label>
                  {uploadedFile && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                </div>
              )}

              {/* Success State */}
              {resubmitSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-900 mb-2">{t.myDonationsPage.successSent}</h4>
                  <p className="text-sm text-green-700">
                    {t.myDonationsPage.successSentDesc}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {resubmitSuccess ? (
                  <button
                    onClick={handleCloseResubmit}
                    className="w-full py-3 bg-[#243D68] text-white font-semibold rounded-xl hover:bg-[#183A74] transition-colors"
                  >
                    {t.myDonationsPage.close}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCloseResubmit}
                      className="flex-1 py-3 border border-[#E5E7EB] text-[#6B7280] font-semibold rounded-xl hover:bg-[#F8F9FA] transition-colors"
                    >
                      {t.myDonationsPage.cancel}
                    </button>
                    <button
                      onClick={handleResubmitSubmit}
                      disabled={isSubmitting || !uploadedFile}
                      className="flex-1 py-3 bg-[#243D68] hover:bg-[#183A74] disabled:opacity-50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t.myDonationsPage.sending}
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          {t.myDonationsPage.resend}
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-30">
        <div className="flex justify-around items-center h-16 px-4">
          <button
            onClick={onNavigateHome}
            className={`flex flex-col items-center gap-1 ${activeNav === 'home' ? 'text-[#243D68]' : 'text-[#6B7280]'}`}
          >
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-xs font-medium">{t.myDonationsPage.home}</span>
          </button>
          <button
            onClick={onNavigateExplore}
            className={`flex flex-col items-center gap-1 ${activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#6B7280]'}`}
          >
            <span className="material-symbols-outlined text-2xl">explore</span>
            <span className="text-xs font-medium">{t.myDonationsPage.explore}</span>
          </button>
          <button
            onClick={onNavigateMessages}
            className={`flex flex-col items-center gap-1 ${activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#6B7280]'}`}
          >
            <span className="material-symbols-outlined text-2xl">chat_bubble</span>
            <span className="text-xs font-medium">{t.myDonationsPage.messages}</span>
          </button>
          <button
            onClick={onNavigateSettings}
            className={`flex flex-col items-center gap-1 ${activeNav === 'settings' ? 'text-[#243D68]' : 'text-[#6B7280]'}`}
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
            <span className="text-xs font-medium">{t.myDonationsPage.settings}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}