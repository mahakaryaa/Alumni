# Dokumentasi Flow AlMaqdisi Project

## Overview
Dokumen ini menjelaskan perbedaan flow pengalaman pengguna antara 3 role utama dalam aplikasi AlMaqdisi Project berdasarkan status dan hak akses mereka.

---

## 🎯 3 Role Pengguna

### 1. **Donatur** (External Supporter)
Pengguna yang fokus pada kontribusi finansial untuk mendukung project kemanusiaan.

### 2. **Alumni (Belum Join Project)** 
Alumni yang tertarik untuk berkontribusi aktif sebagai volunteer dalam project, namun belum mengajukan diri.

### 3. **Alumni (Sudah Join Project)**
Alumni yang telah mengajukan diri untuk bergabung dalam project dan menunggu persetujuan PIC atau sudah disetujui.

---

## 📱 Perbedaan Flow Berdasarkan Role

### **A. DONATUR FLOW**

#### **File Component:**
- `ProjectDetail.tsx`

#### **Karakteristik:**
- ✅ Dapat melihat detail project (Overview & Progress)
- ✅ Dapat melakukan donasi finansial
- ❌ **TIDAK** dapat join sebagai volunteer
- ❌ **TIDAK** dapat melihat atau apply posisi tim

#### **CTA Button yang Muncul:**

**1. Project Type: `campaign` atau `galeri-with-funding`**
```
Button: "DONASI SEKARANG" / "DONATE NOW"
- Lebar: Mobile = 100%, Desktop = 448px (center)
- Tinggi: py-4 (≈56-60px)
- Border Radius: rounded-xl (12px)
- Gap: gap-2 (8px)
- Font: font-bold, tracking-widest, uppercase
- Background: Solid #2B4468
- Border: 4px solid #FAC06E
- Position: Fixed bottom dengan flex center
- Icon: volunteer_activism
- Action: Membuka modal DonationPage
```

**2. Project Type: `galeri-documentation`**
```
Tidak ada CTA button (hanya dokumentasi)
```

**3. Project Type: `open-volunteer`**
```
Tidak ada CTA button (Donatur tidak bisa join volunteer)
```

#### **Alur Donasi:**
```
1. User membuka Detail Project (dari Home atau Explore)
2. User melihat informasi project (deskripsi, tujuan, progress)
3. User klik button "DONASI SEKARANG"
4. Modal DonationPage terbuka dengan:
   - Pilihan metode donasi (Bank Transfer, E-Wallet, QRIS)
   - Nominal donasi (pilihan preset atau custom)
   - Form data donatur
5. User memilih metode & nominal
6. User konfirmasi donasi
7. System menampilkan toast sukses
8. User kembali ke Detail Project
```

#### **Sidebar Navigation:**
- Home
- Explore
- Pesan (dengan notifikasi badge)
- Settings
- Logout

---

### **B. ALUMNI (BELUM JOIN) FLOW**

#### **File Component:**
- `ProjectDetailAlumni.tsx`

#### **Karakteristik:**
- ✅ Dapat melihat detail project (Overview & Progress)
- ✅ Dapat melakukan donasi finansial (sama seperti Donatur)
- ✅ **DAPAT** join sebagai volunteer untuk project type "Open Volunteer"
- ✅ **DAPAT** melihat posisi tim yang tersedia
- ✅ **DAPAT** apply posisi yang diinginkan

#### **CTA Button yang Muncul:**

**1. Project Type: `open-volunteer`**
```
Button: "JOIN PROJECT"
- Lebar: w-full (100% semua device)
- Tinggi: h-14 (56px fixed)
- Border Radius: rounded-xl (12px)
- Gap: gap-3 (12px)
- Font: font-bold, tracking-widest, uppercase
- Background: Gradient from-[#243D68] to-[#30518B]
- Shadow: 6px 6px gold (#FAC06E)
- Hover Shadow: 8px 8px gold
- Active: No shadow + translate (1px, 1px)
- Icon: group_add
- Action: Membuka modal "Gabung Project"
```

**2. Project Type: `campaign` atau `galeri-with-funding`**
```
Button: "DONASI SEKARANG" / "DONATE NOW"
(Desain & flow sama seperti Donatur)
```

**3. Project Type: `galeri-documentation`**
```
Tidak ada CTA button (hanya dokumentasi)
```

#### **Alur Join Project:**
```
1. User membuka Detail Project (dari Home atau Explore)
2. User melihat section "Kebutuhan Tim" dengan posisi tersedia
3. User klik button "JOIN PROJECT"
4. Modal "Gabung Project" terbuka dengan form:
   
   FORM FIELDS:
   - Dropdown: "Posisi yang Diminati"
     * Pilihan dari availablePositions prop
     * Menampilkan nama posisi & jumlah slot
   
   - Radio Button: "Durasi Komitmen"
     * 1 Bulan
     * 3 Bulan (default)
     * 6 Bulan
     * 1 Tahun
     * Custom (dengan textarea tambahan)
   
   - Textarea: "Alasan Bergabung"
     * Placeholder: "Ceritakan alasan dan motivasi Anda..."
     * Tidak ada validasi minimal karakter

5. User mengisi form (tanpa validasi ketat)
6. User klik "Kirim Pengajuan"
7. System validasi:
   - Posisi harus dipilih
   - Alasan harus diisi
   - Custom duration harus diisi jika pilih Custom
8. System menampilkan toast sukses:
   "Pengajuan berhasil dikirim!"
   "Menunggu persetujuan dari PIC project"
9. Modal tertutup
10. Status berubah menjadi applicationStatus = 'pending'
11. User melihat status "Pengajuan Sedang Direview"
```

#### **Data yang Dikirim (JoinRequest):**
```typescript
{
  id: string,                    // Auto-generated
  projectId: string,
  projectTitle: string,
  alumniId: string,
  alumniName: string,
  alumniEmail: string,
  reason: string,                // Dari textarea
  commitment: string,            // '1-month' | '3-months' | '6-months' | '1-year' | 'custom'
  commitmentDuration: string,    // Display text (e.g., "3 Bulan" atau custom text)
  interestedPosition: string,    // Nama posisi yang dipilih
  status: 'pending',
  submittedAt: string            // ISO timestamp
}
```

#### **Sidebar Navigation:**
- Home
- Explore
- My Projects (fitur khusus Alumni)
- Pesan (dengan notifikasi badge)
- Settings
- Logout

---

### **C. ALUMNI (SUDAH JOIN) FLOW**

#### **File Component:**
- `ProjectDetailAlumni.tsx` (sama, tapi dengan kondisi berbeda)

#### **Karakteristik:**
- ✅ Dapat melihat detail project (Overview & Progress)
- ✅ Dapat melakukan donasi finansial
- ✅ Dapat melihat status pengajuan volunteer
- ❌ **TIDAK** dapat join lagi (sudah mengajukan)
- ❌ **TIDAK** dapat apply posisi lain

#### **CTA Button yang Muncul:**

**1. Project Type: `open-volunteer` + Status: `pending`**
```
Status Badge: "PENGAJUAN SEDANG DIREVIEW"
- Lebar: w-full (100% semua device)
- Tinggi: h-14 (56px)
- Border Radius: rounded-xl (12px)
- Background: bg-[#FFF3CD] (kuning muda)
- Text Color: text-[#856404] (kuning gelap)
- Font: font-bold, uppercase
- Icon: schedule (clock icon)
- State: disabled, cursor-not-allowed
- Action: Tidak ada (button disabled)
```

**2. Project Type: `open-volunteer` + Status: `approved`**
```
Status Badge: "ANDA SUDAH TERGABUNG DALAM PROJECT"
- Lebar: w-full (100% semua device)
- Tinggi: h-14 (56px)
- Border Radius: rounded-xl (12px)
- Background: bg-[#D4EDDA] (hijau muda)
- Text Color: text-[#155724] (hijau gelap)
- Font: font-bold, uppercase
- Icon: check_circle (checkmark icon)
- State: disabled, cursor-not-allowed
- Action: Tidak ada (button disabled)
```

**3. Project Type: `campaign` atau `galeri-with-funding`**
```
Button: "DONASI SEKARANG" / "DONATE NOW"
(Tetap bisa donasi meskipun sudah join)
```

#### **Alur Setelah Join:**
```
1. Status = 'pending':
   - User melihat badge "Pengajuan Sedang Direview"
   - User menunggu approval dari PIC Project
   - User masih dapat melihat detail project
   - User masih dapat melakukan donasi

2. Status = 'approved':
   - User melihat badge "Anda Sudah Tergabung"
   - User mendapat akses ke fitur kolaborasi (future)
   - User dapat melihat project di "My Projects"
   - User dapat berinteraksi dengan tim (future)
```

#### **Sidebar Navigation:**
- Home
- Explore
- My Projects (menampilkan project yang sudah join)
- Pesan (dengan notifikasi badge)
- Settings
- Logout

---

## 🔄 State Management

### **Application Status States:**
```typescript
type ApplicationStatus = 'none' | 'pending' | 'approved';

- 'none'     : Alumni belum mengajukan join (default)
- 'pending'  : Alumni sudah submit, menunggu approval PIC
- 'approved' : Alumni disetujui oleh PIC, sudah tergabung
```

### **State Flow:**
```
ALUMNI (BELUM JOIN)
  └─> applicationStatus = 'none'
  └─> CTA: "JOIN PROJECT" button (enabled)
       │
       └─> User klik "JOIN PROJECT"
            └─> Modal form muncul
                 └─> User submit form
                      └─> applicationStatus = 'pending'
                           │
                           └─> CTA: "PENGAJUAN SEDANG DIREVIEW" (disabled)
                                │
                                └─> PIC approve
                                     └─> applicationStatus = 'approved'
                                          └─> CTA: "ANDA SUDAH TERGABUNG" (disabled)
```

---

## 🎨 Design Specifications

### **Button Comparison Table:**

| Spesifikasi | Donatur (Donasi) | Alumni (Join) | Alumni (Status) |
|-------------|------------------|---------------|-----------------|
| **Width Mobile** | 100% | 100% | 100% |
| **Width Desktop** | 448px (center) | 100% | 100% |
| **Height** | py-4 (≈56-60px) | h-14 (56px) | h-14 (56px) |
| **Border Radius** | rounded-xl (12px) | rounded-xl (12px) | rounded-xl (12px) |
| **Gap** | gap-2 (8px) | gap-3 (12px) | gap-3 (12px) |
| **Font Weight** | font-bold (700) | font-bold (700) | font-bold (700) |
| **Letter Spacing** | tracking-widest (0.1em) | tracking-widest (0.1em) | - |
| **Text Transform** | uppercase | uppercase | uppercase |
| **Background** | Solid #2B4468 | Gradient #243D68 → #30518B | #FFF3CD / #D4EDDA |
| **Border** | 4px solid #FAC06E | none | none |
| **Shadow** | none | 6px 6px gold | none |
| **Hover Effect** | bg-[#243D68] | shadow 8px 8px gold | none (disabled) |
| **Active Effect** | none | translate + no shadow | none (disabled) |
| **Icon** | volunteer_activism | group_add | schedule / check_circle |

---

## 📊 Project Types & CTA Mapping

### **Project Type: `open-volunteer`**
- **Donatur**: Tidak ada CTA
- **Alumni (Belum Join)**: CTA "JOIN PROJECT" (gradient gold shadow)
- **Alumni (Sudah Join)**: Status badge (pending/approved)

### **Project Type: `campaign`**
- **Donatur**: CTA "DONASI SEKARANG" (solid blue + gold border)
- **Alumni (Belum Join)**: CTA "DONASI SEKARANG" (solid blue + gold border)
- **Alumni (Sudah Join)**: CTA "DONASI SEKARANG" (tetap bisa donasi)

### **Project Type: `galeri-with-funding`**
- **Donatur**: CTA "DONASI SEKARANG" (solid blue + gold border)
- **Alumni (Belum Join)**: CTA "DONASI SEKARANG" (solid blue + gold border)
- **Alumni (Sudah Join)**: CTA "DONASI SEKARANG" (tetap bisa donasi)

### **Project Type: `galeri-documentation`**
- **Semua Role**: Tidak ada CTA (hanya view dokumentasi)

---

## 🌐 Multi-Language Support

### **Supported Languages:**
- Bahasa Indonesia (id)
- English (en)

### **Translation Keys:**
```typescript
// CTA Buttons
"Donasi Sekarang" → "Donate Now"
"Join Project" → "Join Project" (sama)

// Status Messages
"Pengajuan Sedang Direview" → "Application Under Review"
"Anda Sudah Tergabung Dalam Project" → "You Have Joined This Project"

// Toast Messages
"Pengajuan berhasil dikirim!" → "Application submitted successfully!"
"Menunggu persetujuan dari PIC project" → "Waiting for approval from Project PIC"
```

### **Implementation:**
```typescript
import { useTranslation } from '../../hooks/useTranslation';

const { language } = useTranslation();

// Usage:
{language === 'id' ? 'Donasi Sekarang' : 'Donate Now'}
```

---

## 🔐 Access Control Matrix

| Fitur | Donatur | Alumni (Belum Join) | Alumni (Sudah Join) |
|-------|---------|---------------------|---------------------|
| View Project Detail | ✅ | ✅ | ✅ |
| View Overview Tab | ✅ | ✅ | ✅ |
| View Progress Tab | ✅ | ✅ | ✅ |
| Donasi Project | ✅ (funding type) | ✅ (funding type) | ✅ (funding type) |
| Join as Volunteer | ❌ | ✅ (open-volunteer) | ❌ (sudah join) |
| View Team Needs | ✅ | ✅ | ✅ |
| Apply Position | ❌ | ✅ | ❌ |
| View Join Status | ❌ | ❌ | ✅ |
| Access My Projects | ❌ | ❌ (kosong) | ✅ |
| Collaborate with Team | ❌ | ❌ | ✅ (future) |

---

## 📝 Notes & Future Enhancements

### **Current Limitations:**
1. Tidak ada validasi minimal karakter untuk textarea "Alasan Bergabung"
2. Status approval masih manual (tidak ada notifikasi real-time)
3. Alumni yang sudah approved tidak memiliki dashboard kolaborasi
4. Tidak ada fitur withdraw/cancel pengajuan join

### **Planned Features:**
1. **Real-time Notifications**: Notifikasi saat status berubah dari pending → approved
2. **Project Dashboard**: Dashboard khusus untuk alumni yang sudah join
3. **Team Chat**: Fitur komunikasi antar member project
4. **Task Management**: Assign & track tasks untuk volunteer
5. **Contribution History**: History kontribusi alumni (volunteer + donasi)
6. **Rating & Review**: Sistem review untuk project yang sudah selesai

---

## 🎯 Summary

### **Key Differences:**

**DONATUR:**
- Fokus: Kontribusi finansial
- CTA: "Donasi Sekarang" (solid blue + gold border, center desktop)
- Akses: View only + Donasi

**ALUMNI (BELUM JOIN):**
- Fokus: Kontribusi aktif volunteer + Donasi
- CTA: "Join Project" (gradient + gold shadow, full width) atau "Donasi Sekarang"
- Akses: View + Apply position + Donasi

**ALUMNI (SUDAH JOIN):**
- Fokus: Monitoring status + Kolaborasi (future)
- CTA: Status badge (disabled) atau "Donasi Sekarang" (masih bisa donasi)
- Akses: View + Status tracking + Donasi

---

**Dokumentasi dibuat:** 28 Februari 2026  
**Last Updated:** 28 Februari 2026  
**Version:** 1.0.0
