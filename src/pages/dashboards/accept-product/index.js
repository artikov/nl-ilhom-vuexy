import { useState } from 'react'

import { Grid, ButtonGroup, Button, Typography } from '@mui/material'
import ProductInfoForm from 'src/components/ProductAcceptView/ProductInfoForm'
import ProductPriceForm from 'src/components/ProductAcceptView/ProductPriceForm'

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [multiple, setMultiple] = useState(false)

  const handleClick = isMultiple => {
    setMultiple(isMultiple)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Tovar Qabul Qilish</Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup>
          <Button variant={!multiple ? 'contained' : 'outlined'} color='primary' onClick={() => handleClick(false)}>
            Bitta Tovar qabul qilish
          </Button>
          <Button variant={multiple ? 'contained' : 'outlined'} color='primary' onClick={() => handleClick(true)}>
            Ko'p Tovar qabul qilish
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} md={8}>
        <ProductInfoForm multiple={multiple} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProductPriceForm />
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
