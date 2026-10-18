import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
    Badge,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';
import { useMessages } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';

export const MensageEvent = () => {
    const { t } = useTranslation('mensajesConductor');
    const { messages = [], isLoading, removeMessage } = useMessages();
    const { user } = useAuthStore();
    const { services = [], isLoading: areServicesLoading } = useSelector((state) => state.services || {});
    const isAdmin = user?.role === 'admin';
    const serviceNotes = isAdmin ? [] : services.flatMap((service) => [
        service.observaciones?.trim() && {
            id: `${service.id || service._id}-observation`,
            date: service.start,
            code: service.codigo,
            label: t('Observation'),
            text: service.observaciones.trim(),
        },
        service.incidentComment?.trim() && {
            id: `${service.id || service._id}-incident`,
            date: service.start,
            code: service.codigo,
            label: t('Incident'),
            text: service.incidentComment.trim(),
        },
    ].filter(Boolean));

    const [checkedMessages, setCheckedMessages] = useState(() => {
        const saved = localStorage.getItem('checkedMessages');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('checkedMessages', JSON.stringify(checkedMessages));
    }, [checkedMessages]);

    const handleCheckboxChange = (messageId) => {
        setCheckedMessages((previous) => ({
            ...previous,
            [messageId]: !previous[messageId],
        }));
    };

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 5, p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton aria-label={t('MessageCount', { count: messages.length + serviceNotes.length })}>
                    <Badge badgeContent={messages.length + serviceNotes.length} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <Typography variant="h5">{isAdmin ? t('AdminInbox') : t('Title')}</Typography>
            </Stack>

            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                {isLoading || (!isAdmin && areServicesLoading) ? (
                    <Typography variant="h6">{t('Loading')}</Typography>
                ) : (
                    <List sx={{ width: '100%' }}>
                        {messages.map((message) => (
                            <ListItem key={message.id} alignItems="flex-start">
                                {!isAdmin && (
                                    <ListItemIcon>
                                        <FormControlLabel
                                            control={<Checkbox checked={!!checkedMessages[message.id]} />}
                                            onChange={() => handleCheckboxChange(message.id)}
                                            label=""
                                        />
                                    </ListItemIcon>
                                )}
                                <ListItemIcon>
                                    <IconButton
                                        aria-label={t('DeleteMessage')}
                                        sx={{ color: 'error.main' }}
                                        onClick={() => removeMessage(message.id)}
                                    >
                                        <Icon className="fas fa-trash-alt" />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText
                                    primary={isAdmin
                                        ? `${message.user?.name || t('UnknownSender')} · ${format(new Date(message.date), 'dd-MM-yyyy HH:mm')}`
                                        : message.text}
                                    secondary={isAdmin ? message.text : undefined}
                                    secondaryTypographyProps={{ sx: { whiteSpace: 'pre-wrap' } }}
                                />
                            </ListItem>
                        ))}
                        {serviceNotes.map((note) => (
                            <ListItem key={note.id} alignItems="flex-start">
                                <ListItemText
                                    primary={`${note.label}${note.code ? ` · ${note.code}` : ''} · ${format(new Date(note.date), 'dd-MM-yyyy')}`}
                                    secondary={note.text}
                                    primaryTypographyProps={{ fontWeight: 600 }}
                                    secondaryTypographyProps={{ sx: { whiteSpace: 'pre-wrap' } }}
                                />
                            </ListItem>
                        ))}
                        {messages.length === 0 && serviceNotes.length === 0 && (
                            <ListItem>
                                <ListItemText primary={t('NoMessages')} />
                            </ListItem>
                        )}
                    </List>
                )}
            </Grid>
        </Grid>
    );
};
