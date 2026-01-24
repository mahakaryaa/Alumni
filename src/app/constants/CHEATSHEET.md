# 🎨 ProjekKita Color Cheat Sheet

Quick reference untuk warna yang paling sering digunakan.

---

## 🚀 Quick Start

```typescript
// Import
import { PRIMARY, ACCENT, NEUTRAL, SEMANTIC } from '@/app/constants/colors';

// Atau import semua
import COLORS from '@/app/constants/colors';
```

---

## 📋 Most Used Colors

### Buttons

```tsx
// Primary Button
className="bg-[#243D68] hover:bg-[#183A74] text-white"
// or
style={{ 
  backgroundColor: PRIMARY.DEFAULT,
  color: NEUTRAL.WHITE 
}}

// Secondary Button (Outline)
className="border-[#243D68] text-[#243D68] hover:bg-[#EEF1F6]"

// Accent Button
className="bg-[#FAC06E] text-[#243D68] hover:bg-[#F9B05D]"
```

### Text

```tsx
// Heading
className="text-[#0E1B33]"
style={{ color: SEMANTIC.TEXT.HEADING }}

// Body / Secondary Text
className="text-[#6B7280]"
style={{ color: SEMANTIC.TEXT.SECONDARY }}

// Link
className="text-[#243D68] hover:underline"
```

### Backgrounds

```tsx
// Card / Container
className="bg-white border border-[#D6DCE8]"

// Page Background
className="bg-[#F8F9FA]"

// Hover State
className="hover:bg-[#F8F9FA]"
```

### Borders

```tsx
// Default Border
className="border-[#D6DCE8]"

// Focus Ring
className="focus:ring-2 focus:ring-[#243D68]"

// Divider
className="border-t border-[#E5E7EB]"
```

---

## 🎯 Common Patterns

### Card Component

```tsx
<div className="bg-white rounded-xl border border-[#D6DCE8] p-6 shadow-sm hover:shadow-md">
  <h3 className="text-[#0E1B33] font-bold text-lg">Title</h3>
  <p className="text-[#6B7280] text-sm mt-2">Description</p>
  <button className="mt-4 bg-[#243D68] text-white px-4 py-2 rounded-lg hover:bg-[#183A74]">
    Action
  </button>
</div>
```

### Badge - Open Volunteer

```tsx
<span className="bg-[#D1FAE5] text-[#047857] px-3 py-1 rounded-full text-xs font-bold">
  Open Volunteer
</span>
```

### Badge - Project Team

```tsx
<span className="bg-[#D9EDF8] text-[#243D68] px-3 py-1 rounded-full text-xs font-bold">
  Project Tim
</span>
```

### Badge - Urgent

```tsx
<span className="bg-[#FEE2E2] text-[#991B1B] px-3 py-1 rounded-full text-xs font-bold">
  Urgent
</span>
```

### Success Message

```tsx
<div className="bg-[#D1FAE5] border border-[#10B981] text-[#065F46] p-4 rounded-lg">
  ✓ Berhasil disimpan!
</div>
```

### Error Message

```tsx
<div className="bg-[#FEE2E2] border border-[#EF4444] text-[#991B1B] p-4 rounded-lg">
  ✗ Terjadi kesalahan
</div>
```

### Warning Alert

```tsx
<div className="bg-[#FEF3C7] border border-[#F59E0B] text-[#92400E] p-4 rounded-lg">
  ⚠ Perhatian!
</div>
```

### Progress Bar

```tsx
<div className="w-full bg-[#E5E7EB] rounded-full h-2">
  <div 
    className="bg-[#243D68] h-2 rounded-full transition-all"
    style={{ width: '60%' }}
  />
</div>
```

### Navigation Active State

```tsx
<button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white">
  <span>Active Menu</span>
</button>

<button className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white">
  <span>Inactive Menu</span>
</button>
```

### Team Card (Primary)

```tsx
<div className="bg-[#EEF1F6] p-5 rounded-xl">
  <div className="w-12 h-12 bg-[#D6DCE8] rounded-xl flex items-center justify-center mb-3">
    <span className="text-[#243D68]">🎓</span>
  </div>
  <h3 className="text-[#243D68] font-bold">Tim Pendidikan</h3>
  <div className="w-full bg-[#D6DCE8] rounded-full h-2 mt-4">
    <div className="bg-[#243D68] h-2 rounded-full" style={{ width: '75%' }} />
  </div>
</div>
```

### Team Card (Success/Green)

```tsx
<div className="bg-[#D1FAE5] p-5 rounded-xl">
  <div className="w-12 h-12 bg-[#A7F3D0] rounded-xl flex items-center justify-center mb-3">
    <span className="text-[#047857]">🌱</span>
  </div>
  <h3 className="text-[#047857] font-bold">Tim Lingkungan</h3>
  <div className="w-full bg-[#A7F3D0] rounded-full h-2 mt-4">
    <div className="bg-[#10B981] h-2 rounded-full" style={{ width: '60%' }} />
  </div>
</div>
```

### Team Card (Accent)

