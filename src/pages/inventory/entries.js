import { Typography, Grid } from '@mui/material'

import EntriesTable from 'src/components/EntriesTable/EntriesTable'

const entries = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulot Kirimlari</Typography>
      </Grid>
      <Grid item xs={12}>
        <EntriesTable />
      </Grid>
    </Grid>
  )
}

export default entries
