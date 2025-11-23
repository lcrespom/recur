import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Expense } from '@/model/tables'

type ExpensesTableProps = {
  expenses: Expense[]
}

function formatCurrency(amount: number | null): string {
  if (amount === null) return '-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // Remove hardcoded locale and above options if needed
    // minimumFractionDigits: 2,
    // maximumFractionDigits: 2,
  }).format(amount)
}

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Name</TableHead>
            <TableHead className="text-center font-bold">Company</TableHead>
            <TableHead className="text-center font-bold">Location</TableHead>
            <TableHead className="text-center font-bold">Phone</TableHead>
            <TableHead className="text-right font-bold">Months</TableHead>
            <TableHead className="text-right font-bold">Pmt Month</TableHead>
            <TableHead className="text-right font-bold">Pmt Day</TableHead>
            <TableHead className="text-right font-bold">Cost</TableHead>
            <TableHead className="text-center font-bold">Bank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-muted-foreground text-center">
                No expenses found.
              </TableCell>
            </TableRow>
          ) : (
            expenses.map(expense => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>{expense.company ?? '-'}</TableCell>
                <TableCell>{expense.location ?? '-'}</TableCell>
                <TableCell>{expense.phone ?? '-'}</TableCell>
                <TableCell className="text-right">{expense.months}</TableCell>
                <TableCell className="text-right">{expense.pmt_month}</TableCell>
                <TableCell className="text-right">{expense.pmt_day ?? '-'}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(expense.cost)}
                </TableCell>
                <TableCell>{expense.bank ?? '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
