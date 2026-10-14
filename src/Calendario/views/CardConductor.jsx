import { Box, Divider } from "@mui/material";
import {  Card,  DatePike,  } from "../components";
import { Suspense } from "react";




export const CardConductor = () => {


  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(280px, 360px) minmax(0, 1fr)' },
        alignItems: 'start',
        gap: 2,
        mt: 1,
        width: '100%',
        minWidth: 0,
      }}
    >
      <Suspense fallback={<div>Loading translations...</div>}>
        <Box sx={{ minWidth: 0, display: 'flex', justifyContent: 'center' }}>
          <DatePike/>
        </Box>
      </Suspense>

      <Box sx={{ minWidth: 0, width: '100%' }}>
        <Divider sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }} />
        <Suspense fallback={<div>Loading translations...</div>}>
          <Card/>
        </Suspense>
      </Box>
    </Box>
  )    
}
