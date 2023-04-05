import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    // Provider para Login con Google
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider ); // lo mismo seria para facebook, etc
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials }); para ver que credenciales me trae. Solo a efectos de verlo
        const { displayName, email, photoURL, uid } = result.user;
    
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid 
        }

    } catch (error) {

        const errorCode = error.code;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        
        return {
            ok: false,
            errorMessage: error.message
        }
    }

} 

   // Provider para Registrar un usuario con su mail y password
   export const registerUserWithEmailPassword = async ( { email, password, displayName } ) => {

        try { // (1)
            const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password );
            const { uid, photoURL } = resp.user;

            await updateProfile( FirebaseAuth.currentUser, { displayName }); 

            return {
                ok: true,
                uid, photoURL, email, displayName
            }

        } catch (error) {  
            // Acá tendría que capturar el código de error de firebase y de acuerdo a ese código pongo
            // el mensaje de error ej el usuario ya existe o usuario bloqueado, etc.
            // console.log(error) 
            return {
                ok: false,
                errorMessage: error.message
            }
        }

   }

   // Provider para hacer el Login de un usuario con su mail y password
    export const loginUserWithEmailPassword = async ( { email, password } ) => {
        try {
            const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password );
            const { uid, displayName, photoURL} = user;

            return {
                ok: true,
                uid, photoURL, email, displayName
            }

        } catch (error) {  
            let errorMsg = '';

            if (error.message === 'Firebase: Error (auth/wrong-password).') {
                errorMsg = 'Invalid Password';
            } else if ( error.message === 'Firebase: Error (auth/user-not-found).') {
                errorMsg = 'Invalid user';
            } else {
                errorMsg = error.message;
            }
            
            return {
                ok: false,
                errorMessage: errorMsg
            }
            
        }
    }

       // Provider para hacer el Logout de firebase
       export const logoutFirebase = async() => {
            return await FirebaseAuth.signOut();
            // cierra firebase, google, microsoft, fcebook etc 
       }


   // (1) 
   // createUserWithEmailAndPassword es una función asíncrona de firebase que pide 3 argumentos y crea
   // un usuario nuevo en la base de datos y ademas lo loguea.
   // De la respuesta tomo el uid y la foto que si bien en el alta no la cargo puede ser que la cargue por
   // otro lado y ahora la recupero. Esta función la llamo desde el store/auth/thunks
   // Luego con updateProfile actualizo en firebase el valor de displayName al registro creado