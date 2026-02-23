# 🗺️ PRODUCT FLOW ARCHITECTURE — ALMAQDISI PROJECT

**Versi:** 2.0 | **Tanggal:** 19 Feb 2026  
**Role:** Product Flow Architect  
**Fokus:** Role Interaction Mapping, Flow Closure Analysis, Loop Completion

---

## 📌 PEMBACAAN DOKUMEN INI

Dokumen ini adalah hasil analisis mendalam terhadap **seluruh flow interaksi antar role** di sistem Almaqdisi Project. Setiap bagian ditulis berdasarkan kondisi kode aktual, bukan asumsi atau teori.

**Yang TIDAK dibahas:**
- ❌ Keamanan & autentikasi teknis
- ❌ Struktur database
- ❌ Server-side logic
- ❌ State machine
- ❌ JWT atau token management

**Yang DIBAHAS:**
- ✅ Apa yang bisa dilakukan setiap role
- ✅ Urutan langkah (step-by-step)
- ✅ Hubungan antar role
- ✅ Titik temu antar flow
- ✅ Flow yang belum tertutup
- ✅ Loop yang belum lengkap

---

## 1️⃣ GLOBAL SYSTEM MAP

### 🔷 PETA HUBUNGAN ANTAR ROLE

```
                      ╔══════════════════════════════════════╗
                      ║   PLATFORM ALMAQDISI PROJECT         ║
                      ╚══════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│                       JALUR PUBLIK (FRONTEND)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────┐     ┌─────────────┐     ┌──────────────────────┐       │
│  │   GUEST    │────▶│  DONATUR    │     │      ALUMNI          │       │
│  │ (no login) │     │ (non-alumni)│     │   (sudah login)      │       │
│  └────────────┘     └──────┬──────┘     └──────────┬───────────┘       │
│       │                    │                        │                    │
│       │ ① Lihat project    │ ② Donasi              │ ③ Donasi +         │
│       │    publik          │    saja               │    Join project    │
│       │                    │                        │                    │
│       └────────────────────┴────────────────────────┴───────────┐       │
│                                                                  │       │
│                          ④ SUBMIT DONASI                        │       │
│                       (Upload bukti transfer)                   │       │
│                                                                  ▼       │
└──────────────────────────────────────────────────┬──────────────────────┘
                                                   │
                                                   │ Flow Donasi
                                                   │ masuk ke
                                                   │ Admin Panel
                                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      JALUR INTERNAL (ADMIN PANEL)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │                    SUPERADMIN                                 │       │
│  │  • ⑤ Approve/Reject donasi                                   │       │
│  │  • ⑥ Kelola semua wallet project                             │       │
│  │  • ⑦ Lihat & kelola data semua alumni                        │       │
│  │  • ⑧ Monitor aktivitas seluruh platform                      │       │
│  │  • ⑨ Approve withdrawal request dari PIC                     │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                         │              │                                 │
│                         │ supervisi    │ supervisi                       │
│                         ▼              ▼                                 │
│  ┌──────────────────────────┐   ┌─────────────────────────┐            │
│  │      MODERATOR           │   │      PIC PROJECT        │            │
│  │  • ⑩ Lihat semua project │   │  • ⑬ Kelola 1 project   │            │
│  │  • ⑪ Kelola data alumni  │   │  • ⑭ Approve join req   │            │
│  │  • ⑫ Moderasi konten     │   │  • ⑮ Update progress    │            │
│  │    (view-only finance)   │   │  • ⑯ Kelola member      │            │
│  │                          │   │  • ⑰ Kelola finance     │            │
│  └──────────────────────────┘   └─────────────────────────┘            │
│                                               ▲                          │
│                                               │                          │
│                                               │ ⑱ Alumni submit          │
│                                               │    join request          │
└───────────────────────────────────────────────┼──────────────────────────┘
                                                │
                                      (kembali ke jalur publik)
```

---

### 🔹 SIAPA MEMULAI, SIAPA MENUTUP

| Flow | Dimulai Oleh | Diproses Oleh | Ditutup Oleh | Status Saat Ini |
|------|-------------|---------------|--------------|-----------------|
| **Donasi** | Donatur/Alumni | Superadmin | Superadmin (approve/reject) | ⚠️ Loop belum tertutup ke donatur |
| **Join Project** | Alumni | PIC | PIC (approve/reject) | ⚠️ Alumni tidak dapat notif |
| **Progress Update** | PIC | — | PIC (publish) | ⚠️ Alumni tidak dapat notif |
| **Polling** | PIC | Alumni (vote) | PIC (tutup) | ✅ Loop lengkap |
| **Task Delegasi** | PIC | Alumni (execute) | Alumni (update status) | ⚠️ PIC tidak dapat notif saat selesai |
| **Withdrawal Dana** | PIC (request) | Superadmin | Superadmin (approve) | ⚠️ PIC tidak tahu hasilnya |
| **Tutup Project** | PIC/Superadmin | — | Superadmin | ❌ Fitur belum ada |
| **Verifikasi Alumni** | Alumni (daftar) | Moderator | Moderator (approve) | ❌ Flow belum ada |
| **Hapus Konten** | Moderator | — | Moderator | ⚠️ PIC tidak dapat notif |

---

### 🔸 KETERGANTUNGAN ANTAR ROLE (Who Needs Who)

```
┌─────────────────────────────────────────────────────────────┐
│  Alumni                                                      │
│   ├──➤ Butuh PERSETUJUAN dari PIC untuk join project        │
│   └──➤ Butuh APPROVAL dari Superadmin untuk donasi valid    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Donatur (Non-Alumni)                                        │
│   └──➤ Butuh APPROVAL dari Superadmin untuk donasi valid    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PIC Project                                                 │
│   ├──➤ Butuh APPROVAL dari Superadmin untuk withdrawal      │
│   ├──➤ Bergantung pada Moderator untuk verifikasi alumni    │
│   └──➤ Bergantung pada Superadmin untuk dana masuk project  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Moderator                                                   │
│   ├──➤ TIDAK bergantung pada role lain untuk eksekusi       │
│   └──➤ Hanya MONITOR tanpa approval power                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Superadmin                                                  │
│   └──➤ Tidak bergantung pada siapapun (top hierarchy)       │
└─────────────────────────────────────────────────────────────┘
```

**❗ ANALISIS KETERGANTUNGAN:**

- **Alumni** sangat bergantung pada **2 role lain** → bisa terjebak dalam limbo jika PIC/Superadmin tidak aktif
- **Donatur** hanya bergantung pada **1 role** → lebih sederhana tapi tetap tidak punya kontrol setelah submit
- **PIC** bergantung pada **Superadmin** untuk finansial → tidak bisa withdraw tanpa approval
- **Moderator** tidak punya power eksekusi → hanya observer dengan privilese data tinggi
- **Superadmin** adalah single point of decision → bottleneck di approval donasi dan withdrawal

---

### 🔶 PINTU KELUAR FLOW (Exit Points)

| Role | Entry Point | Happy Exit | Unhappy Exit | Abandoned Exit |
|------|------------|------------|--------------|----------------|
| **Donatur** | Buka project detail → Klik Donasi | Upload bukti → Lihat "Terima Kasih" | — | Tutup halaman sebelum upload |
| **Alumni** | Login → Home | Join project disetujui PIC | Join ditolak PIC | Tutup app setelah submit |
| **PIC** | Login admin panel | Publish update/approve member | — | Logout tanpa simpan |
| **Moderator** | Login admin panel | Selesai moderasi konten | — | Logout |
| **Superadmin** | Login admin panel | Approve donasi/withdrawal | Reject donasi | Logout |

**🚨 IDENTIFIKASI MASALAH:**

1. **Donatur** tidak punya "Happy Exit" yang jelas — "Terima kasih" muncul tapi **status donasi masih pending**
2. **Alumni** tidak tahu apakah join request diterima/ditolak — tidak ada notifikasi
3. **PIC** tidak mendapat konfirmasi bahwa withdrawal diapprove — harus cek manual
4. **Moderator** bisa hapus konten tapi **PIC tidak tahu kontennya dihapus**

---

## 2️⃣ FLOW DETAIL PER ROLE

---

## 🔵 SUPERADMIN

### A. Tujuan Utama Role

Superadmin adalah **gatekeeper finansial** dan **decision maker tertinggi**. Dia memastikan setiap rupiah yang masuk valid, setiap penarikan dana legitimate, dan platform berjalan sesuai aturan.

### B. Entry Point

```
Landing Page
    ↓ Klik link "Admin Panel" di footer atau header
Login Admin Panel (AdminLoginRevised.tsx)
    ↓ Isi email & password
    ↓ Klik "Masuk"
Validasi role = 'superadmin' (dari localStorage)
    ↓ Jika valid
AdminPanelRevised.tsx
    ↓ Default: Tab "Dashboard"
```

**❗ Catatan:** Jika di localStorage tidak ada `adminUser` atau role bukan `superadmin`, redirect ke halaman login.

---

### C. Aksi yang Bisa Dilakukan (Full List)

| Menu | Sub-Aksi | Keterangan |
|------|---------|-----------|
| **Dashboard** | • Lihat stats global<br>• Lihat grafik tren<br>• Lihat recent activity | Read-only, tidak ada aksi write |
| **Financial Dashboard** | • Lihat donasi all time<br>• Lihat top projects<br>• Filter berdasarkan waktu | Read-only, agregasi dari semua project |
| **Verifikasi Donasi** | • Lihat pending donations<br>• **Lihat Bukti Transfer**<br>• **Approve** donasi<br>• **Reject** donasi<br>• Isi catatan verifikasi<br>• Lihat riwayat verifikasi | **Action utama:** Approve/Reject |
| **Manajemen Dompet** | • Lihat semua wallet project<br>• Lihat detail histori transaksi<br>• **Approve** withdrawal request<br>• **Reject** withdrawal request | **Action utama:** Approve/Reject withdrawal |
| **Data Alumni** | • Lihat semua data alumni<br>• Edit data alumni<br>• Hapus alumni<br>• Filter angkatan/status | CRUD lengkap |
| **Keuangan Project** | • Lihat transaksi semua project<br>• Filter per project<br>• Export data (jika ada) | Read-only |
| **Konten Project** | • Lihat konten semua project<br>• Hapus konten jika melanggar | Moderasi tingkat tinggi |
| **Delegasi PIC** | • Lihat task yang di-assign PIC<br>• Monitoring progress task | Read-only |
| **Activity Log** | • Lihat semua log lintas project<br>• Filter by user/action/date | Read-only, audit trail |

---

### D. Flow Step-by-Step untuk Setiap Aksi

#### ▶ FLOW 1: Verifikasi Donasi (CRITICAL PATH)

