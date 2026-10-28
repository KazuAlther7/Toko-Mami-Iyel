const SUPABASE_URL = 'https://xatelgiciowjlbsctpjz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Vm_D0S4XAl4fZDpUQcGyZA_7y07N49g';
const ADMIN_WA = '6285939280448';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const state = {
  products: [], categories: [], activeCategory: null,
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const rupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');
const saveCart = () => localStorage.setItem('cart', JSON.stringify(state.cart));
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function show(id) {
  ['catalog-view','cart-view','checkout-view','success-view'].forEach(v => $('#' + v).hidden = v !== id);
}

function renderCategories() {
  const el = $('#categories');
  el.innerHTML = `<button data-id="all" class="${state.activeCategory ? '' : 'active'}">Semua</button>` +
    state.categories.map(c => `<button data-id="${c.id}" class="${state.activeCategory === c.id ? 'active' : ''}">${c.name}</button>`).join('');
  el.querySelectorAll('button').forEach(btn => btn.onclick = () => {
    state.activeCategory = btn.dataset.id === 'all' ? null : btn.dataset.id;
    renderCategories(); renderProducts();
  });
}

function renderProducts() {
  const filtered = state.activeCategory
    ? state.products.filter(p => p.category_id === state.activeCategory)
    : state.products;
  $('#products').innerHTML = filtered.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <div class="price">${rupiah(p.price)} / ${p.unit}</div>
      <div class="stock">Stok: ${p.stock}</div>
      <button data-id="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>${p.stock <= 0 ? 'Habis' : 'Tambah'}</button>
    </div>`).join('');
  $$('#products button').forEach(btn => btn.onclick = () => addToCart(btn.dataset.id));
}

function addToCart(productId) {
  const p = state.products.find(x => x.id === productId);
  if (!p) return;
  const ex = state.cart.find(i => i.product_id === productId);
  if (ex) ex.qty++;
  else state.cart.push({ product_id: p.id, name: p.name, price: p.price, unit: p.unit, qty: 1 });
  saveCart(); updateCartBadge();
  alert(`${p.name} ditambahkan`);
}

function updateCartBadge() {
  $('#cart-count').textContent = state.cart.reduce((a, i) => a + i.qty, 0);
}

function renderCart() {
  if (!state.cart.length) {
    $('#cart-items').innerHTML = '<p style="padding:20px;text-align:center;color:#666">Keranjang kosong</p>';
    $('#cart-total').textContent = 'Rp0';
    $('#checkout-btn').disabled = true;
    return;
  }
  $('#checkout-btn').disabled = false;
  $('#cart-items').innerHTML = state.cart.map(i => `
    <div class="cart-item" data-id="${i.product_id}">
      <span class="name">${i.name}</span>
      <input type="number" min="1" value="${i.qty}" data-action="qty">
      <span class="subtotal">${rupiah(i.price * i.qty)}</span>
      <button class="del" data-action="del">✕</button>
    </div>`).join('');
  $$('#cart-items .cart-item').forEach(el => {
    const id = el.dataset.id;
    el.querySelector('[data-action=qty]').onchange = (e) => {
      state.cart.find(i => i.product_id === id).qty = Math.max(1, Number(e.target.value) || 1);
      saveCart(); renderCart(); updateCartBadge();
    };
    el.querySelector('[data-action=del]').onclick = () => {
      state.cart = state.cart.filter(i => i.product_id !== id);
      saveCart(); renderCart(); updateCartBadge();
    };
  });
  $('#cart-total').textContent = rupiah(state.cart.reduce((a, i) => a + i.price * i.qty, 0));
}

async function loadData() {
  const [p, c] = await Promise.all([
    supabase.from('products').select('*').eq('is_active', true).order('name'),
    supabase.from('categories').select('*').eq('is_active', true).order('sort_order'),
  ]);
  state.products = p.data || []; state.categories = c.data || [];
  renderCategories(); renderProducts();
}

$('#cart-btn').onclick = () => { renderCart(); show('cart-view'); };
$('#back-catalog-btn').onclick = () => show('catalog-view');
$('#checkout-btn').onclick = () => {
  $('#checkout-total').textContent = rupiah(state.cart.reduce((a, i) => a + i.price * i.qty, 0));
  show('checkout-view');
};
$('#back-cart-btn').onclick = () => { renderCart(); show('cart-view'); };

$('#checkout-form').addEventListener('change', (e) => {
  if (e.target.name === 'fulfillment') {
    const addr = document.querySelector('[name=address]');
    addr.hidden = e.target.value !== 'delivery';
    addr.required = e.target.value === 'delivery';
  }
});

$('#checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const btn = $('#submit-btn');
  btn.disabled = true; btn.textContent = 'Memproses...';
  const { data, error } = await supabase.rpc('create_order', {
    p_customer_name: fd.get('name'),
    p_customer_phone: fd.get('phone'),
    p_fulfillment_type: fd.get('fulfillment'),
    p_delivery_address: fd.get('fulfillment') === 'delivery' ? fd.get('address') : null,
    p_notes: fd.get('notes') || null,
    p_items: state.cart.map(i => ({ product_id: i.product_id, quantity: i.qty })),
  });
  btn.disabled = false; btn.textContent = 'Pesan via WhatsApp';
  if (error) return alert('Gagal: ' + error.message);
  state.cart = []; saveCart(); updateCartBadge();
  window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(data.whatsapp_message)}`, '_blank');
  $('#success-order-number').textContent = data.order_number;
  $('#success-total').textContent = rupiah(data.total_amount);
  show('success-view');
});

$('#success-back').onclick = () => { loadData(); show('catalog-view'); };

loadData();
updateCartBadge();