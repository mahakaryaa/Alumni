# FASE 4 - Testing Guide
## AlMaqdisi Project - End-to-End Flow Validation

Dokumen ini memandu validasi semua 7 flow kritis yang telah diimplementasikan dalam aplikasi AlMaqdisi Project.

---

## 📋 Overview

**Tujuan:** Memastikan semua flow notification dan interaction terintegrasi dengan baik tanpa ada missing link antar role.

**Fase yang Sudah Selesai:**
- ✅ Fase 1: Donation Approval Flow
- ✅ Fase 2A: Donation Verification System  
- ✅ Fase 2B: Join Request Approval Flow
- ✅ Fase 2C: Event Registration Approval Flow
- ✅ Fase 3A-3D: Content, Task, Polling, dan Project Closure Flow
- ✅ Fase 4: Payment Timer & Persistence Layer

---

## 🧪 Test Scenarios per Flow

### FLOW 1: Donation Approval (Donatur → PIC → Donatur)

#### A. Happy Path - Donation Approved
**Roles:** Donatur, PIC, Moderator

**Steps:**
1. **[Donatur]** Login sebagai donatur reguler
2. **[Donatur]** Navigasi ke Project Detail → Klik "Donasi Sekarang"
3. **[Donatur]** Isi form donasi:
   - Nominal: Rp 100.000
   - Metode: BCA
   - Pesan & Doa (opsional)
4. **[Donatur]** Klik "Lanjutkan Donasi"
5. **[Donatur]** Verifikasi Payment Timer muncul (24 jam countdown)
6. **[Donatur]** Copy nominal dengan kode unik
7. **[Donatur]** Upload bukti transfer (JPG/PNG max 5MB)
8. **[Donatur]** Klik "Kirim Bukti Transfer"
9. **[Donatur]** Verifikasi muncul Thank You page dengan reference number
10. **[Donatur]** Check localStorage: `almaqdisi_active_donations` → donasi tersimpan
11. **[PIC]** Login ke Admin Panel
12. **[PIC]** Navigasi ke "Donation Verification"
13. **[PIC]** Verifikasi donasi pending tampil di list
14. **[PIC]** Klik "Approve" pada donasi tersebut
15. **[PIC]** Konfirmasi approval
16. **[Donatur]** Check notification center → notifikasi approval muncul
17. **[Donatur]** Navigasi ke "My Donations" → status berubah "Approved"

**Expected Results:**
- ✅ Payment timer countdown berjalan real-time
- ✅ Donation state tersimpan di localStorage
- ✅ PIC melihat pending donation dengan bukti transfer
- ✅ Donatur menerima notification setelah approval
- ✅ Status donation ter-update di My Donations

#### B. Edge Case - Payment Expired
**Steps:**
1. **[Donatur]** Mulai proses donasi
2. **[Donatur]** Biarkan timer berjalan sampai habis (atau ubah manual di dev tools)
3. **[Donatur]** Verifikasi alert "Waktu pembayaran habis" muncul
4. **[Donatur]** Verifikasi button upload disabled
5. **[Donatur]** Check localStorage → donation marked as `isExpired: true`

**Expected Results:**
- ✅ Timer menampilkan urgent warning ketika < 3 jam
- ✅ Alert muncul saat expired
- ✅ Upload button disabled setelah expired

#### C. Edge Case - Donation Rejected
**Steps:**
1-9. Follow Happy Path steps 1-9
10. **[PIC]** Login → "Donation Verification"
11. **[PIC]** Klik "Reject" pada donasi
12. **[PIC]** Isi alasan rejection: "Bukti transfer tidak jelas"
13. **[PIC]** Konfirmasi rejection
14. **[Donatur]** Check notification → notifikasi rejection dengan alasan
15. **[Donatur]** Navigasi "My Donations" → status "Rejected" dengan alasan

**Expected Results:**
- ✅ Rejection reason tersampaikan ke donatur
- ✅ Status ter-update dengan alasan rejection

---

### FLOW 2: Join Request Approval (Alumni → PIC → Alumni)

#### A. Happy Path - Request Approved
**Roles:** Non-member Alumni, PIC

**Steps:**
1. **[Alumni]** Login sebagai non-member
2. **[Alumni]** Browse project di "Explore Project"
3. **[Alumni]** Klik project "Rekonstruksi Masjid Al-Aqsa"
4. **[Alumni]** Klik button "Join Project"
5. **[Alumni]** Isi form komitmen:
   - Motivasi: "Ingin berkontribusi untuk Al-Aqsa"
   - Ketersediaan: "10 jam/minggu"
   - Bidang keahlian: ["Content Creation", "Social Media"]
6. **[Alumni]** Submit form
7. **[Alumni]** Verifikasi success message dan request sent
8. **[Alumni]** Navigasi ke "My Join Requests" → request pending
9. **[PIC]** Login → "Member Management" → "Pending Requests"
10. **[PIC]** Review request dari alumni
11. **[PIC]** Klik "Approve"
12. **[PIC]** Assign role: "Content Creator"
13. **[PIC]** Konfirmasi approval
14. **[Alumni]** Check notification → approval notification
15. **[Alumni]** Refresh homepage → Project card menampilkan "Member" badge
16. **[Alumni]** Klik project → Tab "Members" sekarang accessible
17. **[Alumni]** Verifikasi nama muncul di member list dengan role "Content Creator"

**Expected Results:**
- ✅ Komitmen form tersubmit dengan lengkap
- ✅ PIC melihat detail komitmen saat review
- ✅ Alumni mendapat notification approval
- ✅ Alumni access berubah menjadi member-only features
- ✅ Member list ter-update

#### B. Edge Case - Request Rejected
**Steps:**
1-8. Follow Happy Path steps 1-8
9. **[PIC]** Login → "Pending Requests"
10. **[PIC]** Klik "Reject"
11. **[PIC]** Isi feedback: "Mohon lengkapi portofolio content creation Anda"
12. **[Alumni]** Check notification → rejection dengan feedback
13. **[Alumni]** "My Join Requests" → status "Rejected" dengan feedback

**Expected Results:**
- ✅ Feedback rejection jelas tersampaikan
- ✅ Alumni bisa re-apply setelah perbaikan

---

### FLOW 3: Event Registration Approval (Alumni → PIC → Alumni)

#### A. Happy Path - Registration Approved
**Roles:** Alumni Member, PIC

**Steps:**
1. **[Alumni]** Login sebagai member project
2. **[Alumni]** Navigasi ke Project Detail → Tab "Discussion"
3. **[Alumni]** Scroll ke event card "Webinar: Sejarah Al-Aqsa"
4. **[Alumni]** Klik "Daftar Event"
5. **[Alumni]** Isi form registrasi:
   - Konfirmasi kehadiran: Online
   - Pertanyaan/topik: "Bagaimana sejarah pembangunan Al-Aqsa?"
6. **[Alumni]** Submit registration
7. **[Alumni]** Verifikasi success message
8. **[PIC]** Login → "Event Management" → "Event Registrations"
9. **[PIC]** Filter event "Webinar: Sejarah Al-Aqsa"
10. **[PIC]** Review pendaftar baru
11. **[PIC]** Klik "Approve" + Generate meeting link
12. **[PIC]** Input: "https://zoom.us/j/123456789"
13. **[Alumni]** Check notification → approval dengan meeting link
14. **[Alumni]** Klik link notification → redirect ke event detail dengan akses meeting

**Expected Results:**
- ✅ Registration form terkirim
- ✅ PIC melihat detail pertanyaan pendaftar
- ✅ Meeting link tergenerate dan terkirim
- ✅ Alumni menerima akses meeting

#### B. Edge Case - Registration Rejected
**Steps:**
1-7. Follow Happy Path 1-7
8. **[PIC]** Login → "Event Registrations"
9. **[PIC]** Klik "Reject"
10. **[PIC]** Isi alasan: "Kuota event sudah penuh"
11. **[Alumni]** Check notification → rejection dengan alasan
12. **[Alumni]** Event card menampilkan status "Registration Rejected"

**Expected Results:**
- ✅ Rejection reason jelas
- ✅ Status event updated

---

### FLOW 4: Content Update Notification (PIC → All Members)

#### A. Happy Path - Content Published
**Roles:** PIC, Multiple Alumni Members

**Steps:**
1. **[PIC]** Login → Select project
2. **[PIC]** Navigasi "Content Management"
3. **[PIC]** Klik "Create New Update"
4. **[PIC]** Isi form:
   - Type: "Progress Update"
   - Title: "Milestone 1 Tercapai: 50% Fundraising"
   - Content: "Alhamdulillah, kami telah mencapai 50% target fundraising..."
   - Notify Members: ✅ (checked)
5. **[PIC]** Klik "Publish"
6. **[PIC]** Verifikasi update muncul di list
7. **[Alumni 1]** Login → Check notification
8. **[Alumni 1]** Verifikasi notifikasi "Progress Update: Milestone 1 Tercapai"
9. **[Alumni 2]** Login → Check notification
10. **[Alumni 2]** Verifikasi notifikasi yang sama
11. **[Alumni 1]** Navigasi Project Detail → Tab "Progress"
12. **[Alumni 1]** Verifikasi update baru muncul di timeline

