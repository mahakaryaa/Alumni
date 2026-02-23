# 🗺️ Translation Mapping Reference - AlMaqdisi Project

## Quick Reference untuk Setiap Component

---

## 1. ExploreProject.tsx

### Navigation (Sidebar)
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Home | Home | `{t.nav.home}` |
| Explore | Explore | `{t.nav.explore}` |
| Pesan | Messages | `{t.nav.messages}` |
| Settings | Settings | `{t.nav.settings}` |
| Logout | Logout | `{t.nav.logout}` |

### Header & Search
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Kembali | Back | `{t.common.back}` |
| Explore Project | Explore Project | `{language === 'id' ? 'Explore Project' : 'Explore Project'}` |
| Cari proyek impianmu... | Search your dream project... | `{t.home.searchPlaceholder}` |

### Categories
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Semua | All | `{t.categories.all}` |
| Sejarah | History | `{language === 'id' ? 'Sejarah' : 'History'}` |
| Budaya | Culture | `{language === 'id' ? 'Budaya' : 'Culture'}` |
| Kemanusiaan | Humanitarian | `{language === 'id' ? 'Kemanusiaan' : 'Humanitarian'}` |

### Tabs
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Open Volunteer | Open Volunteer | `"Open Volunteer"` (sama di kedua bahasa) |
| Campaign | Campaign | `"Campaign"` (sama di kedua bahasa) |
| Galeri Project | Project Gallery | `{t.tabs.projectGallery}` |

### Project Cards
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Lihat Project | View Project | `{language === 'id' ? 'Lihat Project' : 'View Project'}` |
| Lihat Detail | View Details | `{language === 'id' ? 'Lihat Detail' : 'View Details'}` |
| Project Individu | Individual Project | `{language === 'id' ? 'Project Individu' : 'Individual Project'}` |

### Status Labels
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Akan Datang | Upcoming | `{language === 'id' ? 'Akan Datang' : 'Upcoming'}` |
| Sedang Berlangsung | Ongoing | `{language === 'id' ? 'Sedang Berlangsung' : 'Ongoing'}` |
| Sudah Berlalu | Past | `{language === 'id' ? 'Sudah Berlalu' : 'Past'}` |

### Filter Modal
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Filter Proyek | Filter Projects | `{language === 'id' ? 'Filter Proyek' : 'Filter Projects'}` |
| Status | Status | `{language === 'id' ? 'Status' : 'Status'}` |
| Lokasi | Location | `{language === 'id' ? 'Lokasi' : 'Location'}` |
| Terapkan Filter | Apply Filter | `{language === 'id' ? 'Terapkan Filter' : 'Apply Filter'}` |
| Jakarta Selatan | South Jakarta | `{language === 'id' ? 'Jakarta Selatan' : 'South Jakarta'}` |
| Online | Online | `"Online"` (sama di kedua bahasa) |
| Bandung | Bandung | `"Bandung"` (sama di kedua bahasa) |

### Bottom Navigation (Mobile)
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Home | Home | `{t.nav.home}` |
| Explore | Explore | `{t.nav.explore}` |
| Pesan | Messages | `{t.nav.messages}` |
| Setting | Settings | `{t.nav.settings}` |

---

## 2. MessagesAlumni.tsx

### Header & Tabs
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| PESAN | MESSAGES | `{language === 'id' ? 'PESAN' : 'MESSAGES'}` |
| Pesan Personal | Personal Messages | `{language === 'id' ? 'Pesan Personal' : 'Personal Messages'}` |
| Laporan Donasi | Donation Report | `{language === 'id' ? 'Laporan Donasi' : 'Donation Report'}` |

### Donation Report Section
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Total Donasi Anda | Your Total Donations | `{language === 'id' ? 'Total Donasi Anda' : 'Your Total Donations'}` |
| Proyek | Projects | `{language === 'id' ? 'Proyek' : 'Projects'}` |
| Terima Kasih! | Thank You! | `{language === 'id' ? 'Terima Kasih!' : 'Thank You!'}` |
| Donasi Anda sangat berarti | Your donation means a lot | `{language === 'id' ? 'Donasi Anda sangat berarti' : 'Your donation means a lot'}` |

### Donation Status
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Dalam Verifikasi | In Verification | `{language === 'id' ? 'Dalam Verifikasi' : 'In Verification'}` |
| Berhasil | Success | `{language === 'id' ? 'Berhasil' : 'Success'}` |
| Gagal | Failed | `{language === 'id' ? 'Gagal' : 'Failed'}` |

### Donation Details
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Nomor Referensi Donasi | Donation Reference Number | `{language === 'id' ? 'Nomor Referensi Donasi' : 'Donation Reference Number'}` |
| Nominal Donasi | Donation Amount | `{t.donation.donationAmount}` |
| Metode Pembayaran | Payment Method | `{language === 'id' ? 'Metode Pembayaran' : 'Payment Method'}` |
| Tanggal | Date | `{language === 'id' ? 'Tanggal' : 'Date'}` |
| Waktu | Time | `{language === 'id' ? 'Waktu' : 'Time'}` |

### Messages
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Kegagalan Transaksi | Transaction Failed | `{language === 'id' ? 'Kegagalan Transaksi' : 'Transaction Failed'}` |
| Maaf, donasi Anda tidak dapat diproses | Sorry, your donation could not be processed | `{language === 'id' ? 'Maaf, donasi Anda tidak dapat diproses' : 'Sorry, your donation could not be processed'}` |
| Silakan coba lagi atau hubungi tim kami | Please try again or contact our team | `{language === 'id' ? 'Silakan coba lagi atau hubungi tim kami' : 'Please try again or contact our team'}` |

### Empty State
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Belum ada pesan | No messages yet | `{language === 'id' ? 'Belum ada pesan' : 'No messages yet'}` |
| Belum ada donasi | No donations yet | `{language === 'id' ? 'Belum ada donasi' : 'No donations yet'}` |

---

## 3. NotificationCenter.tsx

### Header
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Notifikasi | Notifications | `{language === 'id' ? 'Notifikasi' : 'Notifications'}` |
| Tandai Semua Dibaca | Mark All as Read | `{language === 'id' ? 'Tandai Semua Dibaca' : 'Mark All as Read'}` |

### Tabs
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Semua | All | `{t.categories.all}` |
| Pengumuman | Announcements | `{language === 'id' ? 'Pengumuman' : 'Announcements'}` |
| Update Proyek | Project Updates | `{language === 'id' ? 'Update Proyek' : 'Project Updates'}` |
| Pesan | Messages | `{t.nav.messages}` |

### Notification Types
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Pembaruan Kebijakan Privasi | Privacy Policy Update | `{language === 'id' ? 'Pembaruan Kebijakan Privasi' : 'Privacy Policy Update'}` |
| Maintenance Terjadwal | Scheduled Maintenance | `{language === 'id' ? 'Maintenance Terjadwal' : 'Scheduled Maintenance'}` |
| Fitur Baru | New Feature | `{language === 'id' ? 'Fitur Baru' : 'New Feature'}` |
| Laporan Donasi | Donation Report | `{language === 'id' ? 'Laporan Donasi' : 'Donation Report'}` |

### Time Labels
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| baru saja | just now | `{language === 'id' ? 'baru saja' : 'just now'}` |
| 1 jam yang lalu | 1 hour ago | `{language === 'id' ? '1 jam yang lalu' : '1 hour ago'}` |
| 2 jam yang lalu | 2 hours ago | `{language === 'id' ? '2 jam yang lalu' : '2 hours ago'}` |
| Kemarin | Yesterday | `{language === 'id' ? 'Kemarin' : 'Yesterday'}` |
| 2 hari yang lalu | 2 days ago | `{language === 'id' ? '2 hari yang lalu' : '2 days ago'}` |

### Empty State
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Tidak ada notifikasi | No notifications | `{language === 'id' ? 'Tidak ada notifikasi' : 'No notifications'}` |
| Anda sudah mengejar semua! | You're all caught up! | `{language === 'id' ? 'Anda sudah mengejar semua!' : "You're all caught up!"}` |

---

## 4. ProjectDetail.tsx

### Header & Actions
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Kembali | Back | `{t.common.back}` |
| Bagikan | Share | `{t.buttons.share}` |
| Donasi Sekarang | Donate Now | `{t.buttons.donate}` |

### Sections
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Deskripsi | Description | `{language === 'id' ? 'Deskripsi' : 'Description'}` |
| Manfaat | Benefits | `{language === 'id' ? 'Manfaat' : 'Benefits'}` |
| Target Audiens | Target Audience | `{language === 'id' ? 'Target Audiens' : 'Target Audience'}` |
| Organisator | Organizer | `{language === 'id' ? 'Organisator' : 'Organizer'}` |
| Lokasi | Location | `{language === 'id' ? 'Lokasi' : 'Location'}` |
| Tanggal | Date | `{language === 'id' ? 'Tanggal' : 'Date'}` |

### Related Projects
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Kegiatan Offline Terbaru | Latest Offline Activities | `{language === 'id' ? 'Kegiatan Offline Terbaru' : 'Latest Offline Activities'}` |
| Proyek Serupa | Similar Projects | `{language === 'id' ? 'Proyek Serupa' : 'Similar Projects'}` |
| Lihat Semua | View All | `{t.home.viewAll}` |
| Lihat Detail | View Details | `{language === 'id' ? 'Lihat Detail' : 'View Details'}` |