```
1. Superadmin login → buka menu "Verifikasi Donasi"
    ↓
2. Halaman menampilkan 2 tab:
   - Tab "Pending Payment" (default)
   - Tab "Riwayat Verifikasi"
    ↓
3. Tab Pending menampilkan LIST donasi dengan status PENDING
   Setiap card donasi menampilkan:
   - Nama donatur
   - Nominal donasi (formatted Rupiah)
   - Tanggal submit
   - Project tujuan
   - Tombol "Lihat Bukti Transfer"
   - Tombol "Approve" (hijau)
   - Tombol "Reject" (merah)
    ↓
4. Superadmin bisa filter list:
   - Berdasarkan nama donatur (search)
   - Berdasarkan nama project (dropdown)
    ↓
5. Superadmin klik "Lihat Bukti Transfer"
    ↓ Modal preview gambar muncul
    ↓ Superadmin bisa zoom/download
    ↓ Tutup modal
    ↓
6A. Path APPROVE:
    Superadmin klik "Approve"
        ↓ Modal konfirmasi muncul
        ↓ Judul: "Setujui Donasi?"
        ↓ Tampil detail donasi + preview kecil bukti
        ↓ Field "Catatan Verifikasi" (WAJIB)
        ↓ Superadmin ketik: "Bukti valid, nominal sesuai"
        ↓ Klik "Approve Donasi"
        ↓ Modal tertutup
        ↓ Toast success: "Donasi berhasil disetujui!"
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Donasi TIDAK KELUAR dari list pending
        ❌ Status donasi TIDAK BERUBAH
        ❌ Wallet project TIDAK BERTAMBAH
        ❌ Donatur TIDAK MENDAPAT NOTIFIKASI
        ↓
    END (flow terputus)

6B. Path REJECT:
    Superadmin klik "Reject"
        ↓ Modal konfirmasi muncul
        ↓ Judul: "Tolak Donasi?"
        ↓ Field "Alasan Penolakan" (WAJIB)
        ↓ Catatan: "Alasan akan dikirim ke donatur via email"
        ↓ Superadmin ketik alasan: "Bukti tidak jelas/nominal tidak sesuai"
        ↓ Klik "Tolak Donasi"
        ↓ Modal tertutup
        ↓ Toast warning: "Donasi ditolak"
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Donasi tetap di list pending
        ❌ Donatur TIDAK MENDAPAT EMAIL
        ❌ Tidak ada log di activity log
        ↓
    END (flow terputus)
    ↓
7. Superadmin pindah ke Tab "Riwayat Verifikasi"
    ↓ Tampil semua donasi yang pernah diproses (approved/rejected)
    ↓ Setiap row menampilkan:
       - Nama donatur
       - Nominal
       - Status (badge hijau/merah)
       - Tanggal verifikasi
       - Nama verifikator (Superadmin yang approve)
       - Catatan verifikasi
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Data riwayat hardcoded
    ❌ Tidak sinkron dengan data di tab Pending
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Setelah approve/reject → tidak ada update ke donatur
2. Setelah approve → tidak ada update ke PIC project
3. Setelah approve → tidak ada update ke wallet
4. Setelah reject → donatur tidak tahu harus apa (upload ulang? batalkan?)

---

#### ▶ FLOW 2: Manajemen Dompet

```
1. Superadmin buka menu "Manajemen Dompet"
    ↓
2. Halaman menampilkan RINGKASAN GLOBAL:
   - Card 1: Total Saldo Semua Project
   - Card 2: Total Pemasukan
   - Card 3: Total Pengeluaran
   - Card 4: Dana Pending (dari donasi belum diapprove)
    ↓
3. Grafik bar menampilkan saldo per project
    ↓
4. List card wallet per project:
   Setiap card menampilkan:
   - Nama project
   - Saldo saat ini
   - Total pemasukan
   - Total pengeluaran
   - Status: Aktif / Ditutup
   - Tombol "Detail"
    ↓
5. Superadmin klik "Detail" pada salah satu wallet
    ↓ Modal detail wallet project muncul
    ↓ Tampil:
      - Histori transaksi project tersebut
      - Pemasukan (donasi approved)
      - Pengeluaran (yang di-input PIC)
      - Dana internal (jika ada)
    ↓ Tutup modal
    ↓
6. Halaman menampilkan section "WITHDRAWAL REQUESTS"
   (list permintaan penarikan dana dari PIC)
    ↓
7. Setiap withdrawal request menampilkan:
   - Nama PIC
   - Nama project
   - Nominal yang diminta
   - Alasan penarikan
   - Tanggal request
   - Tombol "Proses"
    ↓
8A. Path APPROVE WITHDRAWAL:
    Superadmin klik "Proses" → pilih "Approve"
        ↓ Modal muncul
        ↓ Field "Catatan Approval" (opsional)
        ↓ Klik "Approve"
        ↓ Toast success
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Withdrawal request TIDAK KELUAR dari list
        ❌ Saldo wallet TIDAK BERKURANG
        ❌ PIC TIDAK MENDAPAT NOTIFIKASI
        ↓
    END (flow terputus)

8B. Path REJECT WITHDRAWAL:
    Superadmin klik "Proses" → pilih "Reject"
        ↓ Modal muncul
        ↓ Field "Alasan Penolakan" (WAJIB)
        ↓ Klik "Reject"
        ↓ Toast warning
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ PIC tidak tahu withdrawalnya ditolak
        ❌ Tidak ada cara PIC untuk revisi request
        ↓
    END (flow terputus)
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Approval withdrawal tidak update saldo real
2. PIC tidak mendapat notifikasi hasil approval
3. Tidak ada audit trail untuk withdrawal

---

#### ▶ FLOW 3: Financial Dashboard (READ-ONLY)

```
1. Superadmin buka menu "Financial Dashboard"
    ↓
2. Tampil 4 STATS CARD:
   - Total Donasi All Time
   - Donasi Bulan Ini
   - Project Aktif
   - Total Donatur
    ↓
3. Grafik LINE: Tren Donasi Bulanan (6 bulan terakhir)
    ↓
4. Grafik BAR: Perbandingan Pemasukan vs Pengeluaran per Project
    ↓
5. Tabel "Top Projects by Donation" (ranking 5 project teratas)
    ↓
6. Tabel "Donasi Terbaru" (5 donasi terakhir)
    ↓
7. Tabel "Transaksi Wallet Terbaru"
    ↓
8. Superadmin bisa filter rentang waktu:
   - 6 Bulan (default)
   - 1 Tahun
   - Semua
    ↓
9. Klik filter → grafik dan tabel update
    ↓
END (pure read-only, tidak ada action)
```

**✅ Flow lengkap, tidak ada yang terputus**

---

#### ▶ FLOW 4: Kelola Data Alumni

```
1. Superadmin buka menu "Data Alumni"
    ↓
2. Tampil tabel SEMUA data alumni:
   Kolom: Nama | Email | Angkatan | Jurusan | Kota | Status | Projects Joined | Total Donasi
    ↓
3. Superadmin bisa:
   - Search berdasarkan nama/email
   - Filter berdasarkan angkatan (dropdown)
   - Filter berdasarkan status: Aktif / Tidak Aktif
    ↓
4A. Path TAMBAH ALUMNI:
    Klik "Tambah Alumni"
        ↓ Modal form muncul
        ↓ Field:
          - Nama (wajib)
          - Email (wajib)
          - Telepon
          - Angkatan (wajib)
          - Jurusan
          - Tahun Lulus
          - Kota Domisili
          - Riwayat Saladin Camp (pilihan: Ya/Tidak)
        ↓ Submit
        ↓ Alumni baru muncul di list
        ↓ Toast success
        ↓
    END (loop tertutup)

4B. Path EDIT ALUMNI:
    Klik ikon edit di baris alumni tertentu
        ↓ Modal edit terbuka (prefilled dengan data lama)
        ↓ Superadmin ubah data
        ↓ Submit
        ↓ Data terupdate di list
        ↓ Toast success
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Jika alumni sedang login, data mereka tidak auto-refresh
        ↓
    END (loop tertutup)

4C. Path HAPUS ALUMNI:
    Klik ikon hapus
        ↓ Konfirmasi muncul: "Yakin hapus alumni ini?"
        ↓ Klik "Ya"
        ↓ Alumni hilang dari list
        ↓ Toast success
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Alumni yang dihapus bisa tetap login (karena data di localStorage)
        ❌ Tidak ada soft-delete → data hilang permanen
        ↓
    END (loop tertutup)
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Edit alumni tidak sinkron dengan session user yang sedang login
2. Hapus alumni tidak invalidate session mereka

---

### E. Dampak ke Role Lain

| Aksi Superadmin | Dampak ke Role Lain | Status Saat Ini |
|-----------------|---------------------|-----------------|
| **Approve donasi** | • Donatur: Seharusnya dapat notifikasi "Donasi disetujui"<br>• PIC: Seharusnya melihat saldo project bertambah<br>• Wallet: Balance project bertambah | ❌ Tidak ada dampak (terputus) |
| **Reject donasi** | • Donatur: Seharusnya dapat notifikasi + alasan penolakan<br>• PIC: Tidak ada dampak | ❌ Donatur tidak tahu ditolak |
| **Approve withdrawal** | • PIC: Seharusnya dapat notifikasi + dana cair<br>• Wallet: Balance project berkurang | ❌ PIC tidak tahu hasilnya |
| **Reject withdrawal** | • PIC: Seharusnya dapat notifikasi + bisa revisi request | ❌ PIC tidak tahu ditolak |
| **Edit/Hapus alumni** | • Alumni: Data profil berubah<br>• Moderator: Lihat data terupdate | ⚠️ Tidak realtime |
| **Hapus konten** | • PIC: Konten hilang dari project | ❌ PIC tidak dapat notifikasi |

---

### F. Flow yang Belum Ditutup

1. **Approve donasi → Tidak ada update balik ke donatur**
   - Donatur tidak tahu kapan donasi disetujui
   - Tidak ada email konfirmasi
   - Tidak ada notifikasi di dashboard donatur (karena dashboard donatur belum ada)

2. **Reject donasi → Tidak ada komunikasi ke donatur**
   - Donatur tidak tahu alasan penolakan
   - Tidak ada cara untuk upload ulang bukti
   - Donasi stuck di pending selamanya dari sudut pandang donatur

3. **Approve withdrawal → PIC tidak tahu hasilnya**
   - PIC harus cek manual ke menu Wallet
   - Tidak ada notifikasi real-time
   - Tidak ada timeline kapan dana cair

4. **Tidak ada mekanisme intervensi jika ada konflik**
   - Superadmin tidak bisa menghubungi PIC langsung dari admin panel
   - Tidak ada fitur "Suspend Project" jika ada masalah
   - Tidak ada fitur "Freeze Wallet" untuk investigasi

5. **Tidak ada dashboard untuk project yang sudah ditutup**
   - Project aktif dan closed tercampur
   - Tidak ada cara sistematis untuk close project + redistribute sisa dana

---

### G. Potensi Kebingungan dari Sisi UX

1. **Tombol Approve dan Reject bersebelahan tanpa warning**
   - Risiko salah klik sangat tinggi
   - Tidak ada konfirmasi kedua jika Superadmin salah pilih

2. **Tidak ada perbedaan visual antara donasi baru vs donasi pending 7 hari**
   - Semua donasi pending tampil dengan style yang sama
   - Tidak ada badge "Urgent" atau "Sudah lama pending"

3. **Riwayat verifikasi tidak real-time**
   - Tab "Riwayat Verifikasi" menampilkan data hardcoded
   - Setelah approve di tab Pending, tidak langsung muncul di riwayat

4. **Kolom "Verifikator" di riwayat selalu menampilkan nama Superadmin yang sedang login**
   - Harusnya menampilkan nama Superadmin yang benar-benar approve donasi tersebut
   - Ini akan menyesatkan jika ada multiple Superadmin

5. **Stats di Dashboard tidak mencerminkan data pending**
   - "Total Donasi" termasuk atau tidak termasuk pending?
   - Tidak ada label yang jelas

---

## 🟢 ADMIN (ROLE INI TIDAK ADA DI SISTEM)

Setelah audit menyeluruh terhadap:
- `/src/data/mockAdminDataRevised.ts`
- `/src/utils/adminAuthRevised.ts`
- `/src/types/admin-revised.ts`
- `/src/app/components/admin-revised/AdminSidebarRevised.tsx`

**KESIMPULAN:** Role "Admin" **tidak ditemukan** di sistem.

Role yang ada hanya:
- `superadmin`
- `moderator`
- `pic`

Jika ke depan dibutuhkan role "Admin" sebagai pembeda, maka perlu didefinisikan:
- Apa bedanya Admin dengan Superadmin?
- Apakah Admin = Superadmin dengan permissions terbatas?
- Atau Admin = role operasional yang bisa approve donasi tapi tidak bisa edit user?

**Untuk saat ini: Superadmin = Admin tertinggi.**

---

## 🟣 MODERATOR

### A. Tujuan Utama Role

Moderator adalah **pengawas lintas project** dengan akses read-only untuk finansial. Dia bisa melihat semua yang terjadi di seluruh platform (data alumni, konten project, transaksi keuangan) tapi **tidak punya kuasa approval finansial**.

Fokus utama: **Data integrity & content moderation.**

---

### B. Entry Point

```
Landing Page
    ↓ Klik link "Admin Panel"
