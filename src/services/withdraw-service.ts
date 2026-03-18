import { addTransaction } from "./transactions";
import { getUserBalance, updateUserBalance } from "./balance-service";
import type { Asset } from './assets-service';

export function withdraw(amount: number, userId: string, asset?: Asset) {
  if (amount <= 0) {
    throw new Error("Valor inválido");
  }

  const userBalance = getUserBalance(userId);
  const assetCode = asset?.code || 'BRL';

  if (!userBalance) {
    throw new Error("Saldo insuficiente");
  }

  const availableByAsset = userBalance.assetBalances?.[assetCode] ?? 0;

  if (amount > availableByAsset) {
    throw new Error("Saldo insuficiente");
  }

  addTransaction({
    id: crypto.randomUUID(),
    type: "withdraw",
    amount,
    date: new Date().toISOString(),
    userId,
    asset,
  });

  updateUserBalance(userId, amount, 'withdraw', assetCode);

  return { success: true };
}