
import { useTranslation } from "react-i18next";
import { useMessages } from "../../hooks";

import {  Badge,  Grid, Icon,  IconButton,    Typography, Checkbox, List, ListItem, ListItemIcon, FormControlLabel, ListItemText, Divider, Stack, Box,  } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';


  
  export const MensageEvent = () => {
     
    const { t } = useTranslation('mensajesConductor');
    
    const { messages = [], isLoadingA, removeMessage } = useMessages();

    const handleDelete = (messageId) => {
      removeMessage(messageId); // Llamamos a la función del hook para eliminar el mensaje
    };

    

  return (
    <Grid container direction="row" justifyContent={"space-between"} alignItems="center" sx={{ mt: 5, p: 2}} >
      
        <Grid item  >
            {/* <Icon fontSize="large">
                <CommentRoundedIcon color="error" fontSize="large"/> 
            </Icon> */}
            
            <Stack direction="row"  alignItems="center" >
            <IconButton  aria-label={0}  >
            <Badge  badgeContent={messages.length} color="error" >
              <MailIcon />
            </Badge>
          </IconButton> 
            <Typography variant="h5">{t('Title')}</Typography>
           
        </Stack>
        </Grid>
        <Divider/>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' padding='3' sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {isLoadingA ? (
          <Typography variant="h6">Cargando...</Typography>
        ) : (
          <List>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <ListItemIcon>
              
                  <FormControlLabel
                    control={<Checkbox checked={message.checked}  />}
                  />
                </ListItemIcon>
                <ListItemIcon>
                  <IconButton sx={{ color: 'red' }} onClick={() => handleDelete(message.id)}>
                    <Icon className="fas fa-trash-alt" />
                  </IconButton>
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={message.text}>{t('Description')}</ListItemText>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}

        
      </Grid>
    </Grid>
  );
}