import React from "react"
import "./input.css"
import FormControl from "@mui/material/FormControl/FormControl"
import TextField from "@mui/material/TextField/TextField"
import { FieldErrors } from "react-hook-form/dist/types/errors"

export interface InputProps {
  /**
   * ¿Es un campo primario?
   */
  primary?: boolean
  /**
   * Color de fondo
   */
  backgroundColor?: string
  /**
   * Tamaño
   */
  size?: "small" | "medium"
  /**
   * Etiqueta
   */
  label: string
  /**
   * Funcion de registro de la libreria de formulario
   */
  register?: any
  /**
   * Nombre del campo
   */
  name: string
  /**
   * Manejador de errores de la libreria de formulario
   */
  errors?: any
  /**
   * Tipo de campo
   */
  type: string
  /**
   * Objeto de propiedades adicionales
   */
  inputProps?: {}
  /**
   * Indica si el campo sera deshabilitado
   */
  disabled: boolean
  /**
   * Indica si el campo manejara Step
   */
  step?: {}
  /**
   * Indica si el campo sera Focus
   */
  focused?: boolean
  /**
   * Indica si el Campo es Obligatorio
   */
  required: boolean
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  register,
  name,
  errors,
  type,
  inputProps,
  disabled,
  step,
  focused,
  required,
  ...props
}: InputProps) => {
  return (
    <FormControl
      fullWidth
      className={`storybook-button--${size}`}
    >
      <TextField
        {...(inputProps && { inputProps: inputProps })}
        {...(required && { required: true })}
        {...(step && { step: step })}
        // {...register(name)}
        disabled={disabled}
        error={errors && !!errors[name]}
        focused={focused}
        id={name}
        label={label}
        margin="dense"
        size={size}
        type={type}
        role={"textbox"}
        variant="outlined"
        {...props}
      />
      {errors && formValidation(errors, name)}
    </FormControl>
  )
}

const formValidation = (errors: FieldErrors, errorKey: string) => {
  return (
    errors[errorKey] && (
      <span className="storybook-input-error">
        <>{errors[errorKey]?.message}</>
      </span>
    )
  )
}
