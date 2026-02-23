# 🗺️ PRODUCT FLOW DOCUMENT — ALMAQDISI PROJECT
**Versi:** 1.0 | **Tanggal:** 18 Feb 2026
**Metodologi:** Role-by-role flow mapping berbasis analisis kodebase aktual

---

## 📌 CATATAN PENTING SEBELUM MEMBACA

Dokumen ini dibuat berdasarkan kodebase yang ada saat ini. Setiap "flow yang terputus" ditulis berdasarkan kondisi nyata, bukan asumsi. Role yang ada di sistem ini terbagi dua jalur berbeda:

- **Jalur Frontend (publik + alumni):** Guest → Donatur → Alumni → Alumni-Guest
- **Jalur Admin Panel (internal):** PIC → Moderator → Superadmin

Kedua jalur ini berjalan di aplikasi yang sama tetapi melalui pintu masuk yang berbeda. Tidak ada "Admin" sebagai role tersendiri — yang ada adalah Superadmin.

---

## 1️⃣ GLOBAL SYSTEM MAP

### Peta Hubungan Antar Role

```
┌─────────────────────────────────────────────────────────────────┐
│                     PLATFORM ALMAQDISI                          │
│                                                                 │
│  ┌──────────┐      ┌──────────┐      ┌──────────────────────┐  │
│  │  GUEST   │─────▶│ DONATUR  │      │       ALUMNI         │  │
│  │(tdk lgn) │      │(non-alm) │      │(sudah login)         │  │
│  └──────────┘      └────┬─────┘      └──────────┬───────────┘  │
│       │                 │                        │              │
│       │ lihat project   │ donasi                 │ donasi +     │
│       │                 │                        │ join project │
│       └────────────┬────┘                        │              │
│                    │                             │              │
│                    ▼                             ▼              │
│            ┌───────────────────────────────────────────┐       │
│            │           DONATION FLOW                    │       │
│            │  [Submit] → [Upload Bukti] → [Pending]    │       │
│            └─────────────────────┬─────────────────────┘       │
│                                  │                              │
│                    ┌─────────────▼──────────────────────┐      │
│                    │         ADMIN PANEL                 │      │
│                    │                                     │      │
│  ┌─────────────┐   │  ┌──────────┐   ┌───────────────┐ │      │
│  │  SUPERADMIN │◀──┼──│MODERATOR │   │  PIC PROJECT  │ │      │
│  │             │   │  │          │   │               │ │      │
│  │ • Approve   │   │  │ • View   │   │ • Manage      │ │      │
│  │   donasi    │   │  │   semua  │   │   member      │ │      │
│  │ • Wallet    │   │  │ • Alumni │   │ • Konten      │ │      │
│  │ • Global    │   │  │   data   │   │ • Finance     │ │      │
│  │   finance   │   │  │ • Konten │   │ • Polling     │ │      │
│  └─────────────┘   │  └──────────┘   └───────────────┘ │      │
│                    └─────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Siapa Memulai Flow, Siapa Menutupnya

| Flow | Dimulai Oleh | Diproses Oleh | Ditutup Oleh |
|------|-------------|---------------|--------------|
| Donasi | Donatur / Alumni | Superadmin | Superadmin (approve/reject) |
| Join Project | Alumni | PIC | PIC (approve/reject) |
| Progress Update | PIC | — | PIC (publish) |
| Polling | PIC | Alumni (vote) | PIC (tutup deadline) |
| Task Delegasi | PIC | Alumni (execute) | Alumni (update status) |
| Withdrawal Dana | PIC (request) | Superadmin | Superadmin (approve) |
| Tutup Project | PIC / Superadmin | Superadmin | Superadmin |

### Ketergantungan Antar Role

```
Alumni ──────────▶ PIC (butuh persetujuan join project)
Donatur/Alumni ──▶ Superadmin (butuh approve donasi)
PIC ─────────────▶ Superadmin (butuh approve withdrawal)
PIC ─────────────▶ Superadmin (laporan keuangan)
Moderator ───────▶ Superadmin (hanya bisa lihat, tidak bisa ubah)
```

---

## 2️⃣ FLOW DETAIL PER ROLE

---

## 🔵 SUPERADMIN

### A. Tujuan Utama
Superadmin adalah satu-satunya pihak yang bisa memvalidasi uang masuk ke sistem, mengelola semua wallet project, dan memiliki pandangan global atas seluruh kondisi platform.

### B. Entry Point
Superadmin masuk melalui halaman **Admin Panel** yang terpisah dari frontend utama. Setelah klik link Admin Panel di homepage, diarahkan ke `AdminLoginRevised` → login dengan kredensial superadmin → masuk ke `AdminPanelRevised`.

### C. Aksi yang Bisa Dilakukan

| Menu | Aksi |
|------|------|
| Dashboard | Lihat ringkasan semua aktivitas lintas project |
| Financial Dashboard | Lihat total donasi, grafik tren, top project |
| Verifikasi Donasi | Approve/reject donasi pending, lihat bukti transfer |
| Manajemen Dompet | Lihat semua wallet project, approve withdrawal request |
| Data Alumni | Lihat dan kelola data semua alumni |
| Keuangan Project | Lihat detail keuangan project manapun |
| Konten Project | Lihat dan moderasi konten dari semua project |
| Delegasi PIC | Lihat dan kelola delegasi PIC |
| Activity Log | Lihat seluruh log aktivitas lintas project |

### D. Flow Step-by-Step

#### ▶ Flow: Verifikasi Donasi

```
1. Superadmin buka menu "Verifikasi Donasi"
2. Halaman menampilkan dua tab: "Pending Payment" dan "Riwayat Verifikasi"
3. Superadmin melihat list donasi dengan status PENDING
4. Superadmin bisa filter berdasarkan nama donatur atau project
5. Superadmin klik "Lihat Bukti Transfer" → modal preview gambar bukti muncul
6. Superadmin klik "Approve":
   a. Modal konfirmasi muncul
   b. Superadmin isi catatan verifikasi (WAJIB)
   c. Klik "Approve Donasi"
   d. Toast success muncul
   e. [KONDISI SAAT INI] Status donasi tidak berubah di list (bug)
7. Superadmin klik "Reject":
   a. Modal muncul
   b. Superadmin isi alasan penolakan (WAJIB)
   c. Catatan bahwa alasan akan dikirim ke donatur via email
   d. Klik "Tolak Donasi"
   e. Toast muncul
8. Tab "Riwayat Verifikasi" menampilkan semua donasi yang sudah diproses
```

#### ▶ Flow: Manajemen Dompet

```
1. Superadmin buka menu "Manajemen Dompet"
2. Lihat ringkasan global: Total Saldo, Total Pemasukan, Total Pengeluaran, Dana Pending
3. Lihat grafik bar per project
4. Lihat list semua wallet project (card per project)
5. Setiap card menampilkan: nama project, saldo, pemasukan, pengeluaran, status
6. Klik "Detail" pada wallet → modal detail muncul dengan histori transaksi project tersebut
7. Superadmin melihat "Withdrawal Requests" (list permintaan penarikan dana dari PIC)
8. Klik "Proses" pada withdrawal → modal muncul
9. Isi catatan approval atau alasan penolakan
10. Klik "Approve" atau "Reject"
```

#### ▶ Flow: Financial Dashboard

```
1. Buka menu "Financial Dashboard"
2. Lihat 4 kartu stats: Total Donasi All Time, Donasi Bulan Ini, Project Aktif, Total Donatur
3. Lihat grafik tren donasi bulanan (line chart)
4. Lihat bar chart perbandingan pemasukan vs pengeluaran per project
5. Lihat "Top Projects by Donation" (tabel ranking project)
6. Lihat tabel "Donasi Terbaru" (5 donasi terakhir)
7. Lihat tabel "Transaksi Wallet Terbaru"
8. Filter berdasarkan rentang waktu: 6 bulan, 1 tahun, semua
```

### E. Dampak ke Role Lain

- Ketika Superadmin **approve donasi** → seharusnya saldo wallet project bertambah, donatur mendapat notifikasi
- Ketika Superadmin **reject donasi** → seharusnya donatur mendapat email dengan alasan
- Ketika Superadmin **approve withdrawal** → dana keluar dari wallet project
- Ketika Superadmin **edit data alumni** → data yang dilihat Moderator dan PIC berubah

### F. Flow yang Belum Ditutup

- Setelah approve donasi, tidak ada update otomatis ke wallet project
- Tidak ada notifikasi balik ke donatur setelah diapprove/rejected
- Tidak ada mekanisme "undo" jika salah approve
- Tidak ada dashboard "Project Ditutup" untuk mengelola project yang sudah selesai
- Tidak ada fitur tambah project baru dari Superadmin
- Tidak ada cara Superadmin intervensi langsung ke diskusi project

### G. Potensi Kebingungan UX

- Di riwayat verifikasi, kolom "Verifikator" selalu menampilkan nama Superadmin yang sedang login — bagus. Tapi ini hardcoded `currentUser.name`, bukan dari data transaksi historis
- Tombol Approve dan Reject berada bersebelahan di card yang sama, risiko salah klik
- Tidak ada perbedaan visual antara donasi yang "baru masuk hari ini" vs "pending 3 hari lalu"

---

## 🟢 ADMIN (ROLE INI TIDAK ADA)

Setelah analisis seluruh kodebase, **tidak ditemukan role "Admin" yang terpisah dari Superadmin**. Di `AdminSidebarRevised.tsx`, hanya ada tiga role: `pic`, `moderator`, `superadmin`. Tidak ada role `admin`.

Jika ke depan dibutuhkan, Admin bisa diposisikan sebagai:
- Superadmin tanpa akses hapus data atau ubah role
- Atau sebagai "Superadmin operasional" yang bisa approve donasi tapi tidak bisa akses wallet

Untuk sekarang: **anggap Superadmin = Admin tertinggi**.

---

## 🟣 MODERATOR

### A. Tujuan Utama
Moderator berfungsi sebagai pengawas lintas project. Dia bisa melihat semua yang terjadi di seluruh project — data alumni, konten, keuangan — tapi tidak bisa mengubah hal-hal yang bersifat finansial atau keputusan approval.

### B. Entry Point
Sama seperti Superadmin: masuk melalui Admin Panel → login dengan kredensial moderator → diarahkan ke `ModeratorDashboard`.

### C. Aksi yang Bisa Dilakukan

| Menu | Aksi |
|------|------|
| Dashboard | Lihat ringkasan semua project (stats gabungan) |
| Data Alumni | Cari, filter, tambah, dan edit data alumni |
| Konten Project | Lihat dan moderasi semua konten dari semua project |
| Keuangan (view) | Lihat semua transaksi lintas project (read-only) |
| Activity Log | Lihat semua log aktivitas lintas project |

### D. Flow Step-by-Step

#### ▶ Flow: Kelola Data Alumni

```
1. Moderator buka menu "Data Alumni"
2. Lihat tabel semua alumni (nama, email, angkatan, jurusan, kota, status, project joined, total donasi)
3. Moderator bisa filter: berdasarkan angkatan, status (aktif/tidak)
4. Moderator bisa cari berdasarkan nama/email
5. Klik "Tambah Alumni" → modal form muncul
6. Isi data: nama, email, telepon, angkatan, jurusan, tahun lulus, kota, riwayat Saladin Camp
7. Submit → alumni baru muncul di list
8. Klik ikon edit di baris alumni → modal edit terbuka
9. Moderator bisa ubah semua data alumni
10. Klik ikon hapus → konfirmasi → alumni dihapus dari list
```

#### ▶ Flow: Moderasi Konten

```
1. Moderator buka menu "Konten Project"
2. Lihat semua konten dari semua project (filter tersedia: per project, per tipe)
3. Moderator bisa lihat detail konten
4. Moderator bisa hapus konten yang melanggar aturan
5. Tidak ada fitur "edit konten orang lain" — hanya delete
```

#### ▶ Flow: Lihat Keuangan

```
1. Moderator buka menu "Keuangan Project" (di sidebar hanya visible untuk moderator jika ada)
2. Filter berdasarkan project atau lihat semua sekaligus
3. Lihat tabel transaksi: tanggal, project, tipe (pemasukan/pengeluaran), kategori, nominal, status
4. Tidak bisa tambah, edit, atau hapus transaksi
5. Tidak bisa approve atau reject apapun
```

### E. Dampak ke Role Lain

- Jika Moderator tambah alumni baru → alumni tersebut bisa login
- Jika Moderator hapus konten → konten hilang dari project (PIC kehilangan konten tanpa notifikasi)

### F. Flow yang Belum Ditutup

- Moderator tidak bisa memberikan catatan/feedback ke PIC atas konten yang dihapus
- Tidak ada notifikasi ke PIC ketika Moderator menghapus kontennya
- Moderator tidak punya cara untuk "menandai" donasi yang mencurigakan untuk direview Superadmin
- Tidak ada fitur "komunikasi langsung" antara Moderator dan PIC
- Moderator melihat keuangan SEMUA project padahal seharusnya hanya project yang di-assign

### G. Potensi Kebingungan UX

- Dashboard Moderator menampilkan "Pending Requests: 7" tapi Moderator tidak bisa melakukan apapun terhadap pending requests — ini membingungkan
- Tidak ada batas jelas antara "Moderator bisa apa" vs "tidak bisa apa" di UI

---

## 🟠 PIC PROJECT

### A. Tujuan Utama
PIC (Project In Charge) adalah pengelola satu project spesifik. Dia bertanggung jawab atas semua yang terjadi di dalam projectnya: member, konten, keuangan, dan komunikasi internal.

### B. Entry Point
PIC masuk melalui Admin Panel → login dengan kredensial PIC → sistem mendeteksi `projectId` yang di-assign ke PIC tersebut → diarahkan ke `PICDashboard` khusus projectnya. Jika PIC belum di-assign ke project, tampil halaman error.

### C. Aksi yang Bisa Dilakukan

| Menu | Aksi |
|------|------|
| Dashboard | Lihat stats project sendiri (member, donasi, pending requests) |
| Pengajuan Join | Approve/reject alumni yang mau bergabung |
| Keuangan Project | Lihat dan tambah transaksi keuangan project sendiri |
| Konten Project | Buat, edit, hapus progress update project |
| Polling | Buat dan kelola polling untuk member project |
| Delegasi PIC | Buat dan assign task ke member project |
| Activity Log | Lihat log aktivitas project sendiri |

### D. Flow Step-by-Step

#### ▶ Flow: Approve/Reject Join Request

```
1. PIC login → Dashboard menampilkan alert "X Pengajuan Menunggu Persetujuan"
2. PIC klik "Review Sekarang" atau buka menu "Pengajuan Join"
3. Lihat list alumni yang ingin bergabung dengan card detail:
   - Nama alumni
   - Alasan bergabung
   - Durasi komitmen yang dipilih
   - Rating sebelumnya (jika ada)
   - Waktu pengajuan
