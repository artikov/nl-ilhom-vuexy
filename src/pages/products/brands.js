/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from '../../components/CustomTable'

import { useGetBrandsQuery, useAddBrandMutation, useDeleteBrandMutation } from 'src/store/slices/brandsApiSlice'

const brands = () => {
  const [parent, setParent] = useState('')
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [noQueryData, setNoQueryData] = useState(null)

  const { data: brands, isLoading } = useGetBrandsQuery({
    parent,
    search,
    page_size: pageSize
  })

  useEffect(() => {
    if (!parent && !search && brands) {
      setNoQueryData(brands)
    }
  }, [parent, search, brands])

  const [addBrand] = useAddBrandMutation()
  const [deleteBrand] = useDeleteBrandMutation()

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
            data={brands}
            page={'Brend'}
            addBrand={addBrand}
            deleteBrand={deleteBrand}
            onParentChange={setParent}
            onSearchChange={setSearch}
            onPageSizeChange={setPageSize}
            search={search}
            dataWithoutQuery={noQueryData}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default brands
