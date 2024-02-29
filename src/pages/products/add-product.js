import { Card, Grid, Typography, CardHeader, CardContent, Button } from '@mui/material'

import ProductAddForm from 'src/components/productAddPage/ProductAddForm'

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
