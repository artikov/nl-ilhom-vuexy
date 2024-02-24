import { useState } from 'react'

import { Card, Grid, CardHeader, CardContent, MenuItem } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

const ProductInfoForm = ({ multiple }) => {
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
                label='Tovar'
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem disabled value=''>
                  <em>Tovarni Tanlang</em>
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
                label='Tovar Turini Tanlang'
                id='custom-select'
                fullWidth
                SelectProps={{ displayEmpty: true }}
              >
                <MenuItem disabled value=''>
                  <em>Tovar Turi</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              {multiple ? (
                <CustomTextField label='Miqdori' placeholder='Miqdori' fullWidth />
              ) : (
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <CustomTextField label='Seriya Nomer' placeholder='Seriya Nomer' fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField label='Markirovka' placeholder='Markirovka' fullWidth />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <CustomTextField
                    select
                    defaultValue=''
                    label='Yetkazib Beruvchi'
                    id='custom-select'
                    fullWidth
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem disabled value=''>
                      <em>Yetkazib Beruvchi</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    select
                    defaultValue=''
                    label="O'lchov Birligi"
                    id='custom-select'
                    fullWidth
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem disabled value=''>
                      <em>Omborxonani Tanlang</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductInfoForm
