export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
}

export interface ConversionResult {
  fromAmount: number;
  fromCurrency: CryptoCurrency;
  toAmount: number;
  toCurrency: CryptoCurrency;
  rate: number;
  timestamp: string;
}

// Lista de criptomoedas suportadas
export const SUPPORTED_CRYPTOS: CryptoCurrency[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'tether', name: 'Tether', symbol: 'USDT' },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
];

// Adicionamos moedas fiduciárias para conversão
export const SUPPORTED_FIATS: CryptoCurrency[] = [
  { id: 'usd', name: 'US Dollar', symbol: 'USD' },
  { id: 'brl', name: 'Brazilian Real', symbol: 'BRL' },
  { id: 'eur', name: 'Euro', symbol: 'EUR' },
];

export const ALL_CURRENCIES = [...SUPPORTED_CRYPTOS, ...SUPPORTED_FIATS];

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

const isFiat = (currencyId: string) => SUPPORTED_FIATS.some((fiat) => fiat.id === currencyId);

export async function getExchangeRate(fromId: string, toId: string): Promise<number> {
  if (fromId === toId) {
    return 1;
  }

  const fromIsFiat = isFiat(fromId);
  const toIsFiat = isFiat(toId);

  try {
    // crypto -> crypto and crypto -> fiat
    if (!fromIsFiat) {
      const targetCurrency = toIsFiat ? toId : toId;
      const response = await fetch(
        `${COINGECKO_BASE}/simple/price?ids=${fromId}&vs_currencies=${targetCurrency}`
      );

      if (!response.ok) {
        throw new Error('Falha ao buscar taxa de câmbio');
      }

      const data = await response.json();
      const rate = data[fromId]?.[targetCurrency];

      if (typeof rate !== 'number' || Number.isNaN(rate)) {
        throw new Error('Resposta inválida ao consultar taxa de câmbio');
      }

      return rate;
    }

    // fiat -> crypto (ex: BRL -> BTC)
    if (fromIsFiat && !toIsFiat) {
      const response = await fetch(
        `${COINGECKO_BASE}/simple/price?ids=${toId}&vs_currencies=${fromId}`
      );

      if (!response.ok) {
        throw new Error('Falha ao buscar taxa de câmbio');
      }

      const data = await response.json();
      const inverseRate = data[toId]?.[fromId];

      if (typeof inverseRate !== 'number' || inverseRate <= 0 || Number.isNaN(inverseRate)) {
        throw new Error('Resposta inválida ao consultar taxa de câmbio');
      }

      return 1 / inverseRate;
    }

    // fiat -> fiat (valor aproximado usando taxas fixas)
    if (fromIsFiat && toIsFiat) {
      const fiatBaseRates: Record<string, number> = {
        usd: 1,
        brl: 5.2,
        eur: 0.92,
      };

      const fromRate = fiatBaseRates[fromId];
      const toRate = fiatBaseRates[toId];

      if (!fromRate || !toRate) {
        throw new Error('Conversão entre fiats não suportada');
      }

      return toRate / fromRate;
    }

    throw new Error('Conversão não suportada');
  } catch (error) {
    console.error('Erro ao buscar taxa de câmbio:', error);
    throw new Error('Não foi possível obter a taxa de câmbio. Tente novamente.');
  }
}

export async function convertBRLtoBTC(amount: number) {
  if (!amount || amount <= 0) {
    throw new Error('Valor inválido');
  }

  const rate = await getExchangeRate('brl', 'bitcoin');
  const btc = Number((amount * rate).toFixed(8));

  return {
    brl: amount,
    btc,
    rate,
  };
}

export async function convertCurrency(
  fromAmount: number,
  fromCurrency: CryptoCurrency,
  toCurrency: CryptoCurrency
): Promise<ConversionResult> {
  if (fromAmount <= 0) {
    throw new Error('Valor deve ser maior que zero');
  }

  if (fromCurrency.id === toCurrency.id) {
    return {
      fromAmount,
      fromCurrency,
      toAmount: fromAmount,
      toCurrency,
      rate: 1,
      timestamp: new Date().toISOString(),
    };
  }

  const rate = await getExchangeRate(fromCurrency.id, toCurrency.id);
  const toAmount = fromAmount * rate;

  return {
    fromAmount,
    fromCurrency,
    toAmount,
    toCurrency,
    rate,
    timestamp: new Date().toISOString(),
  };
}