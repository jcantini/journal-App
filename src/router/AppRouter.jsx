// Router princilal de la App

import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks";
import { JournalPage } from "../journal/pages/JournalPage";
import { CheckingAuth } from "../ui";

export const AppRouter = () => {

  const { status } = useCheckAuth();
  
  // mientras se este en estado de checking o sea se está autenticando al usuario, 
  //  no se va a poder acceder a ninguna ruta y muestro CheckingAuth 
  if ( status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

        {
          status === 'authenticated'
          ? <Route path="/*" element= { <JournalPage/> } />
          : <Route path="/auth/*" element={ <AuthRoutes/> }/>
        }

        <Route path="/*" element= { <Navigate to='/auth/login' /> } />


        {/* Login y Registro* cualquier ruta que inicio con auth lo mando al router de auth */}
        {/* <Route path="/auth/*" element={ <AuthRoutes/> }/> */}

        {/* Journal app - usuario autenticado */}
        {/* <Route path="/*" element= { <JournalPage/> } /> */}

    </Routes>
  )
}