Login Admin Panel
    ↓ Isi email & password
Validasi role = 'moderator'
    ↓ Redirect ke ModeratorDashboard.tsx
Default view: Dashboard overview
```

---

### C. Aksi yang Bisa Dilakukan

| Menu | Aksi | Level Akses |
|------|------|------------|
| **Dashboard** | Lihat stats gabungan semua project | Read-only |
| **Data Alumni** | • Lihat semua alumni<br>• Tambah alumni baru<br>• Edit data alumni<br>• Hapus alumni<br>• Filter angkatan/status | **CRUD lengkap** ⚠️ |
| **Konten Project** | • Lihat konten dari semua project<br>• **Hapus konten** yang melanggar aturan | Delete only |
| **Keuangan Project** | • Lihat transaksi semua project<br>• Filter per project<br>• Tidak bisa edit/approve | Read-only |
| **Activity Log** | • Lihat log aktivitas semua project<br>• Filter by user/action | Read-only |

---

### D. Flow Step-by-Step

#### ▶ FLOW 1: Kelola Data Alumni (FULL CRUD)

```
1. Moderator login → buka menu "Data Alumni"
    ↓
2. Tampil tabel SEMUA alumni:
   Kolom: Nama | Email | Angkatan | Jurusan | Kota | Status | Projects Joined | Total Donasi
    ↓
3. Moderator bisa:
   - Search nama/email
   - Filter angkatan
   - Filter status (Aktif/Tidak Aktif)
    ↓
4A. Path TAMBAH ALUMNI:
    Klik "Tambah Alumni"
        ↓ Modal form muncul
        ↓ Field lengkap (sama dengan Superadmin)
        ↓ Submit
        ↓ Alumni baru muncul di list
        ↓ Toast success
        ↓
        ⚠️ IMPLIKASI:
        ✅ Alumni baru ini bisa langsung login (jika ada kredensial)
        ❌ Tidak ada email notifikasi ke alumni baru
        ↓
    END

4B. Path EDIT ALUMNI:
    Klik ikon edit
        ↓ Modal edit (prefilled)
        ↓ Ubah data (semua field bisa diubah)
        ↓ Submit
        ↓ Data terupdate
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Alumni tidak dapat notifikasi bahwa data mereka diubah
        ❌ Tidak ada audit log: "Moderator X mengubah data Alumni Y"
        ↓
    END

4C. Path HAPUS ALUMNI:
    Klik ikon hapus
        ↓ Konfirmasi: "Yakin hapus?"
        ↓ Klik Ya
        ↓ Alumni hilang dari list
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Tidak ada soft delete
        ❌ Alumni yang sedang login tidak ter-kick
        ❌ PIC tidak tahu jika member project-nya dihapus
        ↓
    END
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Tambah alumni → tidak ada notifikasi ke alumni baru tentang akun mereka
2. Edit alumni → tidak ada audit trail siapa yang edit
3. Hapus alumni → PIC tidak tahu jika member project-nya dihapus oleh Moderator

---

#### ▶ FLOW 2: Moderasi Konten

```
1. Moderator buka menu "Konten Project"
    ↓
2. Tampil list semua konten dari semua project:
   - Progress update dari PIC
   - Announcement
   - Galeri
   Filter: Per project, per tipe konten
    ↓
3. Setiap card konten menampilkan:
   - Judul konten
   - Nama project
   - Tipe (Progress/Milestone/Pengumuman/Galeri)
   - Tanggal publish
   - Nama PIC yang buat
   - Tombol "Lihat Detail"
   - Tombol "Hapus" (merah)
    ↓
4. Moderator klik "Lihat Detail"
    ↓ Modal preview konten lengkap
    ↓ Moderator review apakah melanggar aturan
    ↓ Tutup modal
    ↓
5A. Konten OK → tidak ada aksi
    END

5B. Konten melanggar → Path HAPUS:
    Moderator klik "Hapus"
        ↓ Konfirmasi: "Yakin hapus konten ini?"
        ↓ Field "Alasan Penghapusan" (opsional tapi recommended)
        ↓ Klik "Ya, Hapus"
        ↓ Konten hilang dari list
        ↓ Toast: "Konten berhasil dihapus"
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ PIC TIDAK MENDAPAT NOTIFIKASI bahwa kontennya dihapus
        ❌ Alumni yang sudah lihat konten tetap bisa lihat cache-nya (jika ada)
        ❌ Tidak ada audit log: "Moderator X hapus konten Y dari Project Z"
        ↓
    END (flow terputus)
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Hapus konten → PIC tidak tahu kontennya hilang
2. Tidak ada cara PIC untuk komplain atau request restore
3. Tidak ada notifikasi ke alumni yang subscribe ke project tersebut

---

#### ▶ FLOW 3: Lihat Keuangan (READ-ONLY)

```
1. Moderator buka menu "Keuangan Project"
    ↓
2. Tampil tabel transaksi SEMUA project:
   Kolom: Tanggal | Project | Tipe | Kategori | Nominal | Status
    ↓
3. Moderator bisa:
   - Filter per project (dropdown)
   - Filter per tipe: Pemasukan/Pengeluaran
   - Filter tanggal (date range)
    ↓
4. Moderator HANYA BISA MELIHAT
   Tidak ada tombol: Approve, Reject, Edit, Hapus
    ↓
5. Moderator bisa klik row untuk lihat detail transaksi
    ↓ Modal detail muncul:
      - Nominal lengkap
      - Deskripsi
      - Kategori
      - PIC yang input
      - Tanggal
    ↓ Tutup modal
    ↓
END (pure read-only)
```

**✅ Flow lengkap (sesuai desain role)**

**⚠️ CATATAN PENTING:**
Moderator bisa melihat keuangan **SEMUA project** padahal seharusnya hanya project yang di-assign ke dia. Ini adalah **over-access** yang perlu diperbaiki dari sisi permission logic (tapi itu bukan pembahasan flow).

---

#### ▶ FLOW 4: Lihat Activity Log

```
1. Moderator buka menu "Activity Log"
    ↓
2. Tampil tabel log aktivitas:
   Kolom: Timestamp | User | Action | Target | Details
    ↓
3. Moderator bisa filter:
   - By user (dropdown: Pilih PIC/Alumni)
   - By action (dropdown: Login, Approve, Reject, Update, dll)
   - By date range
    ↓
4. Klik row untuk lihat detail log
    ↓ Modal detail muncul
    ↓ Tampil JSON lengkap dari log entry
    ↓ Tutup modal
    ↓
END (read-only)
```

**✅ Flow lengkap**

---

### E. Dampak ke Role Lain

| Aksi Moderator | Dampak ke Role Lain | Status Saat Ini |
|----------------|---------------------|-----------------|
| **Tambah alumni** | • Alumni baru bisa login<br>• Muncul di list alumni untuk PIC | ✅ Berfungsi (tapi tidak ada notif) |
| **Edit alumni** | • Data alumni berubah di semua tempat<br>• Alumni tidak tahu data mereka diubah | ⚠️ Tidak ada notif |
| **Hapus alumni** | • Alumni tidak bisa login (seharusnya)<br>• PIC kehilangan member (jika alumni itu member project) | ❌ Session alumni tidak ter-invalidate |
| **Hapus konten** | • Konten hilang dari project<br>• PIC kehilangan konten tanpa tahu | ❌ PIC tidak dapat notif |
| **Lihat keuangan** | Tidak ada dampak (read-only) | ✅ |
| **Lihat activity log** | Tidak ada dampak (read-only) | ✅ |

---

### F. Flow yang Belum Ditutup

1. **Moderator tidak bisa berkomunikasi dengan PIC langsung**
   - Jika Moderator menemukan konten yang "borderline" (tidak jelas melanggar atau tidak), tidak ada cara untuk tanya PIC dulu sebelum hapus
   - Tidak ada fitur "Request Clarification" dari Moderator ke PIC

2. **Moderator tidak bisa menandai donasi yang mencurigakan untuk Superadmin**
   - Moderator bisa lihat transaksi tapi tidak bisa beri flag "Perlu di-review lebih lanjut" untuk Superadmin

3. **Moderator tidak bisa memberikan feedback/catatan ke PIC atas konten**
   - Hanya bisa hapus atau biarkan
   - Tidak ada fitur "Warning" atau "Revision Request"

4. **Moderator melihat keuangan semua project tanpa assignment**
   - Tidak ada sistem "Moderator di-assign ke Project A, B, C" → dia lihat semua
   - Ini privacy concern tapi flow-wise tidak terputus

---

### G. Potensi Kebingungan dari Sisi UX

1. **Dashboard Moderator menampilkan "Pending Requests: 7"**
   - Moderator tidak bisa approve/reject apapun
   - Angka ini menyesatkan → seolah Moderator harus "melakukan sesuatu" padahal dia tidak punya power untuk itu

2. **Tidak ada batas jelas antara "Moderator bisa apa" vs "tidak bisa apa" di UI**
   - Semua menu tampil → tapi sebagian read-only, sebagian write
   - Butuh visual hierarchy yang lebih jelas (misal: menu read-only pakai ikon mata, menu write pakai ikon pensil)

3. **Moderator bisa CRUD alumni tapi tidak bisa approve donasi**
   - Ini inkonsisten dari sudut pandang privilege level
   - Seharusnya: Jika Moderator dipercaya ubah data alumni (data sensitif), kenapa tidak bisa approve donasi?

4. **Tidak ada onboarding atau tooltips untuk Moderator baru**
   - Moderator pertama kali login tidak tahu "Apa yang harus saya lakukan?"
   - Tidak ada "Moderator Guide" atau "First Time Tour"

---

## 🟠 PIC PROJECT

### A. Tujuan Utama Role

PIC (Project In Charge) adalah **pengelola operasional satu project spesifik**. Dia bertanggung jawab atas semua yang terjadi di dalam projectnya: member, konten, keuangan operasional, dan komunikasi internal. PIC adalah **wajah project** di mata alumni member.

---

### B. Entry Point

```
Landing Page
    ↓ Klik "Admin Panel"
Login Admin Panel
    ↓ Isi email & password
Validasi role = 'pic'
    ↓ Sistem cek: PIC ini assigned ke project ID mana?
    ↓ Jika assigned → Redirect ke PICDashboard.tsx (scope: 1 project)
    ↓ Jika tidak assigned → Tampil error: "Anda belum di-assign ke project manapun"
```

**❗ CATATAN:** PIC hanya bisa manage 1 project per akun. Jika 1 orang manage 2 project, dia harus punya 2 akun PIC terpisah.

---

### C. Aksi yang Bisa Dilakukan

| Menu | Aksi | Scope |
|------|------|-------|
| **Dashboard** | Lihat stats project sendiri (member, donasi, pending requests) | 1 project |
| **Pengajuan Join** | • Lihat list alumni yang apply<br>• **Approve** join request<br>• **Reject** join request<br>• Isi pesan selamat datang/penolakan | 1 project |
| **Keuangan Project** | • Lihat transaksi project sendiri<br>• **Tambah transaksi** (pemasukan internal / pengeluaran)<br>• Lihat breakdown per kategori | 1 project |
| **Konten Project** | • Lihat konten yang sudah dipublish<br>• **Buat progress update**<br>• Edit/hapus konten sendiri | 1 project |
| **Polling** | • Lihat polling aktif & selesai<br>• **Buat polling baru**<br>• Tutup polling sebelum deadline<br>• Lihat hasil voting | 1 project |
| **Delegasi PIC** | • Lihat task yang sudah di-assign<br>• **Buat task baru**<br>• Assign task ke member<br>• Update status task | 1 project |
| **Activity Log** | Lihat log aktivitas project sendiri | 1 project |

---

### D. Flow Step-by-Step

#### ▶ FLOW 1: Approve/Reject Join Request (CRITICAL PATH)

```
1. PIC login → Landing di PICDashboard
    ↓
