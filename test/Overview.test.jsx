import './matchMedia.mock'; // Must be imported before the tested file
import '@testing-library/jest-dom'
import { render, rerender, screen, fireEvent } from '@testing-library/react'
import Overview from '../components/Overview'

const testExpense = [
  {
    id: '1',
    user_id: '1',
    date: new Date('2023-01-02'),
    category: 'food',
    type: 'expense',
    title: 'Lunch',
    description: 'Lunch with my friend',
    amount: 333,
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
    amount: 333,
    created_at: '2023-01-02T00:00:00.000Z',
  },
  {
    id: '2',
    user_id: '1',
    date: new Date('2023-01-02'),
    category: 'housing',
    type: 'income',
    title: 'Rent',
    description: 'Rent from other apartment',
    amount: 444,
    created_at: '2023-01-02T00:00:00.000Z',
  },
]

describe('Overview', () => {
  test('renders proper total amounts', () => {
    render(<Overview expenses={testExpense}/>)
    
    expect(screen.getByText('666')).toBeInTheDocument()
    expect(screen.queryByText('333')).toBeNull()
    expect(screen.getByText('444')).toBeInTheDocument()
  })
})
