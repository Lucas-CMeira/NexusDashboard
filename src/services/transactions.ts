import type { Asset } from './assets-service';

type Transaction = {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  date: string;
  userId?: string;
  asset?: Asset; // Novo campo para o ativo
  observation?: string; // Campo para observação do usuário
};

// Carrega transações do localStorage ou usa array vazio
const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  return stored ? JSON.parse(stored) : [];
};

let transactions: Transaction[] = loadTransactions();

// Salva transações no localStorage
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