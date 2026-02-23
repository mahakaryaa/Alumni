/**
 * Polling Management Component
 * PIC can create and manage polls for project members
 */

import { useState } from 'react';
import { AdminUser, Poll, PollOption } from '@/types/admin-revised';
import { getProjectPolls, getProjectMembers } from '@/data/mockAdminDataRevised';
import { showToast } from '@/utils/toast';

interface PollingManagementProps {
  currentUser: AdminUser;
  projectId: string;
  projectTitle?: string;
  onPollCreated?: (pollId: string, pollQuestion: string, projectId: string, projectTitle: string, deadline: string, createdByName: string) => void;
  onPollClosed?: (pollId: string, pollQuestion: string, projectId: string, projectTitle: string, totalVoters: number, closedByName: string) => void;
  onPollDeadlineReminder?: (pollId: string, pollQuestion: string, projectId: string, projectTitle: string, deadline: string) => void;
}

export function PollingManagement({ 
  currentUser, 
  projectId, 
  projectTitle = 'Project',
  onPollCreated,
  onPollClosed,
  onPollDeadlineReminder,
}: PollingManagementProps) {
  const [polls, setPolls] = useState<Poll[]>(getProjectPolls(projectId));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'closed'>('all');

  // Form states
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [deadline, setDeadline] = useState('');

  const members = getProjectMembers(projectId);
  const activeMembersCount = members.filter(m => m.status === 'active').length;

  const handleCreatePoll = () => {
    if (!question.trim()) {
      showToast.error('Pertanyaan polling harus diisi');
      return;
    }

    const validOptions = options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      showToast.error('Minimal harus ada 2 pilihan jawaban');
      return;
    }

    if (!deadline) {
      showToast.error('Deadline harus diisi');
      return;
    }

    const pollOptions: PollOption[] = validOptions.map((opt, index) => ({
      id: `opt-${Date.now()}-${index}`,
      text: opt,
      votes: 0,
      voters: [],
    }));

    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      projectId,
      question,
      description,
      options: pollOptions,
      allowMultiple,
      isAnonymous,
      createdBy: currentUser.id,
      createdByName: currentUser.name,
      createdAt: new Date().toISOString(),
      deadline,
      status: 'active',
      totalVotes: 0,
      totalVoters: 0,
    };

    setPolls([newPoll, ...polls]);
    showToast.success('Polling berhasil dibuat!');
    
    // FASE 4: Trigger notification untuk semua member
    if (onPollCreated) {
      onPollCreated(
        newPoll.id,
        newPoll.question,
        projectId,
        projectTitle,
        newPoll.deadline,
        currentUser.name
      );
    }
    
    resetForm();
    setShowCreateModal(false);
  };

  const handleClosePoll = (pollId: string) => {
    if (confirm('Yakin ingin menutup polling ini? Setelah ditutup, member tidak bisa vote lagi.')) {
      const poll = polls.find(p => p.id === pollId);
      const updatedPolls = polls.map(p =>
        p.id === pollId
          ? { ...p, status: 'closed' as const, closedAt: new Date().toISOString() }
          : p
      );
      setPolls(updatedPolls);
      showToast.success('Polling berhasil ditutup');
      
      // FASE 4: Trigger notification untuk semua member
      if (onPollClosed && poll) {
        onPollClosed(
          poll.id,
          poll.question,
          projectId,
          projectTitle,
          poll.totalVoters,
          currentUser.name
        );
      }
    }
  };

  const handleDeletePoll = (pollId: string) => {
    if (confirm('Yakin ingin menghapus polling ini? Data voting akan hilang permanen.')) {
      setPolls(polls.filter(poll => poll.id !== pollId));
      showToast.success('Polling berhasil dihapus');
    }
  };

  const handleAddOption = () => {
    if (options.length >= 6) {
      showToast.error('Maksimal 6 pilihan jawaban');
      return;
    }
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) {
      showToast.error('Minimal harus ada 2 pilihan');
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setQuestion('');
    setDescription('');
    setOptions(['', '']);
    setAllowMultiple(false);
    setIsAnonymous(false);
    setDeadline('');
  };

  const filteredPolls = polls.filter(poll => {
    if (filterStatus === 'all') return true;
    return poll.status === filterStatus;
  });

  const activePolls = polls.filter(p => p.status === 'active').length;
  const closedPolls = polls.filter(p => p.status === 'closed').length;
  const totalVotes = polls.reduce((sum, p) => sum + p.totalVotes, 0);

  const getParticipationRate = (poll: Poll) => {
    if (activeMembersCount === 0) return 0;
    return Math.round((poll.totalVoters / activeMembersCount) * 100);
  };

  const getVotePercentage = (option: PollOption, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((option.votes / totalVotes) * 100);
  };

  const isOverdue = (deadline: string, status: Poll['status']) => {
    return status === 'active' && new Date(deadline) < new Date();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
            Kelola Polling
          </h1>
          <p className="text-[#6B7280]">Buat polling untuk mendapatkan feedback dari member project</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
        >
          <span className="material-symbols-outlined">poll</span>
          Buat Polling Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">poll</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{polls.length}</p>
              <p className="text-sm text-[#6B7280]">Total Polling</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{activePolls}</p>
              <p className="text-sm text-[#6B7280]">Aktif</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-600">lock</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{closedPolls}</p>
              <p className="text-sm text-[#6B7280]">Ditutup</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">how_to_vote</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{totalVotes}</p>
              <p className="text-sm text-[#6B7280]">Total Votes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 border-2 border-[#E5E7EB] mb-6">
        <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Filter Status</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="w-full md:w-auto px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
        >
          <option value="all">Semua Polling ({polls.length})</option>
          <option value="active">Aktif ({activePolls})</option>
          <option value="closed">Ditutup ({closedPolls})</option>
        </select>
      </div>

      {/* Polls List */}
      <div className="space-y-4">
        {filteredPolls.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-[#E5E7EB]">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-[#6B7280]">poll</span>
            </div>
            <h3 className="font-semibold text-xl text-[#0E1B33] mb-2">
              {filterStatus === 'all' ? 'Belum Ada Polling' : `Tidak Ada Polling ${filterStatus === 'active' ? 'Aktif' : 'Ditutup'}`}
            </h3>
            <p className="text-[#6B7280] mb-6">
              {filterStatus === 'all' ? 'Buat polling pertama untuk mendapatkan feedback dari member' : 'Ubah filter untuk melihat polling lainnya'}
            </p>
            {filterStatus === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
              >
                Buat Polling Pertama
              </button>
            )}
          </div>
        ) : (
          filteredPolls.map((poll) => {
            const participationRate = getParticipationRate(poll);
            const overdue = isOverdue(poll.deadline, poll.status);

            return (
              <div
                key={poll.id}
                className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden hover:border-[#243D68] transition-colors"
              >
                {/* Poll Header */}
                <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        poll.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {poll.status === 'active' ? '✅ Aktif' : '🔒 Ditutup'}
                    </span>
                    {poll.allowMultiple && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        Multiple Choice
                      </span>
                    )}
                    {poll.isAnonymous && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        🔒 Anonymous
                      </span>
                    )}
                    {overdue && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        ⚠️ Overdue
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {poll.status === 'active' && (
                      <button
                        onClick={() => handleClosePoll(poll.id)}
                        className="p-2 text-orange-600 hover:bg-white rounded-lg transition-colors"
                        title="Tutup Polling"
                      >
                        <span className="material-symbols-outlined text-xl">lock</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePoll(poll.id)}
                      className="p-2 text-red-600 hover:bg-white rounded-lg transition-colors"
                      title="Hapus Polling"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>

                {/* Poll Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#0E1B33] mb-2">{poll.question}</h3>
                  {poll.description && (
                    <p className="text-[#6B7280] mb-4 whitespace-pre-wrap">{poll.description}</p>
                  )}

                  {/* Poll Info */}
                  <div className="flex items-center gap-6 mb-6 text-sm">
                    <span className="flex items-center gap-2 text-[#6B7280]">
                      <span className="material-symbols-outlined text-sm">person</span>
                      {poll.createdByName}
                    </span>
                    <span className="flex items-center gap-2 text-[#6B7280]">
                      <span className="material-symbols-outlined text-sm">event</span>
                      Deadline: {new Date(poll.deadline).toLocaleDateString('id-ID')}
                    </span>
                    <span className="flex items-center gap-2 text-[#6B7280]">
                      <span className="material-symbols-outlined text-sm">how_to_vote</span>
                      {poll.totalVoters} / {activeMembersCount} voted ({participationRate}%)
                    </span>
                  </div>

                  {/* Poll Options with Results */}
                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percentage = getVotePercentage(option, poll.totalVotes);

                      return (
                        <div key={option.id} className="relative">
                          {/* Progress Bar Background */}
                          <div
                            className="absolute inset-0 bg-[#243D68] opacity-5 rounded-lg transition-all"
                            style={{ width: `${percentage}%` }}
                          />

                          {/* Option Content */}
                          <div className="relative px-4 py-3 border-2 border-[#E5E7EB] rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <span className="material-symbols-outlined text-[#6B7280]">
                                {poll.allowMultiple ? 'check_box' : 'radio_button_checked'}
                              </span>
                              <span className="font-medium text-[#0E1B33]">{option.text}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-[#6B7280]">
                                {option.votes} votes
                              </span>
                              <span className="font-bold text-[#243D68] text-lg min-w-[3rem] text-right">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Participation Progress */}
                  <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#0E1B33]">
                        Participation Rate
                      </span>
                      <span className="text-sm font-bold text-[#243D68]">
                        {participationRate}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#243D68] to-[#FAC06E] transition-all"
                        style={{ width: `${participationRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#6B7280] mt-2">
                      {poll.totalVoters} dari {activeMembersCount} member aktif telah memberikan vote
                    </p>
                  </div>

                  {/* Voters List (Non-Anonymous) */}
                  {!poll.isAnonymous && poll.totalVoters > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                      <p className="text-sm font-semibold text-[#0E1B33] mb-2">Voters:</p>
                      <div className="flex flex-wrap gap-2">
                        {poll.options.flatMap(opt => opt.voters).slice(0, 10).map((voter, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#F8F9FA] text-[#6B7280] rounded-full text-xs"
                          >
                            {voter}
                          </span>
                        ))}
                        {poll.totalVoters > 10 && (
                          <span className="px-3 py-1 bg-[#F8F9FA] text-[#6B7280] rounded-full text-xs">
                            +{poll.totalVoters - 10} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {poll.closedAt && (
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                      <p className="text-sm text-gray-600">
                        🔒 Ditutup pada {new Date(poll.closedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Poll Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-[#0E1B33]">Buat Polling Baru</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Pertanyaan <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Contoh: Waktu terbaik untuk distribusi batch 2?"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-lg font-semibold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Deskripsi (opsional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tambahan informasi atau konteks untuk polling ini..."
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Pilihan Jawaban <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-[#6B7280] font-semibold min-w-[2rem]">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Pilihan ${index + 1}`}
                        className="flex-1 px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => handleRemoveOption(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {options.length < 6 && (
                  <button
                    onClick={handleAddOption}
                    className="mt-2 flex items-center gap-2 px-4 py-2 text-[#243D68] hover:bg-[#F8F9FA] rounded-lg transition-colors font-semibold"
                  >
                    <span className="material-symbols-outlined">add</span>
                    Tambah Pilihan
                  </button>
                )}
              </div>

              {/* Settings */}
              <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                    className="w-5 h-5 text-[#243D68] border-2 border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#243D68]"
                  />
                  <div>
                    <span className="font-semibold text-[#0E1B33]">Multiple Choice</span>
                    <p className="text-sm text-[#6B7280]">
                      Member bisa memilih lebih dari 1 jawaban
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 text-[#243D68] border-2 border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#243D68]"
                  />
                  <div>
                    <span className="font-semibold text-[#0E1B33]">Anonymous</span>
                    <p className="text-sm text-[#6B7280]">
                      Sembunyikan identitas voter dari hasil polling
                    </p>
                  </div>
                </label>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Deadline <span className="text-red-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleCreatePoll}
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  📊 Buat Polling
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
