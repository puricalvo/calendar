
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

const createData = (salCoche, hInicio, hFinal, entCoche, autobus, matricula, tipoServicio, codigo, lInicio, lFinal, observaciones) => {
  return { salCoche, hInicio, hFinal, entCoche, autobus, matricula, tipoServicio, codigo, lInicio, lFinal, observaciones };
}

const rows = [
  createData('N','14:30','23:50','N',106,'3745MLF','P','L.P20T.102','Plaza de Armas','Estacion Internacional','La llegada tiene que ser puntual' ),
];

export const  CardList = () => {
  return (

   
            
    <Grid  container direction='row' justifyContent="space-around"  sx={{ mb:0, border: 1, xs:12, sm:6, borderColor: 'red',mt: 0, p: 0 }} >
            <Typography variant="h4" >Servicios.L.P20T.102</Typography>
            <Typography variant="h5" letterSpacing={2}  ><CalendarToday color="error" fontSize="large" />
            <Typography variant="body1" component="span" sx={{ textAlign:"center"}}>30-09-24</Typography>
            </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ 
            p: 0,
            mt: 2,
            tableLayout: 'fixed', 
            borderBottom: "none", 
            minWidth: 650, 
            minHeight: 200, 
            border:0,
            justifyContent:'space-between', 
            flexwrap: 'wrap',
            }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>SAL.COCHE</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>H.INICIO</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>H.FINA</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>ENT.COCHE</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>AUTOBUS</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>MATRICULA</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>TIPO SERVICIO</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={3}>CODIGO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow
              key={row.salCoche}
              sx={{ '&:last-child td, &:last-child th': {  borderBlockStart: 1 } }}
            >
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.hInicio}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.hInicio}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.hFinal}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.entCoche}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.autobus}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.matricula}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.tipoServicio}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={3}>{row.codigo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow >
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={6}>L.INICIO&nbsp;</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={6}>L.FINAL&nbsp;</TableCell>
            <TableCell sx={{  minWidth: 100, p: 1, borderBlockEnd: 0 }} align="left" colSpan={6}>Observaciones&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.lInicio}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.lInicio}
              </TableCell> */}
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={6}>{row.lInicio}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={6}>{row.lFinal}</TableCell>
              <TableCell sx={{  minWidth: 100, p: 1 }} align="left" colSpan={6}>{row.observaciones}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}

