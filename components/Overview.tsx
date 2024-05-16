'use client'

import { Expense, ExpenseType } from "@/types";
import { Descriptions } from "antd";

const items = [
  {
    key: '1',
    label: 'UserName',
    children: <span>Zhou Maomao</span>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <span>1810000000</span>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];



export default function Overview({expenses}: {expenses: any}) {

  const totalExpenses = expenses
    .filter((expense: Expense) => expense.type === ExpenseType.expense)
    .reduce((acc: number, expense: Expense) => acc + expense.amount, 0)

    const totalIncome = expenses
    .filter((expense: Expense) => expense.type === ExpenseType.income)
    .reduce((acc: number, expense: Expense) => acc + expense.amount, 0)

  const items = [
    {
      key: '1',
      label: 'Total Expenses',
      children: <span>{totalExpenses}</span>,
    },
    {
      key: '2',
      label: 'Total Income',
      children: <span>{totalIncome}</span>,
    }
  ]

  return (
    <Descriptions title="User Info" items={items}/>
  );
}