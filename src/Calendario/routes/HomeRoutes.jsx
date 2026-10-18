import { Navigate, Route, Routes } from 'react-router-dom';
import {
    HomePage,
    CalendarPage,
    CalendarLayoutPage,
    MessagesPage,
    AdminServicesPage,
} from '../pages';
import { useAuthStore } from '../../hooks';

export const HomeRoutes = () => {
    const { user } = useAuthStore();

    return (
        <Routes>
            <Route
                path="/"
                element={user.role === 'admin' ? <Navigate to="/home" replace /> : <CalendarLayoutPage />}
            />
            <Route path="home" element={<HomePage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route
                path="message"
                element={user.role === 'user' ? <MessagesPage /> : <Navigate to="/home" replace />}
            />
            <Route
                path="admin/services"
                element={user.role === 'admin' ? <AdminServicesPage /> : <Navigate to="/home" replace />}
            />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};
