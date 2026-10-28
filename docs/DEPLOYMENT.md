# Deployment

## Sebelum deploy
- Konfirmasi stack dan provider.
- Isi environment variables publik frontend yang diperlukan.
- Simpan rahasia server hanya di dashboard provider yang tepat.
- Terapkan migrasi database dan policies/RLS yang sudah ditinjau.
- Buat akun admin dengan prosedur aman; jangan menyediakan pendaftaran admin publik.
- Atur nomor WhatsApp, pickup, area/ongkir, jam operasional, dan metode pembayaran.
- Uji alur WhatsApp pada perangkat Android/iOS/desktop.

## Hosting gratis — catatan
Cloudflare Pages dapat cocok untuk frontend statis dan Supabase dapat menyediakan database/auth/storage pada paket gratis, tetapi kuota dan kebijakan dapat berubah. Periksa halaman harga/dokumentasi resmi sebelum rilis. Paket gratis bukan jaminan tanpa batas; layanan backend, fungsi, database, dan penyimpanan memiliki batas masing-masing.

## Operasional
- Catat cara melakukan backup dan memulihkan data.
- Pantau penggunaan kuota dan status proyek.
- Uji proses ketika WhatsApp tidak terbuka atau koneksi gagal.
- Jangan menganggap membuka deep link sebagai bukti pesan terkirim.
- Siapkan prosedur untuk harga salah, stok tidak cukup, pesanan batal, dan pelanggan tidak merespons.
