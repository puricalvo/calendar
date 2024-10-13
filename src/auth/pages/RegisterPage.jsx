import { Link as RouterLink } from 'react-router-dom';
import {  Box, Button, ButtonGroup, Grid,  Icon,  Link,  TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Flag } from '@mui/icons-material';


const registerFormFields = {
   registerName: '',
   registerEmail: '',
   registerPassword: '',
   registerPassword2: '',

}



export const RegisterPage = () => {

  const {  t, i18n } = useTranslation('register');
  
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
  
  return (
                <AuthLayout title="Crear cuenta">
            <Grid container direction='row' 
                  justifyContent='space-between' 
                  alignItems='center'
                  padding='2'
                  sx={{
                    display:'flex',
                    flexwrap: 'wrap',
                  }} 
            >
                <ButtonGroup  size="large" aria-label="Large button group"  >
                    <Icon><Flag color='error'/></Icon>
                    <Button onClick={() => changeLanguaje('es')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>ES</Button>
                    <Button onClick={() => changeLanguaje('fr')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>FR</Button>
                    <Button onClick={() => changeLanguaje('en')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>EN</Button>
                    <Button onClick={() => changeLanguaje('ca')} variant="text"  sx={{fontSize: '1rem', color: 'GrayText'}}>CA</Button>
                </ButtonGroup>
              </Grid>
      <form  onSubmit={ registerSubmit } 
            className="animate__animated animate__fadeIn animate__faster"
      >
            <Grid container>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Nombre completo" 
                    type="text" 
                    placeholder={t('Name')}
                    fullWidth
                    name="registerName"
                    value={ registerName }
                    onChange={ onRegisterInputChange }
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="correo@google.com"
                    fullWidth
                    name="registerEmail"
                    value={ registerEmail }
                    onChange={ onRegisterInputChange }

                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Contraseña" 
                    type="password" 
                    placeholder={t('Password')}
                    fullWidth 
                    name="registerPassword"
                    value={ registerPassword }
                    onChange={ onRegisterInputChange } 
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Contraseña" 
                    type="password" 
                    placeholder={t('Password1')}
                    fullWidth 
                    name="registerPassword2"
                    value={ registerPassword2 }
                    onChange={ onRegisterInputChange } 
                  />
                </Grid>

                 <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                    <Grid item xs={ 12 }>
                      <Button
                        type="submit" 
                        variant="contained" 
                        fullWidth
                      >
                        Crear cuenta
                      </Button>
                    </Grid> 
                 </Grid> 
                 
                <Grid container direction="row" justifyContent="end">
                  <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                  <Link component={ RouterLink } color='inherit' to="/auth/login">
                        Ingresar
                  </Link>
                    
                  

                </Grid>

            </Grid>


          </form>
    </AuthLayout>

          


    
  )
}
