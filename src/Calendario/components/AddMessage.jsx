import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { useMessages } from '../../hooks';

export const AddMessage = () => {
  const { addNewMessage } = useMessages();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleAddMessage = async (event) => {
    event.preventDefault();
    const text = messageText.trim();
    if (!text || isSending) return;

    setIsSending(true);
    const succeeded = await addNewMessage(text);
    setIsSending(false);
    if (succeeded) {
      setMessageText('');
      setSent(true);
      setTimeout(() => navigate('/home'), 1200);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleAddMessage}
      spacing={2}
      sx={{ width: 'min(550px, calc(100vw - 32px))', p: 2 }}
    >
      <Typography variant="h5">Enviar mensaje al administrador</Typography>
      <Typography color="text.secondary">
        Escribe una consulta o comunica una incidencia. El administrador recibirá tu mensaje.
      </Typography>
      {sent && <Alert severity="success">Mensaje enviado al administrador.</Alert>}
      <TextField
        label="Tu mensaje"
        variant="outlined"
        multiline
        minRows={4}
        required
        inputProps={{ maxLength: 2000 }}
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" disabled={isSending || !messageText.trim()}>
        {isSending ? 'Enviando…' : 'Enviar mensaje'}
      </Button>
    </Stack>
  );
};
