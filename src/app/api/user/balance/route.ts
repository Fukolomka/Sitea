import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('X-User-ID');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount } = await request.json();
    
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // В реальном приложении здесь была бы интеграция с платежной системой
    // Для демо просто добавляем средства
    
    const result = await prisma.$transaction(async (tx) => {
      // Обновляем баланс пользователя
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } },
      });

      // Создаем запись о транзакции
      const transaction = await tx.transaction.create({
        data: {
          userId,
          type: 'DEPOSIT',
          amount,
          status: 'COMPLETED',
          description: `Пополнение баланса на $${amount}`,
          paymentMethod: 'demo',
        },
      });

      return { user: updatedUser, transaction };
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        balance: result.user.balance,
        transaction: result.transaction
      }
    });
  } catch (error) {
    console.error('Balance update error:', error);
    return NextResponse.json({ error: 'Failed to update balance' }, { status: 500 });
  }
}