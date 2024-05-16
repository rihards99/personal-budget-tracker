'use client'

import { useState } from 'react';
import { QueryResultRow } from '@vercel/postgres';
import { Expense } from '@/types';
import MainChart from './MainChart';
import ExpenseTable from './ExpenseTable';
import CreateExpenseModal from './CreateExpenseModal';
import Overview from './Overview';

type ClientsideDashboardProps = {
  expenseRows?: QueryResultRow[];
}

export default function ClientsideDashboard({expenseRows}: ClientsideDashboardProps) {
  const [expenses, setExpenses] = useState<Expense[]>((expenseRows || []) as Expense[]);

  const onCreateExpense = async (expense: Expense) => {
    try {
      // NextJS is doing some funky fetch override, so we need to use
      // a file path instead of a relative path for some reason
      const response = await fetch(`${window.location.origin}/api/expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
  
      const newExpenses = (await response.json()).map((expense: Expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));
  
      if (!newExpenses) throw new Error("Error creating expense");

      setExpenses([...newExpenses]);
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  }

  const onDeleteExpense = async (expense: Expense) => {
    try {
      const response = await fetch(`${window.location.origin}/api/expense/?id=${expense.id}`, {
        method: 'DELETE',
      });

      const newExpenses = (await response.json()).map((expense: Expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));

      if (!newExpenses) throw new Error("Error deleting expense");

      setExpenses(newExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  }
  
  return (
    <>
      <MainChart expenses={expenses}/>
      <Overview expenses={expenses}/>
      <CreateExpenseModal onCreateExpense={onCreateExpense}/>
      <p>Use the column filters to select a type or category or to specify a date range</p>
      <ExpenseTable expenses={expenses} onDeleteExpense={onDeleteExpense}/>
    </>
  );
}