/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

import { Typography, Grid, CircularProgress } from '@mui/material'

import ProductsTable from 'src/components/ProductsPage/ProductsTable'

import { useGetProductsQuery, useDeleteProductMutation } from 'src/store/slices/productsApiSlice'

const products = () => {
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('')
  const [isActive, setIsActive] = useState(null)
  const [dataWithoutQuery, setDataWithoutQuery] = useState([])

  const { data, isLoading } = useGetProductsQuery({
    category,
    search,
    brand,
    isActive
  })
  const [deleteProduct] = useDeleteProductMutation()

  useEffect(() => {
    if (!category && !search && isActive == null && data) {
      setDataWithoutQuery(data)
    }
  }, [category, search, data, isActive])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h1'>Mahsulotlar</Typography>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ProductsTable
            data={data?.results}
            dataWithoutQuery={dataWithoutQuery}
            onCategoryChange={setCategory}
            onSearchChange={setSearch}
            onBrandChange={setBrand}
            onActiveChange={setIsActive}
            handleDeleteApi={deleteProduct}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default products
