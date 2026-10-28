# System Architecture

## Rekomendasi awal (belum keputusan final)
- **Frontend:** React + TypeScript + Vite.
- **Backend/data:** Supabase PostgreSQL, Auth, dan Storage bila dibutuhkan.
- **Hosting frontend:** Cloudflare Pages untuk aplikasi statis.
- **WhatsApp:** click-to-chat link dengan pesan yang di-URL-encode.

## Alur tingkat tinggi
Browser pelanggan → katalog dari backend → keranjang → checkout → (opsional/lebih aman: simpan order ke database) → buka WhatsApp dengan ringkasan → pelanggan menekan Kirim → admin memverifikasi → admin mengonfirmasi di panel → server/database memvalidasi stok dan mengurangi stok secara atomik.

## Batasan penting WhatsApp
Click-to-chat dapat membuka WhatsApp dengan teks yang sudah diisi, tetapi tidak dapat mengirim pesan secara diam-diam atau membuktikan pelanggan telah menekan Kirim. Untuk pengiriman otomatis tanpa tindakan pelanggan diperlukan integrasi WhatsApp Business Platform/API, izin, dan biaya/kebijakan yang sesuai; jangan anggap ini bagian MVP.

## Pilihan pencatatan pesanan
- **Pilihan A — WhatsApp saja:** lebih sederhana, tetapi website tidak memiliki catatan pesanan yang andal dan admin harus mengandalkan chat.
- **Pilihan B — simpan order dulu, lalu buka WhatsApp (direkomendasikan):** order mendapat ID dan tersimpan; WhatsApp menjadi notifikasi/komunikasi. Status “dibuat di website” tetap tidak berarti pesan WhatsApp terkirim. Perlu database dan penanganan jika pelanggan meninggalkan halaman.
- Pemilik perlu menyetujui pilihan sebelum implementasi.

## Keamanan
- Semua harga dan stok divalidasi ulang di server/database.
- Jangan menyimpan service-role key di browser.
- Terapkan Supabase RLS untuk tabel yang diakses dari client.
- Operasi stok dan konfirmasi order hanya melalui fungsi/operasi database yang terotorisasi.
- Role admin diverifikasi di backend; jangan hanya menyembunyikan tombol pada UI.
