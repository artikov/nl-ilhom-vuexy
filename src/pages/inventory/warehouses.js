import { Typography, Grid } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

const warehouses = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Omborlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomTable page={'Ombor'} />
      </Grid>
    </Grid>
  )
}

export default warehouses
