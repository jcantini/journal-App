// En el layout pongo el contenido que se que voy a reutilizar en otros componentes

import { Grid, Typography } from "@mui/material";


export const AuthLayout = ( { children , title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight:'100vh', backgroundColor: 'primary.main', padding:4 }}
    >

        <Grid item
            className="box-shadow"
            xs={3} /* Toma 3 posiciones es el tamaño de la caja hay tambien md y lg ver abajo */
            sx={{
                width: { sm: 450 }, // Solo se aplica para pantallas md para el resto va el del padre
                backgroundColor: 'white', 
                padding:3, 
                borderRadius:2, }}
        >
            <Typography variant="h5" sx={{ mb: 1}}>{title}</Typography> 

            {/* Aca van los children */}
            { children }
            
        </Grid>

    </Grid>  
  )
}

// Con MUI para mostrar un texto uso Typodraphy para usar la tipografía de Roboto
// que instalé. Lo convierte por default en un <p></p>. Esto lo puedo modificar haciendo
// Typography component='h5' donde en lugar de un p se genera un h5 pero solo escribe
// en el html que es un h5. Si quiero que tome el tamaño que tiene un h5 tengo que poner
// Typography variant='h5'
5

