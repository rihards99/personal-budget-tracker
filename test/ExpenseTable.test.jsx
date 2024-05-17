import './matchMedia.mock'; // Must be imported before the tested file
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ExpenseTable from '../components/ExpenseTable'

const testExpense = [
  {
    id: '1',
    user_id: '1',
    date: new Date('2023-01-02'),
    category: 'food',
    type: 'expense',
    title: 'Lunch',
    description: 'Lunch with my friend',
    amount: 100,
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    user_id: '1',
    date: new Date('2023-01-02'),
    category: 'housing',
    type: 'expense',
    title: 'Rent',
    description: 'Rent for my apartment',
    amount: 100,
    created_at: '2023-01-02T00:00:00.000Z',
  },
]

describe('ExpenseTable', () => {
  test('renders table content', () => {
    render(<ExpenseTable expenses={testExpense} onDeleteExpense={jest.fn()} />)
    
    expect(screen.getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByText('Rent')).toBeInTheDocument()
  })

  test('triggers delete function on click', () => {
    const onDeleteExpense = jest.fn()

    render(<ExpenseTable expenses={testExpense} onDeleteExpense={onDeleteExpense} />)
    
    expect(screen.getAllByTestId('delete-button').length).toBe(2)

    fireEvent.click(screen.getAllByTestId('delete-button')[0])

    expect(onDeleteExpense).toHaveBeenCalledTimes(1)
  })
})
