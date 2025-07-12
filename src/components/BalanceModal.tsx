'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, CreditCard } from 'lucide-react';

interface BalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onBalanceUpdate: (newBalance: number) => void;
}

export function BalanceModal({ isOpen, onClose, currentBalance, onBalanceUpdate }: BalanceModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100, 250];

  if (!isOpen) return null;

  const handleAddFunds = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount <= 0) {
      alert('Пожалуйста, выберите сумму для пополнения');
      return;
    }

    if (amount < 5) {
      alert('Минимальная сумма пополнения: $5');
      return;
    }

    if (amount > 1000) {
      alert('Максимальная сумма пополнения: $1000');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/user/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.success) {
        onBalanceUpdate(data.data.balance);
        alert(`Баланс пополнен на $${amount}!`);
        onClose();
      } else {
        alert(data.error || 'Ошибка при пополнении баланса');
      }
    } catch (error) {
      console.error('Balance update error:', error);
      alert('Ошибка при пополнении баланса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Пополнить баланс
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Текущий баланс:</p>
            <p className="text-2xl font-bold text-green-600">
              ${currentBalance.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Выберите сумму:</p>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className="h-12"
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Или введите свою сумму:</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                placeholder="0.00"
                min="5"
                max="1000"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Минимум: $5, Максимум: $1000
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleAddFunds}
              disabled={loading || (!selectedAmount && !customAmount)}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Обработка...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Пополнить на ${selectedAmount || customAmount || 0}
                </div>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              * Это демо-версия. В реальном приложении здесь будет интеграция с платежными системами.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}