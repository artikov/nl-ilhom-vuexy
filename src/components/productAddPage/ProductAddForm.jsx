import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  MenuItem,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormGroup,
  Checkbox,
  Divider,
  CircularProgress
} from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'
import ProductFileUploadForm from './ProductFileUploadForm'

import { useGetCategoriesQuery } from '../../store/slices/categoriesApiSlice'
import { useGetBrandsQuery } from 'src/store/slices/brandsApiSlice'
import { useGetMeasurementsQuery } from 'src/store/slices/measurementsApiSlice'
import { useAddProductMutation } from 'src/store/slices/productsApiSlice'

const ProductAddForm = () => {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [measurement, setMeasurement] = useState('')
  const [productName, setProductName] = useState('')
  const [productType, setProductType] = useState('')
  const [barcode, setBarcode] = useState('')
  const [generateBarcode, setGenerateBarcode] = useState(false)
  const [status, setStatus] = useState(true)
  const [image, setImage] = useState('')

  const [addProduct, { isError, isLoading: isAdding }] = useAddProductMutation()

  const parent = ''
  const search = ''
  const { data: categories, isLoading } = useGetCategoriesQuery({ parent, search })
  const { data: brands } = useGetBrandsQuery({ parent, search })
  const { data: measurements } = useGetMeasurementsQuery({ search })

  const handleSubmit = async e => {
    e.preventDefault()

    let formData = new FormData()
    formData.append('category', category)
    formData.append('brand', brand)
    formData.append('unit_measure', measurement)
    formData.append('name', productName)
    formData.append('product_type', productType)
    formData.append('barcode', barcode)
    formData.append('generate_barcode', generateBarcode)
    formData.append('is_active', status)
    formData.append('image', image)

    console.log(formData)
    await addProduct(formData)

    if (!isError) {
      router.push('/products')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Tovar ma'lumotlari" />
          <CardContent>
            <form encType='multipart/form-data'>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomTextField
                      select
                      defaultValue=''
                      label='Guruh'
                      id='custom-select'
                      fullWidth
                      onChange={({ target }) => setCategory(target.value)}
                      SelectProps={{ displayEmpty: true }}
                    >
                      <MenuItem value=''>
                        <em>Guruhni Tanlang</em>
                      </MenuItem>
                      {categories?.results?.map((category, index) => (
                        <MenuItem key={index} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      select
                      defaultValue=''
                      label='Brend'
                      id='custom-select'
                      fullWidth
                      onChange={({ target }) => setBrand(target.value)}
                      SelectProps={{ displayEmpty: true }}
                    >
                      <MenuItem value=''>
                        <em>Brendni Tanlang</em>
                      </MenuItem>
                      {brands?.results?.map((brand, index) => (
                        <MenuItem key={index} value={brand.id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      select
                      defaultValue=''
                      label="O'lchov Birligi"
                      id='custom-select'
                      fullWidth
                      onChange={({ target }) => setMeasurement(target.value)}
                      SelectProps={{ displayEmpty: true }}
                    >
                      <MenuItem value=''>
                        <em>O'lchov Birligini Tanlang</em>
                      </MenuItem>
                      {measurements?.results?.map((measurement, index) => (
                        <MenuItem key={index} value={measurement.id}>
                          {measurement.name}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      fullWidth
                      label='Tovar Nomi'
                      placeholder='Tovar Nomi'
                      value={productName}
                      onChange={({ target }) => setProductName(target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      fullWidth
                      label='Tovar Turi'
                      placeholder='Tovar Nomi'
                      value={productType}
                      onChange={({ target }) => setProductType(target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={8}>
                        <CustomTextField
                          fullWidth
                          label='Shtrix Kod'
                          placeholder='Shtrix Kod'
                          value={barcode}
                          onChange={({ target }) => setBarcode(target.value)}
                        />
                      </Grid>
                      <Grid item xs={4} marginY={'auto'}>
                        <Button variant='contained' color='primary' fullWidth sx={{ marginTop: '1rem' }}>
                          Upload
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label='Shtrix kod generatsiya qilish'
                        value={generateBarcode}
                        onChange={event => setGenerateBarcode(event.target.checked)}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12} sm={6}>
                      <Typography>Status</Typography>
                      <RadioGroup
                        row
                        aria-label='controlled'
                        name='controlled'
                        value={status ? 'checked' : 'unchecked'}
                        onChange={event => setStatus(event.target.value === 'checked')}
                      >
                        <FormControlLabel value='checked' control={<Radio />} label='Active' />
                        <FormControlLabel value='unchecked' control={<Radio />} label='Inactive' />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title='Rasm'></CardHeader>
          <CardContent sx={{ border: '1px dashed #EFEEF0', borderRadius: '10px', margin: '0 2rem 2rem 2rem' }}>
            <ProductFileUploadForm setImage={setImage} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              {isAdding ? <CircularProgress /> : 'Saqlash'}
            </Button>
          </Grid>
          <Grid item>
            <Link href='/products'>
              <Button variant='tonal' color='error'>
                Bekor qilish
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductAddForm
