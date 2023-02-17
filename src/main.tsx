import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/styles.css'

import {CssBaseline, ThemeProvider} from '@mui/material'
import {theme} from './helpers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
