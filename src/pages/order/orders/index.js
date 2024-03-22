import { Grid, Typography, CircularProgress } from '@mui/material'

import OrdersTable from 'src/components/Orders/Orders/OrdersTable'

const Orders = () => {
  const isLoading = false

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Buyurtmalar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress /> : <OrdersTable />}
      </Grid>
    </Grid>
  )
}

export default Orders
