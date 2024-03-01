/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import EntriesTable from 'src/components/EntriesTable/EntriesTable'

import { useGetEntriesQuery } from 'src/store/slices/warehouseIncomesApiSlice'

const entries = () => {
  const [supplier, setSupplier] = useState('')
  const { data, isLoading } = useGetEntriesQuery({ supplier })
  console.log(data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulot Kirimlari</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? <CircularProgress /> : <EntriesTable data={data?.results} onSupplierChange={setSupplier} />}
      </Grid>
    </Grid>
  )
}

export default entries
