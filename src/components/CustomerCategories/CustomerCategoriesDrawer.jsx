import { useState } from 'react'

import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

const CustomerCategoriesDrawer = ({ toggleDrawer, itemId }) => {
  const [categoryName, setCategoryName] = useState('')

  const handleSave = () => {
    console.log(categoryName)
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        {itemId ? (
          <Typography variant='h3'>Mijoz Kategoriyasini Tahrirlash</Typography>
        ) : (
          <Typography variant='h3'>Mijoz Kategoriyasini Qo'shish</Typography>
        )}
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            label={`Kategoriya Nomi`}
            placeholder={`Kategoriya Nomi`}
            name='categroyName'
            value={categoryName}
            onChange={({ target }) => setCategoryName(target.value)}
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

export default CustomerCategoriesDrawer
