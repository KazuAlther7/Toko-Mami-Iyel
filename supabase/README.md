# Supabase Setup Plan

Supabase adalah opsi yang direkomendasikan, belum diputuskan/diimplementasikan.

## Tabel yang diusulkan
- `products`
- `categories`
- `orders` (jika pesanan website perlu dicatat)
- `order_items`
- `stock_movements`

## Wajib sebelum produksi
- Tinjau skema dan migrasi.
- Aktifkan RLS dan buat policies minimum yang diperlukan.
- Publik hanya membaca produk aktif.
- Admin-only untuk perubahan produk/stok/status pesanan.
- Buat operasi database atomik untuk konfirmasi order dan mutasi stok.
- Jangan pernah mengekspos service-role key ke browser.
- Uji akses anonim/pelanggan/admin sebelum memasukkan data toko nyata.

Jangan jalankan migrasi dari blueprint ini tanpa review dan persetujuan pemilik.
