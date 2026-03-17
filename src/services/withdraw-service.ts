import { addTransaction } from "./transactions";
import { getUserBalance, updateUserBalance } from "./balance-service";
import type { Asset } from './assets-service';

export function withdraw(amount: number, userId: string, asset?: Asset) {
  if (amount <= 0) {
    throw new Error("Valor inválido");
  }

  const userBalance = getUserBalance(userId);
  
  if (!userBalance || amount > userBalance.balance) {
    throw new Error("Saldo insuficiente");
  }

  addTransaction({
    id: crypto.randomUUID(),
    type: "withdraw",
    amount,
    date: new Date().toISOString(),
    userId,
    asset, // Inclui o ativo na transação
  });

  updateUserBalance(userId, amount, 'withdraw');

  return { success: true };
}