# 📁 ProjekKita Constants

Central repository untuk semua konstanta aplikasi ProjekKita.

---

## 📂 File Structure

```
/src/app/constants/
├── colors.ts              # ⭐ Main color palette
├── colorHelpers.ts        # 🛠️ Utility functions untuk warna
├── index.ts               # 📦 Central exports
├── COLOR_GUIDE.md         # 📖 Comprehensive guide
├── CHEATSHEET.md          # 🚀 Quick reference
├── COLOR_PALETTE.html     # 🎨 Visual preview
└── README.md              # 📝 This file
```

---

## 🚀 Quick Start

### Import Colors

```typescript
// Recommended: Import specific groups
import { PRIMARY, ACCENT, NEUTRAL, SEMANTIC } from '@/app/constants/colors';

// Alternative: Import all colors
import COLORS from '@/app/constants/colors';

// Alternative: Import from index
import { PRIMARY, ACCENT } from '@/app/constants';
```

### Basic Usage

```tsx
import { PRIMARY, ACCENT, SEMANTIC } from '@/app/constants/colors';

function MyComponent() {
  return (
    <div className={`bg-[${SEMANTIC.BG.PRIMARY}] border border-[${SEMANTIC.BORDER.DEFAULT}]`}>
      <h1 className={`text-[${SEMANTIC.TEXT.HEADING}]`}>
        Judul
      </h1>
      <button 
        className={`bg-[${PRIMARY.DEFAULT}] hover:bg-[${PRIMARY.HOVER}] text-white`}
      >
        Click Me
      </button>
    </div>
  );
}
```

---

## 📚 Documentation Files

### 1. **colors.ts** ⭐
Main color palette dengan semua definisi warna.

**Contains:**
- PRIMARY colors (Navy Blue family)
- ACCENT colors (Golden Yellow family)
- NEUTRAL colors (Grays & backgrounds)
- FUNCTIONAL colors (Success, Error, Warning, Info)
- SEMANTIC colors (By usage context)
- TEAM colors (Project/team differentiation)
- PRIORITY colors (Task urgency)
- VOTING colors (Poll system)
- GRADIENTS presets
- SHADOWS presets
- OPACITY values

**Use when:** You need to import color constants

---

### 2. **colorHelpers.ts** 🛠️
Helper functions untuk manipulasi dan penggunaan warna.

**Contains:**
- `withOpacity()` - Add opacity to hex color
- `hexToRgb()` - Convert hex to RGB
- `hexToRgba()` - Convert hex to RGBA string
- `tw()` - Generate Tailwind classes
- `getButtonColors()` - Get button color variants
- `getBadgeColors()` - Get badge color variants
- `getStatusColors()` - Get status color variants
- `getContrastRatio()` - Calculate WCAG contrast
- `meetsWCAG_AA()` - Check accessibility
- And more...

**Use when:** You need color utilities and transformations

**Example:**
```typescript
import { withOpacity, getButtonColors } from '@/app/constants/colorHelpers';

// Add opacity
const transparentPrimary = withOpacity('#243D68', 0.5); // #243D6880

// Get button colors
const btnColors = getButtonColors('primary');
// { bg: '#243D68', hover: '#183A74', text: '#FFFFFF' }
```

---

### 3. **COLOR_GUIDE.md** 📖
Comprehensive documentation lengkap tentang color system.

**Contains:**
- Philosophy & meaning dari setiap warna
- Detailed explanation untuk setiap color group
- Usage guidelines & best practices
- Do's and Don'ts
- Accessibility guidelines
- Migration guide dari warna lama
- Complete examples

**Use when:** 
- First time using color system
- Need to understand color meaning
- Looking for best practices
- Training new team members

---

### 4. **CHEATSHEET.md** 🚀
Quick reference untuk warna yang paling sering digunakan.

**Contains:**
- Most used colors
- Common component patterns
- Copy-paste ready code
- Quick color reference table
- Pro tips

**Use when:**
- Need quick color lookup
- Want to copy-paste patterns
- Building components rapidly
- Need a reminder of color codes

---

### 5. **COLOR_PALETTE.html** 🎨
Visual preview dari color palette.

**Contains:**
- Interactive color swatches
- Visual examples
- Component previews
- Real usage demonstrations

**Use when:**
- Want to see colors visually
- Presenting to stakeholders
- Choosing colors for design
- Validating color combinations

**How to view:**
1. Open file di browser
2. Or use VS Code Live Server extension
3. Or deploy to static hosting

---

## 🎯 Color Groups Overview

### PRIMARY (Navy Blue)
```typescript
PRIMARY.DEFAULT    // #243D68 - Main brand color
PRIMARY.HOVER      // #183A74 - Hover states
PRIMARY.SIDEBAR    // #2B4468 - Sidebar background
PRIMARY[50-900]    // Light to dark variants
```

### ACCENT (Golden Yellow)
```typescript
ACCENT.DEFAULT     // #FAC06E - Main accent
ACCENT[50-900]     // Light to dark variants
```

