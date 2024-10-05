import { Grid, Typography } from "@mui/material";


export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 2 }}
    >

    <Grid item
      className="box-shadow"
      xs={ 3 }
      sx={{ 
            height: {sm: 100} ,
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 2, 
            borderRadius: 0,
            marginTop: 0 
        }}>
        
          <Typography variant='h5' sx={{ mb: 1 }}>{ title }</Typography>
          
          { children }
    </Grid>

    </Grid>
  )
}
