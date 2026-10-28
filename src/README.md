# Frontend Implementation Plan

Direkomendasikan (belum final): React + TypeScript + Vite.

## Modul
- `catalog`: daftar produk, pencarian/kategori.
- `product`: informasi produk dan kontrol jumlah.
- `cart`: state keranjang dan perhitungan subtotal tampilan.
- `checkout`: validasi pelanggan, pickup/delivery, ringkasan.
- `whatsapp`: penyusun teks pesan dan URL click-to-chat.
- `admin`: login, produk, stok, pesanan.
- `shared`: format harga/tanggal, komponen, dan validasi.

## Prinsip implementasi
- Harga/total di frontend hanya untuk tampilan; server/database harus menghitung ulang.
- Gunakan `encodeURIComponent` untuk isi pesan WhatsApp.
- Nomor WhatsApp disimpan sebagai pengaturan, format internasional tanpa tanda `+` untuk URL.
- Berikan fallback salin pesan/nomor admin jika deep link tidak bekerja.
- Jangan menaruh service-role key atau secret di kode frontend.
- Jangan menganggap WhatsApp sudah mengirim pesan ketika window/chat terbuka.

Blueprint ini belum berisi source aplikasi yang siap dijalankan.
