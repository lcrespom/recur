import type { ExpenseInsert } from '@/model/tables'
import { FormGroup } from '@/components/FormGroup'

type ExpenseInputsProps = {
  expense: Omit<ExpenseInsert, 'id' | 'user_id'>
  onChange: (expense: Omit<ExpenseInsert, 'id' | 'user_id'>) => void
}

export function ExpenseInputs({ expense, onChange }: ExpenseInputsProps) {
  const handleChange = (field: keyof typeof expense, value: string | number | null) => {
    onChange({ ...expense, [field]: value })
  }

  return (
    <div className="grid gap-4">
      <FormGroup
        id="name"
        label="Expense Name / Category"
        type="text"
        value={expense.name}
        onChange={value => handleChange('name', value)}
        required
      />

      <FormGroup
        id="company"
        label="Company"
        type="text"
        value={expense.company ?? ''}
        onChange={value => handleChange('company', value || null)}
      />

      <FormGroup
        id="phone"
        label="Company Contact Phone"
        type="tel"
        value={expense.phone ?? ''}
        onChange={value => handleChange('phone', value || null)}
      />

      <FormGroup
        id="location"
        label="Location"
        type="text"
        value={expense.location ?? ''}
        onChange={value => handleChange('location', value || null)}
      />

      <FormGroup
        id="months"
        label="Payment recurrence in months (12 = yearly)"
        type="number"
        value={expense.months}
        onChange={value => handleChange('months', value ?? 1)}
        min={1}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormGroup
          id="pmt_month"
          label="Payment Month"
          type="number"
          value={expense.pmt_month}
          onChange={value => handleChange('pmt_month', value ?? 1)}
          min={1}
          max={12}
          required
        />

        <FormGroup
          id="pmt_day"
          label="Payment Day"
          type="number"
          value={expense.pmt_day ?? ''}
          onChange={value => handleChange('pmt_day', value)}
          min={1}
          max={31}
        />
      </div>

      <FormGroup
        id="cost"
        label="Cost"
        type="number"
        value={expense.cost ?? ''}
        onChange={value => handleChange('cost', value)}
        min={0}
        step="0.01"
      />

      <FormGroup
        id="bank"
        label="Debit Bank or Card"
        type="text"
        value={expense.bank ?? ''}
        onChange={value => handleChange('bank', value || null)}
      />

      <FormGroup
        id="comments"
        label="Comments"
        type="textarea"
        value={expense.comments ?? ''}
        onChange={value => handleChange('comments', value || null)}
        rows={3}
      />
    </div>
  )
}
