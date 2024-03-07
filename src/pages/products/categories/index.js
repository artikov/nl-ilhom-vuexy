/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import CustomTable from 'src/components/CustomTable/CustomTable'

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation
} from 'src/store/slices/categoriesApiSlice'

const Categories = () => {
  const [parent, setParent] = useState('')
  const [search, setSearch] = useState('')
  const [noQueryData, setNoQueryData] = useState(null)

  const { data: categories, isLoading } = useGetCategoriesQuery({
    parent,
    search
  })
  const [createCategory] = useCreateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  useEffect(() => {
    if (!parent && !search && categories) {
      setNoQueryData(categories)
    }
  }, [parent, search, categories])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Kategoriyalar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <CustomTable
            page={'Kategoriya'}
            data={categories?.results}
            handleCreateApi={createCategory}
            handleDeleteApi={deleteCategory}
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

export default Categories
