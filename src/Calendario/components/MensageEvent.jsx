import { useEffect, useState } from 'react';
import { calendarApi } from '../../api';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
    Alert,
    Badge,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useTranslation } from 'react-i18next';
import { useMessages } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';

export const MensageEvent = () => {
    const { t } = useTranslation('mensajesConductor');
    const { messages = [], isLoading, removeMessage, replyToUser, loadMessages } = useMessages();
    const { user } = useAuthStore();
    const { services = [], isLoading: areServicesLoading } = useSelector((state) => state.services || {});
    const isAdmin = user?.role === 'admin';
    const [employees, setEmployees] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(false);
    const [replyOpen, setReplyOpen] = useState(false);
    const [recipientId, setRecipientId] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replying, setReplying] = useState(false);
    const [replyError, setReplyError] = useState('');
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

    useEffect(() => {
        if (!isAdmin) return undefined;

        let active = true;
        setEmployeesLoading(true);
        calendarApi.get('/auth/users')
            .then(({ data }) => {
                if (active) setEmployees(data.usuarios || []);
            })
            .catch((error) => {
                console.error('Error al cargar los empleados para responder:', error);
                if (active) setReplyError(error.response?.data?.msg || t('EmployeeListError'));
            })
            .finally(() => {
                if (active) setEmployeesLoading(false);
            });
        return () => { active = false; };
    }, [isAdmin, t]);

    const openReply = (message) => {
        const senderId = message.user?.id || message.user?._id || '';
        setRecipientId(senderId);
        setReplyText('');
        setReplyError('');
        setReplyOpen(true);
    };

    const handleReply = async () => {
        const text = replyText.trim();
        if (!recipientId || !text || replying) return;

        setReplying(true);
        setReplyError('');
        const sent = await replyToUser({ recipientId, text });
        if (sent) {
            setReplyOpen(false);
            await loadMessages();
        } else {
            setReplyError(t('ReplyError'));
        }
        setReplying(false);
    };

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
                                {isAdmin && (
                                    <Button size="small" onClick={() => openReply(message)}>
                                        {t('Reply')}
                                    </Button>
                                )}
                                <ListItemText
                                    primary={isAdmin
                                        ? `${message.user?.name || t('UnknownSender')} · ${format(new Date(message.date), 'dd-MM-yyyy HH:mm')}`
                                        : `${message.user?.name ? `${message.user.name} · ` : ''}${message.text}`}
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
            <Dialog open={replyOpen} onClose={() => !replying && setReplyOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{t('ReplyTitle')}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {replyError && <Alert severity="error">{replyError}</Alert>}
                        <FormControl fullWidth required disabled={employeesLoading || employees.length === 0}>
                            <InputLabel id="reply-recipient-label">{t('Recipient')}</InputLabel>
                            <Select
                                labelId="reply-recipient-label"
                                value={recipientId}
                                label={t('Recipient')}
                                onChange={(event) => setRecipientId(event.target.value)}
                            >
                                {employees.map((employee) => (
                                    <MenuItem key={employee.id} value={employee.id}>
                                        {employee.email}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            required
                            multiline
                            minRows={4}
                            label={t('ReplyMessage')}
                            value={replyText}
                            onChange={(event) => setReplyText(event.target.value)}
                            inputProps={{ maxLength: 2000 }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReplyOpen(false)} disabled={replying}>{t('Cancel')}</Button>
                    <Button
                        onClick={handleReply}
                        variant="contained"
                        disabled={replying || employeesLoading || employees.length === 0 || !recipientId || !replyText.trim()}
                    >
                        {replying ? t('Sending') : t('SendReply')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