2. Dashboard menampilkan ALERT:
   "🔔 X Pengajuan Menunggu Persetujuan"
   Tombol: "Review Sekarang"
    ↓
3. PIC klik "Review Sekarang"
   ATAU buka menu "Pengajuan Join" dari sidebar
    ↓
4. Halaman "Pending Requests" terbuka
   Tampil list card alumni yang apply:
   Setiap card menampilkan:
   - Nama alumni
   - Email alumni
   - Angkatan
   - Durasi komitmen yang dipilih (1 bulan, 3 bulan, 6 bulan, custom)
   - Alasan bergabung (textarea panjang)
   - Rating sebelumnya (jika pernah join project lain): ⭐⭐⭐⭐ 4.5/5
   - Waktu pengajuan: "3 jam yang lalu"
   - Tombol "Approve" (hijau)
   - Tombol "Tolak" (merah)
    ↓
5A. Path APPROVE:
    PIC klik "Approve"
        ↓ Modal konfirmasi muncul
        ↓ Judul: "Terima Alumni ke Project?"
        ↓ Field "Pesan Selamat Datang" (prefilled):
          "Selamat datang di project [Nama Project]! 
           Kami senang kamu bergabung. Silakan cek tab Diskusi 
           untuk info lebih lanjut."
        ↓ PIC bisa edit pesan
        ↓ Toggle: "Kirim email notifikasi" (default: ON)
        ↓ PIC klik "Konfirmasi Terima"
        ↓ Modal tertutup
        ↓ Alumni keluar dari list pending
        ↓ Toast success: "Alumni berhasil diterima!"
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Alumni TIDAK MENDAPAT EMAIL
        ❌ Alumni harus refresh halaman untuk melihat tab Discussion/Wallet terbuka
        ❌ Tidak ada notifikasi in-app ke alumni
        ↓
    END (flow terputus ke alumni)

5B. Path REJECT:
    PIC klik "Tolak"
        ↓ Modal konfirmasi muncul
        ↓ Judul: "Tolak Pengajuan Alumni?"
        ↓ Dropdown "Alasan Penolakan":
          - Komitmen terlalu singkat
          - Kuota project sudah penuh
          - Kualifikasi belum sesuai
          - Alasan lainnya (custom)
        ↓ Jika pilih "Alasan lainnya" → muncul textarea untuk isi manual
        ↓ Field "Pesan untuk Alumni" (opsional):
          Bisa isi feedback atau saran
        ↓ Toggle: "Izinkan alumni resubmit di kemudian hari" (default: ON)
        ↓ Toggle: "Kirim email notifikasi"
        ↓ PIC klik "Konfirmasi Tolak"
        ↓ Alumni keluar dari list pending
        ↓ Toast: "Pengajuan ditolak"
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Alumni TIDAK MENDAPAT EMAIL
        ❌ Alumni tidak tahu pengajuannya ditolak
        ❌ Status di UI alumni tetap "Menunggu Persetujuan" selamanya
        ↓
    END (flow terputus ke alumni)
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Approve → Alumni tidak tahu diapprove → harus cek manual ke project detail
2. Reject → Alumni tidak tahu ditolak → stuck di status "pending" selamanya
3. Tidak ada deadline approval → join request bisa pending selamanya tanpa notif ke PIC

---

#### ▶ FLOW 2: Buat Progress Update

```
1. PIC buka menu "Konten Project"
    ↓
2. Halaman menampilkan 2 section:
   - Section "Konten Terpublish" (list update yang sudah live)
   - Tombol "Buat Update Baru"
    ↓
3. PIC klik "Buat Update Baru"
    ↓ Modal form muncul
    ↓ Field:
      - Tipe Update (dropdown):
        • Progress (default)
        • Milestone
        • Pengumuman
        • Galeri
      - Judul (wajib): "Update Distribusi Paket Sembako - Minggu 1"
      - Konten (textarea, wajib): "Alhamdulillah hari ini kami berhasil..."
      - Upload gambar (opsional, max 5 gambar)
      - Toggle: "Kirim notifikasi ke semua member" (default: ON)
    ↓ PIC isi semua field
    ↓ Klik "Publish Update"
    ↓ Loading...
    ↓ Modal tertutup
    ↓ Update baru muncul di list konten
    ↓ Toast success: "Progress update berhasil dipublish!"
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Alumni member TIDAK MENDAPAT NOTIFIKASI
    ❌ Update tidak muncul otomatis di tab Progress alumni (harus refresh)
    ❌ Tidak ada timestamp yang jelas kapan update dipublish
    ↓
END (flow terputus ke alumni)
```

**🚨 TITIK TERPUTUS:**
1. Publish update → Alumni tidak tahu ada update baru
2. Tidak ada mekanisme "Draft" → PIC harus publish langsung atau tidak sama sekali

---

#### ▶ FLOW 3: Buat Polling

```
1. PIC buka menu "Polling"
    ↓
2. Halaman menampilkan 2 tab:
   - Tab "Polling Aktif"
   - Tab "Polling Selesai"
    ↓
3. PIC klik "Buat Polling Baru"
    ↓ Modal form muncul
    ↓ Field:
      - Pertanyaan (wajib): "Hari apa distribusi paling efektif?"
      - Deskripsi tambahan (opsional): "Berdasarkan jadwal kerja kalian"
      - Opsi 1 (wajib): "Senin"
      - Opsi 2 (wajib): "Selasa"
      - Tombol "+ Tambah Opsi" (bisa tambah sampai 10 opsi)
      - Toggle: "Izinkan pilih lebih dari satu opsi"
      - Toggle: "Polling anonim" (hasil voting tidak menampilkan nama voter)
      - Deadline (datepicker, wajib)
    ↓ PIC isi semua
    ↓ Klik "Buat Polling"
    ↓ Modal tertutup
    ↓ Polling aktif muncul di tab "Polling Aktif"
    ↓ Toast success
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Alumni member TIDAK MENDAPAT NOTIFIKASI ada polling baru
    ❌ Polling tidak muncul otomatis di tab Voting alumni (harus refresh)
    ↓
4. Alumni vote (flow ada di section Alumni)
    ↓
5. PIC bisa tutup polling sebelum deadline:
   Klik tombol "Tutup Polling"
       ↓ Konfirmasi
       ↓ Polling pindah ke tab "Polling Selesai"
       ↓ PIC bisa lihat hasil final
       ↓
       ⚠️ KONDISI SAAT INI:
       ❌ Alumni yang belum vote tidak dapat notif polling ditutup
       ↓
   END
   ↓
END
```

**✅ Flow polling relatif lengkap** (hanya kurang notifikasi)

---

#### ▶ FLOW 4: Delegasi Task ke Member

```
1. PIC buka menu "Delegasi PIC"
    ↓
2. Halaman menampilkan list task:
   Filter: All | Pending | In Progress | Done
    ↓
3. PIC klik "Buat Task Baru"
    ↓ Modal form muncul
    ↓ Field:
      - Judul task (wajib): "Susun laporan distribusi minggu 1"
      - Deskripsi (opsional): "Format laporan sudah ada di Google Drive"
      - Assign ke (dropdown, wajib): Pilih dari list member aktif project
      - Prioritas (dropdown): Low | Medium | High | Urgent
      - Kategori (dropdown): Operasional | Distribusi | Marketing | Admin | Lainnya
      - Deadline (datepicker, wajib)
    ↓ PIC isi semua
    ↓ Klik "Buat Task"
    ↓ Task muncul di list dengan status "Pending"
    ↓ Toast success
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Alumni yang di-assign TIDAK MENDAPAT NOTIFIKASI
    ❌ Task tidak muncul otomatis di tab Tasks alumni (harus refresh)
    ↓
4. Alumni buka tab Tasks (di MessagesAlumni)
    ↓ Lihat task yang di-assign
    ↓ Alumni ubah status jadi "In Progress"
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ PIC TIDAK MENDAPAT NOTIFIKASI bahwa task sudah dimulai
    ↓
5. Alumni selesai task → ubah status jadi "Done"
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ PIC TIDAK MENDAPAT NOTIFIKASI bahwa task sudah selesai
    ↓
END (flow terputus di kedua arah)
```

**🚨 TITIK TERPUTUS:**
1. PIC assign task → Alumni tidak tahu ada task baru
2. Alumni update status task → PIC tidak tahu progress-nya
3. Tidak ada reminder otomatis jika task mendekati deadline

---

#### ▶ FLOW 5: Kelola Keuangan Project

```
1. PIC buka menu "Keuangan Project"
    ↓
2. Halaman menampilkan:
   SECTION 1: RINGKASAN
   - Card "Dana Umum" (dari donasi): Rp 25.000.000
   - Card "Dana Internal" (dari member): Rp 5.000.000
   - Card "Total Dana": Rp 30.000.000
   - Card "Total Pengeluaran": Rp 18.000.000
   - Card "Saldo": Rp 12.000.000
    ↓
   SECTION 2: BREAKDOWN PENGELUARAN
   - Pie chart: Kategori pengeluaran (Operasional 60%, Distribusi 30%, Marketing 10%)
    ↓
   SECTION 3: HISTORI TRANSAKSI
   - Tabel transaksi (pemasukan + pengeluaran)
   - Filter: All | Pemasukan | Pengeluaran
    ↓
3. PIC klik "Tambah Transaksi"
    ↓ Modal form muncul
    ↓ Field:
      - Tipe (radio): Pengeluaran | Pemasukan Internal
      - Nominal (wajib): Rp
      - Deskripsi (wajib): "Beli bahan makanan untuk paket sembako"
      - Kategori (dropdown): Operasional | Distribusi | Marketing | Admin | Lainnya
      - Tanggal transaksi (datepicker)
      - Upload bukti (opsional)
    ↓ PIC isi semua
    ↓ Klik "Simpan Transaksi"
    ↓ Transaksi baru muncul di histori
    ↓ Saldo terupdate otomatis
    ↓ Toast success
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ PIC bisa tambah pengeluaran TANPA APPROVAL dari Superadmin
    ❌ Saldo bisa minus jika PIC input pengeluaran lebih besar dari saldo
    ❌ Tidak ada validation: "Saldo tidak cukup"
    ❌ Tidak ada audit: "Siapa yang approve pengeluaran ini?"
    ↓
END (flow lengkap tapi tidak aman)
```

**🚨 TITIK TERPUTUS:**
1. PIC tambah pengeluaran → Superadmin tidak tahu (tidak ada approval flow)
2. PIC bisa tambah pengeluaran sampai saldo minus → tidak ada blocking
3. Alumni member bisa lihat wallet tapi data tidak realtime

---

#### ▶ FLOW 6: Request Withdrawal (TIDAK ADA DI KODEBASE)

**KESIMPULAN:** PIC **tidak punya fitur request withdrawal** dari dalam Admin Panel.

Flow yang seharusnya ada:
```
PIC butuh dana cair
    ↓ Buka menu "Withdrawal"
    ↓ Klik "Request Withdrawal"
    ↓ Isi: Nominal + Alasan + Rekening tujuan
    ↓ Submit → Status: Pending
    ↓ Superadmin review (di menu Manajemen Dompet)
    ↓ Superadmin approve/reject
    ↓ PIC dapat notifikasi hasilnya
```

**Status saat ini:** Flow ini **belum diimplementasikan**. PIC hanya bisa "Tambah Transaksi" yang mengubah saldo secara manual, tapi tidak ada mekanisme penarikan dana resmi.

---

### E. Dampak ke Role Lain

