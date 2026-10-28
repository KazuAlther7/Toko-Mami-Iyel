# API / Operation Spec (proposal)

## Pelanggan
- `GET /products`: produk aktif, harga, satuan, gambar, dan status ketersediaan.
- `GET /products/:slug`: detail produk aktif.
- `POST /orders` (jika pencatatan pesanan diaktifkan): validasi field checkout, ambil harga produk dari database, hitung total di server, simpan snapshot item, dan kembalikan kode pesanan.
- Client membentuk link WhatsApp menggunakan nomor admin dan teks yang sudah di-encode.

## Admin
- Operasi autentikasi melalui provider yang dipilih.
- CRUD produk dan kategori: admin-only.
- Pembaruan stok: admin-only dan dicatat.
- `confirm_order(order_id)`: operasi server/database terotorisasi yang:
  1. memastikan order masih `pending`;
  2. mengambil/mengunci stok item yang diperlukan;
  3. memvalidasi seluruh kuantitas;
  4. mengurangi stok dan menulis `stock_movements`;
  5. mengubah status menjadi `confirmed` dalam transaksi yang sama;
  6. menolak dengan alasan jika stok tidak cukup atau order sudah diproses.
- `reject_order(order_id, reason)`: admin-only dan idempotent.

## Aturan keamanan
- Jangan percaya harga, subtotal, status, atau stok yang dikirim browser.
- Jangan masukkan service-role key ke kode frontend.
- Terapkan validasi input, batas panjang field, dan rate limiting yang sesuai.
- Operasi admin harus memverifikasi identitas/role di server.
- Jika order tidak disimpan di database, jangan menyatakan bahwa website memiliki status pesanan atau riwayat order yang terjamin.
