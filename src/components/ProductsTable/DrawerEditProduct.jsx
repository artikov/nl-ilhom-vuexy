import { useState } from 'react'

import {
  Box,
  Grid,
  Button,
  Divider,
  Typography,
  MenuItem,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import ProductFileUploadForm from '../ProductAddPage/ProductFileUploadForm'

import { useUpdateProductMutation, useGetProductQuery } from 'src/store/slices/productsApiSlice'
import { useGetBrandsQuery } from 'src/store/slices/brandsApiSlice'
import { useGetCategoriesQuery } from 'src/store/slices/categoriesApiSlice'
import { useGetMeasurementsQuery } from 'src/store/slices/measurementsApiSlice'

const DrawerEditProduct = ({ toggleDrawer, itemId }) => {
  const [body, setBody] = useState({
    name: '',
    product_type: '',
    brand: '',
    category: '',
    unit_measure: '',
    isActive: ''
  })
  const [image, setImage] = useState(null)
  const parent = ''
  const search = ''

  const [updateProduct] = useUpdateProductMutation()
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

  const handleChange = e => {
    const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setBody(prevBody => ({
      ...prevBody,
      [e.target.name]: newValue
    }))
  }

  const handleSave = () => {
    const updatePayload = new FormData()

    // Helper function to append a field if it exists
    const appendFieldIfExists = (fieldName, value) => {
      if (value) {
        updatePayload.append(fieldName, value)
      }
    }

    // Append fields based on the existence of values in body or product
    appendFieldIfExists('name', body.name || product?.name)
    appendFieldIfExists('category', body.category?.id || product?.category?.id)
    appendFieldIfExists('unit_measure', body.unit_measure?.id || product?.unit_measure?.id)
    appendFieldIfExists('brand', body.brand?.id || product?.brand?.id)
    appendFieldIfExists('is_active', body.isActive || product?.isActive)
    appendFieldIfExists('product_type', body.product_type || product?.product_type)
    appendFieldIfExists('image', image)

    updatePayload.append('generate_barcode', 'false')

    console.log(updatePayload)

    updateProduct({ id: itemId, body: updatePayload })
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
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label={`Mahsulot Turi`}
              placeholder={product?.product_type}
              name='product_type'
              value={body.product_type}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='category'
              onChange={handleChange}
              value={product?.category?.id || ''}
              id='custom-select'
              label={`Kategoriyani Tanlang`}
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
              value={product?.brand?.id || ''}
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
              value={product?.unit_measure?.id || ''}
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
          <Grid item xs={12}>
            <Grid item xs={12} sm={6}>
              <Typography>Status</Typography>
              <RadioGroup
                row
                aria-label='controlled'
                name='isActive'
                defaultValue={product?.is_active}
                onChange={handleChange}
              >
                <FormControlLabel value={true} control={<Radio />} label='Active' />
                <FormControlLabel value={false} control={<Radio />} label='Inactive' />
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Box sx={{ maxWidth: '200px' }}>
        <ProductFileUploadForm setImage={setImage} height={'200px'} />
      </Box>
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