4. PIC klik "Approve":
   a. Modal muncul dengan pesan selamat datang yang sudah terisi otomatis
   b. PIC bisa edit pesan selamat datang
   c. Ada toggle "Kirim email notifikasi"
   d. Klik "Konfirmasi Terima"
   e. Alumni keluar dari list pending
   f. Toast success muncul
5. PIC klik "Tolak":
   a. Modal muncul
   b. PIC pilih alasan dari dropdown (komitmen terlalu singkat, kuota penuh, dll)
   c. PIC bisa tambah pesan custom
   d. Ada toggle "Izinkan resubmit" dan "Kirim email"
   e. Klik "Konfirmasi Tolak"
   f. Alumni keluar dari list pending
```

#### ▶ Flow: Buat Progress Update

```
1. PIC buka menu "Konten Project"
2. Lihat list semua update yang sudah dipublish
3. Klik "Buat Update Baru"
4. Modal form muncul:
   - Pilih tipe update: Progress, Milestone, Pengumuman, Galeri
   - Isi judul (wajib)
   - Isi konten (wajib)
   - Toggle "Notifikasi ke Member" (default: aktif)
5. Klik "Publish"
6. Update muncul di list konten
7. [KONDISI SAAT INI] Alumni di frontend tidak otomatis mendapat update ini
```

#### ▶ Flow: Buat Polling

```
1. PIC buka menu "Polling"
2. Lihat list polling aktif dan yang sudah selesai
3. Klik "Buat Polling Baru"
4. Isi:
   - Pertanyaan (wajib)
   - Deskripsi tambahan
   - Opsi jawaban (minimal 2, bisa tambah lebih)
   - Toggle: Boleh pilih lebih dari satu
   - Toggle: Polling anonim
   - Deadline (wajib)
5. Klik "Buat Polling"
6. Polling aktif muncul dan bisa dilihat member
7. PIC bisa tutup polling sebelum deadline
```

#### ▶ Flow: Delegasi Task ke Member

```
1. PIC buka menu "Delegasi PIC"
2. Lihat list task yang sudah ada (dengan status: pending, in-progress, done)
3. Klik "Buat Task Baru"
4. Isi:
   - Judul task (wajib)
   - Deskripsi
   - Assign ke (pilih dari list member aktif project) — wajib
   - Prioritas: Low, Medium, High, Urgent
   - Kategori: Operasional, Distribusi, Marketing, Admin, Lainnya
   - Deadline (wajib)
