import { useState } from 'react';

interface AlumniStoryDetailProps {
  onBack?: () => void;
}

export function AlumniStoryDetail({ onBack }: AlumniStoryDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ioCrL7Ubx8Wf6p6LXNZ9CC9MD1a3SQwrYhQRtqJbO4wm1KrwvSHKj0d3gBgd4F_-v2skNyn0vST-LZ8Y256yZ36SOysEVCjhvrYvbLt92jVgKA1YnDyBxpi7lO5HoE46o9tJ7mqFqmRzj0DDJF2_3EVap57vY5bHPFmkMo9w-mlYwu5GpaF_muOkJElQ1PmltBNLwfvCSw5PHOmEaXuOvJ6BUmxUGw3F12Bbxghd7yFZdk5rBoQbECxMgpT03zQ8wpWE_WaZAuiG',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCKWmap8SiCM7yIZ5Si3_3jZXxppHRxZy1ZF1BUBaJFBNyWb38iLCB4QxkArqbJZcx-lsyw3ZiA7iCtfd6ff6eaJWSR_QBBCBM0S-QLVr_0Smd8uGR5Xh7QfnLJ-iEk1g6echEg0hZg9IYDi6elTO2eRPsUKCWTcDfXAvS2PtCGDzwz56y__VyfTlzwPGWXJhqvwZR9SW3akNub86Er4-a3xhSRbgMQb7w5OyMtQx7YpLU8hTbclopIi9pvG9-yxF8Rpx-7n6WZ5yZJ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCuqRW9AVOkiayo2yCDwXHwHCCvTiffPKedl02c_OCoy8CBlgt9BpUkuqI17BbxePB4TZf4hxu3w7aSc3MBKU9S_Cm1U5WRy8L3bXi648dEXMuPxXADBf5IpzXgz5okZFzBtxXVnyYSjC4PFiJIcmHCnbqFezQsSBr6BOi0pb2G59tgbFv2lWnhLhUcsreZ_LmcByaZZkJ02o_rcGBRy3PrEQGG57av115gQCObRQfpsdx_m12j0BQHK7HxZExGZUjlc8Sk8vc-YJ9b',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuATB6gLTAI98-mHLCHqiKvV9f6d35K6HPsKGAYas9vSUPBh4u9miJ8fL9IMGvrdcbPI7WNTiGGgEj8Jdl90QWpp5FSr6i0YPlsKANYaL6esAzvBWQelbGPIFd9zK-stBEwGXnWvSTp3zuZ0OF_iYjl90VC7EFiMLb5HcbKa3mHshG8N1iXyDBfRFiqTo7xME2zgpd8A3erpcHAXDE3SjJhV9GwBeTTWBvJLNc3TDMznSAt7xLH2NDHkL0xko43ZZvnNUw8QOi5a9WWQ',
  ];

  const relatedStories = [
    {
      id: 1,
      title: 'Inovasi Teknologi di Desa Terpencil',
      author: 'Budi Santoso',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKWmap8SiCM7yIZ5Si3_3jZXxppHRxZy1ZF1BUBaJFBNyWb38iLCB4QxkArqbJZcx-lsyw3ZiA7iCtfd6ff6eaJWSR_QBBCBM0S-QLVr_0Smd8uGR5Xh7QfnLJ-iEk1g6echEg0hZg9IYDi6elTO2eRPsUKCWTcDfXAvS2PtCGDzwz56y__VyfTlzwPGWXJhqvwZR9SW3akNub86Er4-a3xhSRbgMQb7w5OyMtQx7YpLU8hTbclopIi9pvG9-yxF8Rpx-7n6WZ5yZJ',
    },
    {
      id: 2,
      title: 'Membangun Startup Pendidikan',
      author: 'Sarah Wijaya',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuqRW9AVOkiayo2yCDwXHwHCCvTiffPKedl02c_OCoy8CBlgt9BpUkuqI17BbxePB4TZf4hxu3w7aSc3MBKU9S_Cm1U5WRy8L3bXi648dEXMuPxXADBf5IpzXgz5okZFzBtxXVnyYSjC4PFiJIcmHCnbqFezQsSBr6BOi0pb2G59tgbFv2lWnhLhUcsreZ_LmcByaZZkJ02o_rcGBRy3PrEQGG57av115gQCObRQfpsdx_m12j0BQHK7HxZExGZUjlc8Sk8vc-YJ9b',
    },
    {
      id: 3,
      title: 'Karir Internasional: Dari Bandung ke Berlin',
      author: 'Dimas Pratama',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ioCrL7Ubx8Wf6p6LXNZ9CC9MD1a3SQwrYhQRtqJbO4wm1KrwvSHKj0d3gBgd4F_-v2skNyn0vST-LZ8Y256yZ36SOysEVCjhvrYvbLt92jVgKA1YnDyBxpi7lO5HoE46o9tJ7mqFqmRzj0DDJF2_3EVap57vY5bHPFmkMo9w-mlYwu5GpaF_muOkJElQ1PmltBNLwfvCSw5PHOmEaXuOvJ6BUmxUGw3F12Bbxghd7yFZdk5rBoQbECxMgpT03zQ8wpWE_WaZAuiG',
    },
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                ALMAQDISI PROJECT
              </span>
            </div>
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
                onClick={onBack}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">Home</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
                <span className="absolute top-3 left-11 w-2 h-2 bg-red-500 rounded-full border border-[#2B4468]"></span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 pb-6">
            <button
              onClick={onBack}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
            Cerita Alumni
          </h2>
          <div className="flex items-center justify-end">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#F8F9FA] transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-20 lg:pb-8">
          {/* Image Carousel */}
          <div className="px-6 md:px-8 pt-6 pb-4">
            <div className="relative aspect-[16/9] md:aspect-[2.35/1] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images[currentImageIndex]}
                alt={`Story image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#243D68] hover:bg-white transition-all shadow-md"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#243D68] hover:bg-white transition-all shadow-md"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Title & Metadata */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 border border-[#E5E7EB]">
              <h1 className="text-[#333333] tracking-normal text-2xl md:text-4xl font-['Archivo_Black'] leading-tight mb-4 uppercase">
                Bagaimana Rina Memulai Program Mentorship-nya
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 shrink-0"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1547567919-07728e7d2dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB3b21hbiUyMGhpamFiJTIwdGVhY2hlciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTEyMTA5N3ww&ixlib=rb-4.1.0&q=80&w=1080")',
                  }}
                ></div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-[#333333]">Rina Kusuma</p>
                  <p className="text-sm text-[#6B7280]">Pendidikan '14 • 15 Januari 2026</p>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="bg-[#243D68]/10 text-[#243D68] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#243D68]/20">
                  #InisiatifPendidikan
                </span>
                <span className="bg-[#E8F5E9] text-[#4CAF50] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#4CAF50]/20">
                  #Mentorship
                </span>
              </div>
            </div>

            {/* Story Body */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">article</span>
                Cerita
              </h3>
              <div className="prose max-w-none">
                <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-4">
                  Setelah lulus dari UB, Rina Kusuma memutuskan untuk tidak langsung mengejar karir korporat. Dia
                  melihat kesempatan untuk berkontribusi lebih pada masyarakat melalui pendidikan.
                </p>
                <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-4">
                  "Saya ingat ketika saya masih kuliah, saya mendapat banyak bimbingan dari kakak tingkat dan dosen.
                  Tanpa mereka, saya tidak akan berada di posisi ini," kata Rina.
                </p>
                <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-4">
                  Rina kemudian mendirikan program mentorship gratis untuk siswa SMA di daerah Malang dan sekitarnya.
                  Program ini fokus pada pengembangan soft skills, persiapan kuliah, dan konseling karir.
                </p>
                <p className="text-[#6B7280] text-sm md:text-base leading-relaxed">
                  Dalam 2 tahun terakhir, lebih dari 200 siswa telah mengikuti program Rina, dan banyak yang berhasil
                  masuk perguruan tinggi impian mereka. "Ini bukan tentang saya, ini tentang membuka pintu kesempatan
                  untuk generasi berikutnya," tambahnya.
                </p>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#30518B] rounded-xl p-6 text-white">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">trending_up</span>
                Dampak Program
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-['Archivo_Black'] mb-1">200+</p>
                  <p className="text-sm opacity-90">Siswa</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-['Archivo_Black'] mb-1">15</p>
                  <p className="text-sm opacity-90">Mentor</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-['Archivo_Black'] mb-1">85%</p>
                  <p className="text-sm opacity-90">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 border border-[#E5E7EB]">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#243D68] text-4xl flex-shrink-0">format_quote</span>
                <div>
                  <p className="text-[#333333] text-base md:text-lg italic leading-relaxed mb-3">
                    "Ini bukan tentang saya, ini tentang membuka pintu kesempatan untuk generasi berikutnya."
                  </p>
                  <p className="text-sm text-[#6B7280] font-semibold">— Rina Kusuma</p>
                </div>
              </div>
            </div>

            {/* Related Stories */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#333333] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">auto_stories</span>
                Cerita Alumni Lainnya
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-[16/9] relative">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#333333] text-sm mb-1 leading-snug line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#6B7280]">oleh {story.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}