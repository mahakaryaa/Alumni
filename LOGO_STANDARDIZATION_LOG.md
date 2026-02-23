# Logo Standardization - Change Log

## Tanggal: 21 Februari 2026

### Problem
Setiap halaman memiliki variasi logo yang berbeda-beda:
- Beberapa halaman menggunakan `border-2` pada icon
- Beberapa menggunakan `rounded-[15px]` vs `rounded-[12px]` vs `rounded-lg`
- Inconsistent spacing dan styling

### Solution
Standardisasi semua logo menggunakan komponen `<Logo />` yang sudah ada di `/src/app/components/Logo.tsx`

### Komponen Logo Standard
```tsx
<Logo />
```

**Spesifikasi:**
- Background: `#FAC06E`
- Icon container: `#2B4468` dengan `rounded-[8px]`
- Font: Archivo Black, uppercase
- Text: "ALMAQDISI PROJECT"
- Border radius: `rounded-[12px]`
- Padding: `px-3 py-2.5`
- Shadow: `shadow-md`

### Files Modified

1. **`/src/app/App.tsx`**
   - Location: Line 1265 (Mobile header)
   - Changed: Hardcoded logo → `<Logo />`

2. **`/src/app/components/MessagePage.tsx`**
   - Location: Line 122-128 (Sidebar)
   - Changed: Hardcoded logo with `border-2` → `<Logo />`
   - Added: `import { Logo } from './Logo';`

3. **`/src/app/components/MessagesAlumni.tsx`**
   - Location: Line 275-282 (Sidebar)
   - Changed: Hardcoded logo with `border-2` → `<Logo />`
   - Added: `import { Logo } from './Logo';`

4. **`/src/app/components/ProjectDetailAlumni.tsx`**
   - Location: Line 178-185 (Sidebar)
   - Changed: Hardcoded logo with `border-2` → `<Logo />`
   - Added: `import { Logo } from './Logo';`

5. **`/src/app/components/SettingsPage.tsx`**
   - Location: Line 149-156 (Sidebar)
   - Changed: Hardcoded logo with `border-2` → `<Logo />`
   - Added: `import { Logo } from './Logo';`

6. **`/src/app/components/admin/AdminSidebar.tsx`**
   - Location: Line 55-62 (Sidebar)
   - Changed: Hardcoded logo with `border-2` → `<Logo />`
   - Added: `import { Logo } from '../Logo';`

### Files Already Using Logo Component (No Changes Needed)

✅ `/src/app/components/AlumniStoryDetail.tsx` - Already using `<Logo />`
✅ `/src/app/components/DonationPage.tsx` - Already using `<Logo />`
✅ `/src/app/components/EventDetail.tsx` - Already using `<Logo />`
✅ `/src/app/components/ExploreProject.tsx` - Already using `<Logo />`
✅ `/src/app/components/NotificationCenter.tsx` - Already using `<Logo />`
✅ `/src/app/components/MyDonations.tsx` - Already using `<Logo />`
✅ `/src/app/components/MyJoinRequests.tsx` - Already using `<Logo />`

### Result
✅ Semua halaman sekarang menggunakan Logo component yang sama
✅ Visual consistency across the entire application
✅ Easier maintenance - single source of truth
✅ Future changes to logo only need to be made in one place

### Testing Checklist
- [ ] Homepage (logged in/out)
- [ ] Project Detail (Alumni & Donatur)
- [ ] Messages/Pesan page
- [ ] Settings page
- [ ] Admin Panel
- [ ] Mobile view (all pages)
- [ ] Desktop view (all pages)

---

**Note:** Logo component supports optional props:
- `className` - untuk custom styling tambahan
- `size` - 'sm' atau 'md' (default: 'md')

Contoh penggunaan custom:
```tsx
<Logo className="mb-4" size="sm" />
```