5. Klik "Buat Task"
6. Task muncul di list dengan status "Pending"
7. [KONDISI SAAT INI] Member tidak mendapat notifikasi otomatis
```

#### ▶ Flow: Kelola Keuangan Project

```
1. PIC buka menu "Keuangan Project"
2. Lihat ringkasan: Dana Umum, Dana Internal, Total Dana, Total Pengeluaran, Saldo
3. Lihat breakdown pengeluaran per kategori
4. Lihat histori transaksi
5. Klik "Tambah Transaksi"
6. Pilih tipe: Pengeluaran atau Pemasukan Internal
7. Isi: nominal, deskripsi, kategori, tanggal
8. Submit → transaksi masuk ke list
9. [KONDISI SAAT INI] Tidak ada approval dari Superadmin untuk pengeluaran
```

### E. Dampak ke Role Lain

- Ketika PIC **approve join request** → Alumni mendapat akses penuh ke tab Diskusi dan Wallet di frontend
- Ketika PIC **buat progress update** → konten seharusnya muncul di tab Progress alumni
- Ketika PIC **buat polling** → polling seharusnya muncul di tab Voting alumni
- Ketika PIC **assign task** → task seharusnya muncul di tab Tasks alumni

### F. Flow yang Belum Ditutup

- PIC tidak bisa komunikasi langsung dengan Superadmin dari dalam Admin Panel
- PIC tidak bisa mengajukan penutupan project secara resmi
- PIC tidak bisa request withdrawal dana dari Admin Panel (hanya bisa tambah transaksi)
- PIC tidak mendapat notifikasi ketika donasi untuk projectnya diapprove Superadmin
- PIC tidak bisa melihat siapa yang sudah pernah donasi ke projectnya secara langsung

### G. Potensi Kebingungan UX

- PIC Dashboard menampilkan "Total Donasi" tapi ini bisa berbeda dengan saldo real di Wallet Management Superadmin
- PIC bisa tambah pengeluaran tanpa batas — tidak ada warning jika saldo akan minus
- Tidak ada perbedaan visual antara transaksi yang sudah "terverifikasi" dan yang baru diinput PIC

---

## 🟡 ALUMNI (LOGIN)

### A. Tujuan Utama
Alumni adalah user utama platform ini. Mereka bisa berpartisipasi secara aktif dalam project — bukan hanya sebagai donatur, tetapi juga sebagai kontributor langsung dengan bergabung menjadi member project.

### B. Entry Point
Alumni masuk dari Login page → pilih role "Alumni" → isi email dan password → klik login → diarahkan ke Home page dengan `userRole = 'alumni'`.

### C. Aksi yang Bisa Dilakukan

| Area | Aksi |
|------|------|
| Home | Lihat semua project, berita, event, cerita alumni |
| Explore | Browse semua project (Open Volunteer + Galeri) |
| Project Detail | Lihat 5 tab: Overview, Progress, Members, Discussion (member only), Wallet (member only) |
| Join Project | Isi form komitmen dan alasan, kirim pengajuan ke PIC |
| Donasi | Lengkapi flow donasi penuh dengan upload bukti |
| Pesan | Akses MessagesAlumni (chat, teams, tasks, voting) |
| Settings | Edit profil lengkap termasuk data alumni dan Saladin Camp |

### D. Flow Step-by-Step

#### ▶ Flow: Bergabung ke Project

```
1. Alumni buka Project Detail (tab Overview)
2. Jika belum member, tampil:
   a. Tombol "Bergabung ke Project" (jika belum pernah apply)
   b. Status "Menunggu Persetujuan" (jika sudah apply, status: pending)
   c. Tab Discussion dan Wallet terkunci dengan pesan "Join dulu"
3. Klik "Bergabung ke Project" → modal form muncul
4. Isi:
   - Pilih durasi komitmen: 1 Bulan, 3 Bulan, 6 Bulan, 1 Tahun, Custom
   - Jika Custom: isi kolom durasi manual
   - Isi alasan bergabung (wajib, textarea)
5. Klik "Kirim Pengajuan"
6. Toast "Pengajuan berhasil dikirim! Menunggu persetujuan PIC"
7. Modal tertutup, status di UI berubah jadi "Menunggu Persetujuan"
8. Tombol "Bergabung" berubah jadi status badge kuning
9. [KONDISI SAAT INI] Tidak ada cara alumni tahu kapan PIC akan review
10. Jika PIC approve → di sesi baru alumni akan memiliki `isProjectMember = true`
    → Tab Discussion dan Wallet menjadi accessible
```

#### ▶ Flow: Akses Discussion Tab (hanya member)

```
1. Alumni yang sudah jadi member buka tab "Diskusi"
2. Tampil thread diskusi dengan pesan-pesan dari member lain
3. Alumni bisa scroll pesan ke atas (histori)
4. Alumni bisa expand/collapse pesan panjang
5. Alumni ketik pesan di input bawah
6. Klik kirim → pesan muncul di thread
7. Alumni bisa klik ikon vote di pesan tertentu
```

#### ▶ Flow: Akses Wallet Tab (hanya member)

```
1. Alumni yang sudah jadi member buka tab "Wallet"
2. Lihat ringkasan saldo: total masuk, total keluar, saldo tersisa
3. Ada filter: Semua, Dana Internal, Donasi, Pengeluaran
4. Lihat list transaksi dengan ikon warna berbeda per tipe
5. [KONDISI SAAT INI] Data yang ditampilkan adalah data hardcoded,
   bukan data real project yang diikuti alumni
```

#### ▶ Flow: Akses Pesan & Voting (MessagesAlumni)

```
1. Alumni buka menu "Pesan"
2. Tampil 4 tab: Chats, Teams, Tasks, Voting
3. [Tab Chats]:
   - Lihat list percakapan (personal + group)
   - Bisa buka chat tertentu
   - Bisa kirim pesan (UI ada, tapi pengiriman belum fungsional)
4. [Tab Teams]:
   - Tampil hanya jika hasJoinedProjects = true
   - Lihat list tim/channel project yang diikuti
   - Jika belum join: muncul CTA "Bergabung ke Project"
5. [Tab Tasks]:
   - Lihat task yang di-assign PIC ke alumni ini
   - Bisa lihat detail task, deadline, prioritas
