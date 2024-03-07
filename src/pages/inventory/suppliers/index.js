/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

import { useGetSuppliersQuery, useDeleteSupplierMutation } from 'src/store/slices/suppliersApiSlice'

const Suppliers = () => {
  const [person_type, setPersonType] = useState('')
  const [search, setSearch] = useState('')
  const [noQueryData, setNoQueryData] = useState({})

  const { data, isLoading } = useGetSuppliersQuery({
    person_type,
    search
  })
  const [deleteSupplier] = useDeleteSupplierMutation()

  useEffect(() => {
    if (!person_type && !search && data) {
      setNoQueryData(data)
    }
  }, [data, person_type, search])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Yetkazib Beruvchi</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable
            page={'Yetkazuvchi'}
            data={data?.results}
            handleDeleteApi={deleteSupplier}
            onParentChange={setPersonType}
            onSearchChange={setSearch}
            dataWithoutQuery={noQueryData}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Suppliers
