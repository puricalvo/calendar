
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, CalendarPage, CalendarLayoutPage } from '../pages';

export const HomeRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={ <CalendarLayoutPage /> } />
        <Route path='home' element={ <HomePage /> } />
        <Route path='calendar' element={ <CalendarPage /> } />
        
        
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>

  )
}
