import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
       status: 'checking', // 'checking','not-authenticated'. 'authenticated' son los estados posibles.
       uid: null,
       email: null,
       displayName: null,
       photoURL: null, // Me la facilita google si me auntentiqué con google
       errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'; 
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout:  ( state, { payload }) => {
            state.status = 'not-authenticated'; 
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage; // si viene payload tomo el errorMessage
        },
        checkingCredentials: (state) => { // para chequear si el usuario se esta logueando o está logueado
            state.status = 'checking'
        },
    }
});

// Action creators are generated for each case reducer function. Me crea mis acciones
export const { login, logout, checkingCredentials } = authSlice.actions;