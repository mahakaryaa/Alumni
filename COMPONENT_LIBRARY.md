# ProjekKita Design System - Component Library

## 📦 Komponen yang Tersedia

### 1. Button Components (`/src/app/components/ui/button-variants.tsx`)

#### **Button** - Primary Button Component
```tsx
import { Button } from '@/app/components/ui/button-variants';

// Primary Button (default)
<Button>Click Me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="signature">Signature CTA</Button>
<Button variant="ghost">Ghost</Button>

// Sizes (all with proper 44px+ touch targets)
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With Icons
<Button 
  icon={<span className="material-symbols-outlined">arrow_forward</span>}
  iconPosition="right"
>
  Explore Project
</Button>

// Full Width
<Button fullWidth>Full Width Button</Button>

// Disabled
<Button disabled>Disabled Button</Button>
```

#### **IconButton** - Icon-Only Button (44x44px minimum)
```tsx
import { IconButton } from '@/app/components/ui/button-variants';

<IconButton 
  icon={<span className="material-symbols-outlined">notifications</span>}
  size="md"
/>
```

---

### 2. Loading Components (`/src/app/components/ui/loading.tsx`)

#### **LoadingSpinner**
```tsx
import { LoadingSpinner } from '@/app/components/ui/loading';

<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

#### **CardSkeleton** - Untuk loading cards
```tsx
import { CardSkeleton } from '@/app/components/ui/loading';

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <CardSkeleton />
  <CardSkeleton />
</div>
```

#### **TextSkeleton** - Untuk loading text
```tsx
import { TextSkeleton } from '@/app/components/ui/loading';

<TextSkeleton lines={3} />
```

#### **PageLoading** - Full page loading
```tsx
import { PageLoading } from '@/app/components/ui/loading';

if (isLoading) return <PageLoading />;
```

#### **ButtonLoading** - Loading state di button
```tsx
import { ButtonLoading } from '@/app/components/ui/loading';

<button disabled>
  <ButtonLoading text="Memproses..." />
</button>
```

#### **OverlayLoading** - Modal loading overlay
```tsx
import { OverlayLoading } from '@/app/components/ui/loading';

{isProcessing && <OverlayLoading text="Menyimpan data..." />}
```

---

### 3. Feedback Components (`/src/app/components/ui/feedback.tsx`)

#### **InputField** - Form input dengan validation
```tsx
import { InputField } from '@/app/components/ui/feedback';

// Basic Input
<InputField 
  label="Email"
  placeholder="Masukkan email Anda"
/>

// With Error
<InputField 
  label="Email"
  placeholder="Masukkan email Anda"
  error="Email tidak valid"
/>

// With Success
<InputField 
  label="Email"
  placeholder="Masukkan email Anda"
  success={true}
/>

// With Icon
<InputField 
  label="Email"
  icon={<span className="material-symbols-outlined">mail</span>}
  placeholder="Masukkan email Anda"
/>

// With Helper Text
<InputField 
  label="Password"
  type="password"
  helperText="Minimal 8 karakter"
/>
```

#### **Alert** - Alert messages
```tsx
import { Alert } from '@/app/components/ui/feedback';

<Alert 
  type="success"
  title="Berhasil!"
  message="Data Anda berhasil disimpan"
  onClose={() => setShowAlert(false)}
/>

<Alert 
  type="error"
  message="Terjadi kesalahan saat menyimpan data"
/>

<Alert 
  type="warning"
  message="Perhatian: Data Anda akan dihapus"
  action={{
    label: "Batal",
    onClick: () => console.log('cancelled')
  }}
/>

<Alert 
  type="info"
  message="Tips: Gunakan fitur filter untuk hasil lebih spesifik"
/>
```

#### **Toast** - Toast notifications
```tsx
import { Toast } from '@/app/components/ui/feedback';
import { useState } from 'react';

const [showToast, setShowToast] = useState(false);

<Toast 
  type="success"
  message="Berhasil disimpan!"
  visible={showToast}
  onClose={() => setShowToast(false)}
/>
```

#### **EmptyState** - Empty state placeholder
```tsx
import { EmptyState } from '@/app/components/ui/feedback';

