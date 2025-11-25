import { Input as ShadcnInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRef, useState } from 'react'

type BaseProps = {
  id: string
  label: string
  required?: boolean
}

type TextInputProps = BaseProps & {
  type?: 'text' | 'email' | 'password' | 'tel'
  value: string
  onChange: (value: string) => void
  autoComplete?: string
}

type NumberInputProps = BaseProps & {
  type: 'number'
  value: number | string
  onChange: (value: number | null) => void
  min?: number
  max?: number
  step?: string
}

type TextareaProps = BaseProps & {
  type: 'textarea'
  value: string
  onChange: (value: string) => void
  rows?: number
}

type FormGroupProps = TextInputProps | NumberInputProps | TextareaProps

export function FormGroup(props: FormGroupProps) {
  const { id, label, required = false } = props
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [error, setError] = useState<string>('')

  const handleValidation = () => {
    if (inputRef.current) {
      setError(inputRef.current.validationMessage)
    }
  }

  const labelElement = (
    <Label htmlFor={id}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </Label>
  )

  if (props.type === 'textarea') {
    return (
      <div className="grid gap-2">
        {labelElement}
        <Textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={id}
          value={props.value}
          onChange={e => {
            props.onChange(e.target.value)
            handleValidation()
          }}
          onBlur={handleValidation}
          required={required}
          rows={props.rows}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  if (props.type === 'number') {
    return (
      <div className="grid gap-2">
        {labelElement}
        <ShadcnInput
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id}
          type="number"
          value={props.value}
          onChange={e => {
            const value = e.target.value
            props.onChange(value ? parseFloat(value) : null)
            handleValidation()
          }}
          onBlur={handleValidation}
          required={required}
          min={props.min}
          max={props.max}
          step={props.step}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }

  return (
    <div className="grid gap-2">
      {labelElement}
      <ShadcnInput
        ref={inputRef as React.RefObject<HTMLInputElement>}
        id={id}
        type={props.type || 'text'}
        value={props.value}
        onChange={e => {
          props.onChange(e.target.value)
          handleValidation()
        }}
        onBlur={handleValidation}
        required={required}
        autoComplete={props.autoComplete}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
