# 📋 DOKUMENTASI LENGKAP ADMIN PANEL V2 - ALMAQDISI PROJECT

> **CATATAN PENTING:**
> - Aplikasi ini **BUKAN e-commerce**
> - **TIDAK ADA** proses order, payment, atau checkout
> - Semua data saat ini **HARDCODE/MOCK di frontend**
> - **Backend BELUM ADA**
> - Admin panel **100% berdasarkan fitur yang SUDAH ADA di frontend**

---

## 🎯 KONSEP UTAMA (REVISI FUNDAMENTAL)

### **PIC = PERSON IN CHARGE OF PROJECT (PROJECT LEADER)**

**BUKAN** alumni manager, tapi **Project Manager/Leader** yang bertanggung jawab atas 1 proyek spesifik!

```
STRUKTUR ORGANISASI:

SUPERADMIN (Level 3)
  ↓ mengelola platform & konten global
  
MODERATOR (Level 2)
  ↓ moderasi konten & approve proyek baru
  
PIC / PROJECT LEADER (Level 1)
  ↓ mengelola 1 PROJECT spesifik
  
MEMBERS (Alumni yang join project)
```

---

## 📊 KONTEN YANG ADA DI FRONTEND (BASIS ADMIN PANEL)

Berdasarkan analisis aplikasi AlMaqdisi Project, berikut adalah konten yang **SUDAH ADA** di frontend:

### 1. **PROYEK KEMANUSIAAN**
- Bantuan Pangan Gaza
- Sekolah Online Anak Gaza
- Bantuan Air Bersih Gaza
- Rehabilitasi Yatim Palestina
- Dan proyek-proyek lainnya dengan kategori: Pendidikan, Kesehatan, Lingkungan

**Setiap Proyek Punya:**
- 1 PIC (Project Leader)
- Multiple Members (Alumni yang sudah di-approve join)
- Pending Members (Alumni yang apply tapi belum di-approve)
- 5 Tab: Overview, Progress, Members, Discussion, Wallet
- Dana Internal & Dana Umum
- Polling/Voting untuk keputusan
- Status: Open Volunteer, Running, Completed

### 2. **ALUMNI (End Users)**
- Data alumni (nama, email, phone, angkatan, jurusan, pekerjaan, dll)
- Status alumni (active/inactive)
- Bisa join project (submit dengan komitmen durasi)
- Setelah di-approve → jadi Member project
- Bisa diskusi di project yang mereka join

### 3. **MEMBER PROJECT**
- Alumni yang sudah di-approve join suatu project
- Punya komitmen durasi (1 bulan, 3 bulan, 6 bulan, 1 tahun, hingga selesai)
- Bisa akses 5 tab project (Overview, Progress, Members, Discussion, Wallet)
- Bisa ikut polling yang dibuat PIC
- Bisa jadi kandidat untuk diangkat jadi PIC baru (delegasi)

---

## 👥 ROLE ADMIN & PERMISSION MATRIX (REVISI TOTAL)

### HIERARKI ROLE
```
SUPERADMIN (Level 3 - Tertinggi)
    ↓ mengelola platform, konten global, semua proyek
MODERATOR (Level 2 - Menengah)
    ↓ moderasi konten, approve proyek baru, assign PIC
PIC / PROJECT LEADER (Level 1 - Project Manager)
    ↓ mengelola 1 PROJECT spesifik
MEMBERS (Alumni yang join project - bukan admin)
```

---

## 1️⃣ ROLE: **PIC (Person In Charge / Project Leader)**

### **TANGGUNG JAWAB UTAMA:**
PIC adalah **Project Manager** yang mengelola 1 proyek kemanusiaan spesifik dari awal sampai selesai.

### **AKSES YANG BOLEH:**

#### **A. MANAJEMEN MEMBER PROJECT**
✅ Melihat list alumni yang apply join project mereka
✅ **Approve pengajuan** alumni yang ingin join (ubah status dari "pending" → "member")
✅ **Reject pengajuan** alumni yang tidak sesuai kriteria
✅ Melihat list member yang sudah join (dengan detail komitmen mereka)
✅ Melihat detail setiap member (nama, email, angkatan, komitmen durasi, dll)
✅ Kick/remove member dari project (dengan alasan)
✅ Melihat riwayat kontribusi member
✅ Mengirim notifikasi/pesan ke member project

