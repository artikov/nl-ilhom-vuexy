/* eslint-disable react-hooks/rules-of-hooks */
import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from '../../components/CustomTable'

import { useGetBrandsQuery, useAddBrandMutation, useDeleteBrandMutation } from 'src/store/slices/brandsApiSlice'

const brands = () => {
  const { data: brands, isLoading } = useGetBrandsQuery()
  const [addBrand] = useAddBrandMutation()
  const [deleteBrand] = useDeleteBrandMutation()

  if (brands) {
    console.log(brands)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Brendlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable data={brands?.results} page={'Brend'} addBrand={addBrand} deleteBrand={deleteBrand} />
        )}
      </Grid>
    </Grid>
  )
}

export default brands
