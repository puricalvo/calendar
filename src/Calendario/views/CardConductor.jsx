import {   Divider,  Grid } from "@mui/material";
import {  Card,  DatePike,  } from "../components";
import { Suspense } from "react";




export const CardConductor = () => {


  return (
     <Grid container 
     className="animate__animated animate__fadeIn animate__faster"  
     direction='row'
     justifyContent='center'
     alignItems='center'
     padding='3'
     spacing={2}
     sx={{ display: 'flex', mt: 4 }}
     > 
   
    
    <Grid item   size={{ xs: 12 }}    
      sx={{ borderRadius: 2, justifyContent:'space-around', mt:4}}
    >
      <Suspense fallback={<div>Loading translations...</div>}>
            <DatePike/>
      </Suspense>
    </Grid>
    
    <Divider/>

    <Grid item size={{ xs: 12 }} 
      sx={{ flexBasis: '65em',  
        padding: 0, 
        border: 0, 
        flexwrap: 'wrap', mt: 4}}>
       
              
               
       <Suspense fallback={<div>Loading translations...</div>}>
            <Card/>
       </Suspense>
          

              
    
    </Grid>


  
     
 </Grid>
        
     

  )    
}
