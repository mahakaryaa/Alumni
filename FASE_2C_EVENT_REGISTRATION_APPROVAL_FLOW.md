# 📅 FASE 2C: EVENT REGISTRATION APPROVAL FLOW

**Status:** ✅ **COMPLETE**  
**Tanggal:** 20 Februari 2026  
**Dependencies:** Fase 1, Fase 2A (Donation Approval), Fase 2B (Join Request Approval)

---

## 🎯 TUJUAN FASE 2C

Melengkapi trilogy approval flows dengan mengimplementasikan **Event Registration Approval Flow** — dari alumni mendaftar event hingga PIC/Moderator approve/reject dengan automatic notification system dan capacity management.

---

## 📋 CHECKLIST IMPLEMENTASI

### ✅ 1. Type Definitions
- [x] `EventRegistration` interface di `/src/types/index.ts`
- [x] Notification types untuk event (`event_approved`, `event_rejected`, `event_reminder`, `event_cancelled`)
- [x] Status tracking: `pending`, `approved`, `rejected`, `attended`, `cancelled`

### ✅ 2. Global State Management (`App.tsx`)
- [x] `eventRegistrations` state array
- [x] `handleEventRegistrationSubmitted()` handler
- [x] `handleEventRegistrationStatusUpdate()` handler untuk approve/reject
- [x] Notification system terintegrasi
- [x] Props passed ke `EventDetail` component
- [x] Props passed ke `AdminPanelRevised` component

### ✅ 3. Alumni-Side Implementation (`EventDetail.tsx`)
- [x] Registration form modal dengan validasi
- [x] Personal info (pre-filled dari user data)
- [x] Motivation field (min. 50 karakter)
- [x] Dietary restrictions field
- [x] Emergency contact fields
- [x] "Has attended before" checkbox
- [x] Submit dengan toast notification
- [x] Status tracking (sudah terdaftar/belum)
- [x] User role check (hanya alumni bisa daftar)

### ✅ 4. Admin-Side Implementation
- [x] `EventRegistrationApproval.tsx` component
- [x] Stats cards (Pending, Approved, Rejected, Total)
- [x] Search & filter functionality
- [x] Tab navigation (Pending, Approved, Rejected)
- [x] Detail modal untuk lihat full registration info
- [x] Approve modal dengan custom message
- [x] Reject modal dengan rejection reason
- [x] Status badges dengan color coding
- [x] Additional info display (dietary, emergency contact)

### ✅ 5. Admin Panel Integration
- [x] Import `EventRegistrationApproval` ke `AdminPanelRevised.tsx`
- [x] Props interface update
- [x] Active page type update
- [x] Render logic untuk `event-registration-approval` page
- [x] Handler integration dengan global state

### ✅ 6. Navigation & Routing
- [x] Menu item di `AdminSidebarRevised.tsx` ("Pendaftaran Event")
- [x] Icon: `event_available`
- [x] Access roles: PIC, Moderator, Superadmin

---

## 🏗️ ARSITEKTUR IMPLEMENTASI

### 1. Data Flow - Submit Registration

```
Alumni → EventDetail.tsx
   ↓ Fill form (motivation, dietary, emergency contact)
   ↓ Submit
   ↓ handleEventRegistrationSubmitted()
   ↓ App.tsx: setEventRegistrations()
   ↓ Create notification (type: 'event_approved', title: 'Pendaftaran Event Dikirim')
   ↓ Toast: "Pendaftaran berhasil dikirim! Menunggu persetujuan panitia."
```

### 2. Data Flow - Approve Registration

```
PIC/Moderator → AdminPanelRevised
   ↓ Navigate to "Pendaftaran Event"
   ↓ EventRegistrationApproval.tsx
   ↓ View pending registrations
   ↓ Click "Setujui" → Enter approval message
   ↓ handleApprove()
   ↓ onEventRegistrationStatusUpdate() → App.tsx
   ↓ Update status: 'approved'
   ↓ Create notification (type: 'event_approved')
   ↓ Message: "Selamat! Pendaftaran Anda untuk event [title] telah disetujui. [custom message]"
```

### 3. Data Flow - Reject Registration

```
PIC/Moderator → AdminPanelRevised
   ↓ Navigate to "Pendaftaran Event"
   ↓ EventRegistrationApproval.tsx
   ↓ View pending registrations
   ↓ Click "Tolak" → Enter rejection reason
   ↓ handleReject()
   ↓ onEventRegistrationStatusUpdate() → App.tsx
   ↓ Update status: 'rejected'
   ↓ Create notification (type: 'event_rejected')
   ↓ Message: "Pendaftaran Anda untuk event [title] ditolak. Alasan: [reason]"
```

---

## 📦 KOMPONEN BARU

