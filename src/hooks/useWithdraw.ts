import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withdraw } from '../services/withdraw-service';
import { ASSETS, type Asset } from '../services/assets-service';
import { usersMocks } from '../mocks/users-mocks';

export function useWithdraw() {
  const navigate = useNavigate();
  
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser || !selectedAsset || !amount || parseFloat(amount) <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setIsLoading(true);
    
    try {
      // Processa o saque
      withdraw(parseFloat(amount), selectedUser, selectedAsset);
      
      alert(`Saque de ${selectedAsset.icon} ${amount} ${selectedAsset.code} realizado com sucesso!`);
      
      // Resetar formulário
      setSelectedUser('');
      setSelectedAsset(null);
      setAmount('');
      
      // Redirecionar para home
      navigate('/');
    } catch (error: any) {
      alert(error.message || 'Erro ao processar saque. Tente novamente.');
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
    isLoading,
    handleSubmit,
    ASSETS,
    usersMocks,
  };
}
