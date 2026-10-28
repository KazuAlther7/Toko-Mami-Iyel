# Toko Kelontong Mami Iyel — Blueprint

Blueprint dokumentasi untuk toko online mobile-first. Fokus utama: pelanggan melihat produk dan harga, memasukkan produk ke keranjang, checkout, lalu daftar pesanan disiapkan otomatis sebagai pesan WhatsApp untuk admin.

> Status: dokumen perencanaan, bukan website siap produksi. Implementasi teknis, nomor WhatsApp, kebijakan toko, dan kredensial masih perlu dikonfirmasi sebelum peluncuran.

## Prinsip produk
- Tampilan toko online yang familiar, rapi, mudah dipahami, dan nyaman di ponsel.
- Harga dan informasi produk jelas; keranjang mudah diedit.
- Checkout singkat dan tidak meminta data yang tidak diperlukan.
- Pesanan checkout dirangkum otomatis ke WhatsApp admin.
- Mendukung ambil sendiri (pickup) dan pengantaran (delivery).
- Admin mengonfirmasi pesanan sebelum stok dikurangi.
- Prioritaskan layanan gratis, tetapi jelaskan batas paket gratis dan kebutuhan operasional.

## Dokumen
- `PRD.md` — kebutuhan dan batasan produk.
- `ROADMAP.md` — tahapan pengerjaan.
- `CHANGELOG.md` — catatan perubahan blueprint.
- `REPOSITORY_TREE.md` — struktur yang disarankan.
- `docs/` — alur, UX, arsitektur, data, API, keamanan, pengujian, deployment, keputusan.
- `design/README.md` — prinsip desain dan layar wireframe.
- `src/README.md` — rencana implementasi frontend.
- `supabase/README.md` — rencana backend dan database.
- `tests/README.md` — strategi pengujian.

## Cara kerja pemesanan
1. Pelanggan memilih produk dan jumlah.
2. Keranjang menampilkan item, jumlah, harga satuan, subtotal, dan total sementara.
3. Pelanggan mengisi checkout, memilih pickup/delivery, dan meninjau daftar pesanan.
4. Website menyimpan atau menyiapkan referensi pesanan sesuai implementasi backend.
5. Website membuka WhatsApp admin dengan pesan terformat yang memuat daftar produk dan detail pesanan.
6. Pelanggan tetap harus menekan **Kirim** di WhatsApp. Membuka WhatsApp tidak berarti pesan sudah terkirim.
7. Admin mengecek ketersediaan, biaya delivery, dan detail pesanan, lalu mengonfirmasi.
8. Stok dikurangi hanya ketika admin mengonfirmasi dan stok masih cukup.

## Sebelum mulai coding
Konfirmasikan nomor WhatsApp admin dalam format internasional tanpa `+`, alamat/area layanan, biaya pengantaran, jam operasional, metode pembayaran, dan apakah checkout wajib menyimpan pesanan di database sebelum WhatsApp dibuka.
