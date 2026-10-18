import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import calendarApi from '../../api/calendarApi';
import { useMessages } from '../../hooks';

export const AddMessage = () => {
  const { addNewMessage, replyToUser } = useMessages();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [recipientId, setRecipientId] = useState('');
  const [loadingEmployees, setLoadingEmployees] = useState(isAdmin);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) return undefined;

    let active = true;
    calendarApi.get('/auth/users')
      .then(({ data }) => {
        if (!active) return;
        const employeeList = data.usuarios || [];
        setEmployees(employeeList);
        setRecipientId(employeeList[0]?.id || '');
      })
      .catch((requestError) => {
        console.error('Error al cargar empleados para enviar un mensaje:', requestError);
        if (active) {
          setError(requestError.response?.data?.msg || 'No se pudieron cargar los empleados.');
        }
      })
      .finally(() => {
        if (active) setLoadingEmployees(false);
      });

    return () => { active = false; };
  }, [isAdmin]);

  const handleAddMessage = async (event) => {
    event.preventDefault();
    const text = messageText.trim();
    if (!text || isSending || (isAdmin && !recipientId)) return;

    setIsSending(true);
    const succeeded = isAdmin
      ? await replyToUser({ recipientId, text })
      : await addNewMessage(text);
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
      <Typography variant="h5">
        {isAdmin ? 'Nuevo mensaje para un empleado' : 'Enviar mensaje al administrador'}
      </Typography>
      <Typography color="text.secondary">
        {isAdmin
          ? 'Selecciona el correo del empleado al que quieres enviar el mensaje.'
          : 'Escribe una consulta o comunica una incidencia. El administrador recibirá tu mensaje.'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {sent && (
        <Alert severity="success">
          {isAdmin ? 'Mensaje enviado al empleado.' : 'Mensaje enviado al administrador.'}
        </Alert>
      )}
      {isAdmin && (
        <FormControl fullWidth required disabled={loadingEmployees || employees.length === 0}>
          <InputLabel id="new-message-recipient-label">Correo del empleado</InputLabel>
          <Select
            labelId="new-message-recipient-label"
            value={recipientId}
            label="Correo del empleado"
            onChange={(event) => setRecipientId(event.target.value)}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <TextField
        label={isAdmin ? 'Mensaje' : 'Tu mensaje'}
        variant="outlined"
        multiline
        minRows={4}
        required
        inputProps={{ maxLength: 2000 }}
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
      />
      {isAdmin && employees.length === 0 && !loadingEmployees && (
        <Alert severity="info">No hay empleados registrados para seleccionar.</Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSending || loadingEmployees || !messageText.trim() || (isAdmin && !recipientId)}
      >
        {isSending ? 'Enviando…' : 'Enviar mensaje'}
      </Button>
    </Stack>
  );
};
