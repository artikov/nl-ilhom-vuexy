import { Box, Grid, Button, Divider, Typography, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

const DrawerItems = ({ toggleDrawer }) => {
  return (
    <Box sx={{ width: 350, margin: 6 }} role='presentation'>
      <Grid container justifyContent={'space-between'} marginY={4}>
        <Typography variant='h3'>Guruh Qo'shish</Typography>
        <Button variant='tonal' color='secondary' onClick={toggleDrawer(false)}>
          X
        </Button>
      </Grid>
      <Divider />
      <Grid container spacing={6} marginY={4}>
        <Grid item xs={12}>
          <CustomTextField label='Guruh Nomi' placeholder='Guruh Nomi' fullWidth></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            id='custom-select'
            label='Ota Guruh'
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem disabled value=''>
              <em>Ota Guruhni Tanlang</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
      <Grid container spacing={6} marginY={4}>
        <Grid item>
          <Button variant='contained'>Saqlash</Button>
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

export default DrawerItems
