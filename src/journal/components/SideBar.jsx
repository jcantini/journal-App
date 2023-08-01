import { useSelector } from "react-redux";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"

import { SideBarItem } from "./";



export const SideBar = ( { drawerWidth = 240 }) => { // recibo el tamaño que va a tener el sidebar

    const { displayName } = useSelector( state => state.auth ); // me traigo el nombre del usuario del state
    const { notes } = useSelector( state => state.journal ); // me traigo las notas del state
 
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' 
            open // si siempre va a ser true es lo mismo que poner open={ true }
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={ note.id } { ...note }/> // mando toda la nota desestructurada
                    ))
                }
            </List>
        </Drawer>
      
    </Box>
  )
}


/*
Drawer se llama en Mui a un sidebar. Como propiedades en variant puedo ponerle temporary si lo quiero 
ocultar o mostrar de forma incondicional puedo ponerle onClose para ejecutar algo cuando lo cierro, etc
tiene muchas propiedades para verlas en la documentación
Component='nav' es como html indico que va a ser una barra de navegación

'& .MuiDrawer-paper': poniendo entre '' estoy creando una propiedad computada a la que le paso valores
Toolbar

 <Divider/> crea una línea de separación

*/