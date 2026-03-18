export interface Asset {
  code: string;
  name: string;
  icon: string;
}

export interface DepositRequest {
  userId: string;
  asset: Asset;
  amount: number;
  observation?: string;
  date: string;
}

export const ASSETS: Asset[] = [
  { code: 'BRL', name: 'Real Brasileiro', icon: 'R$' },
  { code: 'BTC', name: 'Bitcoin', icon: '₿' },
  { code: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { code: 'USDT', name: 'Tether', icon: '₮' },
];

export function simulateDeposit(request: DepositRequest): { success: boolean; message: string } {
  console.log('Depósito simulado:', request);
  
  return {
    success: true,
    message: `Depósito de ${request.asset.icon} ${request.amount} ${request.asset.code} realizado com sucesso!`
  };
}
