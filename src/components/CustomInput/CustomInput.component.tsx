import {FormControl, TextField} from '@mui/material'
import {FieldErrors} from 'react-hook-form'
import {InputError} from './styled-components'

interface InputProps {
  register: any
  name: string
  errors: any
  label: string
  type: string
  inputProps?: any
  disabled: boolean
  step?: {}
  focused?: boolean
  required: boolean
}

export const CustomInput = ({
  register,
  name,
  errors,
  label = '',
  type,
  inputProps,
  disabled = false,
  step,
  focused,
  required,
}: InputProps) => {
  const formValidation = (errors: FieldErrors, errorKey: string) => {
    return (
      errors[errorKey] && (
        <InputError className="error-message">
          <>{errors[errorKey]?.message}</>
        </InputError>
      )
    )
  }

  return (
    <FormControl fullWidth>
      <TextField
        {...(inputProps && {inputProps: inputProps})}
        {...(required && {required: true})}
        {...(step && {step: step})}
        {...register(name)}
        disabled={disabled}
        error={errors && !!errors[name]}
        focused={focused}
        id={name}
        label={label}
        margin="dense"
        size="small"
        type={type}
        role={'textbox'}
        variant="outlined"
      />
      {errors && formValidation(errors, name)}
    </FormControl>
  )
}

export default CustomInput