### 1. `/src/app/components/admin-revised/EventRegistrationApproval.tsx`
**Purpose:** Admin interface untuk review dan approve/reject event registrations

**Features:**
- Stats dashboard (4 cards)
- Search functionality (by name, email, event title)
- Filter by event
- Tab navigation (Pending/Approved/Rejected)
- Registration cards dengan:
  - Alumni info (nama, email, angkatan, kota)
  - Event info (title, date, time, location)
  - Motivation preview
  - Additional info badges (attended before, dietary, emergency contact)
  - Action buttons (Detail, Tolak, Setujui)
- Detail modal (full registration info)
- Approve modal (dengan custom message field)
- Reject modal (dengan rejection reason field)

**Props:**
```typescript
interface EventRegistrationApprovalProps {
  registrations: EventRegistration[];
  onApprove: (registrationId: string, message: string, reviewedBy: string, reviewedByRole: 'PIC' | 'Moderator') => void;
  onReject: (registrationId: string, reason: string, reviewedBy: string, reviewedByRole: 'PIC' | 'Moderator') => void;
  currentAdminName: string;
  currentAdminRole: 'pic' | 'moderator' | 'superadmin';
}
```

---

## 🔑 KEY FEATURES

### 1. **Registration Form Validation**
- No. telepon wajib diisi
- Motivation minimal 50 karakter
- Character counter real-time
- Disabled state untuk submit button

### 2. **Capacity Management (Frontend Display)**
- Quota peserta: 127/200
- Progress bar visual
- Info card dengan icon `groups`

### 3. **Additional Data Collection**
- Dietary restrictions (opsional) — untuk catering
- Emergency contact (opsional) — untuk keamanan event
- "Has attended before" checkbox — untuk statistik

### 4. **Status Badges (Color Coded)**
```typescript
pending:   bg-[#FFF9E6] text-[#F59E0B] border-[#FAC06E]
approved:  bg-[#ECFDF5] text-[#059669] border-[#86EFAC]
rejected:  bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]
attended:  bg-[#E0E7FF] text-[#4F46E5] border-[#A5B4FC]
cancelled: bg-[#F3F4F6] text-[#6B7280] border-[#D1D5DB]
```

### 5. **Notification Messages**
- **Submitted:** "Pendaftaran Anda untuk event [title] sedang dalam peninjauan."
- **Approved:** "Selamat! Pendaftaran Anda untuk event [title] telah disetujui. [Custom message]. Tanggal: [date], [time]."
- **Rejected:** "Pendaftaran Anda untuk event [title] ditolak. Alasan: [reason]"

---

## 🎨 UI/UX HIGHLIGHTS

### Alumni Side (EventDetail.tsx)
1. **Registration Button State:**
   - **Belum Daftar:** Blue button dengan shadow effect
   - **Sudah Terdaftar:** Gray button, disabled
   - **Non-alumni:** Toast error "Silakan login sebagai alumni"

2. **Modal Form:**
   - Sticky header & footer
   - Scrollable body
   - Pre-filled personal data (read-only)
   - Clear field labels dengan optional indicator
   - Event info summary card
   - Terms & conditions info box
   - Submit button dengan loading state

3. **Visual Feedback:**
   - Character counter untuk motivation
   - Toast notifications
   - Loading spinner saat submit

### Admin Side (EventRegistrationApproval.tsx)
1. **Dashboard Stats:** 4 cards dengan border color-coded
2. **Search & Filter:** Inline, responsive layout
3. **Registration Cards:**
   - Alumni avatar (initial letter circle)
   - Compact event info section
   - Motivation preview (line-clamp-2)
   - Info badges (dietary, emergency contact, attended before)
   - Metadata (submitted date, reviewed date)
   - Action buttons (color-coded by action type)

4. **Modals:**
   - **Detail:** Read-only, comprehensive view
   - **Approve:** Custom message field dengan placeholder
   - **Reject:** Rejection reason field dengan guidance text

---

## 📊 DATA MODEL

### EventRegistration Interface
```typescript
interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  alumniId: string;
  alumniName: string;
  alumniEmail: string;
  alumniPhone?: string;
  alumniPhoto?: string;
  alumniAngkatan?: string;
  alumniKota?: string;
  motivation: string;
  hasAttendedBefore?: boolean;
  dietaryRestrictions?: string;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  status: 'pending' | 'approved' | 'rejected' | 'attended' | 'cancelled';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin';
  approvalMessage?: string;
  rejectionReason?: string;
  attendedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}
```

---

## 🔄 STATE MANAGEMENT

