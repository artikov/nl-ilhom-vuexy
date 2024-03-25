import { Grid, Typography } from '@mui/material'

import CreateOrderForm from 'src/components/Orders/CreateOrder/CreateOrderForm'

const CreateOrder = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Buyurtma yaratish</Typography>
      </Grid>

      <Grid item xs={12}>
        <CreateOrderForm />
      </Grid>
    </Grid>
  )
}

export default CreateOrder
