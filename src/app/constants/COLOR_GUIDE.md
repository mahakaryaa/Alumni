# 🎨 ProjekKita Color Palette Guide

## Filosofi Warna

ProjekKita menggunakan sistem warna yang **konsisten**, **meaningful**, dan **aligned** dengan brand identity untuk menciptakan pengalaman visual yang kohesif di seluruh aplikasi.

---

## 📌 Brand Colors (Inti)

### Primary - Navy Blue `#243D68`
**Penggunaan:** Branding utama, navigasi, buttons, links
- Melambangkan: Profesional, trust, stabilitas
- Cocok untuk: Headers, CTA buttons, active states

### Accent - Golden Yellow `#FAC06E`
**Penggunaan:** Highlights, hover effects, badges penting
- Melambangkan: Energi, optimisme, action
- Cocok untuk: Emphasis, call-to-action, notifications

### Background - Off White `#F8F9FA`
**Penggunaan:** Background utama aplikasi
- Melambangkan: Bersih, modern, minimalis
- Cocok untuk: App background, cards, sections

---

## 🎯 Cara Penggunaan

### Import Colors
```typescript
// Import full palette
import COLORS from '@/app/constants/colors';

// Import specific color groups
import { PRIMARY, ACCENT, NEUTRAL, SEMANTIC } from '@/app/constants/colors';
```

### Contoh Penggunaan di Component

```tsx
import { PRIMARY, ACCENT, SEMANTIC } from '@/app/constants/colors';

// ✅ BENAR - Menggunakan constants
<button className="bg-[${PRIMARY.DEFAULT}] hover:bg-[${PRIMARY.HOVER}]">
  Click Me
</button>

// ✅ BENAR - Text colors
<h1 style={{ color: SEMANTIC.TEXT.HEADING }}>
  Judul
</h1>

// ❌ SALAH - Hardcoded colors
<button className="bg-[#243D68] hover:bg-[#183A74]">
  Click Me
</button>
```

---

## 📚 Color Groups Reference

### 1. PRIMARY (Navy Blue Family)
```typescript
PRIMARY.DEFAULT    // #243D68 - Main primary
PRIMARY.HOVER      // #183A74 - Hover state
PRIMARY.SIDEBAR    // #2B4468 - Sidebar background
PRIMARY[50]        // #EEF1F6 - Lightest
PRIMARY[900]       // #0E1B33 - Darkest (text)
```

**Kapan Digunakan:**
- ✅ Main buttons, primary actions
- ✅ Navigation active states
- ✅ Links dan interactive elements
- ✅ Headings dan emphasis text
- ✅ Borders untuk focus states

**Contoh:**
```tsx
// Button primary
<button className="bg-[#243D68] hover:bg-[#183A74]">
  Daftar Sekarang
</button>

// Link
<a className="text-[#243D68] hover:underline">
  Lihat Detail
</a>
```

---

### 2. ACCENT (Golden Yellow Family)
```typescript
ACCENT.DEFAULT     // #FAC06E - Main accent
ACCENT[50]         // #FFF8ED - Lightest background
ACCENT[700]        // #F29F3F - Darker variant
```

**Kapan Digunakan:**
- ✅ Highlights dan emphasis
- ✅ Hover effects pada buttons
- ✅ Badge penting atau featured items
- ✅ Call-to-action secondary
- ✅ Icons dan decorative elements

**Contoh:**
```tsx
// Badge featured
<span className="bg-[#FAC06E] text-[#243D68]">
  Featured
</span>

// Highlight background
<div className="bg-[#FFF8ED] border-[#FAC06E]">
  Promo Special!
</div>
```

---

### 3. NEUTRAL (Grays & Neutrals)
```typescript
NEUTRAL.WHITE      // #FFFFFF
NEUTRAL.BACKGROUND // #F8F9FA - App background
NEUTRAL[300]       // #E5E7EB - Borders
NEUTRAL[700]       // #6B7280 - Secondary text
NEUTRAL.BLACK      // #0E1B33 - Main text
```

**Kapan Digunakan:**
- ✅ Text colors (hierarchy)
- ✅ Borders dan dividers
- ✅ Backgrounds (cards, sections)
- ✅ Disabled states
- ✅ Subtle UI elements

**Contoh:**
```tsx
// Card dengan border
<div className="bg-white border-[#E5E7EB]">
  <h3 className="text-[#0E1B33]">Title</h3>
  <p className="text-[#6B7280]">Description</p>
</div>
```

---

### 4. FUNCTIONAL (Semantic Colors)
```typescript
FUNCTIONAL.SUCCESS  // Green - Success states
FUNCTIONAL.ERROR    // Red - Errors, danger
FUNCTIONAL.WARNING  // Amber - Warnings
FUNCTIONAL.INFO     // Blue - Information
```

**Kapan Digunakan:**
- ✅ Success messages & confirmations
- ✅ Error messages & validation
- ✅ Warning alerts
- ✅ Informational banners
- ✅ Status indicators

