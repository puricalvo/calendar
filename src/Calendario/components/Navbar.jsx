import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../hooks/useAuthStore';


import { Avatar, Button, ButtonGroup,  Divider,  Grid,  Icon,  IconButton, Link, Typography } from '@mui/material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Flag } from '@mui/icons-material';
import { useEffect } from 'react';



export const Navbar = () => {

  
  
  const { t, i18n } = useTranslation('navbar');
  
  const changeLanguaje = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma de forma asincrónica 
  };
  
  const { startLogout, user } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (user.role !== 'admin' || location.pathname !== '/home' || location.hash !== '#admin-inbox') return;
    document.getElementById('admin-inbox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash, location.pathname, user.role]);
    
  
 
  return (
     
   
        <Grid container 
          direction='row' 
          justifyContent='space-around' 
          alignItems='center'
          padding='2'
          sx={{
            display:'flex',
            flexwrap: 'wrap',
          }} 
        >
          

                <Grid size={{ xs:12, md: 2,  }} sx={{ flexGrow: 'auto',}} >
                  
                  
                    <IconButton size='large'>
                      <AirportShuttleIcon color='error' sx={{fontSize: '3rem',  }}/> 
                    </IconButton>
                </Grid>

                <Grid size={{ xs: 12, md: 4,  }} sx={{ flexGrow: 'auto', display: {  md: "inline-flex" } }} >
                  <Typography variant='h2'  component='div' sx={{fontFamily:'serif', color:'GrayText' }}>
                     {t('Welcome')}
                    <Typography variant='h4' component='span' sx={{ color:'black'}}>{ user.name }</Typography>
                  <Typography variant='h5'component='p' noWrap color='error'>
                  {t('subtitle1')}
                  </Typography>
                  </Typography>
                  <Divider/>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6,}} sx={{ flexGrow: 'auto',  }} > 
                    <Button
                      component={RouterLink}
                      to="/message"
                      aria-label={user.role === 'admin' ? 'Enviar mensaje a un empleado' : 'Enviar mensaje al administrador'}
                      variant="text"
                      color="error"
                      sx={{ mr: 0, ml: '2px' }}
                    >
                      <MailOutlineIcon sx={{ fontSize: '2rem', display: { md: 'inline-flex' } }} />
                    </Button>
                    <Button variant="text"  color="error"sx={{ mr: 0, ml: '-2px', mt: 1}}><SearchIcon sx={{fontSize: '2rem', display: {  md: "inline-flex" }}} /></Button>
                    <Button  
                      variant="text" 
                      color="error"
                      onClick={ startLogout } 
                      sx={{ fontSize: '1rem', mr: 0, ml: '-2px'}}>
                      {t('Button')}
                        
                    </Button>
                <ButtonGroup  size="large" aria-label="Large button group" >
                    <Icon><Flag color='error'/></Icon>
                    <Button onClick={() => changeLanguaje('es')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>ES</Button>
                    <Button onClick={() => changeLanguaje('fr')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>FR</Button>
                    <Button onClick={() => changeLanguaje('en')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>EN</Button>
                    <Button onClick={() => changeLanguaje('ca')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>CA</Button>
                </ButtonGroup>
                    <Button 
                      variant="text" 
                      color="error">
                        <Link component={ RouterLink } color='inherit' to="/calendar">   
                        <Avatar alt="PC" src="" sx={{ width: 56, height: 56 , backgroundColor: 'error.main'}}/>
                        </Link>
                    </Button>
                
                  </Grid>    
        </Grid>
  )
}