**Expected Results:**
- ✅ Semua member menerima notification
- ✅ Content tampil di tab Progress
- ✅ Notification mengarahkan ke detail update

---

### FLOW 5: Task Assignment (PIC → Alumni → PIC)

#### A. Happy Path - Task Assigned & Completed
**Roles:** PIC, Alumni Member

**Steps:**
1. **[PIC]** Login → Select project
2. **[PIC]** Navigasi "Task Management"
3. **[PIC]** Klik "Create Task"
4. **[PIC]** Isi form:
   - Title: "Buat infografis fundraising progress"
   - Description: "Design infografis untuk social media"
   - Assigned to: "Ahmad Zaki" (member dengan role Content Creator)
   - Due date: 7 hari dari sekarang
   - Priority: "High"
5. **[PIC]** Submit task
6. **[Alumni]** (Ahmad) Login → Check notification
7. **[Alumni]** Verifikasi "Task Baru: Buat infografis..." dengan priority High
8. **[Alumni]** Navigasi Project → Tab "Members" → My Tasks
9. **[Alumni]** Klik task → Update status "In Progress"
10. **[PIC]** Check task list → status updated to "In Progress"
11. **[Alumni]** Complete task → Update status "Completed"
12. **[Alumni]** Upload deliverable (optional)
13. **[PIC]** Check notification → "Task Completed" notification
14. **[PIC]** Review task → Klik "Mark as Done"

**Expected Results:**
- ✅ Task assignment notification terkirim
- ✅ Alumni melihat task di dashboard
- ✅ Status update real-time
- ✅ PIC notified saat task completed

---

### FLOW 6: Polling System (PIC → Members → PIC)

#### A. Happy Path - Polling Created & Voted
**Roles:** PIC, Multiple Alumni Members

**Steps:**
1. **[PIC]** Login → Select project
2. **[PIC]** Navigasi "Polling Management"
3. **[PIC]** Klik "Create Polling"
4. **[PIC]** Isi form:
   - Question: "Waktu terbaik untuk meeting koordinasi?"
   - Options: ["Sabtu 14:00", "Minggu 10:00", "Minggu 16:00"]
   - Deadline: 3 hari
   - Notify members: ✅
5. **[PIC]** Publish polling
6. **[Alumni 1-3]** Check notification → "Polling Baru" notification
7. **[Alumni 1]** Klik notification → redirect ke polling
8. **[Alumni 1]** Vote: "Sabtu 14:00"
9. **[Alumni 2]** Vote: "Sabtu 14:00"
10. **[Alumni 3]** Vote: "Minggu 10:00"
11. **[PIC]** Check polling results → real-time vote count
12. **[PIC]** Setelah deadline → Klik "Close Polling"
13. **[All Members]** Check notification → "Polling Closed" dengan hasil

**Expected Results:**
- ✅ Polling notification broadcast ke semua members
- ✅ Vote ter-record dengan benar
- ✅ Results tampil real-time
- ✅ Closure notification dengan final results

#### B. Reminder System
**Steps:**
1. (Follow polling creation above)
2. **[System]** 1 hari sebelum deadline → auto-send reminder
3. **[Alumni]** (yang belum vote) → Receive "Reminder: Polling akan ditutup"
4. **[Alumni]** Klik notification → redirect ke polling
5. **[Alumni]** Submit vote sebelum deadline

**Expected Results:**
- ✅ Reminder sent otomatis
- ✅ Only non-voters receive reminder

---

### FLOW 7: Withdrawal Request (PIC → Moderator/Superadmin)

#### A. Happy Path - Withdrawal Approved
**Roles:** PIC, Moderator, Superadmin

**Steps:**
1. **[PIC]** Login → Select project
2. **[PIC]** Navigasi "Project Finance" → "Wallet"
3. **[PIC]** Check available balance: Rp 5.000.000
4. **[PIC]** Klik "Request Withdrawal"
5. **[PIC]** Isi form:
   - Amount: Rp 2.000.000
   - Purpose: "Pembelian material konstruksi fase 1"
   - Supporting docs: Upload invoice/quotation
6. **[PIC]** Submit request
7. **[Moderator]** Login → Check notification
8. **[Moderator]** Verifikasi "Withdrawal Request" notification
9. **[Moderator]** Navigasi "Project Finance" → "Withdrawal Approval"
10. **[Moderator]** Review request dengan detail:
    - Amount, purpose, supporting docs
    - Current project balance
