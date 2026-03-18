interface UserBalance {
  userId: string;
  balance: number; // saldo BRL (legacy/compatibilidade)
  totalDeposits: number; // total depositado BRL
  totalWithdraws: number; // total sacado BRL
  assetBalances: Record<string, number>;
  lastUpdated: string;
}

const loadBalances = (): Record<string, UserBalance> => {
  const stored = localStorage.getItem('userBalances');
  return stored ? JSON.parse(stored) : {};
};

let balances: Record<string, UserBalance> = loadBalances();

const saveBalances = () => {
  localStorage.setItem('userBalances', JSON.stringify(balances));
};

export function getUserBalance(userId: string): UserBalance | null {
  return balances[userId] || null;
}

export function updateUserBalance(
  userId: string,
  amount: number,
  type: 'deposit' | 'withdraw',
  assetCode: string = 'BRL',
): UserBalance {
  const currentBalance = balances[userId] || {
    userId,
    balance: 0,
    totalDeposits: 0,
    totalWithdraws: 0,
    assetBalances: {
      BRL: 0,
      BTC: 0,
      ETH: 0,
      USDT: 0,
    },
    lastUpdated: new Date().toISOString(),
  };

  // Atualiza saldo BRL legado apenas para BRL
  if (assetCode === 'BRL') {
    if (type === 'deposit') {
      currentBalance.balance += amount;
      currentBalance.totalDeposits += amount;
    } else {
      currentBalance.balance -= amount;
      currentBalance.totalWithdraws += amount;
    }
  }

  // Atualiza saldo por ativo, sem mistura entre eles
  if (!currentBalance.assetBalances) {
    currentBalance.assetBalances = {
      BRL: 0,
      BTC: 0,
      ETH: 0,
      USDT: 0,
    };
  }

  const currentAssetValue = currentBalance.assetBalances[assetCode] || 0;
  currentBalance.assetBalances[assetCode] =
    type === 'deposit' ? currentAssetValue + amount : currentAssetValue - amount;

  currentBalance.lastUpdated = new Date().toISOString();

  balances[userId] = currentBalance;
  saveBalances();

  return currentBalance;
}

export function initializeUserBalance(userId: string): UserBalance {
  if (!balances[userId]) {
    balances[userId] = {
      userId,
      balance: 0,
      totalDeposits: 0,
      totalWithdraws: 0,
      assetBalances: {
        BRL: 0,
        BTC: 0,
        ETH: 0,
        USDT: 0,
      },
      lastUpdated: new Date().toISOString(),
    };
    saveBalances();
  }
  return balances[userId];
}

export function clearUserBalance(userId: string) {
  delete balances[userId];
  saveBalances();
}
