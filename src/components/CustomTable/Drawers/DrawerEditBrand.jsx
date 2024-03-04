import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem, CircularProgress } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useUpdateBrandMutation, useGetBrandQuery } from 'src/store/slices/brandsApiSlice'

const DrawerEditBrand = ({ toggleDrawer, page, parents, itemId }) => {
  const [body, setBody] = useState({ name: '', parent: '' })

  const [updateBrand] = useUpdateBrandMutation()
  const { data: brand, isLoading } = useGetBrandQuery(itemId)

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const updatePayload = { id: itemId, name: brand.name, parent: brand.parent }

    if (body.name.trim() !== '') {
      updatePayload.name = body.name.trim()
    } else if (body.parent !== '') {
      updatePayload.parent = body.parent
    }

    updateBrand(updatePayload)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>{page} O'zgartirish</Typography>
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
              label={`${page} Nomi`}
              placeholder={brand?.name}
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
              name='parent'
              onChange={handleChange}
              defaultValue={brand?.parent?.id || ''}
              id='custom-select'
              label={`Asosiy ${page} Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              {parents?.map((parent, index) => (
                <MenuItem key={index} value={parent.id}>
                  {parent.name}
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

export default DrawerEditBrand
