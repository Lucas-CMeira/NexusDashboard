# 🚀 Nexus Dashboard

Sistema web desenvolvido como desafio prático de Front-end, com foco em gerenciamento de transações financeiras (depósitos, saques e conversões de moeda).

---

## 📌 Funcionalidades

* 🔐 Autenticação de usuário (login)
* 💰 Depósito de valores
* 💸 Saque de valores
* 🔄 Conversão de BRL para BTC (API externa)
* 📊 Dashboard com indicadores dinâmicos
* 📋 Listagem de transações
* 🧭 Navegação com Navbar persistente

---

## 🧠 Tecnologias Utilizadas

* React
* TypeScript
* React Router DOM
* Tailwind CSS
* Fetch API

---

## 🌐 Integração Externa

* API de criptomoedas (CoinGecko)

---

## 📁 Estrutura do Projeto

```bash id="p1"
src/
  components/
    Navbar.tsx
    Popup.tsx
    ProtectedRoute.tsx
  context/
    user-context.tsx
  hooks/
    useAuth.ts
    useConversion.ts
    useDeposit.ts
    useWithdraw.ts
  mocks/
    users-mocks.ts
  pages/
    Home/
    Login/
    Users/
    Deposit/
    Withdraw/
    Conversion/
  services/
    assets-service.ts
    balance-service.ts
    transactions.ts
    users-service.ts
    withdraw-service.ts
    deposit-service.ts
    coingecko.ts
  types/
    User.ts
  routes/
    routes.tsx
  App.tsx
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash id="p2"
git clone https://github.com/seu-usuario/nexus-dashboard.git
```

---

### 2. Acesse a pasta

```bash id="p3"
cd nexus-dashboard
```

---

### 3. Instale as dependências

```bash id="p4"
npm install
```

---

### 4. Execute o projeto

```bash id="p5"
npm run dev
```

---

### 5. Acesse no navegador

```bash id="p6"
http://localhost:5173
```

---

## 🔐 Autenticação

* Sistema de login
* Validação básica de credenciais
* (Persistência pode ser adicionada com localStorage)

---

## 💰 Regras de Negócio

* Depósitos aumentam o saldo
* Saques diminuem o saldo
* Conversões utilizam cotação em tempo real
* Dashboard atualizado dinamicamente com base nas transações

---

## 📊 Dashboard

Exibe:

* Total depositado
* Total sacado
* Volume total
* Quantidade de transações
* Últimas movimentações

---

## 🔄 Conversão de Moeda

* Endpoint externo: CoinGecko
* Conversão em tempo real
* Precisão de até 8 casas decimais

---

## 🚨 Tratamento de Erros

* Validação de inputs
* Mensagens de erro via Popup
* Tratamento de falha na API externa

---

## 🧪 Melhorias Futuras

* Persistência com backend (Node.js / NestJS)
* Context API ou Redux
* Sistema de autenticação real (JWT)
* Testes automatizados
* Responsividade completa

---

## 👨‍💻 Autor

Lucas Campos
Desenvolvedor Front-end em formação

---

## 📌 Observações

Este projeto foi desenvolvido com foco em boas práticas de organização, componentização e integração com APIs externas, simulando um ambiente real de desenvolvimento.

---


