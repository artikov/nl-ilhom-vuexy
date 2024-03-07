import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useAddCurrencyMutation } from 'src/store/slices/currenciesApiSlice'

const DrawerAddCurrency = ({ toggleDrawer, page }) => {
  const [ratio, setRatio] = useState('')
  const [addCurrency] = useAddCurrencyMutation()

  const handleSave = () => {
    addCurrency({ ratio: ratio })
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>{page} Qo'shish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField
            label={`1 USD ${page} Narxi`}
            placeholder={`${page} Narxi`}
            name='ratio'
            value={ratio}
            onChange={({ target }) => setRatio(target.value)}
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

export default DrawerAddCurrency
