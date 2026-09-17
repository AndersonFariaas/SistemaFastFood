let db = loadDB(); 
const $ = id => document.getElementById(id);
function render() { db = loadDB();
     const all = db.orders; 
     const total = all.reduce((s, o) => s + o.total, 0); $('stats').innerHTML = `<div class="stat"><small>Pedidos</small><strong>${all.length}</strong></div><div class="stat"><small>Em andamento</small><strong>${all.filter(o => !['ENTREGUE', 'CANCELADO'].includes(o.status)).length}</strong></div><div class="stat"><small>Faturamento</small><strong>${money(total)}</strong></div>`;
      $('historico').innerHTML = all.length ? `<table><thead><tr><th>Pedido</th><th>Data</th><th>Cliente</th><th>Itens</th><th>Status</th><th>Total</th></tr></thead><tbody>${[...all].reverse().map(o => `<tr><td><strong>#${o.number}</strong></td><td>${new Date(o.createdAt).toLocaleString('pt-BR')}</td><td>${esc(o.customer)}</td><td>${o.items.map(i => `${i.qty}× ${esc(i.name)}`).join(', ')}</td><td><span class="badge">${statusLabel(o.status)}</span></td><td><strong>${money(o.total)}</strong></td></tr>`).join('')}</tbody></table>` : '<div class="empty">Nenhum pedido registrado.</div>' }
$('limparHistorico').onclick = () => { if (confirm('Excluir todo o histórico de pedidos?')) { db.orders = []; saveDB(db); render(); toast('Histórico limpo.') } }; window.addEventListener('dbchange', render); render();