```tsx
<div className="bg-[#FFF8ED] p-5 rounded-xl">
  <div className="w-12 h-12 bg-[#FDE3B3] rounded-xl flex items-center justify-center mb-3">
    <span className="text-[#E88F21]">💼</span>
  </div>
  <h3 className="text-[#E88F21] font-bold">Tim Bisnis</h3>
  <div className="w-full bg-[#FDE3B3] rounded-full h-2 mt-4">
    <div className="bg-[#FAC06E] h-2 rounded-full" style={{ width: '45%' }} />
  </div>
</div>
```

### Input Field

```tsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-lg border border-[#D6DCE8] bg-white text-[#0E1B33] placeholder-[#919EB2] focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] outline-none"
  placeholder="Ketik sesuatu..."
/>
```

### Sidebar (Desktop)

```tsx
<aside className="w-64 bg-[#2B4468] fixed h-screen">
  {/* Logo */}
  <div className="p-5">
    <div className="bg-[#FAC06E] p-3 rounded-lg">
      <span className="text-[#2B4468] font-bold">PROJEKKITA</span>
    </div>
  </div>
  
  {/* Navigation */}
  <nav className="px-5">
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white">
      Active
    </button>
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white">
      Inactive
    </button>
  </nav>
</aside>
```

### Modal Overlay

```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
  <div className="bg-white rounded-xl p-6 shadow-xl max-w-md mx-auto mt-20">
    <h2 className="text-[#0E1B33] text-xl font-bold mb-4">Modal Title</h2>
    <p className="text-[#6B7280] mb-6">Modal content here</p>
    <div className="flex gap-3">
      <button className="flex-1 py-3 rounded-xl bg-[#E5E8EC] text-[#6B7280] hover:bg-[#D6DCE8]">
        Cancel
      </button>
      <button className="flex-1 py-3 rounded-xl bg-[#243D68] text-white hover:bg-[#183A74]">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## 🎨 Color Reference Table

| Use Case | Color Code | Constant |
|----------|-----------|----------|
| **Primary Button BG** | `#243D68` | `PRIMARY.DEFAULT` |
| **Primary Button Hover** | `#183A74` | `PRIMARY.HOVER` |
| **Accent Highlight** | `#FAC06E` | `ACCENT.DEFAULT` |
| **Page Background** | `#F8F9FA` | `NEUTRAL.BACKGROUND` |
| **Card/Container BG** | `#FFFFFF` | `NEUTRAL.WHITE` |
| **Heading Text** | `#0E1B33` | `NEUTRAL.BLACK` |
| **Body Text** | `#6B7280` | `NEUTRAL[700]` |
| **Placeholder** | `#919EB2` | `NEUTRAL[600]` |
| **Border Default** | `#D6DCE8` | `NEUTRAL[400]` |
| **Border Light** | `#E5E7EB` | `NEUTRAL[300]` |
| **Sidebar** | `#2B4468` | `PRIMARY.SIDEBAR` |
| **Success BG** | `#D1FAE5` | `FUNCTIONAL.SUCCESS.LIGHT` |
| **Success Text** | `#047857` | `FUNCTIONAL.SUCCESS.DARK` |
| **Error BG** | `#FEE2E2` | `FUNCTIONAL.ERROR.LIGHT` |
| **Error Text** | `#991B1B` | `FUNCTIONAL.ERROR.TEXT` |
| **Warning BG** | `#FEF3C7` | `FUNCTIONAL.WARNING.LIGHT` |
| **Warning Text** | `#92400E` | `FUNCTIONAL.WARNING.TEXT` |

---

## ❌ DON'T Use These

```tsx
// ❌ JANGAN gunakan Tailwind defaults
bg-blue-500
bg-green-500
bg-purple-500
bg-indigo-500
bg-orange-500
text-slate-700
text-gray-600

// ❌ JANGAN hardcode random hex
#047857 (use FUNCTIONAL.SUCCESS.DARK)
#C9F7ED (use FUNCTIONAL.SUCCESS.LIGHT)
#4CAF50 (use FUNCTIONAL.SUCCESS.DEFAULT)
#1F2937 (use NEUTRAL[950])
```

---

## ✅ DO Use These

```tsx
// ✅ Import constants
import { PRIMARY, ACCENT, NEUTRAL, SEMANTIC } from '@/app/constants/colors';

// ✅ Use Tailwind arbitrary values with constants
className={`bg-[${PRIMARY.DEFAULT}]`}

// ✅ Use inline styles with constants
style={{ backgroundColor: PRIMARY.DEFAULT }}

// ✅ Use semantic names
style={{ color: SEMANTIC.TEXT.HEADING }}
```

---

## 🔥 Pro Tips

1. **Copy-paste patterns above** - Mereka sudah tested dan konsisten
2. **Prioritas:** Primary > Accent > Neutral
3. **Contrast check:** Text gelap (#0E1B33) pada bg terang, text putih pada bg gelap
4. **Hover states:** Selalu gunakan darker variant untuk hover
5. **Spacing:** Pair dengan spacing yang konsisten (px-4, py-3, gap-3, dll)

---

Print atau bookmark halaman ini untuk referensi cepat! 🚀
