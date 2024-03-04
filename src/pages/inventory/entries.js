/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import EntriesTable from 'src/components/EntriesTable/EntriesTable'

import { useGetEntriesQuery } from 'src/store/slices/warehouseIncomesApiSlice'

const entries = () => {
  const [supplier, setSupplier] = useState('')
  const [warehouse, setWarehouse] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const { data, isLoading } = useGetEntriesQuery({ supplier, warehouse, status, search })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulot Kirimlari</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <EntriesTable
            data={data?.results}
            onSupplierChange={setSupplier}
            onWarehouseChange={setWarehouse}
            onStatusChange={setStatus}
            onSearchChange={setSearch}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default entries
