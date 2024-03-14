/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import EntriesTable from 'src/components/EntriesTable/EntriesTable'

import { useGetEntriesQuery } from 'src/store/slices/warehouseIncomesApiSlice'

const Entries = () => {
  const [supplier, setSupplier] = useState('')
  const [warehouse, setWarehouse] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [noQueryData, setNoQueryData] = useState([])

  const { data, isLoading } = useGetEntriesQuery({ supplier, warehouse, status, search })

  useEffect(() => {
    if (!isLoading) setNoQueryData(data.results)
  }, [data, isLoading])

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
            dataWithoutQuery={noQueryData}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Entries
