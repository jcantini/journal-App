// El concepto de un layout es el de aplicar o reutilizar una misma estructura en varios componentes. 
// Por ej la página de Login y la de Register van a usar el mismo layout que es este.
// Lo defino como un high Order Componente al que despues como children le paso el comopente al que le 
// aplico este layout

import { Grid, Typography } from "@mui/material";


export const AuthLayout = ( { children , title = '' }) => {
  return (
    <Grid
      container
      spacing={0} // indico el espacio entre los Grid items. En este caso no dejo espacio
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight:'100vh', backgroundColor: 'primary.main', padding:4 }}
    >
        {/* Defino la caja que va a contener a los campos del form */}
        <Grid item
            className="box-shadow"
            xs={3} /* Si la pantalla es xs entonces toma 3 posiciones hay tambien md y lg ver abajo */
            sx={{
                width: { sm: 450 }, // Solo se aplica para pantallas md y lg para el resto va el del padre
                backgroundColor: 'white', 
                padding:3, 
                borderRadius:2, }}
        >
            <Typography variant="h5" sx={{ mb: 1}}>{title}</Typography> 

            {/* Aca van el children la app a la que se le aplica el layout */}
            { children }
            
        </Grid>

    </Grid>  
  )
}

/* 

Creo un Layout que va a tener el fondo con el color primario y que se muestre una ventana en el medio de la 
pantalla. Como todo componente debo retornar solo un elemento en este caso es un Grid con la prop container.
Grid es un componente de Material UI similar a un div pero tiene propiedades. Maneja 12 columnas como Bootstrap
container significa que va a ser un  contenedor de elemtos.
spacing indica el espacio entre los hijos, los items.
direction equivale al display:flex

sx style extended es una propiedad que nos permite definir un custom style que además tiene acceso al 
default theme. En esta app los customicé 
que le definimos a la App usando 
ThemeProvider. Es similar a la propiedad Style pero con sx tengoademas acceso al theme que defini en 
ThemeProvider.

Tamaños de pantalla:
xs (for phones - screens less than 768px wide) 
sm (for tablets - screens equal to or greater than 768px wide) 
md (for small laptops - screens equal to or greater than 992px wide) 
lg (for laptops and desktops - screens equal to or greater than 1200px wide)

xs={3} indica que para xs y todas las superiores, tome 3 columnas a menos que le especifique
  un tamaño para algun otro tamaño de pantalla.
xs si no le especifico un valor indico que todos los grid items toman el mismo tamaño.

spacing={2} si lo agrego al grid container, aplica 16 pixels de espacio entre las columnas y las filas.
    Puedo también indicar rowSpacing={2} columnSpacing={1} dando un espscio distinto a las cols y a las filas.

minHeight:'100vh' 100% view height o sea todo el tamaño de pantalla disponible.
backgroungColor: 'primary.main' toma el color de mi theme que está establecido como primary.main en
purpleTheme.js

Typodraphy:
Con MUI para mostrar un texto uso Typodraphy para usar la tipografía de Roboto
que instalé. Lo convierte por default en un <p></p>. Esto lo puedo modificar haciendo
Typography component='h5' donde en lugar de un p se genera un h5 pero solo escribe
en el html que es un h5. Si quiero que tome el tamaño que tiene un h5 tengo que poner
Typography variant='h5'

*/

