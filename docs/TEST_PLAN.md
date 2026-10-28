# Test Plan

## Katalog
- Produk aktif tampil dengan nama, harga, satuan, dan gambar bila tersedia.
- Produk nonaktif tidak bisa dipesan.
- Pencarian/kategori tidak merusak layout ponsel.

## Keranjang
- Tambah, kurangi, hapus item.
- Quantity tidak boleh nol/negatif.
- Subtotal item dan total pesanan konsisten.
- Keranjang kosong tidak bisa checkout.
- Refresh tidak menghapus keranjang bila persistensi telah dipilih.

## Checkout dan WhatsApp
- Pickup tidak memerlukan alamat delivery.
- Delivery memerlukan alamat.
- Pesan berisi nama barang, kuantitas, harga satuan, subtotal per item, subtotal order, metode fulfillment, dan detail yang relevan.
- Karakter khusus, emoji, spasi, dan baris baru ter-encode dengan benar.
- Nomor WhatsApp memakai format internasional tanpa `+` dalam URL.
- UI menyatakan bahwa pelanggan harus menekan Kirim.
- Jika WhatsApp tidak terbuka, tersedia fallback nomor/pesan salin.
- Ongkir yang belum ditentukan tidak ditampilkan sebagai angka final.

## Pesanan/stok
- Harga berubah antara katalog dan checkout: server menghitung ulang.
- Stok kurang saat admin konfirmasi: order tidak confirmed dan stok tidak berubah.
- Dua admin/permintaan konfirmasi bersamaan tidak menghasilkan stok negatif.
- Konfirmasi berulang tidak mengurangi stok dua kali.
- Mutasi stok dan status order konsisten setelah kegagalan.
- Order yang dibatalkan mengikuti kebijakan stok yang ditetapkan.

## Keamanan dan responsif
- Pengunjung tidak bisa mengakses admin.
- Pelanggan tidak bisa mengubah harga/stok/status.
- RLS diuji dengan peran yang berbeda.
- Tidak ada secret server di bundle frontend.
- Uji viewport 320px ke atas, tablet, desktop, keyboard, kontras, dan pesan error.