6. [Tab Voting]:
   - Lihat polling aktif dari project
   - Bisa pilih opsi dan submit vote
   - Setelah vote: lihat hasil dalam bentuk bar progress
   - Alumni tidak bisa vote dua kali untuk polling yang sama
```

### E. Dampak ke Role Lain

- Ketika Alumni **submit join request** → PIC mendapat alert di dashboard
- Ketika Alumni **donasi** → Superadmin mendapat item baru di Verifikasi Donasi
- Ketika Alumni **vote di polling** → jumlah vote bertambah di data polling PIC

### F. Flow yang Belum Ditutup

- Alumni tidak mendapat notifikasi ketika join request diapprove/rejected
- Alumni tidak bisa lihat riwayat donasi yang pernah dilakukan
- Alumni tidak bisa membatalkan join request yang sudah dikirim
- Alumni tidak bisa keluar (resign) dari project yang sudah diikuti
- Setelah donasi disubmit, tidak ada halaman "Status Donasimu" untuk cek perkembangan
- Alumni tidak mendapat pemberitahuan ketika ada progress update baru dari PIC
- Tidak ada cara alumni menghubungi PIC langsung dari project detail

### G. Potensi Kebingungan UX

- Tab Discussion dan Wallet terkunci dengan teks "Join dulu" — tapi tidak ada penjelasan bagaimana proses joinnya
- Setelah submit join form, halaman kembali ke Overview tanpa perubahan yang obvious — user bisa berpikir formnya tidak terkirim
- Di tab Wallet, saldo yang ditampilkan sama untuk semua project (karena hardcoded) — alumni bisa bingung mana saldo project yang mana

---

## ⚪ DONATUR (NON-ALUMNI)

### A. Tujuan Utama
Donatur adalah pihak luar (bukan alumni program) yang ingin berkontribusi secara finansial. Akses mereka terbatas pada donasi dan melihat project secara publik.

### B. Entry Point
Donatur bisa:
1. Masuk tanpa login (sebagai Guest) lalu klik "Donasi"
2. Login dengan role "Donatur" untuk pengalaman yang lebih terpersonalisasi

Setelah login, `userRole = 'donatur'` tersimpan di localStorage.

### C. Aksi yang Bisa Dilakukan

| Area | Aksi |
|------|------|
| Home | Lihat semua project, event, cerita alumni (sama dengan guest) |
| Explore | Browse project di tab Open Volunteer dan Galeri |
| Project Detail | Hanya `ProjectDetail` biasa (bukan `ProjectDetailAlumni`) |
| Donasi | Akses flow donasi lengkap |
| Pesan | Akses `MessagePage` biasa (bukan versi alumni) |
| Settings | Edit profil dasar (nama, email, foto) |

### D. Flow Step-by-Step

#### ▶ Flow: Donasi (Flow Utama Donatur)

```
1. Donatur buka project detail
2. Klik tombol "Donasi Sekarang"
3. DonationPage terbuka

─── STEP 1: PILIH NOMINAL ───
4. Donatur klik nominal cepat (50rb, 100rb, 250rb, 500rb, 1jt, 2.5jt)
   ATAU ketik nominal manual di kolom custom
5. Isi pesan/doa (opsional)
6. Toggle "Donasi Anonim" (opsional)
7. Pilih metode pembayaran: BCA, Mandiri, BNI, GoPay, OVO, DANA, QRIS
8. Klik "Konfirmasi Donasi"
9. [Validasi] Jika nominal kosong/tidak valid → toast error

─── STEP 2: KONFIRMASI ───
10. Modal konfirmasi muncul, tampil:
    - Nominal yang dipilih
    - Unique code 3 digit (misal: 487)
    - Total yang harus ditransfer = nominal + unique code
    - Nomor rekening tujuan
    - Nama rekening
    - Tombol "Copy Nomor Rekening"
    - Tombol "Copy Total Transfer"
11. Donatur melakukan transfer manual ke rekening yang ditampilkan
    [KONDISI SAAT INI] Tidak ada timer berapa lama rekening ini berlaku

─── STEP 3: UPLOAD BUKTI ───
12. Setelah transfer, donatur klik "Saya Sudah Transfer"
13. Area upload bukti transfer muncul
14. Donatur klik area upload / drag-drop file
15. [Validasi] Hanya gambar/PDF, max 5MB
16. Preview bukti muncul setelah dipilih
17. Donatur bisa hapus dan ganti file
18. Klik "Kirim Bukti Transfer"
19. [Validasi] Jika file belum diupload → toast error
20. Loading 1.5 detik (simulasi)
21. [Jika berhasil] → pindah ke Thank You Page

─── STEP 4: THANK YOU PAGE ───
22. Tampil pesan terima kasih
23. Tampil reference number donasi
24. [KONDISI SAAT INI] Status yang ditampilkan: "Berhasil"
    (seharusnya: "Menunggu Verifikasi")
