import './matchMedia.mock'; // Must be imported before the tested file
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import CreateExpenseModal from '../components/CreateExpenseModal'
import { format } from 'path';

const testInputData = {
  // Stubbed dayJS object
  date: {
    isValid: () => true,
    locale: () => ({
      format: () => 'DD-MM-YYYY',
    }),
    $d: new Date('2023-01-02'),
  },
  category: 'food',
  type: 'expense',
  title: 'Lunch',
  description: 'Lunch with my friend',
  amount: 100,
}

describe('CreateExpenseModal', () => {
  test('renders the create expense button', () => {
    render(<CreateExpenseModal onCreateExpense={jest.fn()} />)

    expect(screen.getByTestId('create-expense-button')).toBeInTheDocument()
  })

  test('renders the create expense modal when the button is clicked', () => {
    render(<CreateExpenseModal onCreateExpense={jest.fn()} />)

    expect(screen.queryByText('Date')).toBeNull()

    fireEvent.click(screen.getByTestId('create-expense-button'))

    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  test('trigger onCreateExpense when submitting the form', async () => {
    const onCreateExpense = jest.fn()
    render(<CreateExpenseModal onCreateExpense={onCreateExpense} values={testInputData} />)

    expect(screen.queryByText('Date')).toBeNull()

    fireEvent.click(screen.getByTestId('create-expense-button'))

    expect(screen.getByText('Date')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(await screen.findByText('Create'))
    })

    expect(onCreateExpense).toHaveBeenCalledTimes(1)
    
  })
})
