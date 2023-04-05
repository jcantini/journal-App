// Creo este componente para el uso de font y MUI. Es un High Order Component que no es más
// que un componente que internamente va a tener componentes hijos. Por ser un HOC recibe
// un children que es mi app. O sea recibe como propiedad un componente.

import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./"

export const AppTheme = ( { children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        { children }
    </ThemeProvider>
  )
}


