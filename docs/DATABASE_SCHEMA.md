# Database Schema (proposal)

Skema ini adalah rancangan, belum diterapkan. Sesuaikan setelah keputusan apakah order disimpan di database.

## `products`
- `id` UUID primary key
- `slug` unique
- `name` text
- `description` text nullable
- `image_path` text nullable
- `category_id` nullable
- `unit_label` text
- `price` numeric/integer dalam satuan mata uang yang diputuskan
- `stock_quantity` integer, tidak boleh negatif
- `is_active` boolean
- `created_at`, `updated_at`

## `categories`
- `id` UUID primary key
- `name` text
- `slug` unique
- `sort_order` integer

## `orders` (jika order website perlu tercatat)
- `id` UUID primary key; gunakan kode pesanan publik terpisah yang tidak mudah ditebak
- `customer_name`, `customer_phone`
- `fulfillment_method`: `pickup` atau `delivery`
- `delivery_address`, `customer_note` nullable
- `status`: `pending`, `confirmed`, `rejected`, `cancelled`, `completed`
- `payment_status` terpisah: mis. `unpaid`, `proof_pending`, `paid`, `refunded` jika relevan
- `items_subtotal`, `delivery_fee` nullable/unknown sampai dikonfirmasi, `total_amount` nullable/estimated
- `created_at`, `updated_at`, `confirmed_at`, `confirmed_by`

## `order_items`
- `id` UUID primary key
- `order_id` foreign key
- `product_id` foreign key nullable jika snapshot harus tetap ada setelah produk dihapus
- `product_name_snapshot`, `unit_label_snapshot`
- `unit_price_snapshot`, `quantity`, `line_subtotal`
- Snapshot agar isi order tetap terbaca jika harga/nama produk berubah.

## `stock_movements`
- `id` UUID primary key
- `product_id`
- `order_id` nullable
- `quantity_delta` integer (negatif untuk pengurangan)
- `reason`, `actor_id`, `created_at`
- Catatan append-only untuk audit; perubahan stok tidak dilakukan langsung dari browser.

## Aturan konsistensi
- Harga/total dihitung ulang dari data tepercaya.
- `stock_quantity >= 0`.
- Konfirmasi order dan pengurangan stok berada dalam satu transaksi.
- Konfirmasi bersifat idempotent: order yang sudah diproses tidak mengurangi stok ulang.
- Jika salah satu item tidak cukup, seluruh konfirmasi gagal atau masuk proses penyesuaian; jangan membuat stok sebagian berkurang.
- Simpan status pesanan terpisah dari status pembayaran.
- RLS melarang pelanggan mengubah harga, status admin, stok, dan ledger.
