import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { ExpensesTable } from '@/components/ExpensesTable'
import type { Expense } from '@/model/tables'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/')({
  component: Home,
})

async function fetchExpenses() {
  const { data: expenses, error } = await supabase.from('expenses').select('*')
  return { expenses, error }
}

function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])

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
    <div className="text-center">
      <h1>Home</h1>
      <div className="mt-4 p-4">
        <ExpensesTable expenses={expenses} />
      </div>
    </div>
  )
}
