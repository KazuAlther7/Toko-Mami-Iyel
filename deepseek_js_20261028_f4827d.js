const SUPABASE_URL = 'https://xatelgiciowjlbsctpjz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Vm_D0S4XAl4fZDpUQcGyZA_7y07N49g';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const rupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');
const $ = (s) => document.querySelector(s);

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  const loggedIn = !!session;
  $('#login-view').hidden = loggedIn;
  $('#orders-view').hidden = !loggedIn;
  if (loggedIn) loadOrders();
}

async function loadOrders() {
  $('#orders').innerHTML = '<p>Memuat...</p>';
  const { data, error } = await supabase
    .from('orders').select('*, order_items(*)')
    .order('created_at', { ascending: false });
  if (error) return $('#orders').innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
  if (!data.length) return $('#orders').innerHTML = '<p>Belum ada pesanan.</p>';

  $('#orders').innerHTML = data.map(o => `
    <div class="cart-item" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <b>${o.order_number}</b>
        <span style="font-weight:600;color:${o.status === 'pending' ? '#ca8a04' : o.status === 'confirmed' ? '#16a34a' : '#dc2626'}">${o.status}</span>
      </div>
      <div style="font-size:.9rem">${o.customer_name} — ${o.customer_phone}</div>
      <div style="font-size:.9rem">${o.fulfillment_type === 'pickup' ? 'Ambil di toko' : 'Diantar'}</div>
      ${o.delivery_address ? `<div style="font-size:.85rem;color:#666">${o.delivery_address}</div>` : ''}
      <ul style="font-size:.85rem;padding-left:16px;margin:8px 0">
        ${o.order_items.map(i => `<li>${i.product_name} x${i.quantity} = ${rupiah(i.subtotal)}</li>`).join('')}
      </ul>
      <div style="font-weight:600;margin-bottom:8px">Total: ${rupiah(o.total_amount)}</div>
      ${o.status === 'pending' ? `
        <div style="display:flex;gap:8px">
          <button class="primary" data-confirm="${o.id}" style="margin:0">Konfirmasi</button>
          <button class="secondary" data-cancel="${o.id}" style="margin:0">Batalkan</button>
        </div>` : ''}
    </div>`).join('');

  document.querySelectorAll('[data-confirm]').forEach(b => b.onclick = () => confirmOrder(b.dataset.confirm));
  document.querySelectorAll('[data-cancel]').forEach(b => b.onclick = () => cancelOrder(b.dataset.cancel));
}

async function confirmOrder(id) {
  if (!confirm('Konfirmasi pesanan? Stok akan dipotong.')) return;
  const { error } = await supabase.rpc('confirm_order', { p_order_id: id });
  if (error) return alert('Gagal: ' + error.message);
  alert('✅ Pesanan dikonfirmasi, stok dipotong.');
  loadOrders();
}

async function cancelOrder(id) {
  if (!confirm('Batalkan pesanan?')) return;
  const { error } = await supabase.rpc('cancel_order', { p_order_id: id });
  if (error) return alert('Gagal: ' + error.message);
  alert('Pesanan dibatalkan.');
  loadOrders();
}

$('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const btn = $('#login-btn');
  btn.disabled = true; btn.textContent = 'Masuk...';
  const { error } = await supabase.auth.signInWithPassword({
    email: fd.get('email'), password: fd.get('password'),
  });
  btn.disabled = false; btn.textContent = 'Masuk';
  if (error) return alert('Gagal login: ' + error.message);
  checkSession();
});

$('#logout-btn').onclick = async () => { await supabase.auth.signOut(); checkSession(); };
$('#refresh-btn').onclick = loadOrders;

checkSession();