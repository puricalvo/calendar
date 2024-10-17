// src/components/AddMessage.js
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, TextField } from '@mui/material';
import { useMessages } from '../../hooks';

export const AddMessage = () => {
  const { addNewMessage } = useMessages(); // Usamos el hook para agregar mensajes
  const [messageText , setMessageText] = useState('');

  const handleAddMessage = () => {
    if (messageText.trim() !== '') {
      addNewMessage(messageText); // Usamos la función del hook para agregar
      setMessageText('');
    }
  };

  return (
    <>
      <TextField
        label="Nuevo mensaje"
        variant="outlined"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        
        margin="normal"
        sx={{ backgroundColor: '#f0f0f0', borderRadius: 1, width: 550 }}
      />
      <Button onClick={handleAddMessage} variant="contained" color='primary' >
      <Link component={ RouterLink } color='inherit' to="/home">
        Agregar Mensaje
      </Link>
      </Button>
    </>
  );
};
