// ** MUI Imports
import { Card, Grid, Typography, CardHeader, CardContent, Button } from '@mui/material'

// ** Custom Components
import ProductAddForm from 'src/components/ProductAddView/ProductAddForm'
import ProductFileUploadForm from 'src/components/ProductAddView/ProductFileUploadForm'
import ProductTypeForm from 'src/components/ProductAddView/ProductTypeForm'

const ProductAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Tovar qo'shish</Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductAddForm />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Rasm'></CardHeader>
              <CardContent sx={{ border: '1px dashed #EFEEF0', borderRadius: '10px', margin: '0 2rem 2rem 2rem' }}>
                <ProductFileUploadForm />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title='Tovar Turi'></CardHeader>
          <CardContent>
            <ProductTypeForm />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item>
            <Button variant='contained' color='primary'>
              Saqlash
            </Button>
          </Grid>
          <Grid item>
            <Button variant='tonal' color='error'>
              Bekor qilish
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductAdd
