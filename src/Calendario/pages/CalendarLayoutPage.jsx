import {  Grid } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { NothingSelecterView } from "../views/NothingSelecterView";
import { Sidebar2 } from "../components";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
// import { localizer } from "../../helpers";




export const CalendarLayoutPage = () => {

  const { checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
      
          <Grid container
            justifyContent='center'
            padding='2'
          >
                
                <Navbar />
              
                  

                  <Sidebar2 />

                  <NothingSelecterView/>
          </Grid>

      
  )
}