<EmptyState 
  icon="inbox"
  title="Belum Ada Proyek"
  description="Anda belum memiliki proyek. Mulai bergabung dengan proyek yang ada atau buat proyek baru."
  action={{
    label: "Explore Proyek",
    onClick: () => navigate('/explore')
  }}
/>
```

#### **ErrorFallback** - Error boundary fallback
```tsx
import { ErrorFallback } from '@/app/components/ui/feedback';

<ErrorFallback 
  error={error}
  resetError={() => window.location.reload()}
/>
```

---

## 🎨 Design Tokens (dari theme.css)

### Colors
```css
--primary: #243D68
--primary-hover: #183A74
--accent: #FAC06E
--background: #F8F9FA
--sidebar: #2B4468
--text-primary: #0E1B33
--text-secondary: #374151
--text-muted: #6B7280
```

### Spacing Scale
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
```

### Border Radius
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 20px
--radius-2xl: 24px
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-signature: 6px 6px 0px rgba(250,192,110,1)
```

---

## 📱 Touch Target Guidelines

**Semua interactive elements minimum 44x44px** untuk mobile accessibility:
- Buttons: `min-h-[44px]`
- Icon buttons: `w-11 h-11` (44px)
- Navigation items: `py-3.5` untuk mencapai 44px height

---

## ✅ Best Practices

### 1. **Gunakan Button Component**
❌ Bad:
```tsx
<button className="bg-[#243D68] text-white px-6 py-3 rounded-xl">
  Click Me
</button>
```

✅ Good:
```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

### 2. **Show Loading States**
❌ Bad:
```tsx
{isLoading ? 'Loading...' : <ProjectList />}
```

✅ Good:
```tsx
{isLoading ? <CardSkeleton /> : <ProjectList />}
```

### 3. **Handle Errors Gracefully**
❌ Bad:
```tsx
{error && <p>Error!</p>}
```

✅ Good:
```tsx
{error && (
  <Alert 
    type="error"
    message={error.message}
    action={{
      label: "Coba Lagi",
      onClick: retry
    }}
  />
)}
```

### 4. **Use Consistent Border Radius**
- Cards: `rounded-2xl` (16px)
- Images inside cards: `rounded-xl` (12px)
- Buttons: `rounded-xl` (12px)
- Input fields: `rounded-xl` (12px)

---

## 🚀 Usage Examples

### Complete Form with Validation
```tsx
import { useState } from 'react';
import { InputField } from '@/app/components/ui/feedback';
import { Button } from '@/app/components/ui/button-variants';
import { Toast } from '@/app/components/ui/feedback';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // API call
      await register(email);
      setShowToast(true);
    } catch (err) {
      setError('Email sudah terdaftar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <InputField 
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        icon={<span className="material-symbols-outlined">mail</span>}
      />
      
      <Button 
        fullWidth
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? <ButtonLoading /> : 'Daftar'}
      </Button>

      <Toast 
        type="success"
        message="Registrasi berhasil!"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
```

### Loading State Pattern
```tsx
import { CardSkeleton } from '@/app/components/ui/loading';
import { EmptyState } from '@/app/components/ui/feedback';

function ProjectList() {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorFallback error={error} resetError={retry} />;
  }

  if (projects.length === 0) {
    return (
      <EmptyState 
        icon="inbox"
        title="Belum Ada Proyek"
        description="Mulai dengan membuat proyek pertama Anda"
        action={{
          label: "Buat Proyek",
          onClick: () => navigate('/create')
        }}
      />
    );
  }

  return <div>{/* render projects */}</div>;
}
```

---

## 📊 Accessibility Checklist

- ✅ All touch targets minimum 44x44px
- ✅ Text contrast ratio minimum 4.5:1 (WCAG AA)
- ✅ Loading states with aria-label
- ✅ Error messages dengan icon + text
- ✅ Keyboard navigation support
- ✅ Focus states visible
- ✅ Alt text untuk images

---

Gunakan komponen-komponen ini untuk menjaga **consistency** dan **quality** di seluruh aplikasi ProjekKita! 🚀
