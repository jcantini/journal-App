import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'; // le pongo un alias para que n ode conflicto con el 
                                                      // Link de Mui
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

import { startCreatingUserWithEmailPassword } from '../../store/auth';



const formData = {  
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [ (value) => value.includes('@'), 'email must contain an @' ],
  password: [ (value) => value.length >= 6, 'password min length is 6 characterss.'],
  displayName: [ (value) => value.length >= 1, 'Name is required.'],
};

export const RegisterPage = () => {

  const dispatch = useDispatch(); // Para poder disparar la acción de crear una cuenta

  const [ formSubmitted, setFormSubmitted] = useState( false ); // Para guardr si se poesteo el formulario.

  // Del store, accedo al State para recuperar status y errorMedssage
  const { status, errorMessage } = useSelector( state => state.auth );

  // Defino una constante para ver si se está haciendo la autenticación poder deshabilitar el botón
  // de Crear Cuenta
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );
  
  // Establezco el estado inicial. Es otra forma de hacerlo a como lo hice para LoginPage
  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData , formValidations);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted( true );

    if ( !isFormValid ) return; // Si el form tiene algún error no creo al usuario

    dispatch( startCreatingUserWithEmailPassword(formState) ); // Llamo a la función en el thunk y le paso todo el state
  }

  return (
      <AuthLayout title='Create account'>

        <form onSubmit={ onSubmit }
              className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
              <Grid item xs={12} sx={{ mt: 2}}> 
                <TextField 
                  label="Your name" 
                  type="text" 
                  placeholder="Enter your first and last name"
                  fullWidth
                  name= "displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted }
                  helperText={ formSubmitted ? displayNameValid : ''}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2}}> 
                <TextField 
                  label="email" 
                  type="email" 
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }
                  helperText={ formSubmitted ? emailValid : '' }
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                  label="Password" 
                  type="password" 
                  placeholder="Password"
                  fullWidth
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ formSubmitted ? passwordValid : ''}
                />
              </Grid>

              <Grid container spacing={2} sx={{ md:2, mt:2 }}>  
                <Grid item 
                    xs={12} 
                    display={ !!errorMessage ? '' : 'none'}> 
                  <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>

                <Grid item xs={12}> 
                  <Button type='submit' variant='contained' fullWidth disabled={ isCheckingAuthentication }>
                    Create Account
                  </Button>
                </Grid>

              </Grid>


              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>Do you have an account</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  Login
                </Link>
                
              </Grid>

          </Grid>
        </form>
      </AuthLayout>
        
  )
}

// Tengo que indicar si hay un error y mostrar un texto con el mensaje de error. Mui tiene dos propiedades
// error={ true } pone el texto en rojo. Lo manejo con true o false y helperText con el texto de error que 
// quiero mostrar. 
// La mejor manera de manejarlo es desde mi custom hook. Las validaciones que necesito hacer las mando en 
// un objeto personalizado que llame formValidations. Es un objeto donde cada propiedad coincide con un 
// nombre de campo de los que quiero validar, uso el mismo nombre que puse en el name del campo. 
// Este objeto va a tener una propiedad por cada campo que quiero validar.
// Como valor de la propiedad tengo un array con dos valores. El 1ero es una función que recibe como argumento
// el valor que tiene el campo y la función que le aplico para validarlo. La función puede ser tan cpmpleja
// cómo sea necesario. El 2do argumento el el texto del mensaje de error si la validación no se cumple. 
// Este objeto lo paso como 2do argumento del useForm. Debo agregarlo este 2do argumento en useForm.js.

//  error={ !!displayNameValid } la doble negación es para convertir null en un valor booleano

// <Alert></Alert> es un componente de Mui



