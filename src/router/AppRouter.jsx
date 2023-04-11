// Router princilal de la App

import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks";
import { JournalPage } from "../journal/pages/JournalPage";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {

  const { status } = useCheckAuth(); // Obtengo es estado del usuario
  
  // mientras se este en estado de checking (autenticando al usuario),  no se va a poder acceder 
  // a ninguna ruta y mientras tanto muestro CheckingAuth, pamtalla de loading.
  if ( status === 'checking') {
    return <CheckingAuth /> // cargando
  }

  return (
    <Routes>

        {
          status === 'authenticated'
          ? <Route path="/*" element= { <JournalPage/> } />
          : <Route path="/auth/*" element={ <AuthRoutes/> }/>
        }

        <Route path="/*" element= { <Navigate to='/auth/login' /> } />

    </Routes>
  )
}



