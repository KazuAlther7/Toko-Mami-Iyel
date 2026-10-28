# Roadmap

## Tahap 0 — Konfirmasi operasional
- [ ] Tentukan nomor WhatsApp admin dan formatnya.
- [ ] Tetapkan area delivery, biaya, jam operasional, dan pickup.
- [ ] Tetapkan metode pembayaran dan kebijakan pembatalan.
- [ ] Putuskan apakah pesanan disimpan ke database sebelum WhatsApp dibuka.
- [ ] Tentukan sumber data produk, harga, satuan, dan stok awal.

## Tahap 1 — UX dan wireframe
- [ ] Wireframe mobile katalog/home.
- [ ] Wireframe pencarian/kategori dan kartu produk.
- [ ] Wireframe keranjang.
- [ ] Wireframe checkout pickup/delivery.
- [ ] Wireframe konfirmasi dan instruksi WhatsApp.
- [ ] Wireframe login dan dashboard admin.
- [ ] Uji alur dengan pengguna sebelum menetapkan warna/identitas final.

## Tahap 2 — Fondasi teknis
- [ ] Konfirmasi stack: React + TypeScript + Vite untuk frontend.
- [ ] Konfirmasi Supabase (Postgres/Auth/Storage) untuk backend.
- [ ] Konfirmasi Cloudflare Pages untuk hosting frontend statis.
- [ ] Siapkan environment variables, migrasi, dan RLS.
- [ ] Definisikan skema produk, stok, pesanan, item pesanan, dan mutasi stok.
- [ ] Buat operasi konfirmasi order yang atomik di sisi server/database.

## Tahap 3 — Implementasi pelanggan
- [ ] Katalog produk dan harga.
- [ ] Pencarian/kategori sesuai prioritas.
- [ ] Keranjang persisten selama sesi/perangkat sesuai keputusan.
- [ ] Checkout dengan validasi.
- [ ] Ringkasan dan pembuatan pesan WhatsApp.
- [ ] Pesan status yang jelas tentang langkah “Kirim” di WhatsApp.

## Tahap 4 — Implementasi admin
- [ ] Autentikasi admin.
- [ ] Manajemen produk/harga/foto.
- [ ] Manajemen stok.
- [ ] Daftar/detail pesanan bila database pesanan diaktifkan.
- [ ] Konfirmasi/tolak pesanan dan pengurangan stok aman.
- [ ] Catatan mutasi stok dan pencegahan pengurangan ganda.

## Tahap 5 — QA dan peluncuran
- [ ] Uji ponsel, tablet, dan desktop.
- [ ] Uji jumlah, harga, dan encoding pesan WhatsApp.
- [ ] Uji stok kurang dan konfirmasi bersamaan.
- [ ] Uji keamanan RLS dan akses admin.
- [ ] Uji batas paket gratis, backup, dan prosedur pemulihan.
- [ ] Masukkan nomor WhatsApp dan pengaturan toko final.
- [ ] Deploy setelah persetujuan pemilik.

## Gerbang rilis
Tidak boleh dianggap siap produksi sebelum nomor WhatsApp, aturan delivery/pembayaran, keamanan admin, dan perilaku pencatatan pesanan dipastikan.
