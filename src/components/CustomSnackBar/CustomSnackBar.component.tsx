import {SubjectManager} from '@/models'
import {Alert, AlertColor, Snackbar} from '@mui/material'
import {useEffect, useState} from 'react'
import {Subscription} from 'rxjs'

interface AlertProps {
  open: boolean
  message: string
  severity: AlertColor
}

export const snackbarOpenSubject$ = new SubjectManager<AlertProps>()
export const snackbarCloseSubject$ = new SubjectManager<AlertProps>()

const CustomSnackBar = () => {
  const [state, setState] = useState<AlertProps>({
    open: false,
    message: '',
    severity: 'error',
  })

  let openSubject$ = new Subscription()
  let closeSubject$ = new Subscription()

  useEffect(() => {
    openSubject$ = snackbarOpenSubject$.getSubject.subscribe((obj) => handleClickOpen(obj))
    closeSubject$ = snackbarCloseSubject$.getSubject.subscribe(() => handleClose())
  }, [])

  const handleClickOpen = ({open, message, severity}: AlertProps) => {
    console.log(message, severity)
    setState({open, message, severity})
  }

  const handleClose = () => {
    setState({...state, open: false})
  }

  const handleExit = () => {
    snackbarCloseSubject$.setSubject = {
      open: false,
      message: '',
      severity: 'error',
    }
  }

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      sx={{minWidth: '50vw'}}
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant="filled"
        sx={{width: '100%', color: 'white'}}
      >
        {state.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar
