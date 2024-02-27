import { Typography, Grid } from '@mui/material'

import CustomTable from 'src/components/CustomTable'

const measurements = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>O'lchovlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomTable page={"O'lchov"} />
      </Grid>
    </Grid>
  )
}

export default measurements
