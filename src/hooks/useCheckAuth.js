// Este hookar si el usuario está logueado en firebase para mantener el estado (1)


import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

// Creo un custom hook para 
export const useCheckAuth = () => {

    const status = useSelector( state => state.auth ); // (2) 
    const dispatch = useDispatch(); // Para poder disparar actions
  
    // (1) 
    useEffect(() => { // lo uso para mantener el estado si hay un refresh del navegador
        onAuthStateChanged( FirebaseAuth, async (user) => {
            if ( !user ) return dispatch( logout() );

              const { uid, email, displayName, photoURL } = user;
              dispatch( login({ uid, email, displayName, photoURL }))
              dispatch( startLoadingNotes() ); // Cargo para este user, todas sus notas
      })
    }, []);

    return status  // Devuelvo cual es el estado del usuario
  
}

// (1) 
// Si recargo el navegador quiero evitar que se borre el state con toda la info del usuario logueado. 
// Uso para esto un useEffect se dispara una sola vez. La función de Firebase onAuthStateChanged que indica si 
// hubo un cambio en el estado de la autenticación. Regresa un observable que significa que cada vez que el 
// estado de la autenticación cambie, la función se va a volver a disparar. El 1er argumento me devuelve un user
// si me encuentro loguedo en firestore. El 2do argumento es un callback que recibe ese user como argumento.
// Si el usuario se encuentre logueado me devuelve toda su info que uso para hacer el dispatch del login y 
// cargar sus notas. Si no está logueado disparo un logout.
// Esto también me va a servir para la autenticación de las rutas para ver si el usuario está o no logueado.

// (2) tomo del state cuyo name es auth y como solo me traigo el status no es nececsario desestructurar.
