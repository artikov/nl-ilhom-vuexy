import { useState } from 'react'

import { Button, Grid, Divider } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

const ProductTypeForm = () => {
  const [numberOfFields, setNumberOfFields] = useState(1)

  const handleButtonClick = () => {
    setNumberOfFields(prevCount => prevCount + 1)
  }

  return (
    <Grid container spacing={6}>
      {[...Array(numberOfFields)].map((_, index) => (
        <Grid item key={index}>
          {index > 0 && <Divider />}
          <Grid container spacing={4} sx={index > 0 ? { paddingTop: '1rem' } : {}}>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Shtrix Kod' placeholder='Shtrix Kod' />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Tovar Nomi' placeholder='Tovar Nomi' />
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={handleButtonClick} fullWidth>
          + Yangi tovar Turi
        </Button>
      </Grid>
    </Grid>
  )
}

export default ProductTypeForm
