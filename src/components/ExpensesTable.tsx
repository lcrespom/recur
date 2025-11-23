import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Expense = {
  id: number
  name: string
  company: string | null
  location: string | null
  phone: string | null
  months: number
  pmt_month: number
  pmt_day: number | null
  cost: number | null
  bank: string | null
}

type ExpensesTableProps = {
  expenses: Expense[]
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Months</TableHead>
            <TableHead className="text-right">Payment Month</TableHead>
            <TableHead className="text-right">Payment Day</TableHead>
            <TableHead className="text-right">Cost</TableHead>
            <TableHead>Bank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground">
                No expenses found.
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>{expense.company ?? '-'}</TableCell>
                <TableCell>{expense.location ?? '-'}</TableCell>
                <TableCell>{expense.phone ?? '-'}</TableCell>
                <TableCell className="text-right">{expense.months}</TableCell>
                <TableCell className="text-right">{expense.pmt_month}</TableCell>
                <TableCell className="text-right">{expense.pmt_day ?? '-'}</TableCell>
                <TableCell className="text-right">{formatCurrency(expense.cost)}</TableCell>
                <TableCell>{expense.bank ?? '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
