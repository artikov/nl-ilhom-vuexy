import { Typography, Grid } from '@mui/material'

import ProductsTable from 'src/components/ProductsTable/ProductsTable'

const products = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulotlar</Typography>
      </Grid>
      <Grid item xs={12}>
        <ProductsTable />
      </Grid>
    </Grid>
  )
}

export default products
