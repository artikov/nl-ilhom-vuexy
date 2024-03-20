import { Grid, Typography, CircularProgress } from '@mui/material'

import CustomerCategoriesTable from 'src/components/CustomerCategories/CustomerCategoriesTable'

const CustomerCategories = () => {
  const isLoading = false

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mijoz Kategoriyalari</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomerCategoriesTable

          //  page={'Valyuta'}
          //  data={currencies?.results}
          //  handleCreateApi={addCurrency}
          //  handleDeleteApi={deleteCurrency}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default CustomerCategories
