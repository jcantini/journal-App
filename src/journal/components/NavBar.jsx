import { LoginOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth";



export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    }

  return (
    <AppBar 
        position='fixed'
        sx={{
           width: { sm: `calc(100% - ${drawerWidth}px)` },
           ml:    { sm: `${ drawerWidth }px`},
        }}
    >
        <Toolbar>
            
            <IconButton
                color='inherit'
                edge='start'
                sx={{ mr: 2, display: {sm: 'none'}}}
            >
                <MenuOutlined/>
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton 
                    color='error'
                    onClick={ onLogout }
                >
                    <LoginOutlined/>
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}

/* 
MUI no dispone de una Navbar preconfigurada para usar. Para crear el navbar se necesitan 2 componentes de Mui: 
AppBar y Toolbar.
AppBar representa una caja contenedora a la que le voy a ponerle cosas encima no viene con ningúna c
configuración previa.

position='fixed' siempre va a estar en una posición fija
A AppBar solo para pantallas sm hago el cálculo de que el largo del navbar sea igual al 100% 
del ancho menos drawerWidth que es el ancho de mi sidebar y le defino un margin left de el 
ancho del sidebar así AppBar no se va encima del Sidebar. 
ml margin left, para pantallas sm que la separación sea del tamaño del drawerWith. Para el resto 
toma el tamaño de defautl. A las xs ya no les reservo el espacio el navbar ocupa todo el ancho.
Dentro de Navbar llamo a Toolbar que agrega un padding a la derecha y a la izq del navbar. Dentro 
del Toolbar agrego lo que quiero que contenga el navbar.

Toolbar es un componente de Mui viene con un padding por izquierda y por derecha para que no quede pegado
a AppBar.
drawerWidth viene como prop desde JournalLayout. Indica el ancho del sidebar. 





*/