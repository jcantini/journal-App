// Cualquier página que use este Layout va a heredar el Navbar y el Sidebar

import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components";

const drawerWidth = 280; // Es el valor de ancho que quiero darle la la barra que va a hacer de sidebar esta en px

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn'>

        <NavBar drawerWidth={ drawerWidth }/> {/* Le paso que ancho ocupa el sidebar */}

        <SideBar drawerWidth={ drawerWidth }/>

        <Box 
            component='main'
            sx={{ flexGrow: 1, p:3 }}
        >    
            <Toolbar />

            { children }

        </Box>

    </Box>
  )
}


// Un Box es como un grid
// component='main' equivale a la etiqueta main de html



