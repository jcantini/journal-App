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

// Uso AppBar que es algo que viene en Mui. Represnta una caja contenedora donde voy a ponerle cosas encima
// position='fix' siempre va a estar en una posición fija

// drawerWidth viene como prop desde JournalLayout, que es el ancho del sidebar. 
// A AppBar solo para pantallas sm hago el cálculo de que el largo del navbar sea igual al 100% del ancho 
// menos drawerWidth que es el ancho de mi sidebar y le defino un margin left del ancho del sidebar así AppBar 
// no se va encima del Sidebar. 
// ml margin left, solo para pantallas sm que la separación sea del tamaño del drawerWith. Las xs ya no les
// reservo el espacio el nvbar ocupa todo el ancho.