| Aksi PIC | Dampak ke Role Lain | Status Saat Ini |
|----------|---------------------|-----------------|
| **Approve join request** | • Alumni dapat akses tab Discussion & Wallet<br>• Alumni jadi member project | ❌ Alumni tidak dapat notif |
| **Reject join request** | • Alumni tetap guest<br>• Alumni seharusnya dapat feedback | ❌ Alumni tidak tahu ditolak |
| **Publish progress update** | • Alumni member seharusnya dapat notif | ❌ Tidak ada notif |
| **Buat polling** | • Alumni member seharusnya dapat notif<br>• Polling muncul di tab Voting | ❌ Tidak ada notif |
| **Assign task** | • Alumni dapat task baru di tab Tasks | ❌ Alumni tidak dapat notif |
| **Tambah pengeluaran** | • Saldo wallet berkurang<br>• Superadmin seharusnya approve dulu | ❌ Tidak ada approval flow |

---

### F. Flow yang Belum Ditutup

1. **PIC tidak bisa komunikasi dengan Superadmin**
   - Tidak ada fitur "Hubungi Superadmin" dari Admin Panel
   - Jika ada masalah keuangan, PIC harus komunikasi di luar sistem

2. **PIC tidak bisa request penutupan project**
   - Tidak ada tombol "Request Close Project"
   - Tidak ada cara resmi untuk menutup project yang sudah selesai

3. **PIC tidak tahu kapan donasi untuk projectnya diapprove**
   - Saldo wallet bertambah tapi PIC tidak tahu dari donasi mana
   - Tidak ada notifikasi: "Donasi Rp X dari [Nama Donatur] telah disetujui"

4. **PIC tidak bisa melihat list donatur yang sudah donasi ke projectnya**
   - PIC hanya lihat saldo total, tidak ada breakdown per donatur
   - Tidak bisa kirim terima kasih personal ke donatur

---

### G. Potensi Kebingungan dari Sisi UX

1. **PIC Dashboard menampilkan "Total Donasi: Rp 25 juta"**
   - Apakah ini donasi yang sudah approved atau termasuk pending?
   - Tidak ada label yang jelas

2. **PIC bisa tambah pengeluaran tanpa batas**
   - Tidak ada warning: "Saldo tidak cukup"
   - Saldo bisa minus tanpa ada blocking

3. **Tidak ada perbedaan visual antara transaksi "Sudah Diverifikasi" vs "Baru Diinput PIC"**
   - Semua transaksi tampil dengan style yang sama
   - Alumni member tidak tahu transaksi mana yang legitimate

4. **PIC tidak tahu siapa saja member yang aktif vs tidak aktif**
   - List member tidak ada badge "Last active: 3 hari lalu"
   - PIC bisa assign task ke member yang sudah tidak aktif

---

## 🟡 ALUMNI (LOGIN)

### A. Tujuan Utama Role

Alumni adalah **user utama platform** ini. Mereka bukan hanya donatur pasif, tapi bisa menjadi **kontributor aktif** dengan bergabung ke project, berdiskusi, vote di polling, dan mengerjakan task dari PIC.

---

### B. Entry Point

```
Landing Page
    ↓ Klik tombol "Masuk" di header
Login Page (Login.tsx)
    ↓ Toggle: Donatur | Alumni (pilih "Alumni")
    ↓ Isi email & password
    ↓ Klik "Masuk"
    ↓ Validasi (frontend only, tidak ada backend)
    ↓ localStorage.setItem('userRole', 'alumni')
    ↓ Redirect ke Home
```

---

### C. Aksi yang Bisa Dilakukan

| Area | Aksi | Aksesibilitas |
|------|------|--------------|
| **Home** | • Lihat project cards<br>• Lihat news & events<br>• Lihat cerita alumni | Public (sama dengan guest) |
| **Explore** | • Browse project di tab Open Volunteer & Galeri<br>• Filter project | Public |
| **Project Detail** | • Lihat 5 tab: Overview, Progress, Members, Discussion (member only), Wallet (member only)<br>• **Bergabung ke project** (submit join request) | Sebagian member-only |
| **Donasi** | • Akses flow donasi lengkap<br>• Upload bukti transfer | ✅ Alumni bisa donasi |
| **Pesan** | • Akses MessagesAlumni (4 tab: Chats, Teams, Tasks, Voting)<br>• Kirim pesan<br>• Vote di polling<br>• Update status task | ✅ Alumni bisa akses semua |
| **Settings** | • Edit profil lengkap<br>• Edit data alumni<br>• Edit riwayat Saladin Camp | ✅ CRUD profil sendiri |

---

### D. Flow Step-by-Step

#### ▶ FLOW 1: Bergabung ke Project (CRITICAL PATH)

```
1. Alumni login → buka Home
    ↓
2. Alumni klik project card → ProjectDetailAlumni terbuka
    ↓
3. Halaman menampilkan 5 tab:
   - Tab "Overview" (default, unlocked)
   - Tab "Progress" (unlocked)
   - Tab "Members" (unlocked)
   - Tab "Diskusi" (🔒 Locked: "Khusus Member")
   - Tab "Wallet" (🔒 Locked: "Khusus Member")
    ↓
4. Alumni melihat tombol "Bergabung ke Project" di tab Overview
   (Jika belum pernah apply)
    ↓
5. Alumni klik "Bergabung ke Project"
    ↓ Modal form muncul
    ↓ Judul: "Komitmen Bergabung ke Project"
    ↓ Field:
      - Pilih Durasi Komitmen (radio):
        • 1 Bulan
        • 3 Bulan
        • 6 Bulan
        • 1 Tahun
        • Custom (muncul input field jika dipilih)
      - Alasan Bergabung (textarea, wajib):
        "Mengapa Anda ingin bergabung ke project ini?"
    ↓ Alumni isi form
    ↓ Klik "Kirim Pengajuan"
    ↓
    Validasi:
    - Jika alasan kosong → toast error: "Alasan harus diisi"
    - Jika pilih Custom tapi durasi kosong → toast error
    ↓ Jika valid:
    ↓ Modal tertutup
    ↓ Toast success: "Pengajuan berhasil dikirim! Menunggu persetujuan PIC"
    ↓ Status di UI berubah:
      Tombol "Bergabung" hilang
      Muncul badge: "⏳ Menunggu Persetujuan"
    ↓ Tab Diskusi & Wallet tetap terkunci
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Alumni TIDAK TAHU kapan PIC akan review
    ❌ Tidak ada estimasi waktu: "Biasanya diproses dalam 1-3 hari"
    ❌ Alumni tidak bisa membatalkan pengajuan
    ❌ Alumni tidak bisa edit alasan yang sudah dikirim
    ↓
6. [Menunggu PIC approve...]
    ↓
7A. Path: PIC APPROVE
    (Proses ini terjadi di Admin Panel PIC)
        ↓ PIC klik "Approve"
        ↓ Alumni status berubah jadi `isProjectMember = true`
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Alumni TIDAK MENDAPAT NOTIFIKASI
        ❌ Alumni harus refresh halaman untuk melihat perubahan
        ↓
    Alumni refresh halaman:
        ↓ Badge "Menunggu Persetujuan" hilang
        ↓ Badge "✅ Member" muncul
        ↓ Tab Diskusi & Wallet terbuka (unlocked)
        ↓ Alumni bisa akses penuh
        ↓
    END (loop tertutup, tapi tidak ada notif)

7B. Path: PIC REJECT
    (Proses ini terjadi di Admin Panel PIC)
        ↓ PIC klik "Tolak"
        ↓ PIC isi alasan penolakan
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Alumni TIDAK MENDAPAT NOTIFIKASI
        ❌ Status di UI alumni tetap "Menunggu Persetujuan" SELAMANYA
        ❌ Alumni tidak tahu pengajuannya ditolak
        ❌ Alumni tidak bisa apply lagi
        ↓
    END (flow terputus total)
    ↓
END
```

**🚨 TITIK TERPUTUS:**
1. Submit join request → Alumni tidak tahu statusnya
2. PIC approve → Alumni tidak dapat notif
3. PIC reject → Alumni tidak tahu ditolak, stuck di "pending" selamanya
4. Tidak ada cara alumni untuk membatalkan join request

---

#### ▶ FLOW 2: Akses Tab Diskusi (Member Only)

```
PRASYARAT: Alumni sudah jadi member (isProjectMember = true)

1. Alumni buka ProjectDetailAlumni → klik tab "Diskusi"
    ↓
2. Tab Diskusi terbuka (tidak lagi terkunci)
    ↓
3. Halaman menampilkan:
   - Header: "💬 Diskusi Member Project"
   - Thread pesan (scroll vertical)
   - Input box di bawah: "Tulis pesan..."
    ↓
4. Alumni scroll ke atas untuk lihat histori pesan
    ↓
5. Setiap pesan menampilkan:
   - Avatar user
   - Nama member
   - Waktu kirim: "2 jam yang lalu"
   - Isi pesan
   - Jika pesan panjang: Tombol "Lihat Selengkapnya" (expand/collapse)
   - Ikon vote (jempol)
   - Jumlah vote
    ↓
6. Alumni klik "Lihat Selengkapnya" pada pesan panjang
    ↓ Pesan expand
    ↓ Alumni bisa klik lagi untuk collapse
    ↓
7. Alumni klik ikon vote pada pesan tertentu
    ↓ Jumlah vote bertambah 1
    ↓ Ikon vote berubah warna (highlight)
    ↓ Toast: "Vote berhasil!"
    ↓
8. Alumni ketik pesan di input box:
   "Alhamdulillah, semoga lancar distribusinya!"
    ↓ Klik tombol kirim (ikon pesawat kertas)
    ↓ Pesan baru muncul di paling bawah thread
    ↓ Input box kosong kembali
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Pesan tidak real-time (harus refresh untuk lihat pesan member lain)
    ❌ Tidak ada notifikasi jika ada pesan baru
    ❌ Tidak ada typing indicator: "Fatimah sedang mengetik..."
    ↓
END
```

**✅ Flow dasar lengkap**  
**⚠️ Kurang real-time sync**

---

#### ▶ FLOW 3: Akses Tab Wallet (Member Only)

```
PRASYARAT: Alumni sudah jadi member

1. Alumni buka tab "Wallet"
    ↓
2. Halaman menampilkan:
   SECTION 1: RINGKASAN
   - Card "Total Masuk": Rp 30.000.000
   - Card "Total Keluar": Rp 18.000.000
   - Card "Saldo": Rp 12.000.000
    ↓
   SECTION 2: FILTER
   - Button filter: Semua | Dana Internal | Donasi | Pengeluaran
    ↓
   SECTION 3: LIST TRANSAKSI
   - Setiap transaksi menampilkan:
     • Ikon (berbeda per tipe transaksi)
     • Judul transaksi
     • Tanggal
     • Nominal (warna hijau untuk masuk, merah untuk keluar)
    ↓
3. Alumni klik filter "Donasi"
    ↓ List transaksi ter-filter, hanya tampil transaksi tipe "Donasi"
    ↓
4. Alumni klik filter "Pengeluaran"
    ↓ List transaksi ter-filter, hanya tampil pengeluaran
    ↓
5. Alumni klik "Semua" untuk reset filter
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Data yang ditampilkan adalah HARDCODED ARRAY
    ❌ Data yang sama ditampilkan untuk SEMUA project
    ❌ Tidak ada filter berdasarkan `projectId`
    ❌ Alumni melihat transaksi yang bukan milik project ini
    ↓
END
```

**🚨 MASALAH KRITIS:**
Data wallet tidak terisolasi per project → semua alumni lihat data yang sama → **tidak mencerminkan realitas project yang diikuti**.

---

#### ▶ FLOW 4: Akses Pesan & Voting (MessagesAlumni)

