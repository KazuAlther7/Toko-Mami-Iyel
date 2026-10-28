# PRD — Toko Kelontong Mami Iyel

## 1. Ringkasan
Membangun website toko kelontong yang nyaman digunakan melalui ponsel maupun desktop. Pelanggan dapat melihat katalog dan harga, mengelola keranjang, mengisi checkout, memilih pickup atau delivery, lalu mengirim rincian pesanan ke WhatsApp admin melalui pesan yang dibuat otomatis.

## 2. Tujuan
- Membuat produk, harga, dan ketersediaan mudah ditemukan.
- Mengurangi langkah dari memilih barang sampai menghubungi admin.
- Mengirim daftar barang checkout dalam format WhatsApp yang jelas.
- Membantu admin mengelola produk, stok, dan pesanan.
- Mengutamakan layanan gratis untuk tahap awal tanpa mengabaikan keamanan.

## 3. Pengguna
### Pelanggan
Mencari barang kebutuhan sehari-hari, membandingkan harga, menambahkan barang ke keranjang, lalu memesan lewat checkout dan WhatsApp.

### Admin
Mengelola produk, harga, stok, memeriksa pesanan masuk, mengonfirmasi ketersediaan, dan memproses pesanan.

## 4. Ruang lingkup MVP
### Pelanggan
- Beranda/katalog produk.
- Kategori dan pencarian produk (filter tambahan bisa diprioritaskan setelah wireframe).
- Kartu produk berisi foto, nama, harga, satuan/ukuran, dan status tersedia.
- Detail produk jika diperlukan.
- Keranjang: tambah/kurangi jumlah, hapus item, subtotal per item, subtotal pesanan.
- Checkout: nama, nomor telepon, metode pemenuhan, serta alamat/instruksi bila delivery.
- Pilihan pickup dan delivery.
- Ringkasan akhir sebelum membuka WhatsApp.
- Membuat pesan WhatsApp otomatis berisi daftar barang, jumlah, harga, subtotal, data pelanggan yang diperlukan, metode pemenuhan, dan total sementara.
- Tampilan konfirmasi/instruksi yang menjelaskan pelanggan perlu menekan tombol **Kirim** di WhatsApp.
- Status ketersediaan stok dapat berubah; admin tetap mengonfirmasi pesanan.

### Admin
- Login admin.
- CRUD produk: nama, foto, kategori, harga, satuan, status aktif.
- Pengelolaan stok.
- Daftar dan detail pesanan jika database pesanan diaktifkan.
- Konfirmasi/tolak pesanan berdasarkan ketersediaan.
- Stok berkurang hanya setelah admin mengonfirmasi pesanan dan operasi stok berhasil.
- Pengaturan toko dasar: nomor WhatsApp, jam operasional, area delivery, dan biaya delivery (perlu dikonfirmasi).

## 5. Alur utama
1. Pelanggan membuka katalog.
2. Memilih produk dan jumlah, lalu menambahkannya ke keranjang.
3. Meninjau keranjang dan melanjutkan checkout.
4. Mengisi informasi pelanggan dan memilih pickup/delivery.
5. Memeriksa ringkasan barang dan total sementara.
6. Menekan tombol “Pesan via WhatsApp”.
7. Website membuka chat WhatsApp admin dengan isi pesan yang sudah disiapkan.
8. Pelanggan menekan **Kirim** di WhatsApp secara manual.
9. Admin memeriksa pesan, stok, area/biaya delivery, dan detail lain sebelum menyatakan pesanan terkonfirmasi.
10. Jika stok tersedia, admin mengonfirmasi pesanan; stok dikurangi secara aman. Jika tidak cukup, admin menghubungi pelanggan untuk perubahan.

## 6. Prinsip UI/UX
- Mobile-first; desain responsif untuk layar besar.
- Pola toko online yang familiar: header, pencarian, kategori, kartu produk, tombol tambah, ikon keranjang dengan jumlah item, checkout bertahap/terstruktur.
- Harga harus menonjol dan mudah dibaca.
- Tombol aksi utama jelas dan mudah disentuh.
- Ringkasan keranjang dan checkout transparan; tidak ada biaya tersembunyi.
- Pesan error menjelaskan cara memperbaiki masalah.
- Jangan mengarang rating, testimoni, diskon, atau label “stok tersedia” jika datanya tidak benar.
- Identitas visual/warna final diputuskan setelah wireframe disetujui.

## 7. Aturan stok dan harga
- Harga dan stok yang ditampilkan adalah data terakhir yang tersedia dari backend.
- Harga/subtotal pada browser bukan sumber kebenaran untuk transaksi.
- Pesanan yang belum dikonfirmasi admin tidak mengurangi stok.
- Saat admin mengonfirmasi, sistem memvalidasi ulang stok terbaru dan mengurangi stok secara atomik.
- Jika stok kurang, konfirmasi ditolak atau pesanan harus disesuaikan dengan pelanggan terlebih dahulu.
- Hindari pengurangan stok ganda ketika admin menekan konfirmasi lebih dari sekali.
- Pesan WhatsApp adalah jalur komunikasi, bukan bukti otomatis bahwa pesan terkirim atau order diterima sistem. Jika pesanan perlu tercatat, backend harus menyimpan order sebelum membuka WhatsApp.

## 8. Di luar MVP (belum diputuskan)
- Pembayaran online otomatis/payment gateway.
- Akun pelanggan dan riwayat pesanan.
- Promo, kupon, wishlist, ulasan produk.
- Integrasi WhatsApp Business API untuk pengiriman otomatis tanpa tindakan pelanggan.
- Pelacakan pengantaran langsung.
- Perhitungan ongkir otomatis berdasarkan jarak.

## 9. Kriteria penerimaan
- Pelanggan dapat melihat produk, satuan, harga, dan status ketersediaan.
- Pelanggan dapat menambah, mengurangi, dan menghapus item dari keranjang.
- Jumlah item, subtotal per item, dan total sementara konsisten.
- Checkout memvalidasi field wajib sesuai pickup/delivery.
- Pesan WhatsApp memuat daftar barang, jumlah, harga satuan, subtotal, dan total sementara.
- Teks WhatsApp aman untuk URL encoding dan tidak kehilangan baris/item.
- UI menjelaskan pelanggan harus menekan “Kirim” di WhatsApp.
- Website tidak mengklaim pesan sudah terkirim hanya karena aplikasi terbuka.
- Admin dapat memeriksa pesanan dan konfirmasi stok secara aman.
- Dua konfirmasi yang bersamaan tidak dapat membuat stok menjadi negatif.
- Tampilan berfungsi pada viewport ponsel umum dan desktop.

## 10. Keputusan yang masih diperlukan
- Nomor WhatsApp admin dalam format internasional tanpa `+`.
- Alamat/area yang dilayani.
- Biaya delivery dan cara menghitungnya.
- Jam operasional dan estimasi proses.
- Apakah pembayaran COD, transfer manual, atau keduanya; proses konfirmasi transfer.
- Apakah order wajib disimpan di database sebelum chat WhatsApp dibuka.
- Kebijakan jika stok tidak cukup, pelanggan tidak membalas, atau pesanan dibatalkan.
- Nama satuan produk yang dipakai (pcs, bungkus, botol, kg, dan sebagainya).
