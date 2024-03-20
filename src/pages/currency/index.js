import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

import {
  useGetCurrenciesQuery,
  useAddCurrencyMutation,
  useDeleteCurrencyMutation
} from 'src/store/slices/currenciesApiSlice'

const Currencies = () => {
  const { data: currencies, isLoading } = useGetCurrenciesQuery()
  const [addCurrency] = useAddCurrencyMutation()
  const [deleteCurrency] = useDeleteCurrencyMutation()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Valyuta</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable
            page={'Valyuta'}
            data={currencies?.results}
            handleCreateApi={addCurrency}
            handleDeleteApi={deleteCurrency}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Currencies
