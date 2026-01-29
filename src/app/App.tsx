import { useState } from 'react';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import { toastMessages } from '@/utils/toast';
import { STORAGE_KEYS } from '@/constants';
import { ProjectDetail } from '@/app/components/ProjectDetail';
import { ProjectDetailAlumni } from '@/app/components/ProjectDetailAlumni';
import { ExploreProject } from '@/app/components/ExploreProject';
import { AlumniStoryDetail } from '@/app/components/AlumniStoryDetail';
import { Login } from '@/app/components/Login';
import { EventDetail } from '@/app/components/EventDetail';
import { MessagePage } from '@/app/components/MessagePage';
import { SettingsPage } from '@/app/components/SettingsPage';
import { MessagesAlumni } from '@/app/components/MessagesAlumni';
import { DonationPage } from '@/app/components/DonationPage';
import heroImage from 'figma:asset/e58bcf57f4d8cba056148583d179c170bd719908.png';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [currentView, setCurrentView] = useState<'home' | 'project-detail' | 'explore' | 'alumni-story' | 'login' | 'event-detail' | 'messages' | 'settings' | 'donation'>('home');
  const [exploreInitialTab, setExploreInitialTab] = useState<'open' | 'galeri'>('open');
  const [projectDetailInitialTab, setProjectDetailInitialTab] = useState<'overview' | 'progress' | 'members' | 'discussion' | 'wallet'>('overview');
  
  // User role with localStorage persistence
  const [userRole, setUserRole] = useState<'donatur' | 'alumni' | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return saved as 'donatur' | 'alumni' | null;
  });

  // Notification count state
  const [notificationCount, setNotificationCount] = useState(3); // Mock data: 3 unread notifications

  // Logout handler
  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    setCurrentView('home');
    setActiveNav('home');
    toastMessages.logout.success();
  };

  // Login handler with persistence
  const handleLogin = (role: 'donatur' | 'alumni') => {
    setUserRole(role);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    setCurrentView('home');
    setActiveNav('home');
  };

  if (currentView === 'login') {
    return <Login onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} onLoginSuccess={handleLogin} />;
  }

  if (currentView === 'project-detail') {
    // Show different detail page based on user role
    if (userRole === 'alumni') {
      return <ProjectDetailAlumni 
        onBack={() => {
          setCurrentView('home');
          setActiveNav('home');
        }} 
        initialTab={projectDetailInitialTab}
        onNavigateHome={() => {
          setCurrentView('home');
          setActiveNav('home');
        }}
        onNavigateExplore={() => {
          setCurrentView('explore');
          setActiveNav('explore');
        }}
        onNavigateMessages={() => {
          setCurrentView('messages');
          setActiveNav('pesan');
        }}
        onNavigateSettings={() => {
          setCurrentView('settings');
          setActiveNav('settings');
        }}
        onLogout={handleLogout}
        activeNav={activeNav}
      />;
    }
    
    return <ProjectDetail onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} initialTab={projectDetailInitialTab} />;
  }

  if (currentView === 'explore') {
    return <ExploreProject 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }} 
      initialTab={exploreInitialTab} 
      onNavigateToDetail={() => setCurrentView('project-detail')}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  if (currentView === 'alumni-story') {
    return <AlumniStoryDetail onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} />;
  }

  if (currentView === 'event-detail') {
    return <EventDetail onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} />;
  }

  if (currentView === 'messages') {
    // Show different messages page based on user role
    if (userRole === 'alumni') {
      return <MessagesAlumni 
        onBack={() => {
          setCurrentView('home');
          setActiveNav('home');
        }}
        onNavigateToProject={() => {
          setProjectDetailInitialTab('overview');
          setCurrentView('project-detail');
        }}
        onNavigateHome={() => {
          setCurrentView('home');
          setActiveNav('home');
        }}
        onNavigateExplore={() => {
          setCurrentView('explore');
          setActiveNav('explore');
        }}
        onNavigateMessages={() => {
          setCurrentView('messages');
          setActiveNav('pesan');
        }}
        onNavigateSettings={() => {
          setCurrentView('settings');
          setActiveNav('settings');
        }}
        onLogout={handleLogout}
        activeNav={activeNav}
      />;
    }
    
    return <MessagePage 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  if (currentView === 'settings') {
    return <SettingsPage 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  if (currentView === 'donation') {
    return <DonationPage 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      projectTitle="Rekonstruksi Masjid Al-Aqsa"
      projectCategory="Pembangunan"
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  return (
    <ErrorBoundary>
      <Toaster position="top-center" richColors closeButton />
      <div className="flex min-h-screen relative bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2B4468] border-r border-[#2B4468] fixed h-screen top-0 left-0 z-50 flex flex-col hidden lg:flex shadow-sm">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md rounded-[10px]">
              <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                PROJEKKITA
              </span>
            </div>
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'home'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('home');
                  setCurrentView('home');
                }}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm font-semibold">Home</span>
              </a>

              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'explore'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </a>

              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'pesan'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('pesan');
                  setCurrentView('messages');
                }}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </a>

              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'settings'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('settings');
                  setCurrentView('settings');
                }}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </a>
            </div>
          </nav>
          
          {/* Logout Button */}
          <div className="p-5 pb-6">
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all w-full text-white/60 hover:bg-white/5 hover:text-white"
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 w-full pb-10 lg:pb-10 pb-20">
        {/* Header - Mobile Only */}
        <header className="bg-white/90 sticky top-0 z-30 px-6 py-4 flex items-center justify-between backdrop-blur-sm md:hidden border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-2">
            <img
              alt="ProjekKita Logo"
              className="h-8 w-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6G8ZKTEYF7uDrKB9iNHzELij-Ce_P4aVWbG01h9az5aKUlRf0ApXijGtvJFbNV70APZOi3DMM-RhwjVOza7kIPSiSFhc36dejx7W6CQKP536SdEWyEYZrZsKyHwp29FC4Zzrs5Eb0izefohfdDSa6ZfmNyUC5bCvfPj8e78pUsarCG56NVU4PNR9SEopecyZ4GvNeWKsPzsUMXKNWwOXfMSEG7cjxacIoFydo8Yan3srJZJhEN61VUH_VW3vjTgsiGI_zQXfv72Dx"
            />
            <span className="font-['Archivo_Black'] text-lg text-[#0E1B33] uppercase tracking-tight">ProjekKita</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#6B7280] hover:text-[#243D68] transition-colors relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA]">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="bg-gradient-to-r from-[#243D68] to-[#30518B] text-white font-bold py-2.5 px-5 rounded-lg text-sm hover:shadow-lg transition shadow-md uppercase tracking-wide min-h-[44px]"
            >
              Login
            </button>
          </div>
        </header>

        <div className="px-6 lg:px-10 max-w-7xl mx-auto space-y-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-16 mt-6">
            {/* Notification & Login - Top Right */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center gap-2 md:gap-4 z-30">
              <button className="hidden md:block text-[#61728F] hover:text-[#243D68] transition-colors relative">
                <span className="material-symbols-outlined text-2xl">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <a
                className="hidden md:block bg-[#243D68] text-white font-semibold py-2.5 px-6 rounded-[12px] text-sm hover:bg-[#183A74] transition shadow-md"
                href="#"
                onClick={() => setCurrentView('login')}
              >
                Login
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center relative z-10">
              {/* Left Content */}
              <div className="space-y-6 max-w-xl">
                <div>
                  <p className="text-[#FAC06E] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    Hello I'm
                  </p>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-['Archivo_Black'] text-[#0E1B33] leading-[0.95] uppercase tracking-tighter">
                  Bersama Berjuang Untuk Al Aqsa
                </h1>
                
                <p className="text-[#61728F] text-base lg:text-lg leading-relaxed font-light">
                  Bergabung dengan ribuan alumni untuk mendukung saudara-saudara kita di Palestina. Mari bersatu dalam aksi nyata untuk Baitul Maqdis dan rakyat Palestina.
                </p>

                {/* CTA Buttons */}
                <div className="hidden md:flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => {
                      setActiveNav('explore');
                      setCurrentView('explore');
                      setExploreInitialTab('open');
                    }}
                    className="bg-[#183A74] text-white font-bold uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-[#243D68] transition-all duration-300 flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    <span className="material-symbols-outlined text-xl">explore</span>
                    <span>Explore Project</span>
                  </button>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative flex items-center justify-center">
                {/* Animated pulsing circles - solid ripple effect */}
                <div className="absolute w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-[#FAC06E]/30 animate-ripple"></div>
                <div className="absolute w-64 h-64 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-full bg-[#FAC06E]/20 animate-ripple"></div>
                <div className="absolute w-72 h-72 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] rounded-full bg-[#FAC06E]/30 animate-ripple"></div>
                
                {/* Large Circle Background - replaced with Al-Aqsa image */}
                <img
                  src={heroImage}
                  alt="Masjid Al-Aqsa Complex"
                  className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover opacity-90 relative z-10"
                />
              </div>
            </div>

            {/* Subtle Background Decoration */}
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[#FAC06E]/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 border-4 border-[#243D68]/10 rounded-full"></div>
          </section>

          {/* Search Bar */}
          <section className="relative max-w-2xl md:max-w-none mx-auto">
            <span className="material-symbols-outlined absolute left-4 md:left-5 lg:left-6 top-1/2 -translate-y-1/2 text-[#919EB2] text-xl md:text-2xl">
              search
            </span>
            <input
              className="w-full h-12 md:h-14 lg:h-16 pl-12 md:pl-14 lg:pl-16 pr-12 md:pr-14 lg:pr-16 rounded-2xl border border-[#D6DCE8] bg-white text-[#0E1B33] placeholder-[#919EB2] focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] shadow-sm transition-all outline-none text-sm md:text-base lg:text-lg"
              placeholder="Cari proyek impianmu..."
              type="text"
            />
            <button className="absolute right-3 md:right-4 lg:right-5 top-1/2 -translate-y-1/2 p-2 text-[#61728F] hover:text-[#243D68] rounded-lg hover:bg-[#E5E8EC] transition-colors">
              <span className="material-symbols-outlined text-xl md:text-2xl">tune</span>
            </button>
          </section>

          {/* Categories */}
          <section>
            <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#243D68] text-white rounded-full text-sm font-semibold whitespace-nowrap shadow-md border border-[#243D68] transition-transform active:scale-95">
                <span className="material-symbols-outlined text-[20px]">star</span> Semua
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D6DCE8] text-[#61728F] rounded-full text-sm font-medium whitespace-nowrap hover:border-[#243D68] hover:text-[#243D68] transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[20px]">school</span> Pendidikan
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D6DCE8] text-[#61728F] rounded-full text-sm font-medium whitespace-nowrap hover:border-[#243D68] hover:text-[#243D68] transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[20px]">eco</span> Lingkungan
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D6DCE8] text-[#61728F] rounded-full text-sm font-medium whitespace-nowrap hover:border-[#243D68] hover:text-[#243D68] transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[20px]">health_and_safety</span>{' '}
                Kesehatan
              </button>
            </div>
          </section>

          {/* Featured Projects */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0E1B33]">Explore Proyek</h2>
              <button 
                onClick={() => {
                  setActiveNav('explore');
                  setCurrentView('explore');
                  setExploreInitialTab('open');
                }}
                className="text-[#243D68] font-semibold text-sm hover:underline whitespace-nowrap"
              >
                Lihat Semua
              </button>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
              <div className="snap-center shrink-0 w-[300px] lg:w-[360px] bg-white border border-[#D6DCE8] rounded-[16px] p-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-[12px]">
                  <img
                    alt="Bantuan Pangan Gaza"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1637826397913-68af81f4d14a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlc3RpbmUlMjBmb29kJTIwYWlkJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc2OTY1MjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[rgb(10,71,16)] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Open Volunteer
                  </span>
                </div>
                <div className="space-y-3">
                  <span className="text-[#243D68] text-xs font-semibold">#BantuanKemanusiaan</span>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] leading-snug">
                    Bantuan Pangan Gaza
                  </h3>
                  <p className="text-[#61728F] text-sm line-clamp-2">
                    Mari bantu saudara kita di Gaza dengan menyalurkan paket sembako untuk 1000 keluarga!
                  </p>
                  <button
                    onClick={() => {
                      setProjectDetailInitialTab('overview'); // Reset to overview tab
                      setCurrentView('project-detail');
                    }}
                    className="w-full bg-[#243D68] text-white font-semibold rounded-[12px] hover:bg-[#183A74] transition-colors py-3 px-6"
                  >
                    Lihat Project
                  </button>
                </div>
              </div>
              <div className="snap-center shrink-0 w-[300px] lg:w-[360px] bg-white border border-[#D6DCE8] rounded-[16px] p-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-[12px]">
                  <img
                    alt="Sekolah Online Anak Gaza"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1661860890799-ae6cac7c71b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwYXJhYmljJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2OTY1MjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[#047857] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Open Volunteer
                  </span>
                </div>
                <div className="space-y-3">
                  <span className="text-[#243D68] text-xs font-semibold">#PendidikanPalestina</span>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] leading-snug">
                    Sekolah Online Anak Gaza
                  </h3>
                  <p className="text-[#61728F] text-sm line-clamp-2">
                    Buka pintu masa depan pendidikan untuk anak-anak Gaza yang terdampak konflik.
                  </p>
                  <button
                    onClick={() => {
                      setProjectDetailInitialTab('overview'); // Reset to overview tab
                      setCurrentView('project-detail');
                    }}
                    className="w-full mt-2 bg-[#243D68] text-white font-semibold py-3 rounded-[12px] hover:bg-[#183A74] transition-colors"
                  >
                    Lihat Project
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#243D68] via-[#2B4468] to-[#1a2d4d]"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FAC06E] rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FAC06E] rounded-full opacity-10 blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 px-6 py-12 lg:px-16 lg:py-16">
                {/* Dome illustration */}
                <div className="flex justify-center mb-8">
                  <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FAC06E]">
                    {/* Main dome */}
                    <ellipse cx="90" cy="35" rx="35" ry="20" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M 55 35 Q 55 45 60 50 L 60 85" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M 125 35 Q 125 45 120 50 L 120 85" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <line x1="60" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2"/>
                    <line x1="110" y1="50" x2="120" y2="50" stroke="currentColor" strokeWidth="2"/>
                    
                    {/* Center structure */}
                    <rect x="70" y="45" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none"/>
                    
                    {/* Arches */}
                    <path d="M 75 85 Q 80 75 85 85" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M 85 85 Q 90 75 95 85" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M 95 85 Q 100 75 105 85" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    
                    {/* Side arches */}
                    <path d="M 30 70 Q 35 60 40 70 L 40 95" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M 45 70 Q 50 60 55 70 L 55 95" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    
                    <path d="M 125 70 Q 130 60 135 70 L 135 95" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M 140 70 Q 145 60 150 70 L 150 95" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    
                    {/* Base */}
                    <line x1="25" y1="95" x2="155" y2="95" stroke="currentColor" strokeWidth="2"/>
                    <line x1="20" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="2.5"/>
                    
                    {/* Crescent */}
                    <path d="M 88 15 Q 90 10 92 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="90" cy="18" r="2" fill="currentColor"/>
                  </svg>
                </div>
                
                {/* Quote text */}
                <blockquote className="text-center max-w-3xl mx-auto">
                  <p className="text-white text-base lg:text-lg leading-relaxed mb-8 px-4">
                    "Setiap langkah kecil yang kita ambil hari ini adalah fondasi untuk pembebasan Baitul Maqdis esok hari."
                  </p>
                  
                  {/* Author section */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px w-12 bg-[#FAC06E]"></div>
                    <cite className="text-[#FAC06E] font-bold text-sm uppercase tracking-widest not-italic">
                      Alumni Inspiratif
                    </cite>
                    <div className="h-px w-12 bg-[#FAC06E]"></div>
                  </div>
                  
                  {/* Dots */}
                  <div className="flex justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FAC06E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FAC06E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FAC06E]"></div>
                  </div>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Alumni Stories */}
          <section>
            <div className="mb-6">
              <h2 className="text-[20px] font-semibold text-[#0E1B33]">Kisah Inspiratif Pejuang Al Aqsa</h2>
              <p className="text-[#61728F] mt-1 text-sm">
                Kisah nyata alumni yang berdedikasi untuk Baitul Maqdis dan Palestina!
              </p>
            </div>
            <div className="flex overflow-x-auto gap-5 pb-4 hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 1"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1675155111754-c25cd6879770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdlYXJpbmclMjBoaWphYiUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3Njk2NTIxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Rina & Virtual Tour Sejarah Masjid Al-Aqsa
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#EdukasiAlAqsa</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 2"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1767780441166-3ffeecced031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBtdXNsaW0lMjBjb21tdW5pdHklMjBsZWFkZXJ8ZW58MXx8fHwxNzY5NjUyMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Budi mengajar Bahasa Arab untuk Solidaritas Palestina
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#BahasaArabAlQuds</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 3"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1671145655294-5a269b8a4aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG11c2xpbSUyMGFjdGl2aXN0fGVufDF8fHx8MTc2OTY1MjEzMHww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Siti & Kampanye Digital Free Palestine
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#FreePalestine</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 4"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBkb2N0b3IlMjBodW1hbml0YXJiYW58ZW58MXx8fHwxNzY5NjUyMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Andi menggalang Dana Medis untuk Korban Gaza
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#MedisGaza</span>
              </div>
            </div>
          </section>

          {/* Your Projects */}
          <section>
            <h2 className="text-[20px] font-semibold text-[#0E1B33] mb-6">Project Pilihanmu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => {
                  setExploreInitialTab('open');
                  setCurrentView('explore');
                  setActiveNav('explore');
                }}
                className="bg-white rounded-[16px] border border-[#D6DCE8] p-4 flex gap-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-md transition-shadow cursor-pointer group"
              >
                <img
                  alt="Cleanup"
                  className="w-24 h-24 rounded-[12px] object-cover shrink-0 group-hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1758204054488-51024ea2e94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwaHVtYW5pdGFyaWFuJTIwYWlkfGVufDF8fHx8MTc2OTY1MjEyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <div className="flex flex-col justify-center">
                  <div className="mb-1">
                    <span className="bg-[#C9F7ED] text-[#047857] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Open Volunteer
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] mb-1 group-hover:text-[#243D68] transition-colors">
                    Bantuan Air Bersih Gaza
                  </h3>
                  <p className="text-sm text-[#61728F] line-clamp-2">
                    Suplai air bersih untuk keluarga-keluarga di Gaza yang kesulitan akses air.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setCurrentView('explore');
                  setActiveNav('explore');
                }}
                className="bg-white rounded-[16px] border border-[#D6DCE8] p-4 flex gap-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-md transition-shadow cursor-pointer group"
              >
                <img
                  alt="Mentoring"
                  className="w-24 h-24 rounded-[12px] object-cover shrink-0 group-hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1643214410415-de1976ad74ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnBoYW4lMjBjaGlsZHJlbiUyMGNhcmUlMjBzdXBwb3J0fGVufDF8fHx8MTc2OTY1MjEyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <div className="flex flex-col justify-center">
                  <div className="mb-1">
                    <span className="bg-[#D9EDF8] text-[#243D68] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Project Tim
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] mb-1 group-hover:text-[#243D68] transition-colors">
                    Rehabilitasi Yatim Palestina
                  </h3>
                  <p className="text-sm text-[#61728F] line-clamp-2">
                    Program pendampingan untuk anak-anak yatim Palestina yang kehilangan keluarga.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-[20px] font-semibold text-[#0E1B33]">Galeri Project</h2>
              <button 
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="hidden lg:block text-[#243D68] font-semibold text-sm hover:underline"
              >
                Lihat Semua
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 1"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1761862062324-e0b9dc024433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZSUyMG1vc3F1ZXxlbnwxfHx8fDE3Njk2NTIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 2"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1761542928838-86d8a44d5c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBib29rcyUyMGxpYnJhcnklMjBlZHVjYXRpb258ZW58MXx8fHwxNzY5NjUyMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 3"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1662104128135-7bd873b2befd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJ0JTIwcGF0dGVybnxlbnwxfHx8fDE3Njk2NTIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 4"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1760072986110-01cd779ddec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBwcmF5ZXIlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzY5NjUyMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
            </div>
            <button
              onClick={() => {
                setExploreInitialTab('galeri');
                setActiveNav('explore');
                setCurrentView('explore');
              }}
              className="w-full mt-6 py-3 border border-[#D6DCE8] text-[#243D68] font-semibold rounded-[12px] bg-white hover:bg-[#E5E8EC] lg:hidden transition-colors"
            >
              Lihat Semua
            </button>
          </section>

          {/* Event Banner */}
          <section>
            <h2 className="text-[20px] font-semibold text-[#0E1B33] mb-6">Kegiatan Offline Terbaru</h2>
            <div className="relative w-full aspect-[16/9] md:aspect-[2.35/1] rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(22,36,63,0.08)] group cursor-pointer">
              <img
                alt="Event Banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8SmFgeNYy36LFLNB19PYMFgDizekyt5iqu3G9c8CI4dsJxfM2gKR6YaCcPuDHRcipHwNf8dIZq29QeGMnQbTFtTjUtsj92TMZxF-Y7hbiPa8osv6hM-cDDpPFosc9mEL19N4fHcpohxJ6xOFA4jlqkHloXCGm4LK1lvslhIj5mxQyjeFIcW9-fu2qiPU94mbDJy8Hzt5fp-Un1Pro5GIilncogrJ_gEj6CbmbQ7xO497w_ibP1U614Bkz5F7pbozz0F1goS1GKtjh"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 lg:p-10 flex flex-col justify-end">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                      Workshop Alumni di Surabaya!
                    </h3>
                    <p className="text-white/90 text-sm md:text-base flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span> 12 November
                      2025
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentView('event-detail')}
                    className="bg-[#FAC06E] text-[#16243F] text-sm font-bold py-2.5 px-6 rounded-full hover:bg-white transition-colors shadow-lg self-start md:self-auto"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6DCE8] lg:hidden z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          <button
            onClick={() => {
              setActiveNav('home');
              setCurrentView('home');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'home' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'home' ? 'filled' : ''}`}>
              home
            </span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('explore');
              setCurrentView('explore');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'explore' ? 'filled' : ''}`}>
              explore
            </span>
            <span className="text-xs font-medium">Explore</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('pesan');
              setCurrentView('messages');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors relative ${
              activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'pesan' ? 'filled' : ''}`}>
              chat_bubble
            </span>
            <span className="text-xs font-medium">Pesan</span>
            <span className="absolute top-1.5 right-1/4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button
            onClick={() => {
              setActiveNav('settings');
              setCurrentView('settings');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'settings' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'settings' ? 'filled' : ''}`}>
              settings
            </span>
            <span className="text-xs font-medium">Setting</span>
          </button>
        </div>
      </nav>

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
        
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.6;
          }
        }
        
        .animate-ripple {
          animation: ripple 3s ease-in-out infinite;
        }
      `}</style>
      </div>
    </ErrorBoundary>
  );
}