#### **B. MANAJEMEN FINANSIAL PROJECT**
✅ **Update dana internal** (dana dari member/alumni sendiri)
✅ **Update dana umum** (dana dari donatur publik)
✅ Input pengeluaran/expense project
✅ Melihat histori transaksi dana
✅ Export laporan keuangan project (untuk transparansi)
✅ Request dana tambahan ke Moderator/Superadmin

#### **C. MANAJEMEN KONTEN PROJECT**
✅ **Edit overview project** (deskripsi, tujuan, target)
✅ Update progress project (milestone, persentase completion)
✅ Upload foto ke galeri project
✅ Posting update/berita terbaru di project
✅ Edit detail project (kecuali: title, kategori, status global)

#### **D. ENGAGEMENT & DECISION MAKING**
✅ **Membuat polling/voting** untuk keputusan project
✅ Melihat hasil polling real-time
✅ Menutup polling dan announce hasil
✅ Membuka/menutup diskusi tertentu
✅ Moderasi diskusi project (hapus comment spam)

#### **E. DELEGASI & TRANSISI**
✅ **Delegasi jabatan PIC** ke member lain yang kompeten
✅ Melihat statistik member (untuk pilih kandidat PIC baru)
✅ Request approval delegasi ke Moderator (untuk validasi)

#### **F. REPORTING & ANALYTICS**
✅ Melihat dashboard statistik project mereka
✅ Export laporan project (PDF/Excel)
✅ Melihat activity log project mereka

### **AKSES YANG TIDAK BOLEH:**
❌ Melihat/mengelola project lain (hanya project mereka)
❌ Melihat data alumni yang TIDAK apply ke project mereka
❌ Menghapus project
❌ Mengubah status project tanpa approval Moderator
❌ Membuat project baru
❌ Melihat/mengelola PIC lain
❌ Melihat financial data project lain
❌ Akses ke manajemen konten global (kisah alumni, event)
❌ Akses ke pengaturan sistem

---

## 2️⃣ ROLE: **MODERATOR**

### **TANGGUNG JAWAB UTAMA:**
Moderator adalah **Content Moderator & Project Supervisor** yang memastikan semua proyek berjalan sesuai aturan dan konten berkualitas.

### **AKSES YANG BOLEH:**

#### **A. SUPERVISI PROJECT**
✅ Melihat **SEMUA project** (dari semua PIC)
✅ Melihat dashboard finansial semua project (untuk audit)
✅ Melihat member semua project
✅ Melihat pending requests semua project
✅ Melihat activity log semua project
✅ Export laporan global (semua project)

#### **B. MANAJEMEN PIC**
✅ **Membuat project baru** dan **assign PIC**
✅ Melihat list semua PIC
✅ **Approve/reject request delegasi PIC**
✅ **Replace PIC** jika PIC tidak aktif/bermasalah
✅ Menonaktifkan PIC (dengan alasan)
✅ Melihat performance metrics setiap PIC

#### **C. MODERASI KONTEN**
✅ **Approve/reject project baru** yang diajukan
✅ Moderasi konten project (edit/hapus jika melanggar aturan)
✅ Moderasi diskusi di semua project
✅ Hapus member bermasalah dari project
✅ Freeze project jika ada masalah serius

#### **D. MANAJEMEN KONTEN GLOBAL**
✅ Membuat/edit/hapus **Kisah Alumni**
✅ Membuat/edit/hapus **Event**
✅ Moderasi galeri project (hapus foto tidak pantas)
✅ Publish/unpublish konten

### **AKSES YANG TIDAK BOLEH:**
❌ Mengubah finansial project (hanya bisa melihat)
❌ Join project sebagai member (hanya supervisi)
❌ Menghapus Moderator lain atau Superadmin
❌ Akses ke pengaturan sistem global
❌ Mengubah role menjadi Superadmin
❌ Approve financial request > limit tertentu (butuh Superadmin)

---

## 3️⃣ ROLE: **SUPERADMIN**

### **AKSES YANG BOLEH:**
✅ **FULL ACCESS ke SEMUA fitur**
✅ Semua akses Moderator +
✅ Mengelola Moderator (create, edit, delete, assign)
✅ Mengelola PIC langsung (bypass Moderator)
✅ **Approve financial request > limit**
✅ Akses ke pengaturan sistem global
✅ Backup & restore data
✅ Melihat & edit semua log aktivitas
✅ Force delete project (permanent)
✅ Suspend/ban user (alumni) dari platform

