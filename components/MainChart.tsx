'use client';

import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Switch } from 'antd';
import { Expense, ExpenseCategory, CATEGORY_BORDER_COLORS, CATEGORY_COLORS, ExpenseType } from '@/types';

import styles from './MainChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MainChart({expenses}: {expenses: Expense[]}) {

  const [selectedType, setSelectedType] = useState<ExpenseType | null>(ExpenseType.expense);

  const onChange = (checked: Boolean) => {
    setSelectedType(checked ? ExpenseType.income : ExpenseType.expense);
  };

  const expenseData = expenses.filter((expense) => selectedType === null || expense.type === selectedType).reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const data = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expenseData),
        backgroundColor: Object.keys(expenseData).map((category) => CATEGORY_COLORS[category as ExpenseCategory]),
        borderColor: Object.keys(expenseData).map((category) => CATEGORY_BORDER_COLORS[category as ExpenseCategory]),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={styles.chartContainer}>

      <div className={styles.switchContainer}>
        <span>Expense</span>
        <Switch onChange={onChange} />
        <span>Income</span>
      </div>

      <div className={styles.chart}>
        <Pie data={data} />
      </div>
    </div>
  );
};