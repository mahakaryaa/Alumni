# 🔍 UX AUDIT REPORT — ALMAQDISI PROJECT

**Versi Audit:** Full System Review
**Tanggal:** 18 Feb 2026
**Auditor Role:** Senior Product Designer & UX Auditor
**Metode:** Code-based analysis + Flow simulation + Risk scoring

---

## 1️⃣ USER FLOW ANALYSIS — END-TO-END

### 📌 Flow: Registrasi & Login

```
[Landing Page]
     ↓
[Klik Login]
     ↓
[Login.tsx] → Toggle: Donatur | Alumni
     ↓
[localStorage.setItem(USER_ROLE)]
     ↓
[Redirect ke Home]
```

**🔴 Temuan Kritis:**

| # | Masalah | Dampak |
|---|---------|--------|
| 1 | Tidak ada autentikasi nyata — role disimpan di `localStorage` tanpa token/session | Siapapun bisa manipulasi role via browser DevTools |
| 2 | `alumni-guest` role ada di App.tsx tapi tidak ada flow registrasi yang jelas | User bisa terjebak di limbo state |
| 3 | Tidak ada verifikasi identitas alumni | Orang luar bisa klaim sebagai alumni |
| 4 | Password tidak divalidasi kekuatannya — hanya regex dasar | Brute-force tidak dicegah di frontend |
| 5 | `ProjectDetailAlumni.tsx` mobile header masih menampilkan "ProjekKita" | Inkonsistensi brand yang membingungkan |

**Rekomendasi:** Pisahkan state `isAuthenticated` dari `userRole`. Gunakan JWT token di localStorage bukan raw role string. Tambahkan protected route wrapper berbasis role.

---

### 📌 Flow: Donasi (End-to-End)

```
[Project Detail]
     ↓ klik "Donasi"
[DonationPage - Step 1: Pilih Nominal]
     ↓ handleConfirmDonation()
[Step 2: Konfirmasi Modal - tampil no rekening + unique code]
     ↓ Transfer manual oleh user
[Step 3: Upload Bukti Transfer]
     ↓ handleSubmitProof()
[setTimeout 1500ms → showThankYou = true]
     ↓
[Thank You Page — status: SELESAI?]
```

**🔴 Critical Gap di Flow Ini:**

```
MASALAH: Step 3 → Thank You page TIDAK menunjukkan status PENDING.
Setelah upload, user langsung melihat "Terima kasih!" padahal:
1. Bukti belum diverifikasi admin
2. Dana belum masuk wallet
3. User tidak tahu donasi-nya masih perlu approval
```

**Friction Points yang Ditemukan:**

| Step | Friction | Risk Level |
|------|----------|------------|
| Pemilihan nominal | Tidak ada minimum/maximum yang jelas di UI (hanya di validation) | Low |
| Unique code generation | `Math.random()` — bisa duplikat antar session | Medium |
| Reference number | `PK${Date.now().slice(-8)}${uniqueCode}` — hanya 11 karakter, collision mungkin | Medium |
| Konfirmasi donasi | Tidak ada timer/expiry untuk no rekening | High |
| Upload bukti | `validateFile()` ada tapi tidak dicek tipe MIME sesungguhnya (hanya extension) | Medium |
| Submit proof | `setTimeout(resolve, 1500)` — selalu resolve, tidak ada real failure path | Critical |
| Post-submit | User tidak mendapat status tracking (pending/approved/rejected) | High |
| Double submit | Tombol "Submit" tidak di-disable setelah klik pertama | High |

---

## 2️⃣ DONATION FLOW RISK ANALYSIS

### ❓ Apakah ada kemungkinan dana tidak tercatat?

**YA.** `handleSubmitProof()` menjalankan `setTimeout` yang selalu resolve. Tidak ada persistence ke backend. Data donasi tidak tersimpan ke database atau state global. Jika user refresh setelah submit, donasi hilang dari sisi user.

### ❓ Apakah ada kemungkinan donasi di-approve tanpa validasi?

**YA.** Di `DonationVerification.tsx`:

```tsx
// Approve button tidak memerlukan user untuk klik "Lihat Bukti" terlebih dahulu
// Tombol approve muncul langsung bersamaan dengan tombol "Lihat Bukti Transfer"
<button onClick={() => { setSelectedDonation(donation); setShowApproveModal(true); }}>
  Approve  // ← bisa diklik tanpa pernah melihat proof
</button>
```

### ❓ Apakah sistem bisa double counting?

