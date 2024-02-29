import { useState } from 'react'

import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  MenuItem,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormGroup,
  Checkbox,
  Divider
} from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const ProductAddForm = () => {
  const [value, setValue] = useState('controlled-checked')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <Card>
      <CardHeader title="Tovar ma'lumotlari" />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                select
                defaultValue=''
                label='Guruh'
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem disabled value=''>
                  <em>Guruhni Tanlang</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                select
                defaultValue=''
                label='Brend'
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem disabled value=''>
                  <em>Brendni Tanlang</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                select
                defaultValue=''
                label="O'lchov Birligi"
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem disabled value=''>
                  <em>O'lchov Birligini Tanlang</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Tovar Nomi' placeholder='Tovar Nomi' />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Tovar Turi' placeholder='Tovar Nomi' />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={10}>
                  <CustomTextField fullWidth label='Shtrix Kod' placeholder='Shtrix Kod' />
                </Grid>
                <Grid item xs={2} marginY={'auto'}>
                  <Button variant='contained' color='primary' fullWidth sx={{ marginTop: '1rem' }}>
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label='Shtrix kod generatsiya qilish' />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} sm={6}>
                <Typography>Status</Typography>
                <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={handleChange}>
                  <FormControlLabel value='controlled-checked' control={<Radio />} label='Active' />
                  <FormControlLabel value='controlled-unchecked' control={<Radio />} label='Inactive' />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductAddForm
