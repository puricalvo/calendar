

import { AppRouter } from "./router";
import { AppTheme } from "./theme";
import { Suspense } from "react";





export const Calendario = () => {
  return (
      <AppTheme>
        
        <Suspense fallback={<h1>Cargando......</h1>}>
          <AppRouter /> 
        </Suspense>
       
       
      </AppTheme>
  )
}
