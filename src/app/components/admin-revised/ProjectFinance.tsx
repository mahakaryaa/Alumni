/**
 * Project Finance Component
 * PIC can manage project finances (donations, expenses, balance)
 */

import { useState } from 'react';
import { AdminUser, FinanceTransaction, TransactionType, ExpenseCategory } from '@/types/admin-revised';
import { getProjectFinanceTransactions } from '@/data/mockAdminDataRevised';
import { showToast } from '@/utils/toast';

interface ProjectFinanceProps {
  currentUser: AdminUser;
  projectId: string;
}

export function ProjectFinance({ currentUser, projectId }: ProjectFinanceProps) {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>(
    getProjectFinanceTransactions(projectId)
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');

  // Form states for adding transaction
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('operational');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate totals
  const danaUmum = transactions
    .filter((t) => t.type === 'donation' && t.source !== 'member_payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const danaInternal = transactions
    .filter((t) => t.type === 'donation' && t.source === 'member_payment')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDana = danaUmum + danaInternal;

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalDana - totalExpenses;

  // Group expenses by category
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const cat = t.category || 'other';
      acc[cat] = (acc[cat] || 0) + t.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

  const handleAddTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      showToast.error('Amount harus lebih dari 0');
      return;
    }

    if (!description.trim()) {
      showToast.error('Deskripsi harus diisi');
      return;
    }

    const newTransaction: FinanceTransaction = {
      id: `txn-${Date.now()}`,
      projectId,
      type: transactionType,
      amount: parseFloat(amount),
      category: transactionType === 'expense' ? category : undefined,
      description,
      notes,
      date: selectedDate,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    setTransactions([newTransaction, ...transactions]);
    showToast.success(`Transaksi ${transactionType === 'donation' ? 'Donasi' : 'Pengeluaran'} berhasil ditambahkan`);

    // Reset form
    setAmount('');
    setDescription('');
    setNotes('');
    setCategory('operational');
    setShowAddModal(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryLabel = (cat: ExpenseCategory) => {
    const labels: Record<ExpenseCategory, string> = {
      operational: 'Operasional',
      distribution: 'Distribusi Bantuan',
      marketing: 'Marketing & Promosi',
      admin: 'Administrasi',
      equipment: 'Peralatan',
      other: 'Lainnya',
    };
    return labels[cat];
  };

  const getCategoryColor = (cat: ExpenseCategory) => {
    const colors: Record<ExpenseCategory, string> = {
      operational: 'bg-blue-100 text-blue-800',
      distribution: 'bg-green-100 text-green-800',
      marketing: 'bg-purple-100 text-purple-800',
      admin: 'bg-orange-100 text-orange-800',
      equipment: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[cat];
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
            Keuangan Project
          </h1>
          <p className="text-[#6B7280]">Kelola dana dan pengeluaran project</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
          Tambah Transaksi
        </button>
      </div>

      {/* Finance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Dana Umum</span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(danaUmum)}</p>
          <p className="text-sm text-green-100">Dari donatur publik</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl">group</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Dana Internal</span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(danaInternal)}</p>
          <p className="text-sm text-blue-100">Dari member project</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl">receipt_long</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Pengeluaran</span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(totalExpenses)}</p>
          <p className="text-sm text-red-100">Total expenses</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-3xl">savings</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Saldo</span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(balance)}</p>
          <p className="text-sm text-purple-100">Dana tersedia</p>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] mb-6">
        <h3 className="font-semibold text-lg text-[#0E1B33] mb-4">Pengeluaran per Kategori</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(expensesByCategory).map(([cat, amount]) => (
            <div key={cat} className="p-4 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(cat as ExpenseCategory)}`}>
                  {getCategoryLabel(cat as ExpenseCategory)}
                </span>
              </div>
              <p className="text-xl font-bold text-[#0E1B33]">{formatCurrency(amount)}</p>
              <p className="text-xs text-[#6B7280] mt-1">
                {((amount / totalExpenses) * 100).toFixed(1)}% dari total
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden">
        <div className="px-6 py-4 bg-[#F8F9FA] border-b-2 border-[#E5E7EB]">
          <h3 className="font-semibold text-lg text-[#0E1B33]">Riwayat Transaksi</h3>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {transactions.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#6B7280]">Belum ada transaksi</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'donation' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined ${
                          transaction.type === 'donation' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'donation' ? 'arrow_downward' : 'arrow_upward'}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#0E1B33]">{transaction.description}</h4>
                        {transaction.category && (
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(transaction.category)}`}>
                            {getCategoryLabel(transaction.category)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          {new Date(transaction.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        {transaction.donorName && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">person</span>
                            {transaction.donorName}
                          </span>
                        )}
                        {transaction.memberName && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">group</span>
                            {transaction.memberName}
                          </span>
                        )}
                      </div>

                      {transaction.notes && (
                        <p className="text-sm text-[#6B7280] mt-2 italic">{transaction.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        transaction.type === 'donation' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'donation' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-[#0E1B33]">Tambah Transaksi</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Tipe Transaksi <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTransactionType('donation')}
                    className={`p-4 rounded-lg border-2 font-semibold transition-colors ${
                      transactionType === 'donation'
                        ? 'border-green-600 bg-green-50 text-green-900'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#243D68]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl mb-2">arrow_downward</span>
                    <p>Donasi / Income</p>
                  </button>
                  <button
                    onClick={() => setTransactionType('expense')}
                    className={`p-4 rounded-lg border-2 font-semibold transition-colors ${
                      transactionType === 'expense'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#243D68]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl mb-2">arrow_upward</span>
                    <p>Pengeluaran</p>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Jumlah (Rp) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-xl font-bold"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Tanggal <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                />
              </div>

              {/* Category (for expenses) */}
              {transactionType === 'expense' && (
                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                    Kategori <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                    className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                  >
                    <option value="operational">Operasional</option>
                    <option value="distribution">Distribusi Bantuan</option>
                    <option value="marketing">Marketing & Promosi</option>
                    <option value="admin">Administrasi</option>
                    <option value="equipment">Peralatan</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Deskripsi <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contoh: Pembelian alat tulis untuk anak-anak Gaza"
                  className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Catatan (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tambahkan catatan tambahan..."
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddTransaction}
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  ✅ Tambah Transaksi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
