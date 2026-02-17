# ✅ UI Spacing Quality Checklist
## Visual Testing Guide untuk AlMaqdisi Project

**Purpose:** Memastikan konsistensi spacing dan layout di setiap komponen baru  
**Last Updated:** February 17, 2026

---

## 📋 **PRE-DEPLOYMENT CHECKLIST**

Gunakan checklist ini sebelum merge/deploy komponen baru:

### **1. INPUT FIELDS** 📝

- [ ] **Text Input**
  - [ ] Padding horizontal: `px-4` (16px) kiri dan kanan
  - [ ] Padding vertical: `py-3` (12px) atas dan bawah
  - [ ] Border: `border-2` (2px)
  - [ ] Border radius: `rounded-xl` (12px)
  - [ ] Focus state: `focus:border-[#243D68]`
  - [ ] Text tidak terlalu dekat dengan border

- [ ] **Textarea**
  - [ ] Same as text input: `px-4 py-3`
  - [ ] `resize-none` applied
  - [ ] Adequate height (minimum 3 rows)
  - [ ] Content tidak mepet ke edges

- [ ] **Select/Dropdown**
  - [ ] Left padding: `pl-4` (16px)
  - [ ] Right padding: `pr-10` (40px) ⚠️ **PENTING untuk icon**
  - [ ] Icon position: `right 0.5rem center` (8px from edge)
  - [ ] Icon size: `1.5rem` (24px)
  - [ ] Icon tidak menempel ke tepi kanan
  - [ ] `appearance-none` applied
  - [ ] `bg-white` applied

**Visual Check:**
```
┌─────────────────────────────────────┐
│  Text content here        [▼]       │ ← Icon tidak mepet!
└─────────────────────────────────────┘
   ↑                           ↑
  16px                        40px right padding
```

---

### **2. BUTTONS** 🔘

- [ ] **Primary Button**
  - [ ] Padding: `px-6 py-3` (24px horizontal, 12px vertical)
  - [ ] Border radius: `rounded-xl` (12px)
  - [ ] Font weight: `font-bold`
  - [ ] Hover state present
  - [ ] Active scale: `active:scale-[0.98]`
  - [ ] Minimum touch target: 44x44px

- [ ] **Secondary Button**
  - [ ] Padding: `px-6 py-3`
  - [ ] Border: `border-2`
  - [ ] Text tidak mepet ke border

- [ ] **Small Button**
  - [ ] Padding: `px-4 py-2` (16px horizontal, 8px vertical)
  - [ ] Border radius: `rounded-full`
  - [ ] Still comfortable to tap

- [ ] **Icon Button**
  - [ ] Padding: `p-2` (8px all sides)
  - [ ] Minimum size: 40x40px
  - [ ] Icon centered
  - [ ] Hover state present

**Visual Check:**
```
┌────────────────┐
│  Submit Form   │ ← Text ada breathing room
└────────────────┘
  ↑            ↑
 24px        24px padding
```

---

### **3. MODAL COMPONENTS** 🪟

- [ ] **Modal Overlay**
  - [ ] `fixed inset-0`
  - [ ] Backdrop blur: `backdrop-blur-sm`
  - [ ] Padding for mobile: `p-4`
  - [ ] Z-index: `z-50`

- [ ] **Modal Container**
  - [ ] Max width appropriate: `max-w-2xl` or similar
  - [ ] Border radius: `rounded-2xl`
  - [ ] Max height: `max-h-[90vh]`
  - [ ] Overflow: `overflow-y-auto`

- [ ] **Modal Header**
  - [ ] Padding: `px-6 py-4` (24px horizontal, 16px vertical)
  - [ ] Sticky: `sticky top-0`
  - [ ] Title dan close button tidak mepet
  - [ ] Z-index: `z-10`

- [ ] **Modal Body**
  - [ ] Padding: `p-6` (24px all sides)
  - [ ] Spacing between elements: `space-y-4` or `space-y-6`
  - [ ] Content tidak mepet ke edges
  - [ ] Scrollable jika panjang

