import { Typography, Grid } from '@mui/material'

import CustomTable from 'src/components/CustomTable'

const groups = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Guruhlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomTable />
      </Grid>
    </Grid>
  )
}

export default groups
