
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, CalendarPage, CalendarLayoutPage, MessagesPage } from '../pages';


export const HomeRoutes = () => {
  return (
    
    <Routes>
        <Route path='/' element={ <CalendarLayoutPage /> } />
        <Route path='home' element={ <HomePage /> } />
        <Route path='calendar' element={ <CalendarPage /> } />
        <Route path='message' element={ <MessagesPage /> } />
        
        
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>

  )
}
