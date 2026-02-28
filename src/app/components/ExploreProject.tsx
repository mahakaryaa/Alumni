import { useState, useEffect } from 'react';
import { Logo } from './Logo';
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
  const [selectedTab, setSelectedTab] = useState<'open' | 'galeri' | 'campaign'>(
    userRole === 'donatur' ? 'galeri' : initialTab
  );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      buttonText: language === 'id' ? 'Gabung Project' : 'Join Project',
    },
    {
      id: 2,
      title: 'Belajar Bahasa Arab Palestina',
      description: 'Kursus online bahasa Arab dialek Palestina untuk mengenal lebih dekat saudara-saudara kita di Baitul Maqdis.',
      image: 'https://images.unsplash.com/photo-1628962691167-27b7db9997e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBjYWxsaWdyYXBoeSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2OTY1MjEyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#BahasaPalestina',
      category: 'budaya',
      buttonText: language === 'id' ? 'Gabung Project' : 'Join Project',
    },
    {
      id: 3,
      title: 'Dokumenter Kehidupan Gaza',
      description: 'Saksikan dokumenter tentang kehidupan sehari-hari masyarakat Gaza dan perjuangan mereka untuk pendidikan.',
      image: 'https://images.unsplash.com/photo-1633859253234-d0832f649800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlc3RpbmlhbiUyMGZhbWlseSUyMGRvY3VtZW50YXJ5fGVufDF8fHx8MTc2OTY1MjQwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#KehidupanGaza',
      category: 'kemanusiaan',
      buttonText: language === 'id' ? 'Gabung Project' : 'Join Project',
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
      currentAmount: 45000000,
      targetAmount: 100000000,
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
      date: '28 Feb 2026',
      participants: '128',
      completionStatus: language === 'id' ? 'Dana Terpenuhi' : 'Fully Funded',
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
      currentAmount: 28000000,
      targetAmount: 50000000,
    },
    {
      id: 4,
      title: 'Dokumenter Kehidupan Sehari-hari di Al-Quds',
      description: 'Film dokumenter singkat yang menggambarkan kehidupan warga Palestina sehari-hari di sekitar Baitul Maqdis dan perjuangan mereka.',
      image: 'https://images.unsplash.com/photo-1695719572124-3a4ee34aa3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGFyeSUyMHBob3RvZ3JhcGh5JTIwcGFsZXN0aW5lJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzcyMjUwMjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'kemanusiaan',
      status: 'past',
      statusColor: 'bg-slate-200 text-slate-700',
      location: 'Online',
      participants: '320',
      completionStatus: language === 'id' ? 'Dokumentasi' : 'Documentation',
    },
  ];

  // Campaign data
  const campaignProjects = [
    {
      id: 1,
      title: 'Bantu Pendidikan Anak-anak Gaza',
      description: 'Kampanye penggalangan dana untuk menyediakan buku, alat tulis, dan fasilitas pendidikan bagi anak-anak di Gaza.',
      image: 'https://images.unsplash.com/photo-1771051027743-b09f223f64ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwZWR1Y2F0aW9uJTIwY2hpbGRyZW4lMjBib29rcyUyMGFyYWJpYyUyMGNhbGxpZ3JhcGh5fGVufDF8fHx8MTc3MjIzMzEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'kemanusiaan',
      currentAmount: 45000000,
      targetAmount: 100000000,
      supporters: 1250,
      daysLeft: 15,
    },
    {
      id: 2,
      title: 'Restorasi Masjid Bersejarah Al-Quds',
      description: 'Kampanye untuk mendukung restorasi dan pemeliharaan masjid-masjid bersejarah di kawasan Baitul Maqdis.',
      image: 'https://images.unsplash.com/photo-1597214792074-3a713fc1635b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBhcmNoaXRlY3R1cmUlMjBpc2xhbWljJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzcyMjMxMzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'sejarah',
      currentAmount: 78000000,
      targetAmount: 150000000,
      supporters: 2100,
      daysLeft: 30,
    },
    {
      id: 3,
      title: 'Program Beasiswa Budaya Palestina',
      description: 'Kampanye beasiswa untuk pelajar yang ingin mempelajari budaya, bahasa, dan seni tradisional Palestina.',
      image: 'https://images.unsplash.com/photo-1715458274209-61e261243b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlc3RpbmlhbiUyMHN0dWRlbnRzJTIwaGlqYWIlMjBncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcyMjMzMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'budaya',
      currentAmount: 32000000,
      targetAmount: 75000000,
      supporters: 890,
      daysLeft: 22,
    },
  ];

  const filteredProjects = selectedCategory === 'semua' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const filteredGaleriProjects = selectedCategory === 'semua' 
    ? galeriProjects 
    : galeriProjects.filter(p => p.category === selectedCategory);

  const filteredCampaignProjects = selectedCategory === 'semua' 
    ? campaignProjects 
    : campaignProjects.filter(p => p.category === selectedCategory);

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
        {userRole !== 'donatur' && (
          <div className={`bg-white border-b border-[#D6DCE8] px-6 sticky z-30 shadow-sm transition-all duration-300 ${showHeader ? 'top-[168px]' : 'top-0'}`}>
            <div className="flex w-full">
              {userRole !== 'donatur' && (
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

              <button
                onClick={() => setSelectedTab('campaign')}
                className={`flex-1 pb-3 pt-3 font-semibold text-sm transition-colors relative ${
                  selectedTab === 'campaign' ? 'text-[#243D68]' : 'text-[#61728F]'
                }`}
              >
                {t.tabs.campaign}
                {selectedTab === 'campaign' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab Description Section */}
        <div className="bg-gradient-to-r from-[#F8F9FB] to-white border-b border-[#E8ECF0] px-6 py-5">
          {selectedTab === 'open' && userRole !== 'donatur' && (
            <div className="max-w-4xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[20px]">volunteer_activism</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0E1B33] mb-1.5">
                    {language === 'id' ? 'Open Volunteer' : 'Open Volunteer'}
                  </h3>
                  <p className="text-[13px] text-[#61728F] leading-relaxed">
                    {language === 'id' 
                      ? 'Kumpulan project yang masih membutuhkan tenaga dan keahlian tambahan. Bergabunglah sebagai volunteer untuk berkontribusi langsung dalam setiap misi kemanusiaan.' 
                      : 'Collection of projects seeking additional manpower and expertise. Join as a volunteer to contribute directly to every humanitarian mission.'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {selectedTab === 'galeri' && (
            <div className="max-w-4xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[20px]">photo_library</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0E1B33] mb-1.5">
                    {language === 'id' ? 'Galeri Project Alumni' : 'Alumni Project Gallery'}
                  </h3>
                  <p className="text-[13px] text-[#61728F] leading-relaxed">
                    {language === 'id' 
                      ? 'Karya nyata dari para alumni yang telah mewujudkan mimpi kemanusiaan. Beberapa project masih terbuka untuk donasi, sementara yang lain menjadi dokumentasi inspirasi bagi generasi mendatang.' 
                      : 'Real achievements from alumni who have turned humanitarian dreams into reality. Some projects remain open for donations, while others serve as inspirational documentation for future generations.'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {selectedTab === 'campaign' && (
            <div className="max-w-4xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[20px]">campaign</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0E1B33] mb-1.5">
                    {language === 'id' ? 'Campaign Mendesak' : 'Urgent Campaign'}
                  </h3>
                  <p className="text-[13px] text-[#61728F] leading-relaxed">
                    {language === 'id' 
                      ? 'Project prioritas yang digagas langsung oleh pengurus Saladin Community untuk merespons situasi mendesak. Membutuhkan dukungan dana dan tenaga ahli dalam waktu terbatas untuk dampak maksimal.' 
                      : 'Priority projects initiated directly by Saladin Community leadership to respond to urgent situations. Requires financial support and expert assistance within limited time for maximum impact.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Projects List */}
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
                    {language === 'id' ? 'Lihat Detail' : 'View Details'}
                  </button>
                </div>
              </div>
            ))
          ) : selectedTab === 'galeri' ? (
            appliedFilterGaleriProjects.map((project) => {
              const hasFunding = project.currentAmount !== undefined && project.targetAmount !== undefined;
              const percentage = hasFunding ? (project.currentAmount / project.targetAmount) * 100 : 0;
              
              return (
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

                    {/* Progress Bar - Only show if project has funding */}
                    {hasFunding ? (
                      <div className="space-y-1.5 pb-2">
                        <div className="flex justify-between text-xs text-[#61728F]">
                          <span>{language === 'id' ? 'Terkumpul' : 'Raised'}</span>
                          <span className="font-semibold text-[#243D68]">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#243D68] to-[#FAC06E] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#243D68]">
                            Rp {(project.currentAmount / 1000000).toFixed(0)}jt
                          </span>
                          <span className="text-[#61728F]">
                            {language === 'id' ? 'dari' : 'of'} Rp {(project.targetAmount / 1000000).toFixed(0)}jt
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="pb-2">
                        {/* Fully Funded Status Badge */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-[18px]">check_circle</span>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-emerald-700">
                                {project.completionStatus || (language === 'id' ? 'Dana Terpenuhi' : 'Fully Funded')}
                              </p>
                              <p className="text-[11px] text-emerald-600">
                                {language === 'id' ? 'Siap dilaksanakan' : 'Ready to execute'}
                              </p>
                            </div>
                          </div>
                          {project.date && (
                            <div className="flex items-center gap-1 text-emerald-700">
                              <span className="material-symbols-outlined text-[16px]">event</span>
                              <span className="text-xs font-semibold">{project.date}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="pt-2 border-t border-[#E8ECF0] flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-[#61728F]">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span>{project.location}</span>
                        </div>
                      </div>
                      
                      {!hasFunding && (
                        <div className="flex items-center gap-2 text-[#243D68] text-[13px] font-semibold group-hover:gap-2 transition-all">
                          <span>{language === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button - Only for projects with funding (donation) */}
                    {hasFunding && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToDetail?.();
                        }}
                        className="w-full bg-gradient-to-r from-[#FAC06E] to-[#E5A84E] text-[#243D68] text-sm font-bold py-3 px-5 rounded-xl shadow-[4px_4px_0px_0px_rgba(250,192,110,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(250,192,110,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                        <span>{language === 'id' ? 'Donasi Project' : 'Donate Project'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            filteredCampaignProjects.map((project) => {
              const percentage = (project.currentAmount / project.targetAmount) * 100;
              return (
                <div
                  key={project.id}
                  onClick={() => onCampaignClick?.(project.id.toString())}
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
                    
                    {/* Campaign Badge - Floating on Image */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#FAC06E] text-[#16243F] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Campaign
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

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-[#61728F]">
                        <span>{language === 'id' ? 'Terkumpul' : 'Raised'}</span>
                        <span className="font-semibold text-[#243D68]">{percentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#243D68] to-[#FAC06E] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#243D68]">
                          Rp {(project.currentAmount / 1000000).toFixed(0)}jt
                        </span>
                        <span className="text-[#61728F]">
                          {language === 'id' ? 'dari' : 'of'} Rp {(project.targetAmount / 1000000).toFixed(0)}jt
                        </span>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="pt-2 border-t border-[#E8ECF0] flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-[#61728F]">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">group</span>
                          <span>{project.supporters}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span>{project.daysLeft} {language === 'id' ? 'hari' : 'days'}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToDetail?.();
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-[#243D68] to-[#1a2e52] text-white text-sm font-bold py-3 px-5 rounded-xl shadow-[4px_4px_0px_0px_rgba(250,192,110,1)] hover:shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <span>{language === 'id' ? 'Gabung Project' : 'Join Project'}</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
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