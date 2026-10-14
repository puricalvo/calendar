import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { calendarApi } from '../../api';
import { Navbar } from '../components/Navbar';

const initialService = {
    dayType: 'service',
    start: new Date().toISOString().slice(0, 10),
    salCoche: '',
    hInicio: '',
    hFinal: '',
    entCoche: '',
    autobus: '',
    matricula: '',
    tipoServicio: '',
    codigo: '',
    lInicio: '',
    lFinal: '',
    observaciones: '',
};

const serviceFields = [
    ['salCoche', 'Salida de coche'],
    ['hInicio', 'Hora de inicio'],
    ['hFinal', 'Hora final'],
    ['entCoche', 'Entrada de coche'],
    ['autobus', 'Autobús'],
    ['matricula', 'Matrícula'],
    ['tipoServicio', 'Tipo de servicio'],
    ['codigo', 'Código'],
    ['lInicio', 'Lugar de inicio'],
    ['lFinal', 'Lugar final'],
    ['observaciones', 'Observaciones'],
];

export const AdminServicesPage = () => {
    const [users, setUsers] = useState([]);
    const [assignedTo, setAssignedTo] = useState('');
    const [service, setService] = useState(initialService);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        let active = true;
        calendarApi.get('/auth/users')
            .then(({ data }) => {
                if (!active) return;
                setUsers(data.usuarios || []);
                setAssignedTo(data.usuarios?.[0]?.id || '');
            })
            .catch((requestError) => {
                console.error('Error al cargar los empleados:', requestError);
                if (active) {
                    setError(requestError.response?.data?.msg || 'No se pudieron cargar los empleados.');
                }
            })
            .finally(() => {
                if (active) setLoadingUsers(false);
            });
        return () => { active = false; };
    }, []);

    const handleChange = ({ target }) => {
        setService((current) => ({ ...current, [target.name]: target.value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!assignedTo) {
            setError('Selecciona un empleado.');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                assignedTo,
                dayType: service.dayType,
                start: service.start,
                end: service.start,
                ...(service.dayType === 'rest' ? {} : {
                    ...service,
                    autobus: service.autobus === '' ? undefined : Number(service.autobus),
                }),
            };
            await calendarApi.post('/services', payload);
            setSuccess('El registro se ha guardado correctamente.');
            setService({ ...initialService, start: service.start });
        } catch (requestError) {
            console.error('Error al guardar el servicio:', requestError);
            setError(requestError.response?.data?.msg || 'No se pudo guardar el registro.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box sx={{ px: { xs: 2, md: 5 }, pb: 5 }}>
            <Navbar />
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto', mt: 3 }}>
                <Stack spacing={2.5}>
                    <Typography variant="h4">Crear servicios</Typography>
                    <Typography color="text.secondary">
                        Asigna un servicio o registra un día de descanso para un empleado.
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}

                    <FormControl fullWidth required disabled={loadingUsers || users.length === 0}>
                        <InputLabel id="assigned-user-label">Empleado</InputLabel>
                        <Select
                            labelId="assigned-user-label"
                            value={assignedTo}
                            label="Empleado"
                            onChange={(event) => setAssignedTo(event.target.value)}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            name="start"
                            label="Fecha"
                            type="date"
                            value={service.start}
                            onChange={handleChange}
                            required
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="day-type-label">Tipo de día</InputLabel>
                            <Select
                                labelId="day-type-label"
                                name="dayType"
                                value={service.dayType}
                                label="Tipo de día"
                                onChange={handleChange}
                            >
                                <MenuItem value="service">Servicio</MenuItem>
                                <MenuItem value="rest">Descanso</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    {service.dayType === 'service' && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            {serviceFields.map(([name, label]) => (
                                <TextField
                                    key={name}
                                    name={name}
                                    label={label}
                                    type={name === 'hInicio' || name === 'hFinal' ? 'time' : 'text'}
                                    value={service[name]}
                                    onChange={handleChange}
                                    multiline={name === 'observaciones'}
                                    minRows={name === 'observaciones' ? 2 : undefined}
                                    InputLabelProps={
                                        name === 'hInicio' || name === 'hFinal' ? { shrink: true } : undefined
                                    }
                                />
                            ))}
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={saving || loadingUsers || users.length === 0}
                    >
                        {saving ? 'Guardando…' : service.dayType === 'rest' ? 'Guardar descanso' : 'Guardar servicio'}
                    </Button>
                    {users.length === 0 && !loadingUsers && (
                        <Alert severity="info">Todavía no hay empleados registrados.</Alert>
                    )}
                    <Button component={RouterLink} to="/home" variant="text" sx={{ alignSelf: 'flex-start' }}>
                        Volver al panel
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};
