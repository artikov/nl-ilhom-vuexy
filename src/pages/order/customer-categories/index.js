import { Grid, Typography, CircularProgress } from '@mui/material'

import CustomerCategoriesTable from 'src/components/Orders/CustomerCategories/CustomerCategoriesTable'

import { useGetClientsCategoriesQuery } from 'src/store/slices/clientsCategoriesApiSlice'

const CustomerCategories = () => {
  const { data, isLoading } = useGetClientsCategoriesQuery()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mijoz Kategoriyalari</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress /> : <CustomerCategoriesTable data={data.results} />}
      </Grid>
    </Grid>
  )
}

export default CustomerCategories
