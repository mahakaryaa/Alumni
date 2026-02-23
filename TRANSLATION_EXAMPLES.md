# 📖 Translation Implementation Examples

## Example 1: Sidebar Navigation in App.tsx

### Before:
```tsx
<nav className="flex-1 px-5 pt-8">
  <div className="space-y-2">
    <a href="#" className="...">
      <span className="material-symbols-outlined">home</span>
      <span>Home</span>
    </a>
    <a href="#" className="...">
      <span className="material-symbols-outlined">explore</span>
      <span>Explore</span>
    </a>
    <a href="#" className="...">
      <span className="material-symbols-outlined">chat_bubble</span>
      <span>Pesan</span>
    </a>
  </div>
</nav>
```

### After:
```tsx
<nav className="flex-1 px-5 pt-8">
  <div className="space-y-2">
    <a href="#" className="...">
      <span className="material-symbols-outlined">home</span>
      <span>{t.nav.home}</span>
    </a>
    <a href="#" className="...">
      <span className="material-symbols-outlined">explore</span>
      <span>{t.nav.explore}</span>
    </a>
    <a href="#" className="...">
      <span className="material-symbols-outlined">chat_bubble</span>
      <span>{t.nav.messages}</span>
    </a>
  </div>
</nav>
```

---

## Example 2: Project Detail Component

### Before:
```tsx
function ProjectDetail() {
  return (
    <div>
      <h2>Detail Project</h2>
      <div>
        <span>Kategori:</span> Pendidikan
      </div>
      <div>
        <span>Lokasi:</span> Jakarta
      </div>
      <div>
        <span>Target:</span> Rp 50.000.000
      </div>
      <button>Join Project</button>
      <button>Donasi Sekarang</button>
    </div>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/translations';

function ProjectDetail() {
  const { t, language } = useTranslation();
  const targetAmount = 50000000;
  
  return (
    <div>
      <h2>{t.projectDetail.projectInfo}</h2>
      <div>
        <span>{t.projectDetail.category}:</span> Pendidikan
      </div>
      <div>
        <span>{t.projectDetail.location}:</span> Jakarta
      </div>
      <div>
        <span>{t.projectDetail.target}:</span> {formatCurrency(targetAmount, language)}
      </div>
      <button>{t.projectDetail.joinProject}</button>
      <button>{t.projectDetail.donateNow}</button>
    </div>
  );
}
```

---

## Example 3: Donation Form

### Before:
```tsx
function DonationPage() {
  return (
    <form>
      <h1>Donasi untuk Project</h1>
      
      <label>Nominal Donasi</label>
      <input placeholder="Masukkan nominal" />
      
      <label>Pilih Metode Pembayaran</label>
      <select>
        <option>Transfer Bank</option>
        <option>E-Wallet</option>
        <option>Kartu Kredit</option>
      </select>
      
      <label>Pesan untuk PIC (Opsional)</label>
      <textarea />
      
      <button>Lanjutkan Pembayaran</button>
      <button>Kembali</button>
    </form>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function DonationPage() {
  const { t } = useTranslation();
  
  return (
    <form>
      <h1>{t.donation.donateToProject}</h1>
      
      <label>{t.donation.donationAmount}</label>
      <input placeholder={t.donation.enterAmount} />
      
      <label>{t.donation.selectPaymentMethod}</label>
      <select>
        <option>{t.donation.bankTransfer}</option>
        <option>{t.donation.eWallet}</option>
        <option>{t.donation.creditCard}</option>
      </select>
      
      <label>{t.donation.messageForPic}</label>
      <textarea />
      
      <button>{t.donation.continuePayment}</button>
      <button>{t.common.back}</button>
    </form>
  );
}
```

---

## Example 4: Notification Center

