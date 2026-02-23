# 🧪 FASE 2B: TESTING GUIDE & MANUAL QA

**Fase:** 2B - Join Request Approval Flow  
**Status:** Ready for Testing  
**Tanggal:** 20 Februari 2026

---

## 🎯 TESTING OBJECTIVES

Memastikan flow lengkap dari alumni submit join request hingga PIC/Moderator approve/reject dengan:
- ✅ Real-time status updates
- ✅ Automatic role assignment
- ✅ Notification delivery
- ✅ Welcome message display
- ✅ Rejection reason handling

---

## 🔧 SETUP TESTING ENVIRONMENT

### 1. Reset State (Optional)
```typescript
// Di browser console:
localStorage.clear();
// Refresh page
```

### 2. Create Test Data
Tidak perlu setup khusus, karena mock data sudah tersedia di:
- `/src/data/mockAdminDataRevised.ts`
- App.tsx state akan kosong di awal (will be populated saat user interact)

---

## 📝 TEST SCENARIOS

### ✅ SCENARIO 1: Alumni Submit Join Request

**Steps:**
1. Login sebagai Alumni:
   - Klik icon Login di homepage
   - Pilih "Masuk sebagai Alumni"
   
2. Navigate ke Project Detail:
   - Klik salah satu project card
   - Atau gunakan "Explore Project"
   
3. Submit Join Request:
   - Scroll ke section "Bergabung ke Project"
   - Isi form:
     - **Komitmen:** Pilih "6 Bulan" atau "1 Tahun"
     - **Alasan Bergabung:** "Saya tertarik berkontribusi untuk pendidikan di Palestina. Saya memiliki pengalaman di bidang edukasi dan ingin membantu project ini mencapai target."
     - **Posisi Diminati (Optional):** "Content Creator"
   - Klik "Kirim Pengajuan"

**Expected Result:**
- ✅ Modal success muncul: "Pengajuan berhasil dikirim!"
- ✅ Button "Bergabung" berubah jadi "Menunggu Persetujuan"
- ✅ Check console: `joinRequests` state bertambah 1
- ✅ Notification count +1

**Navigate to My Join Requests:**
- Settings → "Pengajuan Bergabung"
- ✅ Tampil request dengan status "Menunggu"
- ✅ Badge kuning "Pending"
- ✅ Info: "PIC sedang meninjau pengajuan Anda"

---

### ✅ SCENARIO 2: PIC Review & Approve dengan Welcome Message

**Steps:**
1. Logout dari Alumni

2. Login sebagai PIC:
   - Buka halaman Admin Login: `http://localhost:5173/#admin-login-revised`
   - Email: `pic1@almaqdisi.org`
   - Password: `pic123`
   
3. Navigate ke Pending Requests:
   - Sidebar → "Pengajuan Join Project"
   - ✅ Tampil list pending requests dengan full detail:
     - Foto/Avatar alumni
     - Nama, Email, Angkatan, Jurusan
     - Pekerjaan, Perusahaan (jika ada)
     - Komitmen: Badge biru "6 Bulan" / "1 Tahun"
     - Posisi diminati (jika ada): Purple badge
     - Alasan bergabung: Text box abu-abu
     - Previous projects (jika ada): Green cards dengan rating

4. Review Request:
   - Baca semua informasi alumni
   - Assess apakah sesuai kriteria project
   
5. Approve Request:
   - Klik button hijau "Approve"
   - Modal muncul: "Approve Pengajuan"
   - ✅ Default welcome message sudah terisi
   - Edit welcome message:
     ```
     Selamat datang Ahmad Zaki! Kami sangat senang Anda bergabung dengan Project Pendidikan Gaza. 
     Dengan pengalaman Anda di bidang edukasi, kami yakin Anda akan memberikan kontribusi besar. 
     Silakan join grup WhatsApp kami untuk koordinasi lebih lanjut!
     ```
   - ✅ Checkbox "Kirim email notifikasi" = checked
   - Klik "✅ Confirm Approve"

**Expected Result:**
- ✅ Toast hijau: "Ahmad Zaki berhasil disetujui sebagai member!"
- ✅ Request hilang dari list pending
- ✅ Check console: 
  - `joinRequests[0].status` = "approved"
  - `joinRequests[0].assignedRole` = "member"
  - `joinRequests[0].reviewedByRole` = "PIC"
  - `joinRequests[0].approvalMessage` = "(your welcome message)"
- ✅ Notification created untuk alumni

---

### ✅ SCENARIO 3: Alumni Check Approval Status

**Steps:**
1. Logout dari PIC

2. Login kembali sebagai Alumni

3. Check Notification:
   - Bell icon → badge merah dengan angka
   - Klik bell → tampil notification:
     - **Title:** "Permintaan Disetujui! 🎉"
     - **Message:** "Selamat! Anda telah diterima sebagai member Project Pendidikan Gaza. Selamat datang Ahmad Zaki! Kami sangat senang..."
     - Klik notification → navigate ke My Join Requests

4. View My Join Requests:
   - Settings → "Pengajuan Bergabung"
   - atau langsung dari notification link
   - ✅ Request tampil dengan:
     - Badge hijau "Diterima"
     - Status box hijau:
       - "Selamat! Anda diterima sebagai **Member**"
       - "Disetujui pada 20 Februari 2026 oleh **PIC**"
       - Separator line
       - 💬 "(Your full welcome message)"

5. View Project Detail:
   - Klik button "Lihat Project"
   - ✅ Tab "Discussion" dan "Wallet" sudah unlock (if implemented)
   - ✅ Button "Bergabung" berubah jadi "Anda sudah menjadi Member"

**Expected Result:**
- ✅ Alumni dapat melihat full approval info
- ✅ Welcome message delivered successfully
- ✅ Reviewer transparency (PIC)
- ✅ Role clarity (Member)

---

### ✅ SCENARIO 4: PIC Reject Request dengan Alasan

**Steps:**
1. Login sebagai PIC (jika belum)

2. Create another test request:
   - Logout → Login sebagai Alumni
   - Submit join request ke project lain
   - Komitmen: "1 Bulan"
   - Alasan: "Saya ingin coba dulu"
   - Logout

3. Login kembali sebagai PIC

4. Navigate to Pending Requests

5. Reject Request:
   - Klik button merah "Reject"
   - Modal muncul: "Reject Pengajuan"
   - Warning box merah: "Anda akan menolak pengajuan..."
   
6. Fill Rejection Form:
   - **Alasan Penolakan:** Pilih "Komitmen waktu terlalu singkat"
   - **Pesan untuk Alumni (Optional):**
     ```
     Terima kasih atas minatnya. Namun project ini membutuhkan komitmen minimal 3 bulan 
     untuk dapat berkontribusi optimal. Kami membuka kesempatan bagi Anda untuk apply 
     kembali jika sudah siap dengan komitmen lebih lama. Semangat!
     ```
   - ✅ Checkbox "Kirim email notifikasi" = checked
   - ✅ Checkbox "Izinkan alumni submit ulang setelah 30 hari" = checked
   - Klik "❌ Confirm Reject"

**Expected Result:**
- ✅ Toast: "Pengajuan [Alumni Name] ditolak"
- ✅ Request hilang dari pending
- ✅ Check console:
  - `status` = "rejected"
  - `rejectionReason` = "Komitmen waktu terlalu singkat. Terima kasih atas minatnya..."
  - `rejectionAllowResubmit` = true
- ✅ Notification created untuk alumni

---

### ✅ SCENARIO 5: Alumni View Rejection & Resubmit

**Steps:**
1. Login sebagai Alumni (yang direject)

2. Check Notification:
   - Bell icon → new notification
   - **Title:** "Permintaan Ditolak"
   - **Message:** "Permintaan Anda untuk bergabung ke [Project] ditolak. Alasan: Komitmen waktu terlalu singkat..."

3. View Rejection Details:
   - Settings → "Pengajuan Bergabung"
   - Filter → "Ditolak"
   - ✅ Request tampil dengan:
     - Badge merah "Ditolak"
     - Red info box:
       - "Alasan Penolakan: Komitmen waktu terlalu singkat. Terima kasih..."
       - ℹ️ "Anda dapat mengajukan kembali dengan alasan yang lebih baik"
     - Button "Ajukan Ulang" tersedia

4. Try Resubmit:
   - Klik "Ajukan Ulang"
   - ✅ Navigate ke Project Detail
   - ✅ Form komitmen sudah pre-filled dari request sebelumnya
   - Update komitmen: "6 Bulan"
   - Update alasan: "Setelah pertimbangan, saya siap berkomitmen 6 bulan penuh..."
   - Submit

**Expected Result:**
- ✅ New request created dengan status "pending"
- ✅ Old request tetap ada dengan status "rejected" (history preserved)
- ✅ PIC dapat melihat bahwa ini adalah resubmit dari alumni yang sama

---

### ✅ SCENARIO 6: Moderator Approve Request

**Steps:**
1. Login sebagai Moderator:
   - Email: `moderator1@almaqdisi.org`
   - Password: `mod123`

2. Navigate to Pending Requests:
   - Sidebar → "Pengajuan Join Project"
   - ✅ Moderator dapat melihat ALL pending requests (tidak hanya 1 project)

3. Approve Request:
   - Pilih salah satu request
   - Klik "Approve"
   - Isi welcome message (atau skip)
   - Confirm

**Expected Result:**
- ✅ Request approved
- ✅ `reviewedByRole` = "Moderator" (bukan PIC)
- ✅ Alumni melihat: "Disetujui oleh **Moderator**"

---

## 🔍 EDGE CASES TO TEST

### Edge Case 1: Empty State
**Scenario:** Semua requests sudah di-review
**Expected:**
- ✅ Empty state tampil
- ✅ Icon checklist hijau
- ✅ Message: "Tidak Ada Pengajuan Baru"
- ✅ Button "Kembali ke Dashboard"

### Edge Case 2: Long Approval Message
**Scenario:** PIC menulis welcome message sangat panjang (>500 karakter)
**Expected:**
- ✅ Message tersimpan penuh
- ✅ Alumni melihat full message (bukan truncated)
- ✅ UI tetap rapi dengan scrollable text box

### Edge Case 3: Multiple Simultaneous Approvals
**Scenario:** PIC approve 3 requests sekaligus dalam < 1 detik
**Expected:**
- ✅ Semua requests approved
- ✅ Unique notification IDs
- ✅ No state race condition

### Edge Case 4: Reject tanpa Custom Message
**Scenario:** PIC reject hanya dengan predefined reason, tanpa custom message
**Expected:**
- ✅ Rejection reason = "Kuota member sudah penuh" (predefined only)
- ✅ Alumni melihat rejection reason yang jelas
- ✅ Resubmit allowed

### Edge Case 5: Alumni Cancel Pending Request
**Scenario:** Alumni batalkan request sebelum PIC review
**Expected:**
- ✅ Request hilang dari PIC pending list
- ✅ Alumni dapat submit request baru
- ✅ No notification to PIC

---

## 📊 VALIDATION CHECKLIST

### Data Integrity
- [ ] Join request ID unique
- [ ] Timestamp accurate (submittedAt, reviewedAt)
- [ ] Reviewer info correct (email, role)
- [ ] Approval message preserved
- [ ] Rejection reason complete

### UI/UX
- [ ] Loading states (if any)
- [ ] Error handling (form validation)
- [ ] Toast messages clear
- [ ] Modal animations smooth
- [ ] Mobile responsive

### Business Logic
- [ ] Only PIC/Moderator can approve/reject
- [ ] Alumni cannot approve own request
- [ ] Role auto-assignment = 'member' (default)
- [ ] Notification created automatically
- [ ] Resubmit allowed after rejection

### State Management
- [ ] Global state updated correctly
- [ ] No duplicate requests
- [ ] Filter by status works
- [ ] Search functionality works
- [ ] Real-time sync between components

---

## 🐛 KNOWN ISSUES & LIMITATIONS

### Current Limitations:
1. **No Persistence:**
   - Join requests hanya di memory (refresh = hilang)
   - Solution: Add localStorage atau backend

2. **No Email Integration:**
   - Checkbox "Kirim email" tidak functional
   - Solution: Integrate email service

3. **No Tab Auto-Unlock:**
   - Tab Discussion/Wallet belum auto-unlock setelah approved
   - Solution: Implement access control logic

4. **No Bulk Operations:**
   - Cannot approve/reject multiple requests at once
   - Solution: Add bulk action feature

5. **No Analytics:**
   - No dashboard stats untuk join requests
   - Solution: Add analytics component

---

## ✅ SUCCESS CRITERIA

Fase 2B dianggap berhasil jika:
- [x] Alumni dapat submit join request
- [x] PIC/Moderator dapat melihat list pending requests
- [x] PIC/Moderator dapat approve dengan welcome message
- [x] PIC/Moderator dapat reject dengan alasan
- [x] Alumni dapat melihat status real-time
- [x] Role automatically assigned saat approved
- [x] Notification delivered dengan approval message
- [x] Rejection reason displayed lengkap
- [x] Resubmit allowed setelah rejection
- [x] Reviewer transparency (show PIC/Moderator)

---

## 🚀 DEPLOYMENT CHECKLIST

Sebelum deploy ke production:
- [ ] All test scenarios passed
- [ ] Edge cases handled
- [ ] No console errors
- [ ] Performance acceptable (< 100ms state updates)
- [ ] Mobile responsive verified
- [ ] Documentation updated
- [ ] Code reviewed

---

## 📞 SUPPORT

Jika menemukan bug atau issue:
1. Check console untuk error messages
2. Verify global state di React DevTools
3. Check network tab (jika ada API calls)
4. Document steps to reproduce
5. Report to development team

---

**Happy Testing! 🎉**

*Last Updated: 20 Februari 2026*
