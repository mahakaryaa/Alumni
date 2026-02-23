import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { CampaignList } from '@/components/campaign/CampaignList';
import { useTranslation } from '@/hooks/useTranslation';

interface ExploreProjectProps {
  onBack?: () => void;
  initialTab?: 'open' | 'galeri' | 'campaign';
  onNavigateToDetail?: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onCampaignClick?: (id: string) => void;
  activeNav?: string;
  currentUserId?: string;
  userRole?: 'donatur' | 'alumni' | 'alumni-guest' | null;
}

export function ExploreProject({ 
  onBack, 
  initialTab = 'open', 
  onNavigateToDetail, 
  onNavigateHome, 
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  onCampaignClick,
  activeNav = 'explore',
  currentUserId = 'user-1',
  userRole
}: ExploreProjectProps) {
  // Get translations
  const { t, language } = useTranslation();
  
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [selectedTab, setSelectedTab] = useState<'open' | 'galeri' | 'campaign'>(initialTab);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedTab === 'campaign' && userRole !== 'alumni' && userRole !== 'alumni-guest') {
      setSelectedTab('open');
    }
  }, [selectedTab, userRole]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show header at the top
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Helper function to translate status
  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: { id: string; en: string } } = {
      upcoming: { id: 'Akan Datang', en: 'Upcoming' },
      ongoing: { id: 'Sedang Berlangsung', en: 'Ongoing' },
      past: { id: 'Sudah Berlalu', en: 'Past' },
    };
    return language === 'id' ? statusMap[status]?.id : statusMap[status]?.en;
  };

  const categories = [
    { id: 'semua', label: t.categories.all, icon: 'star' },
    { id: 'sejarah', label: language === 'id' ? 'Sejarah' : 'History', icon: 'history_edu' },
    { id: 'budaya', label: language === 'id' ? 'Budaya' : 'Culture', icon: 'palette' },
    { id: 'kemanusiaan', label: language === 'id' ? 'Kemanusiaan' : 'Humanitarian', icon: 'volunteer_activism' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Sejarah Baitul Maqdis Virtual Tour',
      description: 'Pelajari sejarah Masjid Al-Aqsa dan Kubah Shakhrah melalui virtual tour interaktif 360° yang menakjubkan!',
      image: 'https://images.unsplash.com/photo-1584018307817-585ec727f94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb21lJTIwcm9jayUyMGplcnVzYWxlbSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk2NTI0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#SejarahPalestina',
      category: 'sejarah',
      buttonText: language === 'id' ? 'Lihat Project' : 'View Project',
    },
    {
      id: 2,
      title: 'Belajar Bahasa Arab Palestina',
      description: 'Kursus online bahasa Arab dialek Palestina untuk mengenal lebih dekat saudara-saudara kita di Baitul Maqdis.',
      image: 'https://images.unsplash.com/photo-1628962691167-27b7db9997e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2OTY1MjEyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#BahasaPalestina',
      category: 'budaya',
      buttonText: language === 'id' ? 'Lihat Project' : 'View Project',
    },
    {
      id: 3,
      title: 'Dokumenter Kehidupan Gaza',
      description: 'Saksikan dokumenter tentang kehidupan sehari-hari masyarakat Gaza dan perjuangan mereka untuk pendidikan.',
      image: 'https://images.unsplash.com/photo-1633859253234-d0832f649800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlc3RpbmlhbiUyMGZhbWlseSUyMGRvY3VtZW50YXJ5fGVufDF8fHx8MTc2OTY1MjQwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#KehidupanGaza',
      category: 'kemanusiaan',
      buttonText: language === 'id' ? 'Lihat Project' : 'View Project',
    },
  ];

  const galeriProjects = [
    {
      id: 1,
      title: 'Workshop Kaligrafi Arab Al-Quds',
      description: 'Belajar seni kaligrafi Arab dengan tema ayat-ayat tentang Baitul Maqdis dan Palestina dari mentor berpengalaman.',
      image: 'https://images.unsplash.com/photo-1628962691167-27b7db9997e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2OTY1MjEyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'budaya',
      status: 'upcoming',
      statusColor: 'bg-amber-100 text-amber-800',
      date: '25 Feb 2026',
      participants: '45',
      location: 'Jakarta Selatan',
    },
    {
      id: 2,
      title: 'Webinar Arkeologi Baitul Maqdis',
      description: 'Diskusi mendalam tentang penemuan arkeologi di sekitar kompleks Al-Aqsa dan makna historisnya.',
      image: 'https://images.unsplash.com/photo-1763572361668-507e24085e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoYWVvbG9naWNhbCUyMGFuY2llbnQlMjBtaWRkbGUlMjBlYXN0fGVufDF8fHx8MTc2OTY1MjQwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'sejarah',
      status: 'ongoing',
      statusColor: 'bg-teal-100 text-teal-800',
      location: 'Online',
    },
    {
      id: 3,
      title: 'Kuliner Palestina: Cooking Class',
      description: 'Masak makanan tradisional Palestina seperti Musakhan, Maqluba, dan Knafeh bersama chef berpengalaman.',
      image: 'https://images.unsplash.com/photo-1761828122856-8703baac8e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwZm9vZCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2OTY1MjQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'budaya',
      status: 'past',
      statusColor: 'bg-slate-200 text-slate-700',
      location: 'Bandung',
    },
  ];

  const filteredProjects = selectedCategory === 'semua' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const filteredGaleriProjects = selectedCategory === 'semua' 
    ? galeriProjects 
    : galeriProjects.filter(p => p.category === selectedCategory);

  // Apply filters
  const appliedFilterGaleriProjects = filteredGaleriProjects
    .filter(p => filterStatus.length === 0 || filterStatus.includes(p.status))
    .filter(p => filterLocation.length === 0 || filterLocation.includes(p.location))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex min-h-screen relative bg-[#E5E8EC] overflow-x-hidden">
      {/* Sidebar - Desktop Only */}
      <aside className="w-64 bg-[#2B4468] border-r border-[#2B4468] fixed h-screen top-0 left-0 z-50 flex flex-col hidden lg:flex">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <Logo />
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
                onClick={onBack}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">{t.nav.home}</span>
              </button>

              <button className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white ${activeNav === 'explore' ? 'bg-white/10 shadow-sm' : 'bg-white/5 hover:bg-white/10 hover:shadow-sm'} w-full`}
                onClick={onNavigateExplore}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm font-semibold">Explore</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative"
                onClick={onNavigateMessages}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">{t.nav.messages}</span>
                <span className="absolute top-3 left-11 w-2 h-2 bg-red-500 rounded-full border border-[#2B4468]"></span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
                onClick={onNavigateSettings}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">{t.nav.settings}</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 pb-6">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">{t.nav.logout}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 w-full pb-20 md:pb-20 lg:pb-10">
        {/* Header with Search - Mobile & Desktop */}
        <header className={`bg-white/95 backdrop-blur-md px-6 py-3 space-y-3 sticky z-40 border-b border-[#D6DCE8] shadow-sm transition-all duration-300 ${showHeader ? 'top-0' : '-top-48'}`}>
          {/* Mobile Back Button & Title */}
          <div className="flex lg:hidden items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#243D68] hover:text-[#183A74] transition-colors font-bold"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm uppercase tracking-wide">{t.common.back}</span>
            </button>
            <h1 className="text-lg font-['Archivo_Black'] text-[#0E1B33] uppercase tracking-tight">Explore</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Desktop Title */}
          <div className="hidden lg:flex items-center justify-between">
            <h1 className="text-2xl font-['Archivo_Black'] text-[#0E1B33] uppercase tracking-tight">Explore Project</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#919EB2]">
              search
            </span>
            <input
              className="w-full h-12 pl-12 pr-12 rounded-[12px] border border-[#D6DCE8] bg-white text-[#0E1B33] placeholder-[#919EB2] focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] shadow-sm text-sm transition-all outline-none"
              placeholder={t.home.searchPlaceholder}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#61728F] hover:text-[#243D68] rounded-lg hover:bg-[#E5E8EC] transition-colors"
              onClick={() => setShowFilterModal(true)}
            >
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-[#243D68] text-white border border-[#243D68]'
                    : 'bg-white text-[#61728F] border border-[#D6DCE8] hover:border-[#243D68] hover:text-[#243D68]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* Tab Navigation */}
        <div className={`bg-white border-b border-[#D6DCE8] px-6 sticky z-30 shadow-sm transition-all duration-300 ${showHeader ? 'top-[168px]' : 'top-0'}`}>
          <div className="flex w-full">
            <button
              onClick={() => setSelectedTab('open')}
              className={`flex-1 pb-3 pt-3 font-semibold text-sm transition-colors relative ${
                selectedTab === 'open' ? 'text-[#243D68]' : 'text-[#61728F]'
              }`}
            >
              Open Volunteer
              {selectedTab === 'open' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
              )}
            </button>
            
            {(userRole === 'alumni' || userRole === 'alumni-guest') && (
              <button
                onClick={() => setSelectedTab('campaign')}
                className={`flex-1 pb-3 pt-3 font-semibold text-sm transition-colors relative ${
                  selectedTab === 'campaign' ? 'text-[#243D68]' : 'text-[#61728F]'
                }`}
              >
                Campaign
                {selectedTab === 'campaign' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
                )}
              </button>
            )}

            <button
              onClick={() => setSelectedTab('galeri')}
              className={`flex-1 pb-3 pt-3 font-semibold text-sm transition-colors relative ${
                selectedTab === 'galeri' ? 'text-[#243D68]' : 'text-[#61728F]'
              }`}
            >
              {t.tabs.projectGallery}
              {selectedTab === 'galeri' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* Projects List */}
        {selectedTab === 'campaign' ? (
          <div className="bg-[#E5E8EC] min-h-screen">
            <CampaignList 
              currentUserId={currentUserId} 
              onCampaignClick={onCampaignClick}
              embedded={true} 
            />
          </div>
        ) : (
          <div className="px-6 pt-4 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedTab === 'open' ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(22,36,63,0.08)] border border-[#D6DCE8] hover:shadow-lg transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/9]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[#047857] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      Open Volunteer
                    </span>
                  </div>

                  {/* Project Content */}
                  <div className="p-4">
                    <span className="text-[#243D68] text-xs font-semibold">{project.hashtag}</span>
                    
                    <h3 className="text-[18px] font-semibold text-[#0E1B33] mt-2 mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#61728F] mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <button 
                      onClick={onNavigateToDetail}
                      className="bg-[#243D68] text-white text-sm font-semibold py-2 px-5 rounded-full hover:bg-[#1a2e52] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center"
                    >
                      {project.buttonText}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              appliedFilterGaleriProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={onNavigateToDetail}
                  className="group bg-white rounded-[16px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(36,61,104,0.12)] border border-[#E8ECF0] hover:border-[#243D68]/20 transition-all duration-300 cursor-pointer"
                >
                  {/* Project Image with Gradient Overlay */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Status Badge - Floating on Image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${project.statusColor} shadow-lg`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <span className="bg-white/95 backdrop-blur-md text-[#243D68] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                        {language === 'id' ? 'Project Individu' : 'Individual Project'}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-[17px] font-bold text-[#0E1B33] leading-tight group-hover:text-[#243D68] transition-colors line-clamp-2 min-h-[48px]">
                      {project.title}
                    </h3>

                    <p className="text-[13px] text-[#61728F] leading-relaxed line-clamp-2 min-h-[40px]">
                      {project.description}
                    </p>

                    {/* Meta Information */}
                    <div className="pt-2 border-t border-[#E8ECF0]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#61728F]">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span>{project.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[#243D68] text-[13px] font-semibold group-hover:gap-2 transition-all">
                          <span>{language === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6DCE8] lg:hidden z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          <button
            onClick={onNavigateHome}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'home' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'home' ? 'filled' : ''}`}>
              home
            </span>
            <span className="text-xs font-medium">{t.nav.home}</span>
          </button>
          <button
            onClick={onNavigateExplore}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'explore' ? 'filled' : ''}`}>
              explore
            </span>
            <span className="text-xs font-medium">{t.nav.explore}</span>
          </button>
          <button
            onClick={onNavigateMessages}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors relative ${
              activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'pesan' ? 'filled' : ''}`}>
              chat_bubble
            </span>
            <span className="text-xs font-medium">{t.nav.messages}</span>
            <span className="absolute top-1.5 right-1/4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button
            onClick={onNavigateSettings}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'settings' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'settings' ? 'filled' : ''}`}>
              settings
            </span>
            <span className="text-xs font-medium">{t.nav.settings}</span>
          </button>
        </div>
      </nav>

      {/* Filter Modal */}
      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center ${showFilterModal ? 'visible' : 'hidden'}`}>
        <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#243D68]">
              {language === 'id' ? 'Filter Proyek' : 'Filter Projects'}
            </h2>
            <button className="text-[#243D68] text-xl" onClick={() => setShowFilterModal(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[#243D68]">
                {language === 'id' ? 'Status' : 'Status'}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterStatus.includes('upcoming') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterStatus.includes('upcoming')) {
                      setFilterStatus(filterStatus.filter(status => status !== 'upcoming'));
                    } else {
                      setFilterStatus([...filterStatus, 'upcoming']);
                    }
                  }}
                >
                  {language === 'id' ? 'Akan Datang' : 'Upcoming'}
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterStatus.includes('ongoing') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterStatus.includes('ongoing')) {
                      setFilterStatus(filterStatus.filter(status => status !== 'ongoing'));
                    } else {
                      setFilterStatus([...filterStatus, 'ongoing']);
                    }
                  }}
                >
                  {language === 'id' ? 'Sedang Berlangsung' : 'Ongoing'}
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterStatus.includes('past') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterStatus.includes('past')) {
                      setFilterStatus(filterStatus.filter(status => status !== 'past'));
                    } else {
                      setFilterStatus([...filterStatus, 'past']);
                    }
                  }}
                >
                  {language === 'id' ? 'Sudah Berlalu' : 'Past'}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#243D68]">
                {language === 'id' ? 'Lokasi' : 'Location'}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterLocation.includes('Jakarta Selatan') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterLocation.includes('Jakarta Selatan')) {
                      setFilterLocation(filterLocation.filter(location => location !== 'Jakarta Selatan'));
                    } else {
                      setFilterLocation([...filterLocation, 'Jakarta Selatan']);
                    }
                  }}
                >
                  Jakarta Selatan
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterLocation.includes('Online') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterLocation.includes('Online')) {
                      setFilterLocation(filterLocation.filter(location => location !== 'Online'));
                    } else {
                      setFilterLocation([...filterLocation, 'Online']);
                    }
                  }}
                >
                  Online
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterLocation.includes('Bandung') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterLocation.includes('Bandung')) {
                      setFilterLocation(filterLocation.filter(location => location !== 'Bandung'));
                    } else {
                      setFilterLocation([...filterLocation, 'Bandung']);
                    }
                  }}
                >
                  Bandung
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="bg-[#243D68] text-white text-sm font-semibold py-2 px-5 rounded-full hover:bg-[#1a2e52] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center justify-center"
              onClick={() => setShowFilterModal(false)}
            >
              {language === 'id' ? 'Terapkan Filter' : 'Apply Filter'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </div>
  );
}