### App.tsx Global State
```typescript
const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);

// Handler: Submit
const handleEventRegistrationSubmitted = (registration: EventRegistration) => {
  setEventRegistrations(prev => [...prev, registration]);
  // Create notification
};

// Handler: Approve/Reject
const handleEventRegistrationStatusUpdate = (
  registrationId: string,
  status: 'approved' | 'rejected',
  reason?: string,
  reviewedBy?: string,
  reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin',
  approvalMessage?: string
) => {
  setEventRegistrations(prev => 
    prev.map(r => 
      r.id === registrationId 
        ? { ...r, status, reviewedAt: new Date().toISOString(), reviewedBy, reviewedByRole, approvalMessage, rejectionReason: reason }
        : r
    )
  );
  // Create notification
};
```

---

## 🧪 TESTING SCENARIOS

### 1. Happy Path - Approve Registration
```
1. Alumni login
2. Navigate to Event Detail page
3. Click "Daftar Sekarang"
4. Fill form (motivation 50+ chars)
5. Submit
6. Toast: "Pendaftaran berhasil dikirim!"
7. Button changes to "Sudah Terdaftar" (disabled)

8. PIC login to admin panel
9. Navigate to "Pendaftaran Event"
10. See pending registration in list
11. Click "Setujui"
12. Enter approval message
13. Submit
14. Toast: "Pendaftaran event berhasil disetujui!"
15. Registration moves to "Approved" tab

16. Alumni checks notifications
17. See: "Pendaftaran Anda untuk event [title] telah disetujui. [message]"
```

### 2. Reject Path
```
1. PIC views pending registration
2. Click "Tolak"
3. Enter rejection reason
4. Submit
5. Toast: "Pendaftaran event ditolak"
6. Registration moves to "Rejected" tab

7. Alumni checks notifications
8. See: "Pendaftaran Anda ditolak. Alasan: [reason]"
```

### 3. Edge Cases
- **Non-alumni tries to register:** Toast error
- **Motivation < 50 chars:** Submit button disabled
- **Empty phone number:** Validation error
- **Empty approval message:** Error toast
- **Empty rejection reason:** Error toast

---

## 🔗 INTEGRATION POINTS

### 1. EventDetail.tsx
```typescript
<EventDetail 
  onBack={() => {}}
  userRole={userRole}
  onEventRegistrationSubmitted={handleEventRegistrationSubmitted}
/>
```

### 2. AdminPanelRevised.tsx
```typescript
<AdminPanelRevised 
  eventRegistrations={eventRegistrations}
  onEventRegistrationStatusUpdate={handleEventRegistrationStatusUpdate}
  // ... other props
/>
```

### 3. AdminSidebarRevised.tsx
```typescript
{
  id: 'event-registration-approval',
  label: 'Pendaftaran Event',
  icon: 'event_available',
  roles: ['pic', 'moderator', 'superadmin'],
}
```

---

## 🚀 NEXT STEPS (Future Enhancements)

### 1. **Capacity Management (Backend)**
- Auto-reject saat capacity penuh
- Waiting list functionality
- Priority queue untuk alumni yang pernah hadir

### 2. **Email Integration**
- Confirmation email saat approved
- Reminder email H-3, H-1
- E-ticket generation
- QR code untuk check-in

### 3. **Check-in System**
- QR scanner di panitia
- Update status `attended`
- Attendance tracking

### 4. **Event Analytics**
- Registration rate
- Approval rate
- No-show rate
- Alumni engagement metrics

### 5. **Cancellation Flow**
- Alumni bisa cancel pendaftaran
- Notification ke panitia
- Re-open slot untuk waiting list

### 6. **Bulk Actions**
- Approve multiple registrations
- Export attendee list
- Send bulk reminders

---

## 📝 CHANGELOG

### v1.0.0 - Initial Implementation (20 Feb 2026)
- ✅ EventRegistration type definition
- ✅ Global state management di App.tsx
- ✅ Registration form di EventDetail.tsx
- ✅ Admin approval interface
- ✅ Notification system integration
- ✅ Status tracking (pending/approved/rejected)

---

## 🎉 CONCLUSION

**Fase 2C: Event Registration Approval Flow** telah selesai diimplementasikan dengan lengkap, melengkapi trilogy approval flows:

1. ✅ **Fase 2A:** Donation Approval Flow
2. ✅ **Fase 2B:** Join Request Approval Flow
3. ✅ **Fase 2C:** Event Registration Approval Flow

Semua flow sudah end-to-end dengan notification system, status tracking, dan user-friendly UI/UX. Frontend sudah production-ready untuk integrasi dengan backend API.

**Total Components Created:** 1 (EventRegistrationApproval.tsx)  
**Total Files Modified:** 5 (App.tsx, EventDetail.tsx, AdminPanelRevised.tsx, AdminSidebarRevised.tsx, types/index.ts)  
**Total Lines of Code:** ~800+ lines

---

**Next Phase:** Fase 3 atau fitur lainnya sesuai roadmap implementasi.
