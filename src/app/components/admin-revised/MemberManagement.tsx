/**
 * Member Management Component
 * PIC can view, edit, and manage project members
 */

import { useState } from 'react';
import { AdminUser, ProjectMember, MemberStatus } from '@/types/admin-revised';
import { getProjectMembers } from '@/data/mockAdminDataRevised';
import { getCommitmentDisplay, getRatingStars } from '@/utils/adminPermissions';
import { showToast } from '@/utils/toast';

interface MemberManagementProps {
  currentUser: AdminUser;
  projectId: string;
}

export function MemberManagement({ currentUser, projectId }: MemberManagementProps) {
  const [members, setMembers] = useState<ProjectMember[]>(getProjectMembers(projectId));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<MemberStatus | 'all'>('all');
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(null);
  const [showKickModal, setShowKickModal] = useState(false);
  const [kickReason, setKickReason] = useState('');

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.alumniName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.alumniEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeMembers = members.filter((m) => m.status === 'active').length;
  const inactiveMembers = members.filter((m) => m.status === 'inactive').length;
  const suspendedMembers = members.filter((m) => m.status === 'suspended').length;

  const handleKickMember = (member: ProjectMember) => {
    setSelectedMember(member);
    setKickReason('');
    setShowKickModal(true);
  };

  const confirmKickMember = () => {
    if (!selectedMember || !kickReason.trim()) {
      showToast.error('Alasan kick harus diisi');
      return;
    }

    // Update member status
    const updatedMembers = members.map((m) =>
      m.id === selectedMember.id
        ? { ...m, status: 'suspended' as MemberStatus, kickReason, kickedAt: new Date().toISOString() }
        : m
    );
    setMembers(updatedMembers);

    showToast.success(`${selectedMember.alumniName} berhasil di-kick dari project`);
    setShowKickModal(false);
    setSelectedMember(null);
    setKickReason('');
  };

  const handleReactivateMember = (member: ProjectMember) => {
    const updatedMembers = members.map((m) =>
      m.id === member.id ? { ...m, status: 'active' as MemberStatus, kickReason: undefined, kickedAt: undefined } : m
    );
    setMembers(updatedMembers);
    showToast.success(`${member.alumniName} berhasil diaktifkan kembali`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
          Kelola Member
        </h1>
        <p className="text-[#6B7280]">Manage member project dan monitor kontribusi mereka</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">group</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{members.length}</p>
              <p className="text-sm text-[#6B7280]">Total Member</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{activeMembers}</p>
              <p className="text-sm text-[#6B7280]">Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600">pause_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{inactiveMembers}</p>
              <p className="text-sm text-[#6B7280]">Inactive</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600">block</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{suspendedMembers}</p>
              <p className="text-sm text-[#6B7280]">Suspended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border-2 border-[#E5E7EB] mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Search Member</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau email..."
                className="w-full pl-10 pr-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Filter Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as MemberStatus | 'all')}
              className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
            >
              <option value="all">Semua Status ({members.length})</option>
              <option value="active">Active ({activeMembers})</option>
              <option value="inactive">Inactive ({inactiveMembers})</option>
              <option value="suspended">Suspended ({suspendedMembers})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA] border-b-2 border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">Member</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">Commitment</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">Kontribusi</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#6B7280]">
                    Tidak ada member ditemukan
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#F8F9FA] transition-colors">
                    {/* Member Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.alumniPhoto ? (
                          <img
                            src={member.alumniPhoto}
                            alt={member.alumniName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold">
                            {member.alumniName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#0E1B33]">{member.alumniName}</p>
                          <p className="text-xs text-[#6B7280]">{member.alumniEmail}</p>
                          <p className="text-xs text-[#6B7280]">
                            {member.alumniAngkatan} • {member.alumniJurusan}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Commitment */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-[#0E1B33]">
                          {getCommitmentDisplay(member.commitment)}
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          Joined: {new Date(member.joinedAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </td>

                    {/* Contribution */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-[#6B7280]">
                          <strong>{member.tasksCompleted}</strong> tasks completed
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          <strong>{member.discussionParticipation}</strong> discussions
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          <strong>{member.pollsVoted}</strong> polls voted
                        </p>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm">{getRatingStars(member.rating)}</p>
                        <p className="text-xs text-[#6B7280]">{member.rating.toFixed(1)}/5.0</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {member.status === 'active' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          Active
                        </span>
                      )}
                      {member.status === 'inactive' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                          <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                          Inactive
                        </span>
                      )}
                      {member.status === 'suspended' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {member.status === 'active' ? (
                        <button
                          onClick={() => handleKickMember(member)}
                          className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold"
                        >
                          <span className="material-symbols-outlined text-base">block</span>
                          Kick
                        </button>
                      ) : member.status === 'suspended' ? (
                        <button
                          onClick={() => handleReactivateMember(member)}
                          className="flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm font-semibold"
                        >
                          <span className="material-symbols-outlined text-base">check_circle</span>
                          Reactivate
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kick Member Modal */}
      {showKickModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600 text-2xl">block</span>
              </div>
              <h2 className="font-semibold text-xl text-[#0E1B33]">Kick Member</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-900">
                  Anda akan mengeluarkan <strong>{selectedMember.alumniName}</strong> dari project ini.
                  Member akan di-suspend dan tidak bisa mengakses project.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Alasan Kick <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={kickReason}
                  onChange={(e) => setKickReason(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={4}
                  placeholder="Tulis alasan kick member..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowKickModal(false)}
                  className="flex-1 px-6 py-2 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmKickMember}
                  className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  ❌ Confirm Kick
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
