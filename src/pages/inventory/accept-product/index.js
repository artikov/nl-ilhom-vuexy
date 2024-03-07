import { Grid, Button, Typography } from '@mui/material'
import EntryInfoForm from 'src/components/ProductAcceptPage/EntryInfoForm'

const AcceptProduct = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Mahsulot Kirim Qilish</Typography>
      </Grid>

      <Grid item xs={12}>
        <EntryInfoForm />
      </Grid>
    </Grid>
  )
}

export default AcceptProduct
