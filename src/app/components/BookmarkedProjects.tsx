import { Logo } from './Logo';
import { useTranslation } from '@/hooks/useTranslation';

interface BookmarkedProject {
  id: string | number;
  title: string;
  imageUrl: string;
  category: string;
  type: 'open-volunteer' | 'galeri-with-funding' | 'galeri-documentation' | 'campaign';
  isFunding?: boolean;
  isVolunteerOpen?: boolean;
  location?: string;
  targetAmount?: number;
  collectedAmount?: number;
  progress?: number;
}

interface BookmarkedProjectsProps {
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onProjectClick?: (project: BookmarkedProject) => void;
  bookmarkedProjects: BookmarkedProject[];
  onRemoveBookmark?: (projectId: string | number) => void;
  activeNav?: string;
  userRole?: 'donatur' | 'alumni' | 'alumni-guest' | null;
}

export function BookmarkedProjects({
  onBack,
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  onProjectClick,
  bookmarkedProjects,
  onRemoveBookmark,
  activeNav = 'settings',
  userRole = 'alumni',
}: BookmarkedProjectsProps) {
  const { t, language } = useTranslation();

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: { id: string; en: string } } = {
      sejarah: { id: 'Sejarah', en: 'History' },
      budaya: { id: 'Budaya', en: 'Culture' },
      kemanusiaan: { id: 'Kemanusiaan', en: 'Humanitarian' },
      pendidikan: { id: 'Pendidikan', en: 'Education' },
      lingkungan: { id: 'Lingkungan', en: 'Environment' },
      kesehatan: { id: 'Kesehatan', en: 'Health' },
    };
    return language === 'id' ? categoryMap[category]?.id || category : categoryMap[category]?.en || category;
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: { id: string; en: string } } = {
      'open-volunteer': { id: 'Open Volunteer', en: 'Open Volunteer' },
      'galeri-with-funding': { id: 'Galeri', en: 'Gallery' },
      'galeri-documentation': { id: 'Galeri', en: 'Gallery' },
      'campaign': { id: 'Campaign', en: 'Campaign' },
    };
    return language === 'id' ? typeMap[type]?.id || type : typeMap[type]?.en || type;
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] overflow-x-hidden max-w-full">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'home' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateHome}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">{t.nav.home}</span>
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'explore' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateExplore}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">{t.nav.explore}</span>
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'pesan' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateMessages}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">{t.nav.messages}</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'settings' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateSettings}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">{t.nav.settings}</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden w-full max-w-full">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
            <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight uppercase">
              {language === 'id' ? 'Project Tersimpan' : 'Saved Projects'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 lg:pb-8 w-full max-w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-[#243D68] to-[#2B4468] rounded-2xl p-4 md:p-6 mb-6 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FAC06E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#FAC06E] text-2xl">bookmark</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base md:text-lg mb-1">
                    {language === 'id' ? 'Koleksi Project Anda' : 'Your Project Collection'}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                    {language === 'id' 
                      ? 'Simpan project yang menarik perhatian Anda untuk akses cepat di kemudian hari. Klik project untuk melihat detail.'
                      : 'Save interesting projects for quick access later. Click on a project to view details.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Count */}
            {bookmarkedProjects.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-[#6B7280]">
                  {language === 'id' 
                    ? `${bookmarkedProjects.length} project tersimpan`
                    : `${bookmarkedProjects.length} saved project${bookmarkedProjects.length > 1 ? 's' : ''}`}
                </p>
              </div>
            )}

            {/* Projects Grid */}
            {bookmarkedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {bookmarkedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    {/* Project Image */}
                    <div 
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => onProjectClick?.(project)}
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-[#243D68] text-white text-xs font-bold rounded-full">
                          {getTypeLabel(project.type)}
                        </span>
                      </div>
                      {/* Remove Bookmark Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveBookmark?.(project.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg active:scale-95"
                        aria-label={language === 'id' ? 'Hapus bookmark' : 'Remove bookmark'}
                      >
                        <span
                          className="material-symbols-outlined text-2xl transition-colors duration-200"
                          style={{
                            fontVariationSettings: "'FILL' 1",
                            color: '#FAC06E',
                          }}
                        >
                          bookmark
                        </span>
                      </button>
                    </div>

                    {/* Project Info */}
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => onProjectClick?.(project)}
                    >
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[#6B7280] text-base">category</span>
                        <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-wide">
                          {getCategoryLabel(project.category)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[#0E1B33] font-bold text-base mb-2 line-clamp-2 group-hover:text-[#243D68] transition-colors">
                        {project.title}
                      </h3>

                      {/* Location */}
                      {project.location && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="material-symbols-outlined text-[#6B7280] text-sm">location_on</span>
                          <span className="text-xs text-[#6B7280]">{project.location}</span>
                        </div>
                      )}

                      {/* Progress Bar (for funding projects) */}
                      {project.isFunding && project.targetAmount && (
                        <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-[#6B7280]">
                              {language === 'id' ? 'Terkumpul' : 'Collected'}
                            </span>
                            <span className="text-xs font-bold text-[#243D68]">{project.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-[#E5E7EB] rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#243D68] to-[#2B4468] h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(project.progress || 0, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-bold text-[#0E1B33]">
                              Rp {(project.collectedAmount || 0).toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs text-[#6B7280]">
                              {language === 'id' ? 'dari' : 'of'} Rp {project.targetAmount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Volunteer Badge (for volunteer projects) */}
                      {project.isVolunteerOpen && (
                        <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#10B981] text-base">check_circle</span>
                            <span className="text-xs font-semibold text-[#10B981]">
                              {language === 'id' ? 'Volunteer Dibuka' : 'Volunteer Open'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-[#243D68]/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#243D68] text-5xl">bookmark_border</span>
                </div>
                <h3 className="text-[#0E1B33] font-bold text-lg mb-2 text-center">
                  {language === 'id' ? 'Belum Ada Project Tersimpan' : 'No Saved Projects Yet'}
                </h3>
                <p className="text-[#6B7280] text-sm text-center mb-6 max-w-md">
                  {language === 'id'
                    ? 'Mulai simpan project yang Anda minati dengan menekan tombol bookmark pada halaman detail project.'
                    : 'Start saving projects you\'re interested in by tapping the bookmark button on project detail pages.'}
                </p>
                <button
                  onClick={onNavigateExplore}
                  className="px-6 py-3 bg-[#243D68] hover:bg-[#2B4468] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  {language === 'id' ? 'Jelajahi Project' : 'Explore Projects'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-50 safe-area-bottom">
          <div className="flex justify-around items-center h-16 px-2">
            <button
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors flex-1 ${
                activeNav === 'home' ? 'text-[#243D68]' : 'text-[#6B7280]'
              }`}
              onClick={onNavigateHome}
            >
              <span className="material-symbols-outlined text-2xl">home</span>
              <span className="text-[10px] font-semibold">{t.nav.home}</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors flex-1 ${
                activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#6B7280]'
              }`}
              onClick={onNavigateExplore}
            >
              <span className="material-symbols-outlined text-2xl">explore</span>
              <span className="text-[10px] font-semibold">{t.nav.explore}</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors flex-1 ${
                activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#6B7280]'
              }`}
              onClick={onNavigateMessages}
            >
              <span className="material-symbols-outlined text-2xl">chat_bubble</span>
              <span className="text-[10px] font-semibold">{t.nav.messages}</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors flex-1 ${
                activeNav === 'settings' ? 'text-[#243D68]' : 'text-[#6B7280]'
              }`}
              onClick={onNavigateSettings}
            >
              <span className="material-symbols-outlined text-2xl">settings</span>
              <span className="text-[10px] font-semibold">{t.nav.settings}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
