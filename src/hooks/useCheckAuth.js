// Este hookar si el usuario está logueado en firebase para mantener el estado (1)


import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";


export const useCheckAuth = () => {

    const status = useSelector( state => state.auth ); // (2) 
    const dispatch = useDispatch(); // Para poder disparar actions
  
    // (1) Mantener el estado si hay un refresh del navegador
      useEffect(() => {
          onAuthStateChanged( FirebaseAuth, async(user) => {
              if ( !user ) return dispatch( logout() );

              const { uid, email, displayName, photoURL } = user;
              dispatch( login({ uid, email, displayName, photoURL }))
              dispatch( startLoadingNotes() ); // Cargo para este user, todas sus notas
      })
    }, []);

    return status 
  
}

// (1) 
// Para que no se me borre mi state y mi login si recargo el navegador, mientras que no hice el logout por
// más que recarge, sigo logueado en firebase. entonces lo que hago es usando un useEffect, Llamo a una 
// función de Firebase que me indica si hubo un cambio en el estado de la autenticación. Esta función
// regresa un observable que significa que cada vez que el estado de la autenticación cambie, la función 
// se va a volver a disparar. de 2do argumento lleva un callback con lo que quiero ejecutar. Este callback
// recibe como argumento lo que genera el 1er argumento que sería el user si es que se encuentra logueado.
// Si el usuario está logueado en firebase, le disparo un login en la app y si no lo está, disparo un logout.
// Esto también me va a servir para la autenticación de las rutas si el usuario está o no logueado.

// (2) tomo del state cuyo name es auth y como solo me traigo el status no es nececsario desestructurar.
