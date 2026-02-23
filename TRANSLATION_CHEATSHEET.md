# 🌐 AlMaqdisi Translation Cheatsheet

## 🚀 Quick Start

```typescript
import { useTranslation } from '@/hooks/useTranslation';

const { t, language } = useTranslation();
```

## 📋 Common Patterns

### Navigation
```typescript
t.nav.home          // Home
t.nav.explore       // Explore
t.nav.messages      // Pesan / Messages
t.nav.settings      // Settings
t.nav.logout        // Logout
```

### Buttons
```typescript
t.common.save       // Simpan / Save
t.common.cancel     // Batal / Cancel
t.common.edit       // Edit
t.common.delete     // Hapus / Delete
t.common.back       // Kembali / Back
t.common.view       // Lihat / View
t.common.yes        // Ya / Yes
t.common.no         // Tidak / No
```

### Project
```typescript
t.projectDetail.category     // Kategori / Category
t.projectDetail.location     // Lokasi / Location
t.projectDetail.target       // Target
t.projectDetail.collected    // Terkumpul / Collected
t.projectDetail.joinProject  // Join Project
t.projectDetail.donateNow    // Donasi Sekarang / Donate Now
```

### Status
```typescript
t.status.active      // Aktif / Active
t.status.completed   // Selesai / Completed
t.status.pending     // Menunggu / Pending
t.status.approved    // Disetujui / Approved
t.status.rejected    // Ditolak / Rejected
```

### Empty States
```typescript
t.empty.noProjects       // Tidak ada project ditemukan / No projects found
t.empty.noNotifications  // Tidak ada notifikasi / No notifications
t.empty.noMessages       // Tidak ada pesan / No messages
```

### Toasts
```typescript
t.toast.saveSuccess       // Berhasil disimpan! / Successfully saved!
t.toast.error             // Terjadi kesalahan! / An error occurred!
t.toast.areYouSure        // Apakah Anda yakin? / Are you sure?
```

## 🔧 Helper Functions

```typescript
import { formatRelativeTime, formatCurrency, formatDate } from '@/translations';

// Time
formatRelativeTime(new Date(), language)
// → "Baru saja" / "Just now"

// Currency  
formatCurrency(1500000, language)
// → "Rp 1.500.000" / "IDR 1,500,000"

// Date
formatDate(new Date(), language)
// → "24 Februari 2025" / "February 24, 2025"
```

## 💻 Copy-Paste Templates

### Basic Component
```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  return <button>{t.common.save}</button>;
}
```

### With Format Helpers
```typescript
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency, formatRelativeTime } from '@/translations';

function MyComponent({ amount, date }) {
  const { t, language } = useTranslation();
  
  return (
    <div>
      <p>{formatCurrency(amount, language)}</p>
      <span>{formatRelativeTime(date, language)}</span>
    </div>
  );
}
```

### Form Component
```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyForm() {
  const { t } = useTranslation();
  
  return (
    <form>
      <input placeholder={t.home.searchPlaceholder} />
      <button type="submit">{t.common.submit}</button>
      <button type="button">{t.common.cancel}</button>
    </form>
  );
}
```

## 📝 All Categories

```
t.nav.*              - Navigation labels
t.tabs.*             - Tab labels
t.hero.*             - Hero section
t.categories.*       - Category filters
t.home.*             - Home page sections
t.projectDetail.*    - Project detail page
t.status.*           - Status labels
t.members.*          - Members section
t.discussion.*       - Discussion section
t.wallet.*           - Wallet section
t.donation.*         - Donation page
t.messages.*         - Messages page
t.settings.*         - Settings page
t.notifications.*    - Notifications
t.campaign.*         - Campaign features
t.admin.*            - Admin panel
t.time.*             - Time-related
t.common.*           - Common actions
t.toast.*            - Toast messages
t.empty.*            - Empty states
t.explore.*          - Explore page
t.myDonations.*      - My donations
t.myJoinRequests.*   - My join requests
t.validation.*       - Form validation
t.alumniStory.*      - Alumni story
t.event.*            - Event page
t.maritalStatus.*    - Marital status
t.employmentStatus.* - Employment status
```

## 🎯 Quick Fixes

### Hard-coded text
❌ `<button>Simpan</button>`
✅ `<button>{t.common.save}</button>`

### String concatenation
❌ `<p>{'Kategori: ' + category}</p>`
✅ `<p>{t.projectDetail.category}: {category}</p>`

### Manual formatting
❌ `<span>{amount.toLocaleString()}</span>`
✅ `<span>{formatCurrency(amount, language)}</span>`

### Missing placeholders
❌ `<input />`
✅ `<input placeholder={t.home.searchPlaceholder} />`

## 📱 Mobile Navigation Labels
```typescript
// Bottom Navigation
t.nav.home       // Home
t.nav.explore    // Explore
t.nav.messages   // Pesan / Messages
t.nav.settings   // Settings
```

## 🔐 Settings Labels
```typescript
t.settings.settings          // Settings
t.settings.alumniProfile     // Profil Alumni / Alumni Profile
t.settings.accountSecurity   // Keamanan Akun / Account Security
t.settings.notifications     // Notifikasi / Notifications
t.settings.privacy           // Privasi / Privacy
t.settings.preferences       // Preferensi / Preferences
t.settings.language          // Bahasa / Language
```

## ⚡ Performance Tips

1. ✅ Import `useTranslation` at component level, not globally
2. ✅ Destructure only what you need: `const { t } = useTranslation()`
3. ✅ Use helper functions for consistent formatting
4. ✅ Don't call `formatCurrency` in loops - pre-format data

## 🐛 Common Mistakes

### ❌ DON'T
```typescript
// Using translation without hook
<p>{translations.id.common.save}</p>

// Concatenating translations
<p>{t.projectDetail.category + ': ' + name}</p>

// Forgetting language parameter
formatCurrency(amount) // Missing language!

// Hard-coding format
<p>Rp {amount.toLocaleString('id-ID')}</p>
```

### ✅ DO
```typescript
// Using hook
const { t, language } = useTranslation();
<p>{t.common.save}</p>

// Proper composition
<p>{t.projectDetail.category}: {name}</p>

// Include language
formatCurrency(amount, language)

// Use helper
<p>{formatCurrency(amount, language)}</p>
```

---

**Save this file for quick reference!** 📌
**File:** `/TRANSLATION_CHEATSHEET.md`
**Version:** 1.0.0
