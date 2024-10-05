import { useDispatch, useSelector } from "react-redux";

import {  Badge, FormControlLabel, Grid, Icon,  IconButton,  List,  ListItem,   ListItemIcon,  ListItemText,  Typography, Checkbox } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import { decrement, increment } from "../../store";
import { useTranslation } from "react-i18next";




function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

  
  
  
  export const MessagesConductor = () => {

    const { t } = useTranslation('mensajesConductor');
    // console.log('Current Language:', i18n.language);
    // console.log('Translations:', i18n.getFixedT()('Title'));

    const { counter } = useSelector( state => state.badge );
    const dispatch = useDispatch();

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
                        <FormControlLabel  control={<Checkbox />} onClick={ () => dispatch( decrement() )} />
                      </ListItemIcon>
                      <Grid container>
                        <ListItemText primary={t('Description')} ></ListItemText>
                      </Grid>        
                   
                  </ListItem>
              </List>    

            
                <Grid>
                <IconButton  aria-label={notificationsLabel(100)} type="button" onClick={ () => dispatch( increment() )}>
                    <Badge badgeContent={counter} color="error">
                        <MailIcon /> 
                    </Badge>
                </IconButton>
                </Grid>
             

              

                    
                
               
             
            
                   
                  
            
            
               
               
           

          
            
                  
            
            
        </Grid>
        

    </Grid>
        
            

    
  );
}
