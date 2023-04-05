import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid = '' ) => {
    if ( !uid ) throw new Error("User Uid doesn't exists");

    // apunto a la colección que quiero recuperar
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`) ;

    // Me traigo los documentos de esa colección
    const docs = await getDocs(collectionRef); // Puedo agregarle filter, condiciones, order by etc

    // En realidad getDocs solo me da las referencias a cada documento. Para poder acceder a los datos hay que 
    // llamar a la función data viene como un campo dentro de cada uno de los documentos

    // Ahora voy a cargar cada nota en un array
    const notes = [];

    // Agrego cada nota al array que va a tener el id de la nota y el resto de los campos, que los los obtengo llamando 
    // a la función data() y separo los campos usando  ...doc.data()
    docs.forEach( doc => {
        notes.push( {id: doc.id, ...doc.data() } ); 
    })

    return notes;
   
}