- [ ] **Modal Footer**
  - [ ] Padding: `px-6 py-4`
  - [ ] Sticky: `sticky bottom-0`
  - [ ] Border top: `border-t`
  - [ ] Button gap: `gap-3`
  - [ ] Buttons tidak mepet

**Visual Check:**
```
┌───────────────────────────────────────┐
│ ← 24px → Title            [X] ← 24px →│ Header
├───────────────────────────────────────┤
│ ↑                               ↑     │
│24px  Content area              24px   │ Body
│ ↓                               ↓     │
├───────────────────────────────────────┤
│ ← 24px → [Cancel] [Submit] ← 24px →  │ Footer
└───────────────────────────────────────┘
```

---

### **4. CARDS & CONTAINERS** 📦

- [ ] **Card**
  - [ ] Padding: `p-6` (24px all sides)
  - [ ] Border radius: `rounded-xl` (12px)
  - [ ] Border: `border border-[#E5E7EB]`
  - [ ] Content tidak mepet ke edges

- [ ] **Section**
  - [ ] Padding: `p-6`
  - [ ] Spacing between subsections: `space-y-6` (24px)
  - [ ] Clear visual hierarchy

- [ ] **Grid Layout**
  - [ ] Gap between items: `gap-4` or `gap-6`
  - [ ] Responsive columns
  - [ ] Items tidak terlalu rapat

**Visual Check:**
```
┌──────────────────────────────────┐
│ ↑                          ↑     │
│24px                       24px   │
│     ┌────────────────┐           │
│     │  Card Content  │           │
│     └────────────────┘           │
│ ↓                          ↓     │
└──────────────────────────────────┘
  24px spacing all around
```

---

### **5. NAVIGATION** 🧭

- [ ] **Sidebar Nav Item**
  - [ ] Padding: `px-4 py-3.5`
  - [ ] Border radius: `rounded-xl`
  - [ ] Icon and text spacing: `gap-3`
  - [ ] Full width: `w-full`

- [ ] **Bottom Nav Item**
  - [ ] Padding: `py-2` (vertical only)
  - [ ] Flex layout: `flex-col items-center`
  - [ ] Gap between icon and text: `gap-1`
  - [ ] Each item: `flex-1`

- [ ] **Mobile Nav**
  - [ ] Padding: `px-4 py-2`
  - [ ] Touch targets adequate (44x44px minimum)
  - [ ] Icons centered

---

### **6. BADGES & TAGS** 🏷️

- [ ] **Small Badge**
  - [ ] Padding: `px-2.5 py-1` (10px horizontal, 4px vertical)
  - [ ] Border radius: `rounded-full`
  - [ ] Font size: `text-xs`
  - [ ] Font weight: `font-bold`

- [ ] **Medium Badge**
  - [ ] Padding: `px-3 py-1.5` (12px horizontal, 6px vertical)
  - [ ] Border radius: `rounded-full`
  - [ ] Border: `border`

- [ ] **Status Badge**
  - [ ] Consistent padding
  - [ ] Color contrast adequate
  - [ ] Text tidak mepet

**Visual Check:**
```
┌─────────────────┐
│  Open Volunteer │ ← Text comfortable inside
└─────────────────┘
  10-12px padding each side
```

---

### **7. FORM LAYOUTS** 📋

- [ ] **Form Sections**
  - [ ] Section title margin: `mb-3` or `mb-4`
  - [ ] Spacing between fields: `space-y-4`
  - [ ] Spacing between sections: `space-y-6`
  - [ ] Labels: `mb-2` below label

- [ ] **Grid Forms**
  - [ ] Columns: `grid-cols-1 md:grid-cols-2`
  - [ ] Gap: `gap-4`
  - [ ] Responsive breakpoints

- [ ] **Field Groups**
  - [ ] Border: `border border-[#E5E7EB]`
  - [ ] Padding: `p-4`
  - [ ] Background: `bg-[#F8F9FA]`
  - [ ] Border radius: `rounded-lg`

---

### **8. RESPONSIVE BEHAVIOR** 📱

