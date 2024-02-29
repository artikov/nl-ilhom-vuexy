/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

import {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation
} from 'src/store/slices/warehousesApiSlice'

const warehouses = () => {
  const [responsible, setResponsible] = useState('')
  const [search, setSearch] = useState('')
  const [noQueryData, setNoQueryData] = useState([{}])

  const { data: warehouses, isLoading } = useGetWarehousesQuery({
    responsible,
    search
  })
  const [createWarehouse] = useCreateWarehouseMutation()
  const [deleteWarehouse] = useDeleteWarehouseMutation()

  useEffect(() => {
    if (!search && !responsible && warehouses) {
      setNoQueryData(warehouses)
    }
  }, [search, responsible, warehouses])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Omborlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable
            page={'Ombor'}
            data={warehouses?.results}
            handleCreateApi={createWarehouse}
            handleDeleteApi={deleteWarehouse}
            onSearchChange={setSearch}
            onParentChange={setResponsible}
            dataWithoutQuery={noQueryData}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default warehouses
