'use client'

import { useEffect, useState } from 'react';
import { Form, Button, Modal, Input, InputNumber, Select, DatePicker } from 'antd';
// need to import this specifically because NextJS can't resolve the subcomponents
import TextArea from 'antd/lib/input/TextArea';
import { Expense, ExpenseCategory, ExpenseType } from '@/types';

import style from './CreateExpenseModal.module.css';

const DateFormItem = () => (
  <Form.Item<Expense>
    label="Date"
    name="date"
    rules={[{ required: true, message: 'Please input the date of the expense!' }]}
  >
    <DatePicker format="DD/MM/YYYY" data-testid="date-picker"/>
  </Form.Item>
)

const TypeFormItem = () => (
  <Form.Item<Expense>
    label="Type"
    name="type"
    rules={[{ required: true, message: 'Please input the type of the expense!' }]}
  >
    <Select>
      {Object.values(ExpenseType).map((type: ExpenseType) => (
        <Select.Option value={type} key={type}>{type.toUpperCase()}</Select.Option>
      ))}
    </Select>
  </Form.Item>
)

const CategoryFormItem = () => (
  <Form.Item<Expense>
    label="Category"
    name="category"
    rules={[{ required: true, message: 'Please input the category of the expense!' }]}
  >
    <Select>
      {Object.values(ExpenseCategory).map((category: ExpenseCategory) => (
        <Select.Option value={category} key={category}>{category.toUpperCase()}</Select.Option>
      ))}
    </Select>
  </Form.Item>
)

const TitleFormItem = () => (
  <Form.Item<Expense>
    label="Title"
    name="title"
    rules={[{ required: true, message: 'Please input the title of the expense!' }]}
  >
    <Input />
  </Form.Item>
)

const DescriptionFormItem = () => (
  <Form.Item<Expense>
    label="Description"
    name="description"
  >
    <TextArea rows={4} />
  </Form.Item>
)

const AmountFormItem = () => (
  <Form.Item<Expense>
    label="Amount"
    name="amount"
    rules={[{ required: true, message: 'Please input the amount of the expense!' }]}
  >
    <InputNumber min={1}/>
  </Form.Item>
)

type CreateExpenseModalProps = {
  onCreateExpense: (values: Expense) => void;
  values?: Expense; // for testing
}

export default function CreateExpenseModal({onCreateExpense, values}: CreateExpenseModalProps) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      // form.setFieldsValue({ user: "antd" });
      form.setFieldsValue(values);
    }
  }, [open, form, values]);

  return (
    <>
      <Button
        className={style.addButton}
        type='primary'
        onClick={() => setOpen(true)}
        data-testid="create-expense-button"
      >
        ADD ENTRY
      </Button>
      <Modal
        title="Create a new entry"
        okText="Create"
        cancelText="Cancel"
        open={open}
        okButtonProps={{ autoFocus: true }}
        onOk={async () => {
          try {
            const values = await form?.validateFields();
            form?.resetFields();
            values.date = values.date.$d.toDateString();
            onCreateExpense(values);
            setOpen(false);
          } catch (error) {
            console.log('Failed:', error);
          }
        }}
        onCancel={() => setOpen(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          layout="horizontal"
        >
          <DateFormItem/>
          <TypeFormItem/>
          <CategoryFormItem/>
          <AmountFormItem/>
          <TitleFormItem/>
          <DescriptionFormItem/>
        </Form>
      </Modal>
    </>
  );
}