import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem, CircularProgress } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useGetUsersQuery } from 'src/store/slices/usersApiSlice'
import { useGetWarehouseQuery, useUpdateWarehouseMutation } from 'src/store/slices/warehousesApiSlice'

const DrawerEditWarehouse = ({ toggleDrawer, itemId }) => {
  const [body, setBody] = useState({ name: '', address: '', responsible: '' })

  const { data: users } = useGetUsersQuery()
  const { data: warehouse, isLoading } = useGetWarehouseQuery(itemId)
  const [updateWarehouse] = useUpdateWarehouseMutation()

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const updatePayload = {
      id: itemId,
      name: body.name || warehouse?.name,
      address: body.address || warehouse?.address,
      responsible: body.responsible || warehouse?.responsible?.id
    }

    updateWarehouse(updatePayload)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Omborxonani O'zgartirish</Typography>
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
              label={`Omborxona Nomi`}
              placeholder={warehouse?.name}
              name='name'
              value={body.name}
              onChange={handleChange}
              fullWidth
            ></CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label={`Manzil`}
              placeholder={warehouse?.address}
              name='address'
              value={body.address}
              onChange={handleChange}
              fullWidth
            ></CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='responsible'
              onChange={handleChange}
              defaultValue={warehouse?.responsible?.id || ''}
              id='custom-select'
              label={`Ma'sul shaxs`}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem disabled value=''>
                <em>Ma'sul Shaxs</em>
              </MenuItem>
              {users?.results?.map((user, index) => (
                <MenuItem key={index} value={user.id}>
                  {user.first_name} {user.last_name}
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

export default DrawerEditWarehouse
