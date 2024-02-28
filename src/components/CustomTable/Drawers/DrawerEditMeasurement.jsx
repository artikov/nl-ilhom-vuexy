import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem, CircularProgress } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import { useUpdateMeasurementMutation, useGetMeasurementQuery } from 'src/store/slices/measurementsApiSlice'

const DrawerEditMeasurement = ({ toggleDrawer, page, itemId }) => {
  const [body, setBody] = useState({ name: '', parent: '' })

  const [updateMeasurement] = useUpdateMeasurementMutation()
  const { data: measurement, isLoading } = useGetMeasurementQuery(itemId)

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const updatePayload = { id: itemId, name: measurement.name, parent: measurement.parent }

    if (body.name.trim() !== '') {
      updatePayload.name = body.name.trim()
    } else if (body.parent !== '') {
      updatePayload.parent = body.parent
    }

    updateMeasurement(updatePayload)
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
              placeholder={measurement?.name}
              name='name'
              value={body.name}
              onChange={handleChange}
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

export default DrawerEditMeasurement
