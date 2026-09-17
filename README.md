# Sistema de Lanchonete — KDS

Sistema web completo para uma pequena lanchonete, funcionando localmente sem servidor ou banco de dados.

## Funcionalidades
- Caixa com catálogo, busca e filtro por categoria.
- Carrinho com quantidade +/-, total e observações.
- Envio do pedido para a cozinha.
- KDS com fluxo **NOVO → EM PREPARO → PRONTO → ENTREGUE**.
- Tela de cozinha atualizada automaticamente entre abas/dispositivos no mesmo navegador.
- Cadastro, edição, exclusão e ativação/desativação de itens do cardápio.
- Categorias criadas automaticamente a partir dos produtos.
- Histórico de pedidos e indicadores de quantidade/faturamento.
- Persistência em `localStorage`.
- Layout responsivo para computador, tablet e celular.

## Como executar
1. Abra `index.html` no navegador.
2. Abra `cozinha.html` em outra aba para simular a tela touch da cozinha.
3. Cadastre/edite produtos em `cardapio.html`.
4. Consulte pedidos em `pedidos.html`.

## Estrutura
- `index.html` — caixa
- `cozinha.html` — KDS
- `cardapio.html` — administração do cardápio
- `pedidos.html` — histórico
- `css/style.css` — interface
- `js/app.js` — banco local/utilitários
- `js/caixa.js` — caixa
- `js/cozinha.js` — cozinha
- `js/cardapio.js` — cardápio
- `js/pedidos.js` — histórico

## Próxima evolução para produção
Para vários caixas, tablets e dispositivos diferentes em tempo real, o próximo passo é trocar o `localStorage` por uma API/backend e banco de dados (por exemplo, Node.js + PostgreSQL), adicionando autenticação e comunicação em tempo real via WebSocket.
