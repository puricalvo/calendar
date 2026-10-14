import { useMemo, useState } from 'react';
import { addDays, addWeeks, format, startOfWeek, subWeeks } from 'date-fns';
import { es, fr, ca, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Card as MuiCard,
    CardContent,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { CalendarToday, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useServices } from '../../hooks';

const getLocale = (language) => {
    switch (language) {
        case 'es': return es;
        case 'fr': return fr;
        case 'ca': return ca;
        default: return enUS;
    }
};

const getServiceDateKey = (value) => (
    typeof value === 'string' ? value.slice(0, 10) : new Date(value).toISOString().slice(0, 10)
);

export const ServiceCard = ({ service, date, t, locale }) => (
    <Box sx={{ border: 1, borderColor: 'error.main', mt: 1, p: 1, minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography variant="h6">
                {t('Servicios')}{service.codigo ? `. ${service.codigo}` : ''}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flexShrink: 0 }}>
                <CalendarToday color="error" fontSize="small" />
                <Typography variant="body2">{format(date, 'dd-MM-yy', { locale })}</Typography>
            </Stack>
        </Stack>

        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('SAL.COCHE')}</TableCell>
                        <TableCell>{t('H.INICIO')}</TableCell>
                        <TableCell>{t('H.FINA')}</TableCell>
                        <TableCell>{t('ENT.COCHE')}</TableCell>
                        <TableCell>{t('AUTOBUS')}</TableCell>
                        <TableCell>{t('MATRICULA')}</TableCell>
                        <TableCell>{t('TIPO SERVICIO')}</TableCell>
                        <TableCell>{t('CODIGO')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{service.salCoche || '—'}</TableCell>
                        <TableCell>{service.hInicio || '—'}</TableCell>
                        <TableCell>{service.hFinal || '—'}</TableCell>
                        <TableCell>{service.entCoche || '—'}</TableCell>
                        <TableCell>{service.autobus || '—'}</TableCell>
                        <TableCell>{service.matricula || '—'}</TableCell>
                        <TableCell>{service.tipoServicio || '—'}</TableCell>
                        <TableCell>{service.codigo || '—'}</TableCell>
                    </TableRow>
                </TableBody>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('L.INICIO')}</TableCell>
                        <TableCell colSpan={2}>{t('L.FINAL')}</TableCell>
                        <TableCell colSpan={5}>{t('Observaciones')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{service.lInicio || 'Sin datos'}</TableCell>
                        <TableCell colSpan={2}>{service.lFinal || 'Sin datos'}</TableCell>
                        <TableCell colSpan={5}>{service.observaciones || 'Sin datos'}</TableCell>
                    </TableRow>
                    {service.incidentComment && (
                        <TableRow>
                            <TableCell colSpan={8}>
                                <Typography color="warning.dark">
                                    <strong>{t('Incident')}:</strong> {service.incidentComment}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
);

export const Card = () => {
    const { t, i18n } = useTranslation('cardList');
    const locale = getLocale(i18n.language);
    const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
    const weekStartKey = format(weekStart, 'yyyy-MM-dd');
    const weekEnd = addDays(weekStart, 6);
    const { services, isLoading } = useServices(weekStartKey);

    const days = useMemo(
        () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
        [weekStart]
    );

    return (
        <Stack spacing={1.5} sx={{ width: '100%', minWidth: 0 }}>
            <Typography variant="h6">{t('WeeklySchedule')}</Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <IconButton aria-label={t('PreviousWeek')} onClick={() => setWeekStart((date) => subWeeks(date, 1))}>
                    <NavigateBefore />
                </IconButton>
                <Typography variant="subtitle2">
                    {format(weekStart, 'd MMM', { locale })} – {format(weekEnd, 'd MMM yyyy', { locale })}
                </Typography>
                <IconButton aria-label={t('NextWeek')} onClick={() => setWeekStart((date) => addWeeks(date, 1))}>
                    <NavigateNext />
                </IconButton>
            </Stack>

            {isLoading ? (
                <Typography role="status">{t('Loading')}</Typography>
            ) : (
                <Stack spacing={1.5}>
                    {days.map((day) => {
                        const dayKey = format(day, 'yyyy-MM-dd');
                        const dayRecords = services.filter((service) => getServiceDateKey(service.start) === dayKey);
                        const restRecord = dayRecords.find((record) => record.dayType === 'rest');
                        const dayServices = dayRecords.filter((record) => record.dayType !== 'rest');

                        return (
                            <Box key={dayKey}>
                                <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                                    {format(day, 'EEEE d MMMM', { locale })}
                                </Typography>
                                {restRecord ? (
                                    <Box sx={{ border: 1, borderColor: 'success.main', bgcolor: 'success.50', mt: 1, p: 2 }}>
                                        <Typography color="success.dark" fontWeight={600}>{t('Rest')}</Typography>
                                    </Box>
                                ) : dayServices.length > 0 ? (
                                    <Stack spacing={1}>
                                        {dayServices.map((service) => (
                                            <ServiceCard
                                                key={service.id}
                                                service={service}
                                                date={day}
                                                t={t}
                                                locale={locale}
                                            />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Box sx={{ border: 1, borderColor: 'divider', mt: 1, p: 1.5 }}>
                                        <Typography color="text.secondary">{t('Unplanned')}</Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </Stack>
    );
};
