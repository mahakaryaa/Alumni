Saya menemukan bug pada halaman Explore Project.

Saat user mengklik project apa pun dari tab:

Open Volunteer

Galeri Project

Campaign

Semua selalu diarahkan ke halaman detail dengan judul:

BANTUAN PANGAN GAZA

Ini tidak benar.

EXPECTED BEHAVIOR

Ketika user klik sebuah project card:

Harus diarahkan ke detail project sesuai dengan project yang diklik

Judul detail harus sama dengan judul di card

Data (cover, PIC, deskripsi, progress, dll) harus dynamic

Tidak boleh ada default project

Tidak boleh hardcoded redirect

WAJIB DIPERIKSA

Pastikan routing tidak hardcoded seperti:
router.push('/project/bantuan-pangan-gaza')
atau ID statis seperti '/project/1'

Pastikan routing menggunakan dynamic parameter:
router.push(/project/${project.slug})
atau
router.push(/project/${project.id})

Pastikan detail page menggunakan param dari URL:

Mengambil slug atau id dari route

Fetch data berdasarkan param tersebut

Tidak menggunakan dummy object

Tidak menggunakan project default

Pastikan setiap project card mengirim slug/id yang berbeda.

Tambahkan debug sementara:

console.log(project.slug) saat klik

console.log(slug) di halaman detail

Nilai harus berubah sesuai project yang dipilih.

HAPUS JIKA ADA:

Hardcoded redirect

Default selectedProject

Static object berisi “Bantuan Pangan Gaza”

Dummy project index [0]

FINAL REQUIREMENT

Explore → Detail harus 100% dynamic.

Setiap project yang diklik:

Membuka URL dengan slug unik

Mengambil data sesuai slug

Menampilkan detail yang sesuai

Tidak pernah selalu menampilkan “BANTUAN PANGAN GAZA”

Perbaiki agar routing dan data binding benar-benar dynamic dan scalable.