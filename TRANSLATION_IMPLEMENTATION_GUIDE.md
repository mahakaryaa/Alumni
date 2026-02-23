# 🌍 Panduan Implementasi Multi-Bahasa AlMaqdisi Project

## 📚 Daftar Isi
1. [Pattern Dasar](#pattern-dasar)
2. [Cheat Sheet Translations](#cheat-sheet-translations)
3. [File-by-File Guide](#file-by-file-guide)
4. [Contoh Kode](#contoh-kode)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Pattern Dasar

### 1. Import Hook di Setiap Component

```tsx
import { useTranslation } from '@/hooks/useTranslation';

export function MyComponent() {
  const { t, language } = useTranslation();
  
  // ... rest of component
}
```

### 2. Tiga Cara Menggunakan Translations

#### A. Menggunakan Translation Object (t)
**GUNAKAN UNTUK**: Text yang sudah ada di `/src/translations.ts`

```tsx
// ✅ BENAR
<span>{t.nav.home}</span>
<button>{t.buttons.donate}</button>
<h1>{t.hero.title}</h1>
```

#### B. Menggunakan Conditional Language
**GUNAKAN UNTUK**: Text yang belum ada di translations.ts atau sangat spesifik

```tsx
// ✅ BENAR
<span>{language === 'id' ? 'Sedang Berlangsung' : 'Ongoing'}</span>
<p>{language === 'id' ? 'Lihat Detail' : 'View Details'}</p>
```

#### C. Kombinasi Keduanya
```tsx
// ✅ BENAR - Untuk teks yang kompleks
<div>
  <h2>{t.sections.latestProjects}</h2>
  <p>{language === 'id' 
    ? 'Proyek terbaru dari komunitas kami' 
    : 'Latest projects from our community'}
  </p>
</div>
```

---

## 📖 Cheat Sheet Translations

### Navigation & Common
```tsx
{t.nav.home}           // Home
{t.nav.explore}        // Explore
{t.nav.messages}       // Pesan / Messages
{t.nav.settings}       // Settings
{t.common.back}        // Kembali / Back
{t.common.save}        // Simpan / Save
{t.common.cancel}      // Batal / Cancel
{t.common.close}       // Tutup / Close
```

### Buttons & Actions
```tsx
{t.buttons.donate}              // Donasi Sekarang / Donate Now
{t.buttons.viewDetails}         // Lihat Detail / View Details
{t.buttons.viewAll}             // Lihat Semua / View All
{t.buttons.share}               // Bagikan / Share
{t.buttons.edit}                // Edit / Edit
{t.buttons.delete}              // Hapus / Delete
```

### Categories
```tsx
{t.categories.all}              // Semua / All
{t.categories.history}          // Sejarah / History
{t.categories.culture}          // Budaya / Culture
{t.categories.humanitarian}     // Kemanusiaan / Humanitarian
```

### Sections
```tsx
{t.sections.featuredCampaigns}  // Kampanye Pilihan / Featured Campaigns
{t.sections.latestProjects}     // Proyek Terbaru / Latest Projects
{t.sections.howItWorks}         // Cara Kerja / How It Works
```

### Tabs
```tsx
{t.tabs.openVolunteer}          // Open Volunteer
{t.tabs.campaign}               // Campaign
{t.tabs.projectGallery}         // Galeri Project / Project Gallery
```

### Donation
```tsx
{t.donation.donationAmount}     // Nominal Donasi / Donation Amount
{t.donation.selectPaymentMethod}// Pilih Metode Pembayaran / Select Payment Method
{t.donation.totalDonation}      // Total Donasi / Total Donation
```

### Settings
```tsx
{t.settings.editProfileBtn}     // Edit Profil / Edit Profile
{t.settings.personalInfo}       // Informasi Pribadi / Personal Information
{t.settings.alumniData}         // Data Alumni / Alumni Data
{t.settings.changePassword}     // Ubah Password / Change Password
{t.settings.notifications}      // Notifikasi / Notifications
{t.settings.language}           // Bahasa / Language
```

---

## 📁 File-by-File Guide

### 1. ExploreProject.tsx

**Lokasi**: `/src/app/components/ExploreProject.tsx`

**Status**: ✅ Import sudah ada, tinggal replace text

**Yang Perlu Diupdate**:

```tsx
// ❌ SEBELUM
<span className="tracking-wide text-sm">Home</span>
<span className="tracking-wide text-sm">Pesan</span>
<span className="text-sm uppercase tracking-wide">Kembali</span>

// ✅ SESUDAH
<span className="tracking-wide text-sm">{t.nav.home}</span>
<span className="tracking-wide text-sm">{t.nav.messages}</span>
<span className="text-sm uppercase tracking-wide">{t.common.back}</span>

// ❌ SEBELUM
placeholder="Cari proyek impianmu..."

// ✅ SESUDAH
placeholder={t.home.searchPlaceholder}

// ❌ SEBELUM
const categories = [
  { id: 'semua', label: 'Semua', icon: 'star' },
  { id: 'sejarah', label: 'Sejarah', icon: 'history_edu' },
];

// ✅ SESUDAH
const categories = [
  { id: 'semua', label: t.categories.all, icon: 'star' },
  { id: 'sejarah', label: language === 'id' ? 'Sejarah' : 'History', icon: 'history_edu' },
  { id: 'budaya', label: language === 'id' ? 'Budaya' : 'Culture', icon: 'palette' },
  { id: 'kemanusiaan', label: language === 'id' ? 'Kemanusiaan' : 'Humanitarian', icon: 'volunteer_activism' },
];

// ❌ SEBELUM
<span>Lihat Detail</span>

// ✅ SESUDAH
<span>{language === 'id' ? 'Lihat Detail' : 'View Details'}</span>

// ❌ SEBELUM
<span>Project Individu</span>

// ✅ SESUDAH
<span>{language === 'id' ? 'Project Individu' : 'Individual Project'}</span>

// ❌ SEBELUM
status: 'Sedang Berlangsung',
status: 'Akan Datang',
status: 'Sudah Berlalu',

// ✅ SESUDAH - Ini lebih kompleks, perlu update conditional render
{project.status === 'ongoing' && (
  <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md bg-teal-100 text-teal-800 shadow-lg`}>
    {language === 'id' ? 'Sedang Berlangsung' : 'Ongoing'}
  </span>
)}
```

**Pencarian & Replace Cepat**:
1. Cari: `"Semua"` → Replace: `t.categories.all`
2. Cari: `"Kembali"` → Replace: `t.common.back`
3. Cari: `"Pesan"` → Replace: `t.nav.messages`
4. Cari: `"Lihat Detail"` → Replace: `{language === 'id' ? 'Lihat Detail' : 'View Details'}`
5. Cari: `"Project Individu"` → Replace: `{language === 'id' ? 'Project Individu' : 'Individual Project'}`

---

### 2. MessagesAlumni.tsx / MessagePage.tsx

**Lokasi**: `/src/app/components/MessagesAlumni.tsx`

**Yang Perlu Ditambahkan**:

```tsx
// 1. Tambahkan import
import { useTranslation } from '@/hooks/useTranslation';

// 2. Di dalam component
export function MessagesAlumni() {
  const { t, language } = useTranslation();
  // ...
}

// 3. Update text
```

**Mapping Translations**:

```tsx
// Header & Tabs
"PESAN" → {t.messages.messages || (language === 'id' ? 'PESAN' : 'MESSAGES')}
"Pesan Personal" → {language === 'id' ? 'Pesan Personal' : 'Personal Messages'}
"Laporan Donasi" → {language === 'id' ? 'Laporan Donasi' : 'Donation Report'}

// Donation Report
"Total Donasi Anda" → {language === 'id' ? 'Total Donasi Anda' : 'Your Total Donations'}
"Proyek" → {language === 'id' ? 'Proyek' : 'Projects'}
"Terima Kasih!" → {language === 'id' ? 'Terima Kasih!' : 'Thank You!'}

// Status
"Dalam Verifikasi" → {language === 'id' ? 'Dalam Verifikasi' : 'In Verification'}
"Berhasil" → {language === 'id' ? 'Berhasil' : 'Success'}
"Gagal" → {language === 'id' ? 'Gagal' : 'Failed'}

// Details
"Nomor Referensi Donasi" → {language === 'id' ? 'Nomor Referensi Donasi' : 'Donation Reference Number'}
"Nominal Donasi" → {t.donation.donationAmount}
"Metode Pembayaran" → {language === 'id' ? 'Metode Pembayaran' : 'Payment Method'}
"Tanggal" → {language === 'id' ? 'Tanggal' : 'Date'}

// Messages
"Kegagalan Transaksi" → {language === 'id' ? 'Kegagalan Transaksi' : 'Transaction Failed'}
"Maaf, donasi Anda tidak dapat diproses" → {language === 'id' 
  ? 'Maaf, donasi Anda tidak dapat diproses' 
  : 'Sorry, your donation could not be processed'}
```

---

### 3. NotificationCenter.tsx

**Lokasi**: `/src/app/components/NotificationCenter.tsx`

**Yang Perlu Ditambahkan**:

```tsx
// 1. Import
import { useTranslation } from '@/hooks/useTranslation';

// 2. Hook
const { t, language } = useTranslation();

// 3. Update notifications data
const notifications = [
  {
    id: 1,
    title: language === 'id' ? 'Pembaruan Kebijakan Privasi' : 'Privacy Policy Update',
    message: language === 'id' 
      ? 'Kami telah memperbarui kebijakan privasi kami...' 
      : 'We have updated our privacy policy...',
    type: 'announcement',
    timestamp: '2 jam yang lalu',
    isRead: false,
  },
  // ... more notifications
];
```

**Tab Labels**:
```tsx
"Semua" → {t.categories.all}
"Pengumuman" → {language === 'id' ? 'Pengumuman' : 'Announcements'}
"Update Proyek" → {language === 'id' ? 'Update Proyek' : 'Project Updates'}
"Pesan" → {t.nav.messages}
```

---

### 4. ProjectDetail.tsx

**Lokasi**: `/src/app/components/ProjectDetail.tsx`

**Yang Perlu Diupdate**:

```tsx
// Import & Hook (sudah ada)
const { t, language } = useTranslation();

// Update labels
"Lihat Semua" → {t.home.viewAll}
"Kegiatan Offline Terbaru" → {language === 'id' ? 'Kegiatan Offline Terbaru' : 'Latest Offline Activities'}
"Lihat Detail" → {language === 'id' ? 'Lihat Detail' : 'View Details'}
"Deskripsi" → {language === 'id' ? 'Deskripsi' : 'Description'}
"Manfaat" → {language === 'id' ? 'Manfaat' : 'Benefits'}
"Target Audiens" → {language === 'id' ? 'Target Audiens' : 'Target Audience'}
"Organisator" → {language === 'id' ? 'Organisator' : 'Organizer'}
```

---

### 5. DonationPage.tsx

**Lokasi**: `/src/app/components/DonationPage.tsx`

**Yang Perlu Diupdate**:

```tsx
// Sudah ada hook, tinggal update text

// Form Labels
"Nominal Donasi" → {t.donation.donationAmount}
"Pilih Metode Pembayaran" → {t.donation.selectPaymentMethod}
"Nama Lengkap" → {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
"Email" → "Email" // sama di kedua bahasa
"Nomor Telepon" → {language === 'id' ? 'Nomor Telepon' : 'Phone Number'}
"Pesan (Opsional)" → {language === 'id' ? 'Pesan (Opsional)' : 'Message (Optional)'}

// Buttons
"Lanjutkan Pembayaran" → {language === 'id' ? 'Lanjutkan Pembayaran' : 'Continue Payment'}
"Donasi Sekarang" → {t.buttons.donate}

// Payment Methods
"Transfer Bank" → {language === 'id' ? 'Transfer Bank' : 'Bank Transfer'}
"E-Wallet" → "E-Wallet" // sama
"Kartu Kredit" → {language === 'id' ? 'Kartu Kredit' : 'Credit Card'}
```

---

## 💡 Contoh Kode Lengkap

### Contoh 1: Update Simple Component

```tsx
// ❌ SEBELUM
export function SimpleCard() {
  return (
    <div>
      <h2>Judul Proyek</h2>
      <p>Deskripsi proyek yang menarik</p>
      <button>Lihat Detail</button>
    </div>
  );
}

// ✅ SESUDAH
import { useTranslation } from '@/hooks/useTranslation';

export function SimpleCard() {
  const { t, language } = useTranslation();
  
  return (
    <div>
      <h2>{language === 'id' ? 'Judul Proyek' : 'Project Title'}</h2>
      <p>{language === 'id' ? 'Deskripsi proyek yang menarik' : 'Interesting project description'}</p>
      <button>{language === 'id' ? 'Lihat Detail' : 'View Details'}</button>
    </div>
  );
}
```

### Contoh 2: Update dengan Array/Data

```tsx
// ❌ SEBELUM
const statuses = [
  { id: 1, label: 'Akan Datang' },
  { id: 2, label: 'Sedang Berlangsung' },
  { id: 3, label: 'Sudah Berlalu' },
];

// ✅ SESUDAH
const { language } = useTranslation();

const statuses = [
  { 
    id: 1, 
    label: language === 'id' ? 'Akan Datang' : 'Upcoming',
    labelId: 'Akan Datang',
    labelEn: 'Upcoming'
  },
  { 
    id: 2, 
    label: language === 'id' ? 'Sedang Berlangsung' : 'Ongoing',
    labelId: 'Sedang Berlangsung',
    labelEn: 'Ongoing'
  },
  { 
    id: 3, 
    label: language === 'id' ? 'Sudah Berlalu' : 'Past',
    labelId: 'Sudah Berlalu',
    labelEn: 'Past'
  },
];
```

### Contoh 3: Update Modal/Dialog

```tsx
// ❌ SEBELUM
<div className="modal">
  <h2>Konfirmasi</h2>
  <p>Apakah Anda yakin ingin menghapus item ini?</p>
  <button>Batal</button>
  <button>Hapus</button>
</div>

// ✅ SESUDAH
const { t, language } = useTranslation();

<div className="modal">
  <h2>{language === 'id' ? 'Konfirmasi' : 'Confirmation'}</h2>
  <p>{language === 'id' 
    ? 'Apakah Anda yakin ingin menghapus item ini?' 
    : 'Are you sure you want to delete this item?'}
  </p>
  <button>{t.common.cancel}</button>
  <button>{t.buttons.delete}</button>
</div>
```

---

## 🎯 Best Practices

### 1. ✅ DO - Yang Harus Dilakukan

```tsx
// ✅ Gunakan t object untuk text yang umum
<span>{t.nav.home}</span>

// ✅ Gunakan conditional untuk text spesifik
<span>{language === 'id' ? 'Status Donasi' : 'Donation Status'}</span>

// ✅ Extract ke variable untuk text panjang
const welcomeMessage = language === 'id' 
  ? 'Selamat datang di AlMaqdisi Project, platform untuk...' 
  : 'Welcome to AlMaqdisi Project, a platform for...';

// ✅ Gunakan template literals untuk kombinasi
const greeting = `${t.common.welcome}, ${userName}!`;

// ✅ Handle edge cases
const buttonText = t.buttons?.donate || (language === 'id' ? 'Donasi' : 'Donate');
```

### 2. ❌ DON'T - Yang Harus Dihindari

```tsx
// ❌ JANGAN hardcode text
<span>Home</span>

// ❌ JANGAN lupa import
// Missing: import { useTranslation } from '@/hooks/useTranslation';

// ❌ JANGAN lupa declare hook
// Missing: const { t, language } = useTranslation();

// ❌ JANGAN gunakan t untuk text yang tidak ada
<span>{t.someRandomText}</span> // undefined!

// ❌ JANGAN lupa handle null/undefined
// Gunakan optional chaining atau fallback
```

### 3. 🔍 Code Review Checklist

Sebelum commit, cek:
- [ ] Import `useTranslation` sudah ada?
- [ ] Hook sudah di-declare di component?
- [ ] Semua hardcoded text sudah diganti?
- [ ] Test di kedua bahasa (ID & EN)?
- [ ] Tidak ada undefined translation keys?
- [ ] Modal/Dialog sudah diterjemahkan?
- [ ] Error messages sudah diterjemahkan?

---

## 🔧 Troubleshooting

### Problem 1: "t is undefined"
```tsx
// ❌ SALAH
export function MyComponent() {
  return <span>{t.nav.home}</span>; // Error!
}

// ✅ BENAR
import { useTranslation } from '@/hooks/useTranslation';

export function MyComponent() {
  const { t } = useTranslation();
  return <span>{t.nav.home}</span>;
}
```

### Problem 2: Translation tidak berubah
```tsx
// Cek apakah language prop sudah di-pass ke component
<MyComponent language={language} />

// Atau pastikan useTranslation() digunakan
const { language } = useTranslation();
```

### Problem 3: Text masih hardcoded
```tsx
// Gunakan Find & Replace di editor
// Cari: "Lihat Detail"
// Replace: {language === 'id' ? 'Lihat Detail' : 'View Details'}
```

---

## 📊 Progress Tracker

Gunakan checklist ini untuk tracking progress:

### Core Components
- [x] App.tsx - Hero & Navigation ✅
- [x] SettingsPage.tsx ✅
- [ ] ExploreProject.tsx - Categories & Labels
- [ ] MessagesAlumni.tsx - All text
- [ ] NotificationCenter.tsx - Notifications
- [ ] ProjectDetail.tsx - Detail sections
- [ ] DonationPage.tsx - Form labels
- [ ] CampaignList.tsx - Campaign items
- [ ] MyJoinRequests.tsx - Request statuses
- [ ] MyDonations.tsx - Donation history

### Modals & Dialogs
- [ ] Filter Modal (ExploreProject)
- [ ] Donation Modal
- [ ] Confirmation Dialogs
- [ ] Success/Error Messages

### Small Components
- [ ] Footer text
- [ ] Toast notifications
- [ ] Loading states
- [ ] Empty states

---

## 🚀 Quick Start - Workflow

1. **Buka file yang ingin diupdate**
2. **Tambahkan import** (jika belum ada):
   ```tsx
   import { useTranslation } from '@/hooks/useTranslation';
   ```

3. **Tambahkan hook** di component:
   ```tsx
   const { t, language } = useTranslation();
   ```

4. **Find hardcoded text** (Ctrl+F atau Cmd+F):
   - Cari: `"Text Indonesia"`
   - Cari: `'Text Indonesia'`
   - Cari: `>Text Indonesia<`

5. **Replace dengan translation**:
   - Cek `/src/translations.ts` dulu
   - Jika ada → gunakan `{t.category.key}`
   - Jika tidak ada → gunakan conditional `{language === 'id' ? 'Indo' : 'English'}`

6. **Test kedua bahasa**:
   - Buka Settings → Ubah bahasa
   - Cek semua text berubah

7. **Commit changes**

---

## 📞 Support

Jika ada pertanyaan atau menemukan issue:
1. Cek dokumentasi ini dulu
2. Cek `/src/translations.ts` untuk available keys
3. Cek contoh implementasi di `App.tsx` atau `SettingsPage.tsx`
4. Tanya di team channel

---

**Last Updated**: 2026-02-23
**Version**: 1.0
**Author**: AI Assistant
