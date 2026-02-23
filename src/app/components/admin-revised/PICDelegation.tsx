/**
 * PIC Delegation Component
 * PIC can delegate tasks to project members
 */

import { useState } from 'react';
import { AdminUser, DelegatedTask, ProjectMember } from '@/types/admin-revised';
import { getProjectMembers, getDelegatedTasks } from '@/data/mockAdminDataRevised';
import { showToast } from '@/utils/toast';

interface PICDelegationProps {
  currentUser: AdminUser;
  projectId: string;
  onTaskAssigned?: (taskId: string, assignedToId: string, assignedToName: string, taskTitle: string, projectId: string, projectTitle: string, dueDate: string, priority: string) => void;
  onTaskStatusUpdated?: (taskId: string, newStatus: string, taskTitle: string, assignedByName: string, projectId: string) => void;
}

export function PICDelegation({ currentUser, projectId, onTaskAssigned, onTaskStatusUpdated }: PICDelegationProps) {
  const [tasks, setTasks] = useState<DelegatedTask[]>(getDelegatedTasks(projectId));
  const [members] = useState<ProjectMember[]>(getProjectMembers(projectId));
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<'operational' | 'distribution' | 'marketing' | 'admin' | 'other'>('operational');

  const handleCreateTask = () => {
    if (!title.trim()) {
      showToast.error('Judul task harus diisi');
      return;
    }

    if (!assignedTo) {
      showToast.error('Pilih member untuk assign task');
      return;
    }

    if (!dueDate) {
      showToast.error('Deadline harus diisi');
      return;
    }

    const assignedMember = members.find((m) => m.id === assignedTo);
    if (!assignedMember) {
      showToast.error('Member tidak ditemukan');
      return;
    }

    const newTask: DelegatedTask = {
      id: `task-${Date.now()}`,
      projectId,
      title,
      description,
      assignedTo: assignedMember.id,
      assignedToName: assignedMember.alumniName,
      assignedBy: currentUser.id,
      assignedByName: currentUser.name,
      priority,
      category,
      status: 'pending',
      dueDate,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    showToast.success(`Task berhasil di-assign ke ${assignedMember.alumniName}`);

    // FASE 3: Trigger task notification
    if (onTaskAssigned) {
      const projectTitle = projectId === 'project-1' 
        ? 'Rekonstruksi Masjid Al-Aqsa' 
        : projectId === 'project-2'
        ? 'Distribusi Pangan Gaza'
        : 'Project Aktif';
      onTaskAssigned(
        newTask.id,
        assignedMember.id,
        assignedMember.alumniName,
        title,
        projectId,
        projectTitle,
        dueDate,
        priority
      );
    }

    resetForm();
    setShowCreateModal(false);
  };

  const handleUpdateStatus = (
    taskId: string,
    newStatus: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  ) => {
    const task = tasks.find(t => t.id === taskId);
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
          }
        : t
    );
    setTasks(updatedTasks);
    showToast.success('Status task berhasil diupdate');

    // FASE 3: Trigger task completion notification ke PIC
    if (newStatus === 'completed' && task && onTaskStatusUpdated) {
      onTaskStatusUpdated(taskId, newStatus, task.title, currentUser.name, projectId);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Yakin ingin menghapus task ini?')) {
      setTasks(tasks.filter((t) => t.id !== taskId));
      showToast.success('Task berhasil dihapus');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setPriority('medium');
    setDueDate('');
    setCategory('operational');
  };

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;

  const getPriorityColor = (priority: DelegatedTask['priority']) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority];
  };

  const getStatusColor = (status: DelegatedTask['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getStatusLabel = (status: DelegatedTask['status']) => {
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status];
  };

  const getCategoryLabel = (cat: DelegatedTask['category']) => {
    const labels = {
      operational: 'Operasional',
      distribution: 'Distribusi',
      marketing: 'Marketing',
      admin: 'Admin',
      other: 'Lainnya',
    };
    return labels[cat];
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
            Delegasi Task
          </h1>
          <p className="text-[#6B7280]">Assign dan kelola task untuk member project</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
        >
          <span className="material-symbols-outlined">add_task</span>
          Buat Task Baru
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">task</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{tasks.length}</p>
              <p className="text-sm text-[#6B7280]">Total Tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-600">schedule</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{pendingTasks}</p>
              <p className="text-sm text-[#6B7280]">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">pending_actions</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{inProgressTasks}</p>
              <p className="text-sm text-[#6B7280]">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{completedTasks}</p>
              <p className="text-sm text-[#6B7280]">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-[#E5E7EB]">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-[#6B7280]">task_alt</span>
            </div>
            <h3 className="font-semibold text-xl text-[#0E1B33] mb-2">Belum Ada Task</h3>
            <p className="text-[#6B7280] mb-6">Buat task pertama dan assign ke member project</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
            >
              Buat Task Pertama
            </button>
          </div>
        ) : (
          tasks.map((task) => {
            const isOverdue =
              task.status !== 'completed' && new Date(task.dueDate) < new Date();

            return (
              <div
                key={task.id}
                className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden hover:border-[#243D68] transition-colors"
              >
                {/* Task Header */}
                <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {getStatusLabel(task.status)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                      {getCategoryLabel(task.category)}
                    </span>
                    {isOverdue && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        ⚠️ Overdue
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-red-600 hover:bg-white rounded-lg transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>

                {/* Task Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-[#0E1B33] mb-2">{task.title}</h3>
                  {task.description && (
                    <p className="text-[#6B7280] mb-4 whitespace-pre-wrap">{task.description}</p>
                  )}

                  {/* Task Info */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <span className="flex items-center gap-2 text-[#6B7280]">
                      <span className="material-symbols-outlined text-sm">person</span>
                      <strong>{task.assignedToName}</strong>
                    </span>
                    <span className="flex items-center gap-2 text-[#6B7280]">
                      <span className="material-symbols-outlined text-sm">event</span>
                      Deadline: {new Date(task.dueDate).toLocaleDateString('id-ID')}
                    </span>
                  </div>

                  {/* Status Actions */}
                  {task.status !== 'completed' && task.status !== 'cancelled' && (
                    <div className="flex gap-2 pt-4 border-t border-[#E5E7EB]">
                      {task.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'in_progress')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          ▶️ Start Progress
                        </button>
                      )}
                      {task.status === 'in_progress' && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'completed')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                        >
                          ✅ Mark Completed
                        </button>
                      )}
                      <button
                        onClick={() => handleUpdateStatus(task.id, 'cancelled')}
                        className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  )}

                  {task.status === 'completed' && task.completedAt && (
                    <div className="pt-4 border-t border-[#E5E7EB]">
                      <p className="text-sm text-green-600 font-semibold">
                        ✅ Completed on {new Date(task.completedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-[#0E1B33]">Buat Task Baru</h2>
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
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Judul Task <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Koordinasi dengan mitra lokal Gaza"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-lg font-semibold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail task dan instruksi..."
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none resize-none"
                  rows={4}
                />
              </div>

              {/* Assign To */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Assign Ke <span className="text-red-600">*</span>
                </label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                >
                  <option value="">Pilih member...</option>
                  {members
                    .filter((m) => m.status === 'active')
                    .map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.alumniName} - {member.alumniJurusan}
                      </option>
                    ))}
                </select>
              </div>

              {/* Priority & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                    Priority <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
                  >
                    <option value="operational">Operasional</option>
                    <option value="distribution">Distribusi</option>
                    <option value="marketing">Marketing</option>
                    <option value="admin">Admin</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Deadline <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
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
                  onClick={handleCreateTask}
                  className="flex-1 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  ✅ Assign Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}