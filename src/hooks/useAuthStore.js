import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";



export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth', { email, password } )
            localStorage.setItem('token', data.token );   
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid, role: data.role }) );

        } catch (error) {
           const validationErrors = error.response?.data?.errors;
           const validationMessage = validationErrors
               ? Object.values(validationErrors)[0]?.msg
               : undefined;
           dispatch( onLogout(
               error.response?.data?.msg
               || validationMessage
               || error.message
               || 'No se pudo iniciar sesión'
           ) );
           setTimeout( () => {
            dispatch( clearErrorMessage() );
           }, 2000); 
        }
    }

    // Funciones del Registro

    const startRegister = async({ email, password, name }) => {
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name } )
            localStorage.setItem('token', data.token );   
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid, role: data.role }) );

        } catch (error) {
           const validationErrors = error.response?.data?.errors;
           const validationMessage = validationErrors
               ? Object.values(validationErrors)[0]?.msg
               : undefined;
           dispatch( onLogout(
               error.response?.data?.msg
               || validationMessage
               || error.message
               || 'No se pudo completar el registro'
           ) );
           setTimeout( () => {
            dispatch( clearErrorMessage() );
           }, 2000); 
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token );   
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid, role: data.role }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }


    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout());
    }





    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 
        
        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}