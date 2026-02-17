/**
 * Wallet Management Component
 * Mengelola dompet per project dan withdrawal requests
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';
import {
  mockProjectWallets,
  mockWalletTransactions,
  mockWithdrawalRequests,
  getTotalWalletBalance,
} from '@/data/mockFinancialData';
import { showToast } from '@/utils/toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WalletManagementProps {
  currentUser: AdminUser;
}

export function WalletManagement({ currentUser }: WalletManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [approvalNote, setApprovalNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  // Filter wallets
  const filteredWallets = mockProjectWallets.filter(wallet =>
    wallet.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get pending withdrawals
  const pendingWithdrawals = mockWithdrawalRequests.filter(w => w.status === 'pending');

  // Calculate global stats
  const globalStats = {
    totalBalance: mockProjectWallets.reduce((sum, w) => sum + w.balance, 0),
    totalIncome: mockProjectWallets.reduce((sum, w) => sum + w.totalIncome, 0),
    totalExpense: mockProjectWallets.reduce((sum, w) => sum + w.totalExpense, 0),
    totalPending: mockProjectWallets.reduce((sum, w) => sum + w.totalPending, 0),
    pendingWithdrawals: pendingWithdrawals.length,
  };

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

  // Handle approve withdrawal
  const handleApproveWithdrawal = () => {
    if (!approvalNote.trim()) {
      showToast.error('Catatan approval wajib diisi');
      return;
    }

    showToast.success(`Withdrawal request sebesar ${formatCurrency(selectedWithdrawal.amount)} telah diapprove!`);
    setShowWithdrawalModal(false);
    setApprovalNote('');
    setSelectedWithdrawal(null);
  };

  // Handle reject withdrawal
  const handleRejectWithdrawal = () => {
    if (!rejectionReason.trim()) {
      showToast.error('Alasan penolakan wajib diisi');
      return;
    }

    showToast.error(`Withdrawal request telah ditolak`);
    setShowWithdrawalModal(false);
    setRejectionReason('');
    setSelectedWithdrawal(null);
  };

  // Get transactions for selected wallet
  const getWalletTransactions = (walletId: string) => {
    return mockWalletTransactions.filter(t => t.walletId === walletId);
  };

  // Prepare chart data
  const chartData = filteredWallets.map(wallet => ({
    name: wallet.projectTitle.length > 20 
      ? wallet.projectTitle.substring(0, 20) + '...' 
      : wallet.projectTitle,
    Income: wallet.totalIncome,
    Expense: wallet.totalExpense,
    Balance: wallet.balance,
  }));

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-['Archivo_Black'] text-[#0E1B33] uppercase mb-2">
            Manajemen Dompet Project
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Kelola saldo dan transaksi dompet setiap project
          </p>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">account_balance_wallet</span>
            <p className="text-xs sm:text-sm opacity-80 sm:hidden">Total Saldo</p>
          </div>
          <p className="text-xs sm:text-sm opacity-80 mb-1 hidden sm:block">Total Saldo Dompet</p>
          <p className="text-xl sm:text-2xl font-bold break-words">{formatCurrency(globalStats.totalBalance)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">arrow_downward</span>
            <p className="text-xs sm:text-sm opacity-80 sm:hidden">Income</p>
          </div>
          <p className="text-xs sm:text-sm opacity-80 mb-1 hidden sm:block">Total Income</p>
          <p className="text-xl sm:text-2xl font-bold break-words">{formatCurrency(globalStats.totalIncome)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">arrow_upward</span>
            <p className="text-xs sm:text-sm opacity-80 sm:hidden">Expense</p>
          </div>
          <p className="text-xs sm:text-sm opacity-80 mb-1 hidden sm:block">Total Expense</p>
          <p className="text-xl sm:text-2xl font-bold break-words">{formatCurrency(globalStats.totalExpense)}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">pending</span>
            <p className="text-xs sm:text-sm opacity-80 sm:hidden">Pending</p>
          </div>
          <p className="text-xs sm:text-sm opacity-80 mb-1 hidden sm:block">Donasi Pending</p>
          <p className="text-xl sm:text-2xl font-bold break-words">{formatCurrency(globalStats.totalPending)}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">request_quote</span>
            <p className="text-xs sm:text-sm opacity-80 sm:hidden">Withdrawals</p>
          </div>
          <p className="text-xs sm:text-sm opacity-80 mb-1 hidden sm:block">Pending Withdrawals</p>
          <p className="text-2xl sm:text-3xl font-bold">{globalStats.pendingWithdrawals}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#E5E7EB]">
        <h2 className="text-lg sm:text-xl font-bold text-[#0E1B33] mb-4 sm:mb-6">
          Overview Keuangan Per Project
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[500px] px-4 sm:px-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  style={{ fontSize: '10px' }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#6B7280"
                  style={{ fontSize: '10px' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Income" fill="#10B981" name="Income" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expense" fill="#EF4444" name="Expense" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Balance" fill="#243D68" name="Balance" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="text-xs text-[#6B7280] mt-2 sm:hidden text-center">
          💡 Swipe untuk melihat semua data
        </p>
      </div>

      {/* Pending Withdrawals Section */}
      {pendingWithdrawals.length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 sm:p-6 border-2 border-orange-300">
          <div className="flex items-start gap-3 mb-4">
            <span className="material-symbols-outlined text-orange-600 text-2xl sm:text-3xl flex-shrink-0">
              notifications_active
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-orange-900">
                Pending Withdrawal Requests
              </h2>
              <p className="text-xs sm:text-sm text-orange-700">
                {pendingWithdrawals.length} permintaan menunggu approval
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingWithdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="bg-white rounded-lg p-4 sm:p-5 border-2 border-orange-200 hover:border-orange-400 transition-all"
              >
                <div className="space-y-3 mb-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#0E1B33] break-words">
                          {withdrawal.projectTitle}
                        </h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full whitespace-nowrap">
                          PENDING
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6B7280] mb-1">
                        <span className="font-semibold">PIC:</span> {withdrawal.picName}
                      </p>
                      <p className="text-xs sm:text-sm text-[#6B7280] mb-1 break-words">
                        <span className="font-semibold">Tujuan:</span> {withdrawal.purpose}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        {formatDate(withdrawal.requestedAt)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl sm:text-3xl font-bold text-orange-600 break-words">
                        {formatCurrency(withdrawal.amount)}
                      </p>
                    </div>
                  </div>

                  {/* Bank Info */}
                  <div className="bg-[#F8F9FA] rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div>
                        <p className="text-[#6B7280] mb-1">Bank</p>
                        <p className="font-semibold text-[#0E1B33]">{withdrawal.bankName}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] mb-1">No. Rekening</p>
                        <p className="font-semibold text-[#0E1B33] break-all">{withdrawal.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] mb-1">Nama Penerima</p>
                        <p className="font-semibold text-[#0E1B33] break-words">{withdrawal.accountName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      setSelectedWithdrawal(withdrawal);
                      setShowWithdrawalModal(true);
                    }}
                    className="w-full sm:flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedWithdrawal(withdrawal);
                      setShowWithdrawalModal(true);
                    }}
                    className="w-full sm:flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined text-base">cancel</span>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#E5E7EB]">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243D68]"
          />
        </div>
      </div>

      {/* Wallet List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredWallets.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border-2 border-[#E5E7EB] hover:border-[#243D68] hover:shadow-lg transition-all cursor-pointer"
            onClick={() => {
              setSelectedWallet(wallet);
              setShowDetailModal(true);
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#0E1B33] mb-2 break-words">
                  {wallet.projectTitle}
                </h3>
                <p className="text-xs text-[#9CA3AF]">
                  ID: {wallet.id}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#243D68] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-xl sm:text-2xl">
                  account_balance_wallet
                </span>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-white text-xs sm:text-sm opacity-80 mb-1">Current Balance</p>
              <p className="text-white text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(wallet.balance)}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-green-50 rounded-lg p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="material-symbols-outlined text-green-600 text-sm">
                    arrow_downward
                  </span>
                  <p className="text-xs text-green-700 font-semibold">Income</p>
                </div>
                <p className="text-base sm:text-lg font-bold text-green-800 break-words">
                  {formatCurrency(wallet.totalIncome)}
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="material-symbols-outlined text-red-600 text-sm">
                    arrow_upward
                  </span>
                  <p className="text-xs text-red-700 font-semibold">Expense</p>
                </div>
                <p className="text-base sm:text-lg font-bold text-red-800 break-words">
                  {formatCurrency(wallet.totalExpense)}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs sm:text-sm mb-3 sm:mb-4">
              <div>
                <p className="text-[#6B7280] mb-1">Pending</p>
                <p className="font-semibold text-yellow-600 break-words">
                  {formatCurrency(wallet.totalPending)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#6B7280] mb-1">Last Transaction</p>
                <p className="font-semibold text-[#0E1B33]">
                  {wallet.lastTransactionAt
                    ? new Date(wallet.lastTransactionAt).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                      })
                    : '-'}
                </p>
              </div>
            </div>

            {/* View Details Button */}
            <button className="w-full px-4 py-2.5 bg-[#F8F9FA] text-[#243D68] rounded-lg hover:bg-[#243D68] hover:text-white transition-all font-semibold flex items-center justify-center gap-2 text-sm">
              <span className="material-symbols-outlined text-base">visibility</span>
              Lihat Detail Transaksi
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWallets.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[#9CA3AF] text-5xl">
              account_balance_wallet
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#0E1B33] mb-2">
            Tidak Ada Dompet Ditemukan
          </h3>
          <p className="text-[#6B7280]">Coba ubah kata kunci pencarian</p>
        </div>
      )}

      {/* Wallet Detail Modal */}
      {showDetailModal && selectedWallet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-br from-[#243D68] to-[#1a2d4d] text-white p-4 sm:p-6 rounded-t-xl z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold mb-1 break-words">
                    Detail Dompet Project
                  </h2>
                  <p className="text-xs sm:text-sm opacity-80 break-words">{selectedWallet.projectTitle}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedWallet(null);
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Balance Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-lg p-3 sm:p-4 text-white">
                  <p className="text-xs sm:text-sm opacity-80 mb-1">Balance</p>
                  <p className="text-lg sm:text-2xl font-bold break-words">{formatCurrency(selectedWallet.balance)}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-green-700 mb-1">Income</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-800 break-words">
                    {formatCurrency(selectedWallet.totalIncome)}
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-red-700 mb-1">Expense</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-800 break-words">
                    {formatCurrency(selectedWallet.totalExpense)}
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-yellow-700 mb-1">Pending</p>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-800 break-words">
                    {formatCurrency(selectedWallet.totalPending)}
                  </p>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0E1B33] mb-3 sm:mb-4">
                  Riwayat Transaksi
                </h3>

                {/* Mobile: Card View */}
                <div className="md:hidden space-y-3">
                  {getWalletTransactions(selectedWallet.id).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-white border-2 border-[#E5E7EB] rounded-lg p-3 hover:border-[#243D68] transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          {transaction.type === 'income' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                              <span className="material-symbols-outlined text-xs">arrow_downward</span>
                              Income
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                              <span className="material-symbols-outlined text-xs">arrow_upward</span>
                              Expense
                            </span>
                          )}
                          <p className="text-xs text-[#9CA3AF] mt-1">
                            {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                            {' • '}
                            {new Date(transaction.createdAt).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold break-words ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-sm text-[#0E1B33] break-words">{transaction.source}</p>
                        {transaction.createdByName && (
                          <p className="text-xs text-[#6B7280]">by {transaction.createdByName}</p>
                        )}
                        <p className="text-xs text-[#6B7280] break-words">{transaction.description}</p>
                        <div className="pt-2 mt-2 border-t border-[#E5E7EB]">
                          <p className="text-xs text-[#6B7280]">Saldo Akhir</p>
                          <p className="text-sm font-bold text-[#243D68]">
                            {formatCurrency(transaction.balanceAfter)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F8F9FA] border-b border-[#E5E7EB]">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Tanggal
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Tipe
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Sumber/Tujuan
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#0E1B33]">
                          Deskripsi
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-[#0E1B33]">
                          Nominal
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-[#0E1B33]">
                          Saldo Akhir
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getWalletTransactions(selectedWallet.id).map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-[#E5E7EB] hover:bg-[#F8F9FA] transition-colors"
                        >
                          <td className="px-4 py-4 text-sm">
                            {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                            <br />
                            <span className="text-xs text-[#9CA3AF]">
                              {new Date(transaction.createdAt).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {transaction.type === 'income' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                <span className="material-symbols-outlined text-xs">arrow_downward</span>
                                Income
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                <span className="material-symbols-outlined text-xs">arrow_upward</span>
                                Expense
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-[#0E1B33]">{transaction.source}</p>
                            {transaction.createdByName && (
                              <p className="text-xs text-[#6B7280]">by {transaction.createdByName}</p>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-[#6B7280]">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <p
                              className={`font-bold ${
                                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {transaction.type === 'income' ? '+' : '-'}
                              {formatCurrency(transaction.amount)}
                            </p>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <p className="font-semibold text-[#243D68]">
                              {formatCurrency(transaction.balanceAfter)}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {getWalletTransactions(selectedWallet.id).length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="material-symbols-outlined text-[#9CA3AF] text-3xl">
                        receipt_long
                      </span>
                    </div>
                    <p className="text-[#6B7280]">Belum ada transaksi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Approval Modal */}
      {showWithdrawalModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-4 sm:p-8 my-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-orange-600 text-2xl">
                  request_quote
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-[#0E1B33]">Withdrawal Request</h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">Approve atau reject permintaan penarikan dana</p>
              </div>
            </div>

            {/* Request Summary */}
            <div className="bg-[#F8F9FA] rounded-lg p-4 sm:p-6 mb-6 space-y-4">
              {/* Project & PIC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-[#6B7280] mb-1">Project</p>
                  <p className="font-semibold text-sm sm:text-base text-[#0E1B33] break-words">
                    {selectedWithdrawal.projectTitle}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-[#6B7280] mb-1">PIC</p>
                  <p className="font-semibold text-sm sm:text-base text-[#0E1B33]">
                    {selectedWithdrawal.picName}
                  </p>
                </div>
              </div>

              {/* Nominal & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-[#6B7280] mb-1">Nominal</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600 break-words">
                    {formatCurrency(selectedWithdrawal.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-[#6B7280] mb-1">Tanggal Pengajuan</p>
                  <p className="font-semibold text-sm sm:text-base text-[#0E1B33]">
                    {new Date(selectedWithdrawal.requestedAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Tujuan Penarikan */}
              <div>
                <p className="text-xs sm:text-sm text-[#6B7280] mb-1">Tujuan Penarikan</p>
                <p className="font-semibold text-sm sm:text-base text-[#0E1B33] break-words">
                  {selectedWithdrawal.purpose}
                </p>
              </div>

              {/* Rekening Tujuan */}
              <div>
                <p className="text-xs sm:text-sm text-[#6B7280] mb-3 font-semibold">Rekening Tujuan</p>
                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-3">
                  <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Bank</p>
                    <p className="font-bold text-sm text-[#0E1B33]">{selectedWithdrawal.bankName}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">No. Rekening</p>
                    <p className="font-bold text-sm text-[#0E1B33] break-all">
                      {selectedWithdrawal.accountNumber}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                    <p className="text-xs text-[#6B7280] mb-1">Nama Penerima</p>
                    <p className="font-bold text-sm text-[#0E1B33] break-words">
                      {selectedWithdrawal.accountName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Form */}
            <div className="mb-6">
              <label className="block text-xs sm:text-sm font-semibold text-[#0E1B33] mb-2">
                Catatan (opsional untuk approve, wajib untuk reject)
              </label>
              <textarea
                value={approvalNote || rejectionReason}
                onChange={(e) => {
                  setApprovalNote(e.target.value);
                  setRejectionReason(e.target.value);
                }}
                placeholder="Contoh: Dana telah ditransfer / Saldo tidak mencukupi"
                rows={3}
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#243D68] text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowWithdrawalModal(false);
                  setSelectedWithdrawal(null);
                  setApprovalNote('');
                  setRejectionReason('');
                }}
                className="w-full sm:flex-1 px-6 py-3 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F8F9FA] transition-all font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleRejectWithdrawal}
                className="w-full sm:flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">cancel</span>
                Reject
              </button>
              <button
                onClick={handleApproveWithdrawal}
                className="w-full sm:flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}