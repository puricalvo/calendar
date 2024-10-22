import { Link as RouterLink } from 'react-router-dom';
import {  Button, ButtonGroup, Grid,  Link,  TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";
import { Google } from '@mui/icons-material';
import { Suspense, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}



export const LoginPage = () => {

  

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
    <Suspense fallback={<div>Loading translations...</div>}>
    <AuthLayout title="Login">

                

      <form onSubmit={ loginSubmit }
            className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="correo@google.com"
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
                    placeholder="Contraseña"
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
                </Grid>
                 
                <Grid container direction="row" justifyContent="end">
                  <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                  </Link>
                </Grid>

            </Grid>
          </form>            
    </AuthLayout>
    </Suspense>
          


    
  )
}
