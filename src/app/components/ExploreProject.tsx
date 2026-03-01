import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useTranslation } from '@/hooks/useTranslation';

interface ExploreProjectProps {
  onBack?: () => void;
  initialTab?: 'open' | 'galeri' | 'campaign';
  onNavigateToDetail?: (project: { 
    id: number | string; 
    title: string; 
    imageUrl: string; 
    category: string; 
    type: 'open-volunteer' | 'galeri-with-funding' | 'galeri-documentation' | 'campaign';
    isFunding?: boolean;
    isVolunteerOpen?: boolean;
  }) => void;
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
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
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
    { id: 'semua', label: t.categories.all, icon: 'grid_view' },
    { id: 'sejarah', label: language === 'id' ? 'Sejarah' : 'History', icon: 'history_edu' },
    { id: 'budaya', label: language === 'id' ? 'Budaya' : 'Culture', icon: 'palette' },
    { id: 'kemanusiaan', label: language === 'id' ? 'Kemanusiaan' : 'Humanitarian', icon: 'volunteer_activism' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Tim Konten Digital Al-Aqsa',
      description: 'Buat konten media sosial edukatif tentang sejarah Baitul Maqdis untuk meningkatkan kesadaran generasi muda secara global.',
      image: 'https://images.unsplash.com/photo-1517309561013-16f6e4020305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHAlMjBtb2JpbGUlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHRlYW18ZW58MXx8fHwxNzcyMzMwNDU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#KontenDigitalPalestina',
      category: 'sejarah',
      slots: 5,
      location: 'Remote / Online',
      skills: ['Desain Grafis', 'Copywriting', 'Video Editing'],
      buttonText: language === 'id' ? 'Gabung Project' : 'Join Project',
      type: 'open-volunteer', // NEW: Explicit type
      isFunding: false, // NEW: No funding for volunteer projects
      isVolunteerOpen: true, // NEW: Volunteer registration is open
    },
    {
      id: 2,
      title: 'Pengajaran Bahasa Arab Dialek Palestina',
      description: 'Jadilah pengajar sukarela untuk kelas daring bahasa Arab dialek Palestina bagi pelajar Indonesia yang ingin lebih dekat dengan saudara di Baitul Maqdis.',
      image: 'https://images.unsplash.com/photo-1618285992209-a0d69673e7b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBsYW5ndWFnZSUyMHRlYWNoaW5nJTIwZWR1Y2F0aW9uJTIwY2xhc3N8ZW58MXx8fHwxNzcyMzMwNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#BahasaArabPalestina',
      category: 'budaya',
      slots: 3,
      location: 'Online',
      skills: ['Bahasa Arab', 'Mengajar', 'Komunikasi'],
      buttonText: language === 'id' ? 'Gabung Project' : 'Join Project',
      type: 'open-volunteer',
      isFunding: false,
      isVolunteerOpen: true,
    },
    {
      id: 3,
      title: 'Tim Dokumentasi Kehidupan Gaza',
      description: 'Bergabunglah sebagai jurnalis warga dan dokumentator untuk merekam dan menyebarluaskan kisah nyata perjuangan masyarakat Gaza dalam mempertahankan budaya dan harapan.',
      image: 'https://images.unsplash.com/photo-1566321235232-b2822255b733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGRvY3VtZW50YXJ5JTIwam91cm5hbGlzbSUyMHRlYW18ZW58MXx8fHwxNzcyMzMwNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hashtag: '#SuaraGaza',
      category: 'kemanusiaan',
      slots: 8,
      location: 'Remote / Online',
      skills: ['Fotografi', 'Penulisan', 'Penelitian'],
      buttonText: language === 'id' ? 'Gabung Project' : 'Join Project',
      type: 'open-volunteer',
      isFunding: false,
      isVolunteerOpen: true,
    },
  ];

  const galeriProjects = [
    {
      id: 1,
      title: 'Workshop Kaligrafi Arab Al-Quds',
      description: 'Belajar seni kaligrafi Arab dengan tema ayat-ayat tentang Baitul Maqdis dan Palestina dari mentor berpengalaman. Hasil karya dipamerkan dan dijual untuk dana solidaritas.',
      image: 'https://images.unsplash.com/photo-1636055308958-2914b559833f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYWxlc3RpbmUlMjBjdWx0dXJhbCUyMGFydCUyMHdvcmtzaG9wJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjMzMDQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'budaya',
      status: 'ongoing',
      statusColor: 'bg-teal-100 text-teal-800',
      date: '15 Mar 2026',
      participants: '62',
      location: 'Jakarta Selatan',
      currentAmount: 28000000,
      targetAmount: 60000000,
      type: 'galeri-with-funding', // NEW: Explicit type
      isFunding: true, // NEW: This galeri project accepts donations
      isVolunteerOpen: false, // NEW: No volunteer recruitment
    },
    {
      id: 2,
      title: 'Webinar Arkeologi & Sejarah Baitul Maqdis',
      description: 'Diskusi mendalam bersama para pakar arkeologi tentang penemuan bersejarah di sekitar kompleks Al-Aqsa dan makna spiritualnya bagi umat Muslim dunia.',
      image: 'https://images.unsplash.com/photo-1768306444082-94ed8048ebe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZSUyMEplcnVzYWxlbSUyMGhpc3RvcmljfGVufDF8fHx8MTc3MjMzMDQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'sejarah',
      status: 'upcoming',
      statusColor: 'bg-amber-100 text-amber-800',
      location: 'Online',
      date: '28 Mar 2026',
      participants: '215',
      completionStatus: language === 'id' ? 'Dana Terpenuhi' : 'Fully Funded',
      type: 'galeri-documentation', // NEW: Documentation only
      isFunding: false, // NEW: No funding (already completed or not needed)
      isVolunteerOpen: false, // NEW: No volunteer recruitment
    },
    {
      id: 3,
      title: 'Pameran Foto: Wajah-Wajah Palestina',
      description: 'Pameran foto kolektif karya alumni yang mengabadikan kehidupan, harapan, dan keteguhan warga Palestina. Telah digelar di 4 kota besar Indonesia dan menyentuh ribuan hati.',
      image: 'https://images.unsplash.com/photo-1700028285843-d19464592839?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjBjb21tdW5pdHklMjBQYWxlc3RpbmUlMjBodW1hbml0YXJiYW4lMjBwcm9qZWN0fGVufDF8fHx8MTc3MjMzMDQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'kemanusiaan',
      status: 'past',
      statusColor: 'bg-slate-200 text-slate-700',
      location: 'Jakarta, Bandung, Surabaya, Yogyakarta',
      participants: '4.800',
      completionStatus: language === 'id' ? 'Selesai' : 'Completed',
      type: 'galeri-documentation', // NEW: Documentation only (past event)
      isFunding: false, // NEW: No funding for past events
      isVolunteerOpen: false, // NEW: No volunteer recruitment
    },
  ];

  // Campaign data
  const campaignProjects = [
    {
      id: 1,
      title: 'Bantuan Pangan Darurat Gaza',
      description: 'Kampanye mendesak pengiriman paket pangan untuk keluarga-keluarga yang terdampak konflik di Gaza. Setiap donasi langsung tersalurkan melalui mitra terpercaya di lapangan.',
      image: 'https://images.unsplash.com/photo-1752010284872-76526682bfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYWlkJTIwZGlzdHJpYnV0aW9uJTIwaHVtYW5pdGFyaWFuJTIwcmVsaWVmfGVufDF8fHx8MTc3MjMzMDQ1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'kemanusiaan',
      currentAmount: 87500000,
      targetAmount: 150000000,
      supporters: 3420,
      daysLeft: 8,
      type: 'campaign', // NEW: Explicit type
      isFunding: true, // NEW: Campaign accepts donations
      isVolunteerOpen: true, // NEW: Campaign also accepts volunteers
    },
    {
      id: 2,
      title: 'Restorasi Masjid Bersejarah Al-Quds',
      description: 'Kampanye mendukung restorasi dan pemeliharaan masjid-masjid bersejarah di kawasan Baitul Maqdis yang mengalami kerusakan struktural akibat usia dan tekanan eksternal.',
      image: 'https://images.unsplash.com/photo-1763144967746-dc8d5cc57630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjByZXN0b3JhdGlvbiUyMGhlcml0YWdlJTIwYXJjaGl0ZWN0dXJlJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzIzMzA0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'sejarah',
      currentAmount: 78000000,
      targetAmount: 200000000,
      supporters: 2100,
      daysLeft: 21,
      type: 'campaign',
      isFunding: true,
      isVolunteerOpen: true,
    },
    {
      id: 3,
      title: 'Klinik Kesehatan Darurat Palestina',
      description: 'Galang dana untuk mendirikan pos klinik darurat bergerak yang siap memberikan layanan kesehatan gratis bagi warga Palestina di daerah yang sulit dijangkau fasilitas medis.',
      image: 'https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoJTIwY2xpbmljJTIwdm9sdW50ZXVyJTIwZG9jdG9yfGVufDF8fHx8MTc3MjMzMDQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'kemanusiaan',
      currentAmount: 42000000,
      targetAmount: 120000000,
      supporters: 1680,
      daysLeft: 30,
      type: 'campaign',
      isFunding: true,
      isVolunteerOpen: true,
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

  // Apply filters for Open Volunteer
  const appliedFilterOpenProjects = filteredProjects
    .filter(p => filterLocation.length === 0 || filterLocation.some(loc => p.location.includes(loc)))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Apply filters for Galeri
  const appliedFilterGaleriProjects = filteredGaleriProjects
    .filter(p => filterStatus.length === 0 || filterStatus.includes(p.status))
    .filter(p => filterLocation.length === 0 || filterLocation.some(loc => p.location.includes(loc)))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Apply filters for Campaign
  const appliedFilterCampaignProjects = filteredCampaignProjects
    .filter(p => filterStatus.length === 0 || filterStatus.includes(p.status))
    .filter(p => filterLocation.length === 0 || filterLocation.some(loc => p.location.includes(loc)))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Determine which projects to show based on category filter
  let displayedProjects = {
    open: appliedFilterOpenProjects,
    galeri: appliedFilterGaleriProjects,
    campaign: appliedFilterCampaignProjects
  };

  // Apply category filter if any selected
  if (filterCategory.length > 0) {
    if (!filterCategory.includes('open-volunteer')) {
      displayedProjects.open = [];
    }
    if (!filterCategory.includes('galeri')) {
      displayedProjects.galeri = [];
    }
    if (!filterCategory.includes('campaign')) {
      displayedProjects.campaign = [];
    }
  }

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
      <main className="flex-1 lg:ml-64 w-full pb-24 md:pb-24 lg:pb-10">
        {/* Header with Search - Mobile & Desktop */}
        <header className={`bg-white/95 backdrop-blur-md px-6 py-5 space-y-4 sticky z-40 border-b border-[#D6DCE8] shadow-sm transition-all duration-300 ${showHeader ? 'top-0' : '-top-48'}`}>
          {/* Mobile Back Button & Title */}
          <div className="flex lg:hidden items-center justify-between pt-1">
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
          <div className="hidden lg:flex items-center justify-between pt-1">
            <h1 className="text-2xl font-['Archivo_Black'] text-[#0E1B33] uppercase tracking-tight">Explore Project</h1>
          </div>

          {/* Search Bar */}
          <div className="relative pt-1">
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
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pt-1">
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
          <div className={`bg-white border-b border-[#D6DCE8] sticky z-30 shadow-sm transition-all duration-300 ${showHeader ? 'top-[168px]' : 'top-0'}`}>
            <div className="flex w-full">
              {userRole !== 'donatur' && (
                <button
                  onClick={() => setSelectedTab('open')}
                  className={`flex-1 py-3.5 font-semibold text-[13px] transition-colors relative flex items-center justify-center ${
                    selectedTab === 'open' ? 'text-[#243D68]' : 'text-[#61728F]'
                  }`}
                >
                  <span className="whitespace-nowrap">Open Volunteer</span>
                  {selectedTab === 'open' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
                  )}
                </button>
              )}

              <button
                onClick={() => setSelectedTab('galeri')}
                className={`flex-1 py-3.5 font-semibold text-[13px] transition-colors relative flex items-center justify-center ${
                  selectedTab === 'galeri' ? 'text-[#243D68]' : 'text-[#61728F]'
                }`}
              >
                <span className="whitespace-nowrap">{t.tabs.projectGallery}</span>
                {selectedTab === 'galeri' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setSelectedTab('campaign')}
                className={`flex-1 py-3.5 font-semibold text-[13px] transition-colors relative flex items-center justify-center ${
                  selectedTab === 'campaign' ? 'text-[#243D68]' : 'text-[#61728F]'
                }`}
              >
                <span className="whitespace-nowrap">{t.tabs.campaign}</span>
                {selectedTab === 'campaign' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68] rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab Description Section */}
        <div className="bg-gradient-to-r from-[#F8F9FB] to-white border-b border-[#E8ECF0] px-6 py-6">
          {selectedTab === 'open' && userRole !== 'donatur' && (
            <div className="max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[20px]">volunteer_activism</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0E1B33] mb-2">
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
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#243D68] to-[#1a2e52] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[20px]">photo_library</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0E1B33] mb-2">
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
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FAC06E] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[20px]">campaign</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[#0E1B33] mb-2">
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
        <div className="px-6 pt-6 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTab === 'open' ? (
            displayedProjects.open.map((project) => (
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
                <div className="p-5">
                  <span className="text-[#243D68] text-xs font-semibold">{project.hashtag}</span>
                  
                  <h3 className="text-[17px] font-semibold text-[#0E1B33] mt-2.5 mb-2.5 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#61728F] mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.skills.map((skill) => (
                      <span key={skill} className="bg-[#EEF1F7] text-[#243D68] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-[12px] text-[#61728F] mb-4 border-t border-[#E8ECF0] pt-3">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">location_on</span>
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">person_add</span>
                      <span>{project.slots} {language === 'id' ? 'slot tersisa' : 'slots left'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      // DEBUG: Log dari Open Volunteer tab
                      console.log('🎯 [ExploreProject - Open Tab] Card clicked:', project.title);
                      console.log('📊 Project data:', { type: project.type, isFunding: project.isFunding, isVolunteerOpen: project.isVolunteerOpen });
                      
                      onNavigateToDetail?.({
                        id: project.id,
                        title: project.title,
                        imageUrl: project.image,
                        category: project.category,
                        type: project.type, // Dynamic: 'open-volunteer'
                        isFunding: project.isFunding, // Dynamic: false
                        isVolunteerOpen: project.isVolunteerOpen, // Dynamic: true
                      });
                    }}
                    className="w-full bg-[#243D68] text-white text-sm font-semibold py-2.5 px-6 rounded-xl hover:bg-[#1a2e52] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">group_add</span>
                    <span>{language === 'id' ? 'Join Project' : 'Join Project'}</span>
                  </button>
                </div>
              </div>
            ))
          ) : selectedTab === 'galeri' ? (
            displayedProjects.galeri.map((project) => {
              // hasAmounts untuk display progress bar (butuh angka aktual)
              const hasAmounts = project.currentAmount !== undefined && project.targetAmount !== undefined;
              const percentage = hasAmounts ? (project.currentAmount / project.targetAmount) * 100 : 0;
              
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    // DEBUG: Log dari Galeri tab
                    console.log('🎨 [ExploreProject - Galeri Tab] Card clicked:', project.title);
                    console.log('📊 Project data:', { type: project.type, isFunding: project.isFunding, isVolunteerOpen: project.isVolunteerOpen });
                    
                    onNavigateToDetail?.({
                      id: project.id,
                      title: project.title,
                      imageUrl: project.image,
                      category: project.category,
                      type: project.type, // Dynamic: 'galeri-with-funding' or 'galeri-documentation'
                      isFunding: project.isFunding, // Dynamic: true or false
                      isVolunteerOpen: project.isVolunteerOpen, // Dynamic: false
                    });
                  }}
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

                    {/* Progress Bar - Berbasis project.isFunding (data-driven) */}
                    {project.isFunding && hasAmounts ? (
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
                      
                      {/* Lihat Detail link - hanya untuk galeri-documentation (isFunding=false) */}
                      {!project.isFunding && (
                        <div className="flex items-center gap-2 text-[#243D68] text-[13px] font-semibold group-hover:gap-2 transition-all">
                          <span>{language === 'id' ? 'Lihat Detail' : 'View Details'}</span>
                          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button - Berbasis project.isFunding (data-driven, bukan derived dari amount fields) */}
                    {project.isFunding && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // DEBUG: Log dari Galeri tab (funding projects)
                          console.log('💰 [ExploreProject - Galeri Tab Funding] Button clicked:', project.title);
                          console.log('📊 Project data:', { type: project.type, isFunding: project.isFunding, isVolunteerOpen: project.isVolunteerOpen });
                          
                          onNavigateToDetail?.({
                            id: project.id,
                            title: project.title,
                            imageUrl: project.image,
                            category: project.category,
                            type: project.type, // Dynamic from data
                            isFunding: project.isFunding,
                            isVolunteerOpen: project.isVolunteerOpen,
                          });
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
            displayedProjects.campaign.map((project) => {
              const percentage = (project.currentAmount / project.targetAmount) * 100;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    // DEBUG: Log dari Campaign tab
                    console.log('📣 [ExploreProject - Campaign Tab] Card clicked:', project.title);
                    console.log('📊 Project data:', { type: project.type, isFunding: project.isFunding, isVolunteerOpen: project.isVolunteerOpen });
                    
                    onNavigateToDetail?.({
                      id: project.id,
                      title: project.title,
                      imageUrl: project.image,
                      category: project.category,
                      type: project.type, // Dynamic: 'campaign'
                      isFunding: project.isFunding, // Dynamic: true
                      isVolunteerOpen: project.isVolunteerOpen, // Dynamic: true
                    });
                  }}
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

                    {/* CTA Buttons - Campaign: "Donasi Project" + "Join Project" (dual CTA) */}
                    <div className="flex gap-2 mt-4">
                      {/* Donasi Project Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('💰 [ExploreProject - Campaign Tab] Donasi clicked:', project.title);
                          console.log('📊 Project data:', { type: project.type, isFunding: project.isFunding, isVolunteerOpen: project.isVolunteerOpen });
                          
                          onNavigateToDetail?.({
                            id: project.id,
                            title: project.title,
                            imageUrl: project.image,
                            category: project.category,
                            type: 'campaign',
                            isFunding: project.isFunding,
                            isVolunteerOpen: project.isVolunteerOpen,
                          });
                        }}
                        className="flex-1 bg-gradient-to-r from-[#FAC06E] to-[#E5A84E] text-[#243D68] text-sm font-bold py-3 px-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(250,192,110,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(250,192,110,0.5)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                        <span>{language === 'id' ? 'Donasi Project' : 'Donate Project'}</span>
                      </button>
                      
                      {/* Join Project Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('🚀 [ExploreProject - Campaign Tab] Join clicked:', project.title);
                          console.log('📊 Project data:', { type: project.type, isFunding: project.isFunding, isVolunteerOpen: project.isVolunteerOpen });
                          
                          onNavigateToDetail?.({
                            id: project.id,
                            title: project.title,
                            imageUrl: project.image,
                            category: project.category,
                            type: 'campaign',
                            isFunding: project.isFunding,
                            isVolunteerOpen: project.isVolunteerOpen,
                          });
                        }}
                        className="flex-1 bg-gradient-to-r from-[#243D68] to-[#1a2e52] text-white text-sm font-bold py-3 px-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(36,61,104,0.4)] hover:shadow-[4px_4px_0px_0px_rgba(36,61,104,0.4)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">group_add</span>
                        <span>{language === 'id' ? 'Join Project' : 'Join Project'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          
          {/* Empty State - When no projects match filters */}
          {selectedTab === 'open' && displayedProjects.open.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 rounded-full bg-[#F8F9FB] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-[#61728F]">filter_list_off</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E1B33] mb-2">
                {language === 'id' ? 'Tidak Ada Project yang Sesuai' : 'No Matching Projects'}
              </h3>
              <p className="text-sm text-[#61728F] text-center max-w-md">
                {language === 'id' 
                  ? 'Coba ubah filter atau kata kunci pencarian untuk menemukan project lainnya.' 
                  : 'Try adjusting your filters or search keywords to find other projects.'}
              </p>
            </div>
          )}
          
          {selectedTab === 'galeri' && displayedProjects.galeri.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 rounded-full bg-[#F8F9FB] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-[#61728F]">filter_list_off</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E1B33] mb-2">
                {language === 'id' ? 'Tidak Ada Project yang Sesuai' : 'No Matching Projects'}
              </h3>
              <p className="text-sm text-[#61728F] text-center max-w-md">
                {language === 'id' 
                  ? 'Coba ubah filter atau kata kunci pencarian untuk menemukan project lainnya.' 
                  : 'Try adjusting your filters or search keywords to find other projects.'}
              </p>
            </div>
          )}
          
          {selectedTab === 'campaign' && displayedProjects.campaign.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 rounded-full bg-[#F8F9FB] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-[#61728F]">filter_list_off</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E1B33] mb-2">
                {language === 'id' ? 'Tidak Ada Project yang Sesuai' : 'No Matching Projects'}
              </h3>
              <p className="text-sm text-[#61728F] text-center max-w-md">
                {language === 'id' 
                  ? 'Coba ubah filter atau kata kunci pencarian untuk menemukan project lainnya.' 
                  : 'Try adjusting your filters or search keywords to find other projects.'}
              </p>
            </div>
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
            {/* Kategori Filter */}
            <div>
              <h3 className="text-sm font-semibold text-[#243D68]">
                {language === 'id' ? 'Kategori' : 'Category'}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterCategory.includes('open-volunteer') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterCategory.includes('open-volunteer')) {
                      setFilterCategory(filterCategory.filter(cat => cat !== 'open-volunteer'));
                    } else {
                      setFilterCategory([...filterCategory, 'open-volunteer']);
                    }
                  }}
                >
                  Open Volunteer
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterCategory.includes('galeri') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterCategory.includes('galeri')) {
                      setFilterCategory(filterCategory.filter(cat => cat !== 'galeri'));
                    } else {
                      setFilterCategory([...filterCategory, 'galeri']);
                    }
                  }}
                >
                  {language === 'id' ? 'Galeri Project' : 'Gallery Project'}
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    filterCategory.includes('campaign') ? 'bg-[#243D68] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => {
                    if (filterCategory.includes('campaign')) {
                      setFilterCategory(filterCategory.filter(cat => cat !== 'campaign'));
                    } else {
                      setFilterCategory([...filterCategory, 'campaign']);
                    }
                  }}
                >
                  Campaign
                </button>
              </div>
            </div>

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