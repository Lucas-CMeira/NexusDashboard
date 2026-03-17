interface UserBalance {
  userId: string;
  balance: number;
  totalDeposits: number;
  totalWithdraws: number;
  lastUpdated: string;
}

// Carrega saldos do localStorage ou usa objeto vazio
const loadBalances = (): Record<string, UserBalance> => {
  const stored = localStorage.getItem('userBalances');
  return stored ? JSON.parse(stored) : {};
};

let balances: Record<string, UserBalance> = loadBalances();

// Salva saldos no localStorage
const saveBalances = () => {
  localStorage.setItem('userBalances', JSON.stringify(balances));
};

export function getUserBalance(userId: string): UserBalance | null {
  return balances[userId] || null;
}

export function updateUserBalance(userId: string, amount: number, type: 'deposit' | 'withdraw'): UserBalance {
  const currentBalance = balances[userId] || {
    userId,
    balance: 0,
    totalDeposits: 0,
    totalWithdraws: 0,
    lastUpdated: new Date().toISOString(),
  };

  if (type === 'deposit') {
    currentBalance.balance += amount;
    currentBalance.totalDeposits += amount;
  } else {
    currentBalance.balance -= amount;
    currentBalance.totalWithdraws += amount;
  }

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
