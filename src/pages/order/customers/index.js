import { Grid, Typography, CircularProgress } from '@mui/material'

import CustomersTable from 'src/components/Orders/Customers/CustomersTable'

const Customers = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mijozlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomersTable />
      </Grid>
    </Grid>
  )
}

export default Customers
