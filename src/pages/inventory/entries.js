import { Typography, Grid } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

const entries = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Kirimlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomTable page={'Kirim'} />
      </Grid>
    </Grid>
  )
}

export default entries