### Project Stats
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Volunteer Dibutuhkan | Volunteers Needed | `{language === 'id' ? 'Volunteer Dibutuhkan' : 'Volunteers Needed'}` |
| Terdaftar | Registered | `{language === 'id' ? 'Terdaftar' : 'Registered'}` |
| Durasi | Duration | `{language === 'id' ? 'Durasi' : 'Duration'}` |
| hari | days | `{language === 'id' ? 'hari' : 'days'}` |
| bulan | months | `{language === 'id' ? 'bulan' : 'months'}` |

---

## 5. DonationPage.tsx

### Header
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Donasi | Donation | `{language === 'id' ? 'Donasi' : 'Donation'}` |
| Kembali | Back | `{t.common.back}` |

### Form Labels
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Nominal Donasi | Donation Amount | `{t.donation.donationAmount}` |
| Pilih Metode Pembayaran | Select Payment Method | `{t.donation.selectPaymentMethod}` |
| Nama Lengkap | Full Name | `{language === 'id' ? 'Nama Lengkap' : 'Full Name'}` |
| Email | Email | `"Email"` (sama di kedua bahasa) |
| Nomor Telepon | Phone Number | `{language === 'id' ? 'Nomor Telepon' : 'Phone Number'}` |
| Pesan (Opsional) | Message (Optional) | `{language === 'id' ? 'Pesan (Opsional)' : 'Message (Optional)'}` |

### Payment Methods
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Transfer Bank | Bank Transfer | `{language === 'id' ? 'Transfer Bank' : 'Bank Transfer'}` |
| E-Wallet | E-Wallet | `"E-Wallet"` (sama di kedua bahasa) |
| Kartu Kredit | Credit Card | `{language === 'id' ? 'Kartu Kredit' : 'Credit Card'}` |
| QRIS | QRIS | `"QRIS"` (sama di kedua bahasa) |

### Preset Amounts
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Nominal Lainnya | Other Amount | `{language === 'id' ? 'Nominal Lainnya' : 'Other Amount'}` |

### Buttons
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Lanjutkan Pembayaran | Continue Payment | `{language === 'id' ? 'Lanjutkan Pembayaran' : 'Continue Payment'}` |
| Donasi Sekarang | Donate Now | `{t.buttons.donate}` |
| Batal | Cancel | `{t.common.cancel}` |

### Summary
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Ringkasan Donasi | Donation Summary | `{language === 'id' ? 'Ringkasan Donasi' : 'Donation Summary'}` |
| Jumlah Donasi | Donation Amount | `{language === 'id' ? 'Jumlah Donasi' : 'Donation Amount'}` |
| Biaya Admin | Admin Fee | `{language === 'id' ? 'Biaya Admin' : 'Admin Fee'}` |
| Total Pembayaran | Total Payment | `{language === 'id' ? 'Total Pembayaran' : 'Total Payment'}` |
| Gratis | Free | `{language === 'id' ? 'Gratis' : 'Free'}` |

### Success/Error Messages
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Donasi Berhasil! | Donation Successful! | `{language === 'id' ? 'Donasi Berhasil!' : 'Donation Successful!'}` |
| Terima kasih atas donasi Anda | Thank you for your donation | `{language === 'id' ? 'Terima kasih atas donasi Anda' : 'Thank you for your donation'}` |
| Donasi Gagal | Donation Failed | `{language === 'id' ? 'Donasi Gagal' : 'Donation Failed'}` |
| Silakan coba lagi | Please try again | `{language === 'id' ? 'Silakan coba lagi' : 'Please try again'}` |

---

## 6. MyJoinRequests.tsx

### Header
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Permintaan Join Project | Project Join Requests | `{language === 'id' ? 'Permintaan Join Project' : 'Project Join Requests'}` |
| Kembali | Back | `{t.common.back}` |

### Status Labels
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Menunggu | Pending | `{language === 'id' ? 'Menunggu' : 'Pending'}` |
| Disetujui | Approved | `{language === 'id' ? 'Disetujui' : 'Approved'}` |
| Ditolak | Rejected | `{language === 'id' ? 'Ditolak' : 'Rejected'}` |

### Request Details
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Alasan | Reason | `{language === 'id' ? 'Alasan' : 'Reason'}` |
| Tanggal Pengajuan | Submission Date | `{language === 'id' ? 'Tanggal Pengajuan' : 'Submission Date'}` |
| Status | Status | `{language === 'id' ? 'Status' : 'Status'}` |

### Empty State
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Belum ada permintaan | No requests yet | `{language === 'id' ? 'Belum ada permintaan' : 'No requests yet'}` |
| Mulai bergabung dengan proyek! | Start joining projects! | `{language === 'id' ? 'Mulai bergabung dengan proyek!' : 'Start joining projects!'}` |