11. **[Moderator]** Klik "Approve"
12. **[Moderator]** Add notes: "Approved for phase 1 construction"
13. **[PIC]** Check notification → "Withdrawal Approved"
14. **[PIC]** Check wallet → balance updated: Rp 3.000.000
15. **[PIC]** Check transaction history → withdrawal record logged

**Expected Results:**
- ✅ Withdrawal request masuk ke approval queue
- ✅ Moderator melihat complete info untuk review
- ✅ PIC notified saat approved
- ✅ Balance real-time updated
- ✅ Transaction history complete

#### B. Edge Case - Withdrawal Rejected
**Steps:**
1-10. Follow Happy Path 1-10
11. **[Moderator]** Klik "Reject"
12. **[Moderator]** Isi reason: "Invoice tidak lengkap, mohon lampirkan detail breakdown"
13. **[PIC]** Check notification → rejection dengan reason
14. **[PIC]** Navigasi wallet → withdrawal status "Rejected" dengan feedback
15. **[PIC]** Bisa re-submit setelah melengkapi dokumen

**Expected Results:**
- ✅ Rejection reason jelas dan actionable
- ✅ PIC bisa re-submit

---

## 🔍 Cross-Cutting Concerns Testing

### A. Notification System
**Test All:**
- ✅ Notification badge count accurate
- ✅ Unread notifications highlighted
- ✅ Mark as read functionality
- ✅ Notification grouping by type
- ✅ Click notification → redirect correctly
- ✅ Notification persistence (localStorage)

### B. Permission & Role Access
**Test Matrix:**

| Feature | Donatur | Alumni Non-Member | Alumni Member | PIC | Moderator | Superadmin |
|---------|---------|-------------------|---------------|-----|-----------|------------|
| Donate | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join Request | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Members Tab | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Content Management | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Task Management | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Polling Management | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Vote Polling | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Withdrawal Request | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Approve Withdrawal | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Donation Verification | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |

### C. Data Persistence (localStorage)
**Keys to Check:**
- `almaqdisi_user_role` → Current user role
- `almaqdisi_active_donations` → Payment timer states
- (Add more keys as needed)

**Test:**
1. Perform action (e.g., start donation)
2. Check localStorage → data saved
3. Refresh page
4. Verify state restored correctly

### D. Mobile Responsiveness
**Test All Flows on:**
- Desktop (>= 1024px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

**Critical Mobile Elements:**
- Bottom navigation functional
- Payment timer readable
- Forms usable with touch
- Notifications accessible

---

## 📊 Test Execution Checklist

### Pre-Testing
- [ ] Clear localStorage
- [ ] Clear browser cache
- [ ] Prepare test accounts for each role
- [ ] Prepare test files (images for upload)
- [ ] Document test environment (browser, OS, screen size)

### During Testing
- [ ] Screenshot setiap critical step
- [ ] Log semua error messages
- [ ] Note unexpected behavior
- [ ] Time critical flows (e.g., payment timer accuracy)

### Post-Testing
- [ ] Aggregate results per flow
- [ ] Prioritize bugs by severity
- [ ] Document edge cases discovered
- [ ] Update test cases for regression

---

## 🐛 Bug Report Template

```
**Flow:** [e.g., Donation Approval]
**Severity:** [Critical / High / Medium / Low]
**Role:** [User role experiencing the bug]
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**

**Actual Result:**

**Screenshot/Video:**

**Browser/Device:**
**localStorage State (if applicable):**
```

---

## ✅ Success Criteria

**All 7 Flows PASS jika:**
1. ✅ No broken notification links
2. ✅ All role permissions enforced correctly
3. ✅ Data persistence working across page refresh
4. ✅ Payment timer countdown accurate
5. ✅ No orphaned states (e.g., pending forever)
6. ✅ Error messages clear dan actionable
7. ✅ Mobile experience smooth

**READY FOR PRODUCTION jika:**
- All Critical bugs resolved
- All High bugs resolved or documented as known issues
- Performance acceptable (page load < 3s, interactions < 1s response)
- Accessibility pass (keyboard navigation, screen reader friendly)

---

## 📝 Notes

- Test dengan data realistic (jangan "test" / "asdf")
- Test concurrency scenarios (2 PIC approve same donation simultaneously)
- Test network interruption (offline/online transitions)
- Test with expired sessions
- Monitor browser console for warnings/errors throughout testing

---

**Last Updated:** Fase 4 Implementation
**Next Update:** After Production Deployment
