import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormInputProps = {
  id: string
  label: string
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: (value: string) => void
  required?: boolean
  autoComplete?: string
}

export function LabelInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  autoComplete,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <ShadcnInput
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  )
}
