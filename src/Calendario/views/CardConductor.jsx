

import {  Card,  Divider,  Grid } from "@mui/material";
import { MessagesConductor } from "../components/MessagesConductor";
import { DatePike } from "../components/DatePike";
import { CardList } from "../components/CardList";




export const CardConductor = ({children}) => {



 
  return (
     <Grid container 
     className="animate__animated animate__fadeIn animate__faster"  
     direction='row' 
     justifyContent='center' 
     alignItems='center'
     padding='3'
     sx={{ display: 'flex',  }}
     > 
    <Grid container
      direction='row'
      justifyContent='space-around'

    >
        
    </Grid>
    
    <Grid item size={{ xs: 12, sm:6,   }}    
      sx={{ borderRadius: 2}}
    >
      <DatePike/>
    </Grid>
    
    <Divider/>
    <Card
        
       sx={{ flexBasis: '60em',  padding: 0, border: 0,  justifyContent:'space-between',flexwrap: 'wrap'}}>
       
               <CardList />  
  </Card>


  <Divider/>

    <Grid 
      container
      direction='row'
      justifyContent='center'  
    >
        <MessagesConductor
          messages
        />
    </Grid>
     
 </Grid>
        
     

  )    
}
