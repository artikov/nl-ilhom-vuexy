import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, CircularProgress } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import { useUpdateCurrencyMutation, useGetCurrencyQuery } from 'src/store/slices/currenciesApiSlice'

const DrawerEditCurrency = ({ toggleDrawer, itemId }) => {
  const [ratio, setRatio] = useState('')
  const { data: currency, isLoading } = useGetCurrencyQuery(itemId)
  const [updateCurrency] = useUpdateCurrencyMutation()

  const handleSave = () => {
    updateCurrency({ id: itemId, ratio: ratio })
  }

  return (
    <Box sx={{ width: 'auto', margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Valyuta Narxini O'zgartirish</Typography>
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
              label={'Valyuta Narxi'}
              placeholder={currency?.ratio.toString()}
              name='ratio'
              value={ratio}
              onChange={({ target }) => setRatio(target.value)}
              fullWidth
            ></CustomTextField>
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

export default DrawerEditCurrency
