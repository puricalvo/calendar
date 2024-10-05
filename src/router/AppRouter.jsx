import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { HomeRoutes } from "../Calendario/routes/HomeRoutes";
import { useAuthStore } from "../hooks";
import {  useEffect } from "react";

export const AppRouter = () => {


    const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated' //'authenticated'  // 'not-authenticated';

    useEffect(() => {
      checkAuthToken(); 
    }, [])
    


    if ( status === 'checking' ) {
       return (
          <h3>Cargando...</h3>
       )
    }

  return (
    
    <Routes>

        {
          ( status === 'not-authenticated' )
              ?  (
                  <>
                    <Route path="/auth/*" element={ <AuthRoutes /> } />  // Login y Register
                    <Route path="/*" element={ < Navigate to="/auth/login"/> } />
                  </>
              ) 
              :  (
                  <>
                    <Route path="/*" element={ <HomeRoutes /> } /> // Pagina Principal
                    <Route path="/*" element={ < Navigate to="/"/> } />
                  </>
              

              )
             
        }

    </Routes>
  )
}
