import { useState } from 'react';
import { convertCurrency, type CryptoCurrency, type ConversionResult, ALL_CURRENCIES } from '../services/coingecko';

export function useConversion() {
  const defaultFromCurrency = ALL_CURRENCIES.find((currency) => currency.id === 'brl') || null;
  const defaultToCurrency = ALL_CURRENCIES.find((currency) => currency.id === 'bitcoin') || null;

  const [fromCurrency, setFromCurrency] = useState<CryptoCurrency | null>(defaultFromCurrency);
  const [toCurrency, setToCurrency] = useState<CryptoCurrency | null>(defaultToCurrency);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!fromCurrency) {
      setError('Selecione a moeda de origem');
      return;
    }

    if (!toCurrency) {
      setError('Selecione a moeda de destino');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Informe um valor válido maior que zero');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const conversionResult = await convertCurrency(
        parseFloat(amount),
        fromCurrency,
        toCurrency
      );

      setResult(conversionResult);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar conversão';
      setError(errorMessage);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    if (fromCurrency && toCurrency) {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setResult(null);
      setError(null);
    }
  };

  const reset = () => {
    setFromCurrency(null);
    setToCurrency(null);
    setAmount('');
    setResult(null);
    setError(null);
  };

  return {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    result,
    isLoading,
    error,
    handleConvert,
    swapCurrencies,
    reset,
    currencies: ALL_CURRENCIES,
  };
}
