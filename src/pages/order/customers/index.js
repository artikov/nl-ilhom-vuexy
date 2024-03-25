import { Grid, Typography, CircularProgress } from '@mui/material'

import CustomersTable from 'src/components/Orders/Customers/CustomersTable'

import { useGetClientsQuery } from 'src/store/slices/clientsApiSlice'

const Customers = () => {
  const { data, isLoading } = useGetClientsQuery()

  console.log(data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mijozlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress /> : <CustomersTable data={data?.results} />}
      </Grid>
    </Grid>
  )
}

export default Customers
