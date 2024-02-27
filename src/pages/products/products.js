import { Typography, Grid } from '@mui/material'

import CustomTable from 'src/components/CustomTable'

const products = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulotlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomTable page={'Mahsulot'} />
      </Grid>
    </Grid>
  )
}

export default products