**YA, risiko tinggi.**
- `handleApprove()` di `DonationVerification.tsx` hanya memanggil `showToast.success()` — tidak mengubah state `mockDonations`
- Donasi yang "di-approve" tetap muncul di pending list
- Secara teoritis, 1 donasi bisa di-approve berkali-kali di sesi berbeda

### ❓ Apakah wallet project benar-benar terisolasi?

**TIDAK.** Di `ProjectDetailAlumni.tsx`, `allTransactions` adalah **hardcoded array** yang sama untuk semua project:

```tsx
const allTransactions = [
  { id: 1, title: 'Donasi dari Alumni Angkatan 2015'... },
  // Sama untuk semua project yang dibuka
]
```

Tidak ada filtering berdasarkan `projectId`.

### ❓ Apa yang terjadi jika superadmin tidak approve?

Tidak ada SLA / timeout mechanism. Donasi bisa stuck di pending selamanya tanpa notifikasi ke donatur.

### ❓ Status Donasi yang Ada vs. Ideal

**Saat ini:**

```
pending → approved | rejected
```

**Status ideal yang direkomendasikan:**

```
SUBMITTED        (user submit form)
     ↓
AWAITING_TRANSFER (menunggu user transfer)
     ↓
PROOF_UPLOADED   (bukti sudah diupload)
     ↓
UNDER_REVIEW     (admin sedang review)
     ↓
APPROVED         → dana masuk wallet
REJECTED         → notifikasi ke donatur dengan alasan
EXPIRED          (tidak ada bukti dalam X jam)
REFUND_REQUESTED (jika approved tapi ada masalah)
```

---

## 3️⃣ ROLE & PERMISSION AUDIT

| Role | Bisa Akses | TIDAK Bisa Akses | Risk Jika Salah Setup |
|------|-----------|-----------------|----------------------|
| **Superadmin** | Semua fitur, semua wallet, approval donasi, semua user data | — | Jika credential bocor: akses penuh ke seluruh finansial |
| **PIC** | Dashboard project sendiri, kelola member, keuangan project, content, polling | Project lain, approval donasi global | PIC bisa add expense sendiri tanpa approval (maker=checker) |
| **Moderator** | View all project finances, manage content, view activity log | Approve donasi, edit wallet, user management | Moderator melihat data finansial SEMUA project — terlalu lebar |
| **Alumni (User)** | Wallet tab project (jika member), diskusi, progress | Kelola project, approval apapun | Wallet tab menampilkan data hardcoded bukan data real project |
| **Donatur (Non-Alumni)** | Donasi, view project, lihat galeri | Semua fitur alumni/admin | Tidak ada dashboard donatur untuk tracking donasi mereka |

### 🚨 Critical Permission Gaps:

**1. PIC Self-Approval Risk:**

```
ProjectFinance.tsx → PIC bisa addTransaction(type: 'expense')
tanpa approval dari Superadmin atau Moderator.
Ini adalah pelanggaran prinsip four-eyes / maker-checker.
```

**2. Moderator Over-Access:**

```
ModeratorFinance.tsx menampilkan SEMUA project transactions.
Seharusnya Moderator hanya bisa akses project yang di-assign.
```

**3. Missing Escalation Prevention:**

```
AdminPanelRevised.tsx:
const user = getCurrentAdminUser(); // dari localStorage
// Tidak ada server-side role verification
// User bisa edit localStorage dan ganti role ke 'superadmin'
```

**4. Privilege Escalation via `PICDelegation.tsx`:**

PIC bisa mendelegasikan tugasnya — perlu audit: apakah delegasi bisa ke role lebih tinggi?

---

## 4️⃣ WALLET & TRANSPARENCY AUDIT

### Audit Matrix

| Aspek | Status Saat Ini | Risk | Rekomendasi |
|-------|----------------|------|-------------|
| **Saldo Real-time** | ❌ Hardcoded array | 🔴 Critical | Connect ke state global atau backend |
| **Histori Transaksi** | ⚠️ Mock data, tidak per-project | 🔴 Critical | Filter transaksi by `projectId` wajib |
| **Log Perubahan (Audit Trail)** | ⚠️ `ActivityLog.tsx` ada tapi tidak terhubung ke aksi finansial | 🟠 High | Setiap approve/reject/tambah-expense harus masuk audit log |
| **Isolasi Wallet** | ❌ Tidak terisolasi | 🔴 Critical | Wallet harus keyed by `projectId` |
| **Withdrawal Request** | ⚠️ Ada di `WalletManagement.tsx` tapi mock | 🟠 High | Flow withdrawal butuh dual-approval |
| **Dana Pending** | ⚠️ Dihitung tapi tidak dikunci dari wallet balance | 🟠 High | Pending donations seharusnya tidak masuk balance |

