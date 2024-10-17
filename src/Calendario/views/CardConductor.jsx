import {   Divider,  Grid } from "@mui/material";
import {  DatePike, CardList, MensageEvent  } from "../components";




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
   
    
    <Grid item   size={{ xs: 4 }}    
      sx={{ borderRadius: 2, justifyContent:'space-around', mt:4}}
    >
      <DatePike/>
    </Grid>
    
    <Divider/>

    <Grid item size={{ xs: 8 }} 
      sx={{ flexBasis: '65em',  
        padding: 0, 
        border: 0, 
        flexwrap: 'wrap', mt: 4}}>
       
              
               <CardList  />  
    
    </Grid>


  <Divider/>

    <Grid 
      container
      direction='row'
      justifyContent='center'
      sx={{ mt: 4 }}  
    >
        <MensageEvent/>
    </Grid>
     
 </Grid>
        
     

  )    
}