---

## 7. MyDonations.tsx

### Header
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Donasi Saya | My Donations | `{language === 'id' ? 'Donasi Saya' : 'My Donations'}` |
| Kembali | Back | `{t.common.back}` |

### Filter/Tabs
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Semua | All | `{t.categories.all}` |
| Berhasil | Success | `{language === 'id' ? 'Berhasil' : 'Success'}` |
| Menunggu | Pending | `{language === 'id' ? 'Menunggu' : 'Pending'}` |
| Gagal | Failed | `{language === 'id' ? 'Gagal' : 'Failed'}` |

### Donation Details
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Total Donasi | Total Donations | `{language === 'id' ? 'Total Donasi' : 'Total Donations'}` |
| Jumlah Proyek | Number of Projects | `{language === 'id' ? 'Jumlah Proyek' : 'Number of Projects'}` |
| Lihat Detail | View Details | `{language === 'id' ? 'Lihat Detail' : 'View Details'}` |
| Download Bukti | Download Receipt | `{language === 'id' ? 'Download Bukti' : 'Download Receipt'}` |

### Empty State
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Belum ada donasi | No donations yet | `{language === 'id' ? 'Belum ada donasi' : 'No donations yet'}` |
| Mulai berdonasi sekarang! | Start donating now! | `{language === 'id' ? 'Mulai berdonasi sekarang!' : 'Start donating now!'}` |

---

## 8. CampaignList.tsx

### Header
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Campaign | Campaign | `"Campaign"` (sama di kedua bahasa) |
| Buat Campaign Baru | Create New Campaign | `{language === 'id' ? 'Buat Campaign Baru' : 'Create New Campaign'}` |

### Campaign Status
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Aktif | Active | `{language === 'id' ? 'Aktif' : 'Active'}` |
| Draft | Draft | `"Draft"` (sama di kedua bahasa) |
| Selesai | Completed | `{language === 'id' ? 'Selesai' : 'Completed'}` |

### Campaign Stats
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Terkumpul | Collected | `{language === 'id' ? 'Terkumpul' : 'Collected'}` |
| Target | Target | `{language === 'id' ? 'Target' : 'Target'}` |
| Donatur | Donors | `{language === 'id' ? 'Donatur' : 'Donors'}` |
| Hari Tersisa | Days Left | `{language === 'id' ? 'Hari Tersisa' : 'Days Left'}` |

### Actions
| Indonesian | English | Translation Key / Code |
|------------|---------|------------------------|
| Edit | Edit | `{t.buttons.edit}` |
| Hapus | Delete | `{t.buttons.delete}` |
| Publikasikan | Publish | `{language === 'id' ? 'Publikasikan' : 'Publish'}` |
| Bagikan | Share | `{t.buttons.share}` |

---

## Time & Date Formatting

### Indonesian Format
```tsx
// Format: "DD MMMM YYYY"
"23 Februari 2026"
"1 jam yang lalu"
"2 hari yang lalu"
"Kemarin"
"Minggu lalu"
```

### English Format
```tsx
// Format: "MMMM DD, YYYY"
"February 23, 2026"
"1 hour ago"
"2 days ago"
"Yesterday"
"Last week"
```

### Code Example
```tsx
const formatDate = (date: Date) => {
  if (language === 'id') {
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};
```

---

## Numbers & Currency Formatting

### Indonesian Format
```tsx
// Currency
"Rp 100.000"
"Rp 1.500.000"

// Numbers
"1.234"
"1.234.567"
```

### English Format
```tsx
// Currency
"Rp 100,000"
"Rp 1,500,000"

// Numbers
"1,234"
"1,234,567"
```

### Code Example
```tsx
const formatCurrency = (amount: number) => {
  if (language === 'id') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};
```

---

## Common Patterns

### 1. Section Headers
```tsx
<h2>{language === 'id' ? 'Indonesian Header' : 'English Header'}</h2>
```

### 2. Buttons
```tsx
<button>{t.buttons.donate}</button>
<button>{language === 'id' ? 'Lanjutkan' : 'Continue'}</button>
```

### 3. Empty States
```tsx
<div>
  <p>{language === 'id' ? 'Tidak ada data' : 'No data'}</p>
  <p>{language === 'id' ? 'Mulai sekarang!' : 'Start now!'}</p>
</div>
```

### 4. Success/Error Messages
```tsx
alert(language === 'id' ? 'Berhasil disimpan!' : 'Successfully saved!');
alert(language === 'id' ? 'Terjadi kesalahan' : 'An error occurred');
```

---

**Last Updated**: 2026-02-23
**Version**: 1.0