```
1. Alumni klik menu "Pesan" di bottom navigation (mobile)
   ATAU klik "Pesan" di sidebar (desktop)
    ↓
2. Halaman MessagesAlumni terbuka
   Tampil 4 tab:
   - Tab "Chats"
   - Tab "Teams"
   - Tab "Tasks"
   - Tab "Voting"
    ↓
3A. TAB CHATS:
    Alumni klik tab "Chats"
        ↓ Tampil list percakapan (personal + group)
        ↓ Alumni klik salah satu chat
        ↓ Chat room terbuka
        ↓ Alumni bisa scroll histori
        ↓ Alumni ketik pesan di input box
        ↓ Klik kirim
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ Pengiriman pesan BELUM FUNGSIONAL (UI ada, logic belum)
        ↓
    END

3B. TAB TEAMS:
    Alumni klik tab "Teams"
        ↓
        IF alumni belum join project apapun (hasJoinedProjects = false):
            ↓ Tampil empty state:
              "Anda belum bergabung ke project manapun"
              Tombol: "Bergabung ke Project"
            ↓ Alumni klik tombol
            ↓ Redirect ke halaman Explore
            ↓
        END

        IF alumni sudah join minimal 1 project:
            ↓ Tampil list tim/channel project yang diikuti
            ↓ Alumni klik salah satu tim
            ↓ Channel discussion terbuka
            ↓
        END

3C. TAB TASKS:
    Alumni klik tab "Tasks"
        ↓ Tampil list task yang di-assign PIC ke alumni ini
        ↓ Setiap card task menampilkan:
          - Judul task
          - Nama project
          - Prioritas (badge: Low/Medium/High/Urgent)
          - Kategori
          - Deadline
          - Status: Pending | In Progress | Done
          - Tombol dropdown: Ubah status
        ↓ Alumni klik dropdown status
        ↓ Pilih status baru (misal: "In Progress")
        ↓ Status terupdate
        ↓ Toast success
        ↓
        ⚠️ KONDISI SAAT INI:
        ❌ PIC TIDAK MENDAPAT NOTIFIKASI bahwa status task berubah
        ↓
    END

3D. TAB VOTING:
    Alumni klik tab "Voting"
        ↓ Tampil list polling aktif dari project yang diikuti
        ↓ Alumni klik salah satu polling
        ↓ Modal voting muncul:
          - Pertanyaan polling
          - List opsi (radio button atau checkbox jika multi-select)
          - Tombol "Submit Vote"
        ↓ Alumni pilih opsi
        ↓ Klik "Submit Vote"
        ↓
        IF alumni belum pernah vote di polling ini:
            ↓ Vote tersimpan
            ↓ Toast success
            ↓ Modal berubah menampilkan HASIL VOTING:
              - Bar progress per opsi
              - Persentase per opsi
              - Total voter
            ↓
        END

        IF alumni sudah pernah vote:
            ↓ Langsung tampil hasil voting
            ↓ Tombol vote disabled
            ↓ Label: "Anda sudah vote di polling ini"
            ↓
        END
        ↓
    END
    ↓
END
```

**✅ Tab Voting: Loop lengkap**  
**⚠️ Tab Chats: Belum fungsional**  
**⚠️ Tab Tasks: PIC tidak dapat notif update status**

---

#### ▶ FLOW 5: Donasi (Sama dengan Donatur)

Lihat di section **Donatur** untuk flow donasi lengkap.

**Perbedaan Alumni vs Donatur:**
- Alumni bisa donasi **DAN** join project
- Donatur hanya bisa donasi, tidak bisa join project

---

### E. Dampak ke Role Lain

| Aksi Alumni | Dampak ke Role Lain | Status Saat Ini |
|-------------|---------------------|-----------------|
| **Submit join request** | • PIC dapat alert di dashboard | ✅ PIC lihat di pending requests |
| **Kirim pesan di Diskusi** | • Member lain lihat pesan | ⚠️ Tidak real-time |
| **Vote di polling** | • Jumlah vote di polling bertambah<br>• PIC lihat hasil voting | ✅ Berfungsi |
| **Update status task** | • PIC seharusnya dapat notif | ❌ PIC tidak tahu |
| **Donasi** | • Superadmin dapat item baru di Verifikasi Donasi | ⚠️ Tidak sinkron |

---

### F. Flow yang Belum Ditutup

1. **Submit join request → Tidak tahu hasilnya**
   - Alumni tidak dapat notif approved/rejected
   - Status "pending" bisa selamanya jika PIC tidak aktif

2. **Tidak ada halaman "Riwayat Donasi"**
   - Alumni tidak bisa lihat list donasi yang pernah dilakukan
   - Tidak bisa cek status donasi (pending/approved/rejected)

3. **Tidak bisa keluar (resign) dari project**
   - Alumni yang sudah member tidak bisa resign
   - Tidak ada tombol "Keluar dari Project"

4. **Tidak bisa membatalkan join request**
   - Setelah submit, tidak bisa cancel
   - Harus tunggu PIC approve/reject

5. **Tidak mendapat notifikasi progress update baru dari PIC**
   - Alumni harus cek manual ke tab Progress
   - Tidak ada badge "New" atau "Unread"

6. **Tidak ada cara untuk kontak PIC langsung**
   - Tidak ada tombol "Hubungi PIC" dari project detail
   - Harus lewat diskusi umum

---

### G. Potensi Kebingungan dari Sisi UX

1. **Tab Diskusi dan Wallet terkunci dengan teks "Khusus Member"**
   - Tidak ada penjelasan: "Cara jadi member gimana?"
   - Alumni baru bisa bingung

2. **Setelah submit join form, halaman kembali ke Overview tanpa perubahan yang obvious**
   - User bisa berpikir form tidak terkirim
   - Butuh feedback visual yang lebih jelas

3. **Di tab Wallet, saldo yang ditampilkan sama untuk semua project**
   - Alumni bisa bingung: "Ini saldo project mana?"
   - Tidak ada header: "Saldo Project [Nama Project]"

4. **Pesan di tab Diskusi tidak real-time**
   - Alumni kirim pesan, tapi pesan member lain tidak muncul otomatis
   - Butuh refresh manual → bad UX

---

## ⚪ DONATUR (NON-ALUMNI)

### A. Tujuan Utama Role

Donatur adalah **kontributor finansial dari luar alumni** (masyarakat umum). Mereka ingin mendukung project secara dana tanpa perlu terlibat operasional. Fokus: **Kemudahan donasi & transparansi penggunaan dana**.

---

### B. Entry Point

```
Jalur 1 (Guest → Donatur):
Landing Page (sebagai Guest)
    ↓ Buka project detail
    ↓ Klik "Donasi Sekarang"
    ↓ Lanjut ke DonationPage (tidak perlu login)

Jalur 2 (Login sebagai Donatur):
Landing Page
    ↓ Klik "Masuk"
    ↓ Login Page → Toggle: Pilih "Donatur"
    ↓ Isi email & password
    ↓ Login
    ↓ localStorage.setItem('userRole', 'donatur')
    ↓ Redirect ke Home
    ↓ Akses project → Donasi
```

**Perbedaan Login vs Tidak Login:**
- **Tidak login (Guest):** Bisa donasi langsung, tapi tidak ada tracking riwayat donasi
- **Login (Donatur):** Seharusnya bisa lihat riwayat donasi (tapi fitur ini belum ada)

---

### C. Aksi yang Bisa Dilakukan

| Area | Aksi | Perbedaan dengan Alumni |
|------|------|------------------------|
| **Home** | Lihat project, news, events | Sama dengan Alumni |
| **Explore** | Browse project di tab Open Volunteer & Galeri | Sama dengan Alumni |
| **Project Detail** | Lihat detail project (hanya `ProjectDetail` biasa, bukan `ProjectDetailAlumni`) | ❌ Tidak ada 5 tab khusus alumni |
| **Donasi** | Akses flow donasi lengkap | ✅ Sama dengan Alumni |
| **Pesan** | Akses `MessagePage` biasa (bukan `MessagesAlumni`) | ❌ Tidak ada tab Teams/Tasks/Voting |
| **Settings** | Edit profil dasar (nama, email, foto) | ❌ Tidak ada data alumni/Saladin Camp |

---

### D. Flow Step-by-Step

#### ▶ FLOW UTAMA: DONASI (END-TO-END)

```
────────────────────────────────────────
STEP 1: PILIH NOMINAL
────────────────────────────────────────

1. Donatur buka project detail
    ↓ Klik tombol "Donasi Sekarang"
    ↓ DonationPage terbuka
    ↓
2. Halaman menampilkan:
   - Nama project
   - Kategori project
   - Section "Pilih Nominal Donasi"
   - 6 tombol quick amount: 50rb, 100rb, 250rb, 500rb, 1jt, 2.5jt
   - Input field "Nominal Lainnya" (custom)
   - Section "Pesan/Doa" (opsional)
   - Toggle "Donasi Anonim"
   - Section "Metode Pembayaran"
   - Radio button: BCA, Mandiri, BNI, GoPay, OVO, DANA, QRIS
   - Tombol "Konfirmasi Donasi" (besar, accent color)
    ↓
3. Donatur klik salah satu quick amount (misal: 100rb)
    ↓ Button 100rb ter-highlight (accent color)
    ↓ Nominal terupdate di state
    ↓
4. Donatur isi pesan/doa (opsional):
   "Semoga bermanfaat untuk saudara kita di Gaza"
    ↓
5. Donatur toggle "Donasi Anonim" (jika ingin anonim)
    ↓ Toggle aktif
    ↓
6. Donatur pilih metode pembayaran: BCA
    ↓ Radio button BCA terpilih
    ↓
7. Donatur klik "Konfirmasi Donasi"
    ↓
    VALIDASI:
    IF nominal kosong atau 0:
        ↓ Toast error: "Pilih nominal donasi terlebih dahulu"
        ↓ STOP
    IF nominal < 10.000:
        ↓ Toast error: "Nominal minimum Rp 10.000"
        ↓ STOP
    IF nominal > 100.000.000:
        ↓ Toast error: "Nominal maksimum Rp 100.000.000"
        ↓ STOP
    ↓ Jika valid:
    ↓

────────────────────────────────────────
STEP 2: KONFIRMASI & INFO TRANSFER
────────────────────────────────────────

8. Modal konfirmasi muncul
    ↓ Judul: "Konfirmasi Donasi"
    ↓ Tampil:
      - Nominal yang dipilih: Rp 100.000
      - Unique code 3 digit: 487 (random generated)
      - Total transfer: Rp 100.487
      - Metode pembayaran: BCA
      - Nomor rekening: 1234567890
      - Nama rekening: Yayasan ProjekKita
      - Tombol "Copy Nomor Rekening"
      - Tombol "Copy Total Transfer"
      - Instruksi: "Transfer sejumlah Rp 100.487 (termasuk kode unik) ke rekening di atas"
      - Tombol "Saya Sudah Transfer"
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Tidak ada TIMER: "Transfer dalam waktu 24 jam"
    ❌ Tidak ada EXPIRY WARNING
    ❌ Unique code bisa expired tapi donatur tidak tahu
    ↓
9. Donatur klik "Copy Nomor Rekening"
    ↓ Nomor rekening tercopy ke clipboard
    ↓ Toast: "Nomor rekening berhasil dicopy"
    ↓
10. Donatur klik "Copy Total Transfer"
    ↓ Total Rp 100.487 tercopy
    ↓ Toast: "Total transfer berhasil dicopy"
    ↓
11. Donatur buka m-banking/e-wallet
    ↓ Transfer manual ke rekening yang ditampilkan
    ↓ [PROSES DI LUAR SISTEM]
    ↓
12. Setelah transfer selesai, donatur kembali ke halaman donasi
    ↓ Klik "Saya Sudah Transfer"
    ↓

────────────────────────────────────────
STEP 3: UPLOAD BUKTI TRANSFER
────────────────────────────────────────

13. Modal konfirmasi tertutup
    ↓ Halaman berubah menampilkan area upload bukti
    ↓ Section: "Upload Bukti Transfer"
    ↓ Area drag-and-drop / click to upload
    ↓ Label: "Format: JPG, PNG, PDF (Max 5MB)"
    ↓
14. Donatur klik area upload / drag-drop file
    ↓ File picker terbuka
    ↓ Donatur pilih file bukti transfer (screenshot/foto/PDF)
    ↓
    VALIDASI FILE:
    IF file size > 5MB:
        ↓ Toast error: "Ukuran file maksimal 5MB"
        ↓ STOP
    IF file type bukan image atau PDF:
        ↓ Toast error: "Format file tidak didukung"
        ↓ STOP
    ↓ Jika valid:
    ↓
15. Preview bukti muncul di area upload
    ↓ Tampil thumbnail gambar
    ↓ Tombol "Hapus" (jika ingin ganti file)
    ↓
16. Donatur klik "Kirim Bukti Transfer"
    ↓
    VALIDASI:
    IF file belum diupload:
        ↓ Toast error: "Mohon upload bukti transfer terlebih dahulu"
        ↓ STOP
    ↓ Jika valid:
    ↓
17. Loading indicator muncul: "Mengirim bukti..."
    ↓ Simulasi delay 1.5 detik (setTimeout)
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Tidak ada proses upload ke server
    ❌ File hanya disimpan di state frontend
    ❌ Setelah refresh, data hilang
    ↓

────────────────────────────────────────
STEP 4: THANK YOU PAGE
────────────────────────────────────────

18. Halaman berubah ke Thank You Page
    ↓ Tampil:
      - Ikon centang hijau besar
      - Heading: "Terima Kasih atas Donasi Anda!"
      - Subheading: "Donasi Anda sangat berarti"
      - Reference Number: PK487100487 (generated)
      - Label Status: "BERHASIL" (badge hijau)
      - Pesan: "Donasi Anda akan segera diverifikasi"
      - Tombol "Kembali ke Home"
      - Tombol "Lihat Project Lain"
    ↓
    🚨 MASALAH KRITIS:
    ❌ Status "BERHASIL" membuat donatur berpikir donasi sudah disetujui
    ❌ Padahal donasi masih PENDING dan perlu approval Superadmin
    ❌ Tidak ada info: "Status: Menunggu Verifikasi"
    ❌ Tidak ada link: "Cek Status Donasi"
    ❌ Tidak ada instruksi: "Simpan nomor referensi ini untuk konfirmasi"
    ↓
19. Donatur klik "Kembali ke Home"
    ↓ Redirect ke Home
    ↓
END

🚨 FLOW TERPUTUS TOTAL SETELAH INI:
- Donatur tidak tahu status donasi
- Donatur tidak dapat notifikasi approved/rejected
- Donatur tidak punya dashboard untuk tracking donasi
- Jika ditolak, donatur tidak tahu cara upload ulang bukti
```

