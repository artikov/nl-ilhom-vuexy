import { useState } from 'react'

import { Box, Grid, Button, Divider, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

const DrawerAddItem = ({ toggleDrawer, page, parents, handleAdd }) => {
  const [body, setBody] = useState({ name: '', parent: '' })

  const handleChange = e => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    handleAdd(body)
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
            label={`${page} Nomi`}
            placeholder={`${page} Nomi`}
            name='name'
            value={body.name}
            onChange={handleChange}
            fullWidth
          ></CustomTextField>
        </Grid>
        {page !== "O'lchov" && (
          <Grid item xs={12}>
            <CustomTextField
              select
              fullWidth
              name='parent'
              value={body.parent}
              onChange={handleChange}
              defaultValue=''
              id='custom-select'
              label={`Asosiy ${page} Tanlang`}
              SelectProps={{ displayEmpty: true }}
            >
              <MenuItem disabled value=''>
                <em>Asosiy {page} Tanlang</em>
              </MenuItem>
              {parents?.map((parent, index) => (
                <MenuItem key={index} value={parent.id}>
                  {parent.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        )}
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

export default DrawerAddItem
