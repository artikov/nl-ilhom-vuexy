import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem, CircularProgress } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useUpdateProductMutation, useGetProductQuery } from 'src/store/slices/productsApiSlice'
import { useGetBrandsQuery } from 'src/store/slices/brandsApiSlice'
import { useGetCategoriesQuery } from 'src/store/slices/categoriesApiSlice'
import { useGetMeasurementsQuery } from 'src/store/slices/measurementsApiSlice'

const DrawerEditProduct = ({ toggleDrawer, data, itemId }) => {
  const [body, setBody] = useState({ name: '', brand: '', category: '', unit_measure: '' })
  const parent = ''
  const search = ''

  const [updateProduct, { error }] = useUpdateProductMutation()
  const { data: product, isLoading } = useGetProductQuery(itemId)

  const { data: brands } = useGetBrandsQuery({
    parent,
    search
  })

  const { data: categories } = useGetCategoriesQuery({
    parent,
    search
  })

  const { data: measurements } = useGetMeasurementsQuery({
    search
  })
  console.log(product)

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const updatePayload = {
      id: itemId,
      name: product.name,
      category: product.category,
      unit_measure: product.unit_measure,
      brand: product.brand
    }

    if (body.name.trim() !== '') {
      updatePayload.name = body.name.trim()
    } else if (body.parent !== '') {
      updatePayload.category = body.category
    }

    await updateProduct(updatePayload)
    console.log(error)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Mahsulotni O'zgartirish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={6} marginY={4}>
          <Grid item xs={12}>
            <CustomTextField
              label={`Mahsulot Nomi`}
              placeholder={product?.name}
              name='name'
              value={body.name}
              onChange={handleChange}
              fullWidth
            ></CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='category'
              onChange={handleChange}
              defaultValue={product?.category?.id || ''}
              id='custom-select'
              label={`Guruhni Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              {categories?.results?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='brand'
              onChange={handleChange}
              defaultValue={product?.brand?.id || ''}
              id='custom-select'
              label={`Brandni Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              {brands?.results?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='measurements'
              onChange={handleChange}
              defaultValue={product?.unit_measure?.id || ''}
              id='custom-select'
              label={`O'lchovni Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              {measurements?.results?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={6} marginY={4}>
        <Grid item onClick={toggleDrawer(false)}>
          <Button variant='contained' onClick={handleSave}>
            Saqlash
          </Button>
        </Grid>
        <Grid item>
          <Button variant='tonal' color='error' onClick={toggleDrawer(false)}>
            Bekor Qilish
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DrawerEditProduct
