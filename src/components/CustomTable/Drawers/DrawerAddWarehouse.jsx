import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useGetUsersQuery } from 'src/store/slices/usersApiSlice'

const DrawerAddWarehouses = ({ toggleDrawer, handleAdd }) => {
  const [body, setBody] = useState({ name: '', address: '', responsible: '' })

  const { data: users } = useGetUsersQuery()

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    handleAdd(body)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Omborxona Qo'shish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            label={`Omborxona Nomi`}
            placeholder={`Omborxona Nomi`}
            name='name'
            value={body.name}
            onChange={handleChange}
            fullWidth
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={`Manzil`}
            placeholder={`Manzil`}
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
            value={body.user}
            onChange={handleChange}
            defaultValue=''
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

export default DrawerAddWarehouses
