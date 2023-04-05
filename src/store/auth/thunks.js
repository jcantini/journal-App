
import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword({ email, password, displayName });
        // console.log(resp) // para ver todos los campos que me devuelve xl ok, errorMessage, etc
        const { ok, uid, photoURL, errorMessage } = resp;

        // Si se crea el usuario ok=true si no se creo viene con false
        if ( !ok ) return dispatch( logout({ errorMessage }));

        // Si se dio de alta, procedo a hacer el login del usuario
        dispatch( login({ uid, email, displayName, photoURL}) );

    }

}

export const startLogingEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginUserWithEmailPassword({ email, password });
        const { ok, uid, displayName, photoURL, errorMessage} = result;

        if ( !ok ) return dispatch( logout({ errorMessage }));

        dispatch( login({ uid, email, displayName, photoURL}) );
        
    }
}
   // Me creo una action para disparar el logout de firebase que como z es asasíncrona tengo que hacerlo
   // desde el thunl
export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearNotesLogout() )    // Limpio el store

        dispatch( logout()) // disparo la action sincr[onica de ]
    }
}