'use client'

import { Expense, ExpenseCategory, CATEGORY_COLORS, ExpenseType } from '@/types';
import { Table, Tag, Button, DatePicker } from 'antd';
import type { TableProps } from 'antd';

import style from './ExpensesTable.module.css';
import { useState } from 'react';

type ExpenseTableProps = {
  expenses: Expense[];
  onDeleteExpense: (expense: Expense) => void;
}

export default function ExpenseTable({expenses, onDeleteExpense}: ExpenseTableProps) {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const onDeleteClick = (expense: Expense) => {
    onDeleteExpense(expense);
  }
  
  const columns: TableProps<Expense>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => {
        return (
          <div style={{ maxWidth: '170px' }}>
            {description}
          </div>
        )
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div className={style.dateFilter}>
          <div>
            <span>From: </span>
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(date) => {
                setFromDate(date ? date.toDate() : null);
                setSelectedKeys([2, 1]); // just to trigger the filtering
                confirm({closeDropdown: false});
              }}
              
            />
          </div>
          
          <div>
            <span> To: </span>
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(date) => {
                setToDate(date ? date.toDate() : null);
                setSelectedKeys([1, 2]); // just to trigger the filtering
                confirm({closeDropdown: false});
              }}
            /> 
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        console.log(value)

        const fromDateMatch = fromDate ? new Date(record.date) >= fromDate : true; 
        const toDateMatch = toDate ? new Date(record.date) <= toDate : true;

        return fromDateMatch && toDateMatch;
      },
      render: (date: Date) => {
        return (
          <span>
            {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}
          </span>
        )
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: Object.values(ExpenseType).map((type) => ({
        text: type.toUpperCase(),
        value: type,
      })),
      onFilter: (value, record) => record.type === value,
      render: (type: ExpenseType) => {
        return (
          <Tag color={type === ExpenseType.expense ? 'red' : 'green'}>
            {type?.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: Object.values(ExpenseCategory).map((category) => ({
        text: category.toUpperCase(),
        value: category,
      })),
      onFilter: (value, record) => record.category === value,
      render: (category: ExpenseCategory) => {
        return (
          <Tag color={CATEGORY_COLORS[category]}>
            {category?.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button data-testid="delete-button" danger onClick={() => onDeleteClick(record)}>Delete</Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={expenses}
      rowKey={(expense) => expense.id}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  )
};
