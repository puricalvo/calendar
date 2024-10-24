import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { es, fr, ca, enUS } from 'date-fns/locale';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CalendarToday } from '@mui/icons-material';
import { Grid, Typography, Paper } from '@mui/material';
import { useServices } from "../../hooks"; // Aquí asumo que usas useServices para cargar los datos

export const Card = () => {
    const { t, i18n } = useTranslation('cardList');
    const { services = [], isLoading } = useServices();  // Obteniendo services y isLoading

    const getDateFnsLocale = (lng) => {
        switch (lng) {
            case 'es': return es;
            case 'en': return enUS;
            case 'fr': return fr;
            case 'ca': return ca;
            default: return enUS;
        }
    };

    const today = new Date();
    const formattedDate = format(today, 'dd-MM-yy', { locale: getDateFnsLocale(i18n.language) });

    return (
        <Grid container direction='row' justifyContent="space-around" alignItems="center" sx={{ mb: 0, border: 1, xs: 12, sm: 6, borderColor: 'red', mt: 1, p: 0 }}>
            <Typography variant="h4">{t('Servicios')}{services.length > 0 && services[0].codigo ? `. ${services[0].codigo}` : null}</Typography>
            <Typography variant="h5" letterSpacing={2}>
                <CalendarToday color="error" fontSize="large" />
                <Typography variant="body1" component="span" sx={{ textAlign: "center" }}>{formattedDate}</Typography>
            </Typography>

            <TableContainer component={Paper}>
                {/* Mostrar "Cargando..." mientras se cargan los datos */}
                {isLoading ? (
                    <Typography variant="h6">Cargando...</Typography>
                ) : (
                    <Table  sx={{ p: 2, mt: 2, tableLayout: 'fixed', borderBottom: "none", minWidth: 650, minHeight: 200, border: 0 }}>
                        {/* Títulos de la tabla */}
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{t('SAL.COCHE')}</TableCell>
                                <TableCell align="left">{t('H.INICIO')}</TableCell>
                                <TableCell align="left">{t('H.FINAL')}</TableCell>
                                <TableCell align="left">{t('ENT.COCHE')}</TableCell>
                                <TableCell align="left">{t('AUTOBUS')}</TableCell>
                                <TableCell align="left">{t('MATRICULA')}</TableCell>
                                <TableCell align="left">{t('TIPO.SERVICIO')}</TableCell>
                                <TableCell align="left">{t('CODIGO')}</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {/* Mostrar los datos de los servicios si existen */}
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <TableRow key={`${service.id}-${index}`}>
                                        <TableCell align="left">{service.salCoche}</TableCell>
                                        <TableCell align="left">{service.hInicio}</TableCell>
                                        <TableCell align="left">{service.hFinal}</TableCell>
                                        <TableCell align="left">{service.entCoche}</TableCell>
                                        <TableCell align="left">{service.autobus}</TableCell>
                                        <TableCell align="left">{service.matricula}</TableCell>
                                        <TableCell align="left">{service.tipoServicio}</TableCell>
                                        <TableCell align="left">{service.codigo}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                // Mensaje cuando no hay servicios disponibles
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography variant="h6">No hay servicios disponibles.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                        {/* Segunda parte de la tabla */}
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{t('L.INICIO')}</TableCell>
                                <TableCell align="center" colSpan={2}>{t('L.FINAL')}</TableCell>
                                <TableCell align="center" colSpan={5}>{t('Observaciones')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <TableRow key={`${service.id}-${index}`}>
                                        <TableCell align="left">{service.lInicio || 'Sin datos'}</TableCell>
                                        <TableCell align="center" colSpan={2}>{service.lFinal || 'Sin datos'}</TableCell>
                                        <TableCell align="center" colSpan={5}>{service.observaciones || 'Sin datos'}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography variant="h6">No hay servicios disponibles.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Grid>
    );
};


