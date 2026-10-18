import { Grid } from "@mui/material"
import { AddMessage } from "../components/AddMessage"
import { Suspense } from "react"
import { Navbar } from "../components/Navbar";


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
      <Suspense fallback={<div>Loading translations...</div>}>
        <Navbar />
        <AddMessage />
      </Suspense>
    </Grid>
  )
}
