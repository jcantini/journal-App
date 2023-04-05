import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { journalSlice } from './journal';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Le asocio el slice/reducer referido a la autenticación
    journal: journalSlice.reducer  // Le asocio el slice/reducer referido al journal
  }
});
