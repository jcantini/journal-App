
// Me creo mi theme

import { createTheme } from '@mui/material';
import { red } from  '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400 //A400 es la intensidad del color
        }
    }
})

// CreateTheme, tengo un theme por default pero le voy a sobreescribir algunas cosas