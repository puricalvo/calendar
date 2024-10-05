import { Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Button, ButtonGroup, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';




export const TareaMes = () => {

    const { t, i18n } = useTranslation('navbar');
    const changeLanguaje = (lng) => {
        i18n.changeLanguage(lng); // Cambia el idioma de forma asincrónica 
      };

    const { user } = useAuthStore();


  return (
    <div className="navbar navbar-dark bg-danger  mb-4 px-4">
        <span className="navbar-brand" >
            <i>
                <CalendarMonthIcon/>
            </i>
            { user.name }
        </span>

                <ButtonGroup  size="large" aria-label="Large button group"  >
                    <Button onClick={() => changeLanguaje('es')} variant="text"  sx={{fontSize: '1rem', backgroundColor: 'white', border: 1}}>ES</Button>
                    <Button variant="text"  sx={{fontSize: '1rem', backgroundColor: 'white', border: 1}}>CA</Button>
                    <Button onClick={() => changeLanguaje('en')} variant="text"  sx={{fontSize: '1rem', backgroundColor: 'white', border: 1}}>EN</Button>
                    <Button variant="text"  sx={{fontSize: '1rem', backgroundColor: 'white', border: 1}}>FR</Button>
                </ButtonGroup>

        <button className="btn btn-outline-danger bg-white">
        <Link component={ RouterLink } color='inherit' to="/">
            <i>< LogoutIcon/></i>
            <span>{t('Next')}</span>
        </Link>
        </button>
    </div>
  )
}