### Before:
```tsx
function NotificationCenter() {
  return (
    <div>
      <header>
        <h2>Notifikasi</h2>
        <button>Tandai Semua Dibaca</button>
        <button>Hapus Semua</button>
      </header>
      
      <div>
        {notifications.length === 0 ? (
          <p>Tidak ada notifikasi</p>
        ) : (
          notifications.map(notif => (
            <div key={notif.id}>
              <h3>{notif.title}</h3>
              <p>{notif.message}</p>
              <span>5 menit yang lalu</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';
import { formatRelativeTime } from '@/translations';

function NotificationCenter() {
  const { t, language } = useTranslation();
  
  return (
    <div>
      <header>
        <h2>{t.notifications.notifications}</h2>
        <button>{t.notifications.markAllRead}</button>
        <button>{t.notifications.clearAll}</button>
      </header>
      
      <div>
        {notifications.length === 0 ? (
          <p>{t.empty.noNotifications}</p>
        ) : (
          notifications.map(notif => (
            <div key={notif.id}>
              <h3>{notif.title}</h3>
              <p>{notif.message}</p>
              <span>{formatRelativeTime(new Date(notif.createdAt), language)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

---

## Example 5: Settings Page (Complete Section)

### Before:
```tsx
function SettingsPage() {
  return (
    <div>
      <h2>PROFIL ALUMNI</h2>
      
      <button>
        <div>
          <p>Informasi Pribadi</p>
          <p>Nama, foto, bio, dan kontak</p>
        </div>
      </button>
      
      <button>
        <div>
          <p>Data Alumni</p>
          <p>Skill, edukasi, batch Saladin Camp</p>
        </div>
      </button>
      
      <h2>KEAMANAN AKUN</h2>
      
      <button>
        <div>
          <p>Ubah Password</p>
          <p>Update password akun Anda</p>
        </div>
      </button>
      
      <div>
        <p>Verifikasi Email</p>
        <span>Terverifikasi</span>
      </div>
    </div>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function SettingsPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t.settings.alumniProfile}</h2>
      
      <button>
        <div>
          <p>{t.settings.personalInfo}</p>
          <p>{language === 'id' ? 'Nama, foto, bio, dan kontak' : 'Name, photo, bio, and contact'}</p>
        </div>
      </button>
      
      <button>
        <div>
          <p>{t.settings.alumniData}</p>
          <p>{language === 'id' ? 'Skill, edukasi, batch Saladin Camp' : 'Skills, education, Saladin Camp batch'}</p>
        </div>
      </button>
      
      <h2>{t.settings.accountSecurity}</h2>
      
      <button>
        <div>
          <p>{t.settings.changePassword}</p>
          <p>{language === 'id' ? 'Update password akun Anda' : 'Update your account password'}</p>
        </div>
      </button>
      
      <div>
        <p>{t.settings.emailVerification}</p>
        <span>{t.settings.verified}</span>
      </div>
    </div>
  );
}
```

---

## Example 6: Discussion Section with Time Format

### Before:
```tsx
function DiscussionSection({ comments }) {
  return (
    <div>
      <h3>Diskusi</h3>
      
      <textarea placeholder="Tulis komentar..." />
      <button>Kirim</button>
      
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <span>5 menit yang lalu</span>
          <button>Balas</button>
          <button>Edit</button>
          <button>Hapus</button>
        </div>
      ))}
      
      {comments.length === 0 && <p>Belum ada komentar</p>}
    </div>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';
import { formatRelativeTime } from '@/translations';

function DiscussionSection({ comments }) {
  const { t, language } = useTranslation();
  
  return (
    <div>
      <h3>{t.discussion.discussion}</h3>
      
      <textarea placeholder={t.discussion.writeComment} />
      <button>{t.discussion.send}</button>
      
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <span>{formatRelativeTime(new Date(comment.createdAt), language)}</span>
          <button>{t.discussion.reply}</button>
          <button>{t.discussion.edit}</button>
          <button>{t.discussion.delete}</button>
        </div>
      ))}
      
      {comments.length === 0 && <p>{t.discussion.noComments}</p>}
    </div>
  );
}
```

---

## Example 7: Status Badge Component

### Before:
```tsx
function StatusBadge({ status }) {
  const statusText = {
    active: 'Aktif',
    completed: 'Selesai',
    pending: 'Menunggu'
  };
  
  return (
    <span className={`badge badge-${status}`}>
      {statusText[status]}
    </span>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function StatusBadge({ status }) {
  const { t } = useTranslation();
  
  const statusText = {
    active: t.status.active,
    completed: t.status.completed,
    pending: t.status.pending
  };
  
  return (
    <span className={`badge badge-${status}`}>
      {statusText[status]}
    </span>
  );
}
```

---

## Example 8: Confirmation Dialog

### Before:
```tsx
function DeleteConfirmDialog({ onConfirm, onCancel }) {
  return (
    <dialog>
      <h3>Apakah Anda yakin?</h3>
      <p>Data akan dihapus permanen</p>
      
      <button onClick={onConfirm}>Ya, Hapus</button>
      <button onClick={onCancel}>Tidak, Batal</button>
    </dialog>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function DeleteConfirmDialog({ onConfirm, onCancel }) {
  const { t } = useTranslation();
  
  return (
    <dialog>
      <h3>{t.toast.areYouSure}</h3>
      <p>{t.toast.deleteConfirm}</p>
      
      <button onClick={onConfirm}>{t.toast.yesDelete}</button>
      <button onClick={onCancel}>{t.toast.noCancel}</button>
    </dialog>
  );
}
```

---

## Example 9: Filter & Sort UI

### Before:
```tsx
function FilterSort() {
  return (
    <div>
      <label>Urutkan berdasarkan</label>
      <select>
        <option>Terbaru</option>
        <option>Terpopuler</option>
        <option>Deadline Terdekat</option>
      </select>
      
      <button>Reset</button>
      <button>Terapkan</button>
    </div>
  );
}
```

### After:
```tsx
import { useTranslation } from '@/hooks/useTranslation';

function FilterSort() {
  const { t } = useTranslation();
  
  return (
    <div>
      <label>{t.explore.sortBy}</label>
      <select>
        <option>{t.explore.latest}</option>
        <option>{t.explore.mostPopular}</option>
        <option>{t.explore.nearestDeadline}</option>
      </select>
      
      <button>{t.common.reset}</button>
      <button>{t.common.apply}</button>
    </div>
  );
}
```

---

## Example 10: Toast Messages

### Before:
```tsx
import { toast } from 'sonner';

function saveProfile() {
  try {
    // Save logic...
    toast.success('Profil berhasil disimpan!');
  } catch (error) {
    toast.error('Terjadi kesalahan!');
  }
}

function deleteItem() {
  if (confirm('Apakah Anda yakin?')) {
    // Delete logic...
  }
}
```

### After:
```tsx
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  function saveProfile() {
    try {
      // Save logic...
      toast.success(t.toast.saveSuccess);
    } catch (error) {
      toast.error(t.toast.error);
    }
  }
  
  function deleteItem() {
    if (confirm(t.toast.areYouSure)) {
      // Delete logic...
    }
  }
  
  return (/* ... */);
}
```

---

## Tips & Best Practices

1. **Always import useTranslation at the top**
2. **Destructure both `t` and `language`** if you need format helpers
3. **Use format helpers** for dates, currency, and relative time
4. **Don't concatenate translation strings** - use complete phrases
5. **Test both languages** after implementing
6. **Check responsiveness** - English text is often longer than Indonesian
7. **Use fallback values** if translation might be missing
8. **Keep consistent naming** in translation keys

### Good ✅
```tsx
<p>{t.projectDetail.category}: {category}</p>
<p>{formatCurrency(amount, language)}</p>
```

### Bad ❌
```tsx
<p>{'Kategori' + ': ' + category}</p>
<p>{`Rp ${amount}`}</p>
```
