import { Link as RouterLink } from 'react-router-dom';
import {  Button, Grid,  Link,  TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore, useForm } from "../../hooks";
import Swal from 'sweetalert2';
import { useEffect } from 'react';


const registerFormFields = {
   registerName: '',
   registerEmail: '',
   registerPassword: '',
   registerPassword2: '',

}



export const RegisterPage = () => {

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

      <form  onSubmit={ registerSubmit } 
            className="animate__animated animate__fadeIn animate__faster"
      >
            <Grid container>

                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField 
                    label="Nombre completo" 
                    type="text" 
                    placeholder="Nombre completo"
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
                    placeholder="Contraseña"
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
                    placeholder="Repita contraseña"
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
                    ingresar
                  </Link>
                    
                  

                </Grid>

            </Grid>


          </form>
    </AuthLayout>

          


    
  )
}
