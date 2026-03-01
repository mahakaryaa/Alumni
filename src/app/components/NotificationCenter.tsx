/**
 * NotificationCenter.tsx
 * FASE 3: Pusat Notifikasi untuk Alumni
 * Menampilkan semua notifikasi dengan filter, mark as read, dan navigasi deep-link
 */

import { useState } from 'react';
import { Logo } from './Logo';
import { useTranslation } from '@/hooks/useTranslation';
import type { Notification, NotificationType } from '@/types';

interface NotificationCenterProps {
  notifications: Notification[];
  onBack: () => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onNavigateMyDonations?: () => void;
  onNavigateMyJoinRequests?: () => void;
  onNavigateEventDetail?: () => void;
  activeNav?: string;
}

type FilterType = 'all' | 'unread' | 'donation' | 'join' | 'event' | 'task' | 'content' | 'project';

function getFilterForType(type: NotificationType): FilterType {
  if (type.startsWith('donation_')) return 'donation';
  if (type.startsWith('join_')) return 'join';
  if (type.startsWith('event_')) return 'event';
  if (type.startsWith('task_')) return 'task';
  if (type === 'progress_update' || type === 'content_removed') return 'content';
  if (type.startsWith('withdrawal_')) return 'content';
  if (type.startsWith('project_') || type === 'alumni_verified') return 'project';
  return 'all';
}