---

### E. Dampak ke Role Lain

| Aksi Donatur | Dampak ke Role Lain | Status Saat Ini |
|--------------|---------------------|-----------------|
| **Upload bukti donasi** | • Superadmin seharusnya dapat item baru di "Verifikasi Donasi" | ❌ Tidak sinkron (data di frontend only) |
| **Donasi approved** | • Wallet project bertambah<br>• PIC lihat dana masuk | ❌ Tidak terjadi (flow terputus) |

---

### F. Flow yang Belum Ditutup

1. **Setelah upload bukti → Tidak ada tracking**
   - Donatur tidak punya halaman "Riwayat Donasi"
   - Tidak bisa cek: "Donasi saya diapprove atau belum?"

2. **Tidak ada notifikasi setelah Superadmin approve/reject**
   - Donatur tidak tahu kapan donasi disetujui
   - Tidak ada email konfirmasi
   - Tidak ada notifikasi in-app

3. **Jika donasi di-reject → Tidak ada cara upload ulang**
   - Donatur tidak tahu alasan penolakan
   - Tidak ada mekanisme resubmit bukti
   - Donasi stuck di pending selamanya dari sudut pandang donatur

4. **Jika lupa reference number → Tidak bisa retrieve**
   - Tidak ada dashboard donatur
   - Tidak ada email yang berisi reference number
   - Donatur kehilangan cara untuk tracking

5. **Tidak ada estimasi waktu verifikasi**
   - Donatur tidak tahu: "Berapa lama verifikasi biasanya?"
   - Tidak ada SLA atau timeline yang jelas

---

### G. Potensi Kebingungan dari Sisi UX

1. **Thank You Page menampilkan kesan donasi "sudah selesai"**
   - Badge "BERHASIL" hijau → seolah approved
   - Padahal masih pending
   - Donatur bisa berpikir dana sudah diterima project

2. **Tidak ada instruksi jelas: "Simpan nomor referensi ini"**
   - Reference number ditampilkan tapi tidak ada CTA "Salin Nomor Referensi"
   - Donatur bisa lupa atau tidak screenshot

3. **Pilihan metode pembayaran QRIS menampilkan "Scan QR Code" sebagai "nomor akun"**
   - Tidak ada QR code yang actual ditampilkan
   - Donatur bingung: "QR code-nya mana?"

4. **Tidak ada payment timer**
   - Donatur bisa transfer besok/lusa dengan unique code yang sama
   - Jika code expired, transfer tetap masuk tapi tidak bisa dicocokkan

---

## 🔘 ALUMNI-GUEST (ZOMBIE ROLE)

### Kondisi Aktual di Kodebase

Role `alumni-guest` **didefinisikan** di `App.tsx` sebagai salah satu nilai valid untuk `userRole`:

```typescript
type UserRole = 'guest' | 'donatur' | 'alumni' | 'alumni-guest';
```

Namun:

**❌ Tidak ada halaman registrasi yang menghasilkan role `alumni-guest`**  
**❌ Tidak ada komponen yang menangani tampilan khusus untuk role ini**  
**❌ `Login.tsx` hanya menghasilkan `'donatur'` atau `'alumni'` — tidak ada `'alumni-guest'`**  
**❌ Di semua conditional rendering di `App.tsx`, tidak ada kondisi `userRole === 'alumni-guest'`**

### Kesimpulan

Role `alumni-guest` adalah **zombie role** — didefinisikan tapi tidak pernah digunakan dalam flow manapun.

### Kemungkinan Intent Asli

Berdasarkan nama, kemungkinan intent:

```
alumni-guest = Alumni yang sudah daftar tapi belum diverifikasi oleh Moderator
```

Flow yang seharusnya ada:

```
1. User daftar sebagai Alumni
    ↓ Isi form registrasi + data alumni (angkatan, jurusan, dll)
    ↓ Submit
    ↓ Role: 'alumni-guest' (belum terverifikasi)
    ↓ User bisa login tapi akses terbatas
    ↓
2. Moderator verify data alumni di Admin Panel
    ↓ Moderator cek angkatan, jurusan, riwayat Saladin Camp
    ↓ Jika valid: Approve → upgrade ke role 'alumni' penuh
    ↓ Jika tidak valid: Reject → tetap 'alumni-guest' atau banned
    ↓
3. Setelah approved:
    ↓ Alumni mendapat notifikasi: "Akun Anda telah diverifikasi!"
    ↓ Alumni bisa akses penuh fitur alumni
```

**Status:** Flow ini **belum diimplementasikan sama sekali**.

---

## 3️⃣ FLOW PER FITUR (LINTAS ROLE)

---

### 📋 REGISTRASI

**Lokasi:** `Login.tsx` dengan mode `'register'`

```
User buka Login Page
    ↓ Toggle mode: Login / Daftar (pilih "Daftar")
    ↓ Form registrasi tampil
    ↓ Field:
      - Email (wajib)
      - Password (wajib)
      - Konfirmasi Password (wajib)
    ↓ User isi form
    ↓ Klik "Daftar"
    ↓
    VALIDASI:
    - Email format valid (regex)
    - Password min 8 karakter
    - Password & Konfirmasi Password harus sama
    ↓ Jika valid:
    ↓ Loading 800ms
    ↓ Toast success: "Registrasi berhasil!"
    ↓ Otomatis login dengan role yang dipilih di toggle (Donatur/Alumni)
    ↓ Redirect ke Home
    ↓
    ⚠️ KONDISI SAAT INI:
    ❌ Tidak ada verifikasi email (tidak ada email confirmation)
    ❌ Tidak ada perbedaan flow registrasi Donatur vs Alumni
    ❌ Tidak ada form data alumni tambahan (angkatan, jurusan, dll)
    ❌ User langsung bisa akses penuh tanpa verifikasi identitas
    ↓
END
```

**🚨 GAP KRITIS:**
1. Alumni bisa daftar tanpa verifikasi → siapapun bisa claim sebagai alumni
2. Tidak ada form data alumni saat registrasi → data profil kosong
3. Tidak ada role `alumni-guest` untuk alumni yang belum diverifikasi

---

### 🔑 LOGIN

**Lokasi:** `Login.tsx` dengan mode `'login'`

```
User buka Login Page
    ↓ Toggle role: Donatur | Alumni
    ↓ Isi email & password
    ↓ Klik "Masuk"
    ↓
    VALIDASI:
    - Email format valid
    - Password tidak kosong
    ↓ Jika ada error:
    ↓ Toast error muncul
    ↓ Inline error message di field
    ↓ STOP
    ↓ Jika valid:
    ↓ Loading 800ms (simulasi API call)
    ↓ Toast success: "Login berhasil!"
    ↓ localStorage.setItem('userRole', role)
    ↓ Redirect ke Home
    ↓
END
```

**✅ Flow lengkap (untuk frontend-only system)**

---

### 🔍 LIHAT PROJECT

**Jalur 1: dari Home**
```
Home
    ↓ User scroll ke section "Project Terbaru"
    ↓ Klik project card
    ↓ currentView = 'project-detail'
    ↓
    IF userRole === 'alumni':
        ↓ Render ProjectDetailAlumni (5 tab)
    ELSE:
        ↓ Render ProjectDetail (basic)
    ↓
END
```

**Jalur 2: dari Explore**
```
Home
    ↓ Klik menu "Explore" di bottom nav
    ↓ ExploreProject terbuka
    ↓ User klik tab "Open Volunteer" atau "Galeri"
    ↓ User klik project card
    ↓ currentView = 'project-detail'
    ↓ Render component sesuai role
    ↓
END
```

**✅ Flow lengkap**

---

### 💸 DONASI (LINTAS ROLE)

**Role yang bisa donasi:** Guest, Donatur, Alumni

Lihat flow detail di section **Donatur** → Flow Utama: Donasi (sudah dijelaskan lengkap).

**Ringkasan step:**
1. Pilih nominal → Konfirmasi → Upload bukti → Thank You
2. **Gap:** Setelah upload bukti, tidak ada tracking status donasi

---

### ✅ APPROVAL DONASI (SUPERADMIN)

Lihat flow detail di section **Superadmin** → Flow 1: Verifikasi Donasi.

**Gap:**
- Approve → Tidak update balik ke donatur & wallet
- Reject → Donatur tidak tahu

---

### 📝 UPDATE STATUS PROJECT (PIC)

Lihat flow detail di section **PIC** → Flow 2: Buat Progress Update.

**Gap:**
- Publish update → Alumni tidak dapat notif

---

### 🚪 TUTUP PROJECT (TIDAK ADA)

**Status:** Fitur **belum diimplementasikan**.

Flow yang dibutuhkan:
```
PIC request close project
    ↓ Isi alasan penutupan
    ↓ Superadmin review
    ↓ Superadmin approve
    ↓ Project status = 'closed'
    ↓ Donasi baru diblock
    ↓ Pending donations auto-rejected
    ↓ Sisa dana di-redistribute atau refund
```

---

### 💼 LIHAT WALLET (ALUMNI MEMBER)

Lihat flow detail di section **Alumni** → Flow 3: Akses Tab Wallet.

**Gap:**
- Data wallet tidak terisolasi per project
- Semua alumni lihat data yang sama

---

## 4️⃣ IDENTIFIKASI FLOW YANG TERPUTUS ANTAR ROLE

### 🔴 CRITICAL: Flow Donasi (Donatur/Alumni → Superadmin → Donatur)

