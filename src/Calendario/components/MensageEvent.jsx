
import { useTranslation } from "react-i18next";
import { useMessages } from "../../hooks";

import {  Badge,  Grid, Icon,  IconButton,    Typography, Checkbox, List, ListItem, ListItemIcon, FormControlLabel, ListItemText,  } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';


  
  export const MensageEvent = () => {
     
    const { t } = useTranslation('mensajesConductor');
    
    const { messages = [], isLoading, removeMessage, modifyMessage } = useMessages();

    const handleDelete = (messageId) => {
      removeMessage(messageId); // Llamamos a la función del hook para eliminar el mensaje
    };

    const handleToggleCheck = (message) => {
      modifyMessage({ ...message, checked: !message.checked }); // Llamamos a la función del hook para actualizar el mensaje
    };

  

  return (
    <Grid container justifyContent="space-between">
      
        <Grid item >
            <Icon fontSize="large">
                <CommentRoundedIcon color="error" fontSize="large"/> 
            </Icon>
            <Typography variant="h4" component="div">{t('Title')}</Typography>
        </Grid>

        <Grid container direction='row' justifyContent='space-between' alignItems='center' padding='3' sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {isLoading ? (
          <Typography variant="h6">Cargando...</Typography>
        ) : (
          <List>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <ListItemIcon>
                  <FormControlLabel
                    control={<Checkbox checked={message.checked} onChange={() => handleToggleCheck(message)} />}
                  />
                </ListItemIcon>
                <ListItemIcon>
                  <IconButton sx={{ color: 'red' }} onClick={() => handleDelete(message.id)}>
                    <Icon className="fas fa-trash-alt" />
                  </IconButton>
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={message.text} />
                </Grid>
              </ListItem>
            ))}
          </List>
        )}

        <Grid>
          <IconButton aria-label={0}>
            <Badge badgeContent={messages.length} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}