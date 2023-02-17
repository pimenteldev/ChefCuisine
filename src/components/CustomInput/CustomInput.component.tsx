import {FormControl, TextField} from '@mui/material'
import {FieldErrors} from 'react-hook-form'
import {InputError} from './styled-components'

const formValidation = (errors: FieldErrors, errorKey: string) => {
  return errors[errorKey] ? (
    <InputError className="error-message">
      <>{errors[errorKey]?.message}</>
    </InputError>
  ) : (
    ''
  )
}

interface InputProps {
  register: any
  name: string
  errors: any
  label: string
  type: string
  inputProps: {}
  disabled: boolean
  trigger?: () => void
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
  trigger,
  step,
  focused,
  required,
}: InputProps) => {
  return (
    <FormControl fullWidth>
      <TextField
        {...(required && {required: true})}
        disabled={disabled}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        label={label}
        size="small"
        margin="dense"
        variant="outlined"
        focused={focused}
        {...(step && {step: step})}
        {...register(name)}
        {...(inputProps && {inputProps: inputProps})}
        onChange={() => trigger && trigger()}
        sx={{
          backgroundColor: 'primary.contrastText',
        }}
      />
      {errors && formValidation(errors, name)}
    </FormControl>
  )
}

export default CustomInput
