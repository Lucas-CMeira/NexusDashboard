# 📄 Integração CoinGecko – Conversão BRL → BTC

## 📌 Visão Geral

Este documento descreve a implementação de um serviço de conversão de valores em **BRL (Real Brasileiro)** para **BTC (Bitcoin)** utilizando a API pública da CoinGecko.

A funcionalidade deve ser integrada ao frontend React do projeto, seguindo boas práticas de separação de responsabilidades (service layer).

---

## 🌐 API Externa

* Provedor: CoinGecko
* Tipo: Pública (gratuita)
* Necessita API Key: ❌ Não

### 🔗 Base URL

```
https://api.coingecko.com/api/v3
```

---

## 📥 Endpoint Utilizado

### Obter preço do Bitcoin em BRL

```
GET /simple/price
```

### Parâmetros

| Parâmetro     | Tipo   | Obrigatório | Descrição                        |
| ------------- | ------ | ----------- | -------------------------------- |
| ids           | string | ✅           | Identificador da moeda (bitcoin) |
| vs_currencies | string | ✅           | Moeda de comparação (brl)        |

### Exemplo de requisição

```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl
```

### Exemplo de resposta

```json
{
  "bitcoin": {
    "brl": 300000
  }
}
```

---

## 🎯 Objetivo da Implementação

Criar um serviço interno que:

* Receba um valor em BRL
* Consulte a cotação atual do BTC
* Retorne o valor convertido em BTC

---

## 📁 Estrutura Esperada

```
src/
  services/
    coingecko.ts
  pages/
    Conversion/
      Conversion.tsx
```

---

## ⚙️ Service Layer

### 📄 Arquivo: `src/services/coingecko.ts`

### Responsabilidade

* Consumir a API externa
* Realizar a conversão
* Tratar erros básicos

### Implementação

```ts
export async function convertBRLtoBTC(amount: number) {
  if (!amount || amount <= 0) {
    throw new Error("Valor inválido");
  }

  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl"
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar cotação");
  }

  const data = await response.json();

  const rate = data.bitcoin.brl;

  const btc = amount / rate;

  return {
    brl: amount,
    btc: Number(btc.toFixed(8)),
    rate,
  };
}
```

---

## 🧠 Regras de Negócio

* O valor de entrada deve ser maior que 0
* A conversão deve utilizar o valor atual da API
* O valor convertido deve conter no máximo 8 casas decimais
* Em caso de erro na API, deve ser lançado um erro tratável

---

## 🖥️ Camada de Apresentação

### 📄 Arquivo: `src/pages/Conversion/Conversion.tsx`

### Responsabilidade

* Receber input do usuário
* Chamar o service
* Exibir resultado

### Implementação

```tsx
import { useState } from "react";
import { convertBRLtoBTC } from "../../services/coingecko";

function Conversion() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleConvert() {
    setError("");

    try {
      const data = await convertBRLtoBTC(Number(amount));
      setResult(data);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  }

  return (
    <div>
      <h1>Conversão BRL → BTC</h1>

      <input
        type="number"
        placeholder="Valor em BRL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleConvert}>
        Converter
      </button>

      {result && (
        <div>
          <p>BTC: {result.btc}</p>
          <p>Cotação: R$ {result.rate}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Conversion;
```

---

## 🔄 Fluxo da Aplicação

```
Usuário digita valor (BRL)
        ↓
Frontend chama service (convertBRLtoBTC)
        ↓
Service consome API CoinGecko
        ↓
Service calcula valor em BTC
        ↓
Frontend exibe resultado
```

---

## 🚨 Tratamento de Erros

| Situação            | Ação                       |
| ------------------- | -------------------------- |
| Valor inválido      | Exibir mensagem ao usuário |
| API indisponível    | Exibir erro genérico       |
| Resposta inesperada | Lançar exceção             |

---

## 🚀 Melhorias Futuras (Opcional)

* Cache da cotação (evitar muitas requisições)
* Suporte a múltiplas moedas (ETH, USDT)
* Loader durante requisição
* Integração com estado global (Context API)

---

## ✅ Critérios de Aceitação

* [ ] Usuário consegue inserir valor em BRL
* [ ] Sistema retorna valor convertido em BTC
* [ ] Cotação é exibida corretamente
* [ ] Erros são tratados e exibidos
* [ ] Código separado em service + UI

---

## 📌 Observações

* Não utilizar valores mockados
* Não armazenar cotação localmente (sempre buscar atual)
* Código deve ser simples e legível
