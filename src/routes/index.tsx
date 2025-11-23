import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { ExpensesTable } from '@/components/ExpensesTable'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { Expense } from '@/model/tables'

export const Route = createFileRoute('/')({
  component: Home,
})

async function fetchExpenses() {
  const { data: expenses, error } = await supabase.from('expenses').select('*')
  return { expenses, error }
}

function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchExpenses().then(({ expenses, error }) => {
      if (error) {
        console.error('Error fetching expenses:', error)
      } else if (expenses) {
        setExpenses(expenses)
      }
    })
  }, [])

  return (
    <>
      <div className="relative">
        <div className="relative flex items-center justify-center">
          <h1>Expenses</h1>
          <Button
            className="absolute top-5 right-4"
            onClick={() => navigate({ to: '/expenses/new' })}
          >
            New Expense
          </Button>
        </div>
      </div>
      <div className="mt-4 p-4">
        <ExpensesTable expenses={expenses} />
      </div>
    </>
  )
}
