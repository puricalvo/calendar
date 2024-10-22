
import {  AppRouterPrin } from "./router";
import { AppTheme } from "./theme";
import { Suspense } from "react";




export const Calendario = () => {
  return (
      <AppTheme>
        <Suspense fallback={<h1>Cargando......</h1>}>
          <AppRouterPrin /> 
        </Suspense> 
      </AppTheme>
  )
}
