// Este componente es una pantalla de carga con una estructura similar a AuthLayout.jsx
// Este es el componente que se va a mostrar cada vez que se recarge la app

import { CircularProgress, Grid } from "@mui/material"


export const CheckingAuth = () => {
  return (
    <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight:'100vh', backgroundColor: 'primary.main', padding:4 }}
        >

        <Grid 
            container
            direction='row'
            justifyContent='center'
        >
            <CircularProgress color='warning' />
        </Grid>
    </Grid>        
  )
}


