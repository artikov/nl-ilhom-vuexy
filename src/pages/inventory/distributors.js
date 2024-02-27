import { Typography, Grid } from '@mui/material'

import CustomTable from 'src/components/CustomTable'

const distributors = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Yetkazib Beruvchi</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomTable page={'Yetkazuvchi'} />
      </Grid>
    </Grid>
  )
}

export default distributors
