import { ArrowLeft, CheckCircle2, Clock, Copy, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { StatusBadgeLarge } from './ui/StatusBadge';
import type { Donation } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

interface DonationSuccessProps {
  donation: Donation;
  onViewDonations: () => void;
  onBackToHome: () => void;
  onBackToProject: () => void;
}

export function DonationSuccess({
  donation,
  onViewDonations,
  onBackToHome,
  onBackToProject,
}: DonationSuccessProps) {
  const [copied, setCopied] = useState(false);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Nomor referensi berhasil disalin');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={onBackToHome}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Beranda
            </Button>
            <h1 className="font-['Archivo_Black'] text-lg text-primary">ALMAQDISI PROJECT</h1>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Icon & Status Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-50 rounded-full mb-4">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
            <StatusBadgeLarge status="pending" className="mb-4" />
          </div>

          {/* Main Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Menunggu Verifikasi
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Terima kasih! Bukti transfer Anda telah kami terima dan sedang dalam proses verifikasi oleh tim kami.
            </p>
          </div>

          {/* Donation Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">Nomor Referensi</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary">{donation.referenceNumber}</span>
                <button
                  onClick={() => handleCopy(donation.referenceNumber)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Salin nomor referensi"
                >
                  <Copy className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Project</span>
                <span className="font-semibold text-gray-900">{donation.projectTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Nominal Donasi</span>
                <span className="font-bold text-lg text-primary">{formatRupiah(donation.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tanggal Submit</span>
                <span className="text-sm text-gray-900">
                  {new Date(donation.submittedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Estimasi Waktu */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-8">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 text-sm mb-1">Estimasi Waktu Verifikasi</p>
                <p className="text-blue-700 text-xs">
                  Proses verifikasi biasanya memakan waktu 1-2 hari kerja. Kami akan memberi tahu Anda segera setelah donasi diverifikasi.
                </p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-900 font-semibold mb-2">⚠️ Harap Simpan Nomor Referensi</p>
            <p className="text-xs text-yellow-800">
              Nomor referensi ini diperlukan untuk melacak status donasi Anda. Simpan nomor ini dengan baik atau screenshot halaman ini.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onViewDonations}
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Lihat Status Donasi
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onBackToProject}
                variant="outline"
                className="h-11"
              >
                Kembali ke Project
              </Button>
              <Button
                onClick={onBackToHome}
                variant="outline"
                className="h-11"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Explore Project Lain
              </Button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Ada pertanyaan? Hubungi kami di{' '}
          <a href="mailto:support@almaqdisi.org" className="text-primary hover:underline">
            support@almaqdisi.org
          </a>
        </p>
      </main>
    </div>
  );
}
