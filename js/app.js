const DB_KEY = 'lanchonete_db_v1';
const defaultDB = {
    products: [
        { id: 'p1', name: 'X-Burger', price: 18.90, category: 'Hambúrgueres', description: 'Pão, hambúrguer, queijo e molho', active: true },
        { id: 'p2', name: 'X-Salada', price: 21.90, category: 'Hambúrgueres', description: 'Hambúrguer, queijo, alface, tomate e molho', active: true },
        { id: 'p3', name: 'Batata Frita', price: 10, category: 'Porções', description: 'Porção de batatas fritas', active: true },
        { id: 'p4', name: 'Coca-Cola', price: 7, category: 'Bebidas', description: 'Lata 350 ml', active: true },
        { id: 'p5', name: 'Guaraná', price: 6, category: 'Bebidas', description: 'Lata 350 ml', active: true },
        { id: 'p6', name: 'Pizza Calabresa', price: 45, category: 'Pizzas', description: 'Pizza de calabresa', active: true }
    ],
    orders: []
};

function loadDB() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEY)) || structuredClone(defaultDB)
    } catch {
        return structuredClone(defaultDB)
    }
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    window.dispatchEvent(new Event('dbchange'));
}

// SINCRONIZAÇÃO CROSS-TAB: Garante que uma aba escute a outra
window.addEventListener('storage', (e) => {
    if (e.key === DB_KEY) {
        window.dispatchEvent(new Event('dbchange'));
    }
});

function money(v) { return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function uid(prefix = 'id') { return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7) }
function esc(s) { return String(s ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])) }

function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.innerHTML = `<i class="ph-fill ph-info"></i> ${msg}`;

    // Classes do Tailwind para fazer a animação de entrada
    el.classList.remove('translate-y-20', 'opacity-0');

    clearTimeout(window._toast);
    window._toast = setTimeout(() => {
        el.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

function statusLabel(s) { return ({ NOVO: 'Novo', EM_PREPARO: 'Em preparo', PRONTO: 'Pronto', ENTREGUE: 'Entregue', CANCELADO: 'Cancelado' })[s] || s }