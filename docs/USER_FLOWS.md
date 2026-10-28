# User Flows

## A. Belanja sampai WhatsApp
1. Buka katalog.
2. Cari produk atau telusuri kategori.
3. Pilih jumlah dan tambah ke keranjang.
4. Buka keranjang; ubah jumlah/hapus item bila perlu.
5. Tekan Checkout.
6. Isi nama dan nomor telepon. Pilih:
   - **Pickup:** instruksi lokasi/jam tampil sesuai pengaturan toko.
   - **Delivery:** alamat dan catatan pengantaran wajib diisi; area/ongkir diverifikasi admin bila belum dihitung otomatis.
7. Tinjau daftar barang, kuantitas, harga satuan, subtotal, dan total sementara.
8. Tekan “Pesan via WhatsApp”.
9. WhatsApp terbuka dengan teks terisi. Pelanggan memeriksa lalu menekan **Kirim**.
10. Admin mengecek ketersediaan dan detail sebelum mengonfirmasi.

## B. Isi pesan WhatsApp
- Judul: Pesanan Toko Kelontong Mami Iyel.
- Nomor/referensi pesanan bila sistem menghasilkan ID.
- Nama dan nomor pelanggan.
- Metode pickup/delivery.
- Alamat/catatan delivery jika relevan.
- Daftar barang: nama, jumlah × harga satuan, subtotal item.
- Subtotal barang, biaya delivery jika sudah ditetapkan, total sementara.
- Catatan bahwa harga/stok dan ongkir final dikonfirmasi admin bila masih perlu verifikasi.

Jangan memasukkan rahasia, token, data pembayaran sensitif, atau informasi pelanggan yang tidak dibutuhkan.

## C. Admin konfirmasi
1. Admin membaca pesan dan memeriksa produk, harga, stok, area delivery, dan ongkir.
2. Jika stok cukup, admin mengonfirmasi pesanan melalui panel admin (jika tersedia).
3. Sistem memvalidasi ulang stok dan mengurangi stok dalam satu transaksi atomik.
4. Jika stok tidak cukup, admin menghubungi pelanggan untuk mengganti jumlah/item atau membatalkan.
5. Jika order tersimpan di database, status pesanan dan status pembayaran disimpan terpisah.

## D. Kondisi gagal
- Keranjang kosong: checkout dinonaktifkan.
- Data checkout tidak lengkap: tampilkan field yang perlu diperbaiki.
- Produk tidak aktif: minta pelanggan menghapus item.
- Harga berubah: hitung ulang dan minta pelanggan meninjau ulang sebelum membuka WhatsApp.
- WhatsApp tidak terpasang/tidak terbuka: tampilkan nomor admin dan teks pesanan yang dapat disalin sebagai fallback.
- Pesan belum terkirim: jelaskan bahwa pelanggan masih harus menekan Kirim.
- Stok kurang saat admin konfirmasi: jangan kurangi stok; hubungi pelanggan.
- Admin menekan konfirmasi dua kali: operasi idempotent, stok tidak berkurang dua kali.
