# UI/UX Guidelines

## Prinsip visual
- Familiar dengan pola e-commerce umum, bukan eksperimen yang membuat pelanggan perlu belajar ulang.
- Mobile-first, responsif, ringan, dan mudah dipakai dengan satu tangan.
- Identitas visual final diputuskan setelah wireframe ditinjau.
- Gunakan foto produk yang jelas, harga terbaca, satuan eksplisit, dan hierarki teks konsisten.
- Hindari dekorasi berat, pop-up yang mengganggu, dan animasi yang memperlambat belanja.

## Struktur halaman pelanggan
### Header
- Logo/nama toko.
- Pencarian yang mudah ditemukan.
- Ikon keranjang dengan jumlah item.
- Navigasi ringkas untuk kategori atau informasi toko.

### Beranda/katalog
- Pengantar singkat dan informasi operasional penting.
- Kategori produk bila data kategori tersedia.
- Grid kartu produk dengan foto, nama, satuan, harga, status ketersediaan, tombol tambah.
- Tombol tambah harus memberi umpan balik bahwa barang masuk keranjang.

### Keranjang
- Daftar item, kuantitas, kontrol plus/minus, hapus item.
- Harga satuan dan subtotal per item.
- Subtotal pesanan dan biaya lain hanya jika sudah diketahui.
- CTA utama “Lanjut ke Checkout”.
- Keranjang kosong memiliki CTA kembali belanja.

### Checkout
- Form singkat dengan label jelas dan validasi inline.
- Pilihan pickup/delivery yang jelas.
- Alamat hanya wajib untuk delivery.
- Tampilkan ringkasan item dan total sementara sebelum CTA.
- CTA utama: “Pesan via WhatsApp”.
- Jelaskan bahwa WhatsApp akan terbuka dan pelanggan perlu menekan “Kirim”.
- Jangan tampilkan ongkir sebagai angka final jika belum dikonfirmasi.

### Admin
- Navigasi jelas untuk pesanan, produk, dan stok.
- Status pesanan berbeda dari status pembayaran.
- Konfirmasi pesanan harus menampilkan peringatan bila stok tidak cukup.
- Berikan konfirmasi sebelum aksi penting, tetapi hindari dialog berulang yang tidak perlu.

## Aksesibilitas dan kemudahan
- Kontras teks memadai dan ukuran teks nyaman.
- Target sentuh idealnya sekitar 44×44 CSS px.
- Jangan mengandalkan warna saja untuk status.
- Gunakan label form, pesan error spesifik, fokus keyboard, dan teks alternatif foto.
- Hindari scroll horizontal di ponsel.
- Sediakan loading, empty, success, dan error states.
- Jangan membuat harga, diskon, rating, testimoni, atau stok palsu.
