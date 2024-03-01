import { Grid, Typography } from '@mui/material'

import ProductAddForm from 'src/components/ProductAddPage/ProductAddForm'

const addProduct = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Tovar qo'shish</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <ProductAddForm />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default addProduct
