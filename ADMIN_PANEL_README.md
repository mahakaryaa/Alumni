# Admin Panel AlMaqdisi Project

## 📋 Overview

Admin Panel berbasis role-based access control untuk mengelola data alumni AlMaqdisi Project. Panel ini terintegrasi dengan front-end yang sudah ada dan menggunakan komponen serta desain yang konsisten.

## 🎯 Fitur Utama

### 1. **Role-Based Access Control**
Tiga level akses dengan permission yang berbeda:

#### **PIC (Person In Charge)**
- ✅ Melihat data alumni yang menjadi tanggung jawabnya
- ✅ Mengedit data alumni yang menjadi tanggung jawabnya
- ✅ Menambah data alumni baru
- ✅ Export data alumni (scope: alumni sendiri)
- ❌ Tidak bisa melihat/edit data alumni PIC lain
- ❌ Tidak bisa mengelola user
- ❌ Tidak bisa melihat activity log

#### **Moderator**
- ✅ Melihat semua data alumni dari PIC yang dikelolanya
- ✅ Mengedit semua data alumni dari PIC yang dikelolanya
- ✅ Menambah data alumni baru
- ✅ Melihat daftar PIC yang dikelolanya
- ✅ Export data alumni (scope: PIC yang dikelola)
- ✅ Melihat activity log
- ❌ Tidak bisa menghapus alumni
- ❌ Tidak bisa mengedit/delete user
- ❌ Tidak bisa melihat data di luar scope nya

#### **Superadmin**
- ✅ **FULL ACCESS** ke semua fitur
- ✅ Melihat dan mengedit SEMUA data alumni
- ✅ Menambah, edit, delete alumni
- ✅ Manajemen user (tambah, edit, delete, activate/deactivate)
- ✅ Melihat semua activity log
- ✅ Export semua data
- ✅ Assign role ke user lain

---

## 🚀 Cara Mengakses

### 1. **Dari Homepage**
Klik tombol **"Admin Panel"** di sidebar (desktop) yang terletak di atas tombol Logout.

### 2. **Login Admin**
Gunakan kredensial admin atau klik "Lihat Demo Credentials" untuk quick login.

**Demo Credentials:**
```
Super Admin:
Email: ahmad.zaki@almaqdisi.org
Password: (apa saja - demo mode)

Moderator:
Email: siti.nurhaliza@almaqdisi.org
Password: (apa saja - demo mode)

PIC:
Email: fatimah.azzahra@almaqdisi.org
Password: (apa saja - demo mode)
```

---

## 📁 Struktur File

```
/src
├── /app/components/admin
│   ├── AccessDenied.tsx          # Komponen access denied
│   ├── ActivityLog.tsx           # Log aktivitas sistem
│   ├── AdminDashboard.tsx        # Main admin dashboard
│   ├── AdminLogin.tsx            # Login page untuk admin
│   ├── AdminSidebar.tsx          # Sidebar khusus admin
│   ├── AlumniManagement.tsx      # CRUD data alumni
│   ├── DashboardOverview.tsx     # Dashboard stats & overview
│   └── UserManagement.tsx        # Manajemen admin users
├── /types
│   └── admin.ts                  # TypeScript types untuk admin
├── /utils
│   └── adminAuth.ts              # Authentication & authorization utils
├── /data
│   └── mockAdminData.ts          # Mock data untuk development
└── /constants
    └── index.ts                  # Constants (updated dengan admin roles)
```

---

## 🎨 Komponen Utama

### **1. AdminDashboard**
Entry point utama admin panel dengan routing antar menu.

**Props:**
- `onBack: () => void` - Handler untuk logout/kembali ke main app

**Features:**
- Auto-detect user role dari localStorage
- Dynamic menu berdasarkan permissions
- Loading state saat init
- Auto-redirect jika session invalid

---

### **2. DashboardOverview**
Menampilkan statistik dan overview data.

**Stats Ditampilkan:**
- Total Alumni
- Alumni Aktif/Tidak Aktif
- Total Admin Users
- Alumni per Angkatan (chart)
- Alumni per Jurusan (chart)
- Recent Activities (timeline)

**Role-based Data:**
- PIC: hanya stats alumni sendiri
- Moderator: stats dari PIC yang dikelola
- Superadmin: stats semua data

---

### **3. AlumniManagement**
CRUD operations untuk data alumni.

**Features:**
- Search by name, email, phone
- Filter by angkatan & status
- Table view dengan pagination
- Add/Edit modal
- Delete confirmation
- Export to CSV
- Role-based visibility & actions

**Fields:**
- Nama, Email, Phone
- Angkatan, Jurusan
- Pekerjaan, Perusahaan
- Kota, Provinsi
- Notes, Tags
- Status (Active/Inactive)

---

### **4. UserManagement**
Kelola admin users (Superadmin only).

**Features:**
- Card-based user display
- Add/Edit/Delete users
- Activate/Deactivate account
- Role assignment
- Search & filter by role
- Last login tracking

**User Info:**
- Name, Email
- Role (PIC/Moderator/Superadmin)
- Status (Active/Inactive)
- Managed by (untuk PIC)
- Created date
- Last login

---

### **5. ActivityLog**
Timeline aktivitas sistem (Moderator & Superadmin).

**Features:**
- Timeline view
- Filter by action (create/update/delete/view)
- Filter by target type (alumni/user/system)
- Search by user name or description
- IP address tracking
- Timestamp

---

## 🔐 Authentication & Authorization

### **Authentication (`adminAuth.ts`)**

```typescript
// Get current logged in admin
getCurrentAdminUser(): AdminUser | null

// Save admin session
setCurrentAdminUser(user: AdminUser): void

// Clear session (logout)
clearAdminSession(): void
```

### **Authorization Helpers**

```typescript
// Get permissions for role
getRolePermissions(role: AdminRole): RolePermissions

// Check specific permission
hasPermission(user: AdminUser, permission: string): boolean

// Check if can access specific alumni
canAccessAlumni(user: AdminUser, alumniPicId: string): boolean

// Check if can manage user
canManageUser(currentUser: AdminUser, targetUser: AdminUser): boolean
```

---

## 💾 Data Management

### **Mock Data (`mockAdminData.ts`)**

Menyediakan data untuk development:
- 7 admin users (1 superadmin, 2 moderator, 4 PIC)
- 10 alumni dengan berbagai angkatan & jurusan
- 5 activity logs
- Dashboard statistics

**Helper Functions:**
```typescript
// Get alumni filtered by user role
getFilteredAlumni(userId: string, userRole: string): Alumni[]

// Get users filtered by role
getFilteredUsers(userId: string, userRole: string): AdminUser[]
```

---

## 🎯 Business Logic

### **Access Control Matrix**

| Feature | PIC | Moderator | Superadmin |
|---------|-----|-----------|------------|
| View own alumni | ✅ | ✅ | ✅ |
| View all alumni | ❌ | ✅* | ✅ |
| Create alumni | ✅ | ✅ | ✅ |
| Edit own alumni | ✅ | ✅ | ✅ |
| Edit all alumni | ❌ | ✅* | ✅ |
| Delete alumni | ❌ | ❌ | ✅ |
| View users | ❌ | ✅* | ✅ |
| Create users | ❌ | ❌ | ✅ |
| Edit users | ❌ | ❌ | ✅ |
| Delete users | ❌ | ❌ | ✅ |
| View activity log | ❌ | ✅ | ✅ |
| Export data | ✅ | ✅ | ✅ |

*Moderator: hanya scope PIC yang dikelola

---

## 🔧 Kustomisasi

### **Menambah Role Baru**

1. Update `USER_ROLES` di `/src/constants/index.ts`:
```typescript
export const USER_ROLES = {
  // ... existing roles
  ADMIN_NEW_ROLE: 'newrole',
} as const;
```

2. Update `getRolePermissions` di `/src/utils/adminAuth.ts`:
```typescript
case 'newrole':
  return {
    canViewAllAlumni: true,
    // ... permissions
  };
```

3. Update mock data di `/src/data/mockAdminData.ts`

---

### **Menambah Field Alumni**

1. Update `Alumni` interface di `/src/types/admin.ts`:
```typescript
export interface Alumni {
  // ... existing fields
  newField: string;
}
```

2. Update mock data di `/src/data/mockAdminData.ts`

3. Update form di `AlumniManagement.tsx`

---

### **Menambah Menu Baru**

1. Update `AdminSidebar.tsx`:
```typescript
const menuItems = [
  // ... existing
  {
    id: 'new-menu',
    label: 'New Menu',
    icon: 'menu_icon',
    show: hasPermission(currentUser, 'canViewNewFeature'),
  },
];
```

2. Create component untuk menu baru

3. Add routing di `AdminDashboard.tsx`:
```typescript
{activeMenu === 'new-menu' && (
  <NewMenuComponent currentUser={currentUser} />
)}
```

---

## 📝 TODO / Future Enhancements

### **Phase 1 - MVP** ✅
- [x] Role-based access control
- [x] Dashboard overview
- [x] Alumni management (CRUD)
- [x] User management
- [x] Activity log
- [x] Login system

### **Phase 2 - Enhanced**
- [ ] Backend API integration
- [ ] Real database connection
- [ ] Advanced search & filters
- [ ] Bulk operations
- [ ] Email notifications
- [ ] File upload for alumni photos

### **Phase 3 - Advanced**
- [ ] Multi-level approval workflow
- [ ] Advanced analytics & reporting
- [ ] Audit trail
- [ ] Two-factor authentication
- [ ] Session management
- [ ] IP whitelist

---

## 🐛 Troubleshooting

### **Tidak bisa login**
- Pastikan menggunakan email yang ada di mock data
- Check browser console untuk error
- Clear localStorage: `localStorage.clear()`

### **Access Denied muncul terus**
- Pastikan role user sesuai dengan permission yang diperlukan
- Check `getRolePermissions` di `adminAuth.ts`
- Logout dan login ulang

### **Data tidak muncul**
- Check role user - mungkin tidak punya akses
- Verify filter yang aktif
- Check `getFilteredAlumni` / `getFilteredUsers`

---

## 📞 Support

Untuk pertanyaan atau issues:
1. Check dokumentasi di atas
2. Review code di `/src/app/components/admin`
3. Check mock data di `/src/data/mockAdminData.ts`

---

## 📄 License

Internal use only - AlMaqdisi Project Admin Panel
