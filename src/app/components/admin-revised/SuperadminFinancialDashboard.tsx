/**
 * Superadmin Financial Dashboard Component
 * Global financial overview for all projects
 */

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  mockFinancialDashboardStats,
  mockTopProjectsByDonation,
  mockMonthlyDonationTrends,
  mockDonations,
  mockWalletTransactions,
} from '@/data/mockFinancialData';

export function SuperadminFinancialDashboard() {
  const [timeRange, setTimeRange] = useState<'6months' | '1year' | 'all'>('6months');

  const stats = mockFinancialDashboardStats;
  const topProjects = mockTopProjectsByDonation;
  const trends = mockMonthlyDonationTrends;
  const recentDonations = mockDonations.slice(0, 5);
  const recentTransactions = mockWalletTransactions.slice(0, 5);

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
      month: 'short',
      year: 'numeric',
    });
  };

  // Stats Cards Data
  const statsCards = [
    {
      title: 'Total Donasi (All Time)',
      value: formatCurrency(stats.totalDonationsAllTime),
      icon: 'payments',
      bgColor: 'bg-gradient-to-br from-[#243D68] to-[#1a2d4d]',
      trend: `+${stats.growthPercentage}%`,
      trendLabel: 'vs bulan lalu',
    },
    {
      title: 'Donasi Pending',
      value: formatCurrency(stats.totalDonationsPending),
      icon: 'pending_actions',
      bgColor: 'bg-gradient-to-br from-[#FAC06E] to-[#f5b355]',
      count: stats.pendingPayments,
      countLabel: 'pembayaran menunggu',
    },
    {
      title: 'Donasi Rejected',
      value: formatCurrency(stats.totalDonationsRejected),
      icon: 'cancel',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      info: 'Perlu follow up',
    },
    {
      title: 'Total Saldo Dompet',
      value: formatCurrency(stats.totalWalletBalance),
      icon: 'account_balance_wallet',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      subValue: `${stats.totalActiveProjects} project aktif`,
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-['Archivo_Black'] text-[#0E1B33] uppercase mb-2">
            Financial Dashboard
          </h1>
          <p className="text-[#6B7280]">
            Global financial overview untuk seluruh project AlMaqdisi
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['6months', '1year', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                timeRange === range
                  ? 'bg-[#243D68] text-white'
                  : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#243D68]'
              }`}
            >
              {range === '6months' && '6 Bulan'}
              {range === '1year' && '1 Tahun'}
              {range === 'all' && 'Semua'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="material-symbols-outlined text-4xl opacity-80">
                {card.icon}
              </span>
              {card.trend && (
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                  {card.trend}
                </div>
              )}
            </div>
            <h3 className="text-sm opacity-90 mb-2">{card.title}</h3>
            <p className="text-2xl font-bold mb-2">{card.value}</p>
            {card.trendLabel && (
              <p className="text-xs opacity-80">{card.trendLabel}</p>
            )}
            {card.count !== undefined && (
              <p className="text-xs opacity-80">
                {card.count} {card.countLabel}
              </p>
            )}
            {card.info && <p className="text-xs opacity-80">{card.info}</p>}
            {card.subValue && <p className="text-xs opacity-80">{card.subValue}</p>}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Donation Trend Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#0E1B33] mb-1">
                  Trend Donasi Bulanan
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Total donasi per bulan (6 bulan terakhir)
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Total Donasi']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalDonations"
                  stroke="#243D68"
                  strokeWidth={3}
                  name="Total Donasi"
                  dot={{ fill: '#243D68', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Projects by Donation - Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#0E1B33] mb-1">
                Top Project by Donation
              </h2>
              <p className="text-sm text-[#6B7280]">
                Project dengan total donasi tertinggi
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProjects} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  type="number"
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
                />
                <YAxis
                  type="category"
                  dataKey="projectTitle"
                  stroke="#6B7280"
                  style={{ fontSize: '11px' }}
                  width={150}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), 'Total Donasi']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="totalDonations" fill="#FAC06E" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Wallet Transactions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0E1B33]">
                Transaksi Dompet Terbaru
              </h2>
              <button className="text-sm text-[#243D68] font-semibold hover:underline">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? 'arrow_downward' : 'arrow_upward'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#0E1B33]">
                        {transaction.source}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-[#9CA3AF] mt-1">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Lists */}
        <div className="space-y-6">
          {/* Donor Statistics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <h2 className="text-xl font-bold text-[#0E1B33] mb-4">
              Statistik Donatur
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">
                      group
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Total Donatur</p>
                    <p className="text-2xl font-bold text-[#0E1B33]">
                      {stats.totalDonors}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FAC06E] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">
                      school
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Alumni Donatur</p>
                    <p className="text-2xl font-bold text-[#0E1B33]">
                      {stats.totalAlumniDonors}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">
                      public
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Non-Alumni Donatur</p>
                    <p className="text-2xl font-bold text-[#0E1B33]">
                      {stats.totalNonAlumniDonors}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-red-600 text-2xl">
                notifications_active
              </span>
              <h2 className="text-xl font-bold text-red-900">
                Pending Actions
              </h2>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0E1B33]">
                      Pending Payments
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      Menunggu verifikasi
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-red-600">
                      {stats.pendingPayments}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#0E1B33]">
                      Pending Withdrawals
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      Permintaan penarikan dana
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-600">
                      {stats.pendingWithdrawals}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0E1B33]">
                Donasi Terbaru
              </h2>
              <button className="text-sm text-[#243D68] font-semibold hover:underline">
                Lihat Semua
              </button>
            </div>

            <div className="space-y-3">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="p-4 bg-[#F8F9FA] rounded-lg hover:bg-[#E5E7EB] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-[#0E1B33]">
                      {donation.donorName}
                    </p>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : donation.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {donation.status === 'pending' && 'Pending'}
                      {donation.status === 'approved' && 'Approved'}
                      {donation.status === 'rejected' && 'Rejected'}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">
                    {donation.projectTitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#243D68]">
                      {formatCurrency(donation.amount)}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {formatDate(donation.submittedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
