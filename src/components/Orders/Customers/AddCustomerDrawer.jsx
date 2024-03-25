import { useState } from 'react'

import { Box, Button, Divider, Grid, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useGetClientsCategoriesQuery } from 'src/store/slices/clientsCategoriesApiSlice'
import { useGetRegionsQuery } from 'src/store/slices/regionsApiSlice'
import { useGetCitiesQuery } from 'src/store/slices/citiesApiSlice'
import { useAddClientMutation } from 'src/store/slices/clientsApiSlice'

const AddCustomerDrawer = ({ toggleDrawer }) => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')

  const { data: categories } = useGetClientsCategoriesQuery()
  const { data: regions } = useGetRegionsQuery()
  const { data: cities } = useGetCitiesQuery(region)
  const [addClient] = useAddClientMutation()

  const handleSave = async () => {
    const data = {
      full_name: fullName,
      phone_number: phoneNumber,
      company,
      address,
      note,
      city,
      category
    }
    console.log(data)
    await addClient(data)

    toggleDrawer(false)
  }

  return (
    <Box sx={{ width: '500px', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Mijoz Kategoriyasini Qo'shish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            select
            defaultValue=''
            label='Mijoz Kategoriyasi'
            id='custom-select'
            fullWidth
            onChange={({ target }) => setCategory(target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>
              <em>Kategoriya</em>
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
            label={`Mijoz Nomi`}
            placeholder={`Mijoz Nomi`}
            name='fullName'
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label={`Telefon Raqami`}
            placeholder={`Telefon Raqami`}
            name='phoneNumber'
            value={phoneNumber}
            onChange={({ target }) => setPhoneNumber(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label={`Kompaniya`}
            placeholder={`Kompaniyasi`}
            name='company'
            value={company}
            onChange={({ target }) => setCompany(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            select
            defaultValue=''
            label='Viloyat'
            id='custom-select'
            fullWidth
            onChange={({ target }) => setRegion(target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>
              <em>Viloyat</em>
            </MenuItem>
            {regions?.results?.map((region, index) => (
              <MenuItem key={index} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            select
            defaultValue=''
            label='Shahar'
            id='custom-select'
            fullWidth
            onChange={({ target }) => setCity(target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>
              <em>Shahar</em>
            </MenuItem>
            {region &&
              cities?.results?.map((city, index) => (
                <MenuItem key={index} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
          </CustomTextField>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label={`Manzil`}
            placeholder={`Manzil`}
            name='address'
            value={address}
            onChange={({ target }) => setAddress(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label={`Izoh`}
            placeholder={`Izoh`}
            name='note'
            value={note}
            onChange={({ target }) => setNote(target.value)}
            fullWidth
          ></CustomTextField>
        </Grid>
      </Grid>
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

export default AddCustomerDrawer
