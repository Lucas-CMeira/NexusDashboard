import { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { useDeposit } from "../../hooks/useDeposit";
import { ASSETS } from "../../services/assets-service";
import { usersMocks } from "../../mocks/users-mocks";

function Deposit() {
  const { user } = useContext(UserContext);
  const {
    selectedUser,
    setSelectedUser,
    selectedAsset,
    setSelectedAsset,
    amount,
    setAmount,
    observation,
    setObservation,
    isLoading,
    handleSubmit,
  } = useDeposit();

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Simular Depósito
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selecionar Usuário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionar Usuário <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Escolha um usuário</option>
              {usersMocks.map((userMock) => (
                <option key={userMock.email} value={userMock.email}>
                  {userMock.name} ({userMock.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionar Ativo <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ASSETS.map((asset) => (
                <button
                  key={asset.code}
                  type="button"
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedAsset?.code === asset.code
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className="text-lg font-bold">{asset.icon}</div>
                  <div className="text-xs font-medium">{asset.code}</div>
                  <div className="text-xs text-gray-500">{asset.name}</div>
                </button>
              ))}
            </div>
            {selectedAsset && (
              <p className="mt-2 text-sm text-green-600">
                Ativo selecionado: {selectedAsset.icon} {selectedAsset.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informar Valor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {selectedAsset && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  {selectedAsset.icon}
                </div>
              )}
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  selectedAsset ? "pl-8" : ""
                }`}
                step="0.01"
                min="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observação <span className="text-gray-400">(opcional)</span>
            </label>
            <textarea
              placeholder="Adicione uma observação sobre este depósito..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white p-4 rounded-lg font-medium hover:bg-green-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processando...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Simular Depósito
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;