25. Donatur tidak tahu harus berbuat apa selanjutnya
26. Tidak ada link ke "Cek Status Donasi"
```

### E. Dampak ke Role Lain

- Ketika Donatur upload bukti → seharusnya Superadmin mendapat notifikasi di Verifikasi Donasi
- [Kondisi saat ini] Tidak ada koneksi antara aksi donatur di frontend dan data di admin panel

### F. Flow yang Belum Ditutup

- Donatur tidak punya halaman "Riwayat Donasiku" sama sekali
- Donatur tidak tahu status donasinya setelah submit (pending/approved/rejected)
- Donatur tidak mendapat notifikasi apapun setelah Superadmin approve/reject
- Donatur tidak bisa upload ulang bukti jika ditolak (tidak ada mekanisme resubmit)
- Donatur tidak tahu berapa lama waktu verifikasi yang dibutuhkan
- Jika donatur lupa unique code-nya, tidak ada cara untuk menemukannya kembali

### G. Potensi Kebingungan UX

- Thank You Page menampilkan kesan donasi "sudah selesai" padahal masih perlu diverifikasi
- Tidak ada instruksi jelas: "Simpan nomor referensi ini untuk konfirmasi selanjutnya"
- Pilihan metode pembayaran QRIS menampilkan "Scan QR Code" sebagai "nomor akun" — tidak ada QR code yang actual ditampilkan

---

## 🔘 ALUMNI-GUEST (TIDAK LENGKAP)

### Kondisi Aktual di Kodebase

Role `alumni-guest` didefinisikan di `App.tsx` sebagai salah satu nilai yang bisa disimpan di localStorage. Namun:

- **Tidak ada halaman registrasi** yang menghasilkan role `alumni-guest`
- **Tidak ada komponen** yang menangani tampilan khusus untuk role ini
- `Login.tsx` hanya menghasilkan `'donatur'` atau `'alumni'` — tidak ada `'alumni-guest'`
- Di semua `if` statement di `App.tsx`, tidak ada kondisi `userRole === 'alumni-guest'`

**Artinya:** Role `alumni-guest` saat ini adalah role "zombie" — didefinisikan tapi tidak pernah digunakan dalam flow manapun.

**Kemungkinan intent asli:**
Alumni-guest mungkin dimaksudkan sebagai alumni yang belum terverifikasi — sudah daftar tapi belum divalidasi Moderator. Jika ini benar, maka flow yang dibutuhkan adalah:

```
[Daftar sebagai Alumni-Guest]
     ↓
[Moderator verifikasi data alumni]
     ↓
[Di-upgrade ke role Alumni penuh]
```

Flow ini belum diimplementasikan.

---

## 3️⃣ FLOW PER FITUR (LINTAS ROLE)

---

### 📋 REGISTRASI

**Kondisi saat ini:** Tersedia di `Login.tsx` dengan toggle `mode: 'login' | 'register'`

```
User klik "Daftar" di Login Page
     ↓
Form registrasi tampil:
- Email
- Password
- Konfirmasi Password
     ↓
Submit → validasi → [KONDISI SAAT INI] Langsung login
     ↓
Tidak ada verifikasi email
Tidak ada perbedaan flow registrasi untuk Donatur vs Alumni
Tidak ada form data alumni tambahan saat daftar
```

**Gap:** Setelah registrasi, user langsung masuk sebagai role yang dipilih di toggle (Donatur/Alumni). Tidak ada proses verifikasi bahwa user tersebut benar-benar alumni.

---

### 🔑 LOGIN

```
User buka Login Page
     ↓
Toggle role: Donatur | Alumni
     ↓
Isi email + password
     ↓
Klik "Masuk"
     ↓
Validasi: email format + password tidak kosong
     ↓
[Jika error] → toast error + inline error message di field
     ↓
[Jika berhasil] → loading 800ms → toast success → redirect Home
     ↓
userRole disimpan di localStorage
```

---

### 🔍 LIHAT PROJECT

**Jalur 1: dari Home**
```
Home → Klik project card → currentView = 'project-detail'
     ↓
[Jika userRole = 'alumni'] → ProjectDetailAlumni (5 tab + join flow)
[Jika userRole = lainnya] → ProjectDetail (tampilan publik)
```

**Jalur 2: dari Explore**
```
Explore → Tab "Open Volunteer" → Klik "Lihat Project" → ProjectDetailAlumni/ProjectDetail
Explore → Tab "Galeri Project" → Klik card → ProjectDetailAlumni/ProjectDetail
```

**Di dalam Project Detail (versi Alumni):**
```
Tab Overview:
  - Hero image project
  - Deskripsi project
  - Progress bar dana
  - Tombol "Donasi Sekarang"
  - Tombol "Bergabung" (jika belum member) / Status join (jika sudah apply)
  - Info anggota project

Tab Progress:
  - List update/milestone yang dipublish PIC
  - Tiap item: tipe (progress/milestone/pengumuman), judul, konten, tanggal

Tab Members:
  - List member aktif project dengan foto dan nama

Tab Discussion (MEMBER ONLY):
  - Thread diskusi grup project
  - Input pesan
  - [Jika bukan member] → Pesan "Bergabung dulu untuk akses diskusi"

Tab Wallet (MEMBER ONLY):
  - Ringkasan keuangan project
  - Histori transaksi
  - [Jika bukan member] → Pesan "Bergabung dulu untuk lihat wallet"
```

---

### 💳 DONASI

*(Flow detail sudah dijabarkan di bagian Donatur — berlaku juga untuk Alumni)*

**Perbedaan Donasi Alumni vs Donatur:**
- Tampilan DonationPage identik untuk keduanya
- Tidak ada perbedaan privilege (alumni tidak mendapat prioritas atau fitur ekstra dalam donasi)
- Kedua tipe user mengakses `DonationPage` yang sama

---

### 📤 UPLOAD BUKTI

```
[Di DonationPage, setelah konfirmasi nominal]
     ↓
User klik area upload / drag-drop
     ↓
Browser membuka file picker
     ↓
User pilih file (gambar JPG/PNG/PDF, max 5MB)
     ↓
[Validasi] → cek format dan ukuran → jika gagal: toast error
     ↓
[Jika berhasil] → preview file tampil di UI
     ↓
User bisa klik "Hapus" untuk ganti file
     ↓
User klik "Kirim Bukti Transfer"
     ↓
[Validasi] → file wajib ada → jika tidak ada: toast error
     ↓
Loading indicator muncul (1.5 detik simulasi)
     ↓
Toast "Donasi berhasil!" muncul
     ↓
Tampil Thank You Page
```

**Yang tidak terjadi:** File tidak benar-benar dikirim ke manapun. Tidak ada entry baru di admin panel.

---

### ✅ APPROVAL DONASI

*(Flow dari sisi Superadmin)*

```
Superadmin buka Verifikasi Donasi
     ↓
Tab "Pending Payment" → list semua donasi pending
     ↓
Superadmin baca info: nama, nominal, project tujuan, metode bayar
     ↓
