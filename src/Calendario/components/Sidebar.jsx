import { Link as RouterLink } from 'react-router-dom';
import { Button, ButtonGroup, Divider, Grid, Link, Typography } from "@mui/material"
import { CardConductor } from "../views/CardConductor";
import { useTranslation } from 'react-i18next';
import { es, fr, ca, enUS } from 'date-fns/locale';
import { format } from 'date-fns';




export const Sidebar = () => {

  const { t, i18n } = useTranslation('sidebar');

  const getDateFnsLocale = (lng) => {
    switch (lng) {
      case 'es':
        return es; // Español
      case 'en':
        return enUS; // Inglés
      case 'fr':
        return fr; // Francés
      case 'ca':
        return ca; // Catalán
      default:
        return enUS; // Por defecto, Inglés
    }
  };

  const today = new Date();

  const formattedDate = format(today, 'dd-MM-yy', { locale: getDateFnsLocale(i18n.language) });
  
  return (

    <>

    
         <Grid container  
          direction='row' 
          justifyContent='space-around' 
          alignItems='center'
          padding='2'
          sx={{
            display:'flex',
            flexwrap: 'wrap',
            width: '100%',
            
          }}
            >
            

            <Grid size={{ xs: 12, md: 3 }}  sx={{ flexGrow: 'auto'}}>
                <Typography variant='h3' component='div' color='black' sx={{ p:1, display: { xs: "none", md: "inline-flex" } }}>{t('Subtltle')}</Typography>
                <Typography variante='p' fontSize={20} component='small' sx={{ p:0, display: { xs: "none", md: "inline-flex" } }}>{t('subTitle2')}</Typography>
                <Typography variant="h6" component='small' sx={{ p:0, display: { xs: "none", md: "inline-flex" } }}>{formattedDate} </Typography>
            <ButtonGroup variant="outlined" component='small'  size="large" aria-label="large button group" sx={{ p:1 }} >
            <Button  color="error" sx={{ fontSize: '0.75rem', mr: 0, ml: '-2px'}}>{t('Button1')}</Button>
            <Button    
              color="error" 
              sx={{ fontSize: '0.75rem', mr: 0, ml: '-2px'}}>
              <Link component={ RouterLink } color='inherit' to="/home">
                 {t('Button2')}  
              </Link>
            </Button>
            </ButtonGroup>
            </Grid>
            
            
         </Grid>

         <Divider/>
         <Divider/>

        
        <Grid container
          direction='row' 
          justifyContent='center' 
          alignItems='center'
          padding='2'
          sx={{
            display:'flex',
            flexwrap: 'wrap',
            width: '80%',
            
          }}
        >
           
               
                  <CardConductor/>
                 
           

      </Grid>
        
    
  </>    
  )
}
