import { Link as RouterLink } from 'react-router-dom';
import {  Button, ButtonGroup, Grid,  Link,  TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";
import { Google } from '@mui/icons-material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}



export const LoginPage = () => {

  const {  t, i18n } = useTranslation('login');
  
  const changeLanguaje = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma de forma asincrónica 
  };

  const { startLogin, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );

  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });   
}

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])
  

  return (
    <AuthLayout title="Login">

      <form onSubmit={ loginSubmit }
            className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label={t('CreateAccount')} 
                    type="email" 
                    placeholder='...@google.com'
                    fullWidth 
                    name="loginEmail"
                    value={ loginEmail }
                    onChange={ onLoginInputChange }
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Contraseña" 
                    type="password" 
                    placeholder='Contraseña'
                    fullWidth
                    name="loginPassword"
                    value={ loginPassword }
                    onChange={ onLoginInputChange }

                  />
                </Grid>

                <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={ 12 } sm={ 6 }>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        value='Login'
                        fullWidth
                      >
                        Login
                      </Button>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        value='Login'
                        fullWidth
                      >
                        <Google />
                        <Typography sx={{ ml: 1 }}>Google</Typography>
                      </Button>
                    </Grid>
                    
                </Grid>
                 
                <Grid container direction="row" justifyContent="end">
                  <Link component={ RouterLink } color='inherit' to="/auth/register">
                      Crear cuenta
                  </Link>
                </Grid>

            </Grid>
          </form>

          
                <ButtonGroup  size="large" aria-label="Large button group"  >
                    
                    <Button onClick={() => changeLanguaje('es')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>ES</Button>
                    <Button onClick={() => changeLanguaje('fr')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>FR</Button>
                    <Button onClick={() => changeLanguaje('en')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>EN</Button>
                    <Button onClick={() => changeLanguaje('ca')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>CA</Button>
                </ButtonGroup>

    </AuthLayout>

          


    
  )
}
