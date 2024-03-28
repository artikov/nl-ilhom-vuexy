import { Grid, Typography } from '@mui/material'

import CustomerCreateOrder from 'src/components/Orders/Customers/Customer/CustomerCreateOrder'

const CreateOrder = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Buyurtma yaratish</Typography>
      </Grid>

      <Grid item xs={12}>
        <CustomerCreateOrder />
      </Grid>
    </Grid>
  )
}

export default CreateOrder
