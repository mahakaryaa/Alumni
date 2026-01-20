import { useState } from 'react';
import { ProjectDetail } from '@/app/components/ProjectDetail';
import { ProjectDetailAlumni } from '@/app/components/ProjectDetailAlumni';
import { ExploreProject } from '@/app/components/ExploreProject';
import { AlumniStoryDetail } from '@/app/components/AlumniStoryDetail';
import { Login } from '@/app/components/Login';
import { EventDetail } from '@/app/components/EventDetail';
import { MessagePage } from '@/app/components/MessagePage';
import { SettingsPage } from '@/app/components/SettingsPage';
import { MessagesAlumni } from '@/app/components/MessagesAlumni';
import heroImage from 'figma:asset/e58bcf57f4d8cba056148583d179c170bd719908.png';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [currentView, setCurrentView] = useState<'home' | 'project-detail' | 'explore' | 'alumni-story' | 'login' | 'event-detail' | 'messages' | 'settings'>('home');
  const [exploreInitialTab, setExploreInitialTab] = useState<'open' | 'galeri'>('open');
  const [projectDetailInitialTab, setProjectDetailInitialTab] = useState<'overview' | 'progress' | 'members' | 'discussion' | 'wallet'>('overview');
  const [userRole, setUserRole] = useState<'donatur' | 'alumni' | null>(null);

  if (currentView === 'login') {
    return <Login onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} onLoginSuccess={(role: 'donatur' | 'alumni') => {
      setUserRole(role);
      setCurrentView('home');
      setActiveNav('home');
    }} />;
  }

  if (currentView === 'project-detail') {
    // Show different detail page based on user role
    if (userRole === 'alumni') {
      return <ProjectDetailAlumni onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }} initialTab={projectDetailInitialTab} />;
    }
    
    return <ProjectDetail onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} initialTab={projectDetailInitialTab} />;
  }

  if (currentView === 'explore') {
    return <ExploreProject onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} initialTab={exploreInitialTab} onNavigateToDetail={() => setCurrentView('project-detail')} />;
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
      activeNav={activeNav}
    />;
  }

  return (
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
              onClick={() => setCurrentView('login')}
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
            <button className="text-[#6B7280] hover:text-[#243D68] transition-colors relative p-2">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="bg-gradient-to-r from-[#243D68] to-[#30518B] text-white font-bold py-2 px-5 rounded-lg text-sm hover:shadow-lg transition shadow-md uppercase tracking-wide"
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
                  Banyak Proyek Seru Menanti Peranmu!
                </h1>
                
                <p className="text-[#61728F] text-base lg:text-lg leading-relaxed font-light">
                  Bergabung dengan ribuan alumni untuk berkolaborasi dalam proyek-proyek sosial yang berdampak nyata. Wujudkan perubahan bersama komunitas yang peduli.
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
              className="w-full h-12 md:h-14 lg:h-16 pl-12 md:pl-14 lg:pl-16 pr-12 md:pr-14 lg:pr-16 rounded-[12px] md:rounded-[14px] lg:rounded-[16px] border border-[#D6DCE8] bg-white text-[#0E1B33] placeholder-[#919EB2] focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] shadow-sm transition-all outline-none text-sm md:text-base lg:text-lg"
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
                    alt="Forest canopy"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRYpHU5_mzjIzojDsJXKskEQqs0iWqZ8uCBK9tVeBMWMJA1VCWDPCdaGp8DQIqjaH9o1K2olYJhVqASi7bmEeyaxD0vuWW_dzu11-mun2QX7tlY-_eMj_rwB3PJat3vibLqwLQSbzUG3WANVHciRW3DBS_wMtqxliDA8IvuwMPZ-hcivIlt-fqi419jMeat7ehrxmDFku4oLbEm-TzC37khqhp38IJmvgwS6pzUKK2Yj3cI_P26VSaBOlNNHMqy39EjJ9yymGYqxmF"
                  />
                  <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[rgb(10,71,16)] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Open Volunteer
                  </span>
                </div>
                <div className="space-y-3">
                  <span className="text-[#243D68] text-xs font-semibold">#GerakanHijau</span>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] leading-snug">
                    Penghijauan Hutan Kota
                  </h3>
                  <p className="text-[#61728F] text-sm line-clamp-2">
                    Yuk, tanam 1000 pohon untuk Baitul Maqdis yang lebih hijau &amp; sejuk!
                  </p>
                  <button
                    onClick={() => setCurrentView('project-detail')}
                    className="w-full bg-[#243D68] text-white font-semibold rounded-[12px] hover:bg-[#183A74] transition-colors py-3 px-6"
                  >
                    Lihat Project
                  </button>
                </div>
              </div>
              <div className="snap-center shrink-0 w-[300px] lg:w-[360px] bg-white border border-[#D6DCE8] rounded-[16px] p-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-[12px]">
                  <img
                    alt="Cityscape"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXrtAmuCDhJLVsxlRXcOX-CuxGFCMPw7pgmsdmigycGTWx0hMdXaOqt173aeVv-awzR0v5dz5qS5go0tpju_4kbUXCg7VpqRoSIx5WaRljqR6XNBcfqFm_KCbkZLY9wVug7gBXBu41Vxbk29vhkCcXKzEHH6B1k-tBC14lhqL36bvXb5RL4ClI_ZI6g_7uMQaDemdAshejBW5bJmIDZUxsx7YBOAdqqVbDKuQ7Q9n0pkooIxkLEbTVROc_88agGRPd7FUJNn4wC3M9"
                  />
                  <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[#047857] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Open Volunteer
                  </span>
                </div>
                <div className="space-y-3">
                  <span className="text-[#243D68] text-xs font-semibold">#PendidikanDigital</span>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] leading-snug">
                    Kelas Coding Gratis
                  </h3>
                  <p className="text-[#61728F] text-sm line-clamp-2">
                    Buka pintu masa depan digital untuk adik-adik di area Baitul Maqdis.
                  </p>
                  <button
                    onClick={() => setCurrentView('project-detail')}
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
            <div className="bg-[rgba(250,192,110,0.6)] border border-[#D6DCE8] rounded-[20px] p-8 lg:p-12 text-center relative overflow-hidden shadow-sm">
              <blockquote className="font-['Lora'] italic text-base lg:text-lg text-[#61728F] max-w-2xl mx-auto leading-relaxed">
                <span className="text-[10rem] leading-none float-left mr-2 mt-[-2rem] font-[Gabarito]">"</span>Setiap langkah kecil yang kita ambil hari ini adalah fondasi untuk pembebasan Baitul Maqdis
                esok hari."
              </blockquote>
              <cite className="block mt-4 text-[#0E1B33] font-semibold text-sm not-italic">
                Alumni Inspiratif
              </cite>
            </div>
          </section>

          {/* Alumni Stories */}
          <section>
            <div className="mb-6">
              <h2 className="text-[20px] font-semibold text-[#0E1B33]">Kisah Alumni Inspiratif</h2>
              <p className="text-[#61728F] mt-1 text-sm">
                Cerita nyata dari para alumni yang bikin semangat!
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp1xcCWQ87H_5OBbXVevwR9LJkqV2b78wfeFTv31qi2jjKZOW6EiGClJlpgxva_8WR1hjsXphYnvi0S7YJ98K18JkkXBkvcWXYYVKby5CKq6wRIBzlH920qBrcEgEMtHSW9ZhsMvrhaBBp3o5PHNGdm349gMBFrn2hEiyYB8LSm7AvIs95PyH6rMjk3yQfcuqZbkgAzhsubpaLaxuHCZdbbr1ZSTQBoxZ-ZqzQaz7Fn4NBeNkvR5BciVepM7-CExKeIlLVdIYZfx9_"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Bagaimana Rina memulai Program Mentorship-nya.
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#InisiatifPendidikan</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 2"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXrtAmuCDhJLVsxlRXcOX-CuxGFCMPw7pgmsdmigycGTWx0hMdXaOqt173aeVv-awzR0v5dz5qS5go0tpju_4kbUXCg7VpqRoSIx5WaRljqR6XNBcfqFm_KCbkZLY9wVug7gBXBu41Vxbk29vhkCcXKzEHH6B1k-tBC14lhqL36bvXb5RL4ClI_ZI6g_7uMQaDemdAshejBW5bJmIDZUxsx7YBOAdqqVbDKuQ7Q9n0pkooIxkLEbTVROc_88agGRPd7FUJNn4wC3M9"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Budi &amp; Gerakan Tanam Mangrove Pesisir.
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#LingkunganHidup</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 3"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKRop9NrmHRgEBR-7u4vde2T5Wsxoxhq3QG6JPWpgU8YL1AMu7V-CT0DvpLf0NeskgC-FrvyFznUf50ti5A6PXABnLZx7FvYxp-3ZjSCjsAnpnf5E1MqxbllblFtgKcnT5CkOKI2duc8zYoGDSjrH5Ro9k1pVqkXZF880dpjdzoNUYczEjeviF8thY6maOgKnDuQ6Tkg9ypotxASqrxkItFmYxsubRRzzUiL_0xgSb28874cprjCczZsUK_7Hl_aokOvNLgOSvPyEi"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Siti membangun Startup sosial untuk UMKM.
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#KewirausahaanSosial</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 4"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJgtInlQZz7_fHM1vticCT0Wzm08GHhq1rCo_wOwZToeJtOfY1hfqIR1PeNXtuyzYihXnSxR_U6o_lLIntKCP9ax7j7TwqI9K3p_WY8w7kRb5SrHbNBknDoDCg0jzEvMHkrxBTaQLw647zyEewhU5tvK9ylQM5s7dT8pVg2Jq8otGucIKsp64qM95ZTdygPvenC4MPhmu1weCQKjU7bKXOCW5yCReK-0qiiR76NC1eIkT3UQQfiSCcHNsHo6caIec_I9vxopBPQPtB"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Klinik Gratis Andi untuk warga desa terpencil.
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#KesehatanMasyarakat</span>
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA67Er5Q8_pn9r701cSnYk9zgOdNOzX0VEjgD_TqxIyZ9V__by-HB8CPd4N6pwSv0bDYAHjumdkZ-0tbaXqtkBKBcrlpHwVZ9tIGL9t2o5BnzfcL9PbGUklLTiNCBOAC-CGMZonUs9e0nueYxBFDtLIltOa7Ybuod4Oc_ZGTJYVaJBHHMmJAWRf41-UV15jvlcdZCvwHEd_nEHetJBfEQi3xvJnY2Bjn1ytn_amaeIg4ys_8jjVlThsgPCjXpeRmgMg1RXW6_LgAn8w"
                />
                <div className="flex flex-col justify-center">
                  <div className="mb-1">
                    <span className="bg-[#C9F7ED] text-[#047857] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Open Volunteer
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] mb-1 group-hover:text-[#243D68] transition-colors">
                    Bersih Pesisir Jakarta
                  </h3>
                  <p className="text-sm text-[#61728F] line-clamp-2">
                    Bergabung dalam aksi bersih pantai untuk menjaga ekosistem laut kita.
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEHQAb8XUyXwq0ho0L-6dxhaG1mbTTH2D0-j9DJqG0htuA3PmUCZHRmBLGa5Z5Xi7UbsO4nIgvvteNS0ZXNX4xEIQ_m5bPdJVJXIxTCzGmRJ-kDwx7JlP3OS8qDPpQGvioehoyW7p2CLDsMv16rpgF8L8-K1JYrHE9mWZceNRMWQnvy17AsjamqaTebRmFcQT7kj3_-E-qeHwf2boK6aAp0Xx6Ps9m77Izmm0xSuY_eHeZZW_I4kBc8zUuGro9LNyktmEdC66EEGVY"
                />
                <div className="flex flex-col justify-center">
                  <div className="mb-1">
                    <span className="bg-[#D9EDF8] text-[#243D68] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Project Tim
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] mb-1 group-hover:text-[#243D68] transition-colors">
                    Kelas Coding Gratis
                  </h3>
                  <p className="text-sm text-[#61728F] line-clamp-2">
                    Membuka pintu masa depan digital untuk adik-adik di panti asuhan.
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
              <img
                alt="Gallery 1"
                className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7qMSJdMXqdlx2DS-QcXA6LU2i_R1MSOfAYAYOeyI2kIp9QE6DDeIXTFmsOmG7ACgKvksS4gFV-xEvvkWafBmT47cCran0KW65lxxInLNamOXOvhZgCbU9IW1j8MSHom7befLmfCty_3DPUh8m_E1hqsgsoSr_GDER7x9W6TkzB-n4hVxxNltNoYeAjTpreqPDiuTpVToF0gIKmpsEUDthRWEVV_uRQMhL4xh-VqiJV7Dzc45sFTnAXq6sZI9Z6f66H1qXPyeAIzsv"
              />
              <img
                alt="Gallery 2"
                className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmq45Viuq3yJockszGsGZ94LsQD007r0SBv7C1mgVVEBwm5yKkR5kS2YkZKvFE_nz2_QJEEZdYRRlqUzjMlbb40ocANC7hP7YFxb7OkiHr9d40kkCoDVILZppAzrOxmAGKdjGBWdWyIGYG26Qq-9U2tQ7_C8e-Ff9bpxderu1gLUVwUquec-9sbpH3DszoRRA_Ocd2IVJb-mVbbArvo-G3qkjSo5iWMuMffgcGGhX69sl6YDCyBAXv5MyImUY38957ruBMuhaPJ3sa"
              />
              <img
                alt="Gallery 3"
                className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu0YTCuTjScQVeCbT3Ymw4P2yHfcfnSsxBYQM8I41PTPIht9ruG0553HfPM_NljSjUZLSWjrRs6HqNfnEZqik_9mB58l76bGR02Zm8P7k97HY6STTud_2YtFtEJRS6qF6G4lHlVutpk4iLZ2erwH_iodIWmmLX3VPy4mlXJ_QRBGaT311j0G3nr0uR_AAbKEW7wjZSIRuPERUI8P7sIjLbIzaH5xDgZPYb7Q-iIl6Rssir8F4lptiyGxGQ6BUgmooJOX8kMQwc3Yuo"
              />
              <img
                alt="Gallery 4"
                className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKgk1wQybl_06Hc1JgI1LOspF8rGZ6zwOJQw1xpYVMihrRnFf_IFNgFDft3pok665wLRJD7RzU0Hx9eiKCsTNRLTIkxFnfDijgW5P56BfWh-y8Gobh55lSMMSCpadTeWp6AP0d8BYymr2iuNCPKC3h3YvuW0I9DKZ0TO_4vD92PTa2QwGqYnGX1nea9XwKz2RJEmRWy-fnErkMiObjKEbqp5VbEM1-cGilWitY17ilIKVN8DfP_Atse69vukkdPgJrnIrM3UjUxC7g"
              />
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
  );
}