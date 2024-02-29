/* eslint-disable react-hooks/rules-of-hooks */
import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

import { useGetWarehousesQuery, useCreateWarehouseMutation } from 'src/store/slices/warehousesApiSlice'

const warehouses = () => {
  const { data: warehouses, isLoading } = useGetWarehousesQuery()
  const [createWarehouse] = useCreateWarehouseMutation()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Omborlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable page={'Ombor'} data={warehouses?.results} handleCreateApi={createWarehouse} />
        )}
      </Grid>
    </Grid>
  )
}

export default warehouses