### NEUTRAL (Grays)
```typescript
NEUTRAL.WHITE      // #FFFFFF
NEUTRAL.BACKGROUND // #F8F9FA
NEUTRAL.BLACK      // #0E1B33
NEUTRAL[50-950]    // Light to dark grays
```

### FUNCTIONAL (Semantic)
```typescript
FUNCTIONAL.SUCCESS  // Green - Success states
FUNCTIONAL.ERROR    // Red - Error states
FUNCTIONAL.WARNING  // Amber - Warning states
FUNCTIONAL.INFO     // Blue - Info states
```

### SEMANTIC (By Context)
```typescript
SEMANTIC.TEXT       // Text colors hierarchy
SEMANTIC.BG         // Background colors
SEMANTIC.BORDER     // Border colors
SEMANTIC.INTERACTIVE // Interactive elements
```

---

## ✅ Best Practices

### 1. Always Import from Constants
```tsx
// ✅ GOOD
import { PRIMARY } from '@/app/constants/colors';

// ❌ BAD
const primaryColor = '#243D68';
```

### 2. Use Semantic Names When Possible
```tsx
// ✅ GOOD - Clear intent
style={{ color: SEMANTIC.TEXT.HEADING }}

// ⚠️ OK - But less semantic
style={{ color: NEUTRAL.BLACK }}
```

### 3. Respect Color Hierarchy
- PRIMARY for main actions
- ACCENT for emphasis
- NEUTRAL for supporting elements
- FUNCTIONAL for system states

### 4. Check Accessibility
```typescript
import { meetsWCAG_AA } from '@/app/constants/colorHelpers';

// Check contrast before using
if (meetsWCAG_AA(backgroundColor, textColor)) {
  // Safe to use
}
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T Hardcode Colors
```tsx
// ❌ BAD
<div className="bg-[#243D68]">

// ✅ GOOD
import { PRIMARY } from '@/app/constants/colors';
<div className={`bg-[${PRIMARY.DEFAULT}]`}>
```

### ❌ DON'T Use Tailwind Defaults
```tsx
// ❌ BAD
className="bg-blue-500 text-green-600"

// ✅ GOOD
className={`bg-[${PRIMARY.DEFAULT}] text-[${FUNCTIONAL.SUCCESS.DEFAULT}]`}
```

### ❌ DON'T Create Random Colors
```tsx
// ❌ BAD
style={{ backgroundColor: '#C9F7ED' }}

// ✅ GOOD
style={{ backgroundColor: FUNCTIONAL.SUCCESS.LIGHT }}
```

---

## 🔄 Migration from Old Colors

Jika Anda menemukan warna lama, replace dengan:

| Old Color | New Constant |
|-----------|-------------|
| `#183A74` | `PRIMARY.HOVER` |
| `#0E1B33` | `NEUTRAL.BLACK` |
| `#6B7280` | `NEUTRAL[700]` |
| `#D6DCE8` | `NEUTRAL[400]` |
| `bg-blue-500` | `PRIMARY.DEFAULT` |
| `bg-green-500` | `FUNCTIONAL.SUCCESS.DEFAULT` |
| `bg-purple-500` | `ACCENT.DEFAULT` |

---

## 📖 Further Reading

1. **New to the system?** → Start with `COLOR_GUIDE.md`
2. **Need quick reference?** → Check `CHEATSHEET.md`
3. **Want to see colors?** → Open `COLOR_PALETTE.html`
4. **Building components?** → Import from `colors.ts`
5. **Need utilities?** → Use functions from `colorHelpers.ts`

---

## 🎨 Visual Preview

Open `COLOR_PALETTE.html` in your browser to see:
- All color swatches with codes
- Real component examples
- Interactive demos
- Usage guidelines

---

## 🤝 Contributing

When adding new colors:

1. ✅ Check if existing color can be used
2. ✅ Add to appropriate group in `colors.ts`
3. ✅ Document in `COLOR_GUIDE.md`
4. ✅ Add to `CHEATSHEET.md` if commonly used
5. ✅ Update `COLOR_PALETTE.html` visual
6. ✅ Consider accessibility (WCAG AA)

---

## 📞 Support

**Questions?**
1. Check documentation files first
2. Search in `COLOR_GUIDE.md`
3. Look for examples in `CHEATSHEET.md`
4. View colors in `COLOR_PALETTE.html`

**Found inconsistency?**
Report it and help improve the system!

---

## 🏆 Goals

This color system aims to:
- ✅ **Consistency** - Same colors across all components
- ✅ **Maintainability** - Single source of truth
- ✅ **Accessibility** - WCAG compliant combinations
- ✅ **Developer Experience** - Easy to use and discover
- ✅ **Brand Alignment** - Reflects ProjekKita identity

---

**Remember:** Consistent colors = Professional look = User trust! 🎯

Last Updated: January 2026
