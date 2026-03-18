import { addTransaction } from "./transactions";
import { updateUserBalance } from "./balance-service";
import type { Asset } from './assets-service';

export function deposit(amount: number, userId: string, asset?: Asset, observation?: string) {
  if (amount <= 0) {
    throw new Error("Valor inválido");
  }

  addTransaction({
    id: crypto.randomUUID(),
    type: "deposit",
    amount,
    date: new Date().toISOString(),
    userId,
    asset,
    observation,
  });

  updateUserBalance(userId, amount, 'deposit', asset?.code || 'BRL');

  return { success: true };
}