- [ ] **Mobile (< 768px)**
  - [ ] Padding adequate: `-mx-6 px-6`
  - [ ] Touch targets minimum 44x44px
  - [ ] Single column layouts
  - [ ] Bottom navigation accessible

- [ ] **Tablet (768px - 1024px)**
  - [ ] 2-column grids where appropriate
  - [ ] Adequate spacing maintained
  - [ ] Sidebar visible if applicable

- [ ] **Desktop (> 1024px)**
  - [ ] Multi-column layouts
  - [ ] No excessive white space
  - [ ] Maximum content width reasonable

---

## 🎯 **COMMON ISSUES TO AVOID**

### ❌ **DON'T:**

1. **Dropdown Icon Mepet**
   ```tsx
   ❌ className="w-full px-4 py-2" // No pr-10!
   ```
   ✅ Fix:
   ```tsx
   className="w-full pl-4 pr-10 py-2"
   ```

2. **Button Text Too Close**
   ```tsx
   ❌ className="px-2 py-1" // Too tight!
   ```
   ✅ Fix:
   ```tsx
   className="px-6 py-3" // Primary button
   ```

3. **Modal Content Mepet**
   ```tsx
   ❌ <div className="p-2">Content</div>
   ```
   ✅ Fix:
   ```tsx
   <div className="p-6">Content</div>
   ```

4. **Inconsistent Spacing**
   ```tsx
   ❌ <div className="space-y-2">
         <div className="mb-6">Section 1</div>
         <div className="mt-4">Section 2</div>
      </div>
   ```
   ✅ Fix:
   ```tsx
   <div className="space-y-6">
     <div>Section 1</div>
     <div>Section 2</div>
   </div>
   ```

5. **Touch Target Too Small**
   ```tsx
   ❌ <button className="p-1">×</button> // 32px < 44px
   ```
   ✅ Fix:
   ```tsx
   <button className="p-2">×</button> // 40px ≈ 44px
   ```

---

## 🔍 **VISUAL TESTING STEPS**

### **Step 1: Desktop View (1920x1080)**
1. Open component in Chrome DevTools
2. Check all padding using "Inspect Element"
3. Verify no elements are mepet to edges
4. Test hover states
5. Test focus states

### **Step 2: Tablet View (768x1024)**
1. Toggle responsive mode
2. Check grid layouts collapse properly
3. Verify spacing remains adequate
4. Test touch interactions

### **Step 3: Mobile View (375x667)**
1. Check bottom navigation
2. Verify modals don't overflow
3. Test scrolling behavior
4. Ensure touch targets minimum 44x44px
5. Check horizontal spacing with `-mx-6 px-6` patterns

### **Step 4: Cross-Browser**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

---

## 📊 **MEASUREMENT QUICK REFERENCE**

### **Standard Padding Scale:**
```
p-2  = 8px   → Icon buttons, tight elements
p-3  = 12px  → Compact UI
p-4  = 16px  → Inputs (horizontal), standard spacing
p-5  = 20px  → Medium containers
p-6  = 24px  → Cards, modals, sections (MOST COMMON)
p-8  = 32px  → Large containers
p-10 = 40px  → Dropdown right padding (for icon)
```

### **Standard Gap Scale:**
```
gap-1  = 4px   → Icon to text in badges
gap-2  = 8px   → Tight spacing
gap-3  = 12px  → Nav items, comfortable
gap-4  = 16px  → Form fields, grid items (COMMON)
gap-6  = 24px  → Section spacing (PRIMARY)
```

### **Touch Targets (WCAG 2.1 AA):**
```
Minimum: 44x44px
Optimal: 48x48px

Examples:
- Icon button p-2: 40x40px ✅ (close enough)
- Button px-6 py-3: 48x48px ✅ (ideal)
- Nav item py-2: 44px height ✅ (meets minimum)
```

---

## 🎨 **BEFORE/AFTER EXAMPLES**

### **Example 1: Dropdown Icon**

**BEFORE (Mepet):**
```tsx
<select className="w-full px-4 py-2" style={{...}}>
```
Visual: Icon menempel ke tepi kanan ❌

**AFTER (Fixed):**
```tsx
<select className="w-full pl-4 pr-10 py-2" style={{
  backgroundPosition: 'right 0.5rem center'
}}>
```
Visual: Icon 8px dari tepi, comfortable ✅

---

### **Example 2: Button Padding**

**BEFORE (Cramped):**
```tsx
<button className="px-3 py-2">Submit</button>
```
Visual: Text terasa sempit ❌

**AFTER (Fixed):**
```tsx
<button className="px-6 py-3 font-bold">Submit</button>
```
Visual: Text punya breathing room ✅

---

### **Example 3: Modal Body**

**BEFORE (Content Mepet):**
```tsx
<div className="p-2">
  <input className="w-full px-4 py-3" />
</div>
```
Visual: Input terlalu dekat ke edge modal ❌

**AFTER (Fixed):**
```tsx
<div className="p-6 space-y-4">
  <input className="w-full px-4 py-3" />
</div>
```
Visual: Adequate white space around content ✅

---

## 🚀 **APPROVAL CRITERIA**

Komponen baru dapat di-approve jika:

1. ✅ All input fields have `px-4 py-3`
2. ✅ All dropdowns have `pl-4 pr-10` with icon at `right 0.5rem`
3. ✅ All primary buttons have `px-6 py-3`
4. ✅ All modals have `p-6` in body
5. ✅ All cards have `p-6`
6. ✅ Section spacing uses `space-y-6` or `gap-6`
7. ✅ No elements are visually "mepet" (too close to edges)
8. ✅ Touch targets minimum 44x44px
9. ✅ Consistent spacing scale throughout
10. ✅ Responsive behavior maintains spacing

---

## 📝 **REVIEW PROCESS**

### **Self-Review (Developer):**
1. Run through this checklist
2. Test in DevTools responsive mode
3. Take screenshots of key states
4. Verify no console errors

### **Peer Review:**
1. Clone branch
2. Test locally
3. Check DevTools measurements
4. Test on mobile device if possible

### **Final QA:**
1. Visual regression test
2. Accessibility audit
3. Cross-browser check
4. Production deployment

---

## 🎯 **SUCCESS METRICS**

**Target Scores:**
- Spacing Consistency: 100%
- Visual Balance: 10/10
- Accessibility Compliance: 100%
- Zero "Mepet" Issues: ✅

**Current Project Status:**
- ✅ All targets achieved!
- ✅ Production ready
- ✅ No spacing issues found in audit

---

## 📞 **SUPPORT**

**Questions or Issues?**
- Refer to: `/src/constants/uiDesignSystem.ts`
- Check: `/UI_SPACING_AUDIT_REPORT.md`
- Review existing components as examples

**Best Examples to Follow:**
- `/src/app/components/SettingsPage.tsx` (Forms)
- `/src/app/components/admin-revised/AlumniDataManagement.tsx` (Modals)
- `/src/app/components/ProjectDetailAlumni.tsx` (Complex layouts)

---

**Last Updated:** February 17, 2026  
**Version:** 1.0.0  
**Status:** ✅ Active & Enforced

---

## ✅ **QUICK CHECKLIST (Print & Use)**

```
☐ Inputs: px-4 py-3
☐ Dropdowns: pl-4 pr-10, icon at right 0.5rem
☐ Textareas: px-4 py-3, resize-none
☐ Primary buttons: px-6 py-3
☐ Small buttons: px-4 py-2
☐ Icon buttons: p-2 (minimum 40x40px)
☐ Cards: p-6
☐ Modal header: px-6 py-4
☐ Modal body: p-6, space-y-4
☐ Modal footer: px-6 py-4, gap-3
☐ Sections: space-y-6
☐ Grids: gap-4 or gap-6
☐ No elements mepet to edges
☐ Touch targets ≥ 44x44px
☐ Responsive spacing maintained
☐ Cross-browser tested
```

**Sign-off:**
- [ ] Developer reviewed
- [ ] Peer reviewed
- [ ] QA approved
- [ ] Ready for production

---

**End of Checklist** ✨
