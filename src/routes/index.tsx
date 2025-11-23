import { createFileRoute } from '@tanstack/react-router'

import { ExpensesTable } from '@/components/ExpensesTable'
import type { Expenses } from '@/model/tables'

export const Route = createFileRoute('/')({
  component: Home,
})

const expenses: Expenses[] = [
  {
    id: 1,
    name: 'Internet Service',
    company: 'Comcast',
    location: 'Online',
    phone: '555-1234',
    months: 12,
    pmt_month: 1,
    pmt_day: 15,
    cost: 79.99,
    bank: 'Chase',
    created_at: '',
    comments: null,
    user_id: 'user_1',
  },
]

function Home() {
  return (
    <div className="text-center">
      <h1>Home</h1>
      <div className="mt-4 p-4">
        <ExpensesTable expenses={expenses} />
      </div>
    </div>
  )
}