[Opsional] Klik "Lihat Bukti Transfer" → preview gambar muncul di modal
     ↓
Superadmin klik "Approve":
  → Modal approve muncul
  → Isi catatan verifikasi (WAJIB)
  → Klik "Approve Donasi"
  → Toast success
  → [GAP] Status donasi tidak diupdate di list

ATAU Superadmin klik "Reject":
  → Modal reject muncul
  → Isi alasan penolakan (WAJIB)
  → Klik "Tolak Donasi"
  → Toast error (warna merah, tapi ini bukan error — ini berhasil ditolak)
  → [GAP] Status donasi tidak diupdate di list
     ↓
[Yang seharusnya terjadi tapi belum:]
  → Donasi bergerak dari tab "Pending" ke tab "Riwayat"
  → Wallet project bertambah (jika approve)
  → Donatur mendapat notifikasi
```

---

### 📊 UPDATE STATUS PROJECT

```
[Dari sisi PIC]
PIC buka "Konten Project" di Admin Panel
     ↓
Klik "Buat Update Baru"
     ↓
Modal form: pilih tipe, isi judul dan konten, toggle notifikasi
     ↓
Klik "Publish"
     ↓
Update masuk ke list konten
     ↓
[GAP] Alumni tidak otomatis melihat update ini di tab Progress
     ↓
[Yang seharusnya terjadi:]
  Alumni yang join project → mendapat notifikasi
  Tab Progress di ProjectDetailAlumni → menampilkan update terbaru
```

---

### 🔒 TUTUP PROJECT

**Kondisi saat ini:** Tidak ada flow "tutup project" yang terimplementasi.

```
[Yang seharusnya ada:]
PIC mengajukan permintaan tutup project ke Superadmin
     ↓
Superadmin review: apakah semua donasi sudah terverifikasi?
     ↓
Apakah masih ada dana tersisa di wallet?
     ↓
Jika ya: minta PIC buat laporan penggunaan dana
     ↓
Superadmin approve penutupan
     ↓
Status project berubah jadi "Selesai" / "Closed"
     ↓
Donasi baru diblokir
     ↓
Member yang masih aktif mendapat notifikasi
     ↓
Project masuk ke Galeri sebagai project selesai
```

---

### 👛 LIHAT WALLET

**Dari sisi Alumni (member project):**
```
Alumni buka ProjectDetailAlumni → Tab "Wallet"
     ↓
Lihat ringkasan: dana masuk, dana keluar, saldo
     ↓
Filter transaksi: Semua, Internal, Donasi, Pengeluaran
     ↓
Tiap transaksi tampil: ikon, judul, tanggal, nominal
     ↓
[GAP] Data ini hardcoded, bukan data real project yang diikuti
```

**Dari sisi PIC:**
```
PIC buka "Keuangan Project" di Admin Panel
     ↓
Lihat: Dana Umum, Dana Internal, Total Dana, Total Pengeluaran, Saldo
     ↓
Lihat breakdown kategori pengeluaran
     ↓
Lihat histori semua transaksi
     ↓
Klik "Tambah Transaksi" → isi form → submit
```

**Dari sisi Superadmin:**
```
Superadmin buka "Manajemen Dompet"
     ↓
Lihat semua wallet project dalam satu halaman
     ↓
Klik "Detail" pada wallet tertentu → modal histori transaksi per project
     ↓
Lihat dan proses "Withdrawal Requests" dari PIC
```

---

## 4️⃣ IDENTIFIKASI FLOW YANG TERPUTUS

### ⛓️ Kumpulan Flow yang Belum Sinkron Antar Role

---

#### PUTUS #1: Donatur upload bukti → Siapa yang menerima?

```
Donatur upload bukti → Toast "Berhasil" → Thank You Page
    ↗ Tidak ada data yang terkirim ke Admin Panel
    ↗ List "Pending Payment" di Superadmin tidak bertambah
    ✗ LOOP TIDAK TERHUBUNG
```

**Dampak:** Superadmin tidak pernah tahu ada donasi baru masuk. Data donasi di admin panel adalah hardcoded mock data yang tidak berkaitan dengan aksi donatur di frontend.

---

#### PUTUS #2: Superadmin approve → Donatur dapat notifikasi?

```
Superadmin klik "Approve" → Toast success di layar Superadmin
    ✗ Donatur tidak mendapat email
    ✗ Donatur tidak mendapat notifikasi in-app
    ✗ Status donasi di sisi donatur tidak berubah
    ✗ Donatur tidak tahu donasinya diterima
```

---

#### PUTUS #3: Superadmin approve → Wallet project bertambah?

```
Superadmin approve donasi → Toast success
    ✗ mockDonations tidak diupdate (status tetap 'pending')
    ✗ Wallet project tidak bertambah nominalnya
    ✗ PIC tidak mendapat notifikasi ada dana masuk
    ✗ DOUBLE COUNTING BISA TERJADI karena donasi masih di list pending
```

---

#### PUTUS #4: PIC publish konten → Alumni tahu?

```
PIC buat progress update → Klik Publish → Konten masuk list di Admin Panel
    ✗ Tab "Progress" di ProjectDetailAlumni menggunakan data hardcoded
    ✗ Alumni tidak melihat update terbaru
    ✗ Toggle "Notifikasi ke Member" ada tapi tidak melakukan apapun
```

---

#### PUTUS #5: PIC buat polling → Alumni bisa vote?

```
PIC buat polling di Admin Panel → Polling aktif
    ✗ Tab "Voting" di MessagesAlumni menggunakan data hardcoded berbeda
    ✗ Alumni bisa vote tapi hasil vote tidak masuk ke data polling PIC
    ✗ PIC tidak bisa lihat hasil vote real-time dari alumni
```

---

#### PUTUS #6: PIC assign task → Alumni tahu?

```
PIC buat task dan assign ke member tertentu
    ✗ Tab "Tasks" di MessagesAlumni menggunakan data hardcoded
    ✗ Alumni tidak mendapat notifikasi task baru
    ✗ Update status task dari alumni tidak masuk ke PICDelegation
