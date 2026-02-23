/**
 * Withdrawal Request Component - PIC
 * Komponen untuk PIC request withdrawal dari project wallet
 */

import { useState } from 'react';
import { ArrowLeft, DollarSign, Building2, User, FileText, AlertCircle, Wallet } from 'lucide-react';
import { showToast } from '@/utils/toast';
import type { Withdrawal } from '@/types';

interface WithdrawalRequestProps {
  onBack?: () => void;
  picId: string;
  picName: string;
  projectId: string;
  projectTitle: string;
  availableBalance: number;
  onWithdrawalSubmit?: (withdrawal: Withdrawal) => void;
}

export function WithdrawalRequest({
  onBack,
  picId,
  picName,
  projectId,
  projectTitle,
  availableBalance,
  onWithdrawalSubmit
}: WithdrawalRequestProps) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [accountHolder, setAccountHolder] = useState(picName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Jumlah penarikan harus lebih dari 0';
    } else if (parseFloat(amount) > availableBalance) {
      newErrors.amount = `Saldo tidak mencukupi (Tersedia: Rp ${availableBalance.toLocaleString('id-ID')})`;
    }

    if (!reason.trim()) {
      newErrors.reason = 'Alasan penarikan wajib diisi';
    } else if (reason.trim().length < 20) {
      newErrors.reason = 'Alasan minimal 20 karakter untuk transparansi';
    }

    if (!bankName.trim()) {
      newErrors.bankName = 'Nama bank wajib diisi';
    }

    if (!bankAccount.trim()) {
      newErrors.bankAccount = 'Nomor rekening wajib diisi';
    } else if (!/^\d+$/.test(bankAccount)) {
      newErrors.bankAccount = 'Nomor rekening hanya boleh berisi angka';
    }

    if (!accountHolder.trim()) {
      newErrors.accountHolder = 'Nama pemilik rekening wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    setIsSubmitting(true);

    // Create withdrawal request
    const withdrawal: Withdrawal = {
      id: `withdrawal-${Date.now()}`,
      projectId,
      projectTitle,
      picId,
      picName,
      amount: parseFloat(amount),
      reason: reason.trim(),
      bankAccount: bankAccount.trim(),
      bankName: bankName.trim(),
      accountHolder: accountHolder.trim(),
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
      if (onWithdrawalSubmit) {
        onWithdrawalSubmit(withdrawal);
      }

      showToast.success('Permintaan penarikan berhasil dikirim ke Moderator untuk ditinjau');
      setIsSubmitting(false);

      // Reset form
      setAmount('');
      setReason('');
      setBankName('');
      setBankAccount('');
      setAccountHolder(picName);
      setErrors({});

      // Navigate back after short delay
      setTimeout(() => {
        if (onBack) onBack();
      }, 1500);
    }, 800);
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/\D/g, ''));
    return isNaN(num) ? '' : num.toString();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Permintaan Penarikan Dana</h1>
              <p className="text-sm text-gray-600 mt-0.5">{projectTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Saldo Tersedia</p>
              <p className="text-lg font-bold text-[#243D68]">
                Rp {availableBalance.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">Proses Persetujuan Bertahap</h3>
            <p className="text-sm text-blue-800">
              Permintaan penarikan akan melalui 2 tahap persetujuan: <span className="font-semibold">Moderator</span> → <span className="font-semibold">Superadmin</span>. 
              Proses ini memastikan transparansi dan akuntabilitas penggunaan dana project.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Penarikan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  Rp
                </div>
                <input
                  type="text"
                  value={amount ? parseFloat(amount).toLocaleString('id-ID') : ''}
                  onChange={(e) => setAmount(formatCurrency(e.target.value))}
                  placeholder="0"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-transparent ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
              )}
              {amount && parseFloat(amount) > 0 && parseFloat(amount) <= availableBalance && (
                <p className="text-sm text-green-600 mt-1">
                  Sisa saldo setelah penarikan: Rp {(availableBalance - parseFloat(amount)).toLocaleString('id-ID')}
                </p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alasan Penarikan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Jelaskan secara detail untuk apa dana ini akan digunakan (minimal 20 karakter)..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-transparent resize-none ${
                  errors.reason ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.reason ? (
                  <p className="text-sm text-red-600">{errors.reason}</p>
                ) : (
                  <p className="text-sm text-gray-500">{reason.length}/20 karakter minimum</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Informasi Rekening Tujuan
              </h3>
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Bank <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Contoh: Bank Mandiri, BCA, BNI"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-transparent ${
                    errors.bankName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.bankName && (
                <p className="text-sm text-red-600 mt-1">{errors.bankName}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nomor Rekening <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="1234567890"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-transparent ${
                    errors.bankAccount ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.bankAccount && (
                <p className="text-sm text-red-600 mt-1">{errors.bankAccount}</p>
              )}
            </div>

            {/* Account Holder */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Pemilik Rekening <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="Nama sesuai rekening bank"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-transparent ${
                    errors.accountHolder ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.accountHolder && (
                <p className="text-sm text-red-600 mt-1">{errors.accountHolder}</p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#243D68] text-white rounded-lg font-medium hover:bg-[#1a2d4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengirim...
                </>
              ) : (
                'Kirim Permintaan'
              )}
            </button>
          </div>
        </form>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Dengan mengirim permintaan ini, Anda menyetujui bahwa semua informasi yang diberikan adalah benar dan dapat dipertanggungjawabkan.
          </p>
        </div>
      </div>
    </div>
  );
}
