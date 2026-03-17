import { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { useConversion } from "../../hooks/useConversion";

function Conversion() {
  const { user } = useContext(UserContext);
  const {
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
    currencies,
  } = useConversion();

  if (!user) {
    return <div>Carregando...</div>;
  }

  const formatNumber = (num: number, decimals: number = 6) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const formatRate = (rate: number) => {
    if (rate >= 1) {
      return formatNumber(rate, 6);
    } else {
      return formatNumber(rate, 8);
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Conversão de Moedas</h1>
            <p className="text-gray-600 text-sm">Taxas em tempo real da CoinGecko API</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna da Esquerda - Formulário */}
          <div className="space-y-6">
            {/* Moeda de Origem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moeda de Origem <span className="text-red-500">*</span>
              </label>
              <select
                value={fromCurrency?.id || ''}
                onChange={(e) => {
                  const currency = currencies.find(c => c.id === e.target.value);
                  setFromCurrency(currency || null);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecione uma moeda...</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.symbol} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Moeda de Destino */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moeda de Destino <span className="text-red-500">*</span>
              </label>
              <select
                value={toCurrency?.id || ''}
                onChange={(e) => {
                  const currency = currencies.find(c => c.id === e.target.value);
                  setToCurrency(currency || null);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecione uma moeda...</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.symbol} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Valor de Origem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor de Origem <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {fromCurrency && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    {fromCurrency.symbol}
                  </div>
                )}
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    fromCurrency ? 'pl-12' : ''
                  }`}
                  step="0.01"
                  min="0.01"
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3">
              <button
                onClick={handleConvert}
                disabled={isLoading}
                className="flex-1 bg-purple-600 text-white p-3 rounded-lg font-medium hover:bg-purple-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Convertendo...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4" />
                    </svg>
                    Converter
                  </>
                )}
              </button>

              <button
                onClick={swapCurrencies}
                disabled={!fromCurrency || !toCurrency}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Inverter moedas"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>

              <button
                onClick={reset}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                title="Limpar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Coluna da Direita - Resultado */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultado da Conversão</h3>
            
            {result ? (
              <div className="space-y-4">
                {/* Valor Original */}
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-1">Você envia</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatNumber(result.fromAmount)} {result.fromCurrency.symbol}
                  </p>
                  <p className="text-sm text-gray-500">{result.fromCurrency.name}</p>
                </div>

                {/* Seta de Conversão */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>

                {/* Valor Convertido */}
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Você recebe</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatNumber(result.toAmount)} {result.toCurrency.symbol}
                  </p>
                  <p className="text-sm text-gray-500">{result.toCurrency.name}</p>
                </div>

                {/* Taxa de Câmbio */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 mb-1">Taxa de câmbio utilizada</p>
                  <p className="text-lg font-semibold text-blue-800">
                    1 {result.fromCurrency.symbol} = {formatRate(result.rate)} {result.toCurrency.symbol}
                  </p>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-gray-500 text-center">
                  Dados atualizados em: {new Date(result.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <p className="text-gray-500">Preencha os dados e clique em converter</p>
                <p className="text-sm text-gray-400 mt-2">Taxas em tempo real da CoinGecko</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversion;