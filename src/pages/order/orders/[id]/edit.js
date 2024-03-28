import { useRouter } from 'next/router'

import { Grid, Typography } from '@mui/material'
import EditOrderForm from 'src/components/Orders/Orders/Order/EditOrderForm'

const EditOrder = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Buyurtmani O'zgartirish</Typography>
      </Grid>

      <Grid item xs={12}>
        <EditOrderForm orderId={id} />
      </Grid>
    </Grid>
  )
}

export default EditOrder
