import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { ExpenseInputs } from '@/components/ExpenseInputs'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/expenses/new')({
  component: NewExpense,
})

const initialExpense = {
  name: '',
  months: 12,
  pmt_month: 1,
}

function NewExpense() {
  const [expense, setExpense] = useState(initialExpense)

  return (
    <>
      <h1>New Expense</h1>
      <form className="mx-auto mt-8 max-w-2xl px-4">
        <ExpenseInputs expense={expense} onChange={setExpense} />
        <div className="mt-8 flex justify-around">
          <Button type="submit" className="w-32">
            Create Expense
          </Button>
          <Button
            type="button"
            variant="warning"
            className="w-32"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}
