import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'; 
import { Google } from "@mui/icons-material"; // importo el logo de google
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { useMemo } from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLogingEmailPassword } from '../../store/auth';

const formData = { // Lo pongo por fuera xq tengo en useForm y un useEffect condifionado con initialForm
  email: '',       // si lo dejo adentro cada vez que se renderiza el componente reinicia formData que al ser
  password: ''     // un objeto tiene una dirección nueva y entraría en un loop xq siempre es distinta la 
};                 // dirección que produce que el useEffect entra en loop

export const LoginPage = () => {

  // Accedo al store para recuperar el status (para ver si está autenticado) y errorMessage
  const { status, errorMessage } = useSelector( state => state.auth ); 

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData); // Establezco el estado inicial

  // Memorizo si el usuario se esta autenticado y se ejecuta solamente cuando cambie el status
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
        <form onSubmit={ onSubmit } // Este form va dentro de la caja definida en el Layout
              className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
              <Grid item xs={12} // para pantallas xs toma 12 cols si no toma el tamaño standars para un Textfield 
                         sx={{ mt: 2 }}> 
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

              <Grid item xs={12} 
                         sx={{ mt: 2}}>
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

                <Grid item xs={12} sm={6}> {/*En pantallas chicas toma 12 todo el ancho en medianas y superiores la 1/2 */}
                  <Button variant='contained' fullWidth onClick={onGoogleSignIn} disabled= {isAuthenticating}>
                    <Google/>
                      <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>

              </Grid>

              <Grid container direction='row' justifyContent='end' sx={{ mt:2 }}> 
                <Link component={ RouterLink } color='inherit' to="/auth/register">  
                  Create new account
                </Link>
                
              </Grid>

          </Grid>
        </form>
      </AuthLayout>
        
  )
}

/*
 mb es margin botton
 
Tamaños de pantalla: Mui trabaja con la terminologia de Movil first o sea que usa 1ero lo que tengo definido 
para xs y esto lo replica para los otros tamaños a menos que tenga definido otro valor para otro tamaño.
El orden para definir un tamaño en particular es xs, sm, md y lg. 
Por ej si defino item xs={12} sm={6} toma todo el tamaño posible si es xs y la mitad si es sm, md o lg 
También para este cado si tengo dentro del container 2 elementos con esta configuración para pantallas
sm, md y lg cómo ocupan la mitad se van a posicionar uno al lado del otro

Typography para escribir un texto en lugar de hacer <div>Journal</div> debo reemplazar el div por Typography 
para que tome el font de Roboto por default en el html Typography se convierte en un <p></p> si necesito que
se convierta en otra etiqueta por ej en un h1 con las propiedades de h1 debo agregarle varient='h1'

RouterLink: 
En 'crear una cuenta' tengo que hacer un link a la página de registro.
Necesito usar el link de React Router pero también necesito indicarle a Mui como quiero que se muestre como
link y para esto necesito usar el Link de Mui. Ambos se llama igual y esto no está permitido por lo que al 
Link de React-Router lo renombre como RouterLink. Al Link de Mui le doy la funcionalidad usando RouterLink.

*/
