import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useAddSupplierMutation } from 'src/store/slices/suppliersApiSlice'

const DrawerAddSupplier = ({ toggleDrawer }) => {
  const [body, setBody] = useState({ name: '', phone_number: '', person_type: '' })

  const [addSupplier] = useAddSupplierMutation()

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    addSupplier(body)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Yetkazib Beruvchi Qo'shish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            label={`Yetkazib Beruvchi Nomi`}
            placeholder={`Yetkazib Beruvchi Nomi`}
            name='name'
            value={body.name}
            onChange={handleChange}
            fullWidth
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={`Telefon raqami`}
            placeholder={`Telefon raqami`}
            name='phone_number'
            value={body.phone}
            onChange={handleChange}
            fullWidth
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            select
            fullWidth
            name='person_type'
            value={body.person_type}
            onChange={handleChange}
            defaultValue=''
            id='custom-select'
            label={`Ma'sul shaxs`}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem disabled value=''>
              <em>Ma'sul Shaxs</em>
            </MenuItem>
            <MenuItem value={'legal_entity'}>Yuridik shaxs</MenuItem>
            <MenuItem value={'natural_person'}>Jismoniy shaxs</MenuItem>
          </CustomTextField>
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

export default DrawerAddSupplier
