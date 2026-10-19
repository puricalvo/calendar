import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { ExpandMore, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { addDays, addWeeks, format, startOfWeek, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';
import { calendarApi } from '../../api';
import { DatePike } from '../components';
import { ServiceCard } from '../components/Card';
import { MensageEvent } from '../components/MensageEvent';

const serviceDateKey = (value) => (
    typeof value === 'string' ? value.slice(0, 10) : new Date(value).toISOString().slice(0, 10)
);

export const AdminDashboard = () => {
    const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [incidentComment, setIncidentComment] = useState('');
    const [savingComment, setSavingComment] = useState(false);
    const weekKey = format(weekStart, 'yyyy-MM-dd');
    const weekEnd = addDays(weekStart, 6);

    const loadDashboard = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [usersResponse, servicesResponse] = await Promise.all([
                calendarApi.get('/auth/users'),
                calendarApi.get('/services/admin/all', { params: { week: weekKey } }),
            ]);
            if (!Array.isArray(usersResponse.data?.usuarios) || !Array.isArray(servicesResponse.data?.servicios)) {
                throw new Error('El servidor devolvió datos incompletos para el panel.');
            }
            setUsers(usersResponse.data.usuarios);
            setServices(servicesResponse.data.servicios);
        } catch (requestError) {
            console.error('Error al cargar el panel de administración:', requestError);
            setError(requestError.response?.data?.msg || requestError.message || 'No se pudo cargar el panel.');
        } finally {
            setLoading(false);
        }
    }, [weekKey]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const servicesByUser = useMemo(() => {
        const grouped = new Map(users.map((user) => [user.id, []]));
        services.forEach((service) => {
            const assignedUser = service.assignedTo;
            const assignedId = typeof assignedUser === 'string'
                ? assignedUser
                : assignedUser?.id || assignedUser?._id;
            if (assignedId && grouped.has(assignedId)) {
                grouped.get(assignedId).push(service);
            }
        });
        return grouped;
    }, [services, users]);

    const handleDelete = async (service) => {
        if (service.dayType !== 'rest' && !service.completed) {
            return;
        }
        const result = await Swal.fire({
            title: '¿Eliminar este registro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        });
        if (!result.isConfirmed) return;

        try {
            await calendarApi.delete(`/services/${service.id || service._id}`);
            setServices((current) => current.filter(
                (item) => (item.id || item._id) !== (service.id || service._id)
            ));
        } catch (requestError) {
            console.error('Error al eliminar el servicio:', requestError);
            Swal.fire('Error', requestError.response?.data?.msg || 'No se pudo eliminar el registro.', 'error');
        }
    };

    const toggleCompleted = async (service) => {
        const serviceId = service.id || service._id;
        try {
            await calendarApi.patch(`/services/admin/${serviceId}/completed`, {
                completed: !service.completed,
            });
            setServices((current) => current.map((item) => (
                (item.id || item._id) === serviceId
                    ? { ...item, completed: !service.completed }
                    : item
            )));
        } catch (requestError) {
            console.error('Error al actualizar el estado del servicio:', requestError);
            Swal.fire('Error', requestError.response?.data?.msg || 'No se pudo actualizar el estado.', 'error');
        }
    };

    const openIncidentDialog = (service) => {
        setEditingService(service);
        setIncidentComment(service.incidentComment || '');
    };

    const saveIncident = async () => {
        setSavingComment(true);
        try {
            const serviceId = editingService.id || editingService._id;
            await calendarApi.patch(`/services/admin/${serviceId}/incident`, { incidentComment });
            setServices((current) => current.map((service) => (
                (service.id || service._id) === serviceId
                    ? { ...service, incidentComment }
                    : service
            )));
            setEditingService(null);
        } catch (requestError) {
            console.error('Error al guardar la incidencia:', requestError);
            Swal.fire('Error', requestError.response?.data?.msg || 'No se pudo guardar el comentario.', 'error');
        } finally {
            setSavingComment(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 1320,
                mx: 'auto',
                mt: { xs: 2, md: 4 },
                px: { xs: 2, md: 4 },
                pb: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent="space-between"
                spacing={1}
            >
                <Box>
                    <Typography variant="h4">Panel de administración</Typography>
                    <Typography color="text.secondary">
                        Empleados y servicios asignados para la semana.
                    </Typography>
                </Box>
                <Button
                    component={RouterLink}
                    to="/admin/services"
                    variant="contained"
                    sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
                >
                    Crear servicios
                </Button>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(280px, 360px) minmax(0, 1fr)' },
                    alignItems: 'start',
                    gap: 2,
                    minWidth: 0,
                }}
            >
                <Box sx={{ minWidth: 0, display: 'flex', justifyContent: 'center' }}>
                    <DatePike />
                </Box>
                <Stack spacing={2} sx={{ minWidth: 0, width: '100%' }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                        <IconButton aria-label="Semana anterior" onClick={() => setWeekStart((date) => subWeeks(date, 1))}>
                            <NavigateBefore />
                        </IconButton>
                        <Typography variant="subtitle1">
                            {format(weekStart, 'd MMM', { locale: es })} – {format(weekEnd, 'd MMM yyyy', { locale: es })}
                        </Typography>
                        <IconButton aria-label="Semana siguiente" onClick={() => setWeekStart((date) => addWeeks(date, 1))}>
                            <NavigateNext />
                        </IconButton>
                    </Stack>

                {error && <Alert severity="error">{error}</Alert>}
                {loading ? (
                    <Typography role="status">Cargando empleados y servicios…</Typography>
                ) : users.length === 0 ? (
                    <Alert severity="info">No hay empleados registrados.</Alert>
                ) : (
                    <Stack spacing={1}>
                        {users.map((user) => {
                            const userServices = servicesByUser.get(user.id) || [];
                            return (
                                <Accordion key={user.id} defaultExpanded>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        <Box>
                                            <Typography variant="h6">{user.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {userServices.length === 0 ? (
                                            <Typography color="text.secondary">
                                                No tiene servicios ni descansos asignados esta semana.
                                            </Typography>
                                        ) : (
                                            <Stack spacing={2}>
                                                {userServices.map((service) => {
                                                    const date = new Date(service.start);
                                                    const isRest = service.dayType === 'rest';
                                                    return (
                                                        <Box
                                                            key={service.id || service._id}
                                                            sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}
                                                        >
                                                            <Stack
                                                                direction={{ xs: 'column', sm: 'row' }}
                                                                alignItems={{ sm: 'center' }}
                                                                justifyContent="space-between"
                                                                spacing={1}
                                                            >
                                                                <Typography fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                                                                    {format(date, 'EEEE d MMMM yyyy', { locale: es })}
                                                                    {isRest ? ' · Descanso' : ''}
                                                                </Typography>
                                                                <Stack direction="row" spacing={1}>
                                                                    {!isRest && (
                                                                        <Button size="small" onClick={() => openIncidentDialog(service)}>
                                                                            {service.incidentComment ? 'Editar incidencia' : 'Añadir incidencia'}
                                                                        </Button>
                                                                    )}
                                                                    {!isRest && (
                                                                        <Button
                                                                            size="small"
                                                                            color={service.completed ? 'success' : 'primary'}
                                                                            onClick={() => toggleCompleted(service)}
                                                                        >
                                                                            {service.completed ? 'Marcar pendiente' : 'Marcar completado'}
                                                                        </Button>
                                                                    )}
                                                                    <Button
                                                                        size="small"
                                                                        color="error"
                                                                        disabled={!isRest && !service.completed}
                                                                        onClick={() => handleDelete(service)}
                                                                    >
                                                                        {isRest
                                                                            ? 'Eliminar descanso'
                                                                            : service.completed ? 'Eliminar completado' : 'Completa para eliminar'}
                                                                    </Button>
                                                                </Stack>
                                                            </Stack>
                                                            {isRest ? (
                                                                <Typography color="success.dark" sx={{ mt: 1 }}>
                                                                    Descanso
                                                                </Typography>
                                                            ) : (
                                                                <>
                                                                    <ServiceCard
                                                                        service={service}
                                                                        date={date}
                                                                        t={(key) => key}
                                                                        locale={es}
                                                                    />
                                                                </>
                                                            )}
                                                        </Box>
                                                    );
                                                })}
                                            </Stack>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </Stack>
                )}
                </Stack>
            </Box>

            <Box id="admin-inbox" sx={{ scrollMarginTop: 2 }}>
                <MensageEvent />
            </Box>

            <Dialog open={Boolean(editingService)} onClose={() => !savingComment && setEditingService(null)} fullWidth maxWidth="sm">
                <DialogTitle>Comentario de incidencia</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        multiline
                        minRows={4}
                        margin="dense"
                        label="Comentario visible para el empleado"
                        value={incidentComment}
                        onChange={(event) => setIncidentComment(event.target.value)}
                        inputProps={{ maxLength: 1000 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditingService(null)} disabled={savingComment}>Cancelar</Button>
                    <Button onClick={saveIncident} variant="contained" disabled={savingComment}>
                        {savingComment ? 'Guardando…' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
