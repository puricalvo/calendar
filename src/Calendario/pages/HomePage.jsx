
import { Divider, Grid, Toolbar } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Suspense } from "react";


export const HomePage = ({ children }) => {

 

  return (
    <>
    
    
    
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
        
                      <Divider/>
        </Grid>
               
                      

        <Grid container 
          className="animate__animated animate__fadeIn animate__faster" 
          direction='row'  
          padding='1' 
          justifyContent='center' 
          alignItems='center'
          sx={{ display: 'flex', flexwrap: 'wrap', width: "100%", mt: 3 }}
        >  
                    <Suspense fallback={<div>Loading translations...</div>}>
                      <Sidebar />
                    </Suspense>
                      <Divider/>
        
        </Grid>

      
     
                
          <Toolbar/>
           
            
            { children }
           
      
      </> 
  )
}
