# 🧪 FASE 2C: EVENT REGISTRATION APPROVAL FLOW - TESTING GUIDE

**Version:** 1.0.0  
**Date:** 20 Februari 2026

---

## 📋 PRE-REQUISITES

- ✅ Fase 1, Fase 2A, Fase 2B sudah complete
- ✅ App.tsx state management sudah terintegrasi
- ✅ EventDetail.tsx sudah updated
- ✅ Admin panel sudah terintegrasi

---

## 🎯 TESTING SCENARIOS

### ✅ Scenario 1: Alumni Register for Event (Happy Path)

**Steps:**
1. Login as Alumni
2. Navigate to Event Detail page (click event card di homepage/explore)
3. Verify event info ditampilkan lengkap:
   - Title: "Workshop Alumni di Surabaya!"
   - Date: 12 November 2025
   - Time: 09:00 - 17:00 WIB
   - Location: Surabaya Convention Hall
   - Quota: 127/200
4. Click button **"Daftar Sekarang"**
5. Modal form terbuka dengan:
   - Personal info (pre-filled, read-only): Nama, Email, Angkatan, Kota
   - Editable phone number
   - Motivation textarea (empty)
6. Fill form:
   - Phone: 081234567890
   - Motivation: "Saya ingin menghadiri event ini untuk memperluas networking dengan sesama alumni dan belajar tentang pengembangan karir profesional. Saya berharap dapat berkontribusi lebih banyak untuk komunitas alumni." (100+ chars)
   - Check "Pernah hadir sebelumnya" (optional)
   - Dietary: "Vegetarian" (optional)
   - Emergency contact: "Budi Santoso" (optional)
   - Emergency phone: "08567890123" (optional)
7. Verify character counter shows: "100/50 karakter"
8. Click **"Kirim Pendaftaran"**
9. Verify:
   - Loading state muncul ("Mengirim...")
   - Modal closes
   - Toast: "Pendaftaran berhasil dikirim! Menunggu persetujuan panitia."
   - Button changes to "Sudah Terdaftar" (gray, disabled)

**Expected Result:** ✅ Registration submitted successfully

---

### ✅ Scenario 2: PIC Approves Event Registration

**Steps:**
1. Login as PIC/Moderator to Admin Panel
2. Navigate to **"Pendaftaran Event"** menu
3. Verify dashboard shows:
   - Stats cards: 1 Pending, 0 Approved, 0 Rejected, 1 Total
   - Pending tab active by default
4. See registration card with:
   - Alumni name: Ahmad Zulfikar
   - Email: ahmad.zulfikar@gmail.com
   - Event: Workshop Alumni di Surabaya!
   - Motivation preview (first 2 lines)
   - Badges: "Pernah Hadir Sebelumnya", "Ada Pantangan Makanan", "Kontak Darurat Tersedia"
5. Click **"Detail"** button
6. Modal terbuka dengan full info:
   - All personal data
   - Event info
   - Full motivation text
   - Dietary restrictions
   - Emergency contact info
7. Click **"Setujui Pendaftaran"**
8. Approve modal terbuka dengan pre-filled message:
   - "Selamat! Pendaftaran Anda telah disetujui. Kami tunggu kehadiran Anda di event."
9. Edit message (optional)
10. Click **"Setujui"**
11. Verify:
    - Toast: "Pendaftaran event berhasil disetujui!"
    - Registration moves to "Approved" tab
    - Badge changes to green "Disetujui"
    - Reviewed by info shows PIC name

**Expected Result:** ✅ Registration approved successfully

---

### ✅ Scenario 3: Alumni Checks Notification

**Steps:**
1. As Alumni, check notification panel (bell icon)
2. Verify notification shows:
   - Title: "Pendaftaran Event Disetujui! 🎉"
   - Message: "Selamat! Pendaftaran Anda untuk event "Workshop Alumni di Surabaya!" telah disetujui. [Custom message]. Tanggal: 12 November 2025, 09:00 - 17:00 WIB."
   - Timestamp: Just now
3. Click notification
4. (Future: Navigate to event detail or My Events page)

**Expected Result:** ✅ Notification received correctly

---

### ✅ Scenario 4: PIC Rejects Event Registration

**Steps:**
1. Submit another registration as Alumni
2. Login as PIC
3. Navigate to "Pendaftaran Event"
4. Click **"Tolak"** button
5. Reject modal terbuka
6. Enter rejection reason:
   - "Maaf, kuota untuk peserta dari kota Anda sudah penuh. Kami harap Anda dapat bergabung di event berikutnya."
7. Click **"Tolak"**
8. Verify:
   - Toast: "Pendaftaran event ditolak"
   - Registration moves to "Rejected" tab
   - Badge changes to red "Ditolak"
   - Rejection reason displayed

**Expected Result:** ✅ Registration rejected successfully

---

### ✅ Scenario 5: Non-Alumni Tries to Register

