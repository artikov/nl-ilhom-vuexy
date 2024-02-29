import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useUpdateSupplierMutation, useGetSupplierQuery } from 'src/store/slices/suppliersApiSlice'

const DrawerEditSupplier = ({ toggleDrawer, itemId }) => {
  const [body, setBody] = useState({ name: '', phone_number: '', person_type: '' })
  const { data: supplier } = useGetSupplierQuery(itemId)
  const [updateSupplier] = useUpdateSupplierMutation()

  console.log(supplier)
  console.log(supplier?.person_type)

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const updatePayload = {
      id: itemId,
      name: body.name || supplier?.name,
      phone_number: body.phone_number || supplier?.phone_number,
      person_type: body.person_type || supplier?.person_type
    }

    updateSupplier(updatePayload)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Yetkazib Beruvchini O'zgartirish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            label={`Yetkazib Beruvchi Nomi`}
            placeholder={supplier?.name}
            name='name'
            value={body.name}
            onChange={handleChange}
            fullWidth
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={`Telefon Raqami`}
            placeholder={supplier?.phone_number}
            name='phone_number'
            value={body.address}
            onChange={handleChange}
            fullWidth
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            select
            fullWidth
            name='person_type'
            onChange={handleChange}
            value={supplier?.person_type || ''}
            id='custom-select'
            label={`Shaxs Turi`}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem disabled value=''>
              <em>Shaxs Turi</em>
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

export default DrawerEditSupplier
