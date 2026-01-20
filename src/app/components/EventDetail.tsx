import { useState } from 'react';

interface EventDetailProps {
  onBack: () => void;
}

export function EventDetail({ onBack }: EventDetailProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30">
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
                PROJEKKITA
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
        <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#D6DCE8]">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#E5E8EC] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
            Detail Event
          </h2>
          <div className="flex items-center justify-end">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#E5E8EC] transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-20 lg:pb-8">
          {/* Hero Image */}
          <div className="px-6 md:px-8 pt-6 pb-4">
            <div className="w-full rounded-2xl overflow-hidden relative aspect-[16/9] md:aspect-[2.35/1]">
              <img
                alt="Workshop Alumni di Surabaya"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8SmFgeNYy36LFLNB19PYMFgDizekyt5iqu3G9c8CI4dsJxfM2gKR6YaCcPuDHRcipHwNf8dIZq29QeGMnQbTFtTjUtsj92TMZxF-Y7hbiPa8osv6hM-cDDpPFosc9mEL19N4fHcpohxJ6xOFA4jlqkHloXCGm4LK1lvslhIj5mxQyjeFIcW9-fu2qiPU94mbDJy8Hzt5fp-Un1Pro5GIilncogrJ_gEj6CbmbQ7xO497w_ibP1U614Bkz5F7pbozz0F1goS1GKtjh"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-[#FAC06E] text-[#16243F] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Offline Event
                </span>
              </div>
            </div>
          </div>

          {/* Title & Info */}
          <div className="px-6 md:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-2xl md:text-4xl font-['Archivo_Black'] leading-tight mb-4 uppercase">
              Workshop Alumni di Surabaya!
            </h1>

            {/* Key Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-normal">Tanggal</p>
                    <p className="text-[#333333] text-sm font-bold">12 November 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">schedule</span>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-normal">Waktu</p>
                    <p className="text-[#333333] text-sm font-bold">09:00 - 17:00 WIB</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-normal">Lokasi</p>
                    <p className="text-[#333333] text-sm font-bold">Surabaya Convention Hall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Status */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#30518B] rounded-xl p-5 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm opacity-90 mb-1">Kuota Peserta</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-['Archivo_Black']">127</span>
                    <span className="text-sm opacity-80">/ 200 orang</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                    <div className="bg-[#FAC06E] h-2 rounded-full" style={{ width: '63.5%' }}></div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="material-symbols-outlined text-5xl opacity-30">groups</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Deskripsi */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">description</span>
                Deskripsi Event
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
                Workshop Alumni kali ini akan membahas berbagai topik menarik seputar pengembangan karir, networking, dan kontribusi sosial yang bisa dilakukan oleh para alumni.
              </p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Acara ini akan dihadiri oleh alumni dari berbagai angkatan dan akan menjadi kesempatan emas untuk membangun koneksi, berbagi pengalaman, dan berkolaborasi dalam proyek-proyek sosial yang bermakna.
              </p>
            </div>

            {/* Agenda */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">event_note</span>
                Agenda Acara
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      09:00
                    </div>
                    <div className="w-0.5 h-full bg-[#D6DCE8] mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-semibold text-[#333333] mb-1">Registrasi & Welcome Coffee</h4>
                    <p className="text-sm text-[#6B7280]">Pendaftaran peserta dan networking informal</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      10:00
                    </div>
                    <div className="w-0.5 h-full bg-[#D6DCE8] mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-semibold text-[#333333] mb-1">Pembukaan & Keynote Speaker</h4>
                    <p className="text-sm text-[#6B7280]">Sambutan dari ketua IKA dan pembicara utama</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      11:30
                    </div>
                    <div className="w-0.5 h-full bg-[#D6DCE8] mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-semibold text-[#333333] mb-1">Sesi Workshop - Batch 1</h4>
                    <p className="text-sm text-[#6B7280]">3 workshop paralel: Career Development, Social Impact, Entrepreneurship</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      13:00
                    </div>
                    <div className="w-0.5 h-full bg-[#D6DCE8] mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-semibold text-[#333333] mb-1">ISHOMA</h4>
                    <p className="text-sm text-[#6B7280]">Istirahat, Sholat, Makan siang</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      14:30
                    </div>
                    <div className="w-0.5 h-full bg-[#D6DCE8] mt-2"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <h4 className="font-semibold text-[#333333] mb-1">Sesi Workshop - Batch 2</h4>
                    <p className="text-sm text-[#6B7280]">Lanjutan workshop dengan topik berbeda</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#243D68] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      16:00
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#333333] mb-1">Penutupan & Networking</h4>
                    <p className="text-sm text-[#6B7280]">Sesi foto bersama dan networking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Speakers */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">person</span>
                Pembicara
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-[#E5E7EB]">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 shrink-0"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdGdNRPdJTq7rYpI57MpyJAbrSzME4063Cv_eMCLbsbiX9dr1pAWJ-x2jtf9FUGMvNLmaD7OnFNquRX_2qWE9w_g_Cao9dkoNjDXClNwSVxd0KVd1quE2fKWPIUyyQa8e7YS-sU5n7-Qujeartl5LnjAc8otjPS2CPInJpxfiKdxwgGHevu3k6Ae2UZ5bS98LmB3QZUWRyZsx8xo3-eL_WkfzdY3Ar5UJkj5RMf-jP94L3kJbYozRZnMr3F0byq8Dj6iSBjDygsbaI")',
                    }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-[#333333]">Dr. Ahmad Sudirman</p>
                    <p className="text-sm text-[#6B7280]">CEO TechStart Indonesia</p>
                    <p className="text-xs text-[#4A90E2] mt-1 font-medium">Keynote Speaker</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-[#E5E7EB]">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 shrink-0"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiTCni6xCVaBuSHYW9yXo4lhDCML_Cp6QKgGXN6fU4Sxwl-E-6K_4bLGC0gu_nS-I8pGEEyTEqzf9XY8MH_bBN_5dJy36wNXq4gUzT5bGqXQpwpRJRv84P9LBSg8HppXOV8WYGYe-oYIbBk8LEO8HJuUaVq4bGaGDf0rJL74OqYJzLAw7cg1iA15o9uHDZV-c5l8xf3u7OX-FPJJzcBR_qAnbWgK8TXiRWuUt_p8a4Gex_pUKCJoN4Fk6Rn9vWDhWL8FBhUBmB")',
                    }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-[#333333]">Siti Nurhaliza, M.Psi</p>
                    <p className="text-sm text-[#6B7280]">Career Coach & Mentor</p>
                    <p className="text-xs text-[#4A90E2] mt-1 font-medium">Workshop Facilitator</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">workspace_premium</span>
                Benefit untuk Peserta
              </h3>
              <ul className="space-y-3 text-[#6B7280] text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                    check_circle
                  </span>
                  <span>Sertifikat kehadiran dari IKA Universitas Brawijaya</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                    check_circle
                  </span>
                  <span>Materi workshop lengkap dalam bentuk digital</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                    check_circle
                  </span>
                  <span>Konsumsi (snack, lunch, coffee break)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                    check_circle
                  </span>
                  <span>Networking session dengan alumni sukses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                    check_circle
                  </span>
                  <span>Goodie bag eksklusif IKA UB</span>
                </li>
              </ul>
            </div>

            {/* Contact Person */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">contact_support</span>
                Kontak Panitia
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#4A90E2]">phone</span>
                  <p className="text-sm text-[#6B7280]">+62 812-3456-7890 (Budi)</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#4A90E2]">email</span>
                  <p className="text-sm text-[#6B7280]">workshop@ikaub.ac.id</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#4A90E2]">location_on</span>
                  <p className="text-sm text-[#6B7280]">Jl. Mayjen Sungkono No. 123, Surabaya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Button - Fixed Bottom on Mobile */}
          <div className="fixed bottom-0 left-0 right-0 lg:static bg-white border-t border-[#D6DCE8] p-4 lg:px-8 lg:pb-8 z-10">
            <button
              onClick={() => setIsRegistered(!isRegistered)}
              className={`w-full lg:max-w-md lg:mx-auto flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${
                isRegistered
                  ? 'bg-[#E5E8EC] text-[#6B7280] border-2 border-[#D6DCE8]'
                  : 'bg-[#183A74] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1'
              }`}
            >
              {isRegistered ? (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Sudah Terdaftar</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">how_to_reg</span>
                  <span>Daftar Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}