**Contoh:**
```tsx
// Success notification
<div className="bg-[#D1FAE5] border-[#10B981] text-[#065F46]">
  ✓ Berhasil disimpan!
</div>

// Error message
<div className="bg-[#FEE2E2] border-[#EF4444] text-[#991B1B]">
  ✗ Terjadi kesalahan
</div>
```

---

### 5. SEMANTIC (By Context)
```typescript
// Text
SEMANTIC.TEXT.PRIMARY      // Main text
SEMANTIC.TEXT.SECONDARY    // Supporting text
SEMANTIC.TEXT.DISABLED     // Disabled text

// Background
SEMANTIC.BG.PRIMARY        // Card backgrounds
SEMANTIC.BG.SECONDARY      // App background
SEMANTIC.BG.HOVER          // Hover states

// Border
SEMANTIC.BORDER.DEFAULT    // Default borders
SEMANTIC.BORDER.FOCUS      // Focus ring
```

**Kapan Digunakan:**
- ✅ Ketika butuh warna berdasarkan fungsi, bukan spesifik hex
- ✅ Membuat component yang reusable
- ✅ Konsistensi semantic meaning

**Contoh:**
```tsx
import { SEMANTIC } from '@/app/constants/colors';

<div style={{
  backgroundColor: SEMANTIC.BG.PRIMARY,
  borderColor: SEMANTIC.BORDER.DEFAULT,
  color: SEMANTIC.TEXT.PRIMARY
}}>
  Content
</div>
```

---

### 6. TEAM (Project/Team Colors)
```typescript
TEAM.BLUE    // Primary-based (Navy)
TEAM.GREEN   // Success-based (Soft Green)
TEAM.ACCENT  // Accent-based (Golden)
```

**Kapan Digunakan:**
- ✅ Diferensiasi tim/project tanpa warna liar
- ✅ Progress bars untuk teams
- ✅ Team cards dan badges
- ✅ Category indicators

**Contoh:**
```tsx
// Team card blue (Primary-based)
<div className="bg-[#EEF1F6]">
  <span className="text-[#243D68]">Tim Pendidikan</span>
</div>

// Team card green (Success-based)
<div className="bg-[#D1FAE5]">
  <span className="text-[#047857]">Tim Lingkungan</span>
</div>
```

---

### 7. PRIORITY (Task Priority)
```typescript
PRIORITY.HIGH     // Red - Urgent
PRIORITY.MEDIUM   // Amber - Important
PRIORITY.LOW      // Primary - Normal
```

**Kapan Digunakan:**
- ✅ Task priority badges
- ✅ Deadline indicators
- ✅ Status urgency

**Contoh:**
```tsx
// High priority
<span className="bg-[#EF4444] text-white">
  High Priority
</span>

// Medium priority
<span className="bg-[#F59E0B] text-white">
  Medium
</span>
```

---

### 8. VOTING (Poll System)
```typescript
VOTING.SELECTED    // Selected option
VOTING.UNSELECTED  // Unselected option
VOTING.ACTIVE      // Active poll
VOTING.CLOSED      // Closed poll
```

**Kapan Digunakan:**
- ✅ Voting interface
- ✅ Poll options
- ✅ Survey forms
- ✅ Interactive choices

**Contoh:**
```tsx
// Selected vote option
<div className="bg-[#EEF1F6] border-[#243D68]">
  <div className="bg-[#243D68]" style={{ width: '60%' }} />
</div>

// Unselected option
<div className="bg-white border-[#E5E7EB]">
  <div className="bg-[#FAC06E]" style={{ width: '40%' }} />
</div>
```

---

## 🚫 Warna yang TIDAK BOLEH Digunakan

### ❌ Tailwind Default Colors
```typescript
// JANGAN gunakan:
bg-blue-500      // ❌ Gunakan PRIMARY.DEFAULT
bg-green-500     // ❌ Gunakan FUNCTIONAL.SUCCESS.DEFAULT
bg-purple-500    // ❌ Gunakan TEAM.ACCENT
bg-indigo-500    // ❌ Gunakan PRIMARY.DEFAULT
bg-orange-500    // ❌ Gunakan ACCENT atau WARNING
text-slate-700   // ❌ Gunakan NEUTRAL[700]
```

### ❌ Random Hex Codes
```typescript
// JANGAN hardcode:
#047857          // ❌ Gunakan FUNCTIONAL.SUCCESS.DARK
#C9F7ED          // ❌ Gunakan FUNCTIONAL.SUCCESS.LIGHT
#4CAF50          // ❌ Gunakan FUNCTIONAL.SUCCESS.DEFAULT
#1F2937          // ❌ Gunakan NEUTRAL[950]
```

---

## ✅ Best Practices

### 1. Selalu Import dari Constants
```tsx
// ✅ BENAR
import { PRIMARY, ACCENT } from '@/app/constants/colors';

// ❌ SALAH
const primaryColor = '#243D68';
```

### 2. Gunakan Semantic Names
```tsx
// ✅ BENAR - Jelas konteksnya
<h1 style={{ color: SEMANTIC.TEXT.HEADING }}>Title</h1>

// ⚠️ Kurang ideal - Tidak jelas semantic meaning
<h1 style={{ color: NEUTRAL.BLACK }}>Title</h1>
```

### 3. Konsisten dengan Context
```tsx
// ✅ BENAR - Success menggunakan functional color
<div className="bg-[#D1FAE5] text-[#065F46]">
  Berhasil!
</div>

// ❌ SALAH - Success pakai primary color
<div className="bg-[#EEF1F6] text-[#243D68]">
  Berhasil!
</div>
```

### 4. Respect Color Hierarchy
```tsx
// ✅ BENAR - Primary untuk CTA utama
<button className="bg-[#243D68]">Daftar Sekarang</button>
<button className="border-[#243D68] text-[#243D68]">Pelajari Lebih</button>

// ❌ SALAH - Accent untuk CTA utama
<button className="bg-[#FAC06E]">Daftar Sekarang</button>
```

---

## 📖 Contoh Lengkap: Card Component

```tsx
import { PRIMARY, NEUTRAL, SEMANTIC, FUNCTIONAL } from '@/app/constants/colors';

export function ProjectCard({ title, status, urgent }) {
  return (
    <div 
      className="rounded-xl border shadow-sm hover:shadow-md transition-shadow"
      style={{
        backgroundColor: SEMANTIC.BG.PRIMARY, // White
        borderColor: SEMANTIC.BORDER.DEFAULT, // #D6DCE8
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: PRIMARY[50] }}>
        <h3 style={{ color: SEMANTIC.TEXT.HEADING }}>
          {title}
        </h3>
      </div>

      {/* Status Badge */}
      {status === 'open' && (
        <span style={{
          backgroundColor: FUNCTIONAL.SUCCESS.LIGHT,
          color: FUNCTIONAL.SUCCESS.TEXT,
        }}>
          Open Volunteer
        </span>
      )}

      {/* Urgent Indicator */}
      {urgent && (
        <div style={{
          backgroundColor: FUNCTIONAL.ERROR.DEFAULT,
          color: NEUTRAL.WHITE,
        }}>
          Urgent!
        </div>
      )}

      {/* CTA Button */}
      <button
        className="transition-colors"
        style={{
          backgroundColor: PRIMARY.DEFAULT,
          color: NEUTRAL.WHITE,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = PRIMARY.HOVER;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = PRIMARY.DEFAULT;
        }}
      >
        Lihat Detail
      </button>
    </div>
  );
}
```

---

## 🎨 Color Accessibility

### Contrast Ratios (WCAG AA Compliance)

**Text pada Background:**
- ✅ PRIMARY.DEFAULT (#243D68) on WHITE → 10.2:1 (Excellent)
- ✅ NEUTRAL.BLACK (#0E1B33) on WHITE → 13.5:1 (Excellent)
- ✅ NEUTRAL[700] (#6B7280) on WHITE → 5.8:1 (Good)
- ✅ WHITE on PRIMARY.DEFAULT → 10.2:1 (Excellent)
- ✅ WHITE on ACCENT.DEFAULT → 1.8:1 (⚠️ Use for non-text only)

**Rekomendasi:**
- Text pada ACCENT background → Gunakan PRIMARY.DEFAULT atau NEUTRAL.BLACK
- Small text → Gunakan darker colors (900 variants)
- Large text → Flexible, bisa gunakan lighter variants

---

## 🔄 Migration Guide (Dari Warna Lama)

### Replace Mapping

| Warna Lama | Warna Baru | Constant |
|-----------|-----------|----------|
| `#183A74` | `#183A74` | `PRIMARY.HOVER` |
| `#0E1B33` | `#0E1B33` | `NEUTRAL.BLACK` |
| `#6B7280` | `#6B7280` | `NEUTRAL[700]` |
| `#D6DCE8` | `#D6DCE8` | `SEMANTIC.BORDER.DEFAULT` |
| `bg-blue-500` | `#243D68` | `PRIMARY.DEFAULT` |
| `bg-green-500` | `#10B981` | `FUNCTIONAL.SUCCESS.DEFAULT` |
| `bg-purple-500` | `#FAC06E` | `ACCENT.DEFAULT` |
| `bg-indigo-500` | `#243D68` | `PRIMARY.DEFAULT` |
| `bg-orange-500` | `#F59E0B` | `FUNCTIONAL.WARNING.DEFAULT` |

---

## 📞 Support

Jika ada pertanyaan atau butuh guidance:
1. Cek dokumentasi ini terlebih dahulu
2. Import dari `/src/app/constants/colors.ts`
3. Gunakan semantic names untuk clarity

**Remember:** Konsistensi visual = Trust dari user! 🎯
