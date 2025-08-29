Dashboard Administrativo Interativo

Controle total das operações, produtos, vendas e comunicação em um só lugar.

📝 Sobre o Projeto

Um dashboard completo desenvolvido em React + TypeScript + Tailwind CSS, projetado para empresas acompanharem produtos, pedidos, RFQs, produção, analytics e mensagens em tempo real.

💡 Motivação

Empresas precisam centralizar operações em um único painel.

Monitorar métricas de vendas, estoque e produtividade de forma rápida.

Facilitar a comunicação interna através de mensagens.

🚀 Funcionalidades

Dashboard: cards com métricas de vendas, usuários, pedidos e taxa de conversão.

Products: adicionar, editar, remover e filtrar produtos.

New RFQ: criar novos pedidos de cotação com modal interativo.

Productions: acompanhamento de produção em andamento.

Analytics: gráficos de vendas e usuários (Recharts).

Message: chat simples com seleção de contatos.

Payment: controle de pagamentos.

POS: finalização de vendas rápidas.

Profile: edição de informações do usuário.

🛠 Tecnologias

Frontend: React + TypeScript

Estilo: Tailwind CSS

Roteamento: react-router-dom

Gráficos: Recharts

Gerenciamento de estado: useState, modais e formulários


Substitua os link-do-print-aqui pelos links das imagens hospedadas ou pastas do seu projeto.

⚙️ Como Usar

Clone o repositório:

git clone https://github.com/seu-usuario/seu-repo.git


Instale dependências:

npm install


Rode o projeto:

npm start


Abra http://localhost:3000
 no navegador.

📈 Lógica e Estado

Adicionar Produto:

setProducts(prev => [...prev, novoProduto])


Editar Produto:

setProducts(prev => prev.map(p => p.id === edited.id ? edited : p))


Remover Produto:

setProducts(prev => prev.filter(p => p.id !== id))

🧠 Aprendizados

Manipulação de listas com React Hooks

Criação de modais e formulários interativos

Layout responsivo com Tailwind

Visualização de dados com gráficos (Recharts)

📌 Próximos Passos

Integração com backend/API real

Autenticação e permissões de usuário

Dashboard responsivo para mobile

Melhorias em UI/UX, filtros e animações
