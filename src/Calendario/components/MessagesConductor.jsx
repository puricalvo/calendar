import { useDispatch, useSelector } from "react-redux";

import {  Badge,  Grid, Icon,  IconButton,  List,  ListItem,   ListItemIcon,  ListItemText,  Typography, Checkbox } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import { decrement, increment } from "../../store";
import { useTranslation } from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthStore } from "../../hooks/useAuthStore";
import { useState } from "react";



const notificationsLabel = (count) => {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}


  
  
  
  export const MessagesConductor = ({events}) => {
      
    
    const { user } = useAuthStore();

    const { notes } = events;
    
    const { t } = useTranslation('mensajesConductor');
    // console.log('Current Language:', i18n.language);
    // console.log('Translations:', i18n.getFixedT()('Title'));

    const { counter } = useSelector( state => state.badge );
    const dispatch = useDispatch();

   const onSelect = (events) => {
      console.log({ click: events })
   }


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
                          onClick={onSelect}
                        />
                      </ListItemIcon>
                        <IconButton 
                          aria-label="delete" 
                          size="medium" 
                          onClick={ onSelect }
                        >
                          <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                      <Grid container>
                        <Typography variant="h5">{ user.name }:  - </Typography>
                        <ListItemText>{ notes }</ListItemText>
                      </Grid>        
                   
                  </ListItem>
              </List>    

            
                <Grid>
                <IconButton  aria-label={0} type="button" onClick={ () => dispatch( increment() )}>
                    <Badge badgeContent={counter} color="error">
                        <MailIcon /> 
                    </Badge>
                </IconButton>
                </Grid>
              
     
        </Grid>
        

    </Grid>
        
            

    
  );
}
