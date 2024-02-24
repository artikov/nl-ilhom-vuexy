import { Card, Grid, CardHeader, CardContent } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

const ProductPriceForm = () => {
  return (
    <Card>
      <CardHeader title='Narxlari' />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <CustomTextField label='Kelish Narxi' placeholder='Kelish Narxi' id='price' fullWidth type='number' />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Sotish Narxi'
              placeholder='Kelish Narxi'
              id='selling-price'
              fullWidth
              type='number'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductPriceForm
