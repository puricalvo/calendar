import {  Grid } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { NothingSelecterView } from "../views/NothingSelecterView";
import { Sidebar2 } from "../components";
import { useAuthStore } from "../../hooks";
import { Suspense, useEffect } from "react";




export const CalendarLayoutPage = () => {

  const { checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
      
          <Grid container 
          className="animate__animated animate__fadeIn animate__faster" 
          direction='row'  
          padding='1' 
          justifyContent='center' 
          alignItems='center'
          sx={{ display: 'flex', flexwrap: 'wrap', width: "100%", mt: 3 }}
          >
               <Suspense fallback={<div>Loading translations...</div>}>
                <Navbar />
               </Suspense> 
              
                  
               <Suspense fallback={<div>Loading translations...</div>}>
                  <Sidebar2 />
               </Suspense>

               <Suspense fallback={<div>Loading translations...</div>}>
                  <NothingSelecterView/>
               </Suspense>
          </Grid>

      
  )
}
