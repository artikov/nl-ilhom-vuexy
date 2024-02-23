// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components
import FormLayoutsBasic from 'src/components/ProductAddView/FormLayoutsBasic'
import FileUploaderSingle from 'src/components/ProductAddView/FileUploaderSingle'

const ProductAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormLayoutsBasic />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Rasm'></CardHeader>
              <CardContent sx={{ border: '1px dashed #EFEEF0', borderRadius: '10px', margin: '0 2rem' }}>
                <FileUploaderSingle />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title='ACL and JWT 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are
              implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProductAdd
