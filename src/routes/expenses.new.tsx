import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses/new')({
  component: NewExpense,
})

function NewExpense() {
  return <h1>New Expense</h1>
}
