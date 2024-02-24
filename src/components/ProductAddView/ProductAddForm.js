// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  MenuItem,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio
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
              <CustomTextField fullWidth label='Tovar Nomi' placeholder='Tovar Nomi' />
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
