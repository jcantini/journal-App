// Configuración de Firebase. Contiene agregdos a la copia que me da el sitio
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKL6c0UJ2GbsNZjFCyPjWYl0iPSgxIrSg",
  authDomain: "journal-app-ac990.firebaseapp.com",
  projectId: "journal-app-ac990",
  storageBucket: "journal-app-ac990.appspot.com",
  messagingSenderId: "438850373087",
  appId: "1:438850373087:web:7b358bde64108eb3ea306a"
};

// Initialize Firebase. Le cambié el nombre app por FirebaseApp para que sea más específico. 
const FirebaseApp  = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );