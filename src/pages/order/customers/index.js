import { Grid, Typography, CircularProgress } from '@mui/material'

import CustomersTable from 'src/components/Orders/Customers/CustomersTable'

const Customers = () => {
  const isLoading = false

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mijozlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress /> : <CustomersTable />}
      </Grid>
    </Grid>
  )
}

export default Customers
