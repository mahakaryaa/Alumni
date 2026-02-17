/**
 * Moderator Finance Overview Component
 * View all project finances for moderator role
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';

interface ModeratorFinanceProps {
  currentUser: AdminUser;
}

export function ModeratorFinance({ currentUser }: ModeratorFinanceProps) {
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const projects = [
    { id: 1, name: 'Qurban untuk Anak Yatim Gaza', totalDonation: 45000000, totalExpense: 12000000 },
    { id: 2, name: 'Pendidikan Guru Tahfidz Al Quran', totalDonation: 32000000, totalExpense: 8000000 },
    { id: 3, name: 'Bantuan Medis Rumah Sakit Gaza', totalDonation: 48000000, totalExpense: 15000000 },
  ];

  const allTransactions = [
    {
      id: '1',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      type: 'income',
      category: 'Donasi Reguler',
      amount: 5000000,
      from: 'Ahmad Rizki',
      date: '2025-02-10',
      time: '14:30',
      status: 'completed',
      description: 'Donasi untuk pembelian hewan qurban',
    },
    {
      id: '2',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      type: 'expense',
      category: 'Operasional',
      amount: 2500000,
      to: 'CV Berkah Ternak',
      date: '2025-02-09',
      time: '10:15',
      status: 'completed',
      description: 'Pembelian kambing 5 ekor',
    },
    {
      id: '3',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      type: 'income',
      category: 'Donasi Reguler',
      amount: 3000000,
      from: 'Siti Nurhaliza',
      date: '2025-02-08',
      time: '16:45',
      status: 'completed',
      description: 'Donasi untuk program tahfidz',
    },
    {
      id: '4',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      type: 'income',
      category: 'Donasi Urgent',
      amount: 10000000,
      from: 'PT Maju Bersama',
      date: '2025-02-07',
      time: '09:00',
      status: 'completed',
      description: 'Donasi untuk peralatan medis',
    },
    {
      id: '5',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      type: 'expense',
      category: 'Program Utama',
      amount: 8000000,
      to: 'Supplier Medical Equipment',
      date: '2025-02-06',
      time: '11:20',
      status: 'completed',
      description: 'Pembelian alat medis portable',
    },
    {
      id: '6',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      type: 'expense',
      category: 'Operasional',
      amount: 1500000,
      to: 'Percetakan Al-Quran',
      date: '2025-02-05',
      time: '13:30',
      status: 'completed',
      description: 'Cetak mushaf Al-Quran',
    },
  ];

  const filteredTransactions = allTransactions.filter(t => {
    if (selectedProject !== 'all' && t.projectId !== selectedProject) return false;
    if (filterType !== 'all' && t.type !== filterType) return false;
    return true;
  });

  const totalIncome = allTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = allTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-600 text-2xl">
              account_balance_wallet
            </span>
          </div>
          <div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
              Keuangan Project
            </h2>
            <p className="text-sm text-[#6B7280]">Monitor transaksi keuangan semua project</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">arrow_downward</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Pemasukan</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            Rp {(totalIncome / 1000000).toFixed(1)}jt
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600">arrow_upward</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Pengeluaran</span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            Rp {(totalExpense / 1000000).toFixed(1)}jt
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">savings</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Saldo Tersedia</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            Rp {((totalIncome - totalExpense) / 1000000).toFixed(1)}jt
          </p>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
            <h3 className="font-semibold text-[#0E1B33] mb-4 line-clamp-2">{project.name}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Donasi Masuk</span>
                <span className="font-semibold text-green-600">
                  +Rp {(project.totalDonation / 1000000).toFixed(0)}jt
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Pengeluaran</span>
                <span className="font-semibold text-red-600">
                  -Rp {(project.totalExpense / 1000000).toFixed(0)}jt
                </span>
              </div>
              <div className="pt-3 border-t border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#6B7280]">Saldo</span>
                  <span className="text-lg font-bold text-[#243D68]">
                    Rp {((project.totalDonation - project.totalExpense) / 1000000).toFixed(0)}jt
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-xl border border-[#E5E7EB]">
        {/* Filter Bar */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Filter Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem'
                }}
              >
                <option value="all">Semua Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Tipe Transaksi
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem'
                }}
              >
                <option value="all">Semua Transaksi</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-[#E5E7EB]">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#6B7280] text-3xl">
                  receipt_long
                </span>
              </div>
              <p className="text-[#6B7280]">Tidak ada transaksi ditemukan</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    transaction.type === 'income' 
                      ? 'bg-green-50' 
                      : 'bg-red-50'
                  }`}>
                    <span className={`material-symbols-outlined text-2xl ${
                      transaction.type === 'income' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? 'arrow_downward' : 'arrow_upward'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0E1B33] mb-1">
                          {transaction.category}
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-1">
                          {transaction.projectName}
                        </p>
                        <p className="text-xs text-[#9CA3AF]">
                          {transaction.type === 'income' ? 'Dari' : 'Kepada'}: {transaction.type === 'income' ? transaction.from : transaction.to}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === 'income' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}Rp {(transaction.amount / 1000000).toFixed(1)}jt
                        </p>
                        <p className="text-xs text-[#6B7280] mt-1">
                          {transaction.date} • {transaction.time}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#6B7280] bg-[#F8F9FA] px-3 py-2 rounded-lg">
                      {transaction.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}