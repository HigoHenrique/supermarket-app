# Sistema de Gestão de Supermercado

Este projeto consiste em uma aplicação web para gestão de produtos e marcas de um supermercado, desenvolvido como parte de um teste técnico.

## 💻 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando um stack moderno de tecnologias:

- **Next.js** - Framework React com renderização do lado do servidor (SSR) e geração de sites estáticos (SSG)
- **TypeScript** - Superset de JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first para estilização rápida e responsiva
- **Shadcn/UI** - Componentes de UI reutilizáveis e personalizáveis
- **API RESTful** - Backend desenvolvido para fornecer dados e processar operações CRUD

## ✨ Funcionalidades

### Gestão de Produtos
- Cadastro de novos produtos com informações detalhadas
- Listagem de produtos com opções de filtragem e ordenação

### Gestão de Marcas
- Cadastro de novas marcas
- Listagem de todas as marcas disponíveis

### Interface Responsiva
- Design adaptativo para dispositivos móveis, tablets e desktops
- Experiência de usuário otimizada em diferentes tamanhos de tela

## 📝 Pré-requisitos

Para executar este projeto, você precisará:

- Node.js (versão 16.x ou superior)
- npm ou yarn
- Git

## ⚙️ Configuração do Ambiente

### Configuração da API

1. Clone o repositório da API:
   ```bash
   git clone https://github.com/HigoHenrique/supermarket-api.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

5. A API estará em execução em `http://localhost:3001`

### Configuração do Frontend

1. Clone o repositório do frontend:
   ```bash
   git clone https://github.com/HhigoHenrique/supermarket-app.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Compile o TypeScript:
   ```bash
   npm run build
   # ou
   yarn build
   ```

## 🚀 Executando o Projeto

Após configurar o ambiente, você pode executar o frontend com os seguintes comandos:

1. Inicie o servidor:
   ```bash
   npm run start
   # ou
   yarn start
   ```

2. Para desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

O frontend estará disponível em `http://localhost:3000`

### Testes Manuais

Para testar manualmente as funcionalidades da aplicação:

1. **Acessar a gestão de arquivos**:
   - Acesse a página inicial
   - Clique no botão "Acessar gerenciador de produtos"

2. **Cadastro de Marca**:
   - Acesse a página de marcas
   - Clique no botão "Cadastrar parca"
   - Preencha o formulário e submeta

3. **Cadastro de Produto**:
   - Acesse a página de produtos
   - Clique no botão "Cadastrar produto"
   - Selecione uma marca (previamente cadastrada)
   - Preencha os demais campos e submeta

## 🧠 Decisões Técnicas

### Arquitetura Next.js
Optei pelo Next.js para aproveitar os benefícios de SSR e SSG, além da otimização automática de imagens e rotas. Isso proporciona uma experiência mais rápida e fluida para o usuário final.

### TypeScript
A utilização de TypeScript adiciona robustez ao código, prevenindo erros comuns durante o desenvolvimento e melhorando a manutenibilidade do projeto a longo prazo.

### Tailwind CSS + Shadcn/UI
A combinação de Tailwind com Shadcn/UI permitiu o desenvolvimento rápido de uma interface consistente e moderna, sem sacrificar a personalização. Os componentes do Shadcn/UI são totalmente acessíveis e personalizáveis.

### Organização de Serviços
Separei a lógica de comunicação com a API em serviços específicos, facilitando a manutenção e possível expansão futura das funcionalidades.

## 📈 Melhorias Futuras

Algumas melhorias que poderiam ser implementadas em versões futuras:

- Sistema de autenticação e autorização
- Dashboard com métricas e análises de produtos
- Gestão de estoque integrada
- Integração com sistemas de ponto de venda
- Módulo de relatórios personalizáveis

## 📞 Contato

Para mais informações sobre este projeto, entre em contato:

- **Nome**: Higo Henrique da Silva
- **Email**: silvahigo2@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/higo-henrique-da-silva-7a20a7234/
- **GitHub**: https://github.com/HigoHenrique/

---

Desenvolvido com ❤️ por Higo.
