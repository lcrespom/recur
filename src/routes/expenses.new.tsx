import { ExpenseInputs } from '@/components/ExpenseInputs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses/new')({
  component: NewExpense,
})

const expense = {
  name: '',
  months: 12,
  pmt_month: 1,
}

function NewExpense() {
  return (
    <>
      <h1>New Expense</h1>
      <form className="mx-auto mt-8 max-w-2xl px-4">
        <ExpenseInputs expense={expense} onChange={() => {}} />
      </form>
    </>
  )
}
