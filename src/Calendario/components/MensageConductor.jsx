

import {  Badge,  Grid, Icon,  IconButton,  List,  ListItem,   ListItemIcon,  ListItemText,  Typography, Checkbox } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

import { useTranslation } from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';


  
  export const MensageConductor = () => {
      
   
    const { t } = useTranslation('mensajesConductor');


  return (
    <Grid container justifyContent="space-between">
        <Grid item >
            <Icon fontSize="large">
                <CommentRoundedIcon color="error" fontSize="large"/> 
            </Icon>
            <Typography variant="h4" component="div">{t('Title')}</Typography>
        </Grid>

        


        <Grid container direction='row' 
          justifyContent='space-between' 
          alignItems='center'
          padding='3'
          sx={{
            display:'flex',
            flexwrap: 'wrap'
          }} >

              <List>
                  <ListItem >
                      <ListItemIcon>
                       
                        <Checkbox 
                         
                        />
                      </ListItemIcon>
                        <IconButton 
                          aria-label="delete" 
                          size="medium" 
                          
                        >
                          <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                      <Grid >
                        
                        <ListItemText> - hola que tal el dia</ListItemText>
                      </Grid>        
                   
                  </ListItem>
              </List>    

            
                <Grid >
                <IconButton  aria-label={0} type="button" >
                    <Badge badgeContent={0} color="error">
                        <MailIcon /> 
                    </Badge>
                </IconButton>
                </Grid>
              
     
        </Grid>
        

    </Grid>
        
            

    
  );
}