export function NotificationCenter({
  notifications,
  onBack,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  onNavigateMyDonations,
  onNavigateMyJoinRequests,
  onNavigateEventDetail,
  activeNav,
}: NotificationCenterProps) {
  const { t, language } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Build dynamic config and labels using translations (inside component where t is available)
  const getNotifTypeConfig = (): Record<NotificationType, { icon: string; color: string; bg: string; label: string }> => ({
    donation_approved: { icon: 'payments', color: 'text-green-600', bg: 'bg-green-100', label: t.notifCenter.donationApproved },
    donation_rejected: { icon: 'money_off', color: 'text-red-600', bg: 'bg-red-100', label: t.notifCenter.donationRejected },
    join_approved: { icon: 'how_to_reg', color: 'text-blue-600', bg: 'bg-blue-100', label: t.notifCenter.joinApproved },
    join_rejected: { icon: 'person_remove', color: 'text-red-600', bg: 'bg-red-100', label: t.notifCenter.joinRejected },
    progress_update: { icon: 'trending_up', color: 'text-[#243D68]', bg: 'bg-blue-100', label: t.notifCenter.projectUpdate },
    task_assigned: { icon: 'assignment', color: 'text-purple-600', bg: 'bg-purple-100', label: t.notifCenter.newTask },
    task_completed: { icon: 'task_alt', color: 'text-green-600', bg: 'bg-green-100', label: t.notifCenter.taskCompleted },
    withdrawal_approved: { icon: 'account_balance', color: 'text-green-600', bg: 'bg-green-100', label: t.notifCenter.withdrawalApproved },
    withdrawal_rejected: { icon: 'block', color: 'text-red-600', bg: 'bg-red-100', label: t.notifCenter.withdrawalRejected },
    content_removed: { icon: 'delete_sweep', color: 'text-orange-600', bg: 'bg-orange-100', label: t.notifCenter.contentRemoved },
    event_registration_submitted: { icon: 'event_note', color: 'text-[#FAC06E]', bg: 'bg-yellow-100', label: t.notifCenter.eventRegistration },
    event_approved: { icon: 'event_available', color: 'text-green-600', bg: 'bg-green-100', label: t.notifCenter.eventApproved },
    event_rejected: { icon: 'event_busy', color: 'text-red-600', bg: 'bg-red-100', label: t.notifCenter.eventRejected },
    event_reminder: { icon: 'event_upcoming', color: 'text-blue-600', bg: 'bg-blue-100', label: t.notifCenter.eventReminder },
    event_cancelled: { icon: 'cancel', color: 'text-gray-600', bg: 'bg-gray-100', label: t.notifCenter.eventCancelled },
    project_closed: { icon: 'archive', color: 'text-gray-600', bg: 'bg-gray-100', label: t.notifCenter.projectClosed },
    project_closure_approved: { icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-100', label: t.notifCenter.closureApproved },
    project_closure_rejected: { icon: 'cancel', color: 'text-red-600', bg: 'bg-red-100', label: t.notifCenter.closureRejected },
    alumni_verified: { icon: 'verified_user', color: 'text-[#243D68]', bg: 'bg-blue-100', label: t.notifCenter.alumniVerified },
  });

  const getFilterLabels = (): Record<FilterType, string> => ({
    all: t.notifCenter.filterAll,
    unread: t.notifCenter.filterUnread,
    donation: t.notifCenter.filterDonation,
    join: t.notifCenter.filterJoin,
    event: t.notifCenter.filterEvent,
    task: t.notifCenter.filterTask,
    content: t.notifCenter.filterUpdate,
    project: t.notifCenter.filterProject,
  });

  const formatRelativeTimeLocal = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t.notifCenter.justNow;
    if (diffMins < 60) return `${diffMins} ${t.notifCenter.minutesAgo}`;
    if (diffHours < 24) return `${diffHours} ${t.notifCenter.hoursAgo}`;
    if (diffDays < 7) return `${diffDays} ${t.notifCenter.daysAgo}`;
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.isRead;
    if (activeFilter === 'all') return true;
    return getFilterForType(n.type) === activeFilter;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleNotificationClick = (notif: Notification) => {
    if (!notif.isRead) {
      onMarkAsRead(notif.id);
    }
    // Navigate based on type
    if ((notif.type === 'donation_approved' || notif.type === 'donation_rejected') && onNavigateMyDonations) {
      onNavigateMyDonations();
    } else if ((notif.type === 'join_approved' || notif.type === 'join_rejected') && onNavigateMyJoinRequests) {
      onNavigateMyJoinRequests();
    } else if ((notif.type === 'event_approved' || notif.type === 'event_rejected' || notif.type === 'event_reminder') && onNavigateEventDetail) {
      onNavigateEventDetail();
    }
  };

  const filterCounts: Record<FilterType, number> = {
    all: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    donation: notifications.filter(n => getFilterForType(n.type) === 'donation').length,
    join: notifications.filter(n => getFilterForType(n.type) === 'join').length,
    event: notifications.filter(n => getFilterForType(n.type) === 'event').length,
    task: notifications.filter(n => getFilterForType(n.type) === 'task').length,
    content: notifications.filter(n => getFilterForType(n.type) === 'content').length,
    project: notifications.filter(n => getFilterForType(n.type) === 'project').length,
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-[#2B4468] border-r border-[#2B4468] fixed h-screen top-0 left-0 z-50 flex flex-col hidden lg:flex shadow-sm">
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col h-full">
          <div className="p-5">
            <Logo />
          </div>
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              {[
                { id: 'home', icon: 'home', label: t.nav.home, action: onNavigateHome || onBack },
                { id: 'explore', icon: 'explore', label: t.nav.explore, action: onNavigateExplore },
                { id: 'pesan', icon: 'chat_bubble', label: t.nav.messages, action: onNavigateMessages },
                { id: 'settings', icon: 'settings', label: t.nav.settings, action: onNavigateSettings },
              ].map(item => (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                    activeNav === item.id ? 'text-white bg-white/10' : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={item.action}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="tracking-wide text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 w-full pb-20 lg:pb-10">
        {/* Mobile Header */}
        <header className="bg-white/90 sticky top-0 z-30 px-4 py-3 flex items-center justify-between backdrop-blur-sm border-b border-[#E5E7EB] shadow-sm lg:hidden">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] text-[#243D68]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-['Archivo_Black'] text-base uppercase text-[#243D68]">{t.notifCenter.notifications.toUpperCase()}</h1>
          <div className="w-10" />
        </header>

        <div className="px-4 lg:px-8 max-w-3xl mx-auto py-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="hidden lg:flex w-10 h-10 items-center justify-center rounded-lg hover:bg-white border border-[#E5E7EB] text-[#243D68] transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div>
                <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33]">
                  {t.notifCenter.notifications}
                </h1>
                <p className="text-sm text-[#6B7280]">
                  {unreadCount > 0 ? `${unreadCount} ${t.notifCenter.unreadNotifications.toLowerCase()}` : t.notifCenter.allRead}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#243D68] border border-[#243D68] rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">done_all</span>
                  <span className="hidden sm:inline">{t.notifCenter.readAll}</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                >
                  <span className="material-symbols-outlined text-sm">delete_sweep</span>
                  <span className="hidden sm:inline">{t.notifCenter.deleteAll}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {(Object.keys(getFilterLabels()) as FilterType[]).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-[#243D68] text-white shadow-md'
                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#243D68] hover:text-[#243D68]'
                }`}
              >
                {getFilterLabels()[filter]}
                {filterCounts[filter] > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                    activeFilter === filter ? 'bg-white text-[#243D68]' : 'bg-[#F8F9FA] text-[#243D68]'
                  }`}>
                    {filterCounts[filter]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notification List */}
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center">
              <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-[#D6DCE8]">notifications_off</span>
              </div>
              <h3 className="font-semibold text-lg text-[#0E1B33] mb-2">
                {activeFilter === 'unread' ? t.notifCenter.allReadTitle : t.notifCenter.noNotifications}
              </h3>
              <p className="text-[#6B7280] text-sm">
                {activeFilter === 'unread'
                  ? t.notifCenter.allReadDesc
                  : t.notifCenter.noCategoryNotif}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notif) => {
                const config = getNotifTypeConfig()[notif.type] || {
                  icon: 'notifications',
                  color: 'text-[#243D68]',
                  bg: 'bg-blue-100',
                  label: t.notifCenter.defaultNotification,
                };
                return (
                  <button
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-md ${
                      !notif.isRead
                        ? 'bg-white border-[#243D68]/20 shadow-sm'
                        : 'bg-white border-[#E5E7EB] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-11 h-11 ${config.bg} rounded-full flex items-center justify-center relative`}>
                        <span className={`material-symbols-outlined text-xl ${config.color}`}>{config.icon}</span>
                        {!notif.isRead && (
                          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                              {config.label}
                            </span>
                            {!notif.isRead && (
                              <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                                {t.notifCenter.newBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#6B7280] flex-shrink-0">
                            {formatRelativeTimeLocal(notif.createdAt)}
                          </span>
                        </div>
                        <p className="font-semibold text-[#0E1B33] text-sm mb-1 line-clamp-1">
                          {notif.title}
                        </p>
                        <p className="text-[#6B7280] text-sm line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                        {/* CTA hint based on type */}
                        {(notif.type === 'donation_approved' || notif.type === 'donation_rejected') && (
                          <p className="text-xs text-[#243D68] font-semibold mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            {t.notifCenter.viewDonationHistory}
                          </p>
                        )}
                        {(notif.type === 'join_approved' || notif.type === 'join_rejected') && (
                          <p className="text-xs text-[#243D68] font-semibold mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            {t.notifCenter.viewJoinRequestStatus}
                          </p>
                        )}
                        {(notif.type === 'event_approved' || notif.type === 'event_rejected') && (
                          <p className="text-xs text-[#243D68] font-semibold mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            {t.notifCenter.viewEventDetail}
                          </p>
                        )}
                        {notif.type === 'task_assigned' && (
                          <p className="text-xs text-purple-600 font-semibold mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">assignment</span>
                            {t.notifCenter.viewTaskInMessages}
                          </p>
                        )}
                        {notif.type === 'progress_update' && (
                          <p className="text-xs text-[#243D68] font-semibold mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">article</span>
                            {t.notifCenter.viewInProjectDetail}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Statistics Footer */}
          {notifications.length > 0 && (
            <div className="mt-8 p-4 bg-white rounded-xl border border-[#E5E7EB]">
              <p className="text-sm font-semibold text-[#0E1B33] mb-3">{t.notifCenter.summary}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                  <p className="text-xl font-bold text-[#243D68]">{notifications.length}</p>
                  <p className="text-xs text-[#6B7280]">{t.notifCenter.total}</p>
                </div>
                <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                  <p className="text-xl font-bold text-red-500">{unreadCount}</p>
                  <p className="text-xs text-[#6B7280]">{t.notifCenter.unread}</p>
                </div>
                <div className="text-center p-3 bg-[#F8F9FA] rounded-lg">
                  <p className="text-xl font-bold text-green-600">{notifications.length - unreadCount}</p>
                  <p className="text-xs text-[#6B7280]">{t.notifCenter.read}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-40 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { id: 'home', icon: 'home', label: t.nav.home, action: onNavigateHome || onBack },
            { id: 'explore', icon: 'explore', label: t.nav.explore, action: onNavigateExplore },
            { id: 'pesan', icon: 'chat_bubble', label: t.nav.messages, action: onNavigateMessages },
            { id: 'settings', icon: 'settings', label: t.nav.settings, action: onNavigateSettings },
          ].map(item => (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${
                activeNav === item.id ? 'text-[#243D68]' : 'text-[#6B7280]'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Clear Confirm Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600 text-2xl">delete_forever</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0E1B33]">{t.notifCenter.deleteAllConfirm}</h3>
                <p className="text-sm text-[#6B7280]">{t.notifCenter.cannotUndo}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg font-semibold hover:bg-[#F8F9FA] transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                {t.notifCenter.deleteAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}