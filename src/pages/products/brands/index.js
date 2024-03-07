/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from '../../../components/CustomTable/CustomTable'

import { useGetBrandsQuery, useAddBrandMutation, useDeleteBrandMutation } from 'src/store/slices/brandsApiSlice'

const Brands = () => {
  const [parent, setParent] = useState('')
  const [search, setSearch] = useState('')
  const [noQueryData, setNoQueryData] = useState(null)

  const { data: brands, isLoading } = useGetBrandsQuery({
    parent,
    search
  })
  const [addBrand] = useAddBrandMutation()
  const [deleteBrand] = useDeleteBrandMutation()

  useEffect(() => {
    if (!parent && !search && brands) {
      setNoQueryData(brands)
    }
  }, [parent, search, brands])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Brendlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable
            data={brands?.results}
            page={'Brend'}
            handleCreateApi={addBrand}
            handleDeleteApi={deleteBrand}
            onParentChange={setParent}
            onSearchChange={setSearch}
            search={search}
            dataWithoutQuery={noQueryData}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default Brands
