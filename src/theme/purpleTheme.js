
// CreateTheme, es la función para crear un theme. MUI ya tiene un theme por default pero yo le voy a 
// sobreescribir las propiedades que quiero modificar. En este caso el color primario, el secundario
// son colores púrpura y el color para los errores. Este themes se lo voy a pasar a ThemeProvider.jsx 
// Los valode del theme default de MUI los puedo ver en la página de MUI
// 

import { createTheme } from '@mui/material';
import { red, purple } from  '@mui/material/colors'; // color red de MUI

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main:  '#1e88e5' 
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400 //A400 es la intensidad del color
        }
    }
})

