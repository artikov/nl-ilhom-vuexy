/* eslint-disable react-hooks/rules-of-hooks */

import { Typography, Grid, CircularProgress } from '@mui/material'

import ProductsTable from 'src/components/ProductsTable/ProductsTable'

import { useGetProductsQuery } from 'src/store/slices/productsApiSlice'

const products = () => {
  const { data, isLoading } = useGetProductsQuery()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulotlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress /> : <ProductsTable data={data?.results} />}
      </Grid>
    </Grid>
  )
}

export default products