---

## 🧱 STRUKTUR HALAMAN ADMIN PANEL

### **HALAMAN UTAMA:**

1. **Dashboard** (berbeda per role)
2. **Manajemen Member Project** (PIC)
3. **Manajemen Finansial Project** (PIC)
4. **Polling & Voting** (PIC)
5. **Delegasi PIC** (PIC)
6. **Edit Overview Project** (PIC)
7. **Update Progress Project** (PIC)
8. **Manajemen Project** (Moderator/Superadmin)
9. **Manajemen PIC** (Moderator/Superadmin)
10. **Manajemen Kisah Alumni** (Moderator/Superadmin)
11. **Manajemen Event** (Moderator/Superadmin)
12. **Activity Log** (semua role, scope berbeda)
13. **Settings** (Superadmin only)

---

## 🔄 FLOW UTAMA

### **FLOW 1: Alumni Apply Join Project**
1. Alumni browse project → klik "Join Project"
2. Isi form (komitmen durasi, alasan, keahlian)
3. Submit → status PENDING
4. Notifikasi ke PIC
5. PIC review di admin panel

### **FLOW 2: PIC Approve/Reject Member**
1. PIC login → lihat pending requests
2. Review detail pengajuan
3. Approve → member aktif, grant akses 5 tab
4. Reject → kirim feedback ke alumni

### **FLOW 3: PIC Update Dana**
1. PIC masuk halaman Finansial
2. Klik "Update Dana Internal/Umum"
3. Isi form (tanggal, sumber, jumlah, bukti)
4. Submit → update balance, log activity

### **FLOW 4: PIC Buat Polling**
1. PIC masuk halaman Polling
2. Klik "Buat Polling Baru"
3. Isi form (judul, deskripsi, opsi, deadline)
4. Publish → notifikasi ke semua member
5. Member vote → PIC lihat hasil real-time

### **FLOW 5: PIC Delegasi Jabatan**
1. PIC pilih kandidat dari member
2. Isi alasan delegasi
3. Submit request → ke Moderator
4. Moderator approve → kandidat terima offer
5. Kandidat accept → transition period
6. Auto-complete → PIC baru aktif

---

## 🔐 VALIDASI & KEAMANAN

### **1. VALIDASI INPUT**
- Form join project: komitmen required, alasan min 50 char
- Form update dana: jumlah min Rp 1.000, bukti required untuk dana umum
- Form expense: warning jika > Rp 5jt (butuh approval)
- Form polling: min 2 opsi, deadline min 1 hari
- Form delegasi: kandidat min 7 hari member, konfirmasi text exact match

### **2. ACCESS CONTROL**
- PIC hanya akses project mereka
- Moderator read-only untuk finansial
- Superadmin full override
- Conditional rendering berdasarkan role

### **3. FINANCIAL SECURITY**
- Expense < Rp 5jt: auto-approve
- Expense Rp 5-10jt: butuh Moderator approval
- Expense > Rp 10jt: butuh Superadmin approval
- Semua transaksi logged

### **4. DELEGATION SECURITY**
- Multi-step approval (PIC → Moderator → Candidate)
- Transition period untuk handover
- Irreversible setelah complete
- Full audit trail

---

## ✅ CHECKLIST IMPLEMENTASI

### **Phase 1: Core PIC Features**
- [ ] Dashboard PIC
- [ ] Manajemen Member (approve/reject)
- [ ] Update Dana Internal/Umum
- [ ] Tambah Expense
- [ ] Buat Polling
- [ ] Edit Overview
- [ ] Update Progress

### **Phase 2: Moderator Features**
- [ ] Dashboard Moderator
- [ ] Manajemen Project (create, assign PIC)
- [ ] Approve Delegasi PIC
- [ ] Manajemen Kisah Alumni
- [ ] Manajemen Event

### **Phase 3: Advanced Features**
- [ ] Delegasi PIC (full flow)
- [ ] Financial approval workflow
- [ ] Activity Log (filtered per role)
- [ ] Export laporan

### **Phase 4: Superadmin**
- [ ] Dashboard Superadmin
- [ ] Manajemen Moderator
- [ ] System Settings
- [ ] Backup/Restore

---

**END OF DOCUMENTATION V2**
