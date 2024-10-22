
import {  Grid, Typography } from "@mui/material";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { useTranslation } from "react-i18next";

export const NothingSelecterView = () => {

  const { t } = useTranslation('navbar');

  return (
    
    <Grid
        container 
        className="animate__animated animate__fadeIn animate__faster" 
        direction="row"
        alignItems="center"
        justifyContent='center'
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexWrap: "wrap",
          backgroundColor: 'primary.main', 
          padding: 5,
          marginTop: 3,
          borderRadius: 3 ,
        }}
    >
      
      <Grid item size={{ xs: 1, sm: 2, md: 12, }} sx={{   textAlign: "center",  }}>
          <AirportShuttleIcon sx={{fontSize: 80, color: "white" }} />
          <Typography color='white' variant="h4">{t('Welcome')}...</Typography>
      
      </Grid>
      
    </Grid>
      
  )
}

