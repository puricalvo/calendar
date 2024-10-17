import { Grid } from "@mui/material"
import { AddMessage } from "../components/AddMessage"


export const MessagesPage = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'secondary.main', padding: 2 }}
    >
        <AddMessage />
    </Grid>
  )
}
