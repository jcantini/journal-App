/* 
Creo este componente para el uso de un determinado font y Material UI que debe envolver a mi app. 
A este componente lo transformo en un High Order Component al recibir a un children. 
HOC (High Order Component) no es más que un componente que internamente va a tener componentes hijos. 
Recibe un children que es mi app. Es decir que recibe como propiedad un componente. 
*/

import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./"

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
        {/* CssBaseline sirve para que todos los navegadores rendericen la app de una forma parecida. */}
        <CssBaseline/>
        { children }
    </ThemeProvider>
  )
}

/*
  purpleThem es el theme que va a proveer ThemeProvider
*/


