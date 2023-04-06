import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'; // le pongo un alias para que n ode conflicto con el                                               // Link de Mui
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";


import { useMemo } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLogingEmailPassword } from '../../store/auth';

const formData = { // Lo pongo por fuera xq tengo en useForm un useEffect condifionado con initialForm
  email: '',       // si lo dejo adentro cada vez que se renderiza el componente reinicia formData que al ser
  password: ''     // un objeto tiene una dirección nueva y entraría en un loop xq siempre es distinta la 
};                 // dirección que produce que el useEffect entra en loop

export const LoginPage = () => {

  // Accedo al store para recuperar status (para ver si está autenticado) y errorMessage
  const { status, errorMessage } = useSelector( state => state.auth ); 

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData); // Establezco el estado inicial

  // Memorizo si el usuario se esta autenticado y se ejecuta solamente cuando cambie status
  // Es para usarlo en los botones para deshabilitarlos mientras se está autenticando para que no se 
  // puedan volver a clickear mientras se autentica.
  const isAuthenticating = useMemo( () => status === 'checking', [status])

  const onSubmit = ( event ) => {
    event.preventDefault();

    dispatch( startLogingEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn());
  }

  return (
      <AuthLayout title='Login'>
        <form onSubmit={ onSubmit }
              className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
              <Grid item xs={12} sx={{ mt: 2}}> 
                <TextField 
                  label="email" 
                  type="email" 
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value = { email }
                  onChange={onInputChange}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  fullWidth
                  name="password"
                  value = { password }
                  onChange={onInputChange}
                />
              </Grid>

              <Grid container spacing={2} sx={{ md:2, mt:2 }}>  

                <Grid item 
                    xs={12} 
                    display={ !!errorMessage ? '' : 'none'}> 
                  <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>

                <Grid item xs={12} sm={6}> {/*En pantallas chicas toma 12 todo el ancho en medianas la 1/2 */}
                  <Button type='submit' variant='contained' fullWidth disabled= {isAuthenticating}>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}> {/*En pantallas chicas toma 12 todo el ancho en medianas la 1/2 */}
                  <Button variant='contained' fullWidth onClick={onGoogleSignIn} disabled= {isAuthenticating}>
                    <Google/>
                      <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>

              </Grid>

              <Grid container direction='row' justifyContent='end' sx={{ mt:2 }}>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
                
              </Grid>

          </Grid>
        </form>
      </AuthLayout>
        
  )
}

// Grid es un componente de Material UI que sería cómo un div pero tiene una sere de propiedades. Maneja
// 12 columnas como Bootstrap
// container que significa que va a ser un  contenedor de elemtos
// spacing para indicar el espacio entre los hijos, los items.
// direction equivale al display:flex

// sx es style extended que nos permite tener acceso al theme que definimos con ThemeProvider
// minHeight:'100vh' 100% view height osea todo el tamaño de pantalla disponible.
// backgroungColor: 'primary,main' toma el color de mi theme que está establecido como primary.main en
// purpleTheme.js

// mb es margin botton
// xs (for phones - screens less than 768px wide) 
// sm (for tablets - screens equal to or greater than 768px wide) 
// md (for small laptops - screens equal to or greater than 992px wide) 
// lg (for laptops and desktops - screens equal to or greater than 1200px wide)

// (1) En 'crear una cuenta' tengo que hacer un link, necesito usar el link de React Router pero también
// necesito indicarle a Mui como quiero que se muestre el link. Tengo que usar 2 links que ese componente
// Agrego el Link de Mui e importo Link de React-Router pero le pongo un alias xq los dos no se pueden llamar
// Link. En el Link de Mui que si bien indico a donde quiero navegar pero solo estoy definiendo el estilo.
// La funcionalidad se la doy agregando  RouterLink mi Link del router