### Sistem Ledger yang Direkomendasikan:

```typescript
ProjectWallet {
  projectId: string           // unique key
  confirmedBalance: number    // hanya dari approved donations - expenses
  pendingBalance: number      // dari submitted donations (belum approved)
  frozenBalance: number       // untuk withdrawal yang sedang diproses

  transactions: Transaction[] = [
    { id, type, amount, status, approvedBy, timestamp, proofUrl }
  ]
}

RULE: confirmedBalance TIDAK boleh berubah kecuali ada:
1. Donation approval oleh Superadmin
2. Expense approval oleh minimal Superadmin atau 2FA PIC+Moderator
```

---

## 5️⃣ UI & VISUAL HIERARCHY REVIEW

### CTA & Status Visibility

| Elemen | Masalah | Rekomendasi |
|--------|---------|-------------|
| **CTA Donasi** | Button "Donasi" ada tapi visual weight tidak cukup dibanding konten lain | Buat sticky donation button di mobile |
| **Status Badge Donasi** | Tidak ada status tracker setelah submit | Tambahkan stepper: Submitted → Transfer → Verified |
| **Error Messages** | Toast error muncul tapi tidak inline di field | Tambahkan inline field validation |
| **Status Warna** | ✅ Ada: `bg-yellow-100` (pending), `bg-green-100` (approved), `bg-red-100` (rejected) | Sudah OK tapi perlu ditambah ikon |
| **Trust Indicators** | Nomor rekening ditampilkan tapi tidak ada info lembaga resmi/legal entity | Tambahkan: SK, logo yayasan, nomor rekening resmi |
| **Payment Timer** | ❌ Tidak ada countdown timer untuk batas waktu transfer | Critical — user bisa transfer besok dengan unique code yang expired |
| **Donor Status Dashboard** | ❌ Donatur tidak punya halaman "Riwayat Donasimu" | High priority gap |

### Warna Status yang Direkomendasikan:

```
🟡 PENDING         → bg-yellow-50  border-yellow-300  text-yellow-800
🔵 UNDER_REVIEW    → bg-blue-50    border-blue-300    text-blue-800
🟢 APPROVED        → bg-green-50   border-green-300   text-green-800
🔴 REJECTED        → bg-red-50     border-red-300     text-red-800
⚫ EXPIRED         → bg-gray-50    border-gray-300    text-gray-600
🟣 REFUND_PROCESS  → bg-purple-50  border-purple-300  text-purple-800
```

---

## 6️⃣ EDGE CASE SIMULATION

### Kasus 1: User Upload Bukti Palsu

**Skenario:** User upload gambar screenshot yang diedit, bukan bukti transfer asli.
**Kondisi saat ini:** Sistem menerima file apapun selama format & ukuran valid. Tidak ada deteksi fraud.
**Solusi:**
1. Wajibkan unique code tercantum di bukti
2. Admin harus cross-check nominal di rekening bank
3. Tambahkan field "Nama pengirim sesuai rekening" untuk cross-verify

---

### Kasus 2: Donasi Tanpa Upload Bukti

**Kondisi saat ini:** `handleSubmitProof()` memblokir dengan toast error ✅
**Gap:** Donasi sudah tersimpan di state setelah `handleConfirmDonation()` — user bisa tutup halaman dan unique code sudah tergenerate. Jika transfer manual tetap dilakukan, admin tidak akan pernah tahu.
**Solusi:** Donasi baru dibuat record-nya setelah proof diupload, bukan saat konfirmasi.

---

### Kasus 3: Upload Dua Kali (Double Upload)

**Kondisi saat ini:** `removeProofFile()` ada, user bisa ganti file. Tapi tidak ada validasi apakah user sudah pernah submit donasi yang sama.
**Risk:** Jika user submit 2x dengan bukti yang sama, 2 entri donasi bisa masuk.
**Solusi:** Setelah submit berhasil, referenceNumber harus di-lock dan ditampilkan sebagai "sudah diproses."

---

### Kasus 4: Admin Salah Approve

**Kondisi saat ini:** Tidak ada "Undo Approval" atau mekanisme reversal.
**Risk:** Dana masuk wallet, tidak bisa dikembalikan.
**Solusi:**
1. Tambahkan grace period 30 menit setelah approve sebelum wallet balance update
2. Tambahkan fitur "Request Reversal" yang butuh approval Superadmin lain

---

### Kasus 5: Refund Case

**Kondisi saat ini:** ❌ Tidak ada flow refund sama sekali.
**Risk:** Donatur yang donasinya di-reject tidak ada mekanisme pengembalian dana.
**Solusi:** Buat `RefundRequest` entity dengan flow:

```
Donatur request → PIC review → Superadmin approve → manual bank transfer + konfirmasi
```

---

### Kasus 6: Project Ditutup saat Ada Pending Donasi

**Kondisi saat ini:** Tidak ada status "closed" pada project yang mempengaruhi donasi.
**Risk:** Donasi masuk ke project yang sudah tidak aktif, dana tidak jelas digunakan untuk apa.
**Solusi:**

```
IF project.status === 'closed':
  - Block new donations
  - Auto-reject semua pending donations dengan notifikasi
  - Tampilkan pesan "Project ini sudah ditutup"
  - Redirect donatur ke project lain yang relevan
```

---

## 7️⃣ RISK LEVEL SCORING

| Area | Komponen | Risk | Keterangan |
|------|----------|------|------------|
| 🔴 **CRITICAL** | Role stored in localStorage | Critical | Trivial untuk dimanipulasi |
| 🔴 **CRITICAL** | Wallet tidak terisolasi per project | Critical | Data finansial salah |
| 🔴 **CRITICAL** | Approve tidak update state | Critical | Double counting aktif |
| 🔴 **CRITICAL** | No payment expiry timer | Critical | Unique code bisa expired, transfer tetap masuk |
| 🔴 **CRITICAL** | No donatur dashboard | Critical | Zero transparency untuk donatur |
| 🟠 **HIGH** | PIC tambah expense tanpa approval | High | Fraud risk internal |
| 🟠 **HIGH** | Moderator akses semua project finance | High | Privacy dan data isolation |
| 🟠 **HIGH** | No audit trail untuk aksi finansial | High | Non-auditable system |
| 🟠 **HIGH** | Double submit not prevented | High | Data integrity |
| 🟠 **HIGH** | No refund flow | High | Trust & legal compliance |
| 🟡 **MEDIUM** | Unique code bisa duplikat | Medium | Random 3 digit = 1/1000 collision |
| 🟡 **MEDIUM** | File MIME type tidak divalidasi | Medium | Malicious file upload |
| 🟡 **MEDIUM** | No status tracker post-donation | Medium | User frustration, support load |
| 🟡 **MEDIUM** | ProjectDetailAlumni mobile header salah nama | Medium | Brand inconsistency |
| 🟢 **LOW** | Toast messages sudah ada | Low | Basic feedback OK |
| 🟢 **LOW** | Warna status badge sudah dibedakan | Low | Basic visual cue OK |

---

## 📋 PRIORITAS IMPLEMENTASI (Roadmap)

### 🚨 Fase 1 — Wajib Segera (Security & Data Integrity)

1. **Fix wallet isolation** — filter transaksi berdasarkan `projectId`
2. **Fix approval state** — approval harus update `mockDonations` status
3. **Tambah payment expiry timer** (24 jam) di halaman konfirmasi donasi
4. **Disable double submit** — lock tombol submit setelah klik pertama
5. **Fix mobile header** di `ProjectDetailAlumni.tsx` masih menampilkan "ProjekKita"

### 🟠 Fase 2 — Penting (Trust & Transparency)

6. **Donatur status page** — halaman "Riwayat Donasimu" dengan status tracker
7. **Status stepper** di post-donation: Submitted → Transfer → Under Review → Approved
8. **Wajibkan view proof** sebelum tombol Approve aktif di admin panel
9. **Expense approval flow** — PIC tambah expense harus disetujui Moderator/Superadmin
10. **Isolasi Moderator access** — hanya project yang di-assign

### 🟡 Fase 3 — Penting (Completeness)

11. **Refund flow** — dari donatur request sampai konfirmasi selesai
12. **Project closed handler** — block donasi, auto-reject pending
13. **Unique code yang benar-benar unique** (based on timestamp + user ID)
14. **Audit trail finansial** — setiap aksi financial masuk activity log
15. **Trust indicators** — legal entity info, SK, nomor resmi di halaman donasi

---

> **Kesimpulan Auditor:** Sistem ini memiliki UX visual yang sudah solid, tapi memiliki **gap kritis di lapisan finansial dan data integrity**. Yang paling berbahaya saat ini adalah: (1) wallet tidak terisolasi per project, (2) approval tidak mengubah state, dan (3) tidak ada donatur dashboard untuk transparansi. Ketiga hal ini harus diselesaikan sebelum sistem digunakan dengan uang nyata.
