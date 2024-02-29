import { Grid, Button, Typography } from '@mui/material'
import EntryInfoForm from 'src/components/ProductAcceptPage/EntryInfoForm'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Mahsulot Kirim Qilish</Typography>
      </Grid>

      <Grid item xs={12}>
        <EntryInfoForm />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item>
            <Button variant='contained' color='primary'>
              Qabul Qilish
            </Button>
          </Grid>
          <Grid item>
            <Button variant='tonal' color='error'>
              Bekor Qilish
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index
