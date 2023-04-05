import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEntryNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from './';

export const startNewNote = () => { // Para insertar una nota en blanco
    return async ( dispatch, getState ) =>{ // (1)

        const { uid } = getState().auth; // Obtengo del State, el uid del usuario logueado

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        }

        try {
            dispatch( savingNewNote( true ) ); // Para deshabilitar el boton + hasta que termine el add

            // Genero la referencia a la colección donde lo quiero insertar (2)
            const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ));

            // Inserto la nota
            await setDoc( newDoc, newNote );
 
            // Le agrego a la nota una propiedad con el id generado en firebase
            newNote.id = newDoc.id;

            // dispatch action sincrona addNewEntryNote del slice para cargar la nota en el [] del store
            dispatch( addNewEntryNote( newNote ) )

            //dispatch action para dejar esta nota como la nota activa
            dispatch( setActiveNote( newNote ) )


        } catch (error) {
            dispatch( savingNewNote( false ) ); // Para habilitar el boton + ya que dio error
            console.log( error.message );
        }
    }       
}

export const startLoadingNotes = () => { // Para recuperar las notas de un usuario
    return async ( dispatch, getState ) =>{ 

        dispatch( setSaving() ); // Actualizo setSavings a true

        const { uid } = getState().auth; // Obtengo del State, el uid del usuario logueado
        if ( !uid ) throw new Error("User Uid doesn't exists");
    
        const notes = await loadNotes( uid );

        // disparo la action sincrónica  al slice para cargar las notas en el state
        dispatch( setNotes( notes )); 
    }
}

export const saveNote = () => {
    return async ( dispatch, getState) => {
        
        const { uid } = getState().auth; // recupero el user id
        const { active: note } = getState().journal; // recupero la nota activa
        // La nota activa tiene como propiedad su id. Si mando a grabar la nota assi, firebase va a intentar
        // grabar la nota con ese id que ya existe. Por lo que tengo que removerlo de la nota activa.

        const noteToFireStore = { ...note}; 
        delete noteToFireStore.id; // le elimino la propiedad id

        // necesito crear el url para acceder a la note que quiero actualizar
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`) // Este es el link a la nota
        // Actualizo la nota. merge:true hace que se haga un merge entre los campos de la db y los que mando. 
        try {
            await setDoc( docRef, noteToFireStore, { merge: true }); 

            dispatch(  noteUpdated( note )); // disparo la action para actualizar el cambio en la nota en el Sidebar 

        } catch (error) {
            throw new Error( error );
        }
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() ); // para bloquear los botones

        // Disparo todas las promesas juntas para que las imagenes se carguen en simultaneo
        const fileUploadPromises = [];
        for( const file of files) {
            fileUploadPromises.push( fileUpload (file )) // cargo en el array la peticion sin ejecutarle
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch ( setPhotosToActiveNote( photosUrls ) )
        console.log(photosUrls);
    }
}  

export const startDeletingNote = ( files = [] ) => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth; // recupero el user id
        const { active: note } = getState().journal;
        
        // necesito crear el url para apuntar a la note que quiero eliminar
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`);

        try {

            await deleteDoc( docRef ); // Hago el delete del docuento ( nota ) no devuelve nada

            // Eliminada de FireStore hay que eliminarla del store
            console.log('Thunk id', note.id);
            dispatch(  deleteNoteById( note.id )); // disparo la action para actualizar el cambio en la nota en el Sidebar 

            // Eliminar la imagenes de Cloudinary. En realidad esto hay que hacerlo desde el backend usando el 
            // SDK de Cloudinary. Desde el lado del front no puedo hacerlo xq no puedo mandarle al SDK el api key y el
            // api secret. Buscar en cloudinary la documentación del SDK y cómo se implementa para node. En la clase 325
            // se muestra cómo hacerlo.

        } catch (error) {
            throw new Error( error );
        }
    }
}


// (1) la función que se retorna del thunk, admite un 2do argumento getState que es una función
// que accede a todo el State/store, solo es necesaria incluirla si necesito algún elemento del store.

// (2)
// Ver en la página de firebase donde está mi app en la pestaña Reglas, lo que modifiqué para que solo
// deje grabar si la autenticación existe.