**Steps:**
1. Logout (or use guest mode)
2. Navigate to Event Detail page
3. Click **"Daftar Sekarang"**
4. Verify:
   - Toast error: "Silakan login sebagai alumni untuk mendaftar event"
   - Modal does NOT open

**Expected Result:** ✅ Access control working

---

### ✅ Scenario 6: Form Validation

**Steps:**
1. Login as Alumni
2. Open registration form
3. **Test 1: Empty phone**
   - Leave phone empty
   - Try to submit
   - Verify toast: "No. telepon wajib diisi"
4. **Test 2: Short motivation**
   - Phone: 08123456789
   - Motivation: "Saya ingin hadir" (17 chars)
   - Verify submit button is disabled
   - Verify character counter: "17/50 karakter"
5. **Test 3: Valid form**
   - Add more text to motivation (50+ chars)
   - Verify submit button enabled
   - Submit successfully

**Expected Result:** ✅ Validation working correctly

---

### ✅ Scenario 7: Search & Filter Functionality

**Steps:**
1. Login as PIC with multiple registrations
2. Navigate to "Pendaftaran Event"
3. **Test Search:**
   - Type "Ahmad" in search box
   - Verify only registrations with "Ahmad" in name/email/event shown
4. **Test Event Filter:**
   - Select specific event from dropdown
   - Verify only registrations for that event shown
5. **Test Combined:**
   - Search + Filter together
   - Verify results correctly filtered

**Expected Result:** ✅ Search & filter working

---

### ✅ Scenario 8: Tab Navigation

**Steps:**
1. Create 3 registrations: 1 pending, 1 approved, 1 rejected
2. Navigate to "Pendaftaran Event"
3. **Pending Tab:**
   - Click "Pending" tab
   - Verify only pending registrations shown
   - Verify count in tab label
4. **Approved Tab:**
   - Click "Approved" tab
   - Verify only approved registrations shown
   - Verify count matches
5. **Rejected Tab:**
   - Click "Rejected" tab
   - Verify only rejected registrations shown
   - Verify count matches

**Expected Result:** ✅ Tab navigation working

---

### ✅ Scenario 9: Multiple Event Support

**Steps:**
1. Register for Event A as Alumni 1
2. Register for Event B as Alumni 2
3. Login as PIC
4. Navigate to "Pendaftaran Event"
5. Verify:
   - Event filter dropdown shows "Event A" and "Event B"
   - Can filter by each event
   - Registration cards show correct event info

**Expected Result:** ✅ Multi-event support working

---

### ✅ Scenario 10: Mobile Responsiveness

**Steps:**
1. Open app on mobile viewport (375px width)
2. Navigate to Event Detail
3. **Test Registration Form:**
   - Modal full-screen on mobile
   - Scrollable content
   - Sticky header & footer
   - Form fields stack vertically
4. **Test Admin Panel:**
   - Stats cards stack to 1 column
   - Search & filter stack vertically
   - Registration cards full-width
   - Action buttons responsive

**Expected Result:** ✅ Mobile UI working correctly

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: Toast not showing
**Cause:** Toaster component not imported in App.tsx  
**Fix:** Verify `<Toaster />` is rendered in App.tsx

### Issue 2: Button stays enabled after submit
**Cause:** `isRegistered` state not updated  
**Fix:** Check `setIsRegistered(true)` called after successful submit

### Issue 3: Notification not appearing
**Cause:** Handler not passed to EventDetail  
**Fix:** Verify `onEventRegistrationSubmitted` prop passed correctly

### Issue 4: Stats cards show wrong count
**Cause:** Filter logic incorrect  
**Fix:** Check `.filter()` conditions in EventRegistrationApproval.tsx

### Issue 5: Modal doesn't close after approve/reject
**Cause:** State not cleared  
**Fix:** Verify `setShowApproveModal(false)` and `setSelectedRegistration(null)`

---

## ✅ CHECKLIST SEBELUM PRODUCTION

- [ ] All 10 scenarios tested and passing
- [ ] Form validation berfungsi dengan baik
- [ ] Notification system terintegrasi
- [ ] Search & filter working
- [ ] Tab navigation working
- [ ] Mobile responsive
- [ ] Loading states implemented
- [ ] Error handling implemented
- [ ] Toast messages clear and helpful
- [ ] No console errors
- [ ] Performance acceptable (< 1s response time)

---

## 📊 TEST COVERAGE

| Component | Test Coverage |
|-----------|--------------|
| EventDetail.tsx | ✅ Form, validation, submit |
| EventRegistrationApproval.tsx | ✅ List, search, filter, approve, reject |
| App.tsx handlers | ✅ Submit, approve, reject, notifications |
| AdminPanelRevised integration | ✅ Props, routing |
| AdminSidebarRevised | ✅ Menu item |

---

## 🎉 TESTING COMPLETE

Jika semua scenario di atas berhasil, **Fase 2C** sudah production-ready! 🚀

**Next:** Lanjut ke Fase 3 atau testing end-to-end integration dengan Fase 2A & 2B.
