let db = loadDB(), cart = [], category = '';
const $ = id => document.getElementById(id);
function renderCats() { 
    const cats = [...new Set(db.products.filter(p => p.active).map(p => p.category))]; $('categorias').innerHTML = '<button class="chip ' + (!category ? 'selected' : '') + '" data-cat="">Todos</button>' + cats.map(c => `<button class="chip ${category === c ? 'selected' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join(''); document.querySelectorAll('.chip').forEach(b => b.onclick = () => { category = b.dataset.cat; render() }) }
function renderProducts() { 
    const q = $('buscaProduto').value.toLowerCase(); 
    const ps = db.products.filter(p => p.active && (!category || p.category === category) && p.name.toLowerCase().includes(q)); $('produtos').innerHTML = ps.length ? ps.map(p => `<button class="product" data-id="${p.id}"><span class="product-icon">🍔</span><span><strong>${esc(p.name)}</strong><small>${esc(p.category)}</small><small>${esc(p.description || '')}</small></span><b>${money(p.price)}</b></button>`).join('') : '<div class="empty full">Nenhum item encontrado.</div>'; document.querySelectorAll('.product').forEach(b => b.onclick = () => add(b.dataset.id)) }
function add(id) { 
    const p = db.products.find(x => x.id === id), item = cart.find(x => x.id === id); if (item) item.qty++; else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 }); renderCart() }
function change(id, d) { 
    const i = cart.find(x => x.id === id); 
    if (!i) return; i.qty += d; if (i.qty <= 0) cart = cart.filter(x => x.id !== id); renderCart() }
function renderCart() { 
    const box = $('pedidoItens'); box.classList.toggle('empty', !cart.length); box.innerHTML = cart.length ? cart.map(i => `<div class="order-item"><div><strong>${esc(i.name)}</strong><small>${money(i.price)} cada</small></div><div class="qty"><button data-act="dec" data-id="${i.id}">−</button><b>${i.qty}</b><button data-act="inc" data-id="${i.id}">+</button></div><strong>${money(i.price * i.qty)}</strong></div>`).join('') : 'Nenhum item adicionado.'; box.querySelectorAll('button').forEach(b => b.onclick = () => change(b.dataset.id, b.dataset.act === 'inc' ? 1 : -1));
 const total = cart.reduce((s, i) => s + i.price * i.qty, 0); $('total').textContent = money(total); $('enviarPedido').disabled = !cart.length }
function send() { if (!cart.length) return;
     const total = cart.reduce((s, i) => s + i.price * i.qty, 0); 
     const order = { id: uid('ped'), number: db.orders.length ? Math.max(...db.orders.map(o => o.number)) + 1 : 1, createdAt: new Date().toISOString(), status: 'NOVO', customer: $('cliente').value.trim() || 'Balcão', note: $('observacao').value.trim(), items: cart.map(i => ({ ...i })), total }; db.orders.push(order); saveDB(db); cart = []; $('cliente').value = ''; $('observacao').value = ''; renderCart(); toast(`Pedido #${order.number} enviado para a cozinha!`) }
function render() { db = loadDB(); renderCats(); renderProducts(); renderCart() }
$('buscaProduto').addEventListener('input', renderProducts); $('limparPedido').onclick = () => { cart = []; renderCart() }; $('enviarPedido').onclick = send; window.addEventListener('dbchange', render); render();
