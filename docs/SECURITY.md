# Security

## Dasar
- Rahasia server hanya di environment server/hosting yang sesuai.
- Nilai `VITE_*` dianggap publik dan dapat terlihat oleh pengguna.
- Gunakan Supabase RLS untuk semua tabel yang terekspos melalui API.
- Pengunjung umum hanya boleh membaca produk yang aktif.
- Pelanggan tidak boleh menulis stok, mengubah harga, atau mengubah status pesanan menjadi confirmed/paid.
- Admin role harus diverifikasi di server/database, bukan hanya di frontend.
- Validasi data checkout dan hitung harga di sisi server.
- Hindari menyimpan alamat/nomor pelanggan lebih lama daripada kebutuhan operasional.
- Jangan masukkan informasi pribadi yang tidak dibutuhkan ke pesan WhatsApp.
- Gunakan HTTPS, validasi upload gambar, dan batasi jenis/ukuran file.

## Stok
- Konfirmasi order dan mutasi stok harus atomik.
- Cegah stok negatif dan pengurangan ganda.
- Simpan audit trail mutasi stok yang tidak dapat diedit pelanggan.
- Uji RLS dengan sesi anonim, pelanggan, dan admin sebelum peluncuran.

## Privasi
- Publikasikan informasi privasi sederhana: data apa yang dikumpulkan, tujuan, siapa yang dapat mengakses, dan cara meminta penghapusan.
- Nomor telepon/alamat hanya dipakai untuk pemrosesan order.
- Jangan menyatakan kepatuhan hukum sebelum aturan yang berlaku ditinjau.
