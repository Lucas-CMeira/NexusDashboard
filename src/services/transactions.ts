import type { Asset } from './assets-service';

type Transaction = {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
  userId?: string;
  asset?: Asset; 
  observation?: string; 
};

const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  return stored ? JSON.parse(stored) : [];
};

let transactions: Transaction[] = loadTransactions();

const saveTransactions = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

export function addTransaction(transaction: Transaction) {
  transactions.push(transaction);
  saveTransactions();
}

export function getTransactions(userId?: string): Transaction[] {
  if (userId) {
    return transactions.filter(t => t.userId === userId);
  }
  return transactions;
}

export function getUserTransactions(userId: string): Transaction[] {
  return getTransactions(userId);
}

export function clearTransactions() {
  transactions = [];
  saveTransactions();
}