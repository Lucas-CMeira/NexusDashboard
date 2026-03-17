import { useEffect, useState, useContext } from "react";
import { getUserTransactions } from "../../services/transactions";
import { getUserBalance } from "../../services/balance-service";
import { UserContext } from "../../context/user-context";

function Home() {
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userBalance, setUserBalance] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setTransactions(getUserTransactions(user.email));
      setUserBalance(getUserBalance(user.email));
    }
  }, [user]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const totalDeposit = transactions
    .filter((t) => t.type === "deposit")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalWithdraw = transactions
    .filter((t) => t.type === "withdraw")
    .reduce((acc, t) => acc + t.amount, 0);

  const volume = totalDeposit + totalWithdraw;
  const currentBalance = userBalance?.balance || 0;

  const stats = [
    { title: "Saldo Atual", value: `R$ ${currentBalance}` },
    { title: "Total Depositado", value: `R$ ${totalDeposit}` },
    { title: "Total Sacado", value: `R$ ${totalWithdraw}` },
    { title: "Volume Total", value: `R$ ${volume}` },
  ];

  const getTransactionLabel = (type: string) => {
    return type === "deposit" ? "Depósito" : "Saque";
  };

  const getTransactionColor = (type: string) => {
    return type === "deposit" ? "text-green-600" : "text-red-600";
  };

  const formatTransactionAmount = (transaction: any) => {
    if (transaction.asset) {
      // Se tem ativo, mostra: 20 Bitcoins, 0.5 Ethereum, etc.
      return `${transaction.amount} ${transaction.asset.name}`;
    } else {
      // Se não tem ativo (transações antigas), mostra formato padrão
      return `R$ ${transaction.amount}`;
    }
  };

  const formatTransactionValue = (transaction: any) => {
    if (transaction.asset) {
      // Mostra o símbolo do ativo + valor
      return `${transaction.asset.icon} ${transaction.amount}`;
    } else {
      // Formato padrão para BRL
      return `R$ ${transaction.amount}`;
    }
  };

  const lastTransactions = [...transactions].slice(-5).reverse();

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Nexus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-gray-500 text-sm mb-2">{stat.title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Últimas movimentações</h2>

        {lastTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhuma movimentação encontrada</p>
        ) : (
          lastTransactions.map((t) => (
            <div key={t.id} className="flex justify-between items-center border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${t.type === "deposit" ? "bg-green-500" : "bg-red-500"}`}></div>
                <div className="flex flex-col">
                  <span className={`font-medium ${getTransactionColor(t.type)}`}>
                    {getTransactionLabel(t.type)}
                  </span>
                  {t.asset && (
                    <span className="text-xs text-gray-500">
                      {formatTransactionAmount(t)}
                    </span>
                  )}
                  {t.observation && (
                    <span className="text-xs text-blue-600 italic mt-1">
                      "{t.observation}"
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                  {new Date(t.date).toLocaleDateString('pt-BR')}
                </span>
                <span className={`font-bold ${getTransactionColor(t.type)}`}>
                  {t.type === "deposit" ? "+" : "-"}{formatTransactionValue(t)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