```

---

#### PUTUS #7: PIC approve join → Alumni akses berubah?

```
PIC approve alumni → Request hilang dari PIC pending list
    ✗ Alumni tidak mendapat notifikasi bahwa sudah diterima
    ✗ Alumni harus reload halaman atau buka ulang ProjectDetailAlumni
    ✗ isProjectMember di frontend tidak berubah secara real-time
    ✓ Dalam satu sesi: confirmApprove() menghapus dari list PIC
    ✗ Tapi perubahan ini tidak berdampak ke sesi alumni di tab lain
```

---

#### PUTUS #8: Alumni reject join → Alumni bisa apply ulang?

```
PIC reject join request alumni (dengan toggle "Izinkan Resubmit")
    ✗ Alumni tidak mendapat notifikasi
    ✗ Di sisi alumni, tombol "Bergabung" tetap menampilkan status "Pending"
    ✗ Tidak ada UI untuk "apply ulang" setelah ditolak
    ✗ Toggle "Izinkan Resubmit" di PIC tidak berdampak ke UI alumni
```

---

#### PUTUS #9: Donatur reject → Donatur bisa upload ulang?

```
Superadmin reject donasi (dengan alasan)
    ✗ Donatur tidak mendapat notifikasi
    ✗ Tidak ada halaman di sisi donatur untuk melihat donasi ditolak
    ✗ Tidak ada cara donatur upload ulang bukti yang benar
    ✗ Donatur tidak tahu bahwa donasinya bermasalah
```

---

#### PUTUS #10: Moderator hapus konten → PIC tahu?

```
Moderator hapus konten dari project tertentu
    ✗ PIC tidak mendapat notifikasi kontennya dihapus
    ✗ Tidak ada catatan "dihapus oleh Moderator" di Activity Log PIC
    ✗ PIC bisa bingung kenapa kontennya hilang
```

---

#### PUTUS #11: Alumni-Guest → Flow upgrade ke Alumni?

```
User daftar sebagai Alumni
    → Jika ada verifikasi, seharusnya masuk sebagai Alumni-Guest
    → Moderator verifikasi data
    → Upgrade ke Alumni penuh
    ✗ Seluruh flow ini tidak ada di implementasi saat ini
    ✗ role 'alumni-guest' tidak digunakan di komponen manapun
```

---

## 5️⃣ RINGKASAN VISUAL: STATUS SETIAP LOOP

```
LOOP                                   STATUS
────────────────────────────────────────────────────────
Donatur → Donasi → Upload → Thank You  ✅ Loop frontend selesai
Thank You → Superadmin Notifikasi      ✗  PUTUS
Superadmin Approve → Wallet Update     ✗  PUTUS
Superadmin Approve → Donatur Notif     ✗  PUTUS
Superadmin Reject → Donatur Notif      ✗  PUTUS
Alumni → Join → Form → Pending         ✅ Loop frontend selesai
PIC Approve → Alumni Notifikasi        ✗  PUTUS
PIC Approve → Alumni Akses Berubah     ⚠️ Parsial (satu sesi)
PIC Reject → Alumni Notifikasi         ✗  PUTUS
PIC Reject → Alumni Bisa Apply Ulang   ✗  PUTUS
PIC Publish Konten → Alumni Lihat      ✗  PUTUS (data berbeda)
PIC Buat Polling → Alumni Vote         ✗  PUTUS (data berbeda)
PIC Assign Task → Alumni Lihat Task    ✗  PUTUS (data berbeda)
Alumni Vote → PIC Lihat Hasil          ✗  PUTUS
Alumni Update Task → PIC Tahu          ✗  PUTUS
Moderator Hapus Konten → PIC Notif     ✗  PUTUS
────────────────────────────────────────────────────────
TOTAL LOOP SELESAI   : 3 dari 17
TOTAL LOOP PUTUS     : 13 dari 17
TOTAL LOOP PARSIAL   : 1 dari 17
```

---

## 6️⃣ FLOW YANG PERLU DIBUAT (BELUM ADA SAMA SEKALI)

Berikut flow yang tidak ada di implementasi manapun dan harus dibangun dari nol:

| # | Flow | Role Terlibat | Prioritas |
|---|------|---------------|-----------|
| 1 | Riwayat Donasi (donatur/alumni bisa lihat status) | Donatur, Alumni, Superadmin | 🔴 Critical |
| 2 | Notifikasi in-app (approve, reject, update) | Semua role | 🔴 Critical |
| 3 | Status tracker donasi (submitted → verified → approved) | Donatur, Alumni | 🔴 Critical |
| 4 | Resubmit bukti setelah rejected | Donatur, Superadmin | 🟠 High |
| 5 | Keluar dari project (member resign) | Alumni, PIC | 🟠 High |
| 6 | Tutup project secara resmi | PIC, Superadmin | 🟠 High |
| 7 | Request withdrawal dana (PIC ke Superadmin) | PIC, Superadmin | 🟠 High |
| 8 | Laporan penggunaan dana project | PIC, Superadmin, Alumni | 🟠 High |
| 9 | Verifikasi alumni baru (Alumni-Guest flow) | Moderator, Alumni-Guest | 🟡 Medium |
| 10 | Komunikasi PIC ↔ Superadmin dari Admin Panel | PIC, Superadmin | 🟡 Medium |
| 11 | Donasi untuk project yang sudah ditutup (block) | Donatur, Alumni | 🟡 Medium |
| 12 | Export laporan keuangan | Superadmin, PIC | 🟡 Medium |

---

> **Kesimpulan Peta Flow:** Dari 17 loop interaksi utama yang diidentifikasi, hanya 3 yang lengkap dari sisi frontend saja. Semua loop yang melibatkan lintas role (frontend ↔ admin panel) saat ini masih terputus karena tidak ada shared state atau backend yang menghubungkan keduanya. Seluruh koneksi ini bergantung pada implementasi Supabase atau sistem persistensi serupa.
