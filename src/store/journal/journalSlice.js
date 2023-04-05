// Este es el slice/reducer de mi journal

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false, // para saber si estoy guardando la nota
        messageSaved: '',
        notes: [],
        active: null // (1)
    
    },
    reducers: { // Mis acciones
       
       savingNewNote: ( state, action ) => {
            state.isSaving = action.payload;
       },

       addNewEntryNote: (state, action) => { 
        // como uso redux toolkit no necesito preocuparme por ...notes para agregar lo que ya tengo cargado
            state.notes.push(action.payload);
            state.isSaving = false;

       },

       setActiveNote: (state, action) => { // activo la nota que quiero mostrar
            state.active = action.payload;
            state.isSaving = false;
            state.messageSaved = ''; // Limpio el mensaje de actualización
       },

       setNotes: (state, action) => {  
            state.notes = action.payload; 
       },

       setSaving: ( state ) => { 
          state.isSaving = true;
          state.messageSaved = ''; // Limpio el mensaje de actualización
       },

       noteUpdated: (state, action) => {  
          state.isSaving = false; // ya acrualice la nota vuelvo isSaving a false

          // Ahora tengo que actualizar en el sidebar la nota que acabo de actualizar en la firebase
          state.notes = state.notes.map( ( note ) => {  // Esto solo lo puedo hacer porque uso Redux-Toolkit
               if (note.id === action.payload.id) {       // En Redux normal hay que usar el spread ...
                       return state.active;
               } else {
                    return note;
               }
          });
          // guardo un mensaje de que se actualizo correctamente
          state.messageSaved = `${ action.payload.title }, has been updated`; 
       },
       setPhotosToActiveNote: (state, action ) => {
          state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
          // tomo todo lo que ya tengo en el array de imageeURLs y le agrago todas las nuevas
          state.isSaving = false;
       },

       clearNotesLogout: ( state ) => {
          state.isSaving = false;
          state.messageSaved = '';
          state.notes = [];
          state.active = null;
       },
       
       deleteNoteById: (state, action) => {
          state.active = null;
          state.notes = state.notes.filter( note => note.id !== action.payload);
          // Esto lo puedo hacer xq uso el redux toolkit sino tendria que hacer:
          // return {
          //      ...state,
          //      active: null,
          //      notes: state.notes.filter( note => note.id !== action.payload)
          // }
       }

    }
});

export const { addNewEntryNote, setActiveNote, setNotes, noteUpdated, clearNotesLogout,
               setSaving, deleteNoteById, savingNewNote, setPhotosToActiveNote
             } = journalSlice.actions;

// (1)
// una nota tiene la siguiente estructura:
//  active: { // Esta es la estructura de una nota
//     id: 'ABC213', 
//     title: '',
//     body: '',
//     date: 1234567,
//     imageUrls: [], // es un array de urls para las imagenes
// }