
import { Link as RouterLink } from 'react-router-dom';
import { es, fr, ca, enUS } from 'date-fns/locale';
import { Button, ButtonGroup, Grid, Link, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';






export const Sidebar2 = () => {

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
      
     

        <Grid item size={{ xs: 12, md: 3 }}  sx={{ flexGrow: 'auto', mt: 3, p: 2, justifyContent: ' center'}}>
                <Typography variant='h3' component='div' color='black' sx={{ p:1, display: { md: "inline-flex" } }}>
                     {t('Subtltle')}
                </Typography>
                <Typography variante='p' fontSize={20} component='small' sx={{ p:0, display: { md: "inline-flex" } }}>
                      {t('subTitle2')} 
                </Typography>
                <Typography variant="h6" component='small' sx={{ p:0, display: {  md: "inline-flex" } }}>
                {formattedDate} 
                </Typography>
            <ButtonGroup variant="outlined" component='small'  size="large" aria-label="large button group" sx={{ p:1 }} >
            {/* <Button  color="error" sx={{ fontSize: '0.75rem', mr: 0, ml: '-2px'}}>{t('Button1')}</Button> */}
            <Button    
              color="error" 
              sx={{ fontSize: '0.75rem', mr: 0, ml: '-2px'}}>
              <Link component={ RouterLink } color='inherit' to="/home">
                {t('Button2')}
              </Link>
            </Button>
            </ButtonGroup>
        </Grid>
            
      
    </>
  )
}