```
[DONATUR/ALUMNI]
    ↓ Upload bukti transfer
    ↓ Lihat "Terima kasih!"
    ↓ 🚫 TERPUTUS 🚫 Tidak tahu status donasi setelah ini
    ↓ Tidak ada notifikasi
    ↓ Tidak ada dashboard tracking

[SUPERADMIN]
    ↓ Buka Verifikasi Donasi
    ↓ Lihat bukti → Approve
    ↓ 🚫 TERPUTUS 🚫 State donasi tidak berubah
    ↓ Wallet tidak bertambah
    ↓ Donatur tidak dapat notif

[DONATUR/ALUMNI]
    ↓ 🚫 TIDAK PERNAH TAHU 🚫 apakah donasi diapprove atau tidak
```

**SOLUSI YANG DIBUTUHKAN:**
1. Superadmin approve → Update status donasi di database
2. Superadmin approve → Kirim notifikasi/email ke donatur
3. Superadmin approve → Update wallet project
4. Superadmin approve → Notif ke PIC: "Donasi baru masuk"
5. Donatur punya dashboard: "Riwayat Donasi" dengan status real-time

---

### 🔴 CRITICAL: Flow Join Project (Alumni → PIC → Alumni)

```
[ALUMNI]
    ↓ Submit join request
    ↓ Lihat badge "Menunggu Persetujuan"
    ↓ 🚫 TERPUTUS 🚫 Tidak ada update setelah ini
    ↓ Tidak tahu kapan PIC akan review

[PIC]
    ↓ Buka Pengajuan Join
    ↓ Approve alumni
    ↓ 🚫 TERPUTUS 🚫 Alumni tidak dapat notifikasi
    ↓ Status di UI alumni tidak berubah otomatis

[ALUMNI]
    ↓ Harus refresh manual untuk tahu diapprove
    ↓ Jika ditolak: 🚫 TIDAK PERNAH TAHU 🚫
    ↓ Status tetap "pending" selamanya
```

**SOLUSI YANG DIBUTUHKAN:**
1. PIC approve → Kirim notifikasi ke alumni
2. PIC reject → Kirim notifikasi + alasan ke alumni
3. Alumni punya dashboard: "Status Pengajuan"
4. Alumni bisa batalkan join request jika masih pending

---

### 🟠 HIGH: Flow Progress Update (PIC → Alumni)

```
[PIC]
    ↓ Publish progress update
    ↓ Update muncul di tab Konten Admin Panel
    ↓ 🚫 TERPUTUS 🚫 Alumni tidak dapat notifikasi

[ALUMNI MEMBER]
    ↓ Harus buka tab Progress manual
    ↓ Tidak tahu ada update baru
    ↓ Tidak ada badge "New" atau "Unread"
```

**SOLUSI YANG DIBUTUHKAN:**
1. PIC publish → Kirim notif ke semua member project
2. Tab Progress tampilkan badge "New" untuk update yang belum dibaca
3. Alumni bisa subscribe notifikasi per project

---

### 🟠 HIGH: Flow Task Delegasi (PIC → Alumni → PIC)

```
[PIC]
    ↓ Assign task ke alumni
    ↓ Task muncul di list Delegasi PIC
    ↓ 🚫 TERPUTUS 🚫 Alumni tidak dapat notifikasi

[ALUMNI]
    ↓ Buka tab Tasks (harus cek manual)
    ↓ Lihat task baru
    ↓ Update status task: "In Progress"
    ↓ 🚫 TERPUTUS 🚫 PIC tidak dapat notifikasi

[PIC]
    ↓ Harus refresh manual untuk lihat status terupdate
```

**SOLUSI YANG DIBUTUHKAN:**
1. PIC assign task → Notif ke alumni
2. Alumni update status → Notif ke PIC
3. Reminder otomatis jika task mendekati deadline

---

### 🟠 HIGH: Flow Withdrawal (PIC → Superadmin → PIC)

**Status:** Flow **belum ada sama sekali**.

Flow yang dibutuhkan:
```
[PIC]
    ↓ Request withdrawal
    ↓ Isi nominal + alasan + rekening

[SUPERADMIN]
    ↓ Review withdrawal request
    ↓ Approve/Reject

[PIC]
    ↓ Dapat notifikasi hasil approval
    ↓ Jika approve: Dana cair + wallet berkurang
    ↓ Jika reject: Dapat feedback & bisa revisi
```

---

### 🟡 MEDIUM: Flow Hapus Konten (Moderator → PIC)

```
[MODERATOR]
    ↓ Hapus konten project karena melanggar aturan
    ↓ Konten hilang dari project
    ↓ 🚫 TERPUTUS 🚫 PIC tidak dapat notifikasi

[PIC]
    ↓ Tidak tahu kontennya dihapus
    ↓ Buka tab Konten → konten hilang
    ↓ Bingung: "Kemana konten saya?"
```

**SOLUSI YANG DIBUTUHKAN:**
1. Moderator hapus konten → Kirim notifikasi + alasan ke PIC
2. PIC bisa request review: "Konten ini tidak melanggar"
3. Audit log: Siapa hapus konten kapan

---

### 🟡 MEDIUM: Flow Edit Data Alumni (Moderator → Alumni)

```
[MODERATOR]
    ↓ Edit data alumni (angkatan, email, dll)
    ↓ Data terupdate di database
    ↓ 🚫 TERPUTUS 🚫 Alumni tidak dapat notifikasi

[ALUMNI]
    ↓ Tidak tahu data mereka diubah
    ↓ Buka Settings → lihat data berbeda
    ↓ Bingung: "Siapa yang ubah data saya?"
```

**SOLUSI YANG DIBUTUHKAN:**
1. Moderator edit data → Notif ke alumni: "Data Anda telah diperbarui"
2. Alumni bisa lihat audit log: "Diubah oleh Moderator X pada tanggal Y"

---

## 5️⃣ LOOP YANG BELUM LENGKAP

### ❌ LOOP 1: Donatur Submit Bukti → Approval → Feedback

**Current state:**
```
Donatur submit bukti → END
(Tidak pernah dapat feedback apakah approved/rejected)
```

**Loop yang lengkap:**
```
Donatur submit bukti
    → Superadmin approve
    → Donatur dapat notif "Donasi disetujui"
    → Wallet project bertambah
    → PIC dapat notif "Dana masuk"
    → LOOP TERTUTUP
```

---

### ❌ LOOP 2: Alumni Apply Join → Approval → Akses Member

**Current state:**
```
Alumni apply join → Status "pending" → END
(Alumni tidak tahu hasilnya)
```

**Loop yang lengkap:**
```
Alumni apply join
    → PIC approve
    → Alumni dapat notif
    → Alumni refresh → Tab Discussion/Wallet terbuka
    → LOOP TERTUTUP
```

---

### ❌ LOOP 3: PIC Publish Update → Alumni Baca

**Current state:**
```
PIC publish update → END
(Alumni tidak tahu ada update baru)
```

**Loop yang lengkap:**
```
PIC publish update
    → Alumni dapat notif
    → Alumni buka tab Progress
    → Alumni baca update
    → Update marked as "read"
    → LOOP TERTUTUP
```

---

### ❌ LOOP 4: PIC Assign Task → Alumni Selesai → PIC Verify

**Current state:**
```
PIC assign task → Alumni update status → END
(PIC tidak tahu task sudah selesai)
```

**Loop yang lengkap:**
```
PIC assign task
    → Alumni dapat notif
    → Alumni update status "In Progress"
    → PIC dapat notif
    → Alumni update status "Done"
    → PIC dapat notif
    → PIC verify & approve
    → LOOP TERTUTUP
```

---

### ❌ LOOP 5: PIC Request Withdrawal → Superadmin Approve → Dana Cair

**Current state:**
```
Flow ini belum ada sama sekali
```

**Loop yang lengkap:**
```
PIC request withdrawal
    → Superadmin review
    → Superadmin approve
    → PIC dapat notif
    → Dana cair ke rekening
    → Wallet project berkurang
    → LOOP TERTUTUP
```

---

### ✅ LOOP YANG SUDAH LENGKAP

**LOOP: Alumni Vote di Polling**
```
PIC buat polling
    → Alumni buka tab Voting
    → Alumni vote
    → Hasil voting terupdate
    → PIC lihat hasil
    → LOOP TERTUTUP ✅
```

---

## 6️⃣ RANGKUMAN: TITIK KRITIS YANG HARUS DIPERBAIKI

### 🔴 PRIORITAS 1 (BLOCKING — HARUS SEGERA)

| # | Flow | Masalah | Dampak | Solusi Singkat |
|---|------|---------|--------|---------------|
| 1 | **Donasi → Approval** | Superadmin approve tidak update state | Wallet tidak bertambah, donatur tidak tahu | Hook state update + notifikasi |
| 2 | **Join Request → Approval** | Alumni tidak dapat notif hasil approval | Alumni stuck di pending selamanya | Notifikasi + update UI otomatis |
| 3 | **Wallet Project** | Data wallet tidak terisolasi per project | Semua alumni lihat data yang sama | Filter transaksi by projectId |
| 4 | **Donatur Dashboard** | Tidak ada halaman tracking donasi | Donatur tidak bisa cek status | Buat halaman "Riwayat Donasi" |
| 5 | **PIC Add Expense** | PIC tambah pengeluaran tanpa approval | Fraud risk tinggi | Tambah approval flow dari Superadmin |

---

### 🟠 PRIORITAS 2 (HIGH — PENTING UNTUK UX)

| # | Flow | Masalah | Solusi Singkat |
|---|------|---------|---------------|
| 6 | **Progress Update** | Alumni tidak dapat notif update baru | Notifikasi push/in-app |
| 7 | **Task Delegasi** | PIC & Alumni tidak dapat notif mutual | Notifikasi 2 arah |
| 8 | **Withdrawal Dana** | Flow belum ada | Buat fitur withdrawal request |
| 9 | **Hapus Konten** | PIC tidak tahu kontennya dihapus Moderator | Notifikasi + audit log |
| 10 | **Payment Timer** | Donasi tidak ada expiry time | Tambah countdown 24 jam |

---

### 🟡 PRIORITAS 3 (MEDIUM — COMPLETION)

| # | Flow | Masalah | Solusi Singkat |
|---|------|---------|---------------|
| 11 | **Refund Flow** | Tidak ada mekanisme refund | Buat flow refund lengkap |
| 12 | **Project Closed** | Tidak ada fitur close project | Handler untuk project closed |
| 13 | **Alumni-Guest** | Role zombie, tidak terpakai | Implement flow verifikasi alumni |
| 14 | **Registrasi** | Tidak ada verifikasi identitas alumni | Tambah form data alumni + approval Moderator |

---

## 🎯 KESIMPULAN AKHIR

### ✅ YANG SUDAH BAIK

1. **Voting/Polling Flow** — Loop lengkap dari PIC → Alumni → Hasil
2. **UI Component** — Visual sudah solid, tinggal sambungkan logic
3. **Role Separation** — Struktur role sudah jelas (Superadmin, Moderator, PIC, Alumni, Donatur)

### ❌ YANG MASIH TERPUTUS

1. **Komunikasi Antar Role** — Hampir semua flow tidak punya notifikasi balik
2. **Finansial Flow** — Approval donasi & withdrawal tidak fungsional
3. **Data Isolation** — Wallet tidak terisolasi per project
4. **Donatur Experience** — Tidak ada tracking setelah submit donasi

### 🔄 FLOW PRIORITAS YANG HARUS DITUTUP SEGERA

1. **Donasi End-to-End** (Donatur → Superadmin → Wallet → PIC)
2. **Join Project End-to-End** (Alumni → PIC → Alumni)
3. **Wallet Isolation** (Filter by projectId)
4. **Donatur Dashboard** (Tracking donasi)
5. **PIC Expense Approval** (Maker-Checker)

---

**Dokumen ini adalah snapshot lengkap flow sistem Almaqdisi versi saat ini (19 Feb 2026).**  
**Next step: Pembahasan teknis implementasi untuk menutup flow yang terputus.**

---

> **Catatan:** Dokumen ini fokus pada FLOW INTERAKSI antar role dan tidak membahas aspek keamanan, database, atau server-side logic sesuai instruksi.
