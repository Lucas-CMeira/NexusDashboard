import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulateDeposit, type Asset, type DepositRequest } from '../services/assets-service';
import { deposit } from '../services/deposit-service';

export function useDeposit() {
  const navigate = useNavigate();
  
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [observation, setObservation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !selectedAsset || !amount || parseFloat(amount) <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula a API externa
      const request: DepositRequest = {
        userId: selectedUser,
        asset: selectedAsset,
        amount: parseFloat(amount),
        observation: observation || undefined,
        date: new Date().toISOString(),
      };

      const apiResult = simulateDeposit(request);
      
      if (apiResult.success) {
        deposit(parseFloat(amount), selectedUser, selectedAsset, observation || undefined);
        
        alert(apiResult.message);
        
        setSelectedUser('');
        setSelectedAsset(null);
        setAmount('');
        setObservation('');
        
        navigate('/');
      }
    } catch {
      alert('Erro ao processar depósito. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
