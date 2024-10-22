import { Link as RouterLink } from 'react-router-dom';
import {   Button, ButtonGroup, Grid,  Icon,  Link,  TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";
import Swal from 'sweetalert2';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Flag } from '@mui/icons-material';
import {es,fr, ca, enUS} from 'date-fns/locale';

const registerFormFields = {
   registerName: '',
   registerEmail: '',
   registerPassword: '',
   registerPassword2: '',

}

const localesMap = {
  es: es,
  fr: fr,
  ca: ca,
  en: enUS
}



export const RegisterPage = () => {

  const {  t, i18n } = useTranslation('register');
  console.log('Current Language:', i18n.language);
  console.log('Translations:', i18n.getFixedT()('Createaccount'));
  
  const changeLanguaje = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma de forma asincrónica 
  };

  const { errorMessage, startRegister } = useAuthStore();
   const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } =  useForm( registerFormFields );

   const registerSubmit = ( event ) => {
    event.preventDefault();
    if ( registerPassword !== registerPassword2 ) {
        Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
        return;
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  }

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])

  const locale = localesMap[i18n.changeLanguage] || localesMap['en'];
  
  return (

    <Suspense fallback={<div>Loading translations...</div>}>
                <AuthLayout title={t('Createaccount')}>
                <ButtonGroup  size="large" aria-label="Large button group"  >
                    <Icon><Flag color='error'/></Icon>
                    <Button onClick={() => changeLanguaje('es')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>ES</Button>
                    <Button onClick={() => changeLanguaje('fr')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>FR</Button>
                    <Button onClick={() => changeLanguaje('en')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>EN</Button>
                    <Button onClick={() => changeLanguaje('ca')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>CA</Button>
                </ButtonGroup>
              
           
      <form  onSubmit={ registerSubmit } 
            className="animate__animated animate__fadeIn animate__faster"
      >
            <Grid container>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label={t('Name')} 
                    type="text" 
                    placeholder={t('Name')}
                    fullWidth
                    name="registerName"
                    value={ registerName }
                    onChange={ onRegisterInputChange }
                    locale={locale}
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label={t('Mail')} 
                    type="email" 
                    placeholder={t('Email')}
                    fullWidth
                    name="registerEmail"
                    value={ registerEmail }
                    onChange={ onRegisterInputChange }
                    locale={locale}
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label={t('Password')} 
                    type="password" 
                    placeholder={t('Password')}
                    fullWidth 
                    name="registerPassword"
                    value={ registerPassword }
                    onChange={ onRegisterInputChange }
                    locale={locale} 
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label={t('Password')} 
                    type="password" 
                    placeholder={t('Password1')}
                    fullWidth 
                    name="registerPassword2"
                    value={ registerPassword2 }
                    onChange={ onRegisterInputChange } 
                    locale={locale}
                  />
                </Grid>

                 <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={ 12 }>
                      <Button
                        type="submit" 
                        variant="contained" 
                        fullWidth
                      >
                        {t('Createaccount')}
                      </Button>
                    </Grid> 
                 </Grid> 
                 
                <Grid container direction="row" justifyContent="end">
                  <Typography sx={{ mr: 1 }}>{t('Alreadyhaveanaccount?')}</Typography>
                  <Link component={ RouterLink } color='inherit' to="/auth/login">
                     {t('enter')}
                  </Link>
                    
                  

                </Grid>

            </Grid>


          </form>
    </AuthLayout>

    </Suspense>       


    
  )
}
