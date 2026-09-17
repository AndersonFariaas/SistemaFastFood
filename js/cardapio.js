let db = loadDB();
const $ = id => document.getElementById(id);
const modal = $('modal');
function render() {
    db = loadDB();
    const cats = [...new Set(db.products.map(p => p.category))].sort(); $('filtroCategoria').innerHTML = '<option value="">Todas as categorias</option>' + cats.map(c => `<option>${esc(c)}</option>`).join('');
    const q = $('filtroCardapio').value.toLowerCase(), cat = $('filtroCategoria').value;
    const ps = db.products.filter(p => (!q || p.name.toLowerCase().includes(q)) && (!cat || p.category === cat)); $('tabelaProdutos').innerHTML = `<table><thead><tr><th>Item</th><th>Categoria</th><th>Preço</th><th>Status</th><th></th></tr></thead><tbody>${ps.map(p => `<tr><td><strong>${esc(p.name)}</strong><small>${esc(p.description || '')}</small></td><td>${esc(p.category)}</td><td>${money(p.price)}</td><td><span class="badge ${p.active ? 'ok' : 'off'}">${p.active ? 'Disponível' : 'Indisponível'}</span></td><td class="actions"><button class="btn ghost" data-edit="${p.id}">Editar</button><button class="btn danger" data-del="${p.id}">Excluir</button></td></tr>`).join('')}</tbody></table>`; document.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => openEdit(b.dataset.edit)); document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => del(b.dataset.del))
}
function openEdit(id) {
    const p = id ? db.products.find(x => x.id === id) : null;
    $('modalTitulo').textContent = p ? 'Editar item' : 'Novo item'; $('produtoId').value = p?.id || ''; $('produtoNome').value = p?.name || ''; $('produtoPreco').value = p?.price ?? '';
    $('produtoCategoria').value = p?.category || ''; $('produtoDescricao').value = p?.description || ''; $('produtoAtivo').checked = p?.active ?? true;
    modal.classList.remove('hidden');
    $('produtoNome').focus()
}
function close() { modal.classList.add('hidden') }
$('novoProduto').onclick = () => openEdit();
$('fecharModal').onclick = close; $('cancelar').onclick = close; modal.onclick = e => { if (e.target === modal) close() }; $('filtroCardapio').oninput = render; $('filtroCategoria').onchange = render;
$('produtoForm').onsubmit = e => {
    e.preventDefault();
    const id = $('produtoId').value;
    const data = { name: $('produtoNome').value.trim(), price: Number($('produtoPreco').value), category: $('produtoCategoria').value.trim(), description: $('produtoDescricao').value.trim(), active: $('produtoAtivo').checked };
    if (!data.name || !data.category || data.price < 0) return; if (id) Object.assign(db.products.find(p => p.id === id), data); else db.products.push({ id: uid('prod'), ...data });
    saveDB(db); close(); render(); toast('Item salvo com sucesso!')
};
function del(id) {
    const p = db.products.find(x => x.id === id);
    if (!p) return; if (confirm(`Excluir "${p.name}"?`)) { db.products = db.products.filter(x => x.id !== id); saveDB(db); render(); toast('Item excluído.